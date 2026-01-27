import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { getUtmParams, trackEvent } from "@/lib/analytics";
import { 
  FileText, 
  Check, 
  Zap, 
  Clock, 
  Target, 
  Loader2,
  Download,
  Sparkles 
} from "lucide-react";

const emailSchema = z.object({
  email: z.string().trim().email("Please enter a valid email").max(255),
  name: z.string().trim().min(1, "Name is required").max(100),
  website: z.string().optional(),
});

const CHECKLIST_ITEMS = [
  { icon: Target, text: "Define your offer in 60 seconds" },
  { icon: Zap, text: "Find your audience without ads" },
  { icon: Clock, text: "Launch in a weekend, not months" },
];

const LeadMagnetSection = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");
    setErrorMessage("");

    const validation = emailSchema.safeParse({ email, name, website });
    if (!validation.success) {
      const message = validation.error.errors[0]?.message ?? "Invalid input";
      toast({
        title: "Invalid input",
        description: message,
        variant: "destructive",
      });
      return;
    }

    // Honeypot
    if (validation.data.website) {
      setStatus("success");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-lead-magnet", {
        body: {
          email: validation.data.email,
          name: validation.data.name,
          utm: getUtmParams(),
          page_url: window.location.href,
        },
      });

      if (error) throw error;

      trackEvent("lead_magnet_download", { source: "lead_magnet_form" });
      setStatus("success");
      setEmail("");
      setName("");
    } catch (error: any) {
      const message = error?.message || "Something went wrong. Please try again.";
      setStatus("error");
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-kindai-pink/5 via-transparent to-kindai-orange/5" />
      
      <div className="container px-4 relative">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left: Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-kindai-pink/10 text-kindai-pink text-sm font-medium">
                <FileText className="w-4 h-4" />
                Free Download
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                The 5-Minute{" "}
                <span className="text-kindai-pink text-glow-pink">B</span>
                <span className="text-kindai-orange text-glow-orange">u</span>
                <span className="text-kindai-green text-glow-green">s</span>
                <span className="text-kindai-blue text-glow-blue">i</span>
                <span className="text-kindai-pink text-glow-pink">n</span>
                <span className="text-kindai-orange text-glow-orange">e</span>
                <span className="text-kindai-green text-glow-green">s</span>
                <span className="text-kindai-blue text-glow-blue">s</span>
                {" "}
                <span className="text-kindai-pink text-glow-pink">R</span>
                <span className="text-kindai-orange text-glow-orange">e</span>
                <span className="text-kindai-green text-glow-green">b</span>
                <span className="text-kindai-blue text-glow-blue">e</span>
                <span className="text-kindai-pink text-glow-pink">l</span>
                {" "}
                Checklist
              </h2>
              
              <p className="text-lg text-muted-foreground">
                Stop overthinking. Start executing. This checklist gives you the 
                exact steps to validate your idea and launch faster than you 
                thought possible.
              </p>

              <div className="space-y-3">
                {CHECKLIST_ITEMS.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-kindai-green/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-kindai-green" />
                    </div>
                    <span className="text-foreground">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="w-4 h-4 text-kindai-orange" />
                <span>Join 1,000+ rebels already using this</span>
              </div>
            </div>

            {/* Right: Form */}
            <div className="rounded-3xl border-2 border-kindai-pink/20 bg-card/80 backdrop-blur-sm p-8 shadow-2xl">
              {status === "success" ? (
                <div className="text-center space-y-4 py-6">
                  <div className="w-16 h-16 rounded-full bg-kindai-green/10 flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8 text-kindai-green" />
                  </div>
                  <h3 className="text-xl font-bold">Check your inbox! 📬</h3>
                  <p className="text-muted-foreground">
                    We've sent the checklist to your email. 
                    Check your spam folder if you don't see it.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setStatus("idle")}
                    className="mt-4"
                  >
                    Get another copy
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="text-center space-y-2 mb-6">
                    <h3 className="text-xl font-semibold">Get instant access</h3>
                    <p className="text-sm text-muted-foreground">
                      Enter your email and we'll send it right over
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Input
                      type="text"
                      placeholder="Your first name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="given-name"
                      required
                      className="h-12"
                    />
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      required
                      className="h-12"
                    />
                  </div>

                  {/* Honeypot */}
                  <div className="sr-only" aria-hidden="true">
                    <Input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 text-base font-semibold bg-gradient-to-r from-kindai-pink to-kindai-orange hover:opacity-90"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Send me the checklist
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    No spam. Unsubscribe anytime. We respect your inbox.
                  </p>

                  {status === "error" && (
                    <Alert variant="destructive">
                      <AlertTitle>Oops!</AlertTitle>
                      <AlertDescription>{errorMessage}</AlertDescription>
                    </Alert>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadMagnetSection;
