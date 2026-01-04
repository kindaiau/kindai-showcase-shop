import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Sparkles, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AIAssistantProps {
  mode?: "chat" | "generate";
  initialPrompt?: string;
  onContentGenerated?: (content: string) => void;
}

const AIAssistant = ({ mode = "chat", initialPrompt, onContentGenerated }: AIAssistantProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState(initialPrompt || "");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const streamChat = useCallback(async (userMessages: Message[]) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast.error("Please log in to use the AI assistant");
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
        body: JSON.stringify({ messages: userMessages, mode }),
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

    if (onContentGenerated && assistantContent) {
      onContentGenerated(assistantContent);
    }

    return assistantContent;
  }, [mode, onContentGenerated]);

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
      inputRef.current?.focus();
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <Card className="flex flex-col h-[600px] border-2">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full gradient-rebel flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold">
              {mode === "generate" ? "Content Generator" : "Rebel AI Assistant"}
            </h3>
            <p className="text-xs text-muted-foreground">
              {mode === "generate" ? "Generate templates & content" : "Ask anything about building"}
            </p>
          </div>
        </div>
        {messages.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearChat}>
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-4">
            <Sparkles className="w-12 h-12 text-kindai-purple mb-4" />
            <h4 className="font-semibold text-lg mb-2">
              {mode === "generate" ? "Generate Content" : "How can I help?"}
            </h4>
            <p className="text-muted-foreground text-sm max-w-xs">
              {mode === "generate" 
                ? "Describe the content you need and I'll create it for you."
                : "Ask me about building websites, automations, or anything from the playbook!"
              }
            </p>
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {mode === "chat" ? (
                <>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setInput("How do I build a landing page?")}
                  >
                    Landing pages
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setInput("Help me set up email automation")}
                  >
                    Email automation
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setInput("What's the daily rebel workflow?")}
                  >
                    Daily workflow
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setInput("Write a landing page headline for my SaaS product")}
                  >
                    Headlines
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setInput("Create a welcome email sequence")}
                  >
                    Email sequence
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setInput("Write a product description for my course")}
                  >
                    Product copy
                  </Button>
                </>
              )}
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
                  <div className="w-8 h-8 rounded-full gradient-rebel flex-shrink-0 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
                {message.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-kindai-blue flex-shrink-0 flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full gradient-rebel flex-shrink-0 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-kindai-pink rounded-full animate-pulse" />
                    <span className="w-2 h-2 bg-kindai-orange rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
                    <span className="w-2 h-2 bg-kindai-green rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </ScrollArea>

      <form onSubmit={handleSubmit} className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "generate" ? "Describe what you want to create..." : "Ask the Rebel AI..."}
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !input.trim()} className="gradient-rebel">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default AIAssistant;
