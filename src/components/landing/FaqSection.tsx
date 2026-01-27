import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is Kindai an AI tool or a service?",
    answer:
      "Both. You get an AI-driven workflow plus human onboarding to make sure the system fits your team.",
  },
  {
    question: "How long does a pilot take?",
    answer:
      "Most teams see measurable momentum within 2–4 weeks. The pilot is designed for fast feedback.",
  },
  {
    question: "Will this replace my existing tools?",
    answer:
      "Kindai connects to your current stack and reduces manual coordination work, rather than forcing a rip-and-replace.",
  },
  {
    question: "What do you need from us to get started?",
    answer:
      "A clear outcome, a single point of contact, and 60 minutes for onboarding. We handle the rest.",
  },
];

const FaqSection = () => {
  return (
    <section id="faq" className="py-16 bg-muted/20">
      <div className="container px-4">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Objections answered
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Common questions we hear during pilot planning.
          </p>
        </div>
        <div className="mt-8 max-w-3xl">
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
