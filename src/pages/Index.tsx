import { useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TechStackSection from "@/components/TechStackSection";
import ProjectsSection from "@/components/ProjectsSection";
import YouTubeSection from "@/components/YouTubeSection";
import SocialLinks from "@/components/SocialLinks";
import Footer from "@/components/Footer";
import NullLogic from "@/components/NullLogic";
import Navbar from "@/components/Navbar";

const Index = () => {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);
    
    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el) => observer.observe(el));
    
    // Cleanup
    return () => {
      fadeElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-primary pt-16">
      <Navbar /> 
      <HeroSection />
      <AboutSection />
      <TechStackSection />
      <ProjectsSection />
      <NullLogic />
      <YouTubeSection />
      <SocialLinks />
      <Footer />
    </div>
  );
};

export default Index;
