import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Trophy, Code } from "lucide-react";

const ProjectsSection = () => {
  const projects = [
    {
      id: 1,
      title: "Enigma Robotics Competition",
      description: "4th place achievement with a maze-solving autonomous robot using embedded systems and advanced algorithms.",
      category: "Robotics",
      icon: <Trophy className="w-6 h-6" />,
      tags: ["Embedded Systems", "C++", "Sensors", "Algorithms"],
      highlights: ["4th Place Winner", "Autonomous Navigation", "Real-time Processing"],
      gradient: "from-amber-500 to-orange-500"
    },
    {
      id: 2,
      title: "Status Code 2 Hackathon – Daily Basis",
      description: "Developed a subscription-based Django web app with team members: Charan Kumar, Adarsh Kumar, Devnarayan Maharshi, Ankit.",
      category: "Hackathon Project",
      icon: <Code className="w-6 h-6" />,
      tags: ["Django", "Python", "AI Integration", "Web Development", "Cloud Concepts"],
      highlights: ["Team Project", "Subscription-based Web App", "AI & ML Concepts", "Scalable Backend Design"],
      link: "https://github.com/ethyne2666/hackhathon",
      gradient: "from-blue-500 to-cyan-500"
    }
  ];

  return (
    <section id="projects" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-electric">
            Projects & Highlights
          </h2>
          <div className="h-1 w-24 bg-gradient-electric mx-auto rounded-full animate-glow-pulse"></div>
          <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
            A showcase of my work spanning robotics and hackathon web development projects
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={project.id}
              className="card-glow hover:scale-105 transition-all duration-300 group overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="relative">
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${project.gradient}`}></div>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${project.gradient} text-white group-hover:scale-110 transition-transform`}>
                    {project.icon}
                  </div>
                  <div>
                    <Badge variant="secondary" className="mb-2">
                      {project.category}
                    </Badge>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                  </div>
                </div>
                
                <CardDescription className="text-base leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Highlights */}
                <div>
                  <h4 className="font-semibold mb-3 text-primary">Key Highlights</h4>
                  <ul className="space-y-2">
                    {project.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                        <span className="text-sm text-muted-foreground">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tags */}
                <div>
                  <h4 className="font-semibold mb-3 text-primary">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <Badge 
                        key={idx} 
                        variant="outline" 
                        className="text-xs hover:bg-primary/10 hover:border-primary transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  
                  {project.id === 2 && (
                    <Button 
                      variant="outline-electric" 
                      size="sm"
                      className="group"
                      onClick={() => window.open(project.link, '_blank')}
                    >
                      <Github className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                      Code
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            Want to see more of my work?
          </p>
          <Button 
            variant="electric" 
            size="lg"
            onClick={() => window.open('https://github.com/ethyne2666', '_blank')}
            className="group"
          >
            <Github className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Explore All Projects on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
