import LeadCaptureForm from "@/components/LeadCaptureForm";

const LeadCaptureSection = () => {
  return (
    <section id="lead-form" className="py-16 bg-muted/20">
      <div className="container px-4">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-semibold">
              Start your Kindai pilot
            </h2>
            <p className="text-lg text-muted-foreground">
              Share a few details and we will map out the pilot timeline,
              onboarding steps, and a tailored outcome plan.
            </p>
            <div className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
              <strong className="text-foreground">What happens next:</strong>
              <ol className="mt-3 list-decimal space-y-2 pl-4">
                <li>We review your wedge and outcome goals.</li>
                <li>You get a short pilot proposal within 48 hours.</li>
                <li>We schedule onboarding and launch your first sprint.</li>
              </ol>
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
