
import React from 'react';
import { Github, Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'GitHub', icon: Github, url: 'https://github.com/dev-kant-kumar' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/devkantkumar/' },
    { name: 'YouTube', icon: Youtube, url: 'https://www.youtube.com/@dev-kant-kumar' }
  ];

  return (
    <footer className="bg-portfolio-dark border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold gradient-text">Dev Kant Kumar</h3>
            <p className="text-gray-400 leading-relaxed">
              Full Stack Web Developer passionate about creating modern web experiences 
              and helping businesses grow through technology.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              {['About', 'Projects', 'Contact', 'Resume'].map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-400 hover:text-portfolio-teal transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Connect</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-portfolio-dark-card border border-gray-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-portfolio-teal hover:border-portfolio-teal transition-all duration-300"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
            <p className="text-gray-400">
              <a 
                href="mailto:devkant.dev@gmail.com"
                className="hover:text-portfolio-teal transition-colors"
              >
                dev.techdeveloper@gmail.com
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Dev Kant Kumar. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm mt-4 md:mt-0">
              Built with React, TypeScript & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
