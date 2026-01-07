import { TrendingUp, PenTool, Zap, CheckCircle2, Loader2, Circle } from "lucide-react";

interface AgentResult {
  agentType: "strategy" | "content" | "tech";
  status: "pending" | "running" | "complete" | "error";
  output: string;
}

interface DemoProgressProps {
  results: AgentResult[];
  currentAgent: "strategy" | "content" | "tech" | null;
  completedCount: number;
}

const AGENT_INFO = {
  strategy: { name: "Strategy", icon: TrendingUp, color: "bg-kindai-orange" },
  content: { name: "Content", icon: PenTool, color: "bg-kindai-pink" },
  tech: { name: "Tech", icon: Zap, color: "bg-kindai-green" },
};

const DemoProgress = ({ results, currentAgent, completedCount }: DemoProgressProps) => {
  return (
    <div className="flex items-center justify-center gap-2 p-4 bg-muted/30 rounded-xl">
      {(["strategy", "content", "tech"] as const).map((type, index) => {
        const info = AGENT_INFO[type];
        const Icon = info.icon;
        const result = results.find(r => r.agentType === type);
        const isActive = currentAgent === type;
        const isComplete = result?.status === "complete";
        const isPending = result?.status === "pending";

        return (
          <div key={type} className="flex items-center">
            <div className={`
              flex items-center gap-2 px-3 py-2 rounded-lg transition-all
              ${isActive ? "bg-primary/10 ring-2 ring-primary" : ""}
              ${isComplete ? "bg-kindai-green/10" : ""}
            `}>
              <div className={`
                w-8 h-8 rounded-lg flex items-center justify-center
                ${isComplete ? "bg-kindai-green" : info.color}
                ${isPending ? "opacity-40" : ""}
                text-white
              `}>
                {isActive ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : isComplete ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <Icon className="w-4 h-4" />
                )}
              </div>
              <span className={`text-sm font-medium ${isPending ? "text-muted-foreground" : ""}`}>
                {info.name}
              </span>
            </div>
            
            {index < 2 && (
              <div className={`
                w-8 h-0.5 mx-1
                ${results[index]?.status === "complete" ? "bg-kindai-green" : "bg-border"}
              `} />
            )}
          </div>
        );
      })}
      
      <div className="ml-4 text-sm text-muted-foreground">
        {completedCount}/3 complete
      </div>
    </div>
  );
};

export default DemoProgress;
