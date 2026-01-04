import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { 
  Trophy, 
  Target, 
  Flame, 
  ChevronRight, 
  CheckCircle2, 
  Clock,
  Sparkles,
  TrendingUp,
  BookOpen,
  FileText,
  CheckSquare,
  Zap
} from "lucide-react";

interface ToolkitContent {
  id: string;
  title: string;
  description: string;
  content_type: "guide" | "template" | "checklist";
  category: string;
  icon: string;
}

interface UserProgress {
  id: string;
  content_id: string;
  is_completed: boolean;
  completed_at: string | null;
  started_at: string;
  completed_steps: string[];
}

interface ToolkitDashboardProps {
  onOpenContent: (id: string) => void;
  onNavigateToAgent: (agentType: string) => void;
}

const ToolkitDashboard = ({ onOpenContent, onNavigateToAgent }: ToolkitDashboardProps) => {
  const [content, setContent] = useState<ToolkitContent[]>([]);
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [contentRes, progressRes] = await Promise.all([
        supabase.from("toolkit_content").select("id, title, description, content_type, category, icon").order("order_index"),
        supabase.from("user_toolkit_progress").select("*").eq("user_id", user.id)
      ]);

      if (contentRes.data) setContent(contentRes.data);
      if (progressRes.data) {
        setProgress(progressRes.data.map(p => ({
          ...p,
          completed_steps: Array.isArray(p.completed_steps) ? p.completed_steps as string[] : []
        })));
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate stats
  const totalItems = content.length;
  const startedItems = progress.length;
  const completedItems = progress.filter(p => p.is_completed).length;
  const inProgressItems = startedItems - completedItems;
  const completionRate = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  // Get recommendations based on what user hasn't started
  const startedIds = new Set(progress.map(p => p.content_id));
  const notStarted = content.filter(c => !startedIds.has(c.id));
  
  // Prioritize recommendations by category
  const recommendations = getPersonalizedRecommendations(notStarted, progress, content);

  // Recent activity
  const recentActivity = [...progress]
    .sort((a, b) => new Date(b.started_at).getTime() - new Date(a.started_at).getTime())
    .slice(0, 5)
    .map(p => ({
      ...p,
      content: content.find(c => c.id === p.content_id)
    }))
    .filter(p => p.content);

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-4 animate-pulse">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="h-24 bg-muted" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          icon={<Target className="w-5 h-5" />}
          label="Total Resources"
          value={totalItems}
          color="text-kindai-blue"
          bgColor="bg-kindai-blue/10"
        />
        <StatCard
          icon={<Flame className="w-5 h-5" />}
          label="In Progress"
          value={inProgressItems}
          color="text-kindai-orange"
          bgColor="bg-kindai-orange/10"
        />
        <StatCard
          icon={<Trophy className="w-5 h-5" />}
          label="Completed"
          value={completedItems}
          color="text-kindai-green"
          bgColor="bg-kindai-green/10"
        />
        <StatCard
          icon={<TrendingUp className="w-5 h-5" />}
          label="Completion Rate"
          value={`${completionRate}%`}
          color="text-kindai-purple"
          bgColor="bg-kindai-purple/10"
        />
      </div>

      {/* Progress Bar */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Overall Progress</span>
          <span className="text-sm text-muted-foreground">{completedItems} of {totalItems} completed</span>
        </div>
        <Progress value={completionRate} className="h-2" />
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Personalized Recommendations */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-kindai-purple" />
            <h3 className="font-semibold">Recommended for You</h3>
          </div>
          
          {recommendations.length > 0 ? (
            <div className="space-y-3">
              {recommendations.slice(0, 4).map((item) => (
                <button
                  key={item.id}
                  onClick={() => item.isAgent ? onNavigateToAgent(item.agentType!) : onOpenContent(item.id)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-left group"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(item.type)}`}>
                    {getTypeIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm group-hover:text-primary transition-colors truncate">
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.reason}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              <Trophy className="w-10 h-10 mx-auto mb-2 text-kindai-green" />
              <p className="text-sm">Amazing! You've explored all resources.</p>
            </div>
          )}
        </Card>

        {/* Recent Activity */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-kindai-blue" />
            <h3 className="font-semibold">Recent Activity</h3>
          </div>
          
          {recentActivity.length > 0 ? (
            <div className="space-y-3">
              {recentActivity.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onOpenContent(item.content_id)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-left group"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(item.content?.content_type || "guide")}`}>
                    {item.is_completed ? (
                      <CheckCircle2 className="w-5 h-5 text-kindai-green" />
                    ) : (
                      getTypeIcon(item.content?.content_type || "guide")
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm group-hover:text-primary transition-colors truncate">
                      {item.content?.title}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {item.content?.category}
                      </Badge>
                      {item.is_completed && (
                        <span className="text-xs text-kindai-green">Completed</span>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              <Zap className="w-10 h-10 mx-auto mb-2" />
              <p className="text-sm">Start exploring to see your activity here!</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-3"
                onClick={() => onNavigateToAgent("content")}
              >
                Try an AI Agent
              </Button>
            </div>
          )}
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-kindai-orange" />
          <h3 className="font-semibold">Quick Actions</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <QuickActionButton
            label="Create Content"
            icon={<BookOpen className="w-5 h-5" />}
            color="bg-kindai-pink"
            onClick={() => onNavigateToAgent("content")}
          />
          <QuickActionButton
            label="Build Strategy"
            icon={<TrendingUp className="w-5 h-5" />}
            color="bg-kindai-orange"
            onClick={() => onNavigateToAgent("strategy")}
          />
          <QuickActionButton
            label="Automate Tasks"
            icon={<Zap className="w-5 h-5" />}
            color="bg-kindai-green"
            onClick={() => onNavigateToAgent("tech")}
          />
          <QuickActionButton
            label="Browse Templates"
            icon={<FileText className="w-5 h-5" />}
            color="bg-kindai-purple"
            onClick={() => onNavigateToAgent("templates")}
          />
        </div>
      </Card>
    </div>
  );
};

// Helper components
interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  color: string;
  bgColor: string;
}

const StatCard = ({ icon, label, value, color, bgColor }: StatCardProps) => (
  <Card className="p-4">
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-lg ${bgColor} flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  </Card>
);

interface QuickActionButtonProps {
  label: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
}

const QuickActionButton = ({ label, icon, color, onClick }: QuickActionButtonProps) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-border hover:border-primary/50 transition-all hover:shadow-md group"
  >
    <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <span className="text-sm font-medium text-center">{label}</span>
  </button>
);

// Helper functions
function getTypeColor(type: string): string {
  switch (type) {
    case "guide": return "bg-kindai-blue/10 text-kindai-blue";
    case "template": return "bg-kindai-orange/10 text-kindai-orange";
    case "checklist": return "bg-kindai-green/10 text-kindai-green";
    case "agent": return "bg-kindai-purple/10 text-kindai-purple";
    default: return "bg-muted text-muted-foreground";
  }
}

function getTypeIcon(type: string): React.ReactNode {
  switch (type) {
    case "guide": return <BookOpen className="w-5 h-5" />;
    case "template": return <FileText className="w-5 h-5" />;
    case "checklist": return <CheckSquare className="w-5 h-5" />;
    case "agent": return <Sparkles className="w-5 h-5" />;
    default: return <FileText className="w-5 h-5" />;
  }
}

interface Recommendation {
  id: string;
  title: string;
  type: string;
  reason: string;
  isAgent?: boolean;
  agentType?: string;
}

function getPersonalizedRecommendations(
  notStarted: ToolkitContent[], 
  progress: UserProgress[], 
  allContent: ToolkitContent[]
): Recommendation[] {
  const recommendations: Recommendation[] = [];

  // If user hasn't used AI agents much, recommend them first
  if (progress.length < 3) {
    recommendations.push({
      id: "agent-content",
      title: "Try the Content Creator Agent",
      type: "agent",
      reason: "Create blog posts, emails, and social content instantly",
      isAgent: true,
      agentType: "content"
    });
  }

  // Get categories user has engaged with
  const engagedCategories = new Set(
    progress
      .map(p => allContent.find(c => c.id === p.content_id)?.category)
      .filter(Boolean)
  );

  // Recommend from engaged categories first
  for (const item of notStarted) {
    if (engagedCategories.has(item.category)) {
      recommendations.push({
        id: item.id,
        title: item.title,
        type: item.content_type,
        reason: `More ${item.category} content you might like`
      });
    }
  }

  // Then add items from new categories
  for (const item of notStarted) {
    if (!engagedCategories.has(item.category) && !recommendations.find(r => r.id === item.id)) {
      recommendations.push({
        id: item.id,
        title: item.title,
        type: item.content_type,
        reason: `Explore ${item.category}`
      });
    }
  }

  // Add more agent recommendations
  if (progress.length >= 3 && progress.length < 10) {
    recommendations.push({
      id: "agent-strategy",
      title: "Build a Business Strategy",
      type: "agent",
      reason: "Get a complete business plan in minutes",
      isAgent: true,
      agentType: "strategy"
    });
  }

  return recommendations.slice(0, 6);
}

export default ToolkitDashboard;
