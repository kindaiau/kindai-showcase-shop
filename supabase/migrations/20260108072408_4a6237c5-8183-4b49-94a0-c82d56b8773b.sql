-- Drop auction-related tables and views (not used in this app)

-- First drop the view that depends on bids
DROP VIEW IF EXISTS public.auction_bid_counts;

-- Drop the function that references bids
DROP FUNCTION IF EXISTS public.get_my_bids();

-- Drop bid_notifications (depends on bids)
DROP TABLE IF EXISTS public.bid_notifications;

-- Drop bids (depends on auctions)
DROP TABLE IF EXISTS public.bids;

-- Drop auction_submissions
DROP TABLE IF EXISTS public.auction_submissions;

-- Drop auctions
DROP TABLE IF EXISTS public.auctions;