"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import PromptGeneratePanel from "@/components/PromptGeneratePanel";
import RefactorWidget from "@/components/RefactorWidget";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("generate");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Professional Particle system
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
      type: "star" | "sparkle" | "glow";
    }> = [];

    // Initialize particles
    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        size: Math.random() * 3 + 0.5,
        opacity: Math.random() * 0.6 + 0.1,
        color: ["#FFD700", "#FFA500", "#FF8C00"][
          Math.floor(Math.random() * 3)
        ],
        type: ["star", "sparkle", "glow"][
          Math.floor(Math.random() * 3)
        ] as "star" | "sparkle" | "glow",
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Draw different particle types
        if (particle.type === "star") {
          ctx.beginPath();
          for (let i = 0; i < 5; i++) {
            const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
            const x = particle.x + Math.cos(angle) * particle.size;
            const y = particle.y + Math.sin(angle) * particle.size;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.fillStyle = particle.color;
          ctx.globalAlpha = particle.opacity;
          ctx.fill();
        } else if (particle.type === "sparkle") {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.globalAlpha = particle.opacity;
          ctx.fill();

          // Add sparkle lines
          ctx.beginPath();
          ctx.moveTo(particle.x - particle.size * 2, particle.y);
          ctx.lineTo(particle.x + particle.size * 2, particle.y);
          ctx.moveTo(particle.x, particle.y - particle.size * 2);
          ctx.lineTo(particle.x, particle.y + particle.size * 2);
          ctx.strokeStyle = particle.color;
          ctx.globalAlpha = particle.opacity * 0.5;
          ctx.lineWidth = 1;
          ctx.stroke();
        } else {
          // Glow effect
          const gradient = ctx.createRadialGradient(
            particle.x,
            particle.y,
            0,
            particle.x,
            particle.y,
            particle.size * 3,
          );
          gradient.addColorStop(0, particle.color);
          gradient.addColorStop(1, "transparent");
          ctx.fillStyle = gradient;
          ctx.globalAlpha = particle.opacity * 0.3;
          ctx.fillRect(
            particle.x - particle.size * 3,
            particle.y - particle.size * 3,
            particle.size * 6,
            particle.size * 6,
          );
        }
      });

      // Draw connections between nearby particles
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = "#FFD700";
            ctx.globalAlpha = ((120 - distance) / 120) * 0.15;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-black text-white overflow-hidden relative"
    >
      {/* Professional Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 0.4 }}
      />

      {/* Professional Gradient Layers */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,215,0,0.1),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,215,0,0.08),transparent_60%)]"></div>
      </div>

        {/* Animated Grid Pattern */}
        <div
        className="fixed inset-0 opacity-30 z-0"
          style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFD700' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          animation: "gridMove 15s linear infinite",
          }}
        ></div>

      {/* Floating Athena Logos */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
              key={i}
            className="absolute opacity-5"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
            }}
            animate={{
              rotate: [0, 360],
              y: [0, -30, 0],
              x: [0, 20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 25 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
              }}
          >
            <Image
              src="/Athena_logo.png"
              alt="Athena"
              width={80}
              height={80}
              className="opacity-15"
            />
          </motion.div>
          ))}
        </div>

        {/* Lightning Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
              key={i}
            className="absolute w-px bg-gradient-to-b from-transparent via-yellow-400 to-transparent"
              style={{
                left: `${Math.random() * 100}%`,
                height: "100%",
            }}
            animate={{
              opacity: [0, 1, 0],
              scaleY: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: "easeInOut",
              }}
            />
          ))}
      </div>

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section - Professional Layout */}
        <section className="min-h-screen flex flex-col justify-center relative pt-32 pb-32">
          {/* Title Section - Top Half */}
          <div className="text-center z-20 relative mb-20">
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                <motion.h2
                  className="text-8xl font-bold mb-8 font-serif tracking-tight"
                style={{
                    background:
                      "linear-gradient(135deg, #FFD700 0%, #FFA500 25%, #FF8C00 50%, #FFA500 75%, #FFD700 100%)",
                    backgroundSize: "200% 200%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: "0 0 40px rgba(255, 215, 0, 0.4)",
                  }}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  ATHENA
                </motion.h2>

                <motion.p
                  className="text-2xl text-gray-300 mb-16 max-w-5xl mx-auto leading-relaxed font-light"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                >
                  An AI powered companion that creates a website UI in seconds
                </motion.p>

                {/* Feature Pills - Professional Styling */}
                <motion.div
                  className="flex flex-wrap justify-center gap-4 mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                >
                  {[
                    "⚡ Lightning Fast",
                    "🧠 AI Powered",
                    "🎯 Code Generation",
                    "🔧 Smart Refactoring",
                    "📊 PR Reviews",
                    "🎤 Voice Control",
                  ].map((feature, index) => (
                    <motion.div
                      key={feature}
                      className="px-6 py-3 bg-gradient-to-r from-yellow-600/15 to-amber-600/15 border border-yellow-400/25 rounded-xl text-yellow-200 backdrop-blur-sm text-base font-medium shadow-lg hover:shadow-yellow-400/20 transition-all duration-300"
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(255, 215, 0, 0.2)",
                        borderColor: "rgba(255, 215, 0, 0.5)",
                        y: -2,
                      }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: 1.2 + index * 0.1,
                        ease: "easeOut",
                      }}
                    >
                      {feature}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>
                </div>

          {/* Large Logo Display */}
          <div className="flex justify-center items-center relative">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.8, delay: 1.5, ease: "easeOut" }}
            >
              <motion.div
                className="absolute inset-0 w-64 h-64 bg-gradient-to-r from-yellow-400/20 to-amber-500/20 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <Image
                src="/Athena_logo.png"
                alt="Athena"
                width={240}
                height={240}
                className="drop-shadow-2xl relative z-10"
              />
            </motion.div>
          </div>
        </section>

        {/* Tab Navigation - Professional Styling */}
        <motion.div
          className="flex justify-center mb-16 relative z-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="bg-gray-900/70 backdrop-blur-xl rounded-2xl p-2 flex border border-yellow-400/25 shadow-2xl">
            <motion.button
              onClick={() => setActiveTab("generate")}
              className={`px-10 py-4 rounded-xl font-semibold transition-all relative overflow-hidden ${
                activeTab === "generate"
                  ? "bg-gradient-to-r from-yellow-500 to-amber-600 text-black shadow-xl"
                  : "text-gray-300 hover:text-white"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {activeTab === "generate" && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500"
                  layoutId="activeTab"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">Code Generation</span>
            </motion.button>
            <motion.button
              onClick={() => setActiveTab("refactor")}
              className={`px-10 py-4 rounded-xl font-semibold transition-all relative overflow-hidden ${
                activeTab === "refactor"
                  ? "bg-gradient-to-r from-yellow-500 to-amber-600 text-black shadow-xl"
                  : "text-gray-300 hover:text-white"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {activeTab === "refactor" && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500"
                  layoutId="activeTab"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">Code Refactoring</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Content Area - Professional Layout */}
        <div className="max-w-6xl mx-auto px-8 relative z-20 mb-32">
          <AnimatePresence mode="wait">
            {activeTab === "generate" && (
              <motion.div
                key="generate"
                className="space-y-10"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="text-center mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h3 className="text-4xl font-bold mb-6 text-yellow-400">
                    Generate Code with AI
                  </h3>
                  <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
                    Describe what you want to build and let Athena create the code for you.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <PromptGeneratePanel />
                </motion.div>
              </motion.div>
            )}

            {activeTab === "refactor" && (
              <motion.div
                key="refactor"
                className="space-y-10"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="text-center mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h3 className="text-4xl font-bold mb-6 text-yellow-400">
                    Refactor Your Code
                  </h3>
                  <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
                    Select code and provide refactoring instructions to improve your existing code.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <RefactorWidget />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer - Professional */}
      <motion.footer
        className="border-t border-yellow-400/20 mt-32 relative z-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-gray-400">
            <motion.div
              className="flex items-center justify-center space-x-3 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center shadow-md">
                <Image
                  src="/Athena_logo.png"
                  alt="Athena"
                  width={16}
                  height={16}
                  className="opacity-80"
                />
              </div>
              <p className="text-lg font-medium">&copy; 2024 Athena. AI-powered development assistant.</p>
            </motion.div>
          </div>
        </div>
      </motion.footer>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
}
