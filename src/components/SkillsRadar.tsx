
import React, { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SkillsRadar = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skillsData = [
    { skill: 'React', level: 90, description: 'Advanced React development with hooks and context' },
    { skill: 'TypeScript', level: 88, description: 'Strong typing and enterprise-grade applications' },
    { skill: 'Node.js', level: 85, description: 'Backend development and API creation' },
    { skill: 'MongoDB', level: 82, description: 'Database design and optimization' },
    { skill: 'Tailwind CSS', level: 95, description: 'Modern CSS framework and responsive design' },
    { skill: 'Three.js', level: 75, description: '3D graphics and interactive experiences' },
    { skill: 'Git/GitHub', level: 92, description: 'Version control and collaborative development' },
    { skill: 'Docker', level: 70, description: 'Containerization and deployment' }
  ];

  return (
    <section className="section-padding bg-portfolio-dark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Skills <span className="gradient-text">Radar</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Interactive visualization of my technical expertise
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Card className="bg-portfolio-dark-card border-gray-800 p-6">
            <CardHeader>
              <CardTitle className="text-center text-portfolio-teal">Technical Proficiency</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={skillsData}>
                  <PolarGrid 
                    stroke="#374151" 
                    strokeWidth={1}
                  />
                  <PolarAngleAxis 
                    dataKey="skill" 
                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 100]} 
                    tick={{ fill: '#6B7280', fontSize: 10 }}
                  />
                  <Radar
                    name="Skills"
                    dataKey="level"
                    stroke="#14b8a6"
                    fill="#14b8a6"
                    fillOpacity={0.3}
                    strokeWidth={2}
                    dot={{ fill: '#14b8a6', strokeWidth: 2, r: 4 }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold mb-6 text-portfolio-purple">
              Skill Details
            </h3>
            <div className="grid gap-4">
              {skillsData.map((skill) => (
                <div
                  key={skill.skill}
                  className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                    hoveredSkill === skill.skill
                      ? 'border-portfolio-teal bg-portfolio-teal/10'
                      : 'border-gray-700 bg-portfolio-dark-secondary'
                  }`}
                  onMouseEnter={() => setHoveredSkill(skill.skill)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-white">{skill.skill}</span>
                    <span className="text-portfolio-teal font-bold">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                    <div
                      className="bg-gradient-to-r from-portfolio-teal to-portfolio-blue h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-400">{skill.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsRadar;
