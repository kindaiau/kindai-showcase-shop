-- Seed toolkit_content table with guides, templates, and checklists

-- Getting Started: Welcome Guide
INSERT INTO public.toolkit_content (title, description, content_type, category, icon, order_index, is_premium, content)
VALUES (
  'Welcome to the Rebel Toolkit',
  'Your complete introduction to building a business on your own terms using AI-powered tools and proven frameworks.',
  'guide',
  'Getting Started',
  'Rocket',
  1,
  false,
  '{
    "introduction": "Welcome to the Rebel Toolkit — your launchpad for building a business that works for you, not the other way around. This guide will walk you through everything you need to know to get started.",
    "steps": [
      {
        "title": "Understand the Rebel Philosophy",
        "content": "The Rebel Toolkit is built on one core belief: you don''t need to follow the traditional path to build a successful business. Whether you''re a solo founder, creative professional, or side-hustler, this toolkit gives you the frameworks, templates, and AI agents to move fast and stay lean."
      },
      {
        "title": "Explore Your 3 AI Agents",
        "content": "You have access to three specialized AI agents: the Content Creator for marketing and copywriting, the Business Strategist for planning and positioning, and the Automation Engineer for workflows and tech. Each agent is trained to understand your business context and provide actionable advice."
      },
      {
        "title": "Navigate the Toolkit Dashboard",
        "content": "Your dashboard shows your progress across all guides, templates, and checklists. Use the tabs to switch between content types, and track your completion percentage as you work through each resource."
      },
      {
        "title": "Start with the 7-Day Action Plan",
        "content": "We recommend beginning with the ''First 7 Days Action Plan'' checklist. It''s designed to give you quick wins and build momentum from day one."
      },
      {
        "title": "Join the Rebel Community",
        "content": "You''re not alone on this journey. Connect with other rebels, share your progress, and get feedback on your ideas. The community is your secret weapon for accountability and inspiration."
      }
    ],
    "conclusion": "You''ve got the tools. You''ve got the mindset. Now it''s time to build something remarkable. Let''s go."
  }'::jsonb
);

-- Getting Started: Maximising AI Agents Guide
INSERT INTO public.toolkit_content (title, description, content_type, category, icon, order_index, is_premium, content)
VALUES (
  'Getting the Most from Your 3 AI Agents',
  'Learn how to effectively prompt, collaborate with, and leverage your AI agents for maximum business impact.',
  'guide',
  'Getting Started',
  'Bot',
  2,
  false,
  '{
    "introduction": "Your AI agents are powerful collaborators — but like any tool, their effectiveness depends on how you use them. This guide teaches you the art of working with AI to supercharge your business.",
    "steps": [
      {
        "title": "Content Creator Agent",
        "content": "Use the Content Creator for blog posts, social media captions, email sequences, and marketing copy. Tip: Always provide context about your target audience and brand voice. Example prompt: ''Write a LinkedIn post for my coaching business targeting burnt-out executives. Tone: empathetic but direct.''"
      },
      {
        "title": "Business Strategist Agent",
        "content": "The Strategist helps with positioning, pricing, competitive analysis, and business model design. Tip: Share your current situation and constraints for more relevant advice. Example prompt: ''I''m launching a SaaS for freelancers. Help me identify my unique value proposition compared to Notion and Trello.''"
      },
      {
        "title": "Automation Engineer Agent",
        "content": "This agent designs workflows, recommends tools, and helps you connect your tech stack. Tip: Describe the manual process you want to automate. Example prompt: ''Every time I get a new client inquiry via email, I want to automatically add them to my CRM and send a welcome sequence.''"
      },
      {
        "title": "Prompting Best Practices",
        "content": "Be specific, provide context, and don''t be afraid to ask follow-up questions. Treat the agents like a smart junior employee — they work best with clear instructions and feedback."
      },
      {
        "title": "Iterate and Refine",
        "content": "AI outputs are starting points, not final products. Use the agent''s response as a draft, then refine with your own expertise and voice. The magic happens in the collaboration."
      }
    ],
    "conclusion": "The more you use your agents, the better you''ll get at prompting them. Start with small tasks, build your confidence, and soon you''ll be running circles around the competition."
  }'::jsonb
);

-- Getting Started: Digital Foundation Guide
INSERT INTO public.toolkit_content (title, description, content_type, category, icon, order_index, is_premium, content)
VALUES (
  'Setting Up Your Digital Business Foundation',
  'Essential digital infrastructure every modern business needs — from domains to payment processing.',
  'guide',
  'Getting Started',
  'Globe',
  4,
  false,
  '{
    "introduction": "Before you can sell anything, you need a solid digital foundation. This guide covers the essential infrastructure that will support your business as it grows.",
    "steps": [
      {
        "title": "Domain and Branding",
        "content": "Secure a domain name that''s memorable, easy to spell, and reflects your brand. Use Namecheap or Google Domains. Set up a professional email (yourname@yourdomain.com) using Google Workspace or Zoho."
      },
      {
        "title": "Website Essentials",
        "content": "You don''t need a complex website to start. Use Carrd, Webflow, or Framer for a simple landing page. Essential pages: Home, About, Services/Products, Contact. Add clear calls-to-action on every page."
      },
      {
        "title": "Payment Processing",
        "content": "Set up Stripe or PayPal for accepting payments. For digital products, consider Gumroad or Lemon Squeezy. Make sure you can accept payments before you start marketing."
      },
      {
        "title": "Email Marketing Setup",
        "content": "Email is still the highest-ROI marketing channel. Set up ConvertKit, Mailchimp, or Beehiiv. Create a simple welcome sequence for new subscribers."
      },
      {
        "title": "Analytics and Tracking",
        "content": "Install Google Analytics or Plausible on your website. Set up conversion tracking for key actions (email signups, purchases). What gets measured gets improved."
      },
      {
        "title": "Legal Basics",
        "content": "Create a Privacy Policy and Terms of Service. Consider forming an LLC or similar structure for liability protection. Consult a professional for your specific situation."
      }
    ],
    "conclusion": "With these foundations in place, you''re ready to start building and selling. Don''t overthink it — launch fast, learn faster."
  }'::jsonb
);

