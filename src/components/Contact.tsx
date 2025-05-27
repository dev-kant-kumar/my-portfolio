
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Github, Linkedin, Youtube } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/devkant',
      color: 'hover:text-portfolio-teal'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com/in/devkant',
      color: 'hover:text-portfolio-blue'
    },
    {
      name: 'YouTube',
      icon: Youtube,
      url: 'https://youtube.com/@devkant',
      color: 'hover:text-red-500'
    }
  ];

  return (
    <section id="contact" className="section-padding bg-portfolio-dark-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Ready to bring your ideas to life? Let's discuss your next project
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <Card className="bg-portfolio-dark-card border-gray-800 hover-glow">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Send Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-portfolio-dark border-gray-700 text-white placeholder:text-gray-500 focus:border-portfolio-teal"
                    required
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-portfolio-dark border-gray-700 text-white placeholder:text-gray-500 focus:border-portfolio-teal"
                    required
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="bg-portfolio-dark border-gray-700 text-white placeholder:text-gray-500 focus:border-portfolio-teal resize-none"
                    required
                  />
                </div>
                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-portfolio-teal to-portfolio-blue hover:from-portfolio-teal/80 hover:to-portfolio-blue/80 text-white"
                  size="lg"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-portfolio-teal">
                Get In Touch
              </h3>
              <p className="text-gray-300 leading-relaxed mb-8">
                I'm always interested in new opportunities and exciting projects. 
                Whether you're a company looking to hire, or you're a fellow developer 
                wanting to collaborate, I'd love to hear from you.
              </p>
              
              <div className="space-y-4 mb-8">
                <div>
                  <h4 className="text-lg font-medium text-white mb-2">Email</h4>
                  <p className="text-gray-400">devkant.dev@gmail.com</p>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white mb-2">Location</h4>
                  <p className="text-gray-400">Available for remote work</p>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white mb-2">Response Time</h4>
                  <p className="text-gray-400">Usually within 24 hours</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-medium text-white mb-4">Connect With Me</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 bg-portfolio-dark-card border border-gray-700 rounded-lg flex items-center justify-center text-gray-400 transition-all duration-300 hover:border-gray-600 ${social.color} hover:scale-110`}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            <Card className="bg-gradient-to-r from-portfolio-teal/10 to-portfolio-blue/10 border-portfolio-teal/20">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-white mb-2">
                  Ready to start your project?
                </h4>
                <p className="text-gray-400 mb-4">
                  Let's schedule a call to discuss your requirements and how I can help bring your vision to life.
                </p>
                <Button 
                  variant="outline"
                  className="border-portfolio-teal text-portfolio-teal hover:bg-portfolio-teal hover:text-portfolio-dark"
                >
                  Schedule a Call
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
