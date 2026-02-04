import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Play, 
  Loader2, 
  CheckCircle2, 
  Circle,
  PenTool,
  TrendingUp,
  Zap,
  Copy,
  Download,
  Pause,
  RotateCcw,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface AgentResult {
  agentType: "strategy" | "content" | "tech";
  status: "pending" | "running" | "complete" | "error";
  output: string;
}

const SAMPLE_BUSINESS = {
  name: "Artisan Clay Studio",
  type: "handmade pottery and ceramics for home decor enthusiasts",
};

const AGENT_CONFIG = {
  strategy: {
    name: "Business Strategist",
    icon: TrendingUp,
    color: "bg-kindai-orange",
    getPrompt: (biz: typeof SAMPLE_BUSINESS) => 
      `Create a business plan for ${biz.name} - ${biz.type}. Include:
1. Executive Summary (2-3 sentences)
2. Target Market & Customer Persona
3. Pricing Tiers (3 tiers with specific prices)
4. Revenue Projections (Month 1, 3, 6, 12)
5. Top 3 Growth Strategies

Keep it actionable and specific.`
  },
  content: {
    name: "Content Creator",
    icon: PenTool,
    color: "bg-kindai-pink",
    getPrompt: (biz: typeof SAMPLE_BUSINESS) =>
      `Create a 5-day social media launch calendar for ${biz.name} (${biz.type}). For each day include:
- Platform (Instagram, LinkedIn, or Twitter)
- Post copy (ready to paste)
- Hashtags (5-7)
- Best posting time

Make it engaging and on-brand for creative artisan enthusiasts.`
  },
  tech: {
    name: "Automation Engineer",
    icon: Zap,
    color: "bg-kindai-green",
    getPrompt: (biz: typeof SAMPLE_BUSINESS) =>
      `Build a complete Zapier workflow for ${biz.name}:

Trigger: New order placed on website

Actions:
1. Send order confirmation email (with template)
2. Add customer to CRM/spreadsheet
3. Notify team on Slack

Include exact field mappings and setup steps.`
  }
};