-- Getting Started: 7-Day Action Plan Checklist
INSERT INTO public.toolkit_content (title, description, content_type, category, icon, order_index, is_premium, content)
VALUES (
  'First 7 Days Action Plan',
  'A day-by-day checklist to build momentum and make real progress in your first week with the toolkit.',
  'checklist',
  'Getting Started',
  'Calendar',
  3,
  false,
  '{
    "categories": [
      {
        "name": "Day 1: Orientation",
        "items": [
          {"label": "Complete the Welcome Guide", "description": "Understand the toolkit philosophy and structure"},
          {"label": "Explore all three AI agents", "description": "Send a test message to each agent"},
          {"label": "Set your 90-day business goal", "description": "What do you want to achieve?"}
        ]
      },
      {
        "name": "Day 2: Foundation",
        "items": [
          {"label": "Review the Digital Foundation guide", "description": "Identify gaps in your current setup"},
          {"label": "Secure your domain name", "description": "If you don''t have one already"},
          {"label": "Set up professional email", "description": "yourname@yourdomain.com"}
        ]
      },
      {
        "name": "Day 3: Strategy",
        "items": [
          {"label": "Complete the Business Model Canvas", "description": "Use the Strategist agent for guidance"},
          {"label": "Identify your ideal customer", "description": "Be specific about who you serve"},
          {"label": "Draft your unique value proposition", "description": "What makes you different?"}
        ]
      },
      {
        "name": "Day 4: Content",
        "items": [
          {"label": "Create your content strategy", "description": "Use the Content Strategy Template"},
          {"label": "Write your first blog post or social post", "description": "Use the Content Creator agent"},
          {"label": "Set up your email marketing platform", "description": "ConvertKit, Mailchimp, or similar"}
        ]
      },
      {
        "name": "Day 5: Tech",
        "items": [
          {"label": "Review the No-Code Tech Stack checklist", "description": "Identify tools you need"},
          {"label": "Set up one automation", "description": "Use the Automation Engineer agent"},
          {"label": "Connect your key tools", "description": "CRM, email, calendar integration"}
        ]
      },
      {
        "name": "Day 6: Launch Prep",
        "items": [
          {"label": "Create a simple landing page", "description": "Use Carrd, Webflow, or similar"},
          {"label": "Set up payment processing", "description": "Stripe, PayPal, or Gumroad"},
          {"label": "Write your first email sequence", "description": "Welcome + value emails"}
        ]
      },
      {
        "name": "Day 7: Go Live",
        "items": [
          {"label": "Publish your landing page", "description": "It doesn''t have to be perfect"},
          {"label": "Share with 5 people for feedback", "description": "Friends, family, or potential customers"},
          {"label": "Celebrate your progress!", "description": "You''ve built more in 7 days than most do in 7 months"}
        ]
      }
    ]
  }'::jsonb
);

-- Content: Content Strategy Template
INSERT INTO public.toolkit_content (title, description, content_type, category, icon, order_index, is_premium, content)
VALUES (
  'Content Strategy Template',
  'A comprehensive template to plan your content across all channels with clear goals and metrics.',
  'template',
  'Content',
  'FileText',
  5,
  false,
  '{
    "components": [
      {
        "name": "Content Mission Statement",
        "fields": [
          {"label": "Target Audience", "placeholder": "Who are you creating content for?", "type": "textarea"},
          {"label": "Content Purpose", "placeholder": "What value does your content provide?", "type": "textarea"},
          {"label": "Brand Voice", "placeholder": "How should your content sound? (e.g., professional, casual, bold)", "type": "text"}
        ]
      },
      {
        "name": "Content Pillars",
        "fields": [
          {"label": "Pillar 1", "placeholder": "Main topic area (e.g., Industry insights)", "type": "text"},
          {"label": "Pillar 2", "placeholder": "Main topic area (e.g., How-to guides)", "type": "text"},
          {"label": "Pillar 3", "placeholder": "Main topic area (e.g., Behind-the-scenes)", "type": "text"},
          {"label": "Pillar 4", "placeholder": "Main topic area (e.g., Customer stories)", "type": "text"}
        ]
      },
      {
        "name": "Channel Strategy",
        "fields": [
          {"label": "Primary Channel", "placeholder": "Where will you focus most effort?", "type": "text"},
          {"label": "Secondary Channels", "placeholder": "Other platforms to repurpose content", "type": "text"},
          {"label": "Posting Frequency", "placeholder": "How often will you publish per channel?", "type": "text"}
        ]
      },
      {
        "name": "Content Calendar",
        "fields": [
          {"label": "Weekly Themes", "placeholder": "Recurring themes for each day/week", "type": "textarea"},
          {"label": "Monthly Campaigns", "placeholder": "Bigger content pushes or launches", "type": "textarea"},
          {"label": "Evergreen Content", "placeholder": "Timeless content to create", "type": "textarea"}
        ]
      },
      {
        "name": "Metrics & Goals",
        "fields": [
          {"label": "Key Metrics", "placeholder": "What will you measure? (followers, engagement, conversions)", "type": "textarea"},
          {"label": "90-Day Goals", "placeholder": "Specific targets for the next quarter", "type": "textarea"}
        ]
      }
    ],
    "variables": {
      "targetAudience": "",
      "contentPurpose": "",
      "brandVoice": "",
      "primaryChannel": ""
    }
  }'::jsonb
);

