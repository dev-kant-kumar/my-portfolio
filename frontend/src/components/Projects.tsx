import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Github,
  ExternalLink,
  Star,
  Calendar,
  Code,
  Zap,
  Eye,
  TrendingUp,
  Award,
  Rocket,
  Sparkles,
  ChevronRight,
  Play,
} from "lucide-react";

import todo1Img from "../assets/images/projects/todo1.png";
import todo2Img from "../assets/images/projects/todo2.png";
import moviecrudweb from "../assets/images/projects/movie-crud-web-app.png";
import hosteleaseImg from "../assets/images/projects/hosteleaseImg.png";
import bcafreshersImg from "../assets/images/projects/bcafreshersImg.png";
import typingImg from "../assets/images/projects/typingImg.png";
import sketchImg from "../assets/images/projects/sketchImg.png";
import calculatorImg from "../assets/images/projects/calculatorImg.png";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [hoveredProject, setHoveredProject] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Enhanced project data with more professional metrics
  const projects = [
    {
      id: 1,
      title: "Hostelease – Hostel Management System",
      description:
        "Enterprise-grade hostel management platform with real-time analytics, automated room allocation algorithms, and comprehensive admin dashboard. Features advanced booking system, payment integration, and student lifecycle management.",
      image: hosteleaseImg,
      technologies: [
        "React",
        "Tailwind CSS",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Socket.io",
        "JWT",
        "Stripe",
      ],
      github: "#",
      live: "https://hostelease.com/",
      featured: true,
      category: "fullstack",
      status: "In Development",
      metrics: { users: "500+", uptime: "99.9%", performance: "A+" },
      year: "2024",
      complexity: "Enterprise",
    },
    {
      id: 2,
      title: "Advanced MERN To-Do System",
      description:
        "Full-stack productivity application with drag-and-drop interface, real-time collaboration, advanced filtering, priority management, and comprehensive analytics dashboard.",
      image: todo1Img,
      technologies: [
        "MongoDB",
        "Express.js",
        "React",
        "Node.js",
        "Redux",
        "CSS3",
        "WebSocket",
      ],
      github: "https://github.com/dev-kant-kumar/To-Do",
      live: "https://todo.devkantkumar.com/",
      featured: true,
      category: "fullstack",
      status: "Live",
      metrics: { users: "1000+", rating: "4.8★", performance: "A+" },
      year: "2024",
      complexity: "Advanced",
    },
    {
      id: 3,
      title: "Interactive Event Experience Platform",
      description:
        "Immersive event landing page with 3D elements, animated transitions, RSVP system, and social media integration. Built for BCA Freshers Party 2024 with modern UX principles.",
      image: bcafreshersImg,
      technologies: ["HTML5", "CSS3", "JavaScript", "GSAP", "Three.js"],
      github: "https://github.com/dev-kant-kumar/Freshers-Party-2024",
      live: "https://bcafreshers.devkantkumar.com/",
      featured: false,
      category: "frontend",
      status: "Live",
      metrics: { visitors: "2000+", engagement: "85%", loadTime: "<2s" },
      year: "2024",
      complexity: "Intermediate",
    },
    {
      id: 4,
      title: "Dynamic Movie Management System",
      description:
        "Interactive movie database with advanced CRUD operations, search functionality, filtering system, and responsive card-based UI with smooth animations.",
      image: moviecrudweb,
      technologies: ["JavaScript ES6+", "HTML5", "CSS3", "LocalStorage API"],
      github:
        "https://github.com/dev-kant-kumar/Acmegrade-Web-Dev/tree/master/Classworks/CRUD%20Operation",
      live: "https://acmegrade-web-dev-crud-assignment.vercel.app/",
      featured: false,
      category: "frontend",
      status: "Live",
      metrics: { operations: "1000+", accuracy: "100%", speed: "Fast" },
      year: "2024",
      complexity: "Intermediate",
    },
    {
      id: 5,
      title: "Professional Typing Speed Analyzer",
      description:
        "Advanced typing assessment tool with real-time WPM calculation, accuracy tracking, performance analytics, and personalized improvement suggestions.",
      image: typingImg,
      technologies: ["HTML5", "CSS3", "JavaScript", "Chart.js", "Web APIs"],
      github: "https://github.com/dev-kant-kumar/Swift-Type",
      live: "https://dev-kant-kumar.github.io/Swift-Type/",
      featured: false,
      category: "frontend",
      status: "Live",
      metrics: { tests: "5000+", avgWPM: "65", accuracy: "95%" },
      year: "2024",
      complexity: "Intermediate",
    },
    {
      id: 6,
      title: "Artistic Portfolio Showcase",
      description:
        "Elegant gallery website with advanced image optimization, lazy loading, lightbox functionality, and seamless navigation for showcasing artistic creations.",
      image: sketchImg,
      technologies: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "Intersection Observer",
        "Progressive Enhancement",
      ],
      github: "https://github.com/dev-kant-kumar/TGXSW-WebProject",
      live: "https://dev-kant-kumar.github.io/TGXSW-WebProject/",
      featured: false,
      category: "frontend",
      status: "Live",
      metrics: { artworks: "50+", views: "3000+", engagement: "78%" },
      year: "2024",
      complexity: "Basic",
    },
    {
      id: 7,
      title: "Advanced Calculator Interface",
      description:
        "Scientific calculator with advanced mathematical operations, history tracking, keyboard support, and responsive design with smooth animations.",
      image: calculatorImg,
      technologies: ["HTML5", "CSS3", "JavaScript", "Math.js", "PWA"],
      github: "https://github.com/dev-kant-kumar/Calculator",
      live: "https://dev-kant-kumar.github.io/Calculator/",
      featured: false,
      category: "frontend",
      status: "Live",
      metrics: { calculations: "10k+", accuracy: "100%", speed: "Instant" },
      year: "2024",
      complexity: "Basic",
    },
  ];

  const filters = [
    { id: "all", label: "All Projects", icon: Sparkles },
    { id: "fullstack", label: "Full Stack", icon: Code },
    { id: "frontend", label: "Frontend", icon: Eye },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const StatusBadge = ({ status }) => {
    const statusStyles = {
      Live: "bg-green-500/20 text-green-400 border-green-500/30",
      "In Development": "bg-blue-500/20 text-blue-400 border-blue-500/30",
      "Coming Soon": "bg-purple-500/20 text-purple-400 border-purple-500/30",
    };

    return (
      <span
        className={`px-3 py-1 text-xs font-medium border rounded-full ${
          statusStyles[status] || statusStyles["Live"]
        }`}
      >
        {status}
      </span>
    );
  };

  const ComplexityBadge = ({ complexity }) => {
    const complexityStyles = {
      Enterprise: "bg-red-500/20 text-red-400",
      Advanced: "bg-orange-500/20 text-orange-400",
      Intermediate: "bg-yellow-500/20 text-yellow-400",
      Basic: "bg-green-500/20 text-green-400",
    };

    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded ${
          complexityStyles[complexity] || complexityStyles["Basic"]
        }`}
      >
        {complexity}
      </span>
    );
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Grid Pattern Overlay */}
      {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.02\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"1\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div> */}

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Header Section */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
            <Rocket className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm font-medium">
              Featured Work
            </span>
          </div>

          <h2 className="text-5xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent">
            Project{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Showcase
            </span>
          </h2>

          <p className="text-xl text-slate-400 max-w-4xl mx-auto leading-relaxed">
            Cutting-edge solutions crafted with precision, innovation, and
            expertise. Each project represents a commitment to excellence and
            technical mastery.
          </p>

          {/* Stats */}
          {/* <div className="flex flex-wrap justify-center gap-8 mt-12">
            {[
              { label: "Projects Completed", value: "15+", icon: Award },
              { label: "Technologies Mastered", value: "20+", icon: Code },
              { label: "Client Satisfaction", value: "100%", icon: Star },
              { label: "Lines of Code", value: "50k+", icon: TrendingUp },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl mb-2 group-hover:scale-110 transition-transform">
                  <stat.icon className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-2xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div> */}
        </div>

        {/* Filter Navigation */}
        <div
          className={`flex flex-wrap justify-center gap-4 mb-16 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`group flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                  : "bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-white border border-slate-700/50"
              }`}
            >
              <filter.icon className="w-4 h-4" />
              {filter.label}
              {activeFilter === filter.id && (
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              )}
            </button>
          ))}
        </div>

        {/* Featured Projects */}
        <div
          className={`grid lg:grid-cols-2 gap-8 mb-20 transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {filteredProjects
            .filter((project) => project.featured)
            .map((project, index) => (
              <Card
                key={project.id}
                className="group relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-slate-700/50 overflow-hidden hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-80 object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>

                  {/* Floating Action Buttons */}
                  <div
                    className={`absolute top-4 right-4 flex gap-2 transition-all duration-300 ${
                      hoveredProject === project.id
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-4"
                    }`}
                  >
                    <Button
                      size="sm"
                      className="bg-black/50 backdrop-blur-sm border-white/20 hover:bg-black/70"
                      onClick={() => window.open(project.live, "_blank")}
                    >
                      <Play className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-black/50 backdrop-blur-sm border-white/20 hover:bg-white/10"
                      onClick={() => window.open(project.github, "_blank")}
                    >
                      <Github className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Project Status */}
                  <div className="absolute top-4 left-4">
                    <StatusBadge status={project.status} />
                  </div>

                  {/* Complexity Badge */}
                  <div className="absolute bottom-4 left-4">
                    <ComplexityBadge complexity={project.complexity} />
                  </div>
                </div>

                <CardHeader className="relative z-10">
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-2xl text-white group-hover:text-blue-300 transition-colors">
                      {project.title}
                    </CardTitle>
                    <span className="text-sm text-slate-500 font-mono">
                      {project.year}
                    </span>
                  </div>
                  <CardDescription className="text-slate-300 leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10">
                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-slate-800/50 rounded-lg">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-lg font-bold text-blue-400">
                          {value}
                        </div>
                        <div className="text-xs text-slate-500 capitalize">
                          {key}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 text-sm rounded-full border border-blue-500/30 hover:border-blue-400/50 transition-colors"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <Button
                      onClick={() => window.open(project.github, "_blank")}
                      variant="outline"
                      className="flex-1 border-slate-600 hover:border-blue-500 hover:bg-blue-500/10 group"
                    >
                      <Github className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
                      Source Code
                    </Button>
                    <Button
                      onClick={() => window.open(project.live, "_blank")}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 group"
                    >
                      <ExternalLink className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                      Live Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>

        {/* Other Projects Grid */}
        {filteredProjects.filter((project) => !project.featured).length > 0 && (
          <div
            className={`transition-all duration-1000 delay-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-white mb-4">
                Additional{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Projects
                </span>
              </h3>
              <p className="text-slate-400">
                More examples of technical expertise and creative solutions
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProjects
                .filter((project) => !project.featured)
                .map((project, index) => (
                  <Card
                    key={project.id}
                    className="group bg-slate-900/50 border-slate-700/50 overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-2"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>

                      <div className="absolute top-2 left-2">
                        <StatusBadge status={project.status} />
                      </div>
                    </div>

                    <CardHeader className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <CardTitle className="text-lg text-white group-hover:text-blue-300 transition-colors line-clamp-1">
                          {project.title}
                        </CardTitle>
                        <ComplexityBadge complexity={project.complexity} />
                      </div>
                      <CardDescription className="text-slate-400 text-sm line-clamp-2">
                        {project.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="p-4 pt-0">
                      {/* Mini Metrics */}
                      <div className="flex justify-between text-xs text-slate-500 mb-3">
                        {Object.entries(project.metrics)
                          .slice(0, 2)
                          .map(([key, value]) => (
                            <span key={key}>
                              {key}:{" "}
                              <span className="text-blue-400">{value}</span>
                            </span>
                          ))}
                      </div>

                      {/* Technologies (Limited) */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded border border-purple-500/30"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-1 bg-slate-700 text-slate-400 text-xs rounded">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex-1 h-8 text-xs hover:bg-slate-800"
                          onClick={() => window.open(project.github, "_blank")}
                        >
                          <Github className="h-3 w-3 mr-1" />
                          Code
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1 h-8 text-xs bg-blue-600 hover:bg-blue-700"
                          onClick={() => window.open(project.live, "_blank")}
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Demo
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div
          className={`text-center mt-20 transition-all duration-1000 delay-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full mb-6">
            <Zap className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-medium">
              Ready to Collaborate?
            </span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-4">
            Let's Build Something Amazing Together
          </h3>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
            Bringing ideas to life with cutting-edge technology and innovative
            solutions. Let's discuss your next project.
          </p>
          <Button
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-3 text-lg group"
            onClick={() =>
              window.scrollTo({
                top: document.getElementById("contact")?.offsetTop,
                behavior: "smooth",
              })
            }
          >
            Start a Project
            <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
