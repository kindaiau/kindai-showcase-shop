import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  Send, 
  Bot, 
  User, 
  Trash2, 
  Copy, 
  Check, 
  Loader2,
  PenTool,
  TrendingUp,
  Zap,
  Download
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
}

type AgentType = "content" | "strategy" | "tech";

interface AgentConfig {
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  placeholder: string;
  quickActions: { label: string; prompt: string }[];
}

const AGENT_CONFIGS: Record<AgentType, AgentConfig> = {
  content: {
    name: "Content Creator",
    description: "I write complete blog posts, social media content, email campaigns, and marketing copy. Just tell me what you need.",
    icon: <PenTool className="w-5 h-5" />,
    color: "text-kindai-pink",
    bgColor: "bg-kindai-pink",
    placeholder: "Describe the content you need (e.g., 'Write a 1000-word blog post about productivity tips for entrepreneurs')...",
    quickActions: [
      { label: "Blog Post", prompt: "Write a complete 1200-word SEO-optimized blog post about [topic]. Include meta description, headers, and a compelling CTA." },
      { label: "Social Media Week", prompt: "Create a 7-day social media content calendar for [brand/niche]. Include posts for Instagram, LinkedIn, and Twitter with hashtags and posting times." },
      { label: "Email Sequence", prompt: "Write a complete 5-email welcome sequence for [type of business]. Include subject lines, preview text, and full email body copy." },
      { label: "Landing Page", prompt: "Write complete landing page copy for [product/service]. Include headline, subheadline, features, benefits, testimonial placeholders, and CTA." },
    ],
  },
  strategy: {
    name: "Business Strategist",
    description: "I build complete business strategies, pricing models, competitive analyses, and growth plans. Tell me about your business.",
    icon: <TrendingUp className="w-5 h-5" />,
    color: "text-kindai-orange",
    bgColor: "bg-kindai-orange",
    placeholder: "Describe your business or what strategy you need (e.g., 'Create a pricing strategy for my SaaS product targeting small businesses')...",
    quickActions: [
      { label: "Business Plan", prompt: "Create a complete business plan for [business idea]. Include executive summary, market analysis, revenue model, and 12-month projections." },
      { label: "Pricing Strategy", prompt: "Build a pricing strategy for [product/service]. Include pricing tiers, competitor comparison, and justification for each price point." },
      { label: "Competitor Analysis", prompt: "Create a detailed competitive analysis for [my business] competing against [competitors or niche]. Include strengths, weaknesses, opportunities, and recommended actions." },
      { label: "Go-to-Market Plan", prompt: "Build a go-to-market strategy for launching [product/service]. Include timeline, channels, budget allocation, and success metrics." },
    ],
  },
  tech: {
    name: "Automation Engineer",
    description: "I build complete automation workflows, technical integrations, and SEO configurations. Describe what you want to automate.",
    icon: <Zap className="w-5 h-5" />,
    color: "text-kindai-green",
    bgColor: "bg-kindai-green",
    placeholder: "Describe the automation or technical task (e.g., 'Build a Zapier workflow that sends a Slack message when a new lead comes in from my website form')...",
    quickActions: [
      { label: "Zapier Workflow", prompt: "Build a complete Zapier workflow that [describe trigger and actions]. Include all step configurations and field mappings." },
      { label: "Lead Automation", prompt: "Create a complete lead nurturing automation system for [type of business]. Include email triggers, CRM updates, and notification workflows." },
      { label: "SEO Setup", prompt: "Generate complete technical SEO implementation for [website type]. Include schema markup code, meta tag templates, and sitemap structure." },
      { label: "Email Automation", prompt: "Build a complete email automation workflow for [scenario like abandoned cart, onboarding, etc.]. Include trigger conditions, timing, and email sequences." },
    ],
  },
};

interface SpecializedAgentProps {
  agentType: AgentType;
}

