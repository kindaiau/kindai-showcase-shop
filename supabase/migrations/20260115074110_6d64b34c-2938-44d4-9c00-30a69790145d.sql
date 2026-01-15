-- Add missing columns for Gumroad purchase tracking
ALTER TABLE public.user_purchases
ADD COLUMN IF NOT EXISTS tier TEXT,
ADD COLUMN IF NOT EXISTS gumroad_variant TEXT,
ADD COLUMN IF NOT EXISTS price_cents INTEGER;