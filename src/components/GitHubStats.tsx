
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitFork, Calendar } from 'lucide-react';

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
  updated_at: string;
}

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

const GitHubStats = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [userStats, setUserStats] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration (replace with actual GitHub API calls)
  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // Simulating API call with mock data
        setTimeout(() => {
          setUserStats({
            public_repos: 25,
            followers: 150,
            following: 80,
            created_at: '2020-01-15T00:00:00Z'
          });

          setRepos([
            {
              id: 1,
              name: 'modern-portfolio',
              description: 'A modern, responsive portfolio website built with React and TypeScript',
              stargazers_count: 45,
              forks_count: 12,
              language: 'TypeScript',
              html_url: 'https://github.com/devkant/modern-portfolio',
              updated_at: '2024-01-15T00:00:00Z'
            },
            {
              id: 2,
              name: 'mern-ecommerce',
              description: 'Full-stack e-commerce platform using MERN stack',
              stargazers_count: 78,
              forks_count: 23,
              language: 'JavaScript',
              html_url: 'https://github.com/devkant/mern-ecommerce',
              updated_at: '2024-01-10T00:00:00Z'
            },
            {
              id: 3,
              name: 'api-gateway',
              description: 'Microservices API gateway with rate limiting and authentication',
              stargazers_count: 32,
              forks_count: 8,
              language: 'Node.js',
              html_url: 'https://github.com/devkant/api-gateway',
              updated_at: '2024-01-08T00:00:00Z'
            }
          ]);
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      TypeScript: '#3178c6',
      JavaScript: '#f7df1e',
      'Node.js': '#339933',
      Python: '#3776ab',
      React: '#61dafb'
    };
    return colors[language] || '#gray';
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-700 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-4xl mx-auto"
    >
      {/* GitHub Stats Overview */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold gradient-text mb-6 flex items-center gap-2">
          <Github className="h-6 w-6" />
          GitHub Activity
        </h3>
        
        {userStats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-portfolio-dark-card border border-gray-700 rounded-lg p-4 text-center hover-glow"
            >
              <div className="text-2xl font-bold text-portfolio-teal">{userStats.public_repos}</div>
              <div className="text-sm text-gray-400">Repositories</div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-portfolio-dark-card border border-gray-700 rounded-lg p-4 text-center hover-glow"
            >
              <div className="text-2xl font-bold text-portfolio-purple">{userStats.followers}</div>
              <div className="text-sm text-gray-400">Followers</div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-portfolio-dark-card border border-gray-700 rounded-lg p-4 text-center hover-glow"
            >
              <div className="text-2xl font-bold text-portfolio-blue">{userStats.following}</div>
              <div className="text-sm text-gray-400">Following</div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-portfolio-dark-card border border-gray-700 rounded-lg p-4 text-center hover-glow"
            >
              <div className="text-2xl font-bold text-portfolio-teal">4+</div>
              <div className="text-sm text-gray-400">Years Coding</div>
            </motion.div>
          </div>
        )}
      </div>

      {/* Featured Repositories */}
      <div>
        <h4 className="text-xl font-semibold text-white mb-4">Featured Repositories</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {repos.map((repo, index) => (
            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="bg-portfolio-dark-card border border-gray-700 rounded-lg p-6 hover:border-portfolio-teal transition-all duration-300 hover-glow"
            >
              <div className="flex items-start justify-between mb-3">
                <h5 className="text-lg font-semibold text-white">{repo.name}</h5>
                <Github className="h-5 w-5 text-gray-400" />
              </div>
              
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {repo.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getLanguageColor(repo.language) }}
                    ></div>
                    {repo.language}
                  </span>
                  
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    {repo.stargazers_count}
                  </span>
                  
                  <span className="flex items-center gap-1">
                    <GitFork className="h-3 w-3" />
                    {repo.forks_count}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-3">
                <Calendar className="h-3 w-3" />
                Updated {formatDate(repo.updated_at)}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default GitHubStats;