const GuidedDemo = () => {
  const [phase, setPhase] = useState<"intro" | "running" | "complete">("intro");
  const [countdown, setCountdown] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [currentAgent, setCurrentAgent] = useState<"strategy" | "content" | "tech" | null>(null);
  const [results, setResults] = useState<AgentResult[]>([
    { agentType: "strategy", status: "pending", output: "" },
    { agentType: "content", status: "pending", output: "" },
    { agentType: "tech", status: "pending", output: "" },
  ]);
  const abortControllerRef = useRef<AbortController | null>(null);
  const activeCardRef = useRef<HTMLDivElement>(null);

  const streamChat = useCallback(async (
    agentType: string,
    prompt: string,
    onDelta: (text: string) => void,
    signal: AbortSignal
  ) => {
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/rebel-ai-chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: prompt }],
          agentType,
          demoMode: true,
        }),
        signal,
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error("Rate limit exceeded. Please try again later.");
      }
      if (response.status === 402) {
        throw new Error("AI credits exhausted.");
      }
      throw new Error("Failed to connect to AI");
    }

    const reader = response.body?.getReader();
    if (!reader) throw new Error("No response body");

    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      let newlineIndex;
      while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
        let line = buffer.slice(0, newlineIndex);
        buffer = buffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") break;

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) onDelta(content);
        } catch {
          buffer = line + "\n" + buffer;
          break;
        }
      }
    }
  }, []);

  const runAgent = useCallback(async (agentType: "strategy" | "content" | "tech", signal: AbortSignal) => {
    setCurrentAgent(agentType);
    setResults(prev => prev.map(r => 
      r.agentType === agentType ? { ...r, status: "running", output: "" } : r
    ));

    const config = AGENT_CONFIG[agentType];
    const prompt = config.getPrompt(SAMPLE_BUSINESS);
    let fullOutput = "";

    try {
      await streamChat(agentType, prompt, (delta) => {
        fullOutput += delta;
        setResults(prev => prev.map(r =>
          r.agentType === agentType ? { ...r, output: fullOutput } : r
        ));
      }, signal);

      setResults(prev => prev.map(r =>
        r.agentType === agentType ? { ...r, status: "complete" } : r
      ));
    } catch (error) {
      if ((error as Error).name === 'AbortError') {
        throw error;
      }
      setResults(prev => prev.map(r =>
        r.agentType === agentType ? { ...r, status: "error", output: error instanceof Error ? error.message : "Error" } : r
      ));
      throw error;
    }
  }, [streamChat]);

  const runAllAgents = useCallback(async () => {
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    setPhase("running");
    setResults([
      { agentType: "strategy", status: "pending", output: "" },
      { agentType: "content", status: "pending", output: "" },
      { agentType: "tech", status: "pending", output: "" },
    ]);

    try {
      await runAgent("strategy", signal);
      await runAgent("content", signal);
      await runAgent("tech", signal);
      setPhase("complete");
      setCurrentAgent(null);
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        toast.error(error instanceof Error ? error.message : "Demo failed");
      }
      setCurrentAgent(null);
    }
  }, [runAgent]);

  // Countdown and auto-start
  useEffect(() => {
    if (phase !== "intro") return;

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          runAllAgents();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase, runAllAgents]);

  // Auto-scroll to active card
  useEffect(() => {
    if (activeCardRef.current && currentAgent) {
      activeCardRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentAgent]);

  const copyAllResults = () => {
    const allContent = results
      .filter(r => r.output)
      .map(r => `## ${AGENT_CONFIG[r.agentType].name}\n\n${r.output}`)
      .join("\n\n---\n\n");
    
    navigator.clipboard.writeText(allContent);
    toast.success("All results copied!");
  };

  const downloadResults = () => {
    const allContent = `# ${SAMPLE_BUSINESS.name} - AI Agent Results\n\nBusiness: ${SAMPLE_BUSINESS.type}\n\n` + 
      results
        .filter(r => r.output)
        .map(r => `## ${AGENT_CONFIG[r.agentType].name}\n\n${r.output}`)
        .join("\n\n---\n\n");
    
    const blob = new Blob([allContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${SAMPLE_BUSINESS.name.toLowerCase().replace(/\s+/g, "-")}-ai-results.md`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Results downloaded!");
  };

  const resetDemo = () => {
    abortControllerRef.current?.abort();
    setPhase("intro");
    setCountdown(3);
    setIsPaused(false);
    setCurrentAgent(null);
    setResults([
      { agentType: "strategy", status: "pending", output: "" },
      { agentType: "content", status: "pending", output: "" },
      { agentType: "tech", status: "pending", output: "" },
    ]);
  };

  const hasResults = results.some(r => r.output);
  const completedCount = results.filter(r => r.status === "complete").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          Live Demo
        </div>
        <h1 className="text-3xl md:text-4xl font-bold">
          Watch the AI Agents in Action
        </h1>
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <span className="font-semibold text-foreground">{SAMPLE_BUSINESS.name}</span>
          <span>•</span>
          <span>{SAMPLE_BUSINESS.type}</span>
        </div>
      </div>

      {/* Progress Stepper */}
      <div className="flex items-center justify-center gap-2 md:gap-4 py-4">
        {(["strategy", "content", "tech"] as const).map((agent, index) => {
          const config = AGENT_CONFIG[agent];
          const result = results.find(r => r.agentType === agent);
          const Icon = config.icon;
          const isActive = currentAgent === agent;
          const isComplete = result?.status === "complete";
          
          return (
            <div key={agent} className="flex items-center gap-2 md:gap-4">
              <div className={`
                flex items-center gap-2 px-3 py-2 rounded-lg transition-all
                ${isActive ? "bg-primary/10 border-2 border-primary" : ""}
                ${isComplete ? "bg-kindai-green/10" : ""}
              `}>
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center
                  ${isComplete ? "bg-kindai-green text-white" : isActive ? config.color + " text-white" : "bg-muted"}
                `}>
                  {isComplete ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : isActive ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>
                <span className={`hidden md:inline text-sm font-medium ${isActive ? "text-primary" : ""}`}>
                  {config.name}
                </span>
              </div>
              {index < 2 && (
                <div className={`w-8 md:w-16 h-0.5 ${completedCount > index ? "bg-kindai-green" : "bg-muted"}`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Intro/Countdown */}
      {phase === "intro" && (
        <Card className="text-center py-12">
          <CardContent className="space-y-6">
            <div className="text-6xl font-bold text-primary">{countdown}</div>
            <p className="text-lg text-muted-foreground">
              Starting demo in {countdown} second{countdown !== 1 ? "s" : ""}...
            </p>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              You're about to see all 3 AI agents create a complete business plan, social media calendar, and automation workflow.
            </p>
            <Button variant="outline" onClick={runAllAgents}>
              <Play className="w-4 h-4 mr-2" />
              Skip countdown
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Agent Results */}
      {phase !== "intro" && (
        <div className="grid gap-4">
          {results.map((result) => {
            const config = AGENT_CONFIG[result.agentType];
            const Icon = config.icon;
            const isActive = currentAgent === result.agentType;
            
            return (
              <Card 
                key={result.agentType} 
                ref={isActive ? activeCardRef : null}
                className={`transition-all ${isActive ? "border-primary ring-2 ring-primary/20" : ""}`}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${config.color} flex items-center justify-center text-white`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-lg flex-1">{config.name}</CardTitle>
                    {result.status === "running" && (
                      <div className="flex items-center gap-2 text-primary">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm">Generating...</span>
                      </div>
                    )}
                    {result.status === "complete" && (
                      <CheckCircle2 className="w-5 h-5 text-kindai-green" />
                    )}
                    {result.status === "pending" && phase === "running" && (
                      <span className="text-sm text-muted-foreground">Waiting...</span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {result.output ? (
                    <ScrollArea className="h-64">
                      <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                        {result.output}
                      </div>
                    </ScrollArea>
                  ) : result.status === "pending" ? (
                    <div className="h-24 flex items-center justify-center text-muted-foreground">
                      <Circle className="w-4 h-4 mr-2" />
                      Waiting for previous agent to complete
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Action Buttons */}
      {hasResults && (
        <div className="flex flex-wrap justify-center gap-3">
          <Button variant="outline" onClick={copyAllResults}>
            <Copy className="w-4 h-4 mr-2" />
            Copy All Results
          </Button>
          <Button variant="outline" onClick={downloadResults}>
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button variant="ghost" onClick={resetDemo}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Restart Demo
          </Button>
        </div>
      )}

      {/* Completion CTAs */}
      {phase === "complete" && (
        <Card className="bg-gradient-to-br from-primary/5 to-kindai-pink/5 border-primary/20">
          <CardContent className="py-8 text-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Demo Complete! 🎉</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                You just saw our AI agents create a complete business strategy, content calendar, and automation workflow in minutes.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="outline" size="lg">
                <Link to="/demo">
                  <Play className="w-4 h-4 mr-2" />
                  Try Interactive Demo
                </Link>
              </Button>
              <Button asChild size="lg">
                <Link to="/purchase">
                  Get Full Access
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GuidedDemo;
