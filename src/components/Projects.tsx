import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, shopping cart, payment integration, and admin dashboard.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
      github: "#",
      live: "#",
      featured: true
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
      technologies: ["React", "Express.js", "Socket.io", "PostgreSQL"],
      github: "#",
      live: "#",
      featured: true
    },
    {
      id: 3,
      title: "Social Media Dashboard",
      description: "Analytics dashboard for social media management with data visualization, scheduling posts, and engagement tracking.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      technologies: ["React", "Chart.js", "Node.js", "MongoDB"],
      github: "#",
      live: "#",
      featured: false
    },
    {
      id: 4,
      title: "Weather App",
      description: "Beautiful weather application with location-based forecasts, interactive maps, and detailed weather analytics.",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop",
      technologies: ["React", "TypeScript", "Weather API", "Tailwind CSS"],
      github: "#",
      live: "#",
      featured: false
    },
    {
      id: 5,
      title: "Blog Platform",
      description: "Modern blogging platform with markdown support, comment system, and SEO optimization features.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop",
      technologies: ["React", "Node.js", "MongoDB", "Markdown"],
      github: "#",
      live: "#",
      featured: false
    },
    {
      id: 6,
      title: "Finance Tracker",
      description: "Personal finance management app with expense tracking, budget planning, and financial insights.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
      technologies: ["React", "Express.js", "Chart.js", "MongoDB"],
      github: "#",
      live: "#",
      featured: false
    }
  ];

  return (
    <section id="projects" className="section-padding bg-portfolio-dark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A showcase of my recent work and technical expertise
          </p>
        </div>

        {/* Featured Projects */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {projects.filter(project => project.featured).map((project) => (
            <Card key={project.id} className="bg-portfolio-dark-card border-gray-800 overflow-hidden hover-glow group">
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-portfolio-dark-card/90 to-transparent"></div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl text-white">{project.title}</CardTitle>
                <CardDescription className="text-gray-400">
                  {project.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 bg-portfolio-teal/20 text-portfolio-teal text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-portfolio-teal text-portfolio-teal hover:bg-portfolio-teal hover:text-portfolio-dark"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </Button>
                  <Button 
                    size="sm"
                    className="bg-gradient-to-r from-portfolio-purple to-portfolio-blue hover:from-portfolio-purple/80 hover:to-portfolio-blue/80"
                  >
                    Live Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Other Projects Grid */}
        <div>
          <h3 className="text-2xl font-semibold mb-8 text-center text-gray-300">
            More Projects
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.filter(project => !project.featured).map((project) => (
              <Card key={project.id} className="bg-portfolio-dark-card border-gray-800 hover-glow group">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white">{project.title}</CardTitle>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span 
                        key={tech}
                        className="px-2 py-1 bg-portfolio-purple/20 text-portfolio-purple text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="p-2 h-8 w-8">
                      <Github className="h-4 w-4" />
                    </Button>
                    <Button size="sm" className="text-xs bg-portfolio-blue hover:bg-portfolio-blue/80">
                      Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