-- Content: Social Media Launch Checklist
INSERT INTO public.toolkit_content (title, description, content_type, category, icon, order_index, is_premium, content)
VALUES (
  'Social Media Launch Checklist',
  'Everything you need to launch your brand on social media with confidence and consistency.',
  'checklist',
  'Content',
  'Share2',
  6,
  false,
  '{
    "categories": [
      {
        "name": "Profile Setup",
        "items": [
          {"label": "Choose your primary platform", "description": "Go where your audience is"},
          {"label": "Secure your handle/username", "description": "Keep it consistent across platforms"},
          {"label": "Write a compelling bio", "description": "Clear value proposition in 160 characters"},
          {"label": "Add profile and cover images", "description": "Professional, on-brand visuals"},
          {"label": "Add website link", "description": "Link to landing page or link-in-bio tool"}
        ]
      },
      {
        "name": "Content Preparation",
        "items": [
          {"label": "Define your content pillars", "description": "3-5 main topics you''ll cover"},
          {"label": "Create 10 posts in advance", "description": "Build a content buffer"},
          {"label": "Design post templates", "description": "Use Canva or similar for consistency"},
          {"label": "Write your hashtag strategy", "description": "Mix of niche and broader tags"},
          {"label": "Schedule your first week", "description": "Use a scheduling tool"}
        ]
      },
      {
        "name": "Engagement Strategy",
        "items": [
          {"label": "Identify 20 accounts to engage with", "description": "Peers, influencers, potential customers"},
          {"label": "Set daily engagement time", "description": "15-30 min of genuine interaction"},
          {"label": "Create a response template library", "description": "Common replies and FAQs"},
          {"label": "Plan your DM strategy", "description": "How will you handle inquiries?"}
        ]
      },
      {
        "name": "Launch Week",
        "items": [
          {"label": "Announce your launch", "description": "Tell your existing network"},
          {"label": "Post daily for the first week", "description": "Build momentum"},
          {"label": "Respond to every comment", "description": "Show you''re active and engaged"},
          {"label": "Cross-promote on other channels", "description": "Email list, other socials"}
        ]
      }
    ]
  }'::jsonb
);

-- Content: Blog Post SEO Guide
INSERT INTO public.toolkit_content (title, description, content_type, category, icon, order_index, is_premium, content)
VALUES (
  'Blog Post SEO Guide',
  'Optimize your blog content for search engines without sacrificing readability or authenticity.',
  'guide',
  'Content',
  'Search',
  7,
  false,
  '{
    "introduction": "SEO doesn''t have to be complicated or feel slimy. This guide shows you how to optimize your blog posts so the right people find you — while still writing content you''re proud of.",
    "steps": [
      {
        "title": "Keyword Research",
        "content": "Use free tools like Ubersuggest, AnswerThePublic, or Google''s \"People Also Ask\" to find what your audience is searching for. Focus on long-tail keywords (3-5 words) with lower competition. Example: Instead of ''marketing'', target ''marketing for solo consultants''."
      },
      {
        "title": "Title Optimization",
        "content": "Include your primary keyword near the beginning of your title. Keep it under 60 characters. Make it compelling — your title is your first impression. Example: ''The Solo Consultant''s Guide to Marketing (Without Feeling Sleazy)''"
      },
      {
        "title": "Structure Your Content",
        "content": "Use H2 and H3 headings to break up your content. Include your keyword in at least one subheading. Aim for 1,500-2,500 words for comprehensive guides. Use short paragraphs (2-3 sentences) for readability."
      },
      {
        "title": "Optimize Meta Description",
        "content": "Write a compelling 150-160 character summary. Include your primary keyword naturally. Think of it as ad copy — make people want to click."
      },
      {
        "title": "Internal and External Links",
        "content": "Link to 2-3 other posts on your site. Link to 1-2 authoritative external sources. Use descriptive anchor text (not ''click here'')."
      },
      {
        "title": "Image Optimization",
        "content": "Use descriptive file names (not IMG_1234.jpg). Add alt text describing the image. Compress images for faster loading. Include at least one relevant image per post."
      },
      {
        "title": "Call to Action",
        "content": "End every post with a clear next step. Email signup, related post, or product/service offer. Don''t let readers leave without an invitation to go deeper."
      }
    ],
    "conclusion": "SEO is a long game. Publish consistently, optimize thoughtfully, and focus on genuinely helping your readers. The rankings will follow."
  }'::jsonb
);

