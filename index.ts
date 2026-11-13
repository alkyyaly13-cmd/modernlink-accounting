// Supabase Edge Function: lets a company owner/admin create staff accounts
// (username + password, no e-mail needed) and reset their passwords.
// Deploy:  supabase functions deploy admin-users
// Secrets (set automatically by Supabase): SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY
// Optional secret: USERNAME_EMAIL_DOMAIN (default "staff.modernlink.app") — internal login e-mails, never mailed.
import { createClient } from 'npm:@supabase/supabase-js@2';

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};
const json = (b: unknown, status = 200) =>
  new Response(JSON.stringify(b), { status, headers: { ...cors, 'Content-Type': 'application/json' } });
const ROLES = ['admin', 'accountant', 'viewer', 'member'];

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  if (req.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);
  try {
    const url = Deno.env.get('SUPABASE_URL')!;
    const anon = Deno.env.get('SUPABASE_ANON_KEY')!;
    const service = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const domain = Deno.env.get('USERNAME_EMAIL_DOMAIN') || 'staff.modernlink.app';

    const caller = createClient(url, anon, { global: { headers: { Authorization: req.headers.get('Authorization') ?? '' } } });
    const { data: { user } } = await caller.auth.getUser();
    if (!user) return json({ error: 'not_authenticated' }, 401);

    const admin = createClient(url, service, { auth: { persistSession: false } });
    const body = await req.json();
    const orgId = String(body.org_id || '');

    const { data: me } = await admin.from('memberships').select('role').eq('org_id', orgId).eq('user_id', user.id).maybeSingle();
    if (!me || !['owner', 'admin'].includes(me.role)) return json({ error: 'not_allowed' }, 403);

    const uuidList = (v: unknown) => (Array.isArray(v) ? v.filter((x) => typeof x === 'string' && /^[0-9a-f-]{36}$/i.test(x)) : []);

    if (body.action === 'create') {
      const username = String(body.username || '').trim().toLowerCase();
      const password = String(body.password || '');
      const fullName = String(body.full_name || '').trim().slice(0, 120);
      const role = String(body.role || 'member');
      if (!/^[a-z0-9._-]{3,32}$/.test(username)) return json({ error: 'bad_username' }, 400);
      if (password.length < 8) return json({ error: 'weak_password' }, 400);
      if (!ROLES.includes(role)) return json({ error: 'bad_role' }, 400);

      const { data: sub } = await admin.from('subscriptions').select('plan,status,current_period_end').eq('org_id', orgId).maybeSingle();
      if (!sub || !['trialing', 'active'].includes(sub.status) || new Date(sub.current_period_end) <= new Date())
        return json({ error: 'subscription_inactive' }, 402);
      const { data: plan } = await admin.from('plans').select('max_users').eq('code', sub.plan).maybeSingle();
      const { count: members } = await admin.from('memberships').select('*', { count: 'exact', head: true }).eq('org_id', orgId);
      const { count: invites } = await admin.from('invitations').select('*', { count: 'exact', head: true }).eq('org_id', orgId);
      if ((members ?? 0) + (invites ?? 0) >= (plan?.max_users ?? 1)) return json({ error: 'user_limit_reached' }, 402);

      const email = `${username}@${domain}`;
      const { data: created, error } = await admin.auth.admin.createUser({
        email, password, email_confirm: true,
        user_metadata: { full_name: fullName, username, company_created: true },
      });
      if (error || !created.user) {
        const m = (error?.message || '').toLowerCase();
        return json({ error: m.includes('already') || m.includes('exists') ? 'username_taken' : (error?.message || 'create_failed') }, 400);
      }
      const { error: mErr } = await admin.from('memberships').insert({
        org_id: orgId, user_id: created.user.id, role, email, username, full_name: fullName || username,
        projects: uuidList(body.projects), accounts: uuidList(body.accounts),
      });
      if (mErr) { await admin.auth.admin.deleteUser(created.user.id); return json({ error: mErr.message }, 400); }
      return json({ ok: true, user_id: created.user.id });
    }

    if (body.action === 'set_password') {
      const target = String(body.user_id || '');
      const password = String(body.password || '');
      if (password.length < 8) return json({ error: 'weak_password' }, 400);
      const { data: t } = await admin.from('memberships').select('role,username').eq('org_id', orgId).eq('user_id', target).maybeSingle();
      if (!t || t.role === 'owner') return json({ error: 'not_allowed' }, 403);
      if (!t.username) return json({ error: 'email_user' }, 400); // e-mail users reset their own password
      const { error } = await admin.auth.admin.updateUserById(target, { password });
      if (error) return json({ error: error.message }, 400);
      return json({ ok: true });
    }

    return json({ error: 'bad_action' }, 400);
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});
