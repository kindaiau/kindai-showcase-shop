import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Sparkles, 
  Lock,
  PenTool,
  TrendingUp,
  Zap,
  ArrowRight
} from "lucide-react";
import logo from "@/assets/kindai-logo-with-bird.png";
import DemoAgent from "@/components/toolkit/DemoAgent";
import SEO from "@/components/SEO";

type AgentType = "content" | "strategy" | "tech";

const DEMO_MESSAGE_LIMIT = 3;
const DEMO_STORAGE_KEY = "rebel_demo_messages_used";

const Demo = () => {
  const navigate = useNavigate();
  const [selectedAgent, setSelectedAgent] = useState<AgentType | null>(null);
  const [messagesUsed, setMessagesUsed] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem(DEMO_STORAGE_KEY);
    if (stored) {
      setMessagesUsed(parseInt(stored, 10));
    }
  }, []);

  const handleMessageSent = () => {
    const newCount = messagesUsed + 1;
    setMessagesUsed(newCount);
    localStorage.setItem(DEMO_STORAGE_KEY, newCount.toString());
  };

  const remainingMessages = Math.max(0, DEMO_MESSAGE_LIMIT - messagesUsed);
  const isLimitReached = messagesUsed >= DEMO_MESSAGE_LIMIT;

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Try Demo Free - Rebel Toolkit AI Agents"
        description="Test the 3 AI agents for free. Create content, build strategies, and automate tasks with no signup required."
        image="/og-demo.png"
        url="https://kindai.dev/demo"
      />
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Kindai" className="w-10 h-10" />
            <div>
              <h1 className="font-bold text-lg flex items-center gap-2">
                <span className="text-kindai-pink text-glow-pink">R</span>
                <span className="text-kindai-orange text-glow-orange">e</span>
                <span className="text-kindai-green text-glow-green">b</span>
                <span className="text-kindai-blue text-glow-blue">e</span>
                <span className="text-kindai-pink text-glow-pink">l</span>{" "}
                Demo
                <Badge variant="secondary" className="ml-2">Free Trial</Badge>
              </h1>
              <p className="text-xs text-muted-foreground">
                {remainingMessages} of {DEMO_MESSAGE_LIMIT} free messages remaining
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
            <Button 
              size="sm" 
              className="gradient-rebel text-white"
              onClick={() => navigate("/purchase")}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Get Full Access
            </Button>
          </div>
        </div>
      </header>

      <div className="container px-4 py-8">
        {/* Demo Banner */}
        <div className="mb-6 p-4 rounded-lg bg-gradient-to-r from-kindai-pink/10 via-kindai-orange/10 to-kindai-green/10 border border-primary/20">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="font-bold text-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-kindai-orange" />
                Try Before You Buy
              </h2>
              <p className="text-sm text-muted-foreground">
                You have {remainingMessages} free {remainingMessages === 1 ? "message" : "messages"} to test the AI agents.
              </p>
            </div>
            <div className="flex gap-3">
              {[...Array(DEMO_MESSAGE_LIMIT)].map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    i < messagesUsed ? "bg-muted-foreground/30" : "bg-kindai-green"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {isLimitReached && !selectedAgent ? (
          /* Limit Reached State */
          <Card className="p-8 text-center">
            <Lock className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">Demo Limit Reached</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              You've used all {DEMO_MESSAGE_LIMIT} free demo messages. Get the full Rebel Toolkit for unlimited access to all 3 AI agents.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                size="lg"
                className="gradient-rebel text-white"
                onClick={() => navigate("/purchase")}
              >
                Get Full Access
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate("/auth")}
              >
                Sign In (Already Purchased)
              </Button>
            </div>
          </Card>
        ) : selectedAgent ? (
          /* Agent Chat View */
          <div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSelectedAgent(null)} 
              className="mb-4"
            >
              ← Back to Agent Selection
            </Button>
            <DemoAgent 
              agentType={selectedAgent} 
              messagesUsed={messagesUsed}
              messageLimit={DEMO_MESSAGE_LIMIT}
              onMessageSent={handleMessageSent}
              onLimitReached={() => setSelectedAgent(null)}
            />
          </div>
        ) : (
          /* Agent Selection */
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Choose an Agent to Try</h2>
              <p className="text-muted-foreground">
                Each agent specializes in different tasks. Pick one to see it in action.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <AgentDemoCard
                title="Content Creator"
                description="Writes complete blog posts, social media content, emails, and marketing copy."
                icon={<PenTool className="w-8 h-8" />}
                color="bg-kindai-pink"
                examples={["Blog posts", "Social calendars", "Email sequences"]}
                onClick={() => setSelectedAgent("content")}
                disabled={isLimitReached}
              />
              <AgentDemoCard
                title="Business Strategist"
                description="Builds business plans, pricing strategies, and competitive analyses."
                icon={<TrendingUp className="w-8 h-8" />}
                color="bg-kindai-orange"
                examples={["Business plans", "Pricing models", "Market analysis"]}
                onClick={() => setSelectedAgent("strategy")}
                disabled={isLimitReached}
              />
              <AgentDemoCard
                title="Automation Engineer"
                description="Creates automation workflows, technical integrations, and SEO configs."
                icon={<Zap className="w-8 h-8" />}
                color="bg-kindai-green"
                examples={["Zapier workflows", "CRM setups", "SEO markup"]}
                onClick={() => setSelectedAgent("tech")}
                disabled={isLimitReached}
              />
            </div>

            <Card className="p-6 mt-8 bg-muted/30">
              <h3 className="font-semibold mb-2">What's in the Full Toolkit?</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✓ Unlimited messages with all 3 AI agents</li>
                <li>✓ Step-by-step guides and templates</li>
                <li>✓ Implementation checklists</li>
                <li>✓ Save and export your AI-generated content</li>
                <li>✓ Progress tracking and dashboard</li>
              </ul>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

interface AgentDemoCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  examples: string[];
  onClick: () => void;
  disabled?: boolean;
}

const AgentDemoCard = ({ 
  title, 
  description, 
  icon, 
  color, 
  examples, 
  onClick,
  disabled 
}: AgentDemoCardProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`text-left p-6 rounded-xl border-2 border-border transition-all bg-card ${
      disabled 
        ? "opacity-50 cursor-not-allowed" 
        : "hover:border-primary/50 hover:shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:border-primary"
    } group`}
  >
    <div className={`w-14 h-14 rounded-lg ${color} flex items-center justify-center text-white mb-4 ${!disabled && "group-hover:scale-110"} transition-transform`}>
      {icon}
    </div>
    <h3 className={`font-bold text-xl mb-2 ${!disabled && "group-hover:text-primary"} transition-colors`}>
      {title}
    </h3>
    <p className="text-sm text-muted-foreground mb-4">{description}</p>
    <div className="flex flex-wrap gap-1">
      {examples.map((ex, i) => (
        <span key={i} className="text-xs bg-muted px-2 py-1 rounded-full">
          {ex}
        </span>
      ))}
    </div>
  </button>
);

export default Demo;
