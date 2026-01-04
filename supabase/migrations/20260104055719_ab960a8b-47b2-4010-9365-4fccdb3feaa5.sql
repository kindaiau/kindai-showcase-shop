
-- Add advanced SEO guides
INSERT INTO public.toolkit_content (title, description, content_type, category, icon, order_index, content) VALUES
(
  'Technical SEO Mastery',
  'Deep dive into technical SEO fundamentals: site speed, crawlability, schema markup, and Core Web Vitals optimization.',
  'guide',
  'SEO',
  'Search',
  10,
  '{
    "sections": [
      {
        "title": "Core Web Vitals Optimization",
        "content": "Learn to optimize LCP, FID, and CLS scores for better rankings. Google uses these metrics as ranking factors.",
        "steps": [
          "Audit your current Core Web Vitals using PageSpeed Insights",
          "Optimize Largest Contentful Paint (LCP) by compressing images and lazy loading",
          "Improve First Input Delay (FID) by minimizing JavaScript execution",
          "Fix Cumulative Layout Shift (CLS) by reserving space for dynamic content"
        ]
      },
      {
        "title": "Site Architecture & Crawlability",
        "content": "Structure your site so search engines can efficiently discover and index all your important pages.",
        "steps": [
          "Create a logical URL hierarchy with clear categories",
          "Implement XML sitemaps and submit to Google Search Console",
          "Use internal linking strategically to distribute page authority",
          "Configure robots.txt to guide crawler behavior"
        ]
      },
      {
        "title": "Schema Markup Implementation",
        "content": "Add structured data to help search engines understand your content and display rich snippets.",
        "steps": [
          "Identify appropriate schema types for your content (Article, Product, FAQ, etc.)",
          "Generate JSON-LD markup using schema generators",
          "Test with Google Rich Results Test tool",
          "Monitor rich snippet performance in Search Console"
        ]
      }
    ]
  }'::jsonb
),
(
  'Content SEO Strategy',
  'Master keyword research, content optimization, and building topical authority to dominate search rankings.',
  'guide',
  'SEO',
  'FileText',
  11,
  '{
    "sections": [
      {
        "title": "Advanced Keyword Research",
        "content": "Go beyond basic keyword tools to find high-value, low-competition opportunities.",
        "steps": [
          "Use seed keywords to discover long-tail variations",
          "Analyze competitor content gaps with tools like Ahrefs or SEMrush",
          "Evaluate search intent (informational, transactional, navigational)",
          "Build keyword clusters around pillar topics"
        ]
      },
      {
        "title": "On-Page Optimization",
        "content": "Optimize every element of your pages for maximum search visibility.",
        "steps": [
          "Craft compelling title tags under 60 characters with primary keyword",
          "Write meta descriptions that drive clicks (under 160 characters)",
          "Use H1-H6 heading hierarchy with keyword variations",
          "Optimize images with descriptive alt text and compressed file sizes"
        ]
      },
      {
        "title": "Building Topical Authority",
        "content": "Establish your site as the go-to resource in your niche.",
        "steps": [
          "Create comprehensive pillar content (3000+ words)",
          "Build cluster content linking back to pillar pages",
          "Update and expand existing content regularly",
          "Earn backlinks through original research and data"
        ]
      }
    ]
  }'::jsonb
),
(
  'Local SEO Domination',
  'Rank your local business at the top of Google Maps and local search results.',
  'guide',
  'SEO',
  'MapPin',
  12,
  '{
    "sections": [
      {
        "title": "Google Business Profile Optimization",
        "content": "Your GBP is the foundation of local SEO success.",
        "steps": [
          "Claim and verify your Google Business Profile",
          "Complete every field: hours, services, attributes, products",
          "Add high-quality photos weekly (exterior, interior, team, products)",
          "Post updates and offers regularly to show activity"
        ]
      },
      {
        "title": "Local Citations & NAP Consistency",
        "content": "Build trust signals through consistent business information across the web.",
        "steps": [
          "Audit existing citations for NAP (Name, Address, Phone) consistency",
          "Submit to major directories: Yelp, Yellow Pages, industry-specific",
          "Fix any inconsistencies immediately",
          "Build citations on local chamber of commerce and business associations"
        ]
      },
      {
        "title": "Review Generation Strategy",
        "content": "Reviews are critical ranking factors and trust signals.",
        "steps": [
          "Create a systematic process to request reviews post-service",
          "Respond to ALL reviews within 24 hours (positive and negative)",
          "Never incentivize reviews (violates guidelines)",
          "Showcase reviews on your website with schema markup"
        ]
      }
    ]
  }'::jsonb
);

