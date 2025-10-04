import { Linkedin, Github, Youtube, Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const SocialLinks = () => {
  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-6 h-6" />,
      url: "https://www.linkedin.com/in/charan-kumar-ab5568311",
      color: "hover:text-blue-500",
      description: "Professional Network"
    },
    {
      name: "GitHub", 
      icon: <Github className="w-6 h-6" />,
      url: "https://github.com/ethyne2666",
      color: "hover:text-gray-400",
      description: "Code Repository"
    },
    {
      name: "YouTube",
      icon: <Youtube className="w-6 h-6" />,
      url: "https://youtube.com/@charankumar_2666",
      color: "hover:text-red-500",
      description: "Educational Content"
    },
    {
      name: "Email",
      icon: <Mail className="w-6 h-6" />,
      url: "mailto:ece24123@iiitkalyani.ac.in",
      color: "hover:text-green-500",
      description: "Direct Contact"
    }
  ];

  return (
    <section id="social" className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-electric">
            Let's Connect
          </h2>
          <div className="h-1 w-24 bg-gradient-electric mx-auto rounded-full animate-glow-pulse"></div>
          <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
            Ready to collaborate? Let's build something amazing together
          </p>
        </div>

        {/* Social Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {socialLinks.map((link, index) => (
            <div 
              key={link.name}
              className="group cursor-pointer"
              onClick={() => window.open(link.url, '_blank')}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="social-link mb-4 mx-auto">
                {link.icon}
              </div>
              <div className="text-center">
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                  {link.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {link.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center space-y-8">
          <div className="bg-gradient-card p-8 rounded-2xl border border-border/50 hover:border-primary/50 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-4 text-primary">
              Open to Opportunities
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              I'm always excited to discuss new projects, innovative ideas, 
              or opportunities to be part of your visions. Let's connect!
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                variant="electric" 
                size="lg"
                onClick={() => window.open('mailto:ece24123@iiitkalyani.ac.in', '_blank')}
                className="group"
              >
                <Mail className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Send Email
              </Button>
              
              <Button 
                variant="outline-electric" 
                size="lg"
                onClick={() => window.open('https://www.linkedin.com/in/charan-kumar-ab5568311', '_blank')}
                className="group"
              >
                <ExternalLink className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                LinkedIn Message
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-electric mb-2">24/7</div>
              <div className="text-muted-foreground">Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-electric mb-2">100%</div>
              <div className="text-muted-foreground">Commitment</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-electric mb-2">∞</div>
              <div className="text-muted-foreground">Learning Spirit</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialLinks;