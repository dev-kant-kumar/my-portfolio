import React, { useState, useEffect, useRef, memo } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, Download, ExternalLink, Sun, Moon } from "lucide-react";
import resume from "../assets/documents/resume.pdf";
import DevImg from "../../public/dev.jpg";

interface NavItem {
  id: string;
  label: string;
  icon: string;
}

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: "◊" },
  { id: "about", label: "About", icon: "◎" },
  { id: "projects", label: "Projects", icon: "◈" },
  { id: "contact", label: "Contact", icon: "◉" },
];

const Navigation = memo(() => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0,0,0,0)", "rgba(15,23,42,0.85)"] // Updated for better transparency
  );

  const blurEffect = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(10px)"]
  );

  const paddingX = useTransform(
    scrollY,
    [0, 100],
    ["1.5rem", "0.75rem"] // 24px to 12px
  );

  const borderRadius = useTransform(scrollY, [0, 100], ["0px", "16px"]);

  const marginX = useTransform(scrollY, [0, 100], ["0px", "1rem"]);

  const navScale = useTransform(scrollY, [0, 100], [1, 0.96]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.id);
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const mobileItemVariants = {
    closed: { x: 20, opacity: 0 },
    open: { x: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 flex justify-center"
      style={{
        paddingLeft: marginX,
        paddingRight: marginX,
      }}
    >
      <motion.nav
        ref={navRef}
        style={{
          backgroundColor,
          backdropFilter: blurEffect,
          scale: navScale,
          borderRadius,
          paddingLeft: paddingX,
          paddingRight: paddingX,
          width: "100%",
        }}
        className="transition-all duration-300 border border-white/5"
        initial={false}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-[4.5rem] transition-all duration-300">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-4"
            >
              <motion.div
                className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/30"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <img
                  src={DevImg}
                  alt="Dev"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <motion.span
                className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                whileHover={{ scale: 1.1 }}
              >
                Dev
              </motion.span>
            </motion.div>

            <motion.div
              className="hidden lg:flex items-center space-x-8"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
            >
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.1 }}
                  className={`relative px-4 py-2 rounded-lg ${
                    activeSection === item.id
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  }`}
                  onClick={() => {
                    document
                      .getElementById(item.id)
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-primary/10 rounded-lg -z-10"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  <span className="relative z-10 flex items-center space-x-2">
                    <span className="text-sm">{item.icon}</span>
                    <span>{item.label}</span>
                  </span>
                </motion.button>
              ))}
            </motion.div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-3 lg:hidden">
              <motion.a
                href={resume}
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-primary/10 hover:bg-primary/20 border-primary/20"
                >
                  <Download className="w-4 h-4" />
                </Button>
              </motion.a>

              <motion.button
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMobileMenuOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </motion.div>
              </motion.button>
            </div>

            {/* Action Buttons - keeping existing code */}
            <div className="hidden lg:flex items-center space-x-4">
              <motion.a
                href={resume}
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  className="bg-primary/10 hover:bg-primary/20"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Resume
                </Button>
              </motion.a>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                variants={mobileMenuVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="lg:hidden fixed inset-x-4 top-20 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden z-40"
              >
                <div className="flex flex-col p-4 space-y-3">
                  {navItems.map((item) => (
                    <motion.button
                      key={item.id}
                      variants={mobileItemVariants}
                      whileHover={{ scale: 1.02 }}
                      className={`px-4 py-3 rounded-xl backdrop-blur-sm border border-white/5 transition-all duration-300
                        ${
                          activeSection === item.id
                            ? "bg-white/10 text-white"
                            : "bg-white/5 text-white/80 hover:bg-white/10"
                        }`}
                      onClick={() => {
                        document
                          .getElementById(item.id)
                          ?.scrollIntoView({ behavior: "smooth" });
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <span className="flex items-center justify-center space-x-3">
                        <span className="text-base">{item.icon}</span>
                        <span className="text-base font-medium">
                          {item.label}
                        </span>
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </motion.div>
  );
});

Navigation.displayName = "Navigation";

export default Navigation;
