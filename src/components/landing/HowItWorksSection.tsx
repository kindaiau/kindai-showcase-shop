const steps = [
  {
    title: "Describe what you need",
    description:
      "Tell the agent what you want — a blog post, business plan, or automation. Plain English, no prompts required.",
  },
  {
    title: "Let the agent work",
    description:
      "The specialized AI builds your complete deliverable. Content, strategy, or tech — done in minutes.",
  },
  {
    title: "Use it immediately",
    description:
      "Get ready-to-use outputs you can publish, implement, or customize. No editing marathon required.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-16 bg-muted/20">
      <div className="container px-4">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-semibold">
            How it works
          </h2>
          <p className="mt-3 text-muted-foreground text-lg">
            Three steps to go from idea to done. No learning curve, no complexity.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-2xl border border-border bg-card p-6 shadow-elegant"
            >
              <div className="text-sm font-semibold text-kindai-orange">
                Step {index + 1}
              </div>
              <h3 className="mt-3 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
