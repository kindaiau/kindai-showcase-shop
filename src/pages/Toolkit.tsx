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
  Sparkles,
  Home,
  Zap
} from "lucide-react";
import logo from "@/assets/kindai-logo-with-bird.png";
import AIAssistant from "@/components/toolkit/AIAssistant";
import ToolkitContentCard from "@/components/toolkit/ToolkitContentCard";
import ContentViewer from "@/components/toolkit/ContentViewer";

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

const Toolkit = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<ToolkitContent[]>([]);
  const [selectedContent, setSelectedContent] = useState<ToolkitContent | null>(null);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("guides");

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
                <span className="text-kindai-pink">Rebel</span> Toolkit
              </h1>
              <p className="text-xs text-muted-foreground">Your 3-Agent Playbook</p>
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
            Welcome, <span className="text-kindai-pink">Rebel</span>! 🚀
          </h2>
          <p className="text-muted-foreground">
            Everything you need to build incredible digital products. No fluff, just power.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content area */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="guides" className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span className="hidden sm:inline">Guides</span>
                </TabsTrigger>
                <TabsTrigger value="templates" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span className="hidden sm:inline">Templates</span>
                </TabsTrigger>
                <TabsTrigger value="checklists" className="flex items-center gap-2">
                  <CheckSquare className="w-4 h-4" />
                  <span className="hidden sm:inline">Checklists</span>
                </TabsTrigger>
                <TabsTrigger value="generate" className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span className="hidden sm:inline">Generate</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="guides" className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-5 h-5 text-kindai-blue" />
                  <h3 className="font-semibold">Step-by-Step Guides</h3>
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

              <TabsContent value="templates" className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-kindai-orange" />
                  <h3 className="font-semibold">Automation Templates</h3>
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

              <TabsContent value="checklists" className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <CheckSquare className="w-5 h-5 text-kindai-green" />
                  <h3 className="font-semibold">Business Checklists</h3>
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

              <TabsContent value="generate">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-kindai-purple" />
                  <h3 className="font-semibold">AI Content Generator</h3>
                </div>
                <AIAssistant mode="generate" />
              </TabsContent>
            </Tabs>
          </div>

          {/* AI Assistant sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <Bot className="w-5 h-5 text-kindai-purple" />
                <h3 className="font-semibold">Rebel AI Assistant</h3>
              </div>
              <AIAssistant mode="chat" />
            </div>
          </div>
        </div>
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

export default Toolkit;
