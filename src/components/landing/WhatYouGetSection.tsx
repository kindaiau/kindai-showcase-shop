const deliverables = [
  "Content Creator Agent — blog posts, social media, emails, ads",
  "Business Strategist Agent — plans, pricing, positioning, market analysis",
  "Automation Engineer Agent — workflows, integrations, tech setup",
  "Ready-to-use templates and frameworks",
  "Step-by-step guides for each agent",
  "Lifetime access + all future updates",
];

const WhatYouGetSection = () => {
  return (
    <section id="what-you-get" className="py-16 bg-muted/20">
      <div className="container px-4">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-semibold">
            What's inside the Playbook
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Everything you need to build your digital business — no courses, no fluff.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {deliverables.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
            >
              <span className="mt-2 h-2 w-2 rounded-full bg-kindai-blue" />
              <span className="text-muted-foreground">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatYouGetSection;
