"use client";

import React, { useEffect, useState } from "react";
import PromptGeneratePanel from "@/components/PromptGeneratePanel";
import RefactorWidget from "@/components/RefactorWidget";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0">
        {/* Multiple Gradient Layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,215,0,0.15),transparent_40%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,215,0,0.1),transparent_40%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02),transparent_60%)]"></div>

        {/* Animated Grid Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFD700' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            animation: "gridMove 20s linear infinite",
          }}
        ></div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(80)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full animate-pulse ${
                i % 3 === 0
                  ? "w-2 h-2 bg-yellow-400"
                  : i % 3 === 1
                    ? "w-1 h-1 bg-amber-300"
                    : "w-0.5 h-0.5 bg-yellow-200"
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${1.5 + Math.random() * 3}s`,
                filter: "blur(0.5px)",
              }}
            />
          ))}
        </div>

        {/* Lightning Effects */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-px bg-gradient-to-b from-transparent via-yellow-400 to-transparent opacity-0 animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                height: "100%",
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: "1.5s",
              }}
            />
          ))}
        </div>

        {/* Floating Geometric Shapes */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className={`absolute opacity-20 animate-spin ${
                i % 3 === 0
                  ? "border-2 border-yellow-400 w-8 h-8"
                  : i % 3 === 1
                    ? "border border-amber-300 w-6 h-6"
                    : "border border-yellow-200 w-4 h-4"
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${15 + Math.random() * 20}s`,
                animationDirection: i % 2 === 0 ? "normal" : "reverse",
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="min-h-screen flex items-center justify-center relative">
          {/* Central Orb System */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Outer Orbital Rings */}
              <div
                className="absolute inset-0 w-[500px] h-[500px] border border-yellow-400/30 rounded-full animate-spin"
                style={{ animationDuration: "30s" }}
              ></div>
              <div
                className="absolute inset-0 w-[500px] h-[500px] border border-yellow-400/20 rounded-full animate-spin"
                style={{
                  animationDuration: "30s",
                  animationDirection: "reverse",
                }}
              ></div>

              {/* Middle Rings */}
              <div
                className="absolute inset-0 w-[400px] h-[400px] border border-amber-300/40 rounded-full animate-spin"
                style={{ animationDuration: "25s" }}
              ></div>
              <div
                className="absolute inset-0 w-[300px] h-[300px] border border-yellow-300/30 rounded-full animate-spin"
                style={{
                  animationDuration: "20s",
                  animationDirection: "reverse",
                }}
              ></div>

              {/* Inner Glow Rings */}
              <div className="absolute inset-0 w-[200px] h-[200px] bg-gradient-to-r from-yellow-400/20 to-amber-500/20 rounded-full animate-pulse blur-sm"></div>
              <div
                className="absolute inset-0 w-[150px] h-[150px] bg-gradient-to-r from-amber-400/30 to-yellow-500/30 rounded-full animate-pulse blur-sm"
                style={{ animationDelay: "0.5s" }}
              ></div>

              {/* Central Core */}
              <div className="relative w-32 h-32 bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                {/* Inner Core */}
                <div className="w-20 h-20 bg-gradient-to-br from-white via-yellow-50 to-amber-100 rounded-full flex items-center justify-center shadow-inner">
                  {/* Athena Icon */}
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-600 to-amber-700 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  </div>
                </div>

                {/* Orbital Dots */}
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-3 h-3 bg-yellow-400 rounded-full animate-pulse"
                    style={{
                      left: "50%",
                      top: "50%",
                      transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-80px)`,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center z-20">
            <h1
              className={`text-8xl font-bold mb-8 transition-all duration-1000 ${
                mounted
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform translate-y-10"
              }`}
              style={{
                background:
                  "linear-gradient(45deg, #FFD700, #FFA500, #FFD700, #FFF8DC)",
                backgroundSize: "400% 400%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "gradientShift 3s ease-in-out infinite",
              }}
            >
              ATHENA
            </h1>

            <p
              className={`text-2xl text-yellow-200 mb-12 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-500 ${
                mounted
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform translate-y-10"
              }`}
            >
              The divine AI companion that transforms your code with godly
              wisdom and lightning-fast intelligence
            </p>

            {/* Feature Pills */}
            <div
              className={`flex items-center justify-center space-x-8 transition-all duration-1000 delay-1000 ${
                mounted
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform translate-y-10"
              }`}
            >
              {[
                {
                  text: "⚡ Lightning Fast",
                  color: "from-yellow-400 to-amber-500",
                },
                {
                  text: "🎯 Divine Precision",
                  color: "from-amber-500 to-yellow-600",
                },
                {
                  text: "🧠 Godly Intelligence",
                  color: "from-yellow-600 to-amber-700",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className={`px-6 py-3 rounded-full bg-gradient-to-r ${feature.color} text-white font-semibold shadow-lg hover:scale-110 transition-transform duration-300 animate-bounce`}
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  {feature.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Tools Section */}
        <div className="container mx-auto px-4 py-20">
          <div className="grid gap-12 lg:grid-cols-2 max-w-7xl mx-auto">
            {/* Code Generation Panel */}
            <div className="group">
              <div className="relative">
                {/* Glowing Border */}
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Main Card */}
                <div className="relative bg-black/80 backdrop-blur-xl rounded-3xl border border-yellow-400/30 p-8 shadow-2xl hover:shadow-yellow-500/25 transition-all duration-500 group-hover:scale-105">
                  <div className="absolute top-4 right-4 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                  <PromptGeneratePanel />
                </div>
              </div>
            </div>

            {/* Refactor Widget */}
            <div className="group">
              <div className="relative">
                {/* Glowing Border */}
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-yellow-600 to-amber-700 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Main Card */}
                <div className="relative bg-black/80 backdrop-blur-xl rounded-3xl border border-yellow-400/30 p-8 shadow-2xl hover:shadow-yellow-500/25 transition-all duration-500 group-hover:scale-105">
                  <div className="absolute top-4 right-4 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                  <RefactorWidget />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divine Features */}
        <div className="py-20">
          <h2
            className={`text-5xl font-bold text-center mb-16 transition-all duration-1000 ${
              mounted
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-10"
            }`}
            style={{
              background: "linear-gradient(45deg, #FFD700, #FFA500)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Divine Powers
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
            {[
              {
                icon: "⚡",
                title: "Lightning Generation",
                description:
                  "Streaming AI responses that flow like divine lightning, illuminating your code with instant wisdom.",
              },
              {
                icon: "🎯",
                title: "Precision Refactoring",
                description:
                  "Surgical code improvements guided by Athena's divine intelligence and best practices.",
              },
              {
                icon: "👁️",
                title: "Omniscient Reviews",
                description:
                  "All-seeing PR analysis with godly insights and risk assessment beyond mortal comprehension.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className={`group bg-black/60 backdrop-blur-xl rounded-2xl p-8 border border-yellow-400/20 hover:border-yellow-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/20 ${
                  mounted
                    ? "opacity-100 transform translate-y-0"
                    : "opacity-0 transform translate-y-10"
                }`}
                style={{ transitionDelay: `${i * 200}ms` }}
              >
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-yellow-400 mb-4 group-hover:text-yellow-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes gradientShift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(60px, 60px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
