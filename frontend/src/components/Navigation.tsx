import React, { useState, useEffect, useRef, memo, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Download, ExternalLink, Sun, Moon, Code2, Cpu, Zap, Globe, Database, Rocket } from "lucide-react";
import resume from "../assets/documents/resume.pdf";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
}

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: Rocket, gradient: "from-blue-400 via-purple-500 to-pink-500" },
  { id: "about", label: "About", icon: Cpu, gradient: "from-emerald-400 via-teal-500 to-cyan-500" },
  { id: "projects", label: "Projects", icon: Code2, gradient: "from-orange-400 via-red-500 to-pink-500" },
  { id: "contact", label: "Contact", icon: Globe, gradient: "from-violet-400 via-purple-500 to-indigo-500" },
];

// Neural Network Particle System
const ParticleSystem = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }> = [];
    
    const connections: Array<{
      from: number;
      to: number;
      opacity: number;
    }> = [];
    
    const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];
    
    // Initialize particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update particles
      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        
        // Create connections
        particles.forEach((otherParticle, j) => {
          if (i >= j) return;
          
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const opacity = (1 - distance / 100) * 0.2;
            ctx.save();
            ctx.globalAlpha = opacity;
            ctx.strokeStyle = particle.color;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
            ctx.restore();
          }
        });
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-30"
      style={{ width: '100%', height: '100%' }}
    />
  );
});

ParticleSystem.displayName = "ParticleSystem";

