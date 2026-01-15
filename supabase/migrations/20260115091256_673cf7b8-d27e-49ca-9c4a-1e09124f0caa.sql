-- Add explicit denial policy for anonymous users on email_subscribers table
-- This provides defense-in-depth security

CREATE POLICY "Anonymous cannot read email subscribers"
ON public.email_subscribers
FOR SELECT
TO anon
USING (false);

-- Also add for user_purchases table for defense-in-depth
CREATE POLICY "Anonymous cannot read user purchases"
ON public.user_purchases
FOR SELECT
TO anon
USING (false);