const SpecializedAgent = ({ agentType }: SpecializedAgentProps) => {
  const config = AGENT_CONFIGS[agentType];
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Reset messages when agent type changes
  useEffect(() => {
    setMessages([]);
    setInput("");
  }, [agentType]);

  const streamChat = useCallback(async (userMessages: Message[]) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast.error("Please log in to use the AI agents");
      return;
    }

    const response = await fetch(
      `https://ccwbdarlfwmqbeftppzk.supabase.co/functions/v1/rebel-ai-chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ messages: userMessages, agentType }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to get AI response");
    }

    const reader = response.body?.getReader();
    if (!reader) throw new Error("No response body");

    const decoder = new TextDecoder();
    let assistantContent = "";
    let textBuffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") break;

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) {
            assistantContent += content;
            setMessages(prev => {
              const last = prev[prev.length - 1];
              if (last?.role === "assistant") {
                return prev.map((m, i) => 
                  i === prev.length - 1 ? { ...m, content: assistantContent } : m
                );
              }
              return [...prev, { role: "assistant", content: assistantContent }];
            });
          }
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }

    return assistantContent;
  }, [agentType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      await streamChat(newMessages);
    } catch (error: any) {
      console.error("AI error:", error);
      toast.error(error.message || "Failed to get AI response");
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
      textareaRef.current?.focus();
    }
  };

  const handleQuickAction = (prompt: string) => {
    setInput(prompt);
    textareaRef.current?.focus();
  };

  const copyToClipboard = async (content: string, index: number) => {
    await navigator.clipboard.writeText(content);
    setCopiedIndex(index);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const downloadAsFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Downloaded!");
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <Card className="flex flex-col h-[700px] border-2 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between bg-card">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full ${config.bgColor} flex items-center justify-center`}>
            <div className="text-white">{config.icon}</div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg">{config.name}</h3>
              <Badge variant="outline" className={config.color}>Agent</Badge>
            </div>
            <p className="text-xs text-muted-foreground max-w-md">
              {config.description}
            </p>
          </div>
        </div>
        {messages.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearChat}>
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
        )}
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6">
            <div className={`w-16 h-16 rounded-full ${config.bgColor}/20 flex items-center justify-center mb-4`}>
              <div className={config.color}>{config.icon}</div>
            </div>
            <h4 className="font-semibold text-lg mb-2">Ready to work for you</h4>
            <p className="text-muted-foreground text-sm max-w-md mb-6">
              {config.description}
            </p>
            <div className="grid grid-cols-2 gap-2 w-full max-w-md">
              {config.quickActions.map((action, i) => (
                <Button 
                  key={i}
                  variant="outline" 
                  size="sm"
                  className="h-auto py-2 text-left justify-start"
                  onClick={() => handleQuickAction(action.prompt)}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <div className={`w-8 h-8 rounded-full ${config.bgColor} flex-shrink-0 flex items-center justify-center`}>
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-lg ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground p-3"
                      : "bg-muted p-4"
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap prose prose-sm dark:prose-invert max-w-none">
                    {message.content}
                  </div>
                  {message.role === "assistant" && (
                    <div className="flex gap-2 mt-3 pt-2 border-t border-border/50">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => copyToClipboard(message.content, index)}
                      >
                        {copiedIndex === index ? (
                          <Check className="w-3 h-3 mr-1" />
                        ) : (
                          <Copy className="w-3 h-3 mr-1" />
                        )}
                        Copy
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => downloadAsFile(message.content, `${agentType}-output-${Date.now()}.md`)}
                      >
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  )}
                </div>
                {message.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center">
                    <User className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex gap-3">
                <div className={`w-8 h-8 rounded-full ${config.bgColor} flex-shrink-0 flex items-center justify-center`}>
                  <Loader2 className="w-4 h-4 text-white animate-spin" />
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Working on it...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </ScrollArea>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-border bg-card">
        <div className="flex gap-2">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={config.placeholder}
            disabled={isLoading}
            className="flex-1 min-h-[60px] max-h-[120px] resize-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <Button 
            type="submit" 
            disabled={isLoading || !input.trim()} 
            className={`${config.bgColor} hover:opacity-90 self-end`}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Press Enter to send, Shift+Enter for new line
        </p>
      </form>
    </Card>
  );
};

export default SpecializedAgent;