-- Content: Email Sequence Template
INSERT INTO public.toolkit_content (title, description, content_type, category, icon, order_index, is_premium, content)
VALUES (
  'Email Sequence Planning Template',
  'Plan and write email sequences that nurture leads, build trust, and drive conversions.',
  'template',
  'Content',
  'Mail',
  8,
  false,
  '{
    "components": [
      {
        "name": "Sequence Overview",
        "fields": [
          {"label": "Sequence Name", "placeholder": "e.g., Welcome Sequence, Launch Sequence", "type": "text"},
          {"label": "Sequence Goal", "placeholder": "What action do you want subscribers to take?", "type": "textarea"},
          {"label": "Target Audience", "placeholder": "Who is this sequence for?", "type": "textarea"},
          {"label": "Number of Emails", "placeholder": "Recommended: 5-7 for welcome, 7-10 for launch", "type": "text"}
        ]
      },
      {
        "name": "Email 1: Welcome",
        "fields": [
          {"label": "Subject Line", "placeholder": "Make it personal and intriguing", "type": "text"},
          {"label": "Main Message", "placeholder": "Thank them, set expectations, deliver promised value", "type": "textarea"},
          {"label": "Call to Action", "placeholder": "What should they do after reading?", "type": "text"}
        ]
      },
      {
        "name": "Email 2: Value",
        "fields": [
          {"label": "Subject Line", "placeholder": "Promise a specific benefit", "type": "text"},
          {"label": "Main Message", "placeholder": "Teach something useful, share a framework or tip", "type": "textarea"},
          {"label": "Call to Action", "placeholder": "Engage: reply, share, or implement", "type": "text"}
        ]
      },
      {
        "name": "Email 3: Story",
        "fields": [
          {"label": "Subject Line", "placeholder": "Use curiosity or emotion", "type": "text"},
          {"label": "Main Message", "placeholder": "Share your journey, a client story, or a lesson learned", "type": "textarea"},
          {"label": "Call to Action", "placeholder": "Build connection: ask a question", "type": "text"}
        ]
      },
      {
        "name": "Email 4: Authority",
        "fields": [
          {"label": "Subject Line", "placeholder": "Position your expertise", "type": "text"},
          {"label": "Main Message", "placeholder": "Share results, case studies, or unique insights", "type": "textarea"},
          {"label": "Call to Action", "placeholder": "Soft pitch or resource share", "type": "text"}
        ]
      },
      {
        "name": "Email 5: Offer",
        "fields": [
          {"label": "Subject Line", "placeholder": "Clear, direct, benefit-focused", "type": "text"},
          {"label": "Main Message", "placeholder": "Present your offer, address objections, create urgency", "type": "textarea"},
          {"label": "Call to Action", "placeholder": "Buy, book, or sign up", "type": "text"}
        ]
      }
    ],
    "variables": {
      "sequenceName": "",
      "sequenceGoal": "",
      "targetAudience": "",
      "numberOfEmails": ""
    }
  }'::jsonb
);

-- Strategy: Business Model Canvas Guide
INSERT INTO public.toolkit_content (title, description, content_type, category, icon, order_index, is_premium, content)
VALUES (
  'Business Model Canvas Guide',
  'A practical walkthrough of the Business Model Canvas adapted for solo founders and small teams.',
  'guide',
  'Strategy',
  'Grid3x3',
  9,
  false,
  '{
    "introduction": "The Business Model Canvas is a one-page strategic tool that helps you visualize, design, and pivot your business model. This guide walks you through each section with a rebel lens — practical, no-fluff, and focused on what actually matters for solo founders.",
    "steps": [
      {
        "title": "Customer Segments",
        "content": "Who are you creating value for? Be specific. ''Everyone'' is not a customer segment. Example: ''Freelance designers earning $50-150K who want to productize their services.'' Use your Strategist agent to help narrow this down."
      },
      {
        "title": "Value Propositions",
        "content": "What problem do you solve? What value do you deliver? Focus on outcomes, not features. Example: ''We help freelancers package their expertise into scalable digital products, so they can earn while they sleep.''"
      },
      {
        "title": "Channels",
        "content": "How do customers find you and buy from you? For most rebels, this is: Content (blog, social, podcast) → Email list → Sales page → Payment processor. Keep it simple to start."
      },
      {
        "title": "Customer Relationships",
        "content": "What type of relationship does your customer expect? Self-service (courses, digital products), personal assistance (coaching, consulting), or community (membership)? This affects your pricing and operations."
      },
      {
        "title": "Revenue Streams",
        "content": "How do you make money? One-time purchases, subscriptions, retainers, licensing? Start with one primary revenue stream. You can diversify later."
      },
      {
        "title": "Key Resources",
        "content": "What do you need to deliver your value proposition? For most rebels: Your expertise, your content, your tools (tech stack), and your time. This is where your AI agents become key resources."
      },
      {
        "title": "Key Activities",
        "content": "What must you do daily/weekly to run this business? Content creation, sales conversations, product delivery, customer support. Be honest about what you enjoy vs. what you should automate or outsource."
      },
      {
        "title": "Key Partnerships",
        "content": "Who helps you succeed? Affiliates, collaborators, service providers, tool partners. Even as a solo founder, you''re not truly alone."
      },
      {
        "title": "Cost Structure",
        "content": "What are your fixed and variable costs? Keep overhead low as a rebel. Focus on tools that multiply your output, not vanity expenses."
      }
    ],
    "conclusion": "Your business model isn''t static. Revisit this canvas quarterly to refine and adapt. Use your Strategist agent to stress-test your assumptions."
  }'::jsonb
);

