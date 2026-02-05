import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  LogOut, 
  BookOpen, 
  FileText, 
  CheckSquare, 
  Bot, 
  Home,
  PenTool,
  TrendingUp,
  Zap,
  Sparkles,
  LayoutDashboard,
  Play,
  Image
} from "lucide-react";
import logo from "@/assets/kindai-logo-with-bird.png";
import ToolkitContentCard from "@/components/toolkit/ToolkitContentCard";
import ContentViewer from "@/components/toolkit/ContentViewer";
import ToolkitDashboard from "@/components/toolkit/ToolkitDashboard";
import SpecializedAgent from "@/components/toolkit/SpecializedAgent";
import MockBusinessTest from "@/components/toolkit/MockBusinessTest";
import SocialMediaGallery from "@/components/toolkit/SocialMediaGallery";
import PurchaseGate from "@/components/PurchaseGate";
import { usePurchaseStatus } from "@/hooks/use-purchase-status";

interface ToolkitContent {
  id: string;
  title: string;
  description: string;
  content_type: "guide" | "template" | "checklist";
  content: any;
  category: string;
  icon: string;
  order_index: number;
}

const ToolkitContent_ = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<ToolkitContent[]>([]);
  const [selectedContent, setSelectedContent] = useState<ToolkitContent | null>(null);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/auth");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/auth");
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await supabase
        .from("toolkit_content")
        .select("*")
        .order("order_index");
      
      if (error) {
        console.error("Error fetching content:", error);
        toast.error("Failed to load toolkit content");
      } else {
        setContent(data || []);
      }
    };

    if (user) {
      fetchContent();
    }
  }, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("See you soon, rebel! 👋");
    navigate("/");
  };

  const handleOpenContent = (id: string) => {
    const item = content.find(c => c.id === id);
    if (item) {
      setSelectedContent(item);
    }
  };

  const handleStepToggle = (stepId: string) => {
    setCompletedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(s => s !== stepId)
        : [...prev, stepId]
    );
  };

  const guides = content.filter(c => c.content_type === "guide");
  const templates = content.filter(c => c.content_type === "template");
  const checklists = content.filter(c => c.content_type === "checklist");

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex gap-2">
          <span className="w-3 h-3 bg-kindai-pink rounded-full animate-pulse" />
          <span className="w-3 h-3 bg-kindai-orange rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
          <span className="w-3 h-3 bg-kindai-green rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Kindai" className="w-10 h-10" />
            <div>
              <h1 className="font-bold text-lg">
                <span className="text-kindai-pink text-glow-pink">R</span>
                <span className="text-kindai-orange text-glow-orange">e</span>
                <span className="text-kindai-green text-glow-green">b</span>
                <span className="text-kindai-blue text-glow-blue">e</span>
                <span className="text-kindai-pink text-glow-pink">l</span>{" "}
                Toolkit
              </h1>
              <p className="text-xs text-muted-foreground">3 AI Agents at Your Service</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container px-4 py-8">
        {/* Welcome section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Your{" "}
            <span className="text-kindai-pink text-glow-pink">A</span>
            <span className="text-kindai-orange text-glow-orange">I</span>{" "}
            <span className="text-kindai-green text-glow-green">T</span>
            <span className="text-kindai-blue text-glow-blue">e</span>
            <span className="text-kindai-pink text-glow-pink">a</span>
            <span className="text-kindai-orange text-glow-orange">m</span>{" "}
            is Ready,{" "}
            <span className="text-kindai-green text-glow-green">R</span>
            <span className="text-kindai-blue text-glow-blue">e</span>
            <span className="text-kindai-pink text-glow-pink">b</span>
            <span className="text-kindai-orange text-glow-orange">e</span>
            <span className="text-kindai-green text-glow-green">l</span>{" "}🚀
          </h2>
          <p className="text-muted-foreground">
            3 specialized AI agents that do the work for you. No learning curve, just results.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-7 mb-6 h-auto">
            <TabsTrigger value="dashboard" className="flex items-center gap-2 py-3">
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="agents" className="flex items-center gap-2 py-3">
              <Bot className="w-4 h-4" />
              <span className="hidden sm:inline">AI Agents</span>
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center gap-2 py-3">
              <Image className="w-4 h-4" />
              <span className="hidden sm:inline">Social</span>
            </TabsTrigger>
            <TabsTrigger value="guides" className="flex items-center gap-2 py-3">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Guides</span>
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center gap-2 py-3">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Templates</span>
            </TabsTrigger>
            <TabsTrigger value="checklists" className="flex items-center gap-2 py-3">
              <CheckSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Checklists</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2 py-3">
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Resources</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard">
            <ToolkitDashboard 
              onOpenContent={handleOpenContent}
              onNavigateToAgent={(type) => setActiveTab(type === "templates" ? "templates" : `agent-${type}`)}
            />
          </TabsContent>

          {/* AI Agents Tab */}
          <TabsContent value="agents">
            <div className="space-y-6">
              {/* Agent Selection */}
              <div className="grid md:grid-cols-3 gap-4">
                <AgentCard
                  title="Content Creator"
                  description="Writes complete blog posts, social media content, emails, and marketing copy."
                  icon={<PenTool className="w-6 h-6" />}
                  color="bg-kindai-pink"
                  examples={["Blog posts", "Social calendars", "Email sequences", "Ad copy"]}
                  onClick={() => setActiveTab("agent-content")}
                />
                <AgentCard
                  title="Business Strategist"
                  description="Builds business plans, pricing strategies, and competitive analyses."
                  icon={<TrendingUp className="w-6 h-6" />}
                  color="bg-kindai-orange"
                  examples={["Business plans", "Pricing models", "Market analysis", "Growth roadmaps"]}
                  onClick={() => setActiveTab("agent-strategy")}
                />
                <AgentCard
                  title="Automation Engineer"
                  description="Creates automation workflows, technical integrations, and SEO configs."
                  icon={<Zap className="w-6 h-6" />}
                  color="bg-kindai-green"
                  examples={["Zapier workflows", "CRM setups", "Email automations", "SEO markup"]}
                  onClick={() => setActiveTab("agent-tech")}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-dashed border-border">
                <div>
                  <h3 className="font-semibold">Try the 3-Agent Demo</h3>
                  <p className="text-sm text-muted-foreground">Watch all 3 agents work on a mock business</p>
                </div>
                <Button onClick={() => setActiveTab("demo")} variant="outline">
                  <Play className="w-4 h-4 mr-2" />
                  Run Demo
                </Button>
              </div>

              <div className="text-center py-8 border-2 border-dashed border-border rounded-lg">
                <Bot className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold text-lg mb-2">Select an Agent to Get Started</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Click on any agent above to start working. They'll create complete, 
                  ready-to-use content — not just advice.
                </p>
              </div>
            </div>
          </TabsContent>

          {/* Social Media Gallery Tab */}
          <TabsContent value="social">
            <SocialMediaGallery />
          </TabsContent>

          {/* Demo Tab */}
          <TabsContent value="demo">
            <Button variant="ghost" size="sm" onClick={() => setActiveTab("agents")} className="mb-4">
              ← Back to Agents
            </Button>
            <MockBusinessTest />
          </TabsContent>

          {/* Individual Agent Tabs */}
          <TabsContent value="agent-content">
            <Button variant="ghost" size="sm" onClick={() => setActiveTab("agents")} className="mb-4">
              ← Back to Agents
            </Button>
            <SpecializedAgent agentType="content" />
          </TabsContent>

          <TabsContent value="agent-strategy">
            <Button variant="ghost" size="sm" onClick={() => setActiveTab("agents")} className="mb-4">
              ← Back to Agents
            </Button>
            <SpecializedAgent agentType="strategy" />
          </TabsContent>

          <TabsContent value="agent-tech">
            <Button variant="ghost" size="sm" onClick={() => setActiveTab("agents")} className="mb-4">
              ← Back to Agents
            </Button>
            <SpecializedAgent agentType="tech" />
          </TabsContent>

          {/* Guides Tab */}
          <TabsContent value="guides" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-kindai-blue" />
              <h3 className="font-semibold">Reference Guides</h3>
              <span className="text-sm text-muted-foreground">— Learn the strategies behind the agents</span>
            </div>
            {guides.map(item => (
              <ToolkitContentCard
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description || ""}
                contentType={item.content_type}
                category={item.category}
                icon={item.icon || "FileText"}
                content={item.content}
                onOpen={handleOpenContent}
              />
            ))}
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-kindai-orange" />
              <h3 className="font-semibold">Prompt Templates</h3>
              <span className="text-sm text-muted-foreground">— Copy-paste prompts for the agents</span>
            </div>
            {templates.map(item => (
              <ToolkitContentCard
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description || ""}
                contentType={item.content_type}
                category={item.category}
                icon={item.icon || "FileText"}
                content={item.content}
                onOpen={handleOpenContent}
              />
            ))}
          </TabsContent>

          {/* Checklists Tab */}
          <TabsContent value="checklists" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <CheckSquare className="w-5 h-5 text-kindai-green" />
              <h3 className="font-semibold">Implementation Checklists</h3>
              <span className="text-sm text-muted-foreground">— Track your progress</span>
            </div>
            {checklists.map(item => (
              <ToolkitContentCard
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description || ""}
                contentType={item.content_type}
                category={item.category}
                icon={item.icon || "FileText"}
                content={item.content}
                onOpen={handleOpenContent}
              />
            ))}
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-kindai-purple" />
              <h3 className="font-semibold">All Resources</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {content.map(item => (
                <ToolkitContentCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  description={item.description || ""}
                  contentType={item.content_type}
                  category={item.category}
                  icon={item.icon || "FileText"}
                  content={item.content}
                  onOpen={handleOpenContent}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Content viewer modal */}
      <ContentViewer
        isOpen={!!selectedContent}
        onClose={() => setSelectedContent(null)}
        content={selectedContent}
        completedSteps={completedSteps}
        onStepToggle={handleStepToggle}
      />
    </div>
  );
};

// Agent Card Component
interface AgentCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  examples: string[];
  onClick: () => void;
}

const AgentCard = ({ title, description, icon, color, examples, onClick }: AgentCardProps) => (
  <button
    onClick={onClick}
    className="text-left p-6 rounded-xl border-2 border-border hover:border-primary/50 transition-all hover:shadow-lg group bg-card"
  >
    <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{title}</h3>
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

// Main Toolkit component with purchase gate
const Toolkit = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { hasPurchased, isLoading: purchaseLoading } = usePurchaseStatus(user);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/auth");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/auth");
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (loading || purchaseLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex gap-2">
          <span className="w-3 h-3 bg-kindai-pink rounded-full animate-pulse" />
          <span className="w-3 h-3 bg-kindai-orange rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
          <span className="w-3 h-3 bg-kindai-green rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
        </div>
      </div>
    );
  }

  if (!hasPurchased) {
    navigate("/purchase");
    return null;
  }

  return <ToolkitContent_ />;
};

export default Toolkit;
