import React, { useState, useEffect, useRef } from "react";
import {
  Github,
  Linkedin,
  Youtube,
  Mail,
  MapPin,
  Clock,
  Phone,
  Send,
  Globe,
  MessageCircle,
  Camera,
  Code,
  Users,
  Star,
  Zap,
  Heart,
  Coffee,
  Twitch,
  ExternalLink,
  Check,
  Sparkles,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";

// Validation schema
const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().optional(),
  budget: z.string().optional(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
});

type FormData = z.infer<typeof formSchema>;

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const [submitted, setSubmitted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeCard, setActiveCard] = useState("");
  const sectionRef = useRef(null);

  // Advanced mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener("mousemove", handleMouseMove);
      return () => section.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  // Replace existing form submission logic
  const onSubmit = async (data: FormData) => {
    try {
      const phoneNumber = "917294177563";
      const whatsappMessage = `🚀 *New Project Inquiry*%0A%0A*From:* ${
        data.name
      }%0A*Email:* ${data.email}%0A*Subject:* ${
        data.subject || "General Inquiry"
      }%0A*Budget Range:* ${
        data.budget || "To be discussed"
      }%0A%0A*Message:*%0A${encodeURIComponent(
        data.message
      )}%0A%0A✨ *Ready to create something amazing together!*`;

      const whatsappURL = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
      window.open(whatsappURL, "_blank");

      // Reset form after successful submission
      reset();
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Comprehensive social media links organized by category
  const socialCategories = {
    professional: [
      {
        name: "GitHub",
        icon: Github,
        url: "https://github.com/dev-kant-kumar",
        color: "from-gray-600 to-gray-800",
        description: "Open Source Projects",
      },
      {
        name: "LinkedIn",
        icon: Linkedin,
        url: "https://linkedin.com/in/devkantkumar",
        color: "from-blue-600 to-blue-800",
        description: "Professional Network",
      },
    ],
    creative: [
      {
        name: "Instagram",
        icon: Camera,
        url: "https://instagram.com/devkantkumar.in",
        color: "from-pink-500 to-purple-600",
        description: "Creative Content",
      },
      {
        name: "YouTube",
        icon: Youtube,
        url: "https://www.youtube.com/@dev-kant-kumar",
        color: "from-red-500 to-red-700",
        description: "Tech Tutorials",
      },
      {
        name: "TikTok",
        icon: Zap,
        url: "https://tiktok.com/@devkantkumar.in",
        color: "from-purple-500 to-pink-600",
        description: "Quick Tech Tips",
      },
      {
        name: "Twitch",
        icon: Twitch,
        url: "https://twitch.tv/imdevkantkumar",
        color: "from-purple-600 to-purple-800",
        description: "Live Coding",
      },
    ],
    community: [
      {
        name: "Discord",
        icon: MessageCircle,
        url: "https://discord.com/users/devkantkumar.in",
        color: "from-indigo-500 to-indigo-700",
        description: "Dev Community",
      },
      {
        name: "Telegram",
        icon: Send,
        url: "https://t.me/devkantkumar",
        color: "from-cyan-500 to-blue-600",
        description: "Direct Chat",
      },
      {
        name: "Reddit",
        icon: Users,
        url: "https://reddit.com/user/dev_kant_kumar",
        color: "from-orange-500 to-red-600",
        description: "Tech Discussions",
      },
    ],
  };

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "dev.techdeveloper@gmail.com",
      href: "mailto:dev.techdeveloper@gmail.com",
    },
    {
      icon: Phone,
      label: "WhatsApp",
      value: "+91 7294177563",
      href: "https://wa.me/917294177563",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Available Worldwide (Remote)",
      href: null,
    },
    {
      icon: Clock,
      label: "Response Time",
      value: "Within 2-4 hours",
      href: null,
    },
  ];

  const budgetRanges = [
    "$500 - $2,000",
    "$2,000 - $5,000",
    "$5,000 - $10,000",
    "$10,000+",
    "Let's Discuss",
  ];

  return (
    <>
      <section
        id="contact"
        ref={sectionRef}
        className="relative min-h-screen py-20 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900"
        role="main"
        aria-label="Contact section"
      >
        {/* Dynamic Background Effects */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle 1000px at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.2), transparent 60%)`,
          }}
        />

        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[linear-gradient(rgba(147,51,234,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.1)_1px,transparent_1px)] bg-[size:60px_60px] animate-pulse" />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-purple-400/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Let's Build Something Amazing Together
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              Let's{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Connect
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Ready to transform your vision into reality? I'm here to help you
              build cutting-edge digital experiences that drive results and
              captivate users.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Enhanced Contact Form */}
            <div className="lg:col-span-2">
              <div
                className="relative p-8 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl hover:border-purple-500/50 transition-all duration-500 group"
                onMouseEnter={() => setActiveCard("form")}
                onMouseLeave={() => setActiveCard("")}
              >
                {/* Card Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-cyan-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl">
                      <Send className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-white">
                        Start Your Project
                      </h2>
                      <p className="text-slate-400">
                        Tell me about your vision
                      </p>
                    </div>
                  </div>

                  {/* Form Section */}
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">
                          Full Name *
                        </label>
                        <div className="relative">
                          <input
                            {...register("name")}
                            type="text"
                            placeholder="Your full name"
                            className={cn(
                              "w-full p-3 sm:p-4 bg-slate-900/50 border rounded-xl text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300",
                              errors.name
                                ? "border-red-500"
                                : "border-slate-600"
                            )}
                          />
                          {errors.name && (
                            <span className="absolute -bottom-5 left-0 text-xs text-red-400">
                              {errors.name.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">
                          Email Address *
                        </label>
                        <div className="relative">
                          <input
                            {...register("email")}
                            type="email"
                            placeholder="your@email.com"
                            className={cn(
                              "w-full p-3 sm:p-4 bg-slate-900/50 border rounded-xl text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300",
                              errors.email
                                ? "border-red-500"
                                : "border-slate-600"
                            )}
                          />
                          {errors.email && (
                            <span className="absolute -bottom-5 left-0 text-xs text-red-400">
                              {errors.email.message}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">
                          Project Subject
                        </label>
                        <input
                          {...register("subject")}
                          type="text"
                          placeholder="e.g., E-commerce Website"
                          className="w-full p-3 sm:p-4 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">
                          Budget Range
                        </label>
                        <select
                          {...register("budget")}
                          className="w-full p-3 sm:p-4 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                        >
                          <option value="">Select budget range</option>
                          {budgetRanges.map((range) => (
                            <option key={range} value={range}>
                              {range}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">
                        Project Details *
                      </label>
                      <div className="relative">
                        <textarea
                          {...register("message")}
                          placeholder="Tell me about your project, goals, timeline, and any specific requirements..."
                          rows={6}
                          className={cn(
                            "w-full p-3 sm:p-4 bg-slate-900/50 border rounded-xl text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none",
                            errors.message
                              ? "border-red-500"
                              : "border-slate-600"
                          )}
                        />
                        {errors.message && (
                          <span className="absolute -bottom-5 left-0 text-xs text-red-400">
                            {errors.message.message}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full p-3 sm:p-4 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : submitted ? (
                        <>
                          <Check className="w-5 h-5" />
                          Message Sent!
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message via WhatsApp
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Contact Info & Social Links - Responsive layout */}
            <div className="space-y-4 sm:space-y-6 lg:space-y-8">
              {/* Quick Contact Methods */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {contactMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <div key={method.label} className="group">
                      {method.href ? (
                        <a
                          href={method.href}
                          target={
                            method.href.startsWith("http")
                              ? "_blank"
                              : undefined
                          }
                          rel={
                            method.href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-xl hover:bg-slate-900/70 transition-all duration-300 hover:scale-105"
                        >
                          <div className="p-2 bg-purple-500/20 rounded-lg">
                            <Icon className="w-5 h-5 text-purple-400" />
                          </div>
                          <div>
                            <div className="text-sm text-slate-400">
                              {method.label}
                            </div>
                            <div className="text-white font-medium">
                              {method.value}
                            </div>
                          </div>
                          <ExternalLink className="w-4 h-4 text-slate-500 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      ) : (
                        <div className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-xl">
                          <div className="p-2 bg-purple-500/20 rounded-lg">
                            <Icon className="w-5 h-5 text-purple-400" />
                          </div>
                          <div>
                            <div className="text-sm text-slate-400">
                              {method.label}
                            </div>
                            <div className="text-white font-medium">
                              {method.value}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Social Categories - Responsive grid */}
              {Object.entries(socialCategories).map(([category, links]) => (
                <div key={category} className="space-y-4">
                  <div className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl hover:border-purple-500/50 transition-all duration-300">
                    <h3 className="text-xl font-bold text-white mb-4 capitalize flex items-center gap-2">
                      {category === "professional" && (
                        <Code className="w-5 h-5 text-purple-400" />
                      )}
                      {category === "creative" && (
                        <Camera className="w-5 h-5 text-purple-400" />
                      )}
                      {category === "community" && (
                        <Users className="w-5 h-5 text-purple-400" />
                      )}
                      {category} Network
                    </h3>

                    <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3">
                      {links.map((social) => {
                        const Icon = social.icon;
                        return (
                          <a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group p-4 bg-slate-900/50 rounded-xl hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
                          >
                            <div
                              className={`p-2 rounded-lg bg-gradient-to-r ${social.color} mb-2 group-hover:scale-110 transition-transform duration-300`}
                            >
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="text-white font-medium text-sm">
                              {social.name}
                            </div>
                            <div className="text-slate-400 text-xs">
                              {social.description}
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}

              {/* CTA Card */}
              <div className="p-6 bg-gradient-to-br from-purple-500/20 via-transparent to-cyan-500/20 border border-purple-500/30 rounded-2xl backdrop-blur-xl">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Ready to Start?
                  </h3>
                  <p className="text-slate-300 mb-4 text-sm">
                    Let's schedule a free consultation to discuss your project
                    and explore how we can bring your vision to life.
                  </p>
                  <a
                    href="https://wa.me/917294177563?text=Hi%20Dev%20Kant%2C%20I%20found%20your%20portfolio%20and%20I%E2%80%99m%20interested%20in%20discussing%20a%20project.%20Could%20we%20schedule%20a%20free%20consultation%3F"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/25"
                  >
                    <Coffee className="w-4 h-4" />
                    Free Consultation
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Glow */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-60" />
      </section>
    </>
  );
};

export default Contact;