-- Strategy: Pricing Strategy Template
INSERT INTO public.toolkit_content (title, description, content_type, category, icon, order_index, is_premium, content)
VALUES (
  'Pricing Strategy Template',
  'A structured approach to pricing your products and services for maximum value and profit.',
  'template',
  'Strategy',
  'DollarSign',
  10,
  false,
  '{
    "components": [
      {
        "name": "Product/Service Definition",
        "fields": [
          {"label": "What are you pricing?", "placeholder": "Product or service name", "type": "text"},
          {"label": "What outcome does it deliver?", "placeholder": "The transformation or result for the customer", "type": "textarea"},
          {"label": "What is the value of that outcome?", "placeholder": "In dollars, time saved, or other metrics", "type": "textarea"}
        ]
      },
      {
        "name": "Cost Analysis",
        "fields": [
          {"label": "Direct Costs", "placeholder": "Cost of delivery, tools, materials", "type": "text"},
          {"label": "Time Investment", "placeholder": "Hours per sale/client at your hourly rate", "type": "text"},
          {"label": "Minimum Viable Price", "placeholder": "Lowest price that covers costs + profit margin", "type": "text"}
        ]
      },
      {
        "name": "Market Research",
        "fields": [
          {"label": "Competitor Price Range", "placeholder": "What do alternatives charge?", "type": "text"},
          {"label": "Where do you want to position?", "placeholder": "Budget, mid-market, or premium?", "type": "text"},
          {"label": "What justifies your positioning?", "placeholder": "Unique value, experience, results", "type": "textarea"}
        ]
      },
      {
        "name": "Pricing Model",
        "fields": [
          {"label": "Pricing Structure", "placeholder": "One-time, subscription, retainer, tiered?", "type": "text"},
          {"label": "Anchor Price", "placeholder": "Highest tier or full price", "type": "text"},
          {"label": "Entry Price", "placeholder": "Lowest tier or discounted option", "type": "text"},
          {"label": "Target Price", "placeholder": "The price you want most customers to pay", "type": "text"}
        ]
      },
      {
        "name": "Testing & Iteration",
        "fields": [
          {"label": "How will you test pricing?", "placeholder": "A/B test, cohort pricing, price increase plan", "type": "textarea"},
          {"label": "When will you review?", "placeholder": "Set a date to evaluate and adjust", "type": "text"}
        ]
      }
    ],
    "variables": {
      "productName": "",
      "outcomeValue": "",
      "targetPrice": "",
      "positioningStrategy": ""
    }
  }'::jsonb
);

-- Strategy: Competitor Analysis Checklist
INSERT INTO public.toolkit_content (title, description, content_type, category, icon, order_index, is_premium, content)
VALUES (
  'Competitor Analysis Checklist',
  'Systematically analyze your competition to find opportunities and differentiate your offering.',
  'checklist',
  'Strategy',
  'Target',
  11,
  false,
  '{
    "categories": [
      {
        "name": "Identify Competitors",
        "items": [
          {"label": "List 3-5 direct competitors", "description": "Businesses solving the same problem for the same audience"},
          {"label": "List 2-3 indirect competitors", "description": "Alternative solutions your customers might choose"},
          {"label": "Identify aspirational competitors", "description": "Bigger players you want to learn from"}
        ]
      },
      {
        "name": "Analyze Their Offering",
        "items": [
          {"label": "Document their products/services", "description": "What do they sell and at what price points?"},
          {"label": "Identify their unique value proposition", "description": "How do they position themselves?"},
          {"label": "Note their strengths", "description": "What do they do better than you?"},
          {"label": "Note their weaknesses", "description": "Where do they fall short or get complaints?"}
        ]
      },
      {
        "name": "Study Their Marketing",
        "items": [
          {"label": "Review their website and messaging", "description": "What language and emotions do they use?"},
          {"label": "Analyze their content strategy", "description": "Blog, podcast, social media presence"},
          {"label": "Sign up for their email list", "description": "Study their nurture sequences"},
          {"label": "Check their social proof", "description": "Testimonials, case studies, reviews"}
        ]
      },
      {
        "name": "Customer Insights",
        "items": [
          {"label": "Read their reviews", "description": "What do customers love and hate?"},
          {"label": "Check community discussions", "description": "Reddit, Twitter, Facebook groups"},
          {"label": "Talk to their customers if possible", "description": "What would they change?"}
        ]
      },
      {
        "name": "Find Your Edge",
        "items": [
          {"label": "Identify gaps in the market", "description": "What needs aren''t being met?"},
          {"label": "Define your differentiator", "description": "What will you do differently or better?"},
          {"label": "Document your competitive positioning", "description": "Write a clear statement of why you''re different"}
        ]
      }
    ]
  }'::jsonb
);

-- Strategy: 90-Day Launch Roadmap Guide
INSERT INTO public.toolkit_content (title, description, content_type, category, icon, order_index, is_premium, content)
VALUES (
  '90-Day Launch Roadmap Guide',
  'A phased approach to launching your product or service in 90 days with clear milestones.',
  'guide',
  'Strategy',
  'Map',
  12,
  true,
  '{
    "introduction": "90 days is the perfect timeframe to go from idea to launched business. Long enough to build something real, short enough to maintain urgency. This roadmap breaks it down into three phases.",
    "steps": [
      {
        "title": "Phase 1: Foundation (Days 1-30)",
        "content": "This phase is about clarity and setup. Define your target customer, validate your idea with real conversations, set up your digital infrastructure, and create your core offer. Key milestone: A clear offer you can describe in one sentence and a way to accept payments."
      },
      {
        "title": "Week 1-2: Clarity",
        "content": "Complete the Business Model Canvas. Define your ideal customer avatar. Validate your idea by talking to 10 potential customers. Refine your value proposition based on feedback."
      },
      {
        "title": "Week 3-4: Infrastructure",
        "content": "Set up your website/landing page. Configure payment processing. Build your email list foundation. Create your basic content strategy."
      },
      {
        "title": "Phase 2: Content & Audience (Days 31-60)",
        "content": "This phase is about building visibility and trust. Create valuable content, grow your email list, establish your presence on one primary platform. Key milestone: 100+ engaged email subscribers."
      },
      {
        "title": "Week 5-6: Content Creation",
        "content": "Write 4 cornerstone blog posts or create equivalent content. Build your email welcome sequence. Start posting on your primary social platform."
      },
      {
        "title": "Week 7-8: Audience Growth",
        "content": "Launch a lead magnet to grow your list. Engage actively in communities where your customers hang out. Guest post, podcast, or collaborate with others in your space."
      },
      {
        "title": "Phase 3: Launch (Days 61-90)",
        "content": "This phase is about momentum and sales. Execute your launch sequence, handle objections, gather testimonials, and refine based on feedback. Key milestone: First paying customers and clear next steps."
      },
      {
        "title": "Week 9-10: Pre-Launch",
        "content": "Tease your offer to your audience. Create your sales page and checkout flow. Write your launch email sequence. Line up any launch partners or affiliates."
      },
      {
        "title": "Week 11-12: Launch & Iterate",
        "content": "Execute your launch. Open and close cart (if using scarcity). Follow up with leads. Gather feedback and testimonials. Plan your next phase."
      }
    ],
    "conclusion": "The goal of the first 90 days isn''t perfection — it''s progress. Launch, learn, and iterate. Your second 90 days will be even better."
  }'::jsonb
);

