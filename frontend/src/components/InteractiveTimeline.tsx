import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  MapPin,
  Trophy,
  Code,
  Briefcase,
  GraduationCap,
  Rocket,
  ChevronRight,
  ExternalLink,
  Github,
  Globe,
} from "lucide-react";
import { cva } from "class-variance-authority";
import { useWindowSize } from "@/hooks/useWindowSize"; // Create this hook
import { cn } from "@/lib/utils"; // Create this utility

const InteractiveTimeline = () => {
  const [selectedEvent, setSelectedEvent] = useState<number>(0);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const timelineRef = useRef(null);
  const isInView = useInView(timelineRef, { once: true, margin: "-100px" });

  // Smooth progress tracking
  const scrollProgress = useMotionValue(0);
  const smoothProgress = useSpring(scrollProgress, {
    damping: 50,
    stiffness: 400,
  });

  useEffect(() => {
    const updateProgress = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const progress = Math.max(
        0,
        Math.min(
          1,
          (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
        )
      );
      scrollProgress.set(progress);
    };

    window.addEventListener("scroll", updateProgress);
    updateProgress();
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  const timelineEvents = [
    {
      year: "2025",
      period: "Present",
      title: "Founder & Full Stack Developer",
      company: "HostelEase",
      companyType: "SaaS Startup",
      location: "Jharkhand, India",
      workType: "Remote",
      type: "startup",
      status: "active",
      website: "https://hostelease.com",
      github: "#",
      description:
        "Founded HostelEase, a comprehensive SaaS-based hostel management platform revolutionizing the accommodation sector in India. Leading a cross-functional team of 5 developers to build scalable, user-centric solutions.",
      impact: "Digitizing accommodation sector for 10M+ students across India",
      achievements: [
        "Architected and developed full-stack SaaS platform from concept to production deployment",
        "Built responsive landing panel with advanced room listings, detailed hostel profiles, and seamless booking system",
        "Implemented secure user authentication, payment integration, and real-time availability tracking",
        "Led cross-functional team of 5, establishing development workflows and code standards",
        "Developed reusable component library and integrated Redux Toolkit for efficient state management",
        "Optimized application performance achieving 95+ Lighthouse scores across all metrics",
      ],
      technologies: [
        { name: "React.js", category: "Frontend", level: "Expert" },
        { name: "Tailwind CSS", category: "Styling", level: "Expert" },
        { name: "Node.js", category: "Backend", level: "Advanced" },
        { name: "Express.js", category: "Backend", level: "Advanced" },
        { name: "MongoDB", category: "Database", level: "Advanced" },
        {
          name: "Redux Toolkit",
          category: "State Management",
          level: "Advanced",
        },
        { name: "JWT Auth", category: "Security", level: "Intermediate" },
        { name: "Vercel", category: "Deployment", level: "Intermediate" },
      ],
      keywords: [
        "SaaS Development",
        "Full Stack Developer",
        "React Expert",
        "MongoDB Developer",
        "Startup Founder",
      ],
    },
    {
      year: "2025",
      period: "Q1 2025",
      title: "Web Developer Intern",
      company: "Techies Gateway",
      companyType: "Digital Agency",
      location: "Hazaribag, Jharkhand, India",
      workType: "Hybrid",
      type: "internship",
      status: "completed",
      description:
        "Contributed to diverse client projects spanning travel, fitness, finance, and social media management sectors. Focused on delivering pixel-perfect UI implementations and feature enhancements.",
      impact: "Delivered 15+ client projects with 100% on-time completion rate",
      achievements: [
        "Successfully contributed to 5+ active repositories including tanvi-cabs, Vijay-Fitness, and best-cabs",
        "Maintained 100% task completion rate while ensuring code quality and UI consistency standards",
        "Collaborated effectively in hybrid environment with senior developers and cross-functional teams",
        "Gained expertise in client-facing project delivery across multiple industry verticals",
        "Implemented responsive designs and optimized user experiences for diverse user bases",
      ],
      technologies: [
        { name: "HTML5", category: "Frontend", level: "Expert" },
        { name: "CSS3", category: "Styling", level: "Expert" },
        { name: "JavaScript", category: "Frontend", level: "Advanced" },
        { name: "PHP", category: "Backend", level: "Intermediate" },
        { name: "Git", category: "Version Control", level: "Advanced" },
        { name: "GitHub", category: "Collaboration", level: "Advanced" },
      ],
      keywords: [
        "Web Development",
        "Frontend Developer",
        "JavaScript Developer",
        "PHP Developer",
        "UI/UX Implementation",
      ],
    },
    {
      year: "2024",
      period: "2024",
      title: "Full-stack Developer Intern",
      company: "Techies Gateway",
      companyType: "Digital Agency",
      location: "Hazaribag, Jharkhand, India",
      workType: "Hybrid",
      type: "internship",
      status: "completed",
      description:
        "Specialized in MERN stack development, building scalable and maintainable web applications. Focused on full-stack architecture, API development, and database optimization.",
      impact: "Built 10+ full-stack modules serving 1000+ users",
      achievements: [
        "Independently developed and maintained full-stack modules for roymedical and admin-smm projects",
        "Designed and implemented RESTful APIs with comprehensive error handling and validation",
        "Optimized MongoDB database schemas resulting in 40% performance improvement",
        "Established GitHub workflows and implemented API testing protocols using Postman",
        "Enhanced project architecture and improved frontend responsiveness across multiple repositories",
        "Mentored junior developers on MERN stack best practices and development workflows",
      ],
      technologies: [
        { name: "React.js", category: "Frontend", level: "Advanced" },
        { name: "Redux.js", category: "State Management", level: "Advanced" },
        { name: "Node.js", category: "Backend", level: "Advanced" },
        { name: "Express.js", category: "Backend", level: "Advanced" },
        { name: "MongoDB", category: "Database", level: "Advanced" },
        { name: "Postman API", category: "Testing", level: "Intermediate" },
        { name: "Git", category: "Version Control", level: "Advanced" },
      ],
      keywords: [
        "MERN Stack Developer",
        "Full Stack Developer",
        "React Developer",
        "Node.js Developer",
        "MongoDB Expert",
      ],
    },
  ];

  const getIcon = (type: string) => {
    const iconProps = { className: "w-5 h-5" };
    switch (type) {
      case "startup":
        return <Rocket {...iconProps} />;
      case "internship":
        return <Briefcase {...iconProps} />;
      case "education":
        return <GraduationCap {...iconProps} />;
      default:
        return <Code {...iconProps} />;
    }
  };

  const getTechCategoryColor = (category: string) => {
    const colors = {
      Frontend: "from-blue-500 to-cyan-500",
      Backend: "from-green-500 to-emerald-500",
      Database: "from-purple-500 to-violet-500",
      Styling: "from-pink-500 to-rose-500",
      "State Management": "from-orange-500 to-amber-500",
      Security: "from-red-500 to-rose-500",
      Deployment: "from-indigo-500 to-blue-500",
      "Version Control": "from-gray-500 to-slate-500",
      Testing: "from-teal-500 to-cyan-500",
      Collaboration: "from-violet-500 to-purple-500",
    };
    return colors[category] || "from-gray-500 to-gray-600";
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  };

  // Add new animations and styles
  const cardVariants = cva(
    "relative p-3 sm:p-5 rounded-xl border transition-all duration-500 overflow-hidden backdrop-blur-sm",
    {
      variants: {
        state: {
          active:
            "border-cyan-400/50 bg-gradient-to-br from-cyan-500/10 via-slate-800/50 to-purple-500/10 shadow-2xl shadow-cyan-400/20",
          inactive:
            "border-slate-700/50 bg-slate-800/30 hover:border-slate-600/50 hover:bg-slate-800/50",
        },
      },
    }
  );

  // Add this new component for better animations
  const FloatingParticles = () => {
    const { width, height } = useWindowSize();
    const particles = useMemo(() => {
      return Array.from({ length: 20 }).map(() => ({
        x: Math.random() * (width || 1000),
        y: Math.random() * (height || 1000),
        size: Math.random() * 2 + 1,
      }));
    }, [width, height]);

    return (
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              x: particle.x,
              y: particle.y,
            }}
            animate={{
              y: [particle.y - 20, particle.y + 20, particle.y - 20],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    );
  };

  // Update the timeline node component
  const TimelineNode = ({ isActive, onClick, children }) => {
    return (
      <motion.div
        className={cn(
          "absolute left-3 sm:left-4 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 z-10",
          isActive
            ? "bg-gradient-to-r from-cyan-400 to-purple-400 border-transparent shadow-lg shadow-cyan-400/50"
            : "bg-slate-800 border-slate-600 hover:border-slate-500"
        )}
        whileHover={{ scale: 1.2 }}
        animate={isActive ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  };

  // First, create a new ImpactMetric component for better organization
  const ImpactMetric = ({ impact }: { impact: string }) => {
    const [first, ...rest] = impact.split(" ");

    return (
      <div className="space-y-4">
        {/* Highlighted Impact Number */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative mb-2 sm:mb-0">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg blur opacity-25" />
            <div className="relative bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-2">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                Digitizing
              </span>
            </div>
          </div>
          <span className="text-base sm:text-lg lg:text-xl text-slate-400 max-w-[280px] sm:max-w-none">
            accommodation sector for 10M+ students across India
          </span>
        </motion.div>

        {/* Description Box */}
        <motion.div
          className="p-4 rounded-xl bg-gradient-to-r from-cyan-500/5 via-slate-800/20 to-purple-500/5 border border-cyan-500/10 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-start gap-3">
            <Trophy className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
            <p className="text-slate-300 leading-relaxed">
              {timelineEvents[selectedEvent].description}
            </p>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <section
      ref={timelineRef}
      className="relative min-h-screen py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden"
      itemScope
      itemType="https://schema.org/Person"
    >
      {/* SEO Meta Content */}
      <div className="sr-only">
        <h1 itemProp="name">
          Dev Kant Kumar - Full Stack Developer & SaaS Founder
        </h1>
        <p itemProp="description">
          Experienced Full Stack Developer specializing in React.js, Node.js,
          MongoDB, and SaaS development. Founder of HostelEase - revolutionizing
          accommodation management in India.
        </p>
        <span itemProp="jobTitle">Full Stack Developer & SaaS Founder</span>
        <span
          itemProp="worksFor"
          itemScope
          itemType="https://schema.org/Organization"
        >
          <span itemProp="name">HostelEase</span>
        </span>
        <div itemProp="knowsAbout">
          React.js, Node.js, MongoDB, Full Stack Development, SaaS Development,
          JavaScript, TypeScript, MERN Stack, Redux, Express.js, Tailwind CSS,
          Web Development, Software Engineering
        </div>
      </div>

      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-conic from-transparent via-slate-700/20 to-transparent animate-spin [animation-duration:60s]"></div>
      </div>

      {/* Floating Particles */}
      <FloatingParticles />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Responsive Header Section */}
        <motion.div
          className="text-center mb-8 sm:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 mb-4 sm:mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Rocket className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
            <span className="text-xs sm:text-sm font-medium text-cyan-300">
              Professional Journey
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
            Career{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Timeline
            </span>
          </h2>

          <p className="text-base sm:text-lg lg:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed px-4 sm:px-6">
            A comprehensive overview of my professional growth, technical
            expertise, and impactful contributions in{" "}
            <strong>full-stack development</strong> and{" "}
            <strong>SaaS innovation</strong>
          </p>
        </motion.div>

        {/* Responsive Grid Layout */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {/* Timeline Navigation - Improved Mobile Layout */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="relative">
              <motion.div
                className="absolute left-4 sm:left-6 top-0 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-slate-700 origin-top"
                style={{ scaleY: smoothProgress }}
              />

              <div className="space-y-3 sm:space-y-4">
                {timelineEvents.map((event, index) => (
                  <motion.div
                    key={index}
                    className="relative"
                    variants={item}
                    whileHover={{ x: 8 }}
                  >
                    {/* Responsive Timeline Node */}
                    <TimelineNode
                      isActive={selectedEvent === index}
                      onClick={() => setSelectedEvent(index)}
                    />

                    {/* Responsive Event Card */}
                    <motion.div
                      className={`ml-8 sm:ml-12 cursor-pointer group ${
                        selectedEvent === index
                          ? "pb-4 sm:pb-6"
                          : "pb-3 sm:pb-4"
                      }`}
                      onClick={() => setSelectedEvent(index)}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div
                        className={cn(
                          cardVariants({
                            state:
                              selectedEvent === index ? "active" : "inactive",
                          }),
                          "group hover:transform hover:scale-[1.02] transition-all duration-300"
                        )}
                      >
                        {/* Background Glow */}
                        {selectedEvent === index && (
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 animate-gradient-x" />
                        )}

                        {/* Add glassmorphism effect */}
                        <div className="absolute inset-0 backdrop-blur-[2px] rounded-xl" />

                        {/* Update content container */}
                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-3">
                            <motion.div
                              className={`p-2.5 rounded-lg ${
                                selectedEvent === index
                                  ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg"
                                  : "bg-slate-700 text-slate-300 group-hover:bg-slate-600"
                              }`}
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.5 }}
                            >
                              {getIcon(event.type)}
                            </motion.div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-white text-lg">
                                  {event.year}
                                </h3>
                                <span
                                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                    event.status === "active"
                                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                      : "bg-slate-500/20 text-slate-400 border border-slate-500/30"
                                  }`}
                                >
                                  {event.status === "active"
                                    ? "Active"
                                    : "Completed"}
                                </span>
                              </div>
                              <p className="text-sm text-slate-400 font-medium">
                                {event.title}
                              </p>
                              <p className="text-xs text-slate-500">
                                {event.company}
                              </p>
                            </div>
                            <ChevronRight
                              className={`w-4 h-4 transition-transform duration-300 ${
                                selectedEvent === index
                                  ? "rotate-90 text-cyan-400"
                                  : "text-slate-500"
                              }`}
                            />
                          </div>

                          {/* Quick Stats */}
                          <div className="flex items-center gap-4 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {event.workType}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {event.period}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Timeline Details - Improved Mobile Layout */}
          <div className="lg:col-span-3 order-1 lg:order-2 mb-8 lg:mb-0">
            <motion.div
              key={selectedEvent}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            >
              <Card className="bg-gradient-to-br from-slate-800/80 via-slate-800/60 to-slate-900/80 border-slate-700/50 shadow-2xl backdrop-blur-sm">
                <CardContent className="p-4 sm:p-6 lg:p-8">
                  {/* Responsive Header Layout */}
                  <div className="mb-6 sm:mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6 mb-4 sm:mb-6">
                      <div className="flex items-center gap-4">
                        <motion.div
                          className="p-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/25"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          {getIcon(timelineEvents[selectedEvent].type)}
                        </motion.div>
                        <div>
                          <h3 className="text-3xl font-bold text-white mb-1">
                            {timelineEvents[selectedEvent].title}
                          </h3>
                          <div className="flex items-center gap-2 mb-2">
                            <p className="text-xl font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                              {timelineEvents[selectedEvent].company}
                            </p>
                            <span className="text-slate-400">•</span>
                            <span className="text-slate-400 text-sm">
                              {timelineEvents[selectedEvent].companyType}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        {timelineEvents[selectedEvent].website && (
                          <motion.a
                            href={timelineEvents[selectedEvent].website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </motion.a>
                        )}
                        {timelineEvents[selectedEvent].github && (
                          <motion.a
                            href={timelineEvents[selectedEvent].github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Github className="w-4 h-4" />
                          </motion.a>
                        )}
                      </div>
                    </div>

                    {/* Responsive Meta Information */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-slate-400">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-cyan-400" />
                        <span>{timelineEvents[selectedEvent].location}</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-300">
                          {timelineEvents[selectedEvent].workType}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-purple-400" />
                        <span>{timelineEvents[selectedEvent].period}</span>
                      </div>
                    </div>
                  </div>

                  {/* Impact Section */}
                  <div className="mb-8">
                    <motion.div
                      className="relative rounded-2xl overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6 }}
                    >
                      {/* Background Elements */}
                      <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 animate-gradient-x" />
                        <div className="absolute inset-0 backdrop-blur-sm" />
                      </div>

                      {/* Content */}
                      <div className="relative p-6 sm:p-8">
                        {/* Impact Header */}
                        <div className="flex items-center gap-3 mb-6">
                          <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500">
                            <Trophy className="w-5 h-5 text-white" />
                          </div>
                          <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                            Impact & Achievement
                          </h3>
                        </div>

                        {/* Impact Metrics */}
                        <ImpactMetric
                          impact={timelineEvents[selectedEvent].impact}
                        />
                      </div>
                    </motion.div>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <p className="text-slate-300 leading-relaxed text-lg">
                      {timelineEvents[selectedEvent].description}
                    </p>
                  </div>

                  {/* Achievements */}
                  <div className="mb-6">
                    <h4 className="text-xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-4 flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-purple-400" />
                      Key Achievements
                    </h4>
                    <div className="space-y-3">
                      {timelineEvents[selectedEvent].achievements.map(
                        (achievement, index) => (
                          <motion.div
                            key={index}
                            className="flex items-start gap-3 group hover:bg-slate-700/20 p-3 rounded-lg transition-colors"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ x: 5 }}
                          >
                            <motion.div
                              className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 mt-2 flex-shrink-0"
                              whileHover={{ scale: 1.5 }}
                            />
                            <span className="text-slate-300 leading-relaxed group-hover:text-white transition-colors">
                              {achievement}
                            </span>
                          </motion.div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Responsive Technology Grid */}
                  <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                    {timelineEvents[selectedEvent].technologies.map(
                      (tech, index) => (
                        <motion.div
                          key={index}
                          className="relative group cursor-pointer overflow-hidden"
                          whileHover={{ scale: 1.05, y: -2 }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm" />
                          <div
                            className={`relative z-10 p-3 rounded-lg border border-slate-600/50 
      bg-gradient-to-r ${getTechCategoryColor(tech.category)} 
      bg-opacity-10 hover:bg-opacity-20 transition-all duration-300 
      shadow-lg hover:shadow-xl`}
                          >
                            <div className="text-white font-medium text-sm mb-1">
                              {tech.name}
                            </div>
                            <div className="text-xs text-slate-400">
                              {tech.category}
                            </div>
                            <div className="absolute top-2 right-2">
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  tech.level === "Expert"
                                    ? "bg-green-400"
                                    : tech.level === "Advanced"
                                    ? "bg-blue-400"
                                    : "bg-yellow-400"
                                }`}
                              />
                            </div>
                          </div>

                          {/* Tooltip */}
                          {hoveredTech === tech.name && (
                            <motion.div
                              className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-slate-900 text-white text-xs rounded-lg border border-slate-700 whitespace-nowrap z-50"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                            >
                              {tech.level} Level
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-900 border-r border-b border-slate-700 rotate-45" />
                            </motion.div>
                          )}
                        </motion.div>
                      )
                    )}
                  </div>

                  {/* Responsive Keywords */}
                  <div className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg bg-slate-800/30 border border-slate-700/30">
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {timelineEvents[selectedEvent].keywords.map(
                        (keyword, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gradient-to-r from-slate-700 to-slate-600 text-slate-300 rounded-full text-xs border border-slate-600/50 hover:border-slate-500/50 transition-colors"
                          >
                            {keyword}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* Responsive Call to Action */}
        <motion.div
          className="text-center mt-8 sm:mt-12 lg:mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-600 to-purple-600 text-white text-sm sm:text-base font-semibold rounded-full hover:from-cyan-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span>Let's Build Something Amazing Together</span>
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveTimeline;
