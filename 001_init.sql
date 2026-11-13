-- =====================================================================
-- Modern Link Accounting — multi-tenant SaaS schema (Supabase / Postgres)
-- Run once in Supabase: SQL Editor → paste → Run
-- =====================================================================

-- ---------- core tenancy ----------
create table if not exists public.organizations (
  id          uuid primary key default gen_random_uuid(),
  name        text not null check (length(trim(name)) between 2 and 120),
  country     text,
  created_by  uuid references auth.users(id) on delete set null,
  created_at  timestamptz not null default now()
);

create table if not exists public.memberships (
  org_id     uuid not null references public.organizations(id) on delete cascade,
  user_id    uuid not null references auth.users(id) on delete cascade,
  role       text not null check (role in ('owner','admin','accountant','viewer')),
  email      text,
  full_name  text,
  created_at timestamptz not null default now(),
  primary key (org_id, user_id)
);
create index if not exists memberships_user_idx on public.memberships(user_id);

create table if not exists public.invitations (
  id         uuid primary key default gen_random_uuid(),
  org_id     uuid not null references public.organizations(id) on delete cascade,
  email      text not null,
  role       text not null check (role in ('admin','accountant','viewer')),
  invited_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);
create unique index if not exists invitations_org_email_uq on public.invitations(org_id, lower(email));

-- ---------- plans & subscriptions ----------
create table if not exists public.plans (
  code          text primary key,
  name_ar       text not null,
  name_en       text not null,
  max_users     int  not null,
  price_usd     numeric(10,2) not null default 0,
  period_months int  not null default 1,
  sort          int  not null default 0
);
insert into public.plans(code,name_ar,name_en,max_users,price_usd,period_months,sort) values
  ('trial','تجريبي','Trial',3,0,0,0),
  ('basic','أساسي','Basic',5,15,1,1),
  ('pro','احترافي','Professional',20,35,1,2),
  ('enterprise','مؤسسات','Enterprise',100,90,1,3)
on conflict (code) do nothing;

create table if not exists public.subscriptions (
  org_id             uuid primary key references public.organizations(id) on delete cascade,
  plan               text not null references public.plans(code),
  status             text not null check (status in ('trialing','active','expired','canceled')),
  current_period_end timestamptz not null,
  notes              text,
  updated_at         timestamptz not null default now()
);

create table if not exists public.payments (
  id            uuid primary key default gen_random_uuid(),
  org_id        uuid not null references public.organizations(id) on delete cascade,
  plan          text references public.plans(code),
  amount        numeric(12,2) not null,
  currency      text not null default 'USD',
  method        text,
  reference     text,
  months        int not null default 1,
  created_by    uuid references auth.users(id) on delete set null,
  created_at    timestamptz not null default now()
);

create table if not exists public.platform_admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);

create table if not exists public.platform_settings (
  id               int primary key default 1 check (id = 1),
  contact_whatsapp text,
  contact_email    text,
  bank_details     text,
  trial_days       int not null default 14
);
insert into public.platform_settings(id) values (1) on conflict do nothing;

-- ---------- accounting data (one JSON document per row, scoped by org) ----------
do $$
declare t text;
begin
  foreach t in array array['accounts','projects','employees','parties','txns'] loop
    execute format($f$
      create table if not exists public.%I (
        id         uuid primary key default gen_random_uuid(),
        org_id     uuid not null references public.organizations(id) on delete cascade,
        data       jsonb not null default '{}'::jsonb,
        created_by uuid default auth.uid(),
        created_at timestamptz not null default now(),
        updated_at timestamptz not null default now()
      )$f$, t);
    execute format('create index if not exists %I on public.%I(org_id)', t||'_org_idx', t);
  end loop;
end $$;

