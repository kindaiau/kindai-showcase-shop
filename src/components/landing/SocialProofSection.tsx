const quotes = [
  {
    name: "Pilot Partner",
    role: "Founder, Placeholder Co.",
    quote:
      "“Kindai made our weekly ops review feel lightweight for the first time. We shipped more in two weeks than the previous month.”",
  },
  {
    name: "Design Lead",
    role: "Creative Studio",
    quote:
      "“The assistants keep us on track without micromanaging. It feels like a calm operations layer.”",
  },
];

const logos = ["Placeholder Co.", "Northwind", "Studio A", "Local Services"];

const SocialProofSection = () => {
  return (
    <section id="social-proof" className="py-16">
      <div className="container px-4">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Early teams are seeing momentum
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            {/* TODO: Replace with real logos and testimonials. */}
            Placeholder proof points until pilot partners are confirmed.
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
          {logos.map((logo) => (
            <div
              key={logo}
              className="rounded-full border border-border px-4 py-2 bg-card/70"
            >
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
