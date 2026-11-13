-- =====================================================================
-- 002 — Custodian users scoped to projects/cash boxes + monthly closing
-- Run after 001_init.sql
-- =====================================================================

-- ---------- new role "member" (custodian / project officer) + assignments ----------
alter table public.memberships drop constraint if exists memberships_role_check;
alter table public.memberships add constraint memberships_role_check
  check (role in ('owner','admin','accountant','viewer','member'));
alter table public.memberships add column if not exists projects uuid[] not null default '{}';
alter table public.memberships add column if not exists accounts uuid[] not null default '{}';
alter table public.memberships add column if not exists username text;

alter table public.invitations drop constraint if exists invitations_role_check;
alter table public.invitations add constraint invitations_role_check
  check (role in ('admin','accountant','viewer','member'));

create or replace function public.is_scoped(o uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce(public.member_role(o) = 'member', false)
$$;
create or replace function public.my_projects(o uuid) returns text[]
language sql stable security definer set search_path = public as $$
  select coalesce((select projects::text[] from public.memberships where org_id = o and user_id = auth.uid()), '{}')
$$;
create or replace function public.my_accounts(o uuid) returns text[]
language sql stable security definer set search_path = public as $$
  select coalesce((select accounts::text[] from public.memberships where org_id = o and user_id = auth.uid()), '{}')
$$;

-- can_write: anyone who records entries (members included, but only within their scope — see txns policies)
create or replace function public.can_write(o uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce(public.member_role(o) in ('owner','admin','accountant','member'), false) and public.org_active(o)
$$;
-- can_write_master: master data (accounts, projects, employees, parties) — not members
create or replace function public.can_write_master(o uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce(public.member_role(o) in ('owner','admin','accountant'), false) and public.org_active(o)
$$;

-- ---------- data policies ----------
do $$
declare t text;
begin
  foreach t in array array['accounts','projects','employees','parties'] loop
    execute format('drop policy if exists %1$s_insert on public.%1$I', t);
    execute format('create policy %1$s_insert on public.%1$I for insert to authenticated with check (public.can_write_master(org_id))', t);
    execute format('drop policy if exists %1$s_update on public.%1$I', t);
    execute format('create policy %1$s_update on public.%1$I for update to authenticated using (public.can_write_master(org_id)) with check (public.can_write_master(org_id))', t);
    execute format('drop policy if exists %1$s_delete on public.%1$I', t);
    execute format('create policy %1$s_delete on public.%1$I for delete to authenticated using (public.can_write_master(org_id))', t);
  end loop;
end $$;

-- members: see only their projects; no access to employees (salaries)
drop policy if exists projects_select on public.projects;
create policy projects_select on public.projects for select to authenticated
  using (public.is_member(org_id) and (not public.is_scoped(org_id) or id::text = any(public.my_projects(org_id))));
drop policy if exists employees_select on public.employees;
create policy employees_select on public.employees for select to authenticated
  using (public.is_member(org_id) and not public.is_scoped(org_id));

-- entries: members see/record only movements of their own cash boxes
drop policy if exists txns_select on public.txns;
create policy txns_select on public.txns for select to authenticated
  using (public.is_member(org_id) and (not public.is_scoped(org_id)
         or data->>'account' = any(public.my_accounts(org_id))
         or data->>'toAccount' = any(public.my_accounts(org_id))));
drop policy if exists txns_insert on public.txns;
create policy txns_insert on public.txns for insert to authenticated
  with check (public.can_write(org_id) and (not public.is_scoped(org_id) or (
      data->>'account' = any(public.my_accounts(org_id))
      and (coalesce(data->>'project','') = '' or data->>'project' = any(public.my_projects(org_id)))
      and data->>'type' in ('expense','income','transfer','pay','receive','adjust'))));
drop policy if exists txns_update on public.txns;
create policy txns_update on public.txns for update to authenticated
  using (public.can_write(org_id) and (not public.is_scoped(org_id) or (created_by = auth.uid() and data->>'account' = any(public.my_accounts(org_id)))))
  with check (public.can_write(org_id) and (not public.is_scoped(org_id) or (created_by = auth.uid() and data->>'account' = any(public.my_accounts(org_id))
      and (coalesce(data->>'project','') = '' or data->>'project' = any(public.my_projects(org_id)))
      and data->>'type' in ('expense','income','transfer','pay','receive','adjust'))));
drop policy if exists txns_delete on public.txns;
create policy txns_delete on public.txns for delete to authenticated
  using (public.can_write(org_id) and (not public.is_scoped(org_id) or (created_by = auth.uid() and data->>'account' = any(public.my_accounts(org_id)))));

-- members cannot change org settings (lock date, currencies)
drop policy if exists oset_insert on public.org_settings;
create policy oset_insert on public.org_settings for insert to authenticated
  with check (public.can_manage(org_id) and public.org_active(org_id));

-- ---------- monthly closing per cash box ----------
create table if not exists public.account_closings (
  id           uuid primary key default gen_random_uuid(),
  org_id       uuid not null references public.organizations(id) on delete cascade,
  account_id   uuid not null references public.accounts(id) on delete cascade,
  month        text not null check (month ~ '^\d{4}-\d{2}$'),
  opening      numeric(18,4),
  total_in     numeric(18,4),
  total_out    numeric(18,4),
  expected     numeric(18,4),
  counted      numeric(18,4) not null,
  difference   numeric(18,4),
  status       text not null default 'submitted' check (status in ('submitted','approved','returned')),
  note         text,
  review_note  text,
  submitted_by uuid default auth.uid() references auth.users(id) on delete set null,
  submitted_at timestamptz not null default now(),
  approved_by  uuid references auth.users(id) on delete set null,
  approved_at  timestamptz,
  unique (org_id, account_id, month)
);
alter table public.account_closings enable row level security;

create policy clos_select on public.account_closings for select to authenticated
  using (public.is_member(org_id) and (not public.is_scoped(org_id) or account_id::text = any(public.my_accounts(org_id))));
create policy clos_insert on public.account_closings for insert to authenticated
  with check (public.can_write(org_id) and status = 'submitted'
              and (not public.is_scoped(org_id) or account_id::text = any(public.my_accounts(org_id))));
-- the custodian may re-submit until it is approved; approval goes through approve_closing()
create policy clos_update on public.account_closings for update to authenticated
  using (public.can_write(org_id) and status <> 'approved'
         and (not public.is_scoped(org_id) or account_id::text = any(public.my_accounts(org_id))))
  with check (status = 'submitted');
create policy clos_delete on public.account_closings for delete to authenticated
  using (public.can_manage(org_id) and status <> 'approved');

-- Approve: optionally post the difference as a cash-count adjustment dated the last day of the month
create or replace function public.approve_closing(p_id uuid, p_post_adjustment boolean default true, p_review_note text default null)
returns void language plpgsql security definer set search_path = public as $$
declare c public.account_closings; last_day text;
begin
  select * into c from public.account_closings where id = p_id;
  if c.id is null then raise exception 'not_found'; end if;
  if not public.can_manage(c.org_id) then raise exception 'not_allowed'; end if;
  if c.status = 'approved' then return; end if;
  if p_post_adjustment and coalesce(c.difference,0) <> 0 then
    last_day := to_char((to_date(c.month || '-01','YYYY-MM-DD') + interval '1 month' - interval '1 day'), 'YYYY-MM-DD');
    insert into public.txns(org_id, data, created_by) values (c.org_id, jsonb_build_object(
      'type','adjust','dir', case when c.difference > 0 then 1 else -1 end,
      'date', last_day, 'account', c.account_id::text,
      'currency', (select data->>'currency' from public.accounts where id = c.account_id),
      'amount', abs(c.difference),
      'note', 'جرد شهر ' || c.month || ' / Month-end count ' || c.month,
      'closing', c.id::text, 'createdAt', (extract(epoch from now())*1000)::bigint), auth.uid());
  end if;
  update public.account_closings set status = 'approved', approved_by = auth.uid(), approved_at = now(),
    review_note = coalesce(p_review_note, review_note) where id = p_id;
end $$;

create or replace function public.return_closing(p_id uuid, p_review_note text default null)
returns void language plpgsql security definer set search_path = public as $$
declare c public.account_closings;
begin
  select * into c from public.account_closings where id = p_id;
  if c.id is null then raise exception 'not_found'; end if;
  if not public.can_manage(c.org_id) then raise exception 'not_allowed'; end if;
  -- reopening an approved month also unlocks its entries (owner/admin only)
  update public.account_closings set status = 'returned', approved_by = null, approved_at = null,
    review_note = coalesce(p_review_note, review_note) where id = p_id;
end $$;
grant execute on function public.approve_closing(uuid,boolean,text) to authenticated;
grant execute on function public.return_closing(uuid,text) to authenticated;

-- An approved month locks that cash box's entries for that month
create or replace function public.enforce_lock_date() returns trigger
language plpgsql security definer set search_path = public as $$
declare lock text; o uuid; r jsonb; d text; a text;
begin
  o := coalesce(new.org_id, old.org_id);
  select data->>'lockDate' into lock from public.org_settings where org_id = o;
  foreach r in array (case tg_op when 'INSERT' then array[to_jsonb(new)] when 'DELETE' then array[to_jsonb(old)] else array[to_jsonb(old), to_jsonb(new)] end) loop
    d := coalesce(r->'data'->>'date','');
    if d = '' then continue; end if;
    if lock is not null and lock <> '' and d <= lock then
      raise exception 'period_locked' using hint = lock;
    end if;
    foreach a in array array[r->'data'->>'account', r->'data'->>'toAccount'] loop
      if a is not null and a <> '' and exists (select 1 from public.account_closings c
            where c.org_id = o and c.account_id::text = a and c.month = left(d,7) and c.status = 'approved') then
        raise exception 'month_closed' using hint = left(d,7);
      end if;
    end loop;
  end loop;
  if tg_op = 'DELETE' then return old; end if;
  return new;
end $$;

-- invite_member accepts the new role too
create or replace function public.invite_member(p_org uuid, p_email text, p_role text)
returns void language plpgsql security definer set search_path = public as $$
declare lim int; used int;
begin
  if not public.can_manage(p_org) then raise exception 'not_allowed'; end if;
  if not public.org_active(p_org) then raise exception 'subscription_inactive'; end if;
  if p_role not in ('admin','accountant','viewer','member') then raise exception 'bad_role'; end if;
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


do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    begin execute 'alter publication supabase_realtime add table public.account_closings'; exception when duplicate_object then null; end;
  end if;
end $$;
