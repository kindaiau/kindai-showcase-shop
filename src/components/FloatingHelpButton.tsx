import { useState, useRef, useEffect } from "react";
import { Heart, X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/rebel-ai-chat`;

const FloatingHelpButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const streamChat = async (userMessages: Message[]) => {
    setIsLoading(true);
    let assistantContent = "";

    try {
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: userMessages,
          agentType: "help",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader available");

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages((prev) => {
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
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I couldn't process that. Please try again!" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");

    await streamChat(newMessages);
  };

  const quickActions = [
    { label: "What is this?", message: "What is the 3-Agent Playbook?" },
    { label: "How to start", message: "How do I get started?" },
    { label: "Pricing", message: "What's included and how much does it cost?" },
  ];

  const handleQuickAction = async (message: string) => {
    const userMessage: Message = { role: "user", content: message };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    await streamChat(newMessages);
  };

  const ChatContent = () => (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 px-4 py-3" ref={scrollRef}>
        {messages.length === 0 ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              Hi! 👋 How can I help you today?
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {quickActions.map((action) => (
                <Button
                  key={action.label}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => handleQuickAction(action.message)}
                  disabled={isLoading}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl px-4 py-2">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
          </div>
        )}
      </ScrollArea>

      <form onSubmit={handleSubmit} className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );

  // Heart-shaped button styles - 20% smaller, transparent with brand gradient
  const heartButtonClass = `
    fixed bottom-6 right-6 z-50 
    w-12 h-12
    flex items-center justify-center
    bg-gradient-to-br from-kindai-pink/70 via-kindai-orange/60 to-kindai-green/50
    backdrop-blur-sm
    shadow-lg hover:shadow-xl 
    transition-all duration-300 hover:scale-110
    border border-white/20
  `;

  // CSS for heart shape using clip-path
  const heartStyle: React.CSSProperties = {
    clipPath: "path('M24 44c-1.2-1.1-2.4-2.1-3.5-3.1C12.5 34.1 6 28.2 6 20.5 6 14.4 10.9 9.5 17 9.5c3.5 0 6.8 1.6 9 4.2 2.2-2.6 5.5-4.2 9-4.2 6.1 0 11 4.9 11 11 0 7.7-6.5 13.6-14.5 20.4-1.1 1-2.3 2-3.5 3.1z')",
    width: "48px",
    height: "48px",
  };

  // Mobile: use Drawer
  if (isMobile) {
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className={heartButtonClass}
          style={heartStyle}
          aria-label="Open help chat"
        >
          <span className="text-white font-semibold text-xs drop-shadow-md">help</span>
        </button>

        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerContent className="h-[80vh] max-h-[80vh]">
            <DrawerHeader className="border-b border-border">
              <div className="flex items-center justify-between">
                <DrawerTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-kindai-pink fill-kindai-pink/50" />
                  Kindai Help
                </DrawerTitle>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </DrawerHeader>
            <ChatContent />
          </DrawerContent>
        </Drawer>
      </>
    );
  }

  // Desktop: slide-in panel
  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={heartButtonClass}
        style={heartStyle}
        aria-label={isOpen ? "Close help chat" : "Open help chat"}
      >
        {isOpen ? (
          <X className="h-4 w-4 text-white drop-shadow-md" />
        ) : (
          <span className="text-white font-semibold text-xs drop-shadow-md">help</span>
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-[350px] h-[450px] bg-background border border-border rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
          <div className="flex items-center justify-between p-4 border-b border-border bg-muted/50">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-kindai-pink fill-kindai-pink/50" />
              <span className="font-semibold">Kindai Help</span>
            </div>
          </div>
          <div className="h-[calc(100%-60px)]">
            <ChatContent />
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingHelpButton;
