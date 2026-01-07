import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/kindai-logo-with-bird.png";
import { useParallax } from "@/hooks/use-parallax";

const Hero = () => {
  const navigate = useNavigate();
  const parallax1 = useParallax(0.3);
  const parallax2 = useParallax(0.2);
  const parallax3 = useParallax(0.15);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Gradient background orbs with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-1/4 -left-1/4 w-96 h-96 bg-kindai-pink/20 rounded-full blur-3xl animate-float" 
          style={{ transform: `translateY(${parallax1}px)` }}
        />
        <div 
          className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-kindai-blue/20 rounded-full blur-3xl animate-float" 
          style={{ transform: `translateY(${parallax2}px)`, animationDelay: "2s" }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 w-96 h-96 bg-kindai-green/10 rounded-full blur-3xl animate-float" 
          style={{ transform: `translateY(calc(-50% + ${parallax3}px))`, animationDelay: "4s" }}
        />
      </div>

      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Staggered entrance animations */}
          <img 
            src={logo} 
            alt="Kindai Logo" 
            className="w-48 mx-auto mb-8 animate-bounce-in" 
            style={{ animationDelay: "0ms" }}
          />
          
          <h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight animate-slide-in-bottom"
            style={{ animationDelay: "100ms", animationFillMode: "both" }}
          >
            The{" "}
            <span className="inline-block">
              <span className="text-kindai-pink text-glow-pink">3</span>
              <span className="text-kindai-orange text-glow-orange">-</span>
              <span className="text-kindai-green text-glow-green">A</span>
              <span className="text-kindai-blue text-glow-blue">g</span>
              <span className="text-kindai-purple text-glow-purple">e</span>
              <span className="text-kindai-pink text-glow-pink">n</span>
              <span className="text-kindai-orange text-glow-orange">t</span>
            </span>
            <br />
            <span className="inline-block">
              <span className="text-kindai-green text-glow-green">P</span>
              <span className="text-kindai-blue text-glow-blue">l</span>
              <span className="text-kindai-purple text-glow-purple">a</span>
              <span className="text-kindai-pink text-glow-pink">y</span>
              <span className="text-kindai-orange text-glow-orange">b</span>
              <span className="text-kindai-green text-glow-green">o</span>
              <span className="text-kindai-blue text-glow-blue">o</span>
              <span className="text-kindai-purple text-glow-purple">k</span>
            </span>
          </h1>
          
          <p 
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-slide-in-bottom"
            style={{ animationDelay: "200ms", animationFillMode: "both" }}
          >
            3 AI Agents that create content, build strategies, and automate your business. Tell them what you need — they do the work.
          </p>
          
          <div 
            className="flex justify-center items-center pt-4 animate-slide-in-bottom"
            style={{ animationDelay: "300ms", animationFillMode: "both" }}
          >
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 gradient-rebel hover:opacity-90 transition-smooth shadow-glow group active:scale-95 touch-feedback" 
              onClick={() => navigate("/pricing")}
            >
              <Sparkles className="mr-2 w-5 h-5" />
              Get Started Now
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-smooth" />
            </Button>
          </div>
          
          <div 
            className="pt-8 flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm text-muted-foreground animate-slide-in-bottom"
            style={{ animationDelay: "400ms", animationFillMode: "both" }}
          >
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