create table if not exists public.org_settings (
  org_id     uuid primary key references public.organizations(id) on delete cascade,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- ---------- helper functions ----------
create or replace function public.member_role(o uuid) returns text
language sql stable security definer set search_path = public as $$
  select role from public.memberships where org_id = o and user_id = auth.uid()
$$;

create or replace function public.is_member(o uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists(select 1 from public.memberships where org_id = o and user_id = auth.uid())
$$;

create or replace function public.is_platform_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists(select 1 from public.platform_admins where user_id = auth.uid())
$$;

create or replace function public.org_active(o uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists(select 1 from public.subscriptions
                where org_id = o and status in ('trialing','active') and current_period_end > now())
$$;

create or replace function public.can_write(o uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce(public.member_role(o) in ('owner','admin','accountant'), false) and public.org_active(o)
$$;

create or replace function public.can_manage(o uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce(public.member_role(o) in ('owner','admin'), false)
$$;

-- ---------- triggers ----------
create or replace function public.touch_updated_at() returns trigger
language plpgsql as $$ begin new.updated_at := now(); return new; end $$;

-- Closed-period protection: entries dated on/before org lockDate cannot change
create or replace function public.enforce_lock_date() returns trigger
language plpgsql security definer set search_path = public as $$
declare lock text; o uuid;
begin
  o := coalesce(new.org_id, old.org_id);
  select data->>'lockDate' into lock from public.org_settings where org_id = o;
  if lock is null or lock = '' then
    if tg_op = 'DELETE' then return old; end if; return new;
  end if;
  if tg_op in ('UPDATE','DELETE') and coalesce(old.data->>'date','') <> '' and old.data->>'date' <= lock then
    raise exception 'period_locked' using hint = lock;
  end if;
  if tg_op in ('INSERT','UPDATE') and coalesce(new.data->>'date','') <> '' and new.data->>'date' <= lock then
    raise exception 'period_locked' using hint = lock;
  end if;
  if tg_op = 'DELETE' then return old; end if;
  return new;
end $$;

-- Rows can never move between organizations
create or replace function public.prevent_org_change() returns trigger
language plpgsql as $$ begin
  if new.org_id <> old.org_id then raise exception 'org_id is immutable'; end if; return new;
end $$;

do $$
declare t text;
begin
  foreach t in array array['accounts','projects','employees','parties','txns','org_settings'] loop
    execute format('drop trigger if exists touch_%1$s on public.%1$I', t);
    execute format('create trigger touch_%1$s before update on public.%1$I for each row execute function public.touch_updated_at()', t);
    execute format('drop trigger if exists keep_org_%1$s on public.%1$I', t);
    execute format('create trigger keep_org_%1$s before update on public.%1$I for each row execute function public.prevent_org_change()', t);
  end loop;
end $$;
drop trigger if exists txns_lock on public.txns;
create trigger txns_lock before insert or update or delete on public.txns
  for each row execute function public.enforce_lock_date();

-- ---------- row level security ----------
alter table public.organizations     enable row level security;
alter table public.memberships       enable row level security;
alter table public.invitations       enable row level security;
alter table public.plans             enable row level security;
alter table public.subscriptions     enable row level security;
alter table public.payments          enable row level security;
alter table public.platform_admins   enable row level security;
alter table public.platform_settings enable row level security;
alter table public.org_settings      enable row level security;

create policy org_select on public.organizations for select to authenticated
  using (public.is_member(id) or public.is_platform_admin());
create policy org_update on public.organizations for update to authenticated
  using (public.can_manage(id)) with check (public.can_manage(id));

create policy mem_select on public.memberships for select to authenticated
  using (public.is_member(org_id) or public.is_platform_admin());
create policy mem_update on public.memberships for update to authenticated
  using (public.can_manage(org_id) and role <> 'owner')
  with check (public.can_manage(org_id) and role <> 'owner');
create policy mem_delete on public.memberships for delete to authenticated
  using ((public.can_manage(org_id) and role <> 'owner') or (user_id = auth.uid() and role <> 'owner'));

create policy inv_select on public.invitations for select to authenticated
  using (public.can_manage(org_id) or lower(email) = lower(coalesce(auth.jwt()->>'email','')));
create policy inv_delete on public.invitations for delete to authenticated
  using (public.can_manage(org_id));

create policy plans_select on public.plans for select to anon, authenticated using (true);

create policy sub_select on public.subscriptions for select to authenticated
  using (public.is_member(org_id) or public.is_platform_admin());

create policy pay_select on public.payments for select to authenticated
  using (public.can_manage(org_id) or public.is_platform_admin());

create policy padm_select on public.platform_admins for select to authenticated
  using (user_id = auth.uid());

create policy pset_select on public.platform_settings for select to anon, authenticated using (true);
create policy pset_update on public.platform_settings for update to authenticated
  using (public.is_platform_admin()) with check (public.is_platform_admin());

create policy oset_select on public.org_settings for select to authenticated using (public.is_member(org_id));
create policy oset_insert on public.org_settings for insert to authenticated
  with check (public.can_manage(org_id) and public.org_active(org_id));
create policy oset_update on public.org_settings for update to authenticated
  using (public.can_manage(org_id) and public.org_active(org_id))
  with check (public.can_manage(org_id) and public.org_active(org_id));

do $$
declare t text;
begin
  foreach t in array array['accounts','projects','employees','parties','txns'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists %1$s_select on public.%1$I', t);
    execute format('create policy %1$s_select on public.%1$I for select to authenticated using (public.is_member(org_id))', t);
    execute format('drop policy if exists %1$s_insert on public.%1$I', t);
    execute format('create policy %1$s_insert on public.%1$I for insert to authenticated with check (public.can_write(org_id))', t);
    execute format('drop policy if exists %1$s_update on public.%1$I', t);
    execute format('create policy %1$s_update on public.%1$I for update to authenticated using (public.can_write(org_id)) with check (public.can_write(org_id))', t);
    execute format('drop policy if exists %1$s_delete on public.%1$I', t);
    execute format('create policy %1$s_delete on public.%1$I for delete to authenticated using (public.can_write(org_id))', t);
  end loop;
end $$;

-- ---------- RPCs ----------
-- Sign-up flow: create a company, become its owner, start the trial
create or replace function public.create_organization(p_name text, p_country text default null, p_full_name text default null)
returns uuid language plpgsql security definer set search_path = public as $$
declare o uuid; days int; n int;
begin
  if auth.uid() is null then raise exception 'not_authenticated'; end if;
  select count(*) into n from public.memberships where user_id = auth.uid() and role = 'owner';
  if n >= 5 then raise exception 'too_many_organizations'; end if;
  select trial_days into days from public.platform_settings where id = 1;
  insert into public.organizations(name, country, created_by) values (trim(p_name), p_country, auth.uid()) returning id into o;
  insert into public.memberships(org_id, user_id, role, email, full_name)
    values (o, auth.uid(), 'owner', auth.jwt()->>'email', nullif(trim(coalesce(p_full_name,'')),''));
  insert into public.subscriptions(org_id, plan, status, current_period_end)
    values (o, 'trial', 'trialing', now() + make_interval(days => coalesce(days,14)));
  insert into public.org_settings(org_id, data) values (o, '{}'::jsonb);
  return o;
end $$;

-- Invite a user by e-mail (respects the plan's user limit)
create or replace function public.invite_member(p_org uuid, p_email text, p_role text)
returns void language plpgsql security definer set search_path = public as $$
declare lim int; used int;
begin
  if not public.can_manage(p_org) then raise exception 'not_allowed'; end if;
  if not public.org_active(p_org) then raise exception 'subscription_inactive'; end if;
  if p_role not in ('admin','accountant','viewer') then raise exception 'bad_role'; end if;
  if p_email !~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' then raise exception 'bad_email'; end if;
  if exists(select 1 from public.memberships where org_id = p_org and lower(email) = lower(p_email)) then
    raise exception 'already_member';
  end if;
  select p.max_users into lim from public.subscriptions s join public.plans p on p.code = s.plan where s.org_id = p_org;
  select (select count(*) from public.memberships where org_id = p_org)
       + (select count(*) from public.invitations where org_id = p_org and lower(email) <> lower(p_email)) into used;
  if used >= coalesce(lim, 1) then raise exception 'user_limit_reached'; end if;
  insert into public.invitations(org_id, email, role, invited_by) values (p_org, lower(trim(p_email)), p_role, auth.uid())
  on conflict (org_id, lower(email)) do update set role = excluded.role;
end $$;

-- Called after login: join every company that invited this e-mail
create or replace function public.accept_invitations(p_full_name text default null)
returns int language plpgsql security definer set search_path = public as $$
declare r record; n int := 0; em text := lower(coalesce(auth.jwt()->>'email',''));
begin
  if auth.uid() is null or em = '' then return 0; end if;
  for r in select * from public.invitations where lower(email) = em loop
    insert into public.memberships(org_id, user_id, role, email, full_name)
      values (r.org_id, auth.uid(), r.role, em, nullif(trim(coalesce(p_full_name,'')),''))
      on conflict (org_id, user_id) do nothing;
    delete from public.invitations where id = r.id;
    n := n + 1;
  end loop;
  return n;
end $$;

-- Platform admin: list all companies with their subscription
create or replace function public.admin_list_orgs()
returns table(org_id uuid, name text, country text, created_at timestamptz, owner_email text, members bigint,
              plan text, status text, current_period_end timestamptz, txns bigint)
language plpgsql stable security definer set search_path = public as $$
begin
  if not public.is_platform_admin() then raise exception 'not_allowed'; end if;
  return query
    select o.id, o.name, o.country, o.created_at,
      (select m.email from public.memberships m where m.org_id = o.id and m.role = 'owner' limit 1),
      (select count(*) from public.memberships m where m.org_id = o.id),
      s.plan, s.status, s.current_period_end,
      (select count(*) from public.txns x where x.org_id = o.id)
    from public.organizations o left join public.subscriptions s on s.org_id = o.id
    order by o.created_at desc;
end $$;

-- Platform admin: record a payment and extend the subscription
create or replace function public.admin_record_payment(p_org uuid, p_plan text, p_months int, p_amount numeric,
  p_currency text default 'USD', p_method text default null, p_reference text default null)
returns timestamptz language plpgsql security definer set search_path = public as $$
declare base timestamptz; newend timestamptz;
begin
  if not public.is_platform_admin() then raise exception 'not_allowed'; end if;
  if p_months < 1 or p_months > 36 then raise exception 'bad_months'; end if;
  select greatest(current_period_end, now()) into base from public.subscriptions where org_id = p_org;
  newend := coalesce(base, now()) + make_interval(months => p_months);
  insert into public.subscriptions(org_id, plan, status, current_period_end)
    values (p_org, p_plan, 'active', newend)
    on conflict (org_id) do update set plan = excluded.plan, status = 'active', current_period_end = newend, updated_at = now();
  insert into public.payments(org_id, plan, amount, currency, method, reference, months, created_by)
    values (p_org, p_plan, p_amount, upper(p_currency), p_method, p_reference, p_months, auth.uid());
  return newend;
end $$;

-- Platform admin: change status directly (suspend / cancel / reactivate / set end date)
create or replace function public.admin_set_subscription(p_org uuid, p_plan text, p_status text, p_until timestamptz, p_notes text default null)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.is_platform_admin() then raise exception 'not_allowed'; end if;
  update public.subscriptions set plan = p_plan, status = p_status, current_period_end = p_until,
    notes = coalesce(p_notes, notes), updated_at = now() where org_id = p_org;
end $$;

-- Expire lapsed subscriptions (optional: schedule with pg_cron, the app also checks dates)
create or replace function public.expire_subscriptions() returns int
language sql security definer set search_path = public as $$
  with u as (update public.subscriptions set status = 'expired', updated_at = now()
             where status in ('trialing','active') and current_period_end <= now() returning 1)
  select count(*)::int from u
$$;

revoke all on function public.admin_list_orgs() from public, anon;
revoke all on function public.admin_record_payment(uuid,text,int,numeric,text,text,text) from public, anon;
revoke all on function public.admin_set_subscription(uuid,text,text,timestamptz,text) from public, anon;
revoke all on function public.expire_subscriptions() from public, anon, authenticated;
grant execute on function public.create_organization(text,text,text) to authenticated;
grant execute on function public.invite_member(uuid,text,text) to authenticated;
grant execute on function public.accept_invitations(text) to authenticated;
grant execute on function public.admin_list_orgs() to authenticated;
grant execute on function public.admin_record_payment(uuid,text,int,numeric,text,text,text) to authenticated;
grant execute on function public.admin_set_subscription(uuid,text,text,timestamptz,text) to authenticated;

-- ---------- realtime ----------
do $$
declare t text;
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    foreach t in array array['accounts','projects','employees','parties','txns','org_settings','subscriptions','memberships'] loop
      begin
        execute format('alter publication supabase_realtime add table public.%I', t);
      exception when duplicate_object then null;
      end;
    end loop;
  end if;
end $$;

-- ---------- after your first sign-up, make yourself platform admin ----------
-- insert into public.platform_admins(user_id) select id from auth.users where email = 'you@example.com';
