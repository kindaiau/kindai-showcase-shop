import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FloatingHelpButton from "@/components/FloatingHelpButton";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";

const faqData = [
  {
    category: "Getting Started",
    questions: [
      {
        q: "What is the 3-Agent Playbook?",
        a: "The 3-Agent Playbook is an AI-powered toolkit designed for rebels who want to build digital businesses without coding. It includes three specialized AI agents - Content, Strategy, and Tech - that actually DO the work for you instead of just teaching you how.",
      },
      {
        q: "How is this different from ChatGPT?",
        a: "Unlike general AI assistants, our agents are specialized and configured to deliver complete, ready-to-use outputs. The Content Agent writes full blog posts, the Strategy Agent builds complete business plans, and the Tech Agent creates working automation workflows. No prompt engineering required.",
      },
      {
        q: "Do I need technical skills to use this?",
        a: "Not at all! The toolkit is designed for non-technical creators, entrepreneurs, and rebels. You describe what you need in plain language, and the AI agents create complete, professional outputs you can use immediately.",
      },
      {
        q: "How do I get started?",
        a: "Simply purchase access through our Gumroad page, then sign in with your email. Once verified, you'll have full access to all three AI agents and the complete toolkit.",
      },
    ],
  },
  {
    category: "The Three Agents",
    questions: [
      {
        q: "What does the Content Agent do?",
        a: "The Content Agent creates complete, ready-to-use content including: full blog posts (1000-2000 words, SEO-optimized), social media calendars, email sequences, ad copy, video scripts, landing page copy, product descriptions, and newsletters. You get complete outputs, not templates.",
      },
      {
        q: "What does the Strategy Agent do?",
        a: "The Strategy Agent builds complete business strategies: business plans with projections, competitive analysis, pricing strategies with specific numbers, go-to-market plans, customer personas, revenue models, SWOT analysis, and growth roadmaps. Think of it as your fractional Chief Strategy Officer.",
      },
      {
        q: "What does the Tech Agent do?",
        a: "The Tech Agent creates technical solutions without code: automation workflows for Zapier/Make.com/n8n, API integration guides, SEO audits, schema markup, email automation sequences, CRM configurations, analytics tracking plans, and technical SOPs. Complete solutions, ready to implement.",
      },
      {
        q: "Can the agents work together on a project?",
        a: "Yes! For comprehensive projects, you can use all three agents. For example: Strategy Agent creates your business plan → Content Agent develops your marketing materials → Tech Agent sets up your automation systems. Use them in whatever order makes sense for your project.",
      },
    ],
  },
  {
    category: "Pricing & Access",
    questions: [
      {
        q: "How much does it cost?",
        a: "Check our Purchase page for current pricing. You get lifetime access to all three AI agents and the complete toolkit with a one-time purchase.",
      },
      {
        q: "Is there a free trial?",
        a: "While there's no free trial of the full toolkit, you can chat with our help assistant (the heart button in the corner) to ask questions and get a feel for how the AI works before purchasing.",
      },
      {
        q: "What's included in my purchase?",
        a: "Your purchase includes: access to all 3 specialized AI agents (Content, Strategy, Tech), the complete toolkit dashboard, guides and templates, and all future updates. One purchase, full access.",
      },
      {
        q: "How do I access after purchasing?",
        a: "After purchasing on Gumroad, you'll receive a license key. Sign in on our Auth page with the email you used for purchase, verify your license, and you'll have instant access to the full toolkit.",
      },
    ],
  },
  {
    category: "Technical Questions",
    questions: [
      {
        q: "How do I verify my purchase?",
        a: "Go to the Auth page, enter the email address you used for your Gumroad purchase, and follow the verification process. Your license will be automatically detected and your access enabled.",
      },
      {
        q: "Can I use this on multiple devices?",
        a: "Yes! Your account works across all your devices. Just sign in with the same email on any device to access the toolkit.",
      },
      {
        q: "Is my data secure?",
        a: "Yes. We use Supabase for secure authentication and data storage. Your conversations with the AI agents are private to your account, and we don't share your data with third parties.",
      },
      {
        q: "What if I have issues logging in?",
        a: "First, make sure you're using the same email you used for your Gumroad purchase. If you're still having issues, use the help chat or contact support through our website.",
      },
    ],
  },
  {
    category: "Using the Toolkit",
    questions: [
      {
        q: "How do I get the best results from the agents?",
        a: "Be specific about what you need. Instead of 'write a blog post', try 'write a 1500-word blog post about sustainable fashion for eco-conscious millennials, include SEO keywords'. The more context you provide, the better the output.",
      },
      {
        q: "Can I edit the outputs?",
        a: "Absolutely! The agents provide complete outputs that you can use as-is or customize further. Think of them as an expert first draft that you can refine to match your voice and needs.",
      },
      {
        q: "How many times can I use the agents?",
        a: "There's no strict limit on usage. Use the agents as much as you need to build your business. Fair usage policies apply to prevent abuse.",
      },
      {
        q: "Can I save my work?",
        a: "Yes, generated content can be saved and exported. The toolkit tracks your progress and allows you to organize your outputs by project.",
      },
    ],
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />

      {/* Hero */}
      <section className="py-16 md:py-24 text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-muted-foreground mb-6">
            <MessageCircle className="h-4 w-4" />
            <span className="text-sm font-medium">Frequently Asked Questions</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Everything You Need to Know
          </h1>
          <p className="text-lg text-muted-foreground">
            Got questions about the 3-Agent Playbook? Find answers here, or chat with our AI assistant for personalized help.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="pb-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-12">
            {faqData.map((section) => (
              <div key={section.category}>
                <h2 className="text-2xl font-bold mb-6 text-foreground">{section.category}</h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {section.questions.map((item, index) => (
                    <AccordionItem
                      key={index}
                      value={`${section.category}-${index}`}
                      className="border border-border rounded-lg px-4 bg-card"
                    >
                      <AccordionTrigger className="text-left hover:no-underline py-4">
                        <span className="font-medium text-foreground">{item.q}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center p-8 rounded-2xl bg-gradient-to-r from-kindai-pink/10 via-kindai-orange/10 to-kindai-green/10 border border-border">
            <h3 className="text-2xl font-bold mb-4 text-foreground">Still have questions?</h3>
            <p className="text-muted-foreground mb-6">
              Our AI assistant is always ready to help. Click the heart button to chat!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/purchase">
                <Button className="bg-gradient-to-r from-kindai-pink to-kindai-orange hover:opacity-90">
                  Get Access Now
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="outline">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingHelpButton />
    </div>
  );
};

export default FAQ;
