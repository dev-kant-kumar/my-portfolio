import React, { useEffect, useRef, useState } from "react";
import {
  Github,
  Linkedin,
  Youtube,
  Mail,
  Download,
  ExternalLink,
  Code,
  Zap,
  Globe,
  Star,
} from "lucide-react";

const Footer = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState("");
  const footerRef = useRef(null);
  const currentYear = new Date().getFullYear();

  // Advanced mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const footer = footerRef.current;
    if (footer) {
      footer.addEventListener("mousemove", handleMouseMove);
      return () => footer.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/dev-kant-kumar",
      color: "from-purple-500 to-pink-500",
      description: "Open Source Projects",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/devkantkumar/",
      color: "from-blue-500 to-cyan-500",
      description: "Professional Network",
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: "https://www.youtube.com/@dev-kant-kumar",
      color: "from-red-500 to-orange-500",
      description: "Tech Tutorials",
    },
  ];

  const quickLinks = [
    { name: "About", href: "#about", icon: Code },
    { name: "Projects", href: "#projects", icon: Zap },
    { name: "Contact", href: "#contact", icon: Mail },
    { name: "Resume", href: "/resume.pdf", icon: Download, download: true },
  ];

  const techStack = [
    "React",
    "Node.js",
    "MongoDB",
    "Express",
    "TypeScript",
    "Next.js",
  ];

  return (
    <>
      <footer
        ref={footerRef}
        className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"
        role="contentinfo"
        aria-label="Site footer with contact information and social links"
      >
        {/* Dynamic Background Effects */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle 800px at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.15), transparent 50%)`,
          }}
        />

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[linear-gradient(rgba(147,51,234,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="group">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-2 group-hover:scale-105 transition-transform duration-300">
                  Dev Kant Kumar
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full group-hover:w-32 transition-all duration-500" />
              </div>

              <p className="text-slate-300 text-lg leading-relaxed max-w-md">
                Innovative <strong>Full Stack Web Developer</strong> crafting
                next-generation digital experiences with cutting-edge
                technologies. Specializing in{" "}
                <em>React, Node.js, and cloud architecture</em> to transform
                businesses through code.
              </p>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2 mt-6">
                {techStack.map((tech, index) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 rounded-full text-purple-200 hover:scale-110 transition-transform duration-300"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">5+</div>
                  <div className="text-xs text-slate-400">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">1+</div>
                  <div className="text-xs text-slate-400">Years Exp</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-400">100%</div>
                  <div className="text-xs text-slate-400">Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Quick Navigation */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-purple-400" />
                Navigate
              </h3>
              <nav
                className="space-y-3"
                role="navigation"
                aria-label="Footer navigation"
              >
                {quickLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      {...(link.download && {
                        download: "Dev-Kant-Kumar-Resume.pdf",
                      })}
                      className="group flex items-center gap-3 text-slate-400 hover:text-purple-400 transition-all duration-300 hover:translate-x-2"
                      onMouseEnter={() => setIsHovered(link.name)}
                      onMouseLeave={() => setIsHovered("")}
                    >
                      <div className="p-2 bg-slate-800/50 rounded-lg group-hover:bg-purple-500/20 border border-slate-700/50 group-hover:border-purple-500/50 transition-all duration-300">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-medium">{link.name}</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Social Connect */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Star className="w-5 h-5 text-purple-400" />
                Connect
              </h3>

              {/* Social Links */}
              <div className="space-y-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block p-4 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
                      onMouseEnter={() => setIsHovered(social.name)}
                      onMouseLeave={() => setIsHovered("")}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg bg-gradient-to-r ${social.color} group-hover:scale-110 transition-transform duration-300`}
                        >
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                            {social.name}
                          </div>
                          <div className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">
                            {social.description}
                          </div>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* Contact Email */}
              <div className="p-4 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-xl backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-medium text-purple-300">
                    Get in Touch
                  </span>
                </div>
                <a
                  href="mailto:dev.techdeveloper@gmail.com"
                  className="text-white hover:text-purple-300 transition-colors font-medium break-all"
                >
                  dev.techdeveloper@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-slate-700/50 mt-16 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <p className="text-slate-400 text-sm">
                  © {currentYear} <strong>Dev Kant Kumar</strong>. All rights
                  reserved.
                </p>
                <div className="hidden md:flex items-center gap-1 text-slate-500 text-xs">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Available for Projects
                </div>
              </div>

              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <span>Crafted with</span>
                <div className="flex items-center gap-1">
                  {["React", "TypeScript", "Tailwind"].map((tech, i) => (
                    <span key={tech} className="text-purple-400 font-medium">
                      {tech}
                      {i < 2 ? "," : ""}
                    </span>
                  ))}
                </div>
                <span>& ❤️</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ambient Glow Effect */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-60" />
      </footer>
    </>
  );
};

export default Footer;
