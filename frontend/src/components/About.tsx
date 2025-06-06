
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import MyImg from "../../public/dev.png"

const About = () => {
  const skills = {
    Frontend: [
      { name: 'React', level: 90 },
      { name: 'Vite', level: 85 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'TypeScript', level: 88 },
      { name: 'JavaScript (ES6+)', level: 92 },
      { name: 'HTML5', level: 95 },
      { name: 'CSS3', level: 90 }
    ],
    Backend: [
      { name: 'Node.js', level: 90 },
      { name: 'Express.js', level: 88 },
      { name: 'MongoDB', level: 85 },
      { name: 'JWT', level: 80 },
      { name: 'REST API Design', level: 85 },
      { name: 'Mongoose', level: 82 }
    ],
    'DevOps/Tools': [
      { name: 'GitHub', level: 95 },
      { name: 'Docker', level: 75 },
      { name: 'Postman', level: 90 },
      { name: 'Figma', level: 80 },
      { name: 'VS Code', level: 95 },
      { name: 'Linux CLI', level: 70 }
    ]
  };
  

  return (
    <section id="about" className="section-padding bg-portfolio-dark-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Passionate about creating digital experiences that make a difference
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Profile Section */}
          <div className="animate-slide-in-left">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-portfolio-teal">My Journey</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                I'm a dedicated Full Stack Web Developer with a passion for creating modern, 
                responsive web applications. My journey began with curiosity about how websites work, 
                and has evolved into a deep expertise in the MERN stack.
              </p>
              <p className="text-gray-300 leading-relaxed mb-6">
                I specialize in building scalable web applications with clean, maintainable code. 
                My focus is on creating exceptional user experiences while ensuring robust backend 
                functionality and optimal performance.
              </p>
              <p className="text-gray-300 leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing to 
                open source projects, or sharing knowledge with the developer community.
              </p>
            </div>
          </div>

          {/* Profile Image Placeholder */}
          <div className="animate-fade-in">
            <div className="relative">
              <div className="w-full max-w-md mx-auto aspect-square rounded-2xl bg-gradient-to-br from-portfolio-teal/20 to-portfolio-purple/20 p-1">
                <div className="w-full h-full rounded-2xl bg-portfolio-dark-card flex items-center justify-center">
                  {/* <div className="text-6xl gradient-text font-bold">Dev</div> */}
                  <img src={MyImg} alt="Dev Kant Kumar - Full Stack Developer" className='h-full w-full object-cover object-top rounded-2xl'/>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="animate-fade-in">
          <h3 className="text-3xl font-bold text-center mb-12">
            Technical <span className="gradient-text">Skills</span>
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, skillList]) => (
              <Card key={category} className="bg-portfolio-dark-card border-gray-800 hover-glow">
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold mb-6 text-portfolio-teal">
                    {category}
                  </h4>
                  <div className="space-y-4">
                    {skillList.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300">{skill.name}</span>
                          <span className="text-sm text-gray-500">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-portfolio-teal to-portfolio-blue h-2 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
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

export default About;
