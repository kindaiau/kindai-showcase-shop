import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is the 3-Agent Playbook?",
    answer:
      "It's an AI-powered toolkit with three specialized agents — Content Creator, Business Strategist, and Automation Engineer — that actually DO the work for you instead of just teaching you how.",
  },
  {
    question: "How is this different from ChatGPT?",
    answer:
      "Unlike general AI assistants, our agents are pre-configured to deliver complete, ready-to-use outputs. No prompt engineering required — just describe what you need and get professional results.",
  },
  {
    question: "Do I need technical skills?",
    answer:
      "Nope. The Playbook is designed for non-technical rebels. If you can describe what you want, the agents handle the rest.",
  },
  {
    question: "What do I get after purchase?",
    answer:
      "Instant access to all three AI agents, templates, guides, and lifetime updates. One payment, no subscriptions.",
  },
  {
    question: "Is there a refund policy?",
    answer:
      "Yes — 30-day money-back guarantee. If the Playbook doesn't work for you, we'll refund your purchase, no questions asked.",
  },
];

const FaqSection = () => {
  return (
    <section id="faq" className="py-16 bg-muted/20">
      <div className="container px-4">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Questions answered
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Everything you need to know before getting the Playbook.
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
