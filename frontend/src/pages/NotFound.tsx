import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Home,
  Search,
  AlertTriangle,
  Cpu,
  Zap,
  RefreshCw,
  ArrowLeft,
  Globe,
  Code2,
  Database,
  Shield,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Simulated location hook for demo
const useLocation = () => ({ pathname: "/non-existent-page" });

// Advanced 3D Holographic 404 Display
const Holographic404 = React.memo(() => {
  const [glitchIntensity, setGlitchIntensity] = useState(0);
  const [scanLines, setScanLines] = useState(0);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchIntensity(Math.random());
    }, 150);

    const scanInterval = setInterval(() => {
      setScanLines((prev) => (prev + 1) % 100);
    }, 50);

    return () => {
      clearInterval(glitchInterval);
      clearInterval(scanInterval);
    };
  }, []);

  return (
    <div className="relative">
      {/* Main 404 Display */}
      <div
        className="text-9xl md:text-[12rem] font-black bg-gradient-to-b from-red-400 via-purple-500 to-blue-600 bg-clip-text text-transparent"
        style={{
          filter: `hue-rotate(${glitchIntensity * 360}deg) saturate(${
            1 + glitchIntensity * 2
          })`,
          textShadow: `
            ${glitchIntensity * 10}px 0 #ff0000,
            ${-glitchIntensity * 10}px 0 #00ffff,
            0 0 ${glitchIntensity * 50}px rgba(255, 0, 255, 0.5)
          `,
        }}
      >
        404
      </div>

      {/* Holographic Scan Lines */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60"
            style={{
              top: `${(scanLines + i * 20) % 100}%`,
              animation: `scanLine 3s linear infinite ${i * 0.6}s`,
            }}
          />
        ))}
      </div>

      {/* Digital Artifacts */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-red-500 opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `digitalNoise 0.1s infinite ${Math.random()}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
});

Holographic404.displayName = "Holographic404";

// Quantum Circuit Background
const QuantumCircuit = React.memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const nodes = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
      hue: Math.random() * 360,
      energy: Math.random(),
    }));

    const animate = () => {
      time += 0.016;
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw nodes
      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;
        node.energy = Math.sin(time * 2 + i) * 0.5 + 0.5;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Draw node
        ctx.save();
        ctx.globalAlpha = node.energy;
        ctx.fillStyle = `hsl(${node.hue + time * 50}, 100%, 60%)`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Draw connections
        nodes.forEach((otherNode, j) => {
          if (i >= j) return;

          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const opacity = (1 - distance / 150) * 0.3 * node.energy;
            ctx.save();
            ctx.globalAlpha = opacity;
            ctx.strokeStyle = `hsl(${
              (node.hue + otherNode.hue) / 2
            }, 100%, 60%)`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.stroke();
            ctx.restore();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-30"
    />
  );
});

QuantumCircuit.displayName = "QuantumCircuit";

// Neural Activity Monitor
const NeuralMonitor = React.memo(() => {
  const [activity, setActivity] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivity((prev) => {
        const newActivity = [...prev, Math.random() * 100];
        return newActivity.slice(-50); // Keep last 50 readings
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black/50 backdrop-blur-md rounded-xl p-4 border border-green-500/30">
      <div className="flex items-center space-x-2 mb-3">
        <Terminal className="w-4 h-4 text-green-400" />
        <span className="text-green-400 font-mono text-sm">
          NEURAL_ACTIVITY.log
        </span>
      </div>

      <div className="h-20 flex items-end space-x-1">
        {activity.map((value, i) => (
          <div
            key={i}
            className="bg-gradient-to-t from-green-600 to-green-400 w-2 transition-all duration-100"
            style={{ height: `${value}%` }}
          />
        ))}
      </div>

      <div className="mt-2 text-xs text-green-400/70 font-mono">
        ERROR_404: PATHWAY_NOT_FOUND
      </div>
    </div>
  );
});

NeuralMonitor.displayName = "NeuralMonitor";

// Quantum Navigation Suggestions
const NavigationSuggestions = React.memo(() => {
  const suggestions = [
    { icon: Home, label: "Neural Core", path: "/", color: "blue" },
    { icon: Code2, label: "Code Matrix", path: "/projects", color: "purple" },
    { icon: Cpu, label: "Bio Data", path: "/about", color: "emerald" },
    { icon: Globe, label: "Comms Hub", path: "/contact", color: "pink" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {suggestions.map((item, index) => {
        const Icon = item.icon;
        const colors = {
          blue: "from-blue-500 to-cyan-500",
          purple: "from-purple-500 to-pink-500",
          emerald: "from-emerald-500 to-teal-500",
          pink: "from-pink-500 to-rose-500",
        };

        return (
          <button
            key={index}
            onClick={() => (window.location.href = item.path)}
            className="group relative p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105"
            style={{
              animation: `quantumFade 0.6s ease-out ${index * 0.1}s both`,
            }}
          >
            {/* Holographic Overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${
                colors[item.color as keyof typeof colors]
              } opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300`}
            />

            {/* Icon */}
            <Icon
              className={`w-8 h-8 mx-auto mb-2 text-white/70 group-hover:text-white transition-colors duration-300`}
            />

            {/* Label */}
            <div className="text-sm font-medium text-white/80 group-hover:text-white transition-colors duration-300">
              {item.label}
            </div>

            {/* Quantum Particles */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute w-1 h-1 bg-gradient-to-r ${
                    colors[item.color as keyof typeof colors]
                  } rounded-full`}
                  style={{
                    top: "20%",
                    left: "20%",
                    animation: `quantumOrbit 2s linear infinite ${i * 0.5}s`,
                    transformOrigin: "20px 20px",
                  }}
                />
              ))}
            </div>
          </button>
        );
      })}
    </div>
  );
});

NavigationSuggestions.displayName = "NavigationSuggestions";

// Main 404 Component
const FuturisticNotFound = () => {
  const location = useLocation();
  const [diagnosticsRunning, setDiagnosticsRunning] = useState(true);
  const [systemStatus, setSystemStatus] = useState<string[]>([]);

  useEffect(() => {
    // Enhanced error logging with analytics
    console.group("🚨 QUANTUM NAVIGATION ERROR");
    console.error("404 Error: Quantum pathway not found:", location.pathname);
    console.info("User Agent:", navigator.userAgent);
    console.info("Timestamp:", new Date().toISOString());
    console.info("Referrer:", document.referrer || "Direct Access");
    console.groupEnd();

    // Simulate system diagnostics
    const diagnosticMessages = [
      "INITIALIZING QUANTUM DIAGNOSTICS...",
      "SCANNING NEURAL PATHWAYS...",
      "ANALYZING ROUTE MATRIX...",
      "CHECKING DIMENSIONAL INTEGRITY...",
      "ERROR: PATHWAY NOT FOUND IN QUANTUM SPACE",
      "ACTIVATING RECOVERY PROTOCOLS...",
      "SYSTEM READY FOR MANUAL NAVIGATION",
    ];

    let messageIndex = 0;
    const interval = setInterval(() => {
      if (messageIndex < diagnosticMessages.length) {
        setSystemStatus((prev) => [...prev, diagnosticMessages[messageIndex]]);
        messageIndex++;
      } else {
        setDiagnosticsRunning(false);
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [location.pathname]);

  return (
    <>
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "404 - Quantum Pathway Not Found",
            description:
              "Advanced 404 error page with quantum diagnostics and neural navigation recovery",
            mainEntity: {
              "@type": "Thing",
              name: "404 Error",
              description:
                "Page not found - redirecting to quantum navigation matrix",
            },
          }),
        }}
      />

      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Quantum Circuit Background */}
        <QuantumCircuit />

        {/* Neural Grid Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px, 100px 100px, 20px 20px, 20px 20px",
          }}
        />

        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
          {/* Header with System Status */}
          <div className="w-full max-w-6xl mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-6 h-6 text-red-400 animate-pulse" />
                <span className="text-red-400 font-mono text-sm">
                  SYSTEM_ALERT
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {diagnosticsRunning ? (
                  <RefreshCw className="w-4 h-4 text-blue-400 animate-spin" />
                ) : (
                  <Shield className="w-4 h-4 text-green-400" />
                )}
                <span className="text-xs text-white/60 font-mono">
                  {diagnosticsRunning ? "DIAGNOSING..." : "READY"}
                </span>
              </div>
            </div>
          </div>

          {/* Central 404 Display */}
          <div className="text-center mb-12">
            <Holographic404 />

            {/* Error Description */}
            <div className="mt-8 max-w-2xl mx-auto">
              <h1 className="text-2xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Quantum Pathway Not Found
              </h1>
              <p className="text-white/70 text-lg mb-6 leading-relaxed">
                The requested neural pathway{" "}
                <code className="bg-white/10 px-2 py-1 rounded text-cyan-400 font-mono">
                  {location.pathname}
                </code>{" "}
                does not exist in our quantum matrix. Our AI systems are
                redirecting you to available dimensions.
              </p>
            </div>
          </div>

          {/* System Diagnostics Grid */}
          <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            {/* Neural Activity Monitor */}
            <div className="lg:col-span-2">
              <NeuralMonitor />
            </div>

            {/* System Status Console */}
            <div className="bg-black/50 backdrop-blur-md rounded-xl p-4 border border-blue-500/30">
              <div className="flex items-center space-x-2 mb-3">
                <Cpu className="w-4 h-4 text-blue-400" />
                <span className="text-blue-400 font-mono text-sm">
                  DIAGNOSTICS.sys
                </span>
              </div>

              <div className="h-32 overflow-y-auto font-mono text-xs space-y-1">
                {systemStatus.map((message, i) => (
                  <div
                    key={i}
                    className={`${
                      message.includes("ERROR")
                        ? "text-red-400"
                        : message.includes("READY")
                        ? "text-green-400"
                        : "text-blue-400/80"
                    }`}
                  >
                    {">"} {message}
                  </div>
                ))}
                {diagnosticsRunning && (
                  <div className="text-yellow-400 animate-pulse">{">"} _</div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Recovery Matrix */}
          <div className="w-full max-w-4xl">
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold text-white mb-2">
                Quantum Navigation Recovery
              </h2>
              <p className="text-white/60 text-sm">
                Select a neural pathway to continue your journey through our
                digital matrix
              </p>
            </div>

            <NavigationSuggestions />

            {/* Emergency Return Protocol */}
            <div className="text-center mt-8">
              <button
                onClick={() => window.history.back()}
                className="group inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-300 hover:scale-105 font-medium"
              >
                <ArrowLeft className="w-5 h-5 group-hover:animate-pulse" />
                <span>Return to Previous Dimension</span>
              </button>
            </div>
          </div>

          {/* Footer Analytics */}
          <div className="mt-12 text-center">
            <p className="text-white/40 text-xs font-mono">
              ERROR_CODE: QNF_404 | TIMESTAMP: {new Date().toISOString()} |
              DIMENSION: PRIME_REALITY
            </p>
          </div>
        </div>

        {/* Global Styles */}
        <style jsx global>{`
          @keyframes scanLine {
            0% {
              opacity: 0;
              transform: translateY(-10px);
            }
            50% {
              opacity: 1;
              transform: translateY(0);
            }
            100% {
              opacity: 0;
              transform: translateY(10px);
            }
          }

          @keyframes digitalNoise {
            0%,
            100% {
              opacity: 0.3;
              transform: scale(1);
            }
            50% {
              opacity: 0.8;
              transform: scale(1.5);
            }
          }

          @keyframes quantumFade {
            from {
              opacity: 0;
              transform: translateY(30px) rotateX(90deg);
            }
            to {
              opacity: 1;
              transform: translateY(0) rotateX(0deg);
            }
          }

          @keyframes quantumOrbit {
            from {
              transform: rotate(0deg) translateX(20px) rotate(0deg);
            }
            to {
              transform: rotate(360deg) translateX(20px) rotate(-360deg);
            }
          }

          /* Custom scrollbar for diagnostics */
          .overflow-y-auto::-webkit-scrollbar {
            width: 4px;
          }

          .overflow-y-auto::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.2);
            border-radius: 2px;
          }

          .overflow-y-auto::-webkit-scrollbar-thumb {
            background: linear-gradient(45deg, #3b82f6, #8b5cf6);
            border-radius: 2px;
          }
        `}</style>
      </div>
    </>
  );
};

export default FuturisticNotFound;