-- Add monetization strategy guides
INSERT INTO public.toolkit_content (title, description, content_type, category, icon, order_index, content) VALUES
(
  'Affiliate Marketing Blueprint',
  'Build sustainable passive income through strategic affiliate partnerships and content marketing.',
  'guide',
  'Monetization',
  'DollarSign',
  20,
  '{
    "sections": [
      {
        "title": "Choosing Profitable Niches",
        "content": "Select niches with high commissions, recurring revenue, and genuine interest.",
        "steps": [
          "Research commission structures (aim for 20%+ or recurring)",
          "Validate demand with keyword research and trend analysis",
          "Choose products you can genuinely recommend",
          "Analyze competition - avoid oversaturated markets"
        ]
      },
      {
        "title": "Content That Converts",
        "content": "Create content designed to drive affiliate sales naturally.",
        "steps": [
          "Write in-depth product reviews with pros and cons",
          "Create comparison posts (Product A vs Product B)",
          "Build resource pages and best-of lists",
          "Add personal experience and real screenshots"
        ]
      },
      {
        "title": "Traffic & Conversion Optimization",
        "content": "Drive targeted traffic and maximize conversion rates.",
        "steps": [
          "Focus on buyer-intent keywords (best, review, vs, alternative)",
          "Use clear call-to-action buttons with benefit-focused copy",
          "A/B test link placements and button colors",
          "Build an email list to promote offers repeatedly"
        ]
      }
    ]
  }'::jsonb
),
(
  'Digital Product Launch System',
  'Create and launch profitable digital products: courses, ebooks, templates, and software.',
  'guide',
  'Monetization',
  'Package',
  21,
  '{
    "sections": [
      {
        "title": "Product Validation",
        "content": "Validate your product idea before investing months of work.",
        "steps": [
          "Survey your audience about their biggest pain points",
          "Pre-sell the product before building (gauge demand)",
          "Analyze competitor products and reviews for gaps",
          "Start with a Minimum Viable Product (MVP)"
        ]
      },
      {
        "title": "Product Creation",
        "content": "Build a high-quality product efficiently.",
        "steps": [
          "Outline the transformation your product delivers",
          "Break into modules/chapters with clear outcomes",
          "Use screen recordings and templates to speed creation",
          "Get beta tester feedback and iterate"
        ]
      },
      {
        "title": "Launch Strategy",
        "content": "Execute a launch that generates momentum and sales.",
        "steps": [
          "Build anticipation with a waitlist and content series",
          "Create urgency with launch pricing or bonuses",
          "Leverage affiliates and JV partners for reach",
          "Plan post-launch evergreen funnel for ongoing sales"
        ]
      }
    ]
  }'::jsonb
),
(
  'Membership & Subscription Models',
  'Build recurring revenue with membership sites, communities, and subscription services.',
  'guide',
  'Monetization',
  'Users',
  22,
  '{
    "sections": [
      {
        "title": "Membership Model Design",
        "content": "Choose the right model for your audience and content.",
        "steps": [
          "Define your core value proposition (content, community, or tools)",
          "Choose pricing tiers that match value delivery",
          "Plan content cadence you can sustain long-term",
          "Design onboarding to drive early engagement"
        ]
      },
      {
        "title": "Community Building",
        "content": "Create a thriving community that retains members.",
        "steps": [
          "Welcome new members personally in first 24 hours",
          "Create engagement rituals (weekly calls, challenges)",
          "Empower super-members as community leaders",
          "Gather feedback and implement visible improvements"
        ]
      },
      {
        "title": "Reducing Churn",
        "content": "Keep members subscribed month after month.",
        "steps": [
          "Track engagement metrics to identify at-risk members",
          "Create win-back campaigns for churned members",
          "Offer annual plans with discount for commitment",
          "Continuously add value based on member feedback"
        ]
      }
    ]
  }'::jsonb
);