-- Tech: Automation Workflows Guide
INSERT INTO public.toolkit_content (title, description, content_type, category, icon, order_index, is_premium, content)
VALUES (
  'Essential Automation Workflows Guide',
  'High-impact automations every business should implement to save time and reduce errors.',
  'guide',
  'Tech',
  'Zap',
  13,
  false,
  '{
    "introduction": "Automation is your unfair advantage as a solo founder. This guide covers the essential workflows that will save you hours every week and make your business run smoother — even when you''re not working.",
    "steps": [
      {
        "title": "New Lead Automation",
        "content": "When someone fills out your contact form or lead magnet: 1) Add to your CRM, 2) Send welcome email, 3) Notify you via Slack/email, 4) Add to your email nurture sequence. Tools: Zapier/Make connecting your form to your CRM and email platform."
      },
      {
        "title": "New Customer Onboarding",
        "content": "When someone makes a purchase: 1) Send confirmation email, 2) Deliver digital product or access, 3) Add to customer segment in email tool, 4) Start customer onboarding sequence, 5) Create task to follow up in 7 days. Tools: Stripe → Zapier → Email + CRM."
      },
      {
        "title": "Content Repurposing",
        "content": "When you publish a blog post: 1) Create social media posts for multiple platforms, 2) Schedule across the week, 3) Add to your content library. Use your Content Creator agent to generate variations, then schedule via Buffer or Hootsuite."
      },
      {
        "title": "Calendar & Booking",
        "content": "When someone books a call: 1) Send confirmation with prep questions, 2) Add to your CRM, 3) Send reminder 24 hours before, 4) Send follow-up after the call with next steps. Tools: Calendly/Cal.com → Zapier → CRM + Email."
      },
      {
        "title": "Social Proof Collection",
        "content": "After purchase or project completion: 1) Wait 7-14 days, 2) Send feedback request, 3) If positive, ask for testimonial/review, 4) Add testimonials to your testimonial library. Tools: Typeform/Tally → Zapier → Notion/Airtable."
      },
      {
        "title": "Weekly Review Automation",
        "content": "Every Friday: 1) Pull key metrics from your tools, 2) Generate summary report, 3) Send to your email for review. Tools: Zapier/Make scheduled triggers → Data pulls → Email summary."
      }
    ],
    "conclusion": "Start with one automation, perfect it, then add another. Use your Automation Engineer agent to design custom workflows for your specific needs."
  }'::jsonb
);

-- Tech: No-Code Tech Stack Checklist
INSERT INTO public.toolkit_content (title, description, content_type, category, icon, order_index, is_premium, content)
VALUES (
  'No-Code Tech Stack Checklist',
  'Build a powerful business infrastructure without writing code using these proven tools.',
  'checklist',
  'Tech',
  'Layers',
  14,
  false,
  '{
    "categories": [
      {
        "name": "Website & Landing Pages",
        "items": [
          {"label": "Choose a website builder", "description": "Carrd, Webflow, Framer, or Squarespace"},
          {"label": "Set up hosting and domain", "description": "Most builders include hosting"},
          {"label": "Create essential pages", "description": "Home, About, Services, Contact"},
          {"label": "Optimize for mobile", "description": "Test on multiple devices"}
        ]
      },
      {
        "name": "Email Marketing",
        "items": [
          {"label": "Choose an email platform", "description": "ConvertKit, Mailchimp, Beehiiv, or Kit"},
          {"label": "Create signup forms", "description": "Embed on website and landing pages"},
          {"label": "Build welcome sequence", "description": "3-5 emails to nurture new subscribers"},
          {"label": "Set up segments and tags", "description": "Organize subscribers by interest/behavior"}
        ]
      },
      {
        "name": "Payments & E-commerce",
        "items": [
          {"label": "Set up payment processor", "description": "Stripe, PayPal, or Paddle"},
          {"label": "Choose a storefront solution", "description": "Gumroad, Lemon Squeezy, or Podia"},
          {"label": "Configure tax handling", "description": "Use Stripe Tax or similar for compliance"},
          {"label": "Set up invoicing", "description": "For custom or B2B sales"}
        ]
      },
      {
        "name": "CRM & Customer Management",
        "items": [
          {"label": "Choose a CRM", "description": "Notion, Airtable, HubSpot Free, or Pipedrive"},
          {"label": "Define your pipeline stages", "description": "Lead → Prospect → Customer → Advocate"},
          {"label": "Set up contact forms", "description": "Connect to CRM automatically"},
          {"label": "Create customer profiles", "description": "Track interactions and notes"}
        ]
      },
      {
        "name": "Automation",
        "items": [
          {"label": "Choose an automation tool", "description": "Zapier, Make, or n8n"},
          {"label": "Map your key workflows", "description": "Identify repetitive tasks to automate"},
          {"label": "Build 3 core automations", "description": "New lead, new customer, weekly review"},
          {"label": "Test and refine", "description": "Check automations run reliably"}
        ]
      },
      {
        "name": "Analytics & Tracking",
        "items": [
          {"label": "Install analytics", "description": "Google Analytics, Plausible, or Fathom"},
          {"label": "Set up conversion tracking", "description": "Track signups, purchases, key actions"},
          {"label": "Create a dashboard", "description": "Visualize key metrics in one place"},
          {"label": "Schedule weekly reviews", "description": "Make data-driven decisions"}
        ]
      }
    ]
  }'::jsonb
);

