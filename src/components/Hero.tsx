
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = [
    "Frontend Enthusiast",
    "MERN Stack Pro", 
    "UI/UX Focused Coder",
    "Full Stack Developer"
  ];

  useEffect(() => {
    const currentRole = roles[currentIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, currentIndex, isDeleting, roles]);

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-portfolio-dark via-portfolio-dark-secondary to-portfolio-dark-card"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-portfolio-teal/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-portfolio-purple/10 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-portfolio-blue/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          {/* Profile Image Placeholder */}
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-portfolio-teal to-portfolio-purple p-1">
              <div className="w-full h-full rounded-full bg-portfolio-dark-card flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-portfolio-teal/20 to-portfolio-purple/20 flex items-center justify-center">
                  <span className="text-2xl font-bold gradient-text">DK</span>
                </div>
              </div>
            </div>
          </div>

          {/* Greeting */}
          <p className="text-lg text-gray-400 mb-4 animate-slide-in-left">
            Hi, I'm
          </p>

          {/* Name */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="gradient-text">Dev Kant Kumar</span>
          </h1>

          {/* Animated Role */}
          <div className="mb-8">
            <p className="text-xl sm:text-2xl text-gray-300 mb-2">
              A passionate Full Stack Web Developer
            </p>
            <p className="text-lg text-gray-400">
              <span className="text-portfolio-teal">{displayText}</span>
              <span className="animate-pulse">|</span>
            </p>
          </div>

          {/* Description */}
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Building modern web experiences with cutting-edge technologies. 
            Specializing in MERN stack development with a focus on user experience and clean code.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-portfolio-teal to-portfolio-blue hover:from-portfolio-teal/80 hover:to-portfolio-blue/80 text-white px-8 py-3 text-lg hover-glow"
              onClick={scrollToProjects}
            >
              View Portfolio
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-portfolio-purple text-portfolio-purple hover:bg-portfolio-purple hover:text-white px-8 py-3 text-lg"
              onClick={scrollToContact}
            >
              Hire Me
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white px-8 py-3 text-lg"
            >
              Download Resume
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="animate-bounce">
            <ArrowDown className="mx-auto h-6 w-6 text-gray-400" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
