import { Link } from "react-router-dom";
import logo from "@/assets/kindai-logo.png";

const Footer = () => {
  return (
    <footer className="py-12 bg-background border-t border-border">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <img src={logo} alt="Kindai" className="h-8" />
              <nav className="flex items-center gap-4 text-sm">
                <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
                <Link to="/how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
                  How It Works
                </Link>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy
                </Link>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms
                </Link>
              </nav>
            </div>
            
            <div className="text-sm text-muted-foreground text-center md:text-right">
              <p className="font-semibold">
                Built by{" "}
                <span className="text-kindai-pink text-glow-pink">r</span>
                <span className="text-kindai-orange text-glow-orange">e</span>
                <span className="text-kindai-green text-glow-green">b</span>
                <span className="text-kindai-blue text-glow-blue">e</span>
                <span className="text-kindai-pink text-glow-pink">l</span>
                <span className="text-kindai-orange text-glow-orange">s</span>, for{" "}
                <span className="text-kindai-green text-glow-green">r</span>
                <span className="text-kindai-blue text-glow-blue">e</span>
                <span className="text-kindai-pink text-glow-pink">b</span>
                <span className="text-kindai-orange text-glow-orange">e</span>
                <span className="text-kindai-green text-glow-green">l</span>
                <span className="text-kindai-blue text-glow-blue">s</span>.
              </p>
              <p className="mt-1">© 2025 Kindai. Forged by bullies, freed by building.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
