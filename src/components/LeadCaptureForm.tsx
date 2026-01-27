import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { getUtmParams, trackEvent } from "@/lib/analytics";

const leadFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name is too long")
    .refine((val) => !/[<>"'&]/.test(val), {
      message: "Name contains invalid characters",
    }),
  email: z.string().trim().email("Please enter a valid email").max(255),
  role: z
    .string()
    .trim()
    .min(1, "Role or company is required")
    .max(120, "Role or company is too long")
    .refine((val) => !/[<>"'&]/.test(val), {
      message: "Role contains invalid characters",
    }),
  website: z.string().optional(),
});

const LeadCaptureForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [website, setWebsite] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("idle");
    setErrorMessage("");

    const validation = leadFormSchema.safeParse({ name, email, role, website });
    if (!validation.success) {
      const message = validation.error.errors[0]?.message ?? "Invalid input";
      toast({
        title: "Invalid input",
        description: message,
        variant: "destructive",
      });
      return;
    }

    if (validation.data.website) {
      setStatus("success");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        name: validation.data.name,
        email: validation.data.email,
        role: validation.data.role,
        utm: getUtmParams(),
        page_url: window.location.href,
      };

      const { error } = await supabase.functions.invoke("lead-capture", {
        body: payload,
      });

      if (error) {
        throw error;
      }

      trackEvent("lead_submit", { source: "lead_form" });
      setStatus("success");
      setName("");
      setEmail("");
      setRole("");
      setWebsite("");
    } catch (error: any) {
      const message =
        error?.message || "Something went wrong. Please try again.";
      setStatus("error");
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="lead-name">Name</Label>
        <Input
          id="lead-name"
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          autoComplete="name"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lead-email">Email</Label>
        <Input
          id="lead-email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lead-role">Role or company</Label>
        <Input
          id="lead-role"
          type="text"
          placeholder="Founder, operator, or company"
          value={role}
          onChange={(event) => setRole(event.target.value)}
          required
        />
      </div>
      <div className="sr-only" aria-hidden="true">
        <Label htmlFor="lead-website">Website</Label>
        <Input
          id="lead-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full text-base bg-gradient-to-r from-kindai-pink to-kindai-orange hover:opacity-90"
      >
        {isSubmitting ? "Submitting..." : "Join the pilot"}
      </Button>

      {status === "success" && (
        <Alert role="status">
          <AlertTitle>Thanks for your interest!</AlertTitle>
          <AlertDescription>
            We received your details and will follow up with next steps.
          </AlertDescription>
        </Alert>
      )}
      {status === "error" && (
        <Alert role="alert" variant="destructive">
          <AlertTitle>Submission failed</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
    </form>
  );
};

export default LeadCaptureForm;
