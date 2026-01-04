-- Create toolkit content types enum
CREATE TYPE public.toolkit_content_type AS ENUM ('guide', 'template', 'checklist');

-- Create toolkit content table for guides, templates, and checklists
CREATE TABLE public.toolkit_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  content_type toolkit_content_type NOT NULL,
  content JSONB NOT NULL DEFAULT '{}',
  category TEXT NOT NULL,
  icon TEXT,
  order_index INTEGER DEFAULT 0,
  is_premium BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user progress tracking table
CREATE TABLE public.user_toolkit_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content_id UUID NOT NULL REFERENCES public.toolkit_content(id) ON DELETE CASCADE,
  completed_steps JSONB DEFAULT '[]',
  is_completed BOOLEAN DEFAULT false,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, content_id)
);

-- Create AI chat conversations table
CREATE TABLE public.ai_conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT DEFAULT 'New Conversation',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create AI chat messages table
CREATE TABLE public.ai_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID NOT NULL REFERENCES public.ai_conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user generated content table (for AI-generated templates, etc.)
CREATE TABLE public.user_generated_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content_type TEXT NOT NULL,
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.toolkit_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_toolkit_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_generated_content ENABLE ROW LEVEL SECURITY;

-- Toolkit content is readable by all authenticated users
CREATE POLICY "Authenticated users can view toolkit content"
ON public.toolkit_content FOR SELECT
TO authenticated
USING (true);

-- User progress policies
CREATE POLICY "Users can view their own progress"
ON public.user_toolkit_progress FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own progress"
ON public.user_toolkit_progress FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
ON public.user_toolkit_progress FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- AI conversations policies
CREATE POLICY "Users can view their own conversations"
ON public.ai_conversations FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own conversations"
ON public.ai_conversations FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own conversations"
ON public.ai_conversations FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- AI messages policies
CREATE POLICY "Users can view messages in their conversations"
ON public.ai_messages FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.ai_conversations
    WHERE id = ai_messages.conversation_id
    AND user_id = auth.uid()
  )
);

CREATE POLICY "Users can create messages in their conversations"
ON public.ai_messages FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.ai_conversations
    WHERE id = ai_messages.conversation_id
    AND user_id = auth.uid()
  )
);

-- User generated content policies
CREATE POLICY "Users can view their own generated content"
ON public.user_generated_content FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own generated content"
ON public.user_generated_content FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own generated content"
ON public.user_generated_content FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Add triggers for updated_at
CREATE TRIGGER update_toolkit_content_updated_at
BEFORE UPDATE ON public.toolkit_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ai_conversations_updated_at
BEFORE UPDATE ON public.ai_conversations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert starter toolkit content
INSERT INTO public.toolkit_content (title, description, content_type, category, icon, content, order_index) VALUES
-- Website Building Guides
('Build Your First Website', 'Learn to create stunning websites using Lovable AI in under 30 minutes', 'guide', 'website', 'Globe', '{"steps": [{"title": "Define Your Vision", "content": "Describe what you want to build. Be specific about colors, layout, and functionality."}, {"title": "Prompt Lovable", "content": "Use clear, specific prompts. Example: Build a modern landing page with hero section, features, and CTA."}, {"title": "Iterate Fast", "content": "Don''t aim for perfection. Make quick changes, test often."}, {"title": "Add Interactivity", "content": "Request forms, animations, and dynamic elements."}, {"title": "Deploy & Share", "content": "Publish your site and share with the world!"}]}', 1),
('Landing Page Mastery', 'Create high-converting landing pages that capture leads', 'guide', 'website', 'Layout', '{"steps": [{"title": "Hero Section", "content": "Create a compelling headline and clear value proposition."}, {"title": "Social Proof", "content": "Add testimonials, logos, and trust signals."}, {"title": "Features Grid", "content": "Showcase benefits with icons and concise descriptions."}, {"title": "CTA Strategy", "content": "Place multiple calls-to-action throughout the page."}, {"title": "Mobile Optimization", "content": "Ensure perfect display on all devices."}]}', 2),

-- Automation Templates
('Email Automation Setup', 'Set up automated email sequences for your business', 'template', 'automation', 'Mail', '{"template_type": "automation", "components": ["Welcome Email", "Follow-up Sequence", "Re-engagement Campaign"], "variables": ["{{user_name}}", "{{product_name}}", "{{cta_link}}"]}', 3),
('Social Media Scheduler', 'Automate your social media posting across platforms', 'template', 'automation', 'Share2', '{"template_type": "automation", "components": ["Content Calendar", "Post Templates", "Engagement Tracker"], "platforms": ["Twitter", "LinkedIn", "Instagram"]}', 4),
('Lead Capture Workflow', 'Capture and nurture leads automatically', 'template', 'automation', 'Users', '{"template_type": "automation", "components": ["Form Builder", "CRM Integration", "Scoring System"], "triggers": ["form_submit", "page_visit", "email_open"]}', 5),

-- Business Checklists
('Launch Checklist', 'Everything you need before going live', 'checklist', 'business', 'Rocket', '{"items": [{"task": "Domain & Hosting Setup", "category": "Technical"}, {"task": "SEO Meta Tags", "category": "Technical"}, {"task": "Analytics Integration", "category": "Technical"}, {"task": "Social Media Profiles", "category": "Marketing"}, {"task": "Email List Setup", "category": "Marketing"}, {"task": "Legal Pages (Privacy, Terms)", "category": "Legal"}, {"task": "Payment Integration", "category": "Business"}, {"task": "Customer Support Channel", "category": "Business"}]}', 6),
('Weekly Growth Rituals', 'Your weekly rhythm for consistent growth', 'checklist', 'business', 'TrendingUp', '{"items": [{"task": "Review Analytics Dashboard", "category": "Analysis"}, {"task": "Engage with 10 Potential Customers", "category": "Outreach"}, {"task": "Create 3 Pieces of Content", "category": "Content"}, {"task": "Test One New Automation", "category": "Systems"}, {"task": "Update Task Board", "category": "Planning"}]}', 7),
('Content Strategy Blueprint', 'Plan your content for maximum impact', 'checklist', 'business', 'FileText', '{"items": [{"task": "Define Target Audience Personas", "category": "Research"}, {"task": "List 20 Pain Points to Address", "category": "Research"}, {"task": "Create Content Pillars", "category": "Strategy"}, {"task": "Set Publishing Schedule", "category": "Planning"}, {"task": "Define Distribution Channels", "category": "Distribution"}]}', 8);