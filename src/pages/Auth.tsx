import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Mail, Lock, ArrowRight, Sparkles } from "lucide-react";
import logo from "@/assets/kindai-logo-with-bird.png";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        navigate("/toolkit");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        navigate("/toolkit");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast.success("Welcome back, Rebel! 🚀");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/toolkit`,
          },
        });
        if (error) throw error;
        toast.success("Account created! Check your email to confirm.");
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      if (error.message.includes("already registered")) {
        toast.error("This email is already registered. Try logging in!");
      } else if (error.message.includes("Invalid login")) {
        toast.error("Invalid email or password. Try again!");
      } else {
        toast.error(error.message || "Authentication failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-kindai-pink/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-kindai-blue/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-kindai-purple/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "4s" }} />
      </div>

      <Card className="w-full max-w-md p-8 relative z-10 shadow-card border-2">
        <div className="text-center mb-8">
          <img src={logo} alt="Kindai Logo" className="w-24 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-kindai-pink text-glow-pink">R</span>
            <span className="text-kindai-orange text-glow-orange">e</span>
            <span className="text-kindai-green text-glow-green">b</span>
            <span className="text-kindai-blue text-glow-blue">e</span>
            <span className="text-kindai-purple text-glow-purple">l</span>
            {" "}
            <span className="text-kindai-pink text-glow-pink">T</span>
            <span className="text-kindai-orange text-glow-orange">o</span>
            <span className="text-kindai-green text-glow-green">o</span>
            <span className="text-kindai-blue text-glow-blue">l</span>
            <span className="text-kindai-purple text-glow-purple">k</span>
            <span className="text-kindai-pink text-glow-pink">i</span>
            <span className="text-kindai-orange text-glow-orange">t</span>
          </h1>
          <p className="text-muted-foreground">
            {isLogin ? "Welcome back, rebel!" : "Join the rebellion"}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10"
              required
              minLength={6}
            />
          </div>

          <Button
            type="submit"
            className="w-full gradient-rebel text-white hover:opacity-90 transition-smooth"
            disabled={loading}
          >
            {loading ? (
              <Sparkles className="w-5 h-5 animate-spin" />
            ) : (
              <>
                {isLogin ? "Enter the Rebellion" : "Join the Rebellion"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-muted-foreground hover:text-foreground transition-smooth text-sm"
          >
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span className="text-kindai-pink font-semibold">
              {isLogin ? "Sign up" : "Log in"}
            </span>
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4 text-kindai-green" />
            <span>AI-powered toolkit included</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Auth;
