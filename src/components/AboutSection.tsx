import { Card } from "@/components/ui/card";
import { GraduationCap, Code, Youtube, Trophy } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-electric">
            About Me
          </h2>
          <div className="h-1 w-24 bg-gradient-electric mx-auto rounded-full animate-glow-pulse"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* About Text */}
          <div className="space-y-6">
  <p className="text-lg text-muted-foreground leading-relaxed">
    I'm a passionate Electronics and Communication Engineering student at 
    <span className="text-primary font-semibold"> IIIT Kalyani</span>, 
    where I explore the fascinating intersection of hardware and software.
  </p>
  
  <p className="text-lg text-muted-foreground leading-relaxed">
    As a full-stack developer, I craft digital experiences using the 
    <span className="text-primary font-semibold"> MERN stack</span> and 
    <span className="text-primary font-semibold"> Django</span>, turning ideas 
    into interactive web applications.
  </p>

  <p className="text-lg text-muted-foreground leading-relaxed">
    Through my YouTube channel 
    <span className="text-primary font-semibold"> Bits&Facts</span>, 
    I break down complex topics in Digital Electronics, from Flip-Flops to K-Maps, 
    making technology accessible to everyone.
  </p>

  <p className="text-lg text-muted-foreground leading-relaxed">
    I recently participated in the <span className="text-primary font-semibold">Status Code 2 Hackathon</span> 
    at IIIT Kalyani, where my team developed <span className="text-primary font-semibold">Daily Basis</span>, 
    a subscription-based Django web app. During this experience, I learned key concepts in 
    <span className="text-primary font-semibold">Machine Learning algorithms</span> and explored 
    <span className="text-primary font-semibold">Deep Learning</span> topics including 
    <span className="text-primary font-semibold">ANN, CNN, RNN, and basics of Transformers</span>. 
    I also gained hands-on experience with <span className="text-primary font-semibold">Google Colab</span> 
    and <span className="text-primary font-semibold">Jupyter Notebook</span> for model development and experimentation.
  </p>

  <p className="text-lg text-muted-foreground leading-relaxed">
    When I'm not coding or creating content, you'll find me tinkering with 
    embedded systems and robotics, where I recently secured 
    <span className="text-primary font-semibold"> 4th place</span> in the 
    Enigma Robotics Competition with my maze-solving bot.
  </p>
</div>


          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-6">
            <Card className="card-glow p-6 text-center group hover:scale-105 transition-all duration-300">
              <GraduationCap className="w-12 h-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2">Student</h3>
              <p className="text-muted-foreground">IIIT Kalyani<br />ECE Branch</p>
            </Card>

            <Card className="card-glow p-6 text-center group hover:scale-105 transition-all duration-300">
              <Code className="w-12 h-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2">Developer</h3>
              <p className="text-muted-foreground">Full-Stack<br />MERN & Django<br/>AI,ML,DL<br/>Blockchain enthusiast</p>
            </Card>

            <Card className="card-glow p-6 text-center group hover:scale-105 transition-all duration-300">
              <Youtube className="w-12 h-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2">Creator</h3>
              <p className="text-muted-foreground">Bits&Facts<br />YouTube Channel</p>
            </Card>

            <Card className="card-glow p-6 text-center group hover:scale-105 transition-all duration-300">
              <Trophy className="w-12 h-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2">Achiever</h3>
              <p className="text-muted-foreground">4th Place<br />Enigma Robotics</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;