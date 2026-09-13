-- ============================================================
-- NFCS UNN Federation Week Raffle — Referral System Migration
-- Run this in your Supabase SQL Editor
-- ============================================================

-- 1. Add referred_by column to raffle_orders to record promoter phone/code
alter table raffle_orders add column if not exists referred_by text;

-- 2. Add an index for fast lookups on referred orders
create index if not exists idx_raffle_orders_referred_by on raffle_orders(referred_by);

-- 3. Update the channel check constraint to allow 'referral_bonus'
--    This ensures auto-issued bonus tickets are cleanly identified
alter table raffle_orders drop constraint if exists raffle_orders_channel_check;
alter table raffle_orders add constraint raffle_orders_channel_check 
  check (channel in ('online', 'walk-in', 'referral_bonus'));

-- 4. Update the raffle_summary view to include referral statistics
create or replace view raffle_summary as
select
  (select count(*) from raffle_tickets) as tickets_sold,
  (select coalesce(sum(floor(total_amount / 200)), 0) from raffle_orders where payment_status = 'success') as paid_tickets_sold,
  (select coalesce(sum(total_amount), 0) from raffle_orders where payment_status = 'success') as total_revenue,
  (select count(*) from raffle_orders where payment_status = 'success') as successful_orders,
  (select count(*) from raffle_orders where channel = 'online' and payment_status = 'success') as online_orders,
  (select count(*) from raffle_orders where channel = 'walk-in' and payment_status = 'success') as walkin_orders,
  (select count(*) from raffle_orders where channel = 'referral_bonus' and payment_status = 'success') as referral_bonus_orders;

grant select on raffle_summary to anon, authenticated;
