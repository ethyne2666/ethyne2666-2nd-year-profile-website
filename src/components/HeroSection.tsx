import { Button } from "@/components/ui/button";
import { ChevronDown, Play, FileText, Code, Youtube } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-primary z-0"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Profile Image */}
          <div className="mb-8 fade-in">
            <div className="w-48 h-48 mx-auto mb-8 relative">
              <img 
                src="https://res.cloudinary.com/dyblpfzvz/image/upload/v1759581921/WhatsApp_Image_2025-05-05_at_23.42.22_9bee3e5b_jg8evd.jpg" 
                alt="Charan Kumar"
                className="w-full h-full object-cover rounded-full border-4 border-primary/50 shadow-2xl hover:scale-105 transition-all duration-300"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-electric opacity-20 animate-glow-pulse"></div>
            </div>
          </div>
          
          {/* Main Heading */}
          <div className="mb-8 fade-in">
            <h1 className="text-6xl md:text-8xl font-bold mb-4 text-electric">
              Charan Kumar
            </h1>
            <div className="h-1 w-32 bg-gradient-electric mx-auto mb-6 rounded-full animate-glow-pulse"></div>
            <h2 className="text-2xl md:text-3xl font-mono mb-6 neon-glow">
              ECE Student | Full-Stack Developer | AI enthusiast
            </h2>
          </div>

          {/* Bio */}
          <div className="mb-12 fade-in" style={{ animationDelay: '0.2s' }}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              I'm a passionate builder and explainer of technology — from full-stack web apps to embedded robotics, 
              AI , ML , DL , Blockchain enthusiast.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-6 mb-16 fade-in" style={{ animationDelay: '0.4s' }}>
            <Button 
              variant="electric" 
              size="lg" 
              onClick={() => window.open('https://drive.google.com/file/d/1VdyC4Tid6lu5h2BLuHunQwZ69ZeIsWq2/view?usp=sharing', '_blank')}
              className="group"
            >
              <FileText className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              View Resume
            </Button>
            
            <Button 
              variant="outline-electric" 
              size="lg"
              onClick={() => scrollToSection('projects')}
              className="group"
            >
              <Code className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Explore Projects
            </Button>
            
            <Button 
              variant="outline-electric" 
              size="lg"
              onClick={() => window.open('https://youtube.com/@charankumar_2666', '_blank')}
              className="group"
            >
              <Youtube className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Watch My Videos
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="fade-in" style={{ animationDelay: '0.6s' }}>
            <button 
              onClick={() => scrollToSection('about')}
              className="animate-bounce hover:scale-110 transition-transform group"
            >
              <ChevronDown className="w-8 h-8 text-primary group-hover:text-accent transition-colors" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;