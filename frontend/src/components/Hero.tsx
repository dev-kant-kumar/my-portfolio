import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowDown,
  Download,
  Eye,
  MessageSquare,
  Code2,
  Zap,
  Globe,
  Cpu,
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import resume from "../assets/documents/resume.pdf";

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const roles = [
    "Frontend Enthusiast",
    "MERN Stack Developer",
    "UI/UX Focused Coder",
    "Full Stack Web Developer",
    "API Integration Specialist",
    "Clean Code Advocate",
  ];

  const techStack = [
    "React",
    "Node.js",
    "MongoDB",
    "Express",
    "TypeScript",
    "Next.js",
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black"
    >
      {/* Dynamic mouse-following gradient */}
      <div
        className="fixed inset-0 pointer-events-none z-5"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(14, 165, 233, 0.1), transparent 50%)`,
        }}
      />

      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(14, 165, 233, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14, 165, 233, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
            animation: "grid-move 20s linear infinite",
          }}
        />
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden z-10 top-10">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
              x: [0, 100, 0],
              y: [0, -50, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              delay: i * 2,
              ease: "linear",
            }}
            className={`absolute w-${12 + i * 4} h-${
              12 + i * 4
            } border border-portfolio-teal/20 rounded-full`}
            style={{
              left: `${10 + i * 15}%`,
              top: `${10 + i * 10}%`,
            }}
          />
        ))}
      </div>

      {/* Neural network lines */}
      <svg className="absolute inset-0 w-full h-full z-10 opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.line
            key={i}
            x1={Math.random() * 100 + "%"}
            y1={Math.random() * 100 + "%"}
            x2={Math.random() * 100 + "%"}
            y2={Math.random() * 100 + "%"}
            stroke="url(#gradient)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>

      <motion.div
        style={{ y }}
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Holographic profile */}
          <motion.div variants={itemVariants} className="mb-12 mt-32">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="relative w-40 h-40 mx-auto"
            >
              {/* Outer rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-portfolio-teal via-portfolio-blue to-portfolio-purple p-0.5"
              >
                <div className="w-full h-full rounded-full bg-black" />
              </motion.div>

              {/* Inner pulsing core */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    "0 0 20px rgba(14, 165, 233, 0.5)",
                    "0 0 40px rgba(14, 165, 233, 0.8)",
                    "0 0 20px rgba(14, 165, 233, 0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-4 rounded-full bg-gradient-to-r from-portfolio-teal/20 to-portfolio-purple/20 backdrop-blur-sm flex items-center justify-center border border-portfolio-teal/30"
              >
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="text-4xl font-bold gradient-text"
                >
                  <Code2 size={32} />
                </motion.div>
              </motion.div>

              {/* Orbiting particles */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 8 + i * 2,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.5,
                  }}
                  className="absolute inset-0"
                >
                  <div
                    className="absolute w-2 h-2 bg-portfolio-teal rounded-full"
                    style={{
                      top: "10%",
                      left: "50%",
                      transform: "translateX(-50%)",
                      boxShadow: "0 0 10px rgba(14, 165, 233, 0.8)",
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Glitch effect greeting */}
          <motion.div variants={itemVariants} className="mb-6">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.8, 1] }}
              transition={{ duration: 0.5, times: [0, 0.1, 0.2, 1] }}
              className="text-xl text-portfolio-teal mb-2 font-mono tracking-wider"
            >
              {"> INITIALIZING PORTFOLIO..."}
            </motion.p>
            <motion.p
              className="text-lg text-gray-400 font-mono"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Hello, World! I'm
            </motion.p>
          </motion.div>

          {/* Futuristic name display */}
          <motion.div variants={itemVariants} className="mb-8">
            <motion.h1
              className="text-6xl sm:text-7xl lg:text-8xl font-black mb-4 relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
            >
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-gradient-to-r from-portfolio-teal via-portfolio-blue to-portfolio-purple bg-clip-text text-transparent blur-sm">
                  Dev Kant Kumar
                </span>
                <span className="relative bg-gradient-to-r from-portfolio-teal via-portfolio-blue to-portfolio-purple bg-clip-text text-transparent">
                  Dev Kant Kumar
                </span>
              </span>
            </motion.h1>

            {/* Subtitle with scanning effect */}
            <motion.div className="text-2xl text-gray-300 font-light tracking-wide relative overflow-hidden">
              <motion.div
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-portfolio-teal/20 to-transparent"
              />
              Full Stack Developer & Digital Architect
            </motion.div>
          </motion.div>

          {/* Enhanced role animation */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="relative bg-black/50 backdrop-blur-sm border border-portfolio-teal/30 rounded-2xl p-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Cpu className="w-6 h-6 text-portfolio-teal mr-3" />
                </motion.div>
                <span className="text-sm text-gray-400 font-mono tracking-wider">
                  CURRENT_ROLE:
                </span>
              </div>
              <motion.p
                className="text-2xl sm:text-3xl font-bold text-center h-16 flex items-center justify-center"
                key={displayText}
              >
                <span className="bg-gradient-to-r from-portfolio-teal to-portfolio-purple bg-clip-text text-transparent">
                  {displayText}
                </span>
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="text-portfolio-teal ml-1 font-thin"
                >
                  |
                </motion.span>
              </motion.p>
            </div>
          </motion.div>

          {/* Tech stack floating badges */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech}
                  variants={floatingVariants}
                  animate="animate"
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="bg-gradient-to-r from-portfolio-teal/10 to-portfolio-purple/10 backdrop-blur-sm border border-portfolio-teal/30 rounded-full px-4 py-2 text-sm font-semibold text-portfolio-teal hover:shadow-lg hover:shadow-portfolio-teal/25 transition-all cursor-default"
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Enhanced description */}
          <motion.div variants={itemVariants} className="mb-16">
            <motion.p
              className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Crafting exceptional digital experiences through innovative code
              architecture and cutting-edge web technologies.
              <br />
              <span className="text-portfolio-teal font-medium">
                Transforming ideas into scalable, user-centric applications.
              </span>
            </motion.p>
          </motion.div>

          {/* Futuristic CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-20"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotateX: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-portfolio-teal to-portfolio-blue rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <Button
                size="lg"
                className="relative bg-gradient-to-r from-portfolio-teal to-portfolio-blue text-white px-10 py-4 text-lg font-semibold rounded-2xl border-0 hover:shadow-2xl hover:shadow-portfolio-teal/25 transition-all"
                onClick={scrollToProjects}
              >
                <Eye className="mr-3 h-5 w-5" />
                EXPLORE PORTFOLIO
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="ml-2"
                >
                  →
                </motion.div>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, rotateX: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-portfolio-purple to-pink-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <Button
                size="lg"
                className="relative bg-black border-2 border-portfolio-purple text-portfolio-purple hover:bg-portfolio-purple hover:text-white px-10 py-4 text-lg font-semibold rounded-2xl transition-all duration-300"
                onClick={scrollToContact}
              >
                <Zap className="mr-3 h-5 w-5" />
                HIRE ME NOW
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, rotateX: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              {/* Placeholder for resume link */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-600 to-gray-400 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>

              <a href={resume} download="Dev-Kant-Kumar-Resume.pdf">
                <Button
                  size="lg"
                  className="relative bg-black border-2 border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white px-10 py-4 text-lg font-semibold rounded-2xl transition-all duration-300"
                >
                  <Download className="mr-3 h-5 w-5" />
                  DOWNLOAD RESUME
                </Button>
              </a>
            </motion.div>
          </motion.div>

          {/* Animated scroll indicator */}
          <motion.div variants={itemVariants} className="relative">
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="cursor-pointer group"
              onClick={scrollToProjects}
            >
              <div className="relative">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-portfolio-teal/20 rounded-full blur-md"
                />
                <ArrowDown className="relative h-8 w-8 text-portfolio-teal group-hover:text-white transition-colors mx-auto" />
              </div>
              <p className="text-xs text-gray-500 mt-2 font-mono tracking-wider">
                SCROLL TO EXPLORE
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      <style jsx>{`
        @keyframes grid-move {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }

        .gradient-text {
          background: linear-gradient(135deg, #0ea5e9, #06b6d4, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </section>
  );
};

export default Hero;
