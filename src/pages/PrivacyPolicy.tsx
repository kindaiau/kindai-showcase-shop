import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
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
          <span className="text-kindai-pink text-glow-pink">P</span>
          <span className="text-kindai-orange text-glow-orange">r</span>
          <span className="text-kindai-green text-glow-green">i</span>
          <span className="text-kindai-blue text-glow-blue">v</span>
          <span className="text-kindai-pink text-glow-pink">a</span>
          <span className="text-kindai-orange text-glow-orange">c</span>
          <span className="text-kindai-green text-glow-green">y</span>{" "}
          <span className="text-kindai-blue text-glow-blue">P</span>
          <span className="text-kindai-pink text-glow-pink">o</span>
          <span className="text-kindai-orange text-glow-orange">l</span>
          <span className="text-kindai-green text-glow-green">i</span>
          <span className="text-kindai-blue text-glow-blue">c</span>
          <span className="text-kindai-pink text-glow-pink">y</span>
        </h1>
        
        <div className="prose prose-invert max-w-none space-y-8">
          <p className="text-muted-foreground">
            Last updated: January 2026
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">1. Introduction</h2>
            <p className="text-muted-foreground">
              Kindai ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. 
              This privacy policy explains how we collect, use, and safeguard your information when you use our 
              3-Agent Playbook platform and related services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">2. Information We Collect</h2>
            <p className="text-muted-foreground">We collect the following types of information:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Account Information:</strong> Email address and password when you create an account</li>
              <li><strong>Purchase Information:</strong> Payment details processed through Gumroad (we do not store payment card details)</li>
              <li><strong>Usage Data:</strong> How you interact with our AI agents and toolkit features</li>
              <li><strong>Communications:</strong> Messages you send through our help chat or support channels</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">3. How We Use Your Information</h2>
            <p className="text-muted-foreground">We use your information to:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Provide and improve our 3-Agent Playbook services</li>
              <li>Process your purchases and verify license access</li>
              <li>Send important updates about your account or our services</li>
              <li>Respond to your questions and support requests</li>
              <li>Analyze usage patterns to improve our AI agents</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">4. Data Sharing</h2>
            <p className="text-muted-foreground">
              We do not sell your personal data. We may share information with:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Gumroad:</strong> For payment processing</li>
              <li><strong>Supabase:</strong> Our database and authentication provider</li>
              <li><strong>AI Service Providers:</strong> To power our AI agents (conversations are not stored permanently)</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">5. Data Security</h2>
            <p className="text-muted-foreground">
              We implement industry-standard security measures including encryption, secure authentication, 
              and regular security audits to protect your data.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">6. Your Rights</h2>
            <p className="text-muted-foreground">You have the right to:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Export your data</li>
              <li>Opt out of marketing communications</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">7. Cookies</h2>
            <p className="text-muted-foreground">
              We use essential cookies for authentication and session management. 
              We do not use third-party tracking cookies.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">8. Contact Us</h2>
            <p className="text-muted-foreground">
              For privacy-related questions or to exercise your rights, contact us at:{" "}
              <a href="mailto:privacy@kindai.dev" className="text-primary hover:underline">
                privacy@kindai.dev
              </a>
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
