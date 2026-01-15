import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { usePurchaseStatus } from "@/hooks/use-purchase-status";
import { 
  Sparkles, 
  ArrowRight, 
  Mail, 
  CheckCircle, 
  LogIn,
  Rocket,
  Bot,
  FileText,
  Loader2
} from "lucide-react";
import logo from "@/assets/kindai-logo-with-bird.png";

const Welcome = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { hasPurchased, isLoading: purchaseLoading } = usePurchaseStatus(user);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // If user is logged in and has purchased, redirect to toolkit
  useEffect(() => {
    if (!loading && !purchaseLoading && user && hasPurchased) {
      navigate("/toolkit");
    }
  }, [loading, purchaseLoading, user, hasPurchased, navigate]);

  if (loading || purchaseLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Checking your access...</p>
        </div>
      </div>
    );
  }

  const features = [
    {
      icon: Bot,
      title: "3 AI Agents",
      description: "Content Creator, Business Strategist, and Automation Engineer",
    },
    {
      icon: FileText,
      title: "Done-For-You Templates",
      description: "Copy-paste prompts and ready-to-use frameworks",
    },
    {
      icon: Rocket,
      title: "Launch in 30 Days",
      description: "Step-by-step guides designed for ADHD entrepreneurs",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Kindai" className="w-10 h-10" />
            <span className="font-bold text-lg">
              <span className="text-kindai-pink">R</span>
              <span className="text-kindai-orange">e</span>
              <span className="text-kindai-green">b</span>
              <span className="text-kindai-blue">e</span>
              <span className="text-kindai-pink">l</span>{" "}
              Toolkit
            </span>
          </div>
          {user ? (
            <Button variant="outline" size="sm" onClick={() => navigate("/toolkit")}>
              Go to Toolkit
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button variant="ghost" size="sm" onClick={() => navigate("/auth")}>
              <LogIn className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          )}
        </div>
      </header>

      <div className="container px-4 py-12 max-w-4xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex p-4 rounded-full bg-primary/10 mb-6">
            <Sparkles className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to Your{" "}
            <span className="text-kindai-pink text-glow-pink">R</span>
            <span className="text-kindai-orange text-glow-orange">e</span>
            <span className="text-kindai-green text-glow-green">b</span>
            <span className="text-kindai-blue text-glow-blue">e</span>
            <span className="text-kindai-pink text-glow-pink">l</span>{" "}
            Toolkit!
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Thank you for your purchase! Here's how to access your AI agents and templates.
          </p>
        </div>

        {/* Access Instructions */}
        <Card className="mb-8 border-2 border-primary/20 bg-card/50">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <Mail className="w-6 h-6 text-primary" />
              Important: Use Your Purchase Email
            </CardTitle>
            <CardDescription className="text-base">
              To access the toolkit, sign in with the <strong>same email</strong> you used to purchase on Gumroad.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Steps */}
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-muted/30">
                <div className="w-10 h-10 rounded-full bg-kindai-pink/20 flex items-center justify-center text-kindai-pink font-bold mb-3">
                  1
                </div>
                <h3 className="font-semibold mb-1">Click Sign In</h3>
                <p className="text-sm text-muted-foreground">
                  Create an account or sign in
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-muted/30">
                <div className="w-10 h-10 rounded-full bg-kindai-orange/20 flex items-center justify-center text-kindai-orange font-bold mb-3">
                  2
                </div>
                <h3 className="font-semibold mb-1">Use Purchase Email</h3>
                <p className="text-sm text-muted-foreground">
                  The email you used on Gumroad
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-muted/30">
                <div className="w-10 h-10 rounded-full bg-kindai-green/20 flex items-center justify-center text-kindai-green font-bold mb-3">
                  3
                </div>
                <h3 className="font-semibold mb-1">Access Everything</h3>
                <p className="text-sm text-muted-foreground">
                  All 3 agents + templates unlocked
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center pt-4">
              {user ? (
                hasPurchased ? (
                  <Button size="lg" onClick={() => navigate("/toolkit")} className="text-lg px-8">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Enter the Toolkit
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Signed in as <strong>{user.email}</strong>
                    </p>
                    <p className="text-sm text-amber-500">
                      No purchase found for this email. Make sure you're using the same email you used on Gumroad.
                    </p>
                    <Button variant="outline" onClick={() => supabase.auth.signOut()}>
                      Sign in with a different email
                    </Button>
                  </div>
                )
              ) : (
                <Button size="lg" onClick={() => navigate("/auth?redirect=/welcome")} className="text-lg px-8">
                  <LogIn className="w-5 h-5 mr-2" />
                  Sign In to Access
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* What's Included */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-center mb-6">What's Inside Your Toolkit</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card/50 border-border/50">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex p-3 rounded-lg bg-primary/10 mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Help */}
        <div className="text-center text-muted-foreground">
          <p>
            Having trouble? Contact us at{" "}
            <a href="mailto:support@kindai.io" className="text-primary hover:underline">
              support@kindai.io
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
