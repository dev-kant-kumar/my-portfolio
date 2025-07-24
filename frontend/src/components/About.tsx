import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Zap, Target, Award, Users, Coffee } from "lucide-react";

const About = () => {
  const [activeSkillCategory, setActiveSkillCategory] = useState("Frontend");
  const [isVisible, setIsVisible] = useState(false);
  const [animatedSkills, setAnimatedSkills] = useState({});
  const sectionRef = useRef(null);

  const skills = {
    Frontend: [
      { name: "React", level: 90, icon: "⚛️" },
      { name: "Vite", level: 85, icon: "⚡" },
      { name: "Tailwind CSS", level: 95, icon: "🎨" },
      { name: "TypeScript", level: 88, icon: "📘" },
      { name: "JavaScript (ES6+)", level: 92, icon: "🟨" },
      { name: "HTML5", level: 95, icon: "🔥" },
      { name: "CSS3", level: 90, icon: "💫" },
    ],
    Backend: [
      { name: "Node.js", level: 90, icon: "🟢" },
      { name: "Express.js", level: 88, icon: "🚀" },
      { name: "MongoDB", level: 85, icon: "🍃" },
      { name: "JWT", level: 80, icon: "🔐" },
      { name: "REST API Design", level: 85, icon: "🔗" },
      { name: "Mongoose", level: 82, icon: "🦫" },
    ],
    "DevOps/Tools": [
      { name: "GitHub", level: 95, icon: "🐙" },
      { name: "Docker", level: 75, icon: "🐳" },
      { name: "Postman", level: 90, icon: "📮" },
      { name: "Figma", level: 80, icon: "🎭" },
      { name: "VS Code", level: 95, icon: "💻" },
      { name: "Linux CLI", level: 70, icon: "🐧" },
    ],
  };

  const stats = [
    {
      icon: Code,
      label: "Projects Completed",
      value: "50+",
      color: "from-blue-400 to-cyan-400",
    },
    {
      icon: Zap,
      label: "Technologies Mastered",
      value: "20+",
      color: "from-purple-400 to-pink-400",
    },
    {
      icon: Users,
      label: "Happy Clients",
      value: "30+",
      color: "from-green-400 to-emerald-400",
    },
    {
      icon: Coffee,
      label: "Cups of Coffee",
      value: "∞",
      color: "from-orange-400 to-red-400",
    },
  ];

  const achievements = [
    {
      icon: Target,
      title: "Problem Solver",
      desc: "Converting complex requirements into elegant solutions",
    },
    {
      icon: Award,
      title: "Quality Focused",
      desc: "Writing clean, maintainable, and scalable code",
    },
    {
      icon: Zap,
      title: "Performance Optimizer",
      desc: "Building lightning-fast, responsive applications",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate skills bars
          setTimeout(() => {
            const skillsToAnimate = {};
            Object.entries(skills).forEach(([category, skillList]) => {
              skillsToAnimate[category] = skillList.map((skill) => ({
                ...skill,
                animatedLevel: skill.level,
              }));
            });
            setAnimatedSkills(skillsToAnimate);
          }, 500);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const FloatingParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30 animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 py-20 overflow-hidden"
    >
      <FloatingParticles />

      {/* Animated background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-block p-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl mb-6 backdrop-blur-sm border border-cyan-500/20">
            <h2 className="text-5xl lg:text-7xl font-black mb-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              About Me
            </h2>
          </div>
          <p className="text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Crafting digital experiences that push the boundaries of what's
            possible
          </p>
        </div>

        {/* Stats Section */}
        {/* <div
          className={`grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="bg-slate-800/50 border-slate-700/50 backdrop-blur-lg hover:bg-slate-800/70 transition-all duration-300 group hover:scale-105"
            >
              <CardContent className="p-6 text-center">
                <div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} bg-opacity-20 mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div> */}

        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          {/* Profile Section */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <Card className="bg-gradient-to-br from-slate-800/70 to-slate-900/70 border-slate-700/50 backdrop-blur-xl overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-xl flex items-center justify-center mr-4">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    My Journey
                  </h3>
                </div>

                <div className="space-y-6 text-slate-300 leading-relaxed">
                  <p className="text-lg">
                    🚀 I'm a passionate{" "}
                    <span className="text-cyan-400 font-semibold">
                      Full Stack Developer
                    </span>{" "}
                    who transforms ideas into powerful digital experiences. My
                    journey began with a simple "Hello World" and has evolved
                    into architecting complex, scalable applications.
                  </p>
                  <p>
                    💡 Specializing in the{" "}
                    <span className="text-purple-400 font-semibold">
                      MERN stack
                    </span>
                    , I craft applications that don't just work—they inspire.
                    Every line of code is written with purpose, performance, and
                    user experience in mind.
                  </p>
                  <p>
                    🌟 Beyond coding, I'm a technology evangelist who believes
                    in continuous learning, open-source contribution, and
                    knowledge sharing. I thrive on challenges that push the
                    boundaries of what's possible.
                  </p>
                </div>

                {/* Achievements */}
                <div className="mt-8 space-y-4">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-start p-4 bg-slate-700/30 rounded-xl border border-slate-600/30"
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <achievement.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">
                          {achievement.title}
                        </h4>
                        <p className="text-slate-400 text-sm">
                          {achievement.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Image with Enhanced Effects */}
          <div
            className={`transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div className="relative group">
              {/* Outer glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>

              {/* Main image container */}
              <div className="relative w-full max-w-md mx-auto aspect-square rounded-3xl bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 p-2 backdrop-blur-sm border border-white/10">
                <div className="w-full h-full rounded-2xl bg-slate-800/90 flex items-center justify-center overflow-hidden relative">
                  {/* Placeholder content - replace with actual image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20"></div>
                  <div className="relative z-10 text-6xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    DEV
                  </div>

                  {/* Floating tech icons */}
                  <div className="absolute inset-0">
                    {["⚛️", "🟢", "🐳", "🔥"].map((icon, i) => (
                      <div
                        key={i}
                        className="absolute text-2xl opacity-20 animate-bounce"
                        style={{
                          left: `${20 + i * 20}%`,
                          top: `${15 + i * 15}%`,
                          animationDelay: `${i * 0.5}s`,
                          animationDuration: `${2 + i * 0.3}s`,
                        }}
                      >
                        {icon}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Skills Section */}
        <div
          className={`transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-12">
            <h3 className="text-4xl lg:text-5xl font-bold mb-4">
              Technical{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Arsenal
              </span>
            </h3>
            <p className="text-xl text-slate-400">
              Technologies I wield to build amazing experiences
            </p>
          </div>

          {/* Skill Category Tabs */}
          <div className="flex justify-center mb-12">
            <div className="flex bg-slate-800/50 rounded-2xl p-2 backdrop-blur-sm border border-slate-700/50">
              {Object.keys(skills).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveSkillCategory(category)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeSkillCategory === category
                      ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/25"
                      : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Active Skills Display */}
          <Card className="bg-gradient-to-br from-slate-800/70 to-slate-900/70 border-slate-700/50 backdrop-blur-xl">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                {skills[activeSkillCategory]?.map((skill, index) => (
                  <div
                    key={skill.name}
                    className="group p-4 bg-slate-700/30 rounded-xl border border-slate-600/30 hover:border-cyan-400/50 transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{skill.icon}</span>
                        <span className="font-semibold text-white">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-cyan-400 font-bold">
                        {skill.level}%
                      </span>
                    </div>

                    <div className="w-full bg-slate-600/50 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full transition-all duration-2000 ease-out relative overflow-hidden"
                        style={{
                          width: `${
                            animatedSkills[activeSkillCategory]?.[index]
                              ?.animatedLevel || 0
                          }%`,
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div
          className={`text-center mt-20 transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-block p-8 bg-gradient-to-r from-slate-800/70 to-slate-900/70 rounded-3xl backdrop-blur-xl border border-slate-700/50">
            <h4 className="text-2xl font-bold text-white mb-4">
              Ready to build something amazing?
            </h4>
            <p className="text-slate-400 mb-6">
              Let's turn your ideas into reality with cutting-edge technology
            </p>
            <button
              onClick={() => {
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105"
            >
              Let's Collaborate 🚀
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: linear-gradient(
              to right,
              rgba(148, 163, 184, 0.1) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(148, 163, 184, 0.1) 1px,
              transparent 1px
            );
          background-size: 40px 40px;
        }
      `}</style>
    </section>
  );
};

export default About;