-- Tech: Website Launch Checklist
INSERT INTO public.toolkit_content (title, description, content_type, category, icon, order_index, is_premium, content)
VALUES (
  'Website Launch Checklist',
  'Ensure your website is ready for launch with this comprehensive pre-launch checklist.',
  'checklist',
  'Tech',
  'Globe',
  15,
  false,
  '{
    "categories": [
      {
        "name": "Content & Copy",
        "items": [
          {"label": "Proofread all content", "description": "No typos or grammatical errors"},
          {"label": "Check all links work", "description": "Internal and external links"},
          {"label": "Verify contact information", "description": "Email, phone, social links accurate"},
          {"label": "Review all CTAs", "description": "Clear, compelling calls-to-action"},
          {"label": "Add alt text to images", "description": "For accessibility and SEO"}
        ]
      },
      {
        "name": "Technical Setup",
        "items": [
          {"label": "Connect custom domain", "description": "www and non-www redirect properly"},
          {"label": "Install SSL certificate", "description": "Site loads with HTTPS"},
          {"label": "Test site speed", "description": "Use PageSpeed Insights, aim for 90+"},
          {"label": "Check mobile responsiveness", "description": "Test on multiple devices"},
          {"label": "Set up 404 page", "description": "Helpful error page for missing pages"}
        ]
      },
      {
        "name": "SEO Essentials",
        "items": [
          {"label": "Add meta titles and descriptions", "description": "Unique for each page"},
          {"label": "Submit sitemap to Google", "description": "Via Google Search Console"},
          {"label": "Set up Google Search Console", "description": "Monitor search performance"},
          {"label": "Add Open Graph tags", "description": "For social media sharing"},
          {"label": "Create robots.txt", "description": "Guide search engine crawlers"}
        ]
      },
      {
        "name": "Analytics & Tracking",
        "items": [
          {"label": "Install analytics", "description": "Google Analytics or privacy-friendly alternative"},
          {"label": "Set up goal tracking", "description": "Track form submissions, purchases"},
          {"label": "Install Facebook Pixel (if needed)", "description": "For remarketing campaigns"},
          {"label": "Test tracking works", "description": "Verify data is being collected"}
        ]
      },
      {
        "name": "Legal & Compliance",
        "items": [
          {"label": "Add Privacy Policy", "description": "Required for most websites"},
          {"label": "Add Terms of Service", "description": "Especially for businesses with transactions"},
          {"label": "Cookie consent banner", "description": "Required in EU and many jurisdictions"},
          {"label": "Accessibility check", "description": "Basic WCAG compliance"}
        ]
      },
      {
        "name": "Launch Day",
        "items": [
          {"label": "Remove any ''coming soon'' content", "description": "Replace with live content"},
          {"label": "Test all forms", "description": "Submit and verify you receive them"},
          {"label": "Test payment flow", "description": "Complete a test purchase"},
          {"label": "Announce the launch!", "description": "Email list, social media, friends"}
        ]
      }
    ]
  }'::jsonb
);

-- Tech: Integration Planning Template
INSERT INTO public.toolkit_content (title, description, content_type, category, icon, order_index, is_premium, content)
VALUES (
  'Integration Planning Template',
  'Plan and document integrations between your business tools for a seamless tech ecosystem.',
  'template',
  'Tech',
  'Link',
  16,
  false,
  '{
    "components": [
      {
        "name": "Integration Overview",
        "fields": [
          {"label": "Integration Name", "placeholder": "e.g., Stripe to ConvertKit", "type": "text"},
          {"label": "Source Tool", "placeholder": "Where does the data come from?", "type": "text"},
          {"label": "Destination Tool", "placeholder": "Where does the data go?", "type": "text"},
          {"label": "Purpose", "placeholder": "What problem does this integration solve?", "type": "textarea"}
        ]
      },
      {
        "name": "Trigger",
        "fields": [
          {"label": "Trigger Event", "placeholder": "What starts this integration? (e.g., new purchase, form submission)", "type": "text"},
          {"label": "Trigger Conditions", "placeholder": "Any filters or conditions? (e.g., only for purchases over $100)", "type": "textarea"}
        ]
      },
      {
        "name": "Actions",
        "fields": [
          {"label": "Action 1", "placeholder": "First thing that happens (e.g., add tag ''customer'')", "type": "text"},
          {"label": "Action 2", "placeholder": "Second action (e.g., send welcome email)", "type": "text"},
          {"label": "Action 3", "placeholder": "Third action (e.g., create CRM record)", "type": "text"},
          {"label": "Additional Actions", "placeholder": "Any other steps in this workflow?", "type": "textarea"}
        ]
      },
      {
        "name": "Data Mapping",
        "fields": [
          {"label": "Fields to Transfer", "placeholder": "Which data fields need to move? (e.g., email, name, purchase amount)", "type": "textarea"},
          {"label": "Transformation Needed?", "placeholder": "Does data need to be formatted or changed?", "type": "textarea"}
        ]
      },
      {
        "name": "Testing & Maintenance",
        "fields": [
          {"label": "Test Scenario", "placeholder": "How will you test this integration works?", "type": "textarea"},
          {"label": "Monitoring", "placeholder": "How will you know if it breaks?", "type": "text"},
          {"label": "Owner", "placeholder": "Who is responsible for this integration?", "type": "text"}
        ]
      }
    ],
    "variables": {
      "integrationName": "",
      "sourceTool": "",
      "destinationTool": "",
      "triggerEvent": ""
    }
  }'::jsonb
);

