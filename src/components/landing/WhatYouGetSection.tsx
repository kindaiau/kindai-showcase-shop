const deliverables = [
  "A tailored workflow blueprint for your wedge user",
  "Weekly execution sprint plan with clear owners",
  "Automated follow-up scripts and templates",
  "Executive summary dashboard for stakeholders",
  "A 30-day feedback loop to refine the system",
];

const WhatYouGetSection = () => {
  return (
    <section id="what-you-get" className="py-16 bg-muted/20">
      <div className="container px-4">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-semibold">
            What you get in the pilot
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            {/* TODO: Replace with wedge-specific deliverables. */}
            A practical starter system you can test immediately with real
            customers.
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
