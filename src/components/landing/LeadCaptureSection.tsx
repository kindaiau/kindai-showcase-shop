import LeadCaptureForm from "@/components/LeadCaptureForm";

const LeadCaptureSection = () => {
  return (
    <section id="lead-form" className="py-16 bg-muted/20">
      <div className="container px-4">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-semibold">
              Join the rebellion
            </h2>
            <p className="text-lg text-muted-foreground">
              Get weekly rebel tactics, AI tips, and early access to new agents.
              No spam, unsubscribe anytime.
            </p>
            <div className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
              <strong className="text-foreground">What you'll get:</strong>
              <ul className="mt-3 list-disc space-y-2 pl-4">
                <li>Weekly tips for building without burnout</li>
                <li>Early access to new Playbook features</li>
                <li>Exclusive rebel-only resources</li>
              </ul>
            </div>
          </div>
          <div className="rounded-3xl border border-border bg-card p-8 shadow-elegant">
            <LeadCaptureForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadCaptureSection;