-- Add AI prompt templates
INSERT INTO public.toolkit_content (title, description, content_type, category, icon, order_index, content) VALUES
(
  'ChatGPT Power Prompts',
  'Copy-paste prompts for content creation, research, coding, and business tasks.',
  'template',
  'AI Prompts',
  'Sparkles',
  30,
  '{
    "templates": [
      {
        "name": "Expert Persona Prompt",
        "description": "Get expert-level responses by defining a specific persona",
        "template": "You are a [ROLE] with 20+ years of experience in [FIELD]. You have helped [TYPE OF CLIENTS] achieve [SPECIFIC RESULTS]. I need your expertise on [TOPIC]. Please provide actionable advice based on your experience, including specific examples and common pitfalls to avoid."
      },
      {
        "name": "Content Outline Generator",
        "description": "Generate comprehensive content outlines for any topic",
        "template": "Create a detailed outline for a [CONTENT TYPE] about [TOPIC] targeting [AUDIENCE]. Include:\n- Compelling headline options (3)\n- Introduction hook\n- Main sections with subpoints\n- Key takeaways\n- Call-to-action suggestions\nOptimize for [PRIMARY GOAL: engagement/SEO/conversions]."
      },
      {
        "name": "Problem-Solution Framework",
        "description": "Structured analysis of any business problem",
        "template": "Analyze this problem: [DESCRIBE PROBLEM]\n\nProvide:\n1. Root cause analysis (why this is happening)\n2. Three potential solutions ranked by impact vs effort\n3. Implementation steps for the top solution\n4. Potential risks and mitigation strategies\n5. Success metrics to track"
      },
      {
        "name": "Code Review & Improvement",
        "description": "Get actionable code improvements",
        "template": "Review this [LANGUAGE] code and provide:\n1. Bug identification with fixes\n2. Performance optimization suggestions\n3. Security vulnerability check\n4. Readability improvements\n5. Best practice recommendations\n\nCode:\n[PASTE CODE]"
      }
    ]
  }'::jsonb
),
(
  'Content Creation Prompts',
  'Ready-to-use prompts for blogs, social media, emails, and marketing copy.',
  'template',
  'AI Prompts',
  'PenTool',
  31,
  '{
    "templates": [
      {
        "name": "Blog Post Generator",
        "description": "Create SEO-optimized blog posts",
        "template": "Write a [WORD COUNT]-word blog post about [TOPIC] for [TARGET AUDIENCE].\n\nRequirements:\n- Primary keyword: [KEYWORD]\n- Tone: [PROFESSIONAL/CASUAL/AUTHORITATIVE]\n- Include: Introduction with hook, [NUMBER] main sections, actionable tips, conclusion with CTA\n- Add relevant subheadings for SEO\n- Include a meta description (under 160 characters)"
      },
      {
        "name": "Social Media Content Calendar",
        "description": "Generate a week of social content",
        "template": "Create 7 days of social media content for [PLATFORM] about [TOPIC/BRAND].\n\nFor each day provide:\n- Post copy (optimized for [PLATFORM])\n- Hashtag suggestions\n- Best posting time\n- Content type (carousel, video idea, poll, etc.)\n- Engagement question to include\n\nBrand voice: [DESCRIBE VOICE]"
      },
      {
        "name": "Email Sequence Builder",
        "description": "Create converting email sequences",
        "template": "Create a [NUMBER]-email sequence for [PURPOSE: welcome/sales/nurture].\n\nAudience: [DESCRIBE]\nGoal: [DESIRED ACTION]\n\nFor each email provide:\n- Subject line (with A/B variant)\n- Preview text\n- Email body\n- CTA button text\n- Timing (when to send after previous email)"
      },
      {
        "name": "Landing Page Copy",
        "description": "High-converting landing page sections",
        "template": "Write landing page copy for [PRODUCT/SERVICE].\n\nTarget audience: [DESCRIBE]\nMain benefit: [PRIMARY VALUE PROP]\n\nProvide:\n- Headline + subheadline\n- Problem agitation section\n- Solution introduction\n- 3 key benefits with supporting copy\n- Social proof suggestions\n- FAQ section (5 questions)\n- CTA variations (3)"
      }
    ]
  }'::jsonb
),
(
  'Business Automation Prompts',
  'Prompts for automating workflows, analysis, and decision-making.',
  'template',
  'AI Prompts',
  'Zap',
  32,
  '{
    "templates": [
      {
        "name": "Process Documentation",
        "description": "Document any business process step-by-step",
        "template": "Create detailed documentation for this process: [DESCRIBE PROCESS]\n\nInclude:\n1. Process overview and purpose\n2. Prerequisites and required tools\n3. Step-by-step instructions with screenshots placeholders\n4. Decision points and branching logic\n5. Common errors and troubleshooting\n6. Success criteria and quality checks\n7. Handoff procedures"
      },
      {
        "name": "Competitive Analysis",
        "description": "Analyze competitors systematically",
        "template": "Conduct a competitive analysis of [YOUR COMPANY] vs [COMPETITOR 1], [COMPETITOR 2], [COMPETITOR 3].\n\nAnalyze:\n- Pricing comparison\n- Feature comparison matrix\n- Target audience differences\n- Marketing positioning\n- Strengths and weaknesses\n- Opportunities to differentiate\n- Threats to monitor\n\nFormat as actionable insights."
      },
      {
        "name": "Meeting Summary & Actions",
        "description": "Extract action items from meeting notes",
        "template": "Analyze these meeting notes and provide:\n\n1. Executive summary (3 sentences max)\n2. Key decisions made\n3. Action items with:\n   - Task description\n   - Owner (if mentioned)\n   - Deadline (if mentioned)\n   - Priority level\n4. Open questions requiring follow-up\n5. Next meeting agenda suggestions\n\nMeeting notes:\n[PASTE NOTES]"
      },
      {
        "name": "Customer Feedback Analysis",
        "description": "Extract insights from customer feedback",
        "template": "Analyze this customer feedback and provide:\n\n1. Sentiment breakdown (positive/negative/neutral %)\n2. Top 5 recurring themes\n3. Most requested features/improvements\n4. Critical issues requiring immediate attention\n5. Positive highlights to leverage in marketing\n6. Recommended actions prioritized by impact\n\nFeedback:\n[PASTE FEEDBACK]"
      }
    ]
  }'::jsonb
);

