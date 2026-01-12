import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Youtube, Play, Clock, Eye } from "lucide-react";

const YouTubeSection = () => {
  const videos = [
    {
      id: "1",
      title: "Core Java Fundamentals",
      description: "Understanding the basics of core java programming concepts",
      thumbnail: "/uploads/nullLogic logo.jpeg",
      duration: "15:30",
      views: "2.5K",
      url: "https://youtube.com/@charankumar-c1c?si=C4wegALvV1Fd-e_x"
    },
    {
      id: "2", 
      title: "Docker Explained Simply",
      description: "Breaking down in detail explore more in the video",
      thumbnail: "/uploads/nullLogic logo.jpeg",
      duration: "12:45",
      views: "1.8K",
      url: "https://youtube.com/@charankumar-c1c?si=C4wegALvV1Fd-e_x"
    },
    {
      id: "3",
      title: "Git and Git hub Made Easy",
      description: "Git and git hub explained in detail",
      thumbnail: "/uploads/nullLogic logo.jpeg",
      duration: "18:20",
      views: "3.1K",
      url: "https://youtube.com/@charankumar-c1c?si=C4wegALvV1Fd-e_x"
    }
  ];

  return (
    <section id="nulllogic" className="py-20 px-6 bg-gradient-card">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <Youtube className="w-12 h-12 text-red-500" />
            <h2 className="text-4xl md:text-5xl font-bold text-electric">
              NullLogic Channel
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
            <div className="text-3xl font-bold text-electric mb-2">1K+</div>
            <div className="text-muted-foreground">Total Views</div>
          </Card>
          <Card className="card-glow text-center p-6 hover:scale-105 transition-all duration-300">
            <div className="text-3xl font-bold text-electric mb-2">50+</div>
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
            Subscribe to NullLogic for weekly content on Programming,tech, Software Development, and Computer Science concepts explained in simple terms.
            Programming, and Engineering concepts explained in simple terms.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              variant="electric" 
              size="lg"
              onClick={() => window.open('https://youtube.com/@charankumar-c1c?si=C4wegALvV1Fd-e_x', '_blank')}
              className="group"
            >
              <Youtube className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Subscribe to Channel
            </Button>
            
            <Button 
              variant="outline-electric" 
              size="lg"
              onClick={() => window.open('https://youtube.com/@charankumar-c1c?si=C4wegALvV1Fd-e_x', '_blank')}
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