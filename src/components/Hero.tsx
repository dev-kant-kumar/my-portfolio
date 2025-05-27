
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Download, Eye, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import ThreeBackground from './ThreeBackground';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = [
    "Frontend Enthusiast",
    "MERN Stack Pro", 
    "UI/UX Focused Coder",
    "Full Stack Developer"
  ];

  useEffect(() => {
    const currentRole = roles[currentIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, currentIndex, isDeleting, roles]);

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <ThreeBackground />
      </div>

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-portfolio-dark/90 via-portfolio-dark-secondary/90 to-portfolio-dark-card/90 z-10"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-10">
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-portfolio-teal/10 rounded-full blur-3xl"
        ></motion.div>
        <motion.div 
          animate={{ 
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-portfolio-purple/10 rounded-full blur-3xl"
        ></motion.div>
        <motion.div 
          animate={{ 
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-portfolio-blue/10 rounded-full blur-3xl"
        ></motion.div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Profile Image */}
          <motion.div variants={itemVariants} className="mb-8">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-portfolio-teal to-portfolio-purple p-1"
            >
              <div className="w-full h-full rounded-full bg-portfolio-dark-card flex items-center justify-center">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-24 h-24 rounded-full bg-gradient-to-r from-portfolio-teal/20 to-portfolio-purple/20 flex items-center justify-center"
                >
                  <span className="text-2xl font-bold gradient-text">DK</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Greeting */}
          <motion.p variants={itemVariants} className="text-lg text-gray-400 mb-4">
            Hi, I'm
          </motion.p>

          {/* Name */}
          <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="gradient-text">Dev Kant Kumar</span>
          </motion.h1>

          {/* Animated Role */}
          <motion.div variants={itemVariants} className="mb-8">
            <p className="text-xl sm:text-2xl text-gray-300 mb-2">
              A passionate Full Stack Web Developer
            </p>
            <p className="text-lg text-gray-400">
              <span className="text-portfolio-teal">{displayText}</span>
              <motion.span 
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="text-portfolio-teal"
              >
                |
              </motion.span>
            </p>
          </motion.div>

          {/* Description */}
          <motion.p variants={itemVariants} className="text-lg text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Building modern web experiences with cutting-edge technologies. 
            Specializing in MERN stack development with a focus on user experience and clean code.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-portfolio-teal to-portfolio-blue hover:from-portfolio-teal/80 hover:to-portfolio-blue/80 text-white px-8 py-3 text-lg hover-glow group"
                onClick={scrollToProjects}
              >
                <Eye className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                View Portfolio
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                variant="outline"
                className="border-portfolio-purple text-portfolio-purple hover:bg-portfolio-purple hover:text-white px-8 py-3 text-lg group"
                onClick={scrollToContact}
              >
                <MessageSquare className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                Hire Me
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white px-8 py-3 text-lg group"
              >
                <Download className="mr-2 h-5 w-5 group-hover:bounce transition-transform" />
                Download Resume
              </Button>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div 
            variants={itemVariants}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="cursor-pointer"
            onClick={scrollToProjects}
          >
            <ArrowDown className="mx-auto h-6 w-6 text-gray-400 hover:text-portfolio-teal transition-colors" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
