import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Download, ExternalLink } from "lucide-react";
import resume from "../assets/documents/resume.pdf";
import DevImg from "../../public/dev.jpg";

interface NavigationProps {
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ className = "" }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navRef = useRef<HTMLElement>(null);

  // Enhanced scroll and section detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);

      // More precise section detection
      const sections = ["home", "about", "projects", "contact"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mouse tracking for subtle interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const nav = navRef.current;
    if (nav) {
      nav.addEventListener("mousemove", handleMouseMove);
      return () => nav.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  // Smooth scroll with easing
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed nav height
      const elementPosition = element.offsetTop - offset;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });

      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: "home", label: "Home", icon: "◊" },
    { id: "about", label: "About", icon: "◎" },
    { id: "projects", label: "Projects", icon: "◈" },
    { id: "contact", label: "Contact", icon: "◉" },
  ];

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#0f172a]/80 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        } ${className}`}
        style={{
          background: !isScrolled
            ? `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(195 100% 50% / 0.06), transparent 40%)`
            : undefined,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Enhanced Logo */}
            <div
              className="logo-glow cursor-pointer group"
              onClick={() => scrollToSection("home")}
            >
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <span className="text-background font-bold text-sm">
                    <img
                      src={DevImg}
                      alt="dev kant kumar image"
                      className="rounded-lg"
                    />
                  </span>
                </div>
                <span className="gradient-text font-bold text-xl tracking-wide">
                  Dev
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`group relative px-3 xl:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20 ${
                    activeSection === item.id
                      ? "text-primary bg-primary/10 shadow-md shadow-primary/30"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  {/* Hover background effect */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <span className="relative flex items-center space-x-2 ">
                    <span className="text-xs xl:text-sm transform group-hover:rotate-12 transition-transform duration-300">
                      {item.icon}
                    </span>
                    <span className="hidden xl:inline group-hover:tracking-wide transition-all duration-300">
                      {item.label}
                    </span>
                  </span>

                  {/* Active indicator */}
                  {activeSection === item.id && (
                    <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-primary rounded-full transform -translate-x-1/2 animate-cyber-pulse" />
                  )}

                  {/* Hover indicator */}
                  <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary/60 rounded-full transform -translate-x-1/2 group-hover:w-3/4 transition-all duration-300" />
                </button>
              ))}

              <div className="ml-4 flex items-center space-x-3">
                {/* Resume Button */}
                <a href={resume} download="Dev-Kant-Kumar-Resume.pdf">
                  <Button
                    variant="outline"
                    size="sm"
                    className="cyber-button group"
                  >
                    <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                    Resume
                  </Button>
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative p-2 text-foreground hover:text-primary transition-colors"
              >
                <div className="relative w-6 h-6">
                  <Menu
                    className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                      isMobileMenuOpen
                        ? "rotate-180 opacity-0"
                        : "rotate-0 opacity-100"
                    }`}
                  />
                  <X
                    className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                      isMobileMenuOpen
                        ? "rotate-0 opacity-100"
                        : "rotate-180 opacity-0"
                    }`}
                  />
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 mobile-menu border-t">
            <div className="px-6 py-8 space-y-6">
              {/* Mobile Navigation Links */}
              <div className="space-y-3">
                {navItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`group w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 flex items-center space-x-3 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/10 ${
                      activeSection === item.id
                        ? "text-primary bg-primary/10 shadow-md shadow-primary/20"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                    }`}
                    style={{
                      animationDelay: `${index * 50}ms`,
                    }}
                  >
                    {/* Hover background effect */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <span className="relative text-lg transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                      {item.icon}
                    </span>
                    <span className="relative group-hover:tracking-wide transition-all duration-300">
                      {item.label}
                    </span>
                    {activeSection === item.id && (
                      <div className="relative ml-auto w-2 h-2 bg-primary rounded-full animate-cyber-pulse" />
                    )}

                    {/* Hover indicator */}
                    <div className="absolute left-0 top-1/2 w-0 h-6 bg-primary/30 rounded-r-full transform -translate-y-1/2 group-hover:w-1 transition-all duration-300" />
                  </button>
                ))}
              </div>

              {/* Mobile Resume Button */}
              <div className="pt-4 border-t border-glass">
                <a
                  href={resume}
                  download="Dev-Kant-Kumar-Resume.pdf"
                  className="block"
                >
                  <Button
                    variant="outline"
                    className="w-full cyber-button group justify-center"
                  >
                    <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                    Download Resume
                    <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile menu backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navigation;
