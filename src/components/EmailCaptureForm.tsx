import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Mail, Sparkles } from "lucide-react";
import { z } from "zod";

const emailFormSchema = z.object({
  email: z.string().trim().email("Please enter a valid email").max(255, "Email too long"),
  name: z.string().trim().max(100, "Name too long").optional()
    .refine(val => !val || !/[<>"'&]/.test(val), {
      message: "Name contains invalid characters"
    })
});

interface EmailCaptureFormProps {
  variant?: "inline" | "dialog";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const EmailCaptureForm = ({ variant = "inline", open, onOpenChange }: EmailCaptureFormProps) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate input
    const validation = emailFormSchema.safeParse({ email, name: name || undefined });
    if (!validation.success) {
      toast({
        title: "Invalid input",
        description: validation.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Insert into email_subscribers table
      const { error: insertError } = await supabase
        .from("email_subscribers")
        .insert({
          email: validation.data.email,
          name: validation.data.name || null,
        });

      if (insertError) throw insertError;

      // Call edge function to send welcome email
      const { error: emailError } = await supabase.functions.invoke("send-welcome-email", {
        body: { email, name },
      });

      if (emailError) {
        console.error("Email sending error:", emailError);
        // Don't throw - subscription was successful even if email fails
      }

      toast({
        title: "Welcome aboard, rebel! 🎉",
        description: "Check your email for a special welcome message.",
      });

      setEmail("");
      setName("");
      
      if (variant === "dialog" && onOpenChange) {
        onOpenChange(false);
      }
    } catch (error: any) {
      console.error("Subscription error:", error);
      toast({
        title: "Oops!",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name (Optional)</Label>
        <Input
          id="name"
          type="text"
          placeholder="Your rebel name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-background/50 backdrop-blur"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          placeholder="rebel@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-background/50 backdrop-blur"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full gradient-rebel hover:opacity-90 transition-smooth shadow-glow"
      >
        {isSubmitting ? (
          "Joining..."
        ) : (
          <>
            <Mail className="mr-2 h-4 w-4" />
            Subscribe
          </>
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Get rebel tips and updates. No spam, unsubscribe anytime.
      </p>
    </form>
  );

  if (variant === "dialog") {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-kindai-pink" />
              Stay in the Loop
            </DialogTitle>
            <DialogDescription>
              Get exclusive rebel tips and updates delivered to your inbox.
            </DialogDescription>
          </DialogHeader>
          {formContent}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-lg border border-border bg-card shadow-elegant">
      <div className="space-y-2 mb-6">
        <h3 className="text-2xl font-bold flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-kindai-pink" />
          Stay Updated
        </h3>
        <p className="text-muted-foreground">
          Get rebel tips and exclusive content straight to your inbox.
        </p>
      </div>
      {formContent}
    </div>
  );
};

export default EmailCaptureForm;
