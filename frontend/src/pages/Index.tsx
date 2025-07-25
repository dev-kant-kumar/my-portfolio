import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import InteractiveTimeline from "@/components/InteractiveTimeline";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AIAssistant from "@/components/AIAssistant";

const Index = () => {
  return (
    <div className="min-h-screen bg-portfolio-dark text-white">
      <Navigation />
      <Hero />
      <About />

      {/* Phase 2 Features */}
      <InteractiveTimeline />
      <Projects />
      <Contact />
      <Footer />

      {/* AI Assistant */}
      <AIAssistant />
    </div>
  );
};

export default Index;
