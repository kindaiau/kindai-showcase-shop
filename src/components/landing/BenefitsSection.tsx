const benefits = [
  {
    title: "Done-for-you execution",
    description:
      "Stop watching tutorials. Our agents deliver complete, ready-to-use outputs — not instructions.",
  },
  {
    title: "Minutes, not hours",
    description:
      "What used to take 4–8 hours now takes 5–15 minutes. Describe what you need, get it done.",
  },
  {
    title: "ADHD-friendly design",
    description:
      "Built for rebels who struggle with traditional courses. No fluff, no overwhelm — just results.",
  },
  {
    title: "Lifetime access included",
    description:
      "One purchase, forever yours. All future updates and new agents included at no extra cost.",
  },
];

const BenefitsSection = () => {
  return (
    <section id="benefits" className="py-16">
      <div className="container px-4">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Why rebels choose the Playbook
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Finally, an AI toolkit that does the work instead of teaching you how.
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
