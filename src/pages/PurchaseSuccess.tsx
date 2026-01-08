import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Sparkles, BookOpen, MessageSquare, Rocket } from "lucide-react";

const PurchaseSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Add confetti or celebration effect
    const timer = setTimeout(() => {
      // Auto-scroll to content after a moment
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const nextSteps = [
    {
      icon: BookOpen,
      title: "Explore the Guides",
      description: "Start with the foundational guides to understand the rebel approach to business.",
    },
    {
      icon: MessageSquare,
      title: "Chat with the AI Assistant",
      description: "Get personalized advice and brainstorm ideas with your rebel business coach.",
    },
    {
      icon: Rocket,
      title: "Complete the Business Test",
      description: "Discover your unique rebel business style and get tailored recommendations.",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="relative inline-flex mb-8">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
            <div className="relative bg-gradient-to-br from-primary to-primary/80 rounded-full p-6">
              <CheckCircle className="h-16 w-16 text-primary-foreground" />
            </div>
            <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-primary animate-bounce" />
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Welcome to the Rebellion!
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-lg mx-auto">
            Your purchase has been verified. You now have full access to the Kindai Rebel Toolkit.
          </p>

          {/* Next Steps */}
          <div className="grid gap-4 md:grid-cols-3 mb-10">
            {nextSteps.map((step, index) => (
              <Card key={index} className="bg-card/50 border-border/50 hover:border-primary/30 transition-colors">
                <CardContent className="p-6 text-left">
                  <div className="bg-primary/10 rounded-lg p-3 w-fit mb-4">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Button */}
          <Button 
            size="lg" 
            onClick={() => navigate("/toolkit")}
            className="group text-lg px-8 py-6"
          >
            Enter the Toolkit
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          <p className="text-sm text-muted-foreground mt-6">
            Your license is now linked to your account. You can access the toolkit anytime.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 py-6 px-4">
        <div className="max-w-2xl mx-auto text-center text-sm text-muted-foreground">
          Questions? Reach out to us at{" "}
          <a href="mailto:support@kindai.io" className="text-primary hover:underline">
            support@kindai.io
          </a>
        </div>
      </footer>
    </div>
  );
};

export default PurchaseSuccess;
