-- Fix audit_logs INSERT policy - restrict to service role only

-- Drop the overly permissive INSERT policy
DROP POLICY IF EXISTS "System can insert audit logs" ON public.audit_logs;

-- Create a restrictive policy that only allows service_role to insert
-- Service role bypasses RLS, so we deny all authenticated/anon users
CREATE POLICY "Only service role can insert audit logs"
ON public.audit_logs
FOR INSERT
TO authenticated, anon
WITH CHECK (false);

-- Note: Service role automatically bypasses RLS, so audit log inserts 
-- should only be done via edge functions using the service role client