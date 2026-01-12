import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />
      
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold mb-8">
          <span className="text-kindai-pink text-glow-pink">T</span>
          <span className="text-kindai-orange text-glow-orange">e</span>
          <span className="text-kindai-green text-glow-green">r</span>
          <span className="text-kindai-blue text-glow-blue">m</span>
          <span className="text-kindai-pink text-glow-pink">s</span>{" "}
          <span className="text-kindai-orange text-glow-orange">o</span>
          <span className="text-kindai-green text-glow-green">f</span>{" "}
          <span className="text-kindai-blue text-glow-blue">S</span>
          <span className="text-kindai-pink text-glow-pink">e</span>
          <span className="text-kindai-orange text-glow-orange">r</span>
          <span className="text-kindai-green text-glow-green">v</span>
          <span className="text-kindai-blue text-glow-blue">i</span>
          <span className="text-kindai-pink text-glow-pink">c</span>
          <span className="text-kindai-orange text-glow-orange">e</span>
        </h1>
        
        <div className="prose prose-invert max-w-none space-y-8">
          <p className="text-muted-foreground">
            Last updated: January 2026
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">1. Agreement to Terms</h2>
            <p className="text-muted-foreground">
              By accessing or using the Kindai 3-Agent Playbook ("Service"), you agree to be bound by these 
              Terms of Service. If you disagree with any part of these terms, you may not access the Service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">2. Description of Service</h2>
            <p className="text-muted-foreground">
              Kindai provides a digital toolkit featuring AI-powered agents for content creation, business strategy, 
              and technical assistance, along with guides, templates, and educational resources designed for 
              entrepreneurs and digital creators.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">3. Account Registration</h2>
            <p className="text-muted-foreground">To access the Service, you must:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Create an account with accurate information</li>
              <li>Maintain the security of your password</li>
              <li>Be at least 18 years old</li>
              <li>Accept responsibility for all activities under your account</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">4. Purchase and License</h2>
            <p className="text-muted-foreground">
              Upon purchase through Gumroad, you receive a personal, non-transferable license to access the 
              3-Agent Playbook toolkit. This license grants you:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Lifetime access to purchased content</li>
              <li>Access to future updates at no additional cost</li>
              <li>Personal use of AI agents and generated content</li>
              <li>Commercial use of content you create using our tools</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              You may NOT resell, redistribute, or share your license key with others.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">5. Refund Policy</h2>
            <p className="text-muted-foreground">
              We offer a 30-day money-back guarantee. If you're not satisfied with the Service, 
              contact us within 30 days of purchase for a full refund. Refunds are processed through Gumroad.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">6. Acceptable Use</h2>
            <p className="text-muted-foreground">You agree NOT to:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Use the Service for any illegal purpose</li>
              <li>Generate content that is harmful, abusive, or violates others' rights</li>
              <li>Attempt to reverse-engineer or copy our AI systems</li>
              <li>Share account access with unauthorized users</li>
              <li>Use automated systems to abuse the AI agents</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">7. AI-Generated Content</h2>
            <p className="text-muted-foreground">
              Content generated by our AI agents is provided for your use. You retain ownership of content 
              you create using our tools. However, similar content may be generated for other users. 
              AI outputs should be reviewed before use in critical business applications.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">8. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              The Service is provided "as is" without warranties. We are not liable for any indirect, 
              incidental, or consequential damages arising from your use of the Service. Our total 
              liability is limited to the amount you paid for the Service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">9. Modifications</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these terms at any time. Continued use of the Service 
              after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">10. Contact</h2>
            <p className="text-muted-foreground">
              For questions about these terms, contact us at:{" "}
              <a href="mailto:legal@kindai.dev" className="text-primary hover:underline">
                legal@kindai.dev
              </a>
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
