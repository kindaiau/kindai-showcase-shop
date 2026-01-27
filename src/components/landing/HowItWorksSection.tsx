const steps = [
  {
    title: "Align on the outcome",
    description:
      "Define the wedge user, the goal, and the timeline. Kindai translates it into a focused plan.",
  },
  {
    title: "Activate the assistants",
    description:
      "Kindai spins up a strategy agent, execution agent, and accountability agent tailored to your workflow.",
  },
  {
    title: "Ship weekly results",
    description:
      "Receive prioritized tasks, automated follow-ups, and a weekly recap to stay on track.",
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
            Three simple steps to turn your next initiative into a repeatable
            operating rhythm.
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
