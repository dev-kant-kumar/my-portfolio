
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, MapPin, Trophy, Code } from 'lucide-react';

const InteractiveTimeline = () => {
  const [selectedEvent, setSelectedEvent] = useState<number>(0);

  const timelineEvents = [
    {
      year: '2024',
      title: 'Full Stack Developer',
      company: 'Tech Innovations Inc.',
      location: 'Remote',
      type: 'work',
      description: 'Leading development of modern web applications using React, Node.js, and cloud technologies.',
      achievements: ['Built 5+ production applications', 'Improved performance by 40%', 'Led team of 3 developers'],
      technologies: ['React', 'Node.js', 'MongoDB', 'AWS']
    },
    {
      year: '2023',
      title: 'Frontend Developer',
      company: 'Digital Solutions Ltd.',
      location: 'New York, NY',
      type: 'work',
      description: 'Specialized in creating responsive, user-friendly interfaces with modern frameworks.',
      achievements: ['Redesigned main application UI', 'Increased user engagement by 60%', 'Implemented design system'],
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Figma']
    },
    {
      year: '2022',
      title: 'Computer Science Degree',
      company: 'University of Technology',
      location: 'California, CA',
      type: 'education',
      description: 'Graduated with honors, focusing on software engineering and web development.',
      achievements: ['Summa Cum Laude', 'Dean\'s List 4 semesters', 'Best Capstone Project Award'],
      technologies: ['Java', 'Python', 'JavaScript', 'SQL']
    },
    {
      year: '2021',
      title: 'Junior Developer',
      company: 'StartUp Ventures',
      location: 'Austin, TX',
      type: 'work',
      description: 'First professional role, learning industry best practices and agile development.',
      achievements: ['Completed 20+ feature implementations', 'Zero critical bugs in production', 'Mentored 2 interns'],
      technologies: ['HTML', 'CSS', 'JavaScript', 'PHP']
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'work': return <Code className="w-6 h-6" />;
      case 'education': return <Trophy className="w-6 h-6" />;
      default: return <Calendar className="w-6 h-6" />;
    }
  };

  return (
    <section className="section-padding bg-portfolio-dark-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            My <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            An interactive timeline of my professional growth and achievements
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Timeline Navigation */}
          <div className="lg:col-span-1">
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-portfolio-teal to-portfolio-purple"></div>
              <div className="space-y-6">
                {timelineEvents.map((event, index) => (
                  <motion.div
                    key={index}
                    className={`relative cursor-pointer transition-all duration-300 ${
                      selectedEvent === index ? 'scale-105' : ''
                    }`}
                    onClick={() => setSelectedEvent(index)}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className={`absolute left-4 w-4 h-4 rounded-full border-2 ${
                      selectedEvent === index 
                        ? 'bg-portfolio-teal border-portfolio-teal shadow-lg shadow-portfolio-teal/50' 
                        : 'bg-portfolio-dark border-gray-600'
                    }`}></div>
                    <div className="ml-12 pb-6">
                      <div className={`p-4 rounded-lg border transition-all duration-300 ${
                        selectedEvent === index
                          ? 'border-portfolio-teal bg-portfolio-teal/10'
                          : 'border-gray-700 bg-portfolio-dark-card hover:border-gray-600'
                      }`}>
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`p-2 rounded-full ${
                            selectedEvent === index ? 'bg-portfolio-teal text-portfolio-dark' : 'bg-gray-700 text-gray-300'
                          }`}>
                            {getIcon(event.type)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">{event.year}</h3>
                            <p className="text-sm text-gray-400">{event.title}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Timeline Details */}
          <div className="lg:col-span-2">
            <motion.div
              key={selectedEvent}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-portfolio-dark-card border-gray-800 h-full">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 rounded-full bg-portfolio-teal text-portfolio-dark">
                        {getIcon(timelineEvents[selectedEvent].type)}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">
                          {timelineEvents[selectedEvent].title}
                        </h3>
                        <p className="text-portfolio-teal font-medium">
                          {timelineEvents[selectedEvent].company}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 mb-4">
                      <MapPin className="w-4 h-4" />
                      <span>{timelineEvents[selectedEvent].location}</span>
                      <Calendar className="w-4 h-4 ml-4" />
                      <span>{timelineEvents[selectedEvent].year}</span>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {timelineEvents[selectedEvent].description}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-portfolio-purple mb-3">
                      Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {timelineEvents[selectedEvent].achievements.map((achievement, index) => (
                        <li key={index} className="flex items-center gap-3 text-gray-300">
                          <div className="w-2 h-2 rounded-full bg-portfolio-teal"></div>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-portfolio-blue mb-3">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {timelineEvents[selectedEvent].technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm border border-gray-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveTimeline;
