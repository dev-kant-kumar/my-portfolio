
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, GitBranch, Clock, Target, Award, Activity } from 'lucide-react';

const PerformanceDashboard = () => {
  const [animatedStats, setAnimatedStats] = useState({
    commits: 0,
    projects: 0,
    contributions: 0,
    uptime: 0
  });

  const finalStats = {
    commits: 1247,
    projects: 23,
    contributions: 890,
    uptime: 99.8
  };

  useEffect(() => {
    const animateStats = () => {
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        const easeOut = 1 - Math.pow(1 - progress, 3);

        setAnimatedStats({
          commits: Math.floor(finalStats.commits * easeOut),
          projects: Math.floor(finalStats.projects * easeOut),
          contributions: Math.floor(finalStats.contributions * easeOut),
          uptime: Math.floor(finalStats.uptime * easeOut * 100) / 100
        });

        if (step >= steps) {
          clearInterval(timer);
          setAnimatedStats(finalStats);
        }
      }, interval);

      return () => clearInterval(timer);
    };

    animateStats();
  }, []);

  const activityData = [
    { month: 'Jan', commits: 45, pullRequests: 12, issues: 8 },
    { month: 'Feb', commits: 52, pullRequests: 15, issues: 6 },
    { month: 'Mar', commits: 73, pullRequests: 18, issues: 10 },
    { month: 'Apr', commits: 65, pullRequests: 14, issues: 7 },
    { month: 'May', commits: 89, pullRequests: 22, issues: 12 },
    { month: 'Jun', commits: 94, pullRequests: 25, issues: 9 }
  ];

  const projectsData = [
    { name: 'E-commerce Platform', completion: 95, status: 'Deployed' },
    { name: 'Task Management App', completion: 88, status: 'Testing' },
    { name: 'Portfolio Website', completion: 100, status: 'Live' },
    { name: 'API Gateway', completion: 72, status: 'Development' },
    { name: 'Mobile App', completion: 45, status: 'Planning' }
  ];

  const skillDistribution = [
    { name: 'Frontend', value: 40, color: '#14b8a6' },
    { name: 'Backend', value: 30, color: '#8b5cf6' },
    { name: 'DevOps', value: 15, color: '#3b82f6' },
    { name: 'Design', value: 15, color: '#f59e0b' }
  ];

  const StatCard = ({ icon: Icon, title, value, change, color }: any) => (
    <Card className="bg-portfolio-dark-card border-gray-800 hover-glow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm font-medium">{title}</p>
            <p className="text-2xl font-bold text-white mt-1">{value}</p>
            {change && (
              <p className={`text-sm mt-1 flex items-center gap-1 ${
                change > 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                <TrendingUp className="w-4 h-4" />
                +{change}%
              </p>
            )}
          </div>
          <div className={`p-3 rounded-full ${color}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <section className="section-padding bg-portfolio-dark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Performance <span className="gradient-text">Dashboard</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Real-time insights into my development activity and project metrics
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            icon={GitBranch}
            title="Total Commits"
            value={animatedStats.commits.toLocaleString()}
            change={12}
            color="bg-portfolio-teal"
          />
          <StatCard
            icon={Target}
            title="Projects Completed"
            value={animatedStats.projects}
            change={8}
            color="bg-portfolio-purple"
          />
          <StatCard
            icon={Activity}
            title="Contributions"
            value={animatedStats.contributions.toLocaleString()}
            change={15}
            color="bg-portfolio-blue"
          />
          <StatCard
            icon={Award}
            title="Uptime"
            value={`${animatedStats.uptime}%`}
            change={2}
            color="bg-green-500"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Activity Chart */}
          <Card className="bg-portfolio-dark-card border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-portfolio-teal">
                <Activity className="w-5 h-5" />
                Development Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1a1a', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="commits"
                    stackId="1"
                    stroke="#14b8a6"
                    fill="#14b8a6"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="pullRequests"
                    stackId="1"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Skill Distribution */}
          <Card className="bg-portfolio-dark-card border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-portfolio-purple">
                <Target className="w-5 h-5" />
                Skill Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={skillDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {skillDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1a1a', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Project Status */}
        <Card className="bg-portfolio-dark-card border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-portfolio-blue">
              <Clock className="w-5 h-5" />
              Project Status Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {projectsData.map((project, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-white">{project.name}</h4>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-400">{project.completion}%</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        project.status === 'Live' || project.status === 'Deployed' 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : project.status === 'Testing'
                          ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                          : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-portfolio-teal to-portfolio-blue h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${project.completion}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PerformanceDashboard;