-- Add practical checklists
INSERT INTO public.toolkit_content (title, description, content_type, category, icon, order_index, content) VALUES
(
  'SEO Audit Checklist',
  'Complete checklist to audit and improve your site SEO performance.',
  'checklist',
  'SEO',
  'ClipboardCheck',
  40,
  '{
    "items": [
      {"id": "seo-1", "text": "Run Google PageSpeed Insights and note Core Web Vitals scores", "priority": "high"},
      {"id": "seo-2", "text": "Check Google Search Console for crawl errors and index coverage", "priority": "high"},
      {"id": "seo-3", "text": "Verify XML sitemap is submitted and up-to-date", "priority": "high"},
      {"id": "seo-4", "text": "Audit robots.txt for blocking important pages", "priority": "medium"},
      {"id": "seo-5", "text": "Check all pages have unique title tags under 60 characters", "priority": "high"},
      {"id": "seo-6", "text": "Verify meta descriptions exist and are under 160 characters", "priority": "medium"},
      {"id": "seo-7", "text": "Ensure only one H1 tag per page with target keyword", "priority": "medium"},
      {"id": "seo-8", "text": "Audit images for alt text and compression", "priority": "medium"},
      {"id": "seo-9", "text": "Check for broken internal and external links", "priority": "high"},
      {"id": "seo-10", "text": "Verify HTTPS is implemented site-wide", "priority": "high"},
      {"id": "seo-11", "text": "Test mobile responsiveness on multiple devices", "priority": "high"},
      {"id": "seo-12", "text": "Implement schema markup for key content types", "priority": "medium"},
      {"id": "seo-13", "text": "Check canonical tags are properly set", "priority": "medium"},
      {"id": "seo-14", "text": "Audit internal linking structure", "priority": "medium"},
      {"id": "seo-15", "text": "Review and update outdated content", "priority": "low"}
    ]
  }'::jsonb
),
(
  'Product Launch Checklist',
  'Everything you need before, during, and after launching a digital product.',
  'checklist',
  'Monetization',
  'Rocket',
  41,
  '{
    "items": [
      {"id": "launch-1", "text": "Validate product idea with target audience surveys", "priority": "high"},
      {"id": "launch-2", "text": "Create compelling sales page with clear value proposition", "priority": "high"},
      {"id": "launch-3", "text": "Set up payment processor and test checkout flow", "priority": "high"},
      {"id": "launch-4", "text": "Create email welcome sequence for buyers", "priority": "high"},
      {"id": "launch-5", "text": "Prepare launch email sequence (5-7 emails)", "priority": "high"},
      {"id": "launch-6", "text": "Set up affiliate program and recruit partners", "priority": "medium"},
      {"id": "launch-7", "text": "Create social media announcement graphics", "priority": "medium"},
      {"id": "launch-8", "text": "Write press release or guest post for launch", "priority": "low"},
      {"id": "launch-9", "text": "Set up customer support system and FAQ", "priority": "medium"},
      {"id": "launch-10", "text": "Create bonus content for early buyers", "priority": "medium"},
      {"id": "launch-11", "text": "Test all links, buttons, and forms", "priority": "high"},
      {"id": "launch-12", "text": "Set up analytics and conversion tracking", "priority": "high"},
      {"id": "launch-13", "text": "Prepare testimonials and social proof", "priority": "medium"},
      {"id": "launch-14", "text": "Schedule launch posts across all platforms", "priority": "medium"},
      {"id": "launch-15", "text": "Plan post-launch follow-up sequence", "priority": "medium"}
    ]
  }'::jsonb
),
(
  'AI Implementation Checklist',
  'Steps to successfully integrate AI tools into your business workflow.',
  'checklist',
  'AI Prompts',
  'Bot',
  42,
  '{
    "items": [
      {"id": "ai-1", "text": "Identify 3 high-impact use cases for AI in your workflow", "priority": "high"},
      {"id": "ai-2", "text": "Audit current manual processes that could be automated", "priority": "high"},
      {"id": "ai-3", "text": "Create prompt templates for recurring tasks", "priority": "high"},
      {"id": "ai-4", "text": "Set up AI tool accounts with team access", "priority": "medium"},
      {"id": "ai-5", "text": "Document AI usage guidelines and policies", "priority": "medium"},
      {"id": "ai-6", "text": "Train team on effective prompt engineering", "priority": "high"},
      {"id": "ai-7", "text": "Create quality review process for AI outputs", "priority": "high"},
      {"id": "ai-8", "text": "Set up API integrations for automation", "priority": "medium"},
      {"id": "ai-9", "text": "Establish data privacy protocols for AI tools", "priority": "high"},
      {"id": "ai-10", "text": "Create feedback loop for prompt improvement", "priority": "medium"},
      {"id": "ai-11", "text": "Measure time saved and ROI from AI implementation", "priority": "medium"},
      {"id": "ai-12", "text": "Build library of successful prompts and outputs", "priority": "low"}
    ]
  }'::jsonb
);
