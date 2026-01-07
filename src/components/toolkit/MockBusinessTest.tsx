import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  RotateCcw,
  Sparkles
} from "lucide-react";
import { toast } from "sonner";
import DemoProgress from "./DemoProgress";

interface AgentResult {
  agentType: "strategy" | "content" | "tech";
  status: "pending" | "running" | "complete" | "error";
  output: string;
}

interface MockBusinessTestProps {
  onClose?: () => void;
}

const DEFAULT_BUSINESS = {
  name: "EcoBloom",
  type: "eco-friendly subscription box for millennials",
};

const AGENT_CONFIG = {
  strategy: {
    name: "Business Strategist",
    icon: TrendingUp,
    color: "bg-kindai-orange",
    getPrompt: (biz: typeof DEFAULT_BUSINESS) => 
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
    getPrompt: (biz: typeof DEFAULT_BUSINESS) =>
      `Create a 5-day social media launch calendar for ${biz.name} (${biz.type}). For each day include:
- Platform (Instagram, LinkedIn, or Twitter)
- Post copy (ready to paste)
- Hashtags (5-7)
- Best posting time

Make it engaging and on-brand for an eco-conscious audience.`
  },
  tech: {
    name: "Automation Engineer",
    icon: Zap,
    color: "bg-kindai-green",
    getPrompt: (biz: typeof DEFAULT_BUSINESS) =>
      `Build a complete Zapier workflow for ${biz.name}:

Trigger: New subscriber signs up

Actions:
1. Send welcome email (with template)
2. Add to CRM/spreadsheet
3. Notify team on Slack

Include exact field mappings and setup steps.`
  }
};

const MockBusinessTest = ({ onClose }: MockBusinessTestProps) => {
  const [business, setBusiness] = useState(DEFAULT_BUSINESS);
  const [isRunning, setIsRunning] = useState(false);
  const [currentAgent, setCurrentAgent] = useState<"strategy" | "content" | "tech" | null>(null);
  const [results, setResults] = useState<AgentResult[]>([
    { agentType: "strategy", status: "pending", output: "" },
    { agentType: "content", status: "pending", output: "" },
    { agentType: "tech", status: "pending", output: "" },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const streamChat = async (
    agentType: string,
    prompt: string,
    onDelta: (text: string) => void
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
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error("Rate limit exceeded. Please try again later.");
      }
      if (response.status === 402) {
        throw new Error("AI credits exhausted. Please add funds.");
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
  };

  const runAgent = async (agentType: "strategy" | "content" | "tech") => {
    setCurrentAgent(agentType);
    setResults(prev => prev.map(r => 
      r.agentType === agentType ? { ...r, status: "running", output: "" } : r
    ));

    const config = AGENT_CONFIG[agentType];
    const prompt = config.getPrompt(business);
    let fullOutput = "";

    try {
      await streamChat(agentType, prompt, (delta) => {
        fullOutput += delta;
        setResults(prev => prev.map(r =>
          r.agentType === agentType ? { ...r, output: fullOutput } : r
        ));
      });

      setResults(prev => prev.map(r =>
        r.agentType === agentType ? { ...r, status: "complete" } : r
      ));
    } catch (error) {
      setResults(prev => prev.map(r =>
        r.agentType === agentType ? { ...r, status: "error", output: error instanceof Error ? error.message : "Error" } : r
      ));
      throw error;
    }
  };

  const runDemo = async () => {
    setIsRunning(true);
    setResults([
      { agentType: "strategy", status: "pending", output: "" },
      { agentType: "content", status: "pending", output: "" },
      { agentType: "tech", status: "pending", output: "" },
    ]);

    try {
      await runAgent("strategy");
      await runAgent("content");
      await runAgent("tech");
      toast.success("Demo complete! All 3 agents delivered.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Demo failed");
    } finally {
      setIsRunning(false);
      setCurrentAgent(null);
    }
  };

  const copyAllResults = () => {
    const allContent = results
      .filter(r => r.output)
      .map(r => `## ${AGENT_CONFIG[r.agentType].name}\n\n${r.output}`)
      .join("\n\n---\n\n");
    
    navigator.clipboard.writeText(allContent);
    toast.success("All results copied!");
  };

  const downloadResults = () => {
    const allContent = `# ${business.name} - AI Agent Results\n\nBusiness: ${business.type}\n\n` + 
      results
        .filter(r => r.output)
        .map(r => `## ${AGENT_CONFIG[r.agentType].name}\n\n${r.output}`)
        .join("\n\n---\n\n");
    
    const blob = new Blob([allContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${business.name.toLowerCase().replace(/\s+/g, "-")}-ai-results.md`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Results downloaded!");
  };

  const resetDemo = () => {
    setResults([
      { agentType: "strategy", status: "pending", output: "" },
      { agentType: "content", status: "pending", output: "" },
      { agentType: "tech", status: "pending", output: "" },
    ]);
    setBusiness(DEFAULT_BUSINESS);
  };

  const hasResults = results.some(r => r.output);
  const completedCount = results.filter(r => r.status === "complete").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-kindai-pink to-kindai-orange flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">3-Agent Demo</h2>
          <p className="text-muted-foreground">Watch all 3 AI agents work on a real business</p>
        </div>
      </div>

      {/* Business Config */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Configure Your Test Business</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Business Name</Label>
              <Input
                id="name"
                value={business.name}
                onChange={(e) => setBusiness(prev => ({ ...prev, name: e.target.value }))}
                placeholder="EcoBloom"
                disabled={isRunning}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Business Type</Label>
              <Input
                id="type"
                value={business.type}
                onChange={(e) => setBusiness(prev => ({ ...prev, type: e.target.value }))}
                placeholder="eco-friendly subscription box"
                disabled={isRunning}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={runDemo} disabled={isRunning || !business.name || !business.type}>
              {isRunning ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Running Demo...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Start Demo
                </>
              )}
            </Button>
            {hasResults && (
              <>
                <Button variant="outline" onClick={copyAllResults}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy All
                </Button>
                <Button variant="outline" onClick={downloadResults}>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button variant="ghost" onClick={resetDemo} disabled={isRunning}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Progress */}
      {(isRunning || hasResults) && (
        <DemoProgress 
          results={results} 
          currentAgent={currentAgent}
          completedCount={completedCount}
        />
      )}

      {/* Results */}
      {hasResults && (
        <div className="grid gap-4">
          {results.map((result) => {
            const config = AGENT_CONFIG[result.agentType];
            const Icon = config.icon;
            
            return (
              <Card key={result.agentType} className={result.status === "running" ? "border-primary" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg ${config.color} flex items-center justify-center text-white`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <CardTitle className="text-base flex-1">{config.name}</CardTitle>
                    {result.status === "running" && (
                      <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    )}
                    {result.status === "complete" && (
                      <CheckCircle2 className="w-4 h-4 text-kindai-green" />
                    )}
                    {result.status === "pending" && (
                      <Circle className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                </CardHeader>
                {result.output && (
                  <CardContent>
                    <ScrollArea className="h-64">
                      <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                        {result.output}
                      </div>
                    </ScrollArea>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MockBusinessTest;
