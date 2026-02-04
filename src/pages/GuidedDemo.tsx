import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import SEO from "@/components/SEO";
import GuidedDemo from "@/components/toolkit/GuidedDemo";

const GuidedDemoPage = () => {
  return (
    <>
      <SEO
        title="Watch AI Agents Demo | Rebel Toolkit"
        description="Watch our 3 AI agents create a complete business plan, social media calendar, and automation workflow in real-time."
        image="/og-demo.png"
      />
      
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="container flex h-16 items-center justify-between px-4">
            <Button asChild variant="ghost" size="sm">
              <Link to="/demo">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Demo
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/purchase">Get Access</Link>
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container px-4 py-8 md:py-12 max-w-4xl mx-auto">
          <GuidedDemo />
        </main>
      </div>
    </>
  );
};

export default GuidedDemoPage;
