-- ============================================================
-- NFCS Federation Week Raffle — Reset Database & Counter to 1
-- ============================================================
-- Run this in your Supabase SQL Editor whenever you want to wipe
-- all test/previous orders and start fresh from Ticket FW-000001.

-- 1. Wipe all ticket stubs and orders
TRUNCATE TABLE raffle_tickets, raffle_orders RESTART IDENTITY CASCADE;

-- 2. Reset the ticket sequence counter back to 1
ALTER SEQUENCE raffle_ticket_seq RESTART WITH 1;

-- 3. Verify the reset (Optional sanity check)
-- tickets_sold, total_revenue, etc. should all be 0:
SELECT * FROM raffle_summary;
