import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import logo from "@/assets/kindai-logo-with-bird.png";
import { useState } from "react";
import EmailCaptureForm from "./EmailCaptureForm";

const Hero = () => {
  const [showEmailDialog, setShowEmailDialog] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Gradient background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-kindai-pink/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-kindai-blue/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-kindai-green/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "4s" }} />
      </div>

      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <img 
            src={logo} 
            alt="Kindai Logo" 
            className="w-48 mx-auto mb-8 animate-slide-up"
          />
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
            The <span className="text-gradient-hero">3-Agent</span>
            <br />
            Playbook
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Built by Rebels, for Rebels. Forge incredible websites, e-commerce stores, and AI magic without writing a single line of code.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 gradient-rebel hover:opacity-90 transition-smooth shadow-glow group"
              onClick={() => setShowEmailDialog(true)}
            >
              Join the Waitlist
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-smooth" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6 border-2 hover:border-primary transition-smooth"
            >
              Watch Demo
            </Button>
          </div>
          
          <EmailCaptureForm 
            variant="dialog" 
            open={showEmailDialog} 
            onOpenChange={setShowEmailDialog} 
          />
          
          <div className="pt-8 flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-kindai-green animate-pulse-glow" />
              No code required
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-kindai-blue animate-pulse-glow" />
              ADHD-friendly
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-kindai-orange animate-pulse-glow" />
              Built for rebels
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
