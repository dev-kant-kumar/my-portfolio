import React, { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  X,
  Send,
  User,
  Bot,
  Sparkles,
  Volume2,
  VolumeX,
  RotateCcw,
  Download,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Zap,
  Brain,
  Code,
  Briefcase,
  GraduationCap,
  Mail,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  category?: string;
  isProcessing?: boolean;
  reactions?: { thumbsUp: boolean; thumbsDown: boolean };
}

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  query: string;
  gradient: string;
}

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);

  const quickActions: QuickAction[] = [
    {
      id: "skills",
      label: "Skills & Tech",
      icon: <Code className="h-3 w-3" />,
      query: "What technologies does Dev use?",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: "projects",
      label: "Projects",
      icon: <Briefcase className="h-3 w-3" />,
      query: "Tell me about Dev's projects",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: "experience",
      label: "Experience",
      icon: <Zap className="h-3 w-3" />,
      query: "What's Dev's professional experience?",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      id: "contact",
      label: "Contact",
      icon: <Mail className="h-3 w-3" />,
      query: "How can I contact Dev?",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  const formatMessage = (text: string) => {
    return text
      .replace(
        /\*\*(.*?)\*\*/g,
        "<strong class='text-cyan-300 font-semibold'>$1</strong>"
      )
      .replace(/\n/g, "<br/>")
      .replace(
        /- (.*?)(?=\n|$)/g,
        "<li class='ml-4 my-1 relative'><span class='absolute -left-3 top-2 w-1 h-1 bg-cyan-400 rounded-full'></span>$1</li>"
      )
      .replace(
        /👉 "(.*?)"/g,
        "<span class='inline-block bg-gradient-to-r from-cyan-500/20 to-blue-500/20 px-2 py-1 rounded-md border border-cyan-500/30 text-cyan-300 text-sm font-medium my-1'>💡 $1</span>"
      )
      .replace(/🛠|🚀|👨‍💻|🎓|🏢/g, "<span class='text-lg mr-1'>$&</span>");
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: `🤖 **Greetings! I'm Zayra**, Dev Kant Kumar's Advanced AI Assistant.

I'm equipped with comprehensive knowledge about Dev's professional journey and can assist you with:

🛠 **Technical Expertise & Skills**
🚀 **Project Portfolio & Demonstrations** 
👨‍💻 **Professional Experience & Career**
🎓 **Educational Background**
🏢 **HostelEase - His Innovative Startup**

**Quick Queries to Get Started:**
👉 "What technologies does Dev use?"
👉 "Show me his best projects"
👉 "Tell me about HostelEase"
👉 "How can I hire him?"

Ready to explore Dev's digital universe? Let's dive in! ✨`,
      sender: "ai",
      timestamp: new Date(),
      category: "welcome",
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const aiResponses = {
    skills: {
      content: `🔧 **Dev's Technical Arsenal**

**Frontend Mastery:**
- **React.js** with TypeScript for robust applications
- **Next.js** for server-side rendering and optimization
- **Tailwind CSS** & modern styling frameworks
- **Redux Toolkit** for state management
- **Vite** for lightning-fast development

**Backend Excellence:**
- **Node.js** & **Express.js** for scalable APIs
- **MongoDB** with advanced aggregation pipelines
- **RESTful API** design and implementation
- **JWT Authentication** & security protocols

**DevOps & Tools:**
- **Git/GitHub** workflows and collaboration
- **Vercel** & **Render** deployment strategies
- **Postman** for API testing and documentation
- **VS Code** with productivity extensions

Dev continuously adapts to emerging technologies, ensuring cutting-edge solutions for every project! 🚀`,
      category: "technical",
    },

    projects: {
      content: `🚀 **Dev's Project Showcase**

**🏢 HostelEase (Co-Founder & Lead Developer)**
- Full-stack SaaS hostel management platform
- Multi-tenant architecture with admin dashboards
- Real-time booking system and payment integration
- **Live:** hostelease.com

**💼 Other Notable Projects:**
- **MERN To-Do Application** - Complete task management
- **Movie CRUD Web App** - Dynamic content management
- **SwiftType Typing Tester** - Performance analytics
- **Portfolio for Sketch Artists** - Creative showcase platform
- **Freshers' Party Event Site** - Community engagement

**🔗 All projects feature:**
- Responsive design across all devices
- Modern UI/UX with smooth animations
- Clean, maintainable code architecture
- Live deployments with GitHub repositories

Explore the complete portfolio at **devkantkumar.com** 🌟`,
      category: "showcase",
    },

    experience: {
      content: `💼 **Dev's Professional Journey**

**🚀 Co-Founder & Lead Developer - HostelEase (2024-Present)**
- Architecting scalable SaaS solutions for hostel management
- Leading frontend development for booking and admin panels
- Implementing multi-tenant architecture and payment systems
- Managing product roadmap and technical strategy

**💻 Full Stack Developer Intern - Techies Gateway (2024)**
- Developed complete MERN stack modules for production
- Collaborated with cross-functional teams in hybrid environment
- Maintained multiple client-facing repositories
- Delivered high-quality code under tight deadlines

**🌐 Web Developer Intern - Techies Gateway (2025)**
- Enhanced UI/UX for live production applications
- Contributed to PHP-based legacy system improvements
- Participated in code reviews and agile development processes

**Key Achievements:**
- Successfully launched multiple production applications
- Maintained 99%+ uptime for deployed services
- Led technical decision-making for startup initiatives
- Built strong client relationships through quality delivery 🏆`,
      category: "professional",
    },

    contact: {
      content: `📞 **Connect with Dev Kant Kumar**

**Professional Contact:**
✉️ **Email:** dev.techdeveloper@gmail.com
🌐 **Portfolio:** devkantkumar.com
💼 **LinkedIn:** linkedin.com/in/devkantkumar

**Social Presence:**
🐱 **GitHub:** github.com/dev-kant-kumar
🐦 **Twitter/X:** @dev_kant_kumar  
📸 **Instagram:** instagram.com/devkantkumar.in

**💡 Ready to collaborate?**
- Portfolio contact form for project inquiries
- Direct email for immediate communication
- LinkedIn for professional networking
- GitHub for code collaboration

**Response Time:** Typically within 24 hours for professional inquiries.

Dev is always open to discussing innovative projects, technical challenges, and collaboration opportunities! 🤝`,
      category: "contact",
    },

    education: {
      content: `🎓 **Educational Foundation**

**Bachelor of Computer Applications (BCA)**
- **Institution:** Vinoba Bhave University, Hazaribagh
- **Expected Graduation:** 2026
- **Focus:** Computer Science, Software Development, and System Design

**Continuous Learning Journey:**
- Advanced JavaScript and React ecosystem
- Modern backend development with Node.js
- Database design and optimization techniques
- Cloud computing and deployment strategies
- Agile development methodologies

**Certifications & Skills Development:**
- Self-taught full-stack development
- Open-source contribution experience
- Technical problem-solving and algorithm design
- Project management and team leadership

Dev believes in combining formal education with practical, hands-on experience to stay at the forefront of technology! 📚✨`,
      category: "academic",
    },

    startup: {
      content: `🏢 **HostelEase - Revolutionary Hostel Management**

**🚀 The Vision:**
Transforming hostel management across India with cutting-edge SaaS technology.

**💡 Key Features:**
- **Smart Booking System** - Real-time availability and reservations
- **Digital Payment Integration** - Seamless rent and fee collection
- **Comprehensive Admin Dashboard** - Complete management oversight
- **Resident Portal** - Self-service features and communication
- **Complaint Tracking** - Efficient issue resolution system
- **Visitor Management** - Digital logs and security protocols

**🛠 Technical Excellence:**
- **MERN Stack Architecture** for scalability
- **Multi-tenant SaaS Design** supporting multiple hostels
- **Responsive Frontend** with modern UI/UX
- **Secure Payment Gateway** integration
- **Real-time Notifications** and updates

**🌟 Impact:**
Currently serving hostel owners and residents with streamlined operations, reduced paperwork, and enhanced user experience.

**Visit:** hostelease.com to experience the future of hostel management! 🌐`,
      category: "innovation",
    },

    portfolio: {
      content: `🌐 **Dev's Digital Portfolio - devkantkumar.com**

**🎨 What You'll Discover:**
- **Interactive Project Demos** with live functionality
- **Complete GitHub Repository** links and documentation
- **Professional Timeline** showcasing career progression
- **Technical Skills Matrix** with proficiency levels
- **Contact Integration** for seamless communication

**💫 Portfolio Highlights:**
- **Modern, Responsive Design** optimized for all devices
- **Smooth Animations** and micro-interactions
- **Dark/Light Theme** support
- **Performance Optimized** for fast loading
- **SEO Friendly** structure and content

**🔗 Direct Access:**
- Live project demonstrations
- Downloadable resume and portfolio
- Social media integration
- Real-time contact form
- Technical blog and insights

Experience Dev's work firsthand at **devkantkumar.com** - where innovation meets functionality! ✨`,
      category: "portfolio",
    },

    default: {
      content: `🤔 **Interesting Question!**

I'm constantly learning and evolving to provide better assistance. While I may not have specific information about that topic, I can help you with:

**🔍 Explore These Areas:**
- Dev's technical skills and expertise
- His innovative projects and demonstrations  
- Professional experience and achievements
- Educational background and certifications
- HostelEase startup journey and features
- Contact information and networking

**💡 Try asking:**
"What makes Dev's projects unique?"
"How can Dev contribute to my team?"
"What's special about HostelEase?"

Feel free to explore any aspect of Dev's professional journey! 🚀`,
      category: "general",
    },
  };

  const getAIResponse = (userMessage: string) => {
    const message = userMessage.toLowerCase();

    if (
      message.includes("skill") ||
      message.includes("technology") ||
      message.includes("tech stack") ||
      message.includes("tools")
    ) {
      return aiResponses.skills;
    } else if (
      message.includes("project") ||
      message.includes("work") ||
      message.includes("portfolio") ||
      message.includes("demo") ||
      message.includes("showcase")
    ) {
      return aiResponses.projects;
    } else if (
      message.includes("experience") ||
      message.includes("background") ||
      message.includes("career") ||
      message.includes("journey") ||
      message.includes("internship")
    ) {
      return aiResponses.experience;
    } else if (
      message.includes("contact") ||
      message.includes("hire") ||
      message.includes("reach") ||
      message.includes("email") ||
      message.includes("connect")
    ) {
      return aiResponses.contact;
    } else if (
      message.includes("education") ||
      message.includes("college") ||
      message.includes("degree") ||
      message.includes("study")
    ) {
      return aiResponses.education;
    } else if (
      message.includes("hostel") ||
      message.includes("hostelease") ||
      message.includes("startup") ||
      message.includes("product")
    ) {
      return aiResponses.startup;
    } else if (
      message.includes("website") ||
      message.includes("site") ||
      message.includes("portfolio") ||
      message.includes("profile")
    ) {
      return aiResponses.portfolio;
    } else {
      return aiResponses.default;
    }
  };

  const playNotificationSound = useCallback(() => {
    if (soundEnabled) {
      const audio = new Audio(
        "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhCjuF1+/ENwgiaMLE6pJcGAg+ltryxnwoc8aDzfPZkTs"
      );
      audio.play().catch(() => {}); // Ignore errors
    }
  }, [soundEnabled]);

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputValue;
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    setIsThinking(true);

    // Enhanced AI thinking simulation
    setTimeout(() => {
      const response = getAIResponse(text);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.content,
        sender: "ai",
        timestamp: new Date(),
        category: response.category,
        reactions: { thumbsUp: false, thumbsDown: false },
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
      setIsThinking(false);
      setCurrentCategory(response.category);
      playNotificationSound();
    }, Math.random() * 1000 + 1500); // 1.5-2.5 seconds for more realistic AI thinking
  };

  const handleQuickAction = (action: QuickAction) => {
    handleSendMessage(action.query);
  };

  const clearChat = () => {
    setMessages([messages[0]]); // Keep welcome message
    setCurrentCategory(null);
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content.replace(/<[^>]*>/g, ""));
  };

  const reactToMessage = (
    messageId: string,
    reaction: "thumbsUp" | "thumbsDown"
  ) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? {
              ...msg,
              reactions: {
                ...msg.reactions,
                [reaction]: !msg.reactions?.[reaction],
              },
            }
          : msg
      )
    );
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <>
      {/* Enhanced Chat Toggle Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 2, type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="relative">
          {/* Pulsing background effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-pulse opacity-75"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-ping opacity-50"></div>

          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-400 shadow-2xl hover:shadow-cyan-500/25 transition-all duration-500 border-2 border-white/20 backdrop-blur-sm"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <div className="relative">
                    <MessageCircle className="h-6 w-6" />
                    <motion.div
                      className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </motion.div>

      {/* Advanced Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8, rotateX: -15 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 100, scale: 0.8, rotateX: 15 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed bottom-24 right-6 bg-gray-900/95 backdrop-blur-xl border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/10 z-40 flex flex-col transition-all duration-300 ${
              isMinimized ? "w-80 h-16" : "w-96 h-[32rem]"
            }`}
          >
            {/* Enhanced Header */}
            <div className="p-4 border-b border-cyan-500/20 bg-gradient-to-r from-gray-900/90 to-gray-800/90 rounded-t-2xl backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    <motion.div
                      className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-white flex items-center gap-2">
                      Zayra AI
                      <Sparkles className="h-4 w-4 text-cyan-400" />
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <p className="text-xs text-cyan-300">
                        {isThinking ? "Processing..." : "Online & Ready"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    variant="ghost"
                    size="sm"
                    className="w-8 h-8 p-0 hover:bg-cyan-500/20 text-cyan-300"
                  >
                    {soundEnabled ? (
                      <Volume2 className="h-4 w-4" />
                    ) : (
                      <VolumeX className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    onClick={clearChat}
                    variant="ghost"
                    size="sm"
                    className="w-8 h-8 p-0 hover:bg-cyan-500/20 text-cyan-300"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => setIsMinimized(!isMinimized)}
                    variant="ghost"
                    size="sm"
                    className="w-8 h-8 p-0 hover:bg-cyan-500/20 text-cyan-300"
                  >
                    <motion.div
                      animate={{ rotate: isMinimized ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <X className="h-4 w-4" />
                    </motion.div>
                  </Button>
                </div>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Quick Actions */}
                <div className="p-3 border-b border-cyan-500/10">
                  <div className="grid grid-cols-2 gap-2">
                    {quickActions.map((action) => (
                      <motion.button
                        key={action.id}
                        onClick={() => handleQuickAction(action)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-2 rounded-lg bg-gradient-to-r ${action.gradient} bg-opacity-10 border border-current border-opacity-20 text-xs font-medium text-white hover:bg-opacity-20 transition-all duration-200 flex items-center gap-2`}
                      >
                        {action.icon}
                        {action.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Enhanced Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-cyan-500/30 scrollbar-track-transparent">
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex ${
                        message.sender === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`flex items-start gap-3 max-w-[85%] ${
                          message.sender === "user" ? "flex-row-reverse" : ""
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.sender === "user"
                              ? "bg-gradient-to-r from-purple-500 to-pink-500"
                              : "bg-gradient-to-r from-cyan-500 to-blue-500"
                          }`}
                        >
                          {message.sender === "user" ? (
                            <User className="h-4 w-4 text-white" />
                          ) : (
                            <motion.div
                              animate={
                                isThinking && index === messages.length - 1
                                  ? { rotate: 360 }
                                  : {}
                              }
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            >
                              <Brain className="h-4 w-4 text-white" />
                            </motion.div>
                          )}
                        </div>

                        <div className="flex flex-col gap-2">
                          <div
                            className={`p-4 rounded-2xl backdrop-blur-sm ${
                              message.sender === "user"
                                ? "bg-gradient-to-r from-purple-600/80 to-pink-600/80 text-white border border-purple-500/30"
                                : "bg-gradient-to-r from-gray-800/90 to-gray-700/90 text-gray-100 border border-cyan-500/20"
                            }`}
                          >
                            <div
                              className="text-sm leading-relaxed"
                              dangerouslySetInnerHTML={{
                                __html: formatMessage(message.content),
                              }}
                            />
                            <div className="text-xs opacity-60 mt-2">
                              {message.timestamp.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                          </div>

                          {message.sender === "ai" && message.reactions && (
                            <div className="flex items-center gap-2 ml-2">
                              <Button
                                onClick={() =>
                                  reactToMessage(message.id, "thumbsUp")
                                }
                                variant="ghost"
                                size="sm"
                                className={`w-6 h-6 p-0 hover:bg-green-500/20 ${
                                  message.reactions.thumbsUp
                                    ? "text-green-400"
                                    : "text-gray-500"
                                }`}
                              >
                                <ThumbsUp className="h-3 w-3" />
                              </Button>
                              <Button
                                onClick={() =>
                                  reactToMessage(message.id, "thumbsDown")
                                }
                                variant="ghost"
                                size="sm"
                                className={`w-6 h-6 p-0 hover:bg-red-500/20 ${
                                  message.reactions.thumbsDown
                                    ? "text-red-400"
                                    : "text-gray-500"
                                }`}
                              >
                                <ThumbsDown className="h-3 w-3" />
                              </Button>
                              <Button
                                onClick={() => copyMessage(message.content)}
                                variant="ghost"
                                size="sm"
                                className="w-6 h-6 p-0 hover:bg-cyan-500/20 text-gray-500 hover:text-cyan-400"
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          >
                            <Brain className="h-4 w-4 text-white" />
                          </motion.div>
                        </div>
                        <div className="bg-gradient-to-r from-gray-800/90 to-gray-700/90 p-4 rounded-2xl border border-cyan-500/20">
                          <div className="flex gap-1">
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                className="w-2 h-2 bg-cyan-400 rounded-full"
                                animate={{
                                  scale: [1, 1.5, 1],
                                  opacity: [0.5, 1, 0.5],
                                }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  delay: i * 0.2,
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Enhanced Input */}
                <div className="p-4 border-t border-cyan-500/20 bg-gradient-to-r from-gray-900/90 to-gray-800/90 rounded-b-2xl">
                  <div className="flex gap-3 items-end">
                    <div className="flex-1 relative">
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleSendMessage()
                        }
                        placeholder="Ask me about Dev's expertise..."
                        className="w-full bg-gray-800/50 text-white rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 border border-gray-700/50 backdrop-blur-sm placeholder-gray-400"
                        disabled={isTyping}
                      />
                      <motion.div
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-400"
                        animate={{ opacity: inputValue ? 1 : 0.5 }}
                      >
                        <Sparkles className="h-4 w-4" />
                      </motion.div>
                    </div>
                    <Button
                      onClick={() => handleSendMessage()}
                      disabled={!inputValue.trim() || isTyping}
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed w-12 h-12 rounded-xl transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
                    >
                      <motion.div
                        animate={isTyping ? { rotate: 360 } : { rotate: 0 }}
                        transition={{
                          duration: 1,
                          repeat: isTyping ? Infinity : 0,
                          ease: "linear",
                        }}
                      >
                        <Send className="h-5 w-5" />
                      </motion.div>
                    </Button>
                  </div>

                  {/* AI Status Indicator */}
                  <div className="flex items-center justify-center mt-3">
                    <div className="flex items-center gap-2 text-xs text-cyan-300/70">
                      <motion.div
                        className="w-2 h-2 bg-cyan-400 rounded-full"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      {isThinking ? "AI is thinking..." : "Ready to assist"}
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
