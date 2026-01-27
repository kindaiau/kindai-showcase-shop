const quotes = [
  {
    name: "Solo Founder",
    role: "Week 1 with Playbook",
    quote:
      "\"I went from idea to published blog post in 12 minutes. I've never shipped content this fast.\"",
  },
  {
    name: "Online Coach",
    role: "Transitioning from 1:1",
    quote:
      "\"The Business Strategist gave me a complete pricing strategy. It would've taken me days to figure that out alone.\"",
  },
];

const highlights = [
  "5-15 min average task completion",
  "No prompt engineering required",
  "Works for non-technical rebels",
];

const SocialProofSection = () => {
  return (
    <section id="social-proof" className="py-16">
      <div className="container px-4">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Rebels are shipping faster
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Real results from real rebels using the 3-Agent Playbook.
          </p>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {quotes.map((item) => (
            <figure
              key={item.name}
              className="rounded-2xl border border-border bg-card p-6 shadow-elegant"
            >
              <blockquote className="text-lg text-muted-foreground">
                {item.quote}
              </blockquote>
              <figcaption className="mt-4 text-sm font-semibold">
                {item.name}
                <span className="block text-xs text-muted-foreground">
                  {item.role}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-4 text-sm text-muted-foreground">
          {highlights.map((highlight) => (
            <div
              key={highlight}
              className="flex items-center gap-2 rounded-full border border-border px-4 py-2 bg-card/70"
            >
              <span className="h-2 w-2 rounded-full bg-kindai-green" />
              {highlight}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