// Holographic Button Component
const HolographicButton = memo(({ 
  children, 
  isActive, 
  onClick, 
  className = "",
  variant = "default"
}: {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "icon";
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <button
      className={`
        relative group overflow-hidden rounded-xl
        ${variant === "icon" ? "p-3" : "px-6 py-3"}
        ${isActive 
          ? "bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 border-2 border-blue-400/50" 
          : "bg-white/5 border border-white/10 hover:border-white/30"
        }
        backdrop-blur-md transition-all duration-500 
        hover:shadow-2xl hover:shadow-blue-500/25
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Holographic Overlay */}
      <div className={`
        absolute inset-0 opacity-0 group-hover:opacity-100 
        bg-gradient-to-r from-transparent via-white/10 to-transparent
        -translate-x-full group-hover:translate-x-full
        transition-all duration-1000 ease-out
      `} />
      
      {/* Neural Scan Lines */}
      {isHovered && (
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60"
              style={{
                top: `${20 + i * 30}%`,
                animation: `scanLine 2s ease-in-out infinite ${i * 0.3}s`,
              }}
            />
          ))}
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center space-x-2">
        {children}
      </div>
      
      {/* Quantum Glow Effect */}
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-xl" />
      )}
      
      <style jsx>{`
        @keyframes scanLine {
          0%, 100% { opacity: 0; transform: translateY(-10px); }
          50% { opacity: 1; transform: translateY(0px); }
        }
      `}</style>
    </button>
  );
});

HolographicButton.displayName = "HolographicButton";

// Quantum Avatar Component
const QuantumAvatar = memo(() => {
  const [rotation, setRotation] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="relative">
      {/* Orbital Rings */}
      <div className="absolute inset-0 w-16 h-16">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`absolute inset-0 rounded-full border border-blue-400/30`}
            style={{
              animation: `orbit ${3 + i}s linear infinite`,
              transform: `scale(${1 + i * 0.2})`,
            }}
          />
        ))}
      </div>
      
      {/* Avatar Core */}
      <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-0.5">
        <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
          <Cpu className="w-8 h-8 text-blue-400" style={{ transform: `rotate(${rotation}deg)` }} />
        </div>
      </div>
      
      {/* Quantum Particles */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              top: '50%',
              left: '50%',
              animation: `quantumOrbit ${2 + i * 0.5}s linear infinite`,
              transformOrigin: `${20 + i * 5}px 0`,
            }}
          />
        ))}
      </div>
      
      <style jsx>{`
        @keyframes orbit {
          from { transform: rotate(0deg) scale(var(--scale, 1)); }
          to { transform: rotate(360deg) scale(var(--scale, 1)); }
        }
        @keyframes quantumOrbit {
          from { transform: translate(-50%, -50%) rotate(0deg) translateX(25px) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg) translateX(25px) rotate(-360deg); }
        }
      `}</style>
    </div>
  );
});

QuantumAvatar.displayName = "QuantumAvatar";

// Main Navigation Component
const FuturisticNavigation = memo(() => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navRef = useRef<HTMLDivElement>(null);
  
  // Advanced scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Advanced section detection with intersection observer
      const sections = navItems.map(item => item.id);
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      
      if (current) setActiveSection(current);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Mouse tracking for holographic effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Dynamic navigation styles based on scroll
  const navStyles = useMemo(() => {
    const progress = Math.min(scrollY / 100, 1);
    return {
      backgroundColor: `rgba(15, 23, 42, ${0.1 + progress * 0.8})`,
      backdropFilter: `blur(${progress * 20}px) saturate(${1 + progress * 0.5})`,
      borderColor: `rgba(59, 130, 246, ${0.1 + progress * 0.3})`,
      transform: `scale(${1 - progress * 0.02})`,
      borderRadius: `${progress * 16}px`,
      margin: `0 ${progress * 16}px`,
    };
  }, [scrollY]);
  
  return (
    <>
      {/* SEO Optimized Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Dev Portfolio - World-Class Development Expertise",
            description:
              "Ultra-modern portfolio showcasing cutting-edge web development, AI integration, and futuristic user experiences",
            url: window.location.origin,
            author: {
              "@type": "Person",
              name: "Dev",
              jobTitle: "Senior Full Stack Developer & AI Specialist",
            },
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: `${window.location.origin}/search?q={search_term_string}`,
              },
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />

      {/* Main Navigation Container */}
      <div className="fixed top-0 left-0 right-0 z-50 p-4">
        <nav
          ref={navRef}
          className="relative max-w-7xl mx-auto transition-all duration-500 border"
          style={navStyles}
        >
          {/* Neural Network Background */}
          <ParticleSystem />

          {/* Quantum Grid Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 2px, transparent 2px),
                radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 2px, transparent 2px)
              `,
                backgroundSize: "50px 50px",
              }}
            />
          </div>

          {/* Main Navigation Content */}
          <div className="relative z-10 flex items-center justify-between h-20 px-6">
            {/* Quantum Brand Identity */}
            <div className="flex items-center space-x-4">
              <QuantumAvatar />
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Dev
                </h1>
                <p className="text-xs text-blue-300/80 font-mono">
                  {"<AI-Enhanced Developer />"}
                </p>
              </div>
            </div>

            {/* Desktop Navigation Menu */}
            <div className="hidden lg:flex items-center space-x-2">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;

                return (
                  <HolographicButton
                    key={item.id}
                    isActive={isActive}
                    onClick={() => {
                      document.getElementById(item.id)?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }}
                    className="group"
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        isActive
                          ? `bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`
                          : "text-white/70 group-hover:text-white"
                      }`}
                    />
                    <span
                      className={`font-medium ${
                        isActive
                          ? `bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`
                          : "text-white/70 group-hover:text-white"
                      }`}
                    >
                      {item.label}
                    </span>

                    {/* Neural Activity Indicator */}
                    {isActive && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                        <div className="flex space-x-1">
                          {[...Array(3)].map((_, i) => (
                            <div
                              key={i}
                              className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"
                              style={{ animationDelay: `${i * 0.2}s` }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </HolographicButton>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              {/* Resume Download - Quantum Enhanced */}
              <a href={resume} download="Dev-Kant-Kumar-Resume.pdf">
                <HolographicButton className="hidden sm:flex group">
                  <Download className="w-5 h-5 text-emerald-400 group-hover:animate-bounce" />
                  <span className="hidden md:inline text-emerald-400 font-medium">
                    Resume
                  </span>
                  <div className="absolute inset-0 bg-emerald-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                </HolographicButton>
              </a>

              {/* Mobile Menu Toggle */}
              <HolographicButton
                variant="icon"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <div className="relative">
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6 text-red-400" />
                  ) : (
                    <Menu className="w-6 h-6 text-blue-400" />
                  )}
                </div>
              </HolographicButton>
            </div>
          </div>

          {/* Quantum Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 mt-2 mx-4">
              <div className="bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-blue-500/30 overflow-hidden">
                <div className="p-4 space-y-2">
                  {navItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          document.getElementById(item.id)?.scrollIntoView({
                            behavior: "smooth",
                          });
                          setIsMobileMenuOpen(false);
                        }}
                        className={`
                          w-full p-4 rounded-xl flex items-center space-x-4 group
                          transition-all duration-300 backdrop-blur-sm
                          ${
                            isActive
                              ? "bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 border border-blue-400/50"
                              : "bg-white/5 hover:bg-white/10 border border-white/10"
                          }
                        `}
                        style={{
                          animationDelay: `${index * 0.1}s`,
                          animation: "slideInFromRight 0.5s ease-out forwards",
                        }}
                      >
                        <Icon
                          className={`w-6 h-6 ${
                            isActive
                              ? "text-blue-400"
                              : "text-white/60 group-hover:text-white"
                          }`}
                        />
                        <span
                          className={`font-medium ${
                            isActive
                              ? "text-white"
                              : "text-white/70 group-hover:text-white"
                          }`}
                        >
                          {item.label}
                        </span>

                        {/* Neural Pulse */}
                        {isActive && (
                          <div className="ml-auto flex space-x-1">
                            {[...Array(3)].map((_, i) => (
                              <div
                                key={i}
                                className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                                style={{ animationDelay: `${i * 0.3}s` }}
                              />
                            ))}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Mobile Resume Button */}
                <div className="p-4 border-t border-white/10">
                  <HolographicButton className="w-full justify-center">
                    <Download className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">
                      Download Resume
                    </span>
                  </HolographicButton>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>

      {/* Global Styles for Animations */}
      <style jsx global>{`
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes quantumPulse {
          0%,
          100% {
            box-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
          }
          50% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.8),
              0 0 30px rgba(139, 92, 246, 0.6);
          }
        }

        /* Smooth scrolling for the entire page */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.1);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #2563eb, #7c3aed);
        }
      `}</style>
    </>
  );
});

FuturisticNavigation.displayName = "FuturisticNavigation";

export default FuturisticNavigation;