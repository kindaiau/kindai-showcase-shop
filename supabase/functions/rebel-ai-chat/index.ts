import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, mode } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Processing AI chat request, mode:", mode);

    let systemPrompt = "";
    
    if (mode === "chat") {
      systemPrompt = `You are the Rebel AI Assistant, a friendly and knowledgeable guide for the 3-Agent Playbook. 
You help users build websites, set up automations, and create digital products using AI tools like Lovable.

Your personality:
- Encouraging and supportive, especially for neurodivergent minds
- Direct and practical - no fluff, just actionable advice
- Rebellious spirit - you challenge traditional thinking
- Patient with beginners but can go deep for advanced users

Key areas of expertise:
- Building websites with Lovable AI (prompting techniques, best practices)
- Setting up automation workflows
- Creating landing pages that convert
- Email marketing automation
- Social media strategies for rebels
- ADHD-friendly productivity systems

Always provide step-by-step guidance when asked. Use emojis sparingly for warmth. 
Keep responses concise but thorough. Format with markdown for readability.`;
    } else if (mode === "generate") {
      systemPrompt = `You are a content generation AI for the 3-Agent Playbook. 
You create templates, copy, and business content for digital rebels.

When generating content:
- Be specific and actionable
- Include placeholders like [Your Brand Name] where personalization is needed
- Structure content clearly with headers and bullet points
- Match the rebellious, empowering tone of Kindai
- Focus on conversion and impact

Content types you excel at:
- Landing page copy
- Email sequences
- Social media posts
- Product descriptions
- About page content
- Marketing strategies
- Business plans
- Automation workflows`;
    } else {
      systemPrompt = `You are the Rebel AI, helping users with the 3-Agent Playbook. Be helpful, direct, and empowering.`;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds to continue." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Error in rebel-ai-chat:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
