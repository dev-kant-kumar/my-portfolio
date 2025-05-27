
import React from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';
import GitHubStats from '@/components/GitHubStats';

const Index = () => {
  return (
    <div className="min-h-screen bg-portfolio-dark text-white">
      <Navigation />
      <Hero />
      <About />
      
      {/* GitHub Stats Section */}
      <section className="section-padding bg-portfolio-dark-secondary">
        <div className="max-w-7xl mx-auto">
          <GitHubStats />
        </div>
      </section>
      
      <Projects />
      <Contact />
      <Footer />
      
      {/* AI Assistant */}
      <AIAssistant />
    </div>
  );
};

export default Index;
