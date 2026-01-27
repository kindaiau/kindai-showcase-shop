const benefits = [
  {
    title: "Clear weekly priorities",
    description:
      "Know exactly what to focus on each week without drowning in backlog noise.",
  },
  {
    title: "Automated follow-through",
    description:
      "Let Kindai draft updates, nudges, and check-ins so momentum never stalls.",
  },
  {
    title: "Human-friendly workflows",
    description:
      "Designed for focus, calm, and clarity — no over-automation or chaos.",
  },
  {
    title: "Outcome-driven reporting",
    description:
      "Measure results against the outcome that matters, not vanity metrics.",
  },
];

const BenefitsSection = () => {
  return (
    <section id="benefits" className="py-16">
      <div className="container px-4">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Benefits that compound
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            {/* TODO: Replace with wedge-specific benefits. */}
            The Kindai pilot keeps teams moving with practical, repeatable
            wins.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-2xl border border-border bg-card p-6 shadow-elegant"
            >
              <h3 className="text-xl font-semibold">{benefit.title}</h3>
              <p className="mt-2 text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
