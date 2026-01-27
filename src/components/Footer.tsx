import { Link } from "react-router-dom";
import logo from "@/assets/kindai-logo.png";

const Footer = () => {
  return (
    <footer className="py-12 bg-background border-t border-border">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img src={logo} alt="Kindai" className="h-8" />
                <span className="font-semibold">Kindai</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-sm">
                {/* TODO: Replace with wedge-specific footer copy. */}
                A people-first AI assistant system for teams who want clarity,
                momentum, and measurable outcomes.
              </p>
              <div className="text-sm text-muted-foreground">
                Contact:{" "}
                <a
                  href="mailto:hello@kindai.ai"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  hello@kindai.ai
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-6 text-sm">
              <nav className="flex flex-col gap-2">
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
                <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </nav>
              <div className="text-muted-foreground">
                <p className="font-semibold text-foreground">Trust badges</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="rounded-full border border-border px-3 py-1 text-xs">
                    Secure by design
                  </span>
                  <span className="rounded-full border border-border px-3 py-1 text-xs">
                    Human-in-the-loop
                  </span>
                  <span className="rounded-full border border-border px-3 py-1 text-xs">
                    Privacy first
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 text-xs text-muted-foreground">
            © 2025 Kindai. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
