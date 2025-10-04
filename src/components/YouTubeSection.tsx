import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Youtube, Play, Clock, Eye } from "lucide-react";

const YouTubeSection = () => {
  const videos = [
    {
      id: "1",
      title: "Digital Electronics Fundamentals",
      description: "Understanding the basics of digital circuits and logic gates",
      thumbnail: "/lovable-uploads/f26b638d-f214-4c77-9b33-a79d25bf68c4.png",
      duration: "15:30",
      views: "2.5K",
      url: "https://youtube.com/@charankumar_2666"
    },
    {
      id: "2", 
      title: "Flip-Flops Explained Simply",
      description: "Breaking down sequential logic circuits and their applications",
      thumbnail: "/lovable-uploads/f26b638d-f214-4c77-9b33-a79d25bf68c4.png",
      duration: "12:45",
      views: "1.8K",
      url: "https://youtube.com/@charankumar_2666"
    },
    {
      id: "3",
      title: "K-Maps Made Easy",
      description: "Simplifying Boolean expressions using Karnaugh Maps",
      thumbnail: "/lovable-uploads/f26b638d-f214-4c77-9b33-a79d25bf68c4.png",
      duration: "18:20",
      views: "3.1K",
      url: "https://youtube.com/@charankumar_2666"
    }
  ];

  return (
    <section id="youtube" className="py-20 px-6 bg-gradient-card">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <Youtube className="w-12 h-12 text-red-500" />
            <h2 className="text-4xl md:text-5xl font-bold text-electric">
              Bits&Facts Channel
            </h2>
          </div>
          <div className="h-1 w-24 bg-gradient-electric mx-auto rounded-full animate-glow-pulse"></div>
          <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
            Educational content that makes complex engineering concepts accessible to everyone
          </p>
        </div>

        {/* Channel Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="card-glow text-center p-6 hover:scale-105 transition-all duration-300">
            <div className="text-3xl font-bold text-electric mb-2">50+</div>
            <div className="text-muted-foreground">Educational Videos</div>
          </Card>
          <Card className="card-glow text-center p-6 hover:scale-105 transition-all duration-300">
            <div className="text-3xl font-bold text-electric mb-2">10K+</div>
            <div className="text-muted-foreground">Total Views</div>
          </Card>
          <Card className="card-glow text-center p-6 hover:scale-105 transition-all duration-300">
            <div className="text-3xl font-bold text-electric mb-2">500+</div>
            <div className="text-muted-foreground">Subscribers</div>
          </Card>
        </div>

        {/* Featured Videos */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {videos.map((video, index) => (
            <Card 
              key={video.id}
              className="card-glow overflow-hidden hover:scale-105 transition-all duration-300 group cursor-pointer"
              onClick={() => window.open(video.url, '_blank')}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Play className="w-16 h-16 text-white" />
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-sm flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{video.duration}</span>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                  {video.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                  {video.description}
                </p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{video.views} views</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* YouTube CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4 text-primary">
            Join the Learning Community
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Subscribe to Bits&Facts for weekly content on Digital Electronics, 
            Programming, and Engineering concepts explained in simple terms.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              variant="electric" 
              size="lg"
              onClick={() => window.open('https://youtube.com/@charankumar_2666?si=98JIdHfgo1Eb0yBU', '_blank')}
              className="group"
            >
              <Youtube className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Subscribe to Channel
            </Button>
            
            <Button 
              variant="outline-electric" 
              size="lg"
              onClick={() => window.open('https://youtube.com/@charankumar_2666?si=98JIdHfgo1Eb0yBU', '_blank')}
              className="group"
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Watch Latest Video
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YouTubeSection;