-- ============================================================
-- NFCS Federation Week Raffle — Supabase Schema
-- Run this in the Supabase SQL Editor before deploying.
-- ============================================================

-- Sequence that guarantees every ticket gets a unique, gapless-ish
-- running number, even under concurrent purchases.
create sequence if not exists raffle_ticket_seq start 1;

-- One row per purchase transaction (online OR walk-in).
-- This is the "order" — a buyer can purchase multiple tickets at once.
create table if not exists raffle_orders (
  id uuid primary key default gen_random_uuid(),
  buyer_name text not null,
  buyer_phone text not null,
  buyer_email text,
  department text,
  quantity int not null check (quantity > 0),
  unit_price numeric not null default 200,
  total_amount numeric not null,
  channel text not null check (channel in ('online', 'walk-in')),
  payment_reference text unique,          -- Paystack reference (null for cash walk-ins)
  payment_method text,                    -- 'paystack' | 'cash' | 'transfer'
  payment_status text not null default 'pending'
    check (payment_status in ('pending', 'success', 'failed')),
  recorded_by text,                       -- exco name, for walk-in entries
  created_at timestamptz not null default now()
);

-- One row per individual ticket. Only created once payment_status = 'success'.
create table if not exists raffle_tickets (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references raffle_orders(id) on delete cascade,
  ticket_number text unique not null,
  printed boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists idx_raffle_tickets_order on raffle_tickets(order_id);
create index if not exists idx_raffle_orders_status on raffle_orders(payment_status);
create index if not exists idx_raffle_orders_reference on raffle_orders(payment_reference);

-- Helper function: generate the next padded ticket number, e.g. FW-000001
create or replace function next_raffle_ticket_number()
returns text
language sql
as $$
  select 'FW-' || lpad(nextval('raffle_ticket_seq')::text, 6, '0');
$$;

-- Row Level Security: block all public access by default.
-- All reads/writes happen through your serverless functions using the
-- service role key, never directly from the browser.
alter table raffle_orders enable row level security;
alter table raffle_tickets enable row level security;

-- (No policies added on purpose — service role key bypasses RLS entirely,
-- and the anon/public key will be refused by every table.)

-- Convenience view for the admin dashboard AND the public "tickets sold"
-- counter. Postgres views run with the owner's privileges by default, so
-- this aggregate stays readable even though the raw tables are locked
-- down above. Only counts/sums are exposed here — no buyer names, phone
-- numbers, or ticket numbers — so it's safe to expose to the anon key.
create or replace view raffle_summary as
select
  (select count(*) from raffle_tickets) as tickets_sold,
  (select coalesce(sum(total_amount), 0) from raffle_orders where payment_status = 'success') as total_revenue,
  (select count(*) from raffle_orders where payment_status = 'success') as successful_orders,
  (select count(*) from raffle_orders where channel = 'online' and payment_status = 'success') as online_orders,
  (select count(*) from raffle_orders where channel = 'walk-in' and payment_status = 'success') as walkin_orders;

grant select on raffle_summary to anon, authenticated;
