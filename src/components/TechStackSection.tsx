import { Card } from "@/components/ui/card";

const TechStackSection = () => {
  const technologies = [
    {
      category: "Languages",
      items: [
        { name: "HTML5", icon: "🌐" },
        { name: "CSS3", icon: "🎨" },
        { name: "JavaScript", icon: "⚡" },
        { name: "Python", icon: "🐍" },
        { name: "C/C++", icon: "⚙️" },
      ]
    },
    {
      category: "Frameworks & Libraries",
      items: [
        { name: "React", icon: "⚛️" },
        { name: "Node.js", icon: "🟢" },
        { name: "Express", icon: "🚀" },
        { name: "MongoDB", icon: "🍃" },
        { name: "Django", icon: "🎸" },
      ]
    },
    {
      category: "Tools & Platforms",
      items: [
        { name: "GitHub", icon: "🐙" },
        { name: "Postman", icon: "📮" },
        { name: "ThunderClient", icon: "⚡" },
        { name: "Figma", icon: "🎨" },
        { name: "Vercel", icon: "▲" },
        { name: "Render", icon: "🌐" },
        { name: "ChatGPT", icon: "🤖" },
        { name: "Google colab", icon: "©️" },

      ]
    }
  ];

  return (
    <section id="tech-stack" className="py-20 px-6 bg-gradient-card">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-electric">
            Tech Stack & Tools
          </h2>
          <div className="h-1 w-24 bg-gradient-electric mx-auto rounded-full animate-glow-pulse"></div>
          <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
            The technologies and tools I use to bring ideas to life
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {technologies.map((category, categoryIndex) => (
            <Card 
              key={category.category} 
              className="card-glow p-8 hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${categoryIndex * 0.1}s` }}
            >
              <h3 className="text-2xl font-bold mb-8 text-center text-primary">
                {category.category}
              </h3>
              
              <div className="grid gap-4">
                {category.items.map((item, itemIndex) => (
                  <div 
                    key={item.name}
                    className="tech-icon group"
                    style={{ animationDelay: `${(categoryIndex * 0.1) + (itemIndex * 0.05)}s` }}
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl group-hover:scale-125 transition-transform">
                        {item.icon}
                      </span>
                      <span className="font-medium group-hover:text-primary transition-colors">
                        {item.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        
      </div>
    </section>
  );
};

export default TechStackSection;