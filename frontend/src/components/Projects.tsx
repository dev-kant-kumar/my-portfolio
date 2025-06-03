import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';
import todo1Img from "../assets/images/projects/todo1.png"; 
import todo2Img from "../assets/images/projects/todo2.png"; 
import moviecrudweb from "../assets/images/projects/movie-crud-web-app.png"

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "To-Do App",
      description: "A full-stack To-Do application built with the MERN stack. Users can create, update, and delete tasks with authentication and persistent storage using MongoDB.",
      image: todo1Img,
      technologies: ["MongoDB", "Express.js", "React", "Node.js", "CSS"],
      github: "https://github.com/dev-kant-kumar/To-Do",
      live: "https://todo.devkantkumar.com/",
      featured: true
    },
    
    {
      id: 2,
      title: "Movie CRUD Web App",
      description: "A responsive web application to create, read, update, and delete movie cards. Demonstrates complete CRUD functionality with form handling and state management.",
      image: moviecrudweb,
      technologies: ["JavaScript", "HTML", "CSS"],
      github: "https://github.com/dev-kant-kumar/Acmegrade-Web-Dev/tree/master/Classworks/CRUD%20Operation",
      live: "https://acmegrade-web-dev-crud-assignment.vercel.app/",
      featured: false,
    },
  
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
                    onClick={()=>window.open(project.github,"_blank")}
                    variant="outline" 
                    size="sm"
                    className="border-portfolio-teal text-portfolio-teal hover:bg-portfolio-teal hover:text-portfolio-dark"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </Button>
                  <Button 
                  onClick={()=>window.open(project.live,"_blank")}
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
                    <Button variant="ghost" size="sm" className="p-2 h-8 w-8" onClick={()=>window.open(project.github,"_blank")}>
                      <Github className="h-4 w-4" />
                    </Button>
                    <Button size="sm" className="text-xs bg-portfolio-blue hover:bg-portfolio-blue/80" onClick={()=>window.open(project.live,"_blank")}>
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
