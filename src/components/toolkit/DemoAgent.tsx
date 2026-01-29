import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
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
  Lock,
  ArrowRight,
  ExternalLink
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
    description: "I write complete blog posts, social media content, email campaigns, and marketing copy.",
    icon: <PenTool className="w-5 h-5" />,
    color: "text-kindai-pink",
    bgColor: "bg-kindai-pink",
    placeholder: "Try: 'Write a short social media post about productivity tips'",
    quickActions: [
      { label: "Social Post", prompt: "Write a short Instagram post about productivity tips for entrepreneurs. Include relevant hashtags." },
      { label: "Email Subject Lines", prompt: "Give me 5 compelling email subject lines for a product launch announcement." },
    ],
  },
  strategy: {
    name: "Business Strategist",
    description: "I build complete business strategies, pricing models, and competitive analyses.",
    icon: <TrendingUp className="w-5 h-5" />,
    color: "text-kindai-orange",
    bgColor: "bg-kindai-orange",
    placeholder: "Try: 'What are 3 pricing strategies for a new SaaS product?'",
    quickActions: [
      { label: "Pricing Ideas", prompt: "Give me 3 pricing strategy ideas for a new SaaS product targeting small businesses." },
      { label: "Quick SWOT", prompt: "Create a quick SWOT analysis framework I can use for my business." },
    ],
  },
  tech: {
    name: "Automation Engineer",
    description: "I build automation workflows, technical integrations, and SEO configurations.",
    icon: <Zap className="w-5 h-5" />,
    color: "text-kindai-green",
    bgColor: "bg-kindai-green",
    placeholder: "Try: 'How do I set up a simple Zapier workflow for lead capture?'",
    quickActions: [
      { label: "Lead Automation", prompt: "Describe a simple automation workflow for capturing leads from a website form and adding them to a CRM." },
      { label: "Basic SEO", prompt: "What are the 5 most important SEO meta tags I should add to my website?" },
    ],
  },
};

interface DemoAgentProps {
  agentType: AgentType;
  messagesUsed: number;
  messageLimit: number;
  onMessageSent: () => void;
  onLimitReached: () => void;
}

const DemoAgent = ({ 
  agentType, 
  messagesUsed, 
  messageLimit, 
  onMessageSent,
  onLimitReached 
}: DemoAgentProps) => {
  const navigate = useNavigate();
  const config = AGENT_CONFIGS[agentType];
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const remainingMessages = Math.max(0, messageLimit - messagesUsed);
  const isLimitReached = messagesUsed >= messageLimit;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    setMessages([]);
    setInput("");
  }, [agentType]);

  const streamChat = useCallback(async (userMessages: Message[]) => {
    // Demo mode: no auth required, use anonymous invocation
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL || "https://ccwbdarlfwmqbeftppzk.supabase.co"}/functions/v1/rebel-ai-chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjd2JkYXJsZndtcWJlZnRwcHprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2NjY0NjUsImV4cCI6MjA2NTI0MjQ2NX0.3_1P5y6fKqxf8rlT-8fNWCRG8eHlZCu_dRnc5Rq_5ao"}`,
        },
        body: JSON.stringify({ 
          messages: userMessages, 
          agentType,
          demoMode: true 
        }),
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

    if (isLimitReached) {
      toast.error("Demo limit reached! Get full access for unlimited messages.");
      onLimitReached();
      return;
    }

    const userMessage: Message = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      await streamChat(newMessages);
      onMessageSent();
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

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <Card className="flex flex-col h-[600px] border-2 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between bg-card">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full ${config.bgColor} flex items-center justify-center`}>
            <div className="text-white">{config.icon}</div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg">{config.name}</h3>
              <Badge variant="secondary">Demo</Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              {remainingMessages} {remainingMessages === 1 ? "message" : "messages"} remaining
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
            <h4 className="font-semibold text-lg mb-2">Try {config.name}</h4>
            <p className="text-muted-foreground text-sm max-w-md mb-6">
              {config.description} Try a quick action below!
            </p>
            <div className="grid grid-cols-2 gap-2 w-full max-w-md">
              {config.quickActions.map((action, i) => (
                <Button 
                  key={i}
                  variant="outline" 
                  size="sm"
                  className="h-auto py-2 text-left justify-start"
                  onClick={() => handleQuickAction(action.prompt)}
                  disabled={isLimitReached}
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
                    <div className="flex flex-wrap gap-2 mt-3 pt-2 border-t border-border/50">
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
                        Copy All
                      </Button>
                      {agentType === "tech" && message.content.includes("ZAPIER AI PROMPT") && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs bg-kindai-green/10 border-kindai-green/30 hover:bg-kindai-green/20"
                            onClick={() => {
                              const zapierMatch = message.content.match(/📋 ZAPIER AI PROMPT[:\s]*\n([\s\S]*?)(?=\n(?:##|🧪|💡|$))/i);
                              const zapierPrompt = zapierMatch ? zapierMatch[1].trim() : null;
                              if (zapierPrompt) {
                                copyToClipboard(zapierPrompt, index + 1000);
                              } else {
                                toast.error("Could not find Zapier AI prompt section");
                              }
                            }}
                          >
                            <Zap className="w-3 h-3 mr-1" />
                            Copy Zapier Prompt
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs"
                            onClick={() => window.open("https://create.zapier.com", "_blank")}
                          >
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Create in Zapier
                          </Button>
                        </>
                      )}
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

      {/* Upgrade CTA when limit reached */}
      {isLimitReached && (
        <div className="p-4 bg-gradient-to-r from-kindai-pink/10 via-kindai-orange/10 to-kindai-green/10 border-t border-primary/20">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium">Demo limit reached</span>
            </div>
            <Button 
              size="sm"
              className="gradient-rebel text-white"
              onClick={() => navigate("/purchase")}
            >
              Get Unlimited Access
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )}

      {/* Input */}
      {!isLimitReached && (
        <form onSubmit={handleSubmit} className="p-4 border-t border-border bg-card">
          <div className="flex gap-2">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={config.placeholder}
              disabled={isLoading || isLimitReached}
              className="flex-1 min-h-[60px] max-h-[100px] resize-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <Button 
              type="submit" 
              disabled={isLoading || !input.trim() || isLimitReached} 
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
            {remainingMessages} {remainingMessages === 1 ? "message" : "messages"} left • Press Enter to send
          </p>
        </form>
      )}
    </Card>
  );
};

export default DemoAgent;