-- Mindset: Imposter Syndrome Guide
INSERT INTO public.toolkit_content (title, description, content_type, category, icon, order_index, is_premium, content)
VALUES (
  'Overcoming Imposter Syndrome Guide',
  'Practical strategies for managing self-doubt and showing up with confidence as a founder.',
  'guide',
  'Mindset',
  'Sparkles',
  17,
  false,
  '{
    "introduction": "Every founder feels like a fraud sometimes. The difference between those who succeed and those who don''t isn''t the absence of imposter syndrome — it''s learning to act despite it. This guide gives you practical tools to manage self-doubt.",
    "steps": [
      {
        "title": "Recognize the Pattern",
        "content": "Imposter syndrome often shows up as: ''Who am I to do this?'' ''They''re going to find out I don''t know what I''m doing.'' ''Others are so much more qualified.'' These thoughts are normal. The goal isn''t to eliminate them, but to recognize them as unhelpful patterns, not facts."
      },
      {
        "title": "Keep an Evidence File",
        "content": "Create a document with proof of your competence: positive feedback, client results, problems you''ve solved, skills you''ve learned. When imposter syndrome hits, review this file. Your brain forgets evidence of your capabilities; this file reminds it."
      },
      {
        "title": "Reframe ''Expert''",
        "content": "You don''t need to be the world''s top expert. You just need to be one step ahead of your customer and genuinely committed to helping them. Your unique journey and perspective IS your qualification."
      },
      {
        "title": "Separate Performance from Identity",
        "content": "A failed launch doesn''t make you a failure. A successful sale doesn''t make you a success. You are not your results. You''re a person running experiments and learning. This mindset protects your self-worth while allowing honest evaluation."
      },
      {
        "title": "Action Beats Anxiety",
        "content": "Imposter syndrome feeds on inaction. The more you wait, the louder it gets. The cure is action — especially imperfect action. Ship the imperfect product. Publish the not-quite-ready post. Confidence comes from doing, not from thinking."
      },
      {
        "title": "Find Your Rebel Crew",
        "content": "Surround yourself with other founders who get it. Share your wins and your doubts. You''ll quickly realize everyone feels this way — and that you''re not alone. Community is the antidote to isolation."
      },
      {
        "title": "Flip the Script",
        "content": "Instead of ''Who am I to do this?'' ask ''Who am I NOT to do this?'' You have something to offer. Someone out there needs exactly what you bring. Don''t let self-doubt steal that from them."
      }
    ],
    "conclusion": "Imposter syndrome never fully goes away — it just becomes a familiar companion. The goal is to feel the doubt and act anyway. That''s the rebel way."
  }'::jsonb
);

-- Mindset: Rebel Business Principles Checklist
INSERT INTO public.toolkit_content (title, description, content_type, category, icon, order_index, is_premium, content)
VALUES (
  'Rebel Business Principles Checklist',
  'Core principles to guide your decisions and keep you aligned with the rebel philosophy.',
  'checklist',
  'Mindset',
  'Flame',
  18,
  false,
  '{
    "categories": [
      {
        "name": "Autonomy First",
        "items": [
          {"label": "Design for freedom", "description": "Build a business that gives you time and location flexibility"},
          {"label": "Question ''best practices''", "description": "Just because others do it doesn''t mean you should"},
          {"label": "Protect your calendar", "description": "Your time is your most valuable asset"},
          {"label": "Build assets, not just income", "description": "Create things that work while you sleep"}
        ]
      },
      {
        "name": "Lean & Agile",
        "items": [
          {"label": "Start before you''re ready", "description": "Perfect is the enemy of launched"},
          {"label": "Validate before you build", "description": "Talk to customers, don''t assume"},
          {"label": "Keep overhead low", "description": "Revenue minus expenses equals freedom"},
          {"label": "Iterate in public", "description": "Ship fast, learn faster"}
        ]
      },
      {
        "name": "Authentic Presence",
        "items": [
          {"label": "Lead with your story", "description": "People connect with people, not brands"},
          {"label": "Be polarizing", "description": "Trying to please everyone pleases no one"},
          {"label": "Share your journey", "description": "Wins and struggles both build trust"},
          {"label": "Say no often", "description": "Every yes is a no to something else"}
        ]
      },
      {
        "name": "Value Creation",
        "items": [
          {"label": "Solve real problems", "description": "Build painkillers, not vitamins"},
          {"label": "Over-deliver for your customers", "description": "Create raving fans, not just satisfied buyers"},
          {"label": "Price based on value, not time", "description": "You''re selling outcomes, not hours"},
          {"label": "Seek leverage", "description": "One-to-many beats one-to-one"}
        ]
      },
      {
        "name": "Sustainable Hustle",
        "items": [
          {"label": "Rest is productive", "description": "Burnout kills businesses"},
          {"label": "Celebrate small wins", "description": "Momentum builds on recognition"},
          {"label": "Play the long game", "description": "Compounding applies to skills and reputation"},
          {"label": "Remember why you started", "description": "Freedom, impact, creativity — keep it central"}
        ]
      }
    ]
  }'::jsonb
);