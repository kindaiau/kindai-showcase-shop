-- Fix bid_notifications overly permissive RLS policy
DROP POLICY IF EXISTS "System can manage notifications" ON public.bid_notifications;

-- Admins can manage all notifications
CREATE POLICY "Admins can manage notifications"
ON public.bid_notifications
FOR ALL
TO authenticated
USING (public.is_current_user_admin())
WITH CHECK (public.is_current_user_admin());

-- Bidders can view their own notifications
CREATE POLICY "Bidders can view their notifications"
ON public.bid_notifications
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM bids
    WHERE bids.id = bid_notifications.bid_id
    AND bids.bidder_email = (SELECT email FROM auth.users WHERE id = auth.uid())
  )
);