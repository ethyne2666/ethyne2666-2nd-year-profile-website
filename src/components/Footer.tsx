import { Button } from "@/components/ui/button";
import { ArrowUp, Heart, Code } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16 px-6 bg-gradient-to-t from-background via-muted/10 to-transparent">
      {/* Scroll to Top Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <Button
          onClick={scrollToTop}
          variant="electric"
          size="icon"
          className="rounded-full w-12 h-12 animate-glow-pulse hover:scale-110"
        >
          <ArrowUp className="w-6 h-6" />
        </Button>
      </div>

      <div className="container mx-auto max-w-6xl">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-electric">
              Charan Kumar
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Building the future through code, circuits, and content. 
              Passionate about making technology accessible to everyone.
            </p>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Code className="w-4 h-4" />
              <span>IIIT Kalyani • ECE Student</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-primary">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              {[
                { name: "About", href: "#about" },
                { name: "Tech Stack", href: "#tech-stack" },
                { name: "Projects", href: "#projects" },
                { name: "YouTube", href: "#youtube" },
                { name: "Contact", href: "#social" }
              ].map((link) => (
                <button
                  key={link.name}
                  onClick={() => {
                    const element = document.getElementById(link.href.slice(1));
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-muted-foreground hover:text-primary transition-colors text-left"
                >
                  {link.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-primary">Get In Touch</h4>
            <div className="space-y-3 text-muted-foreground">
              <div>
                <div className="font-medium">Email</div>
                <a 
                  href="mailto:ece24123@iiitkalyani.ac.in"
                  className="hover:text-primary transition-colors"
                >
                  ece24123@iiitkalyani.ac.in
                </a>
              </div>
              <div>
                <div className="font-medium">Phone</div>
                <a 
                  href="tel:+916302968849"
                  className="hover:text-primary transition-colors"
                >
                  +91 6302968849
                </a>
              </div>
              <div>
                <div className="font-medium">Location</div>
                <span>Kalyani, West Bengal, India</span>
              </div>
              <div>
                <div className="font-medium">Status</div>
                <span className="text-green-400">Available for opportunities</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-electric opacity-30 mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <span>© 2024 Charan Kumar. Made with</span>
            <Heart className="w-4 h-4 text-red-500 animate-pulse" />
            <span>and React</span>
          </div>

          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <span>Powered by creativity & caffeine</span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Online</span>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;