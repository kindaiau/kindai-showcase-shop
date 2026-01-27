-- Create table to track email nurture sequence progress
CREATE TABLE public.email_nurture_queue (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subscriber_id UUID REFERENCES public.email_subscribers(id) ON DELETE CASCADE,
  email_address TEXT NOT NULL,
  subscriber_name TEXT,
  sequence_name TEXT NOT NULL DEFAULT 'rebel-toolkit',
  current_email_number INTEGER NOT NULL DEFAULT 0,
  next_send_at TIMESTAMP WITH TIME ZONE,
  last_sent_at TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'unsubscribed', 'paused')),
  emails_sent JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for efficient querying of pending emails
CREATE INDEX idx_nurture_queue_next_send ON public.email_nurture_queue(next_send_at) 
WHERE status = 'active' AND next_send_at IS NOT NULL;

CREATE INDEX idx_nurture_queue_email ON public.email_nurture_queue(email_address);

-- Enable RLS
ALTER TABLE public.email_nurture_queue ENABLE ROW LEVEL SECURITY;

-- Only service role can access this table (for edge functions)
CREATE POLICY "Service role can manage nurture queue"
ON public.email_nurture_queue
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Create trigger for updated_at
CREATE TRIGGER update_nurture_queue_updated_at
BEFORE UPDATE ON public.email_nurture_queue
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();