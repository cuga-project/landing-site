// @ts-nocheck
import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChevronRight, ExternalLink, Menu, X, Star, Github, Brain, Globe, Package } from "lucide-react";
import Stats from "./components/Stats";

// Modern Background Animation Component
const ModernBackground = () => {
  const canvasRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles = [];
    const particleCount = 30; // Reduced from 100 for better performance

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 8 + 1,
        opacity: Math.random() * 0.7 + 0.2,
        color: `hsl(${Math.random() * 60 + 240}, 70%, 60%)`, // Blue to purple range
      });
    }

    let animationFrame;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();

        // Connect nearby particles
        particles.slice(index + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = (1 - distance / 100) * 0.2;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-30"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      />

      {/* Floating geometric shapes */}
      <div className="absolute inset-0">
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 rounded-full blur-3xl"
          style={{
            top: "10%",
            left: "10%",
            animation: "float 8s ease-in-out infinite",
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />
        <div
          className="absolute w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
          style={{
            top: "60%",
            right: "10%",
            animation: "float 6s ease-in-out infinite reverse",
            transform: `translateY(${scrollY * 0.4}px)`,
          }}
        />
        <div
          className="absolute w-72 h-72 bg-gradient-to-r from-pink-400/20 to-cyan-400/20 rounded-full blur-3xl"
          style={{
            bottom: "20%",
            left: "20%",
            animation: "float 7s ease-in-out infinite",
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        />
      </div>

      {/* Geometric grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: "50px 50px",
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      />
    </div>
  );
};

// Scroll-triggered Animation Hook
const useScrollAnimation = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return [elementRef, isVisible];
};

// Enhanced Header Component
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled
          ? "py-3 backdrop-blur-2xl bg-slate-900/80 shadow-2xl shadow-purple-500/20"
          : "py-6"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-5">
        <div className="flex items-center space-x-3 group">
          <img 
            src="https://avatars.githubusercontent.com/u/231742966?s=48&v=4" 
            alt="CUGA Logo" 
            className="w-10 h-10 rounded-lg shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-110"
          />
  
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>

        <ul className="hidden md:flex list-none p-0 m-0 space-x-3 items-center">
          <li>
            <a
              href="https://docs.cuga.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 text-sm font-medium text-white/90 hover:text-white rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Docs
            </a>
          </li>
          <li>
            <a
              href="https://arxiv.org/html/2503.01861v3"
              className="px-6 py-3 text-sm font-medium text-white/90 hover:text-white rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Paper
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://forms.office.com/r/GjLf7a7fju"
              rel="noopener noreferrer"
              className="px-6 py-3 text-sm font-medium bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 flex items-center gap-2 relative overflow-hidden group"
            >
              <span className="relative z-10">Contact Us</span>
              <ChevronRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          </li>
        </ul>

        {isMobileMenuOpen && (
          <div
            className="absolute top-full left-0 right-0 bg-slate-900 border-t border-slate-700 md:hidden shadow-2xl"
            style={{ backgroundColor: "#121830" }}
          >
            <ul className="flex flex-col p-6 space-y-4">
              <li>
                <a
                  href="https://docs.cuga.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 py-4 text-white font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-slate-500 transition-all duration-300 text-center shadow-md"
                >
                  Docs
                </a>
              </li>
              <li>
                <a
                  href="https://arxiv.org/html/2503.01861v3"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 py-4 text-white font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-slate-500 transition-all duration-300 text-center shadow-md"
                >
                  Paper
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://forms.office.com/r/GjLf7a7fju"
                  rel="noopener noreferrer"
                  className="block px-6 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-lg text-center hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 shadow-lg border border-cyan-400/50"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};


// Enhanced Welcome Banner
const WelcomeBanner = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [stars, setStars] = useState(null);

  useEffect(() => {
    fetch("https://api.github.com/repos/cuga-project/cuga-agent")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data && typeof data.stargazers_count === 'number') {
          setStars(data.stargazers_count);
        }
      })
      .catch((error) => {
        console.warn('Failed to fetch GitHub stars:', error);
        setStars(null);
      });
  }, []);

  useEffect(() => {
    let scrollTicking = false;
    let mouseTicking = false;
    
    const handleScroll = () => {
      if (!scrollTicking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    };
    
    const handleMouseMove = (e) => {
      if (!mouseTicking) {
        window.requestAnimationFrame(() => {
          setMousePosition({
            x: (e.clientX - window.innerWidth / 2) / window.innerWidth,
            y: (e.clientY - window.innerHeight / 2) / window.innerHeight,
          });
          mouseTicking = false;
        });
        mouseTicking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-8 md:pt-20">
      <ModernBackground />

      {/* Interactive orbs that follow mouse */}
      <div
        className="absolute w-64 h-64 bg-gradient-to-r from-cyan-400/30 to-purple-600/30 rounded-full blur-2xl"
        style={{
          transform: `translate(${mousePosition.x * 50}px, ${mousePosition.y * 50}px) translateY(${scrollY * 0.3}px)`,
          transition: "transform 0.3s ease-out",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-5 text-center pt-16 md:pt-0">
        <div className="animate-[fadeInUp_1s_ease-out_0.2s_both]">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 leading-tight">
            <span
              className="bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-pulse"
              style={{
                backgroundSize: "200% 200%",
                animation: "gradientShift 3s ease infinite",
              }}
            >
              CUGA
            </span>
          </h1>
        </div>

        <div className="animate-[fadeInUp_1s_ease-out_0.4s_both]">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold max-w-4xl mx-auto mb-6 leading-tight text-cyan-300">
            Configurable Generalist Agent
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-white/80 max-w-5xl mx-auto mb-8 leading-relaxed px-4">
            An open-source generalist agent framework from IBM Research, purpose-built for enterprise automation. Designed for developers, CUGA combines and improves the best of foundational agentic patterns such as ReAct, CodeAct, and Planner-Executor — into a modular architecture enabling trustworthy, policy-aware, and composable automation across web interfaces, APIs, and custom enterprise systems.
          </p>

          <div className="flex justify-center mb-12">
            <div className="relative group inline-block scale-110">
              <a
                href="https://github.com/cuga-project/cuga-agent"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 md:gap-4 px-6 md:px-8 py-3.5 md:py-4 bg-gradient-to-r from-slate-900/95 to-purple-900/95 backdrop-blur-xl rounded-2xl border border-white/20 hover:border-cyan-400/50 shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 hover:scale-105 relative z-10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:rotate-12">
                    <Github className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-white/70 font-medium">Star us on</span>
                    <span className="text-base font-bold text-white">GitHub</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-lg border border-yellow-400/30 group-hover:border-yellow-400/50 transition-all duration-300">
                  <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-yellow-400 animate-pulse" />
                  <span className="text-sm md:text-base font-bold text-yellow-400">
                    {stars !== null && typeof stars === 'number' ? stars.toLocaleString() : "..."}
                  </span>
                </div>

                <ChevronRight className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform duration-300" />
              </a>

              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 -z-10" />
            </div>
          </div>
        </div>

        <div className="animate-[fadeInUp_1s_ease-out_0.6s_both]">
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <a
              href="https://docs.cuga.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-10 py-5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-full hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-500 hover:scale-110 flex items-center gap-4 overflow-hidden"
            >
              <span className="relative z-10">Get Started</span>
              <ChevronRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
            <a
              href="#benchmarks-section"
              className="group px-10 py-5 bg-white/10 backdrop-blur-sm text-white font-bold rounded-full border-2 border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-500 hover:scale-110 flex items-center gap-4"
            >
              View Benchmarks
              <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </a>
          </div>
        </div>

        {/* Demos Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto mt-20 animate-[fadeInUp_1s_ease-out_0.8s_both]">
          {[
            {
              videoSrc: "/videos/demo_1.mp4",
              title: "get top account by revenue from digital sales, then add it to current page",
              subtitle: "Hybrid task execution on web and API",
              category: "Hybrid Task Execution",
              gradient: "from-purple-500 to-pink-600",
            },
            {
              videoSrc: "/videos/demo_2.mp4",
              title: "Watch CUGA pause for human approval during critical decision points",
              subtitle: "Example Task: get best accounts",
              category: "Human in the Loop",
              gradient: "from-purple-500 to-pink-600",
            },
          ].map((demo, index) => (
            <div
              key={index}
              className="group rounded-3xl overflow-hidden bg-slate-900/50 backdrop-blur-sm border border-white/10 transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/30"
            >
              <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
                <video
                  src={demo.videoSrc}
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-contain bg-black pointer-events-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>

              <div className="p-8">
                <div
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r ${demo.gradient} text-white mb-4 shadow-lg`}
                >
                  {demo.category}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 leading-relaxed">
                  {demo.title}
                </h3>
                {demo.subtitle && (
                  <p className="text-base text-cyan-300/80 italic">
                    {demo.subtitle}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Enhanced Benchmarks Section
const BenchmarksSection = () => {
  const [elementRef, isVisible] = useScrollAnimation(0.2);

  const benchmarks = [
    {
      name: "WebArena",
      accuracy: "61.7%",
      icon: <Globe className="w-5 h-5 text-cyan-400" />,
      benchmarkUrl: "https://webarena.dev/",
      trajectoryUrl: "/dashboard?benchmark=webarena",
    },
    {
      name: "AppWorld",
      accuracy: "48.2%",
      icon: <Globe className="w-5 h-5 text-cyan-400" />,
      benchmarkUrl: "https://appworld.dev/",
      trajectoryUrl: null,
    },
  ];

  return (
    <section
      id="benchmarks-section"
      className="py-16 md:py-32 px-4 md:px-5 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-40 h-40 md:w-80 md:h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
      </div>

      <div ref={elementRef} className="max-w-6xl mx-auto relative z-10">
        <div
          className={`text-center mb-12 md:mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            Benchmark Results
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-white/70 max-w-3xl mx-auto px-4">
            State-of-the-art performance combining ReAct, CodeAct, and Planner-Executor patterns for enterprise-grade automation.
          </p>
        </div>

        <div
          className={`transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Desktop Table */}
          <div className="hidden md:block overflow-hidden rounded-3xl bg-slate-900/50 backdrop-blur-sm border border-white/10 shadow-2xl shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-500">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-gradient-to-r from-slate-800/50 to-slate-900/50">
                  <th className="py-6 px-6 lg:px-8 text-left text-sm font-bold text-white/90 uppercase tracking-wider">
                    Benchmark
                  </th>
                  <th className="py-6 px-6 lg:px-8 text-left text-sm font-bold text-white/90 uppercase tracking-wider">
                    Metric
                  </th>
                  <th className="py-6 px-6 lg:px-8 text-left text-sm font-bold text-white/90 uppercase tracking-wider">
                    Benchmark URL
                  </th>
                  <th className="py-6 px-6 lg:px-8 text-left text-sm font-bold text-white/90 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {benchmarks.map((benchmark, index) => (
                  <tr key={index} className="group hover:bg-white/5 transition-all duration-300">
                    <td className="py-6 px-6 lg:px-8 font-semibold text-white/90 text-lg">
                      <div className="flex items-center gap-3">
                        {benchmark.icon}
                        {benchmark.name}
                      </div>
                    </td>
                    <td className="py-6 px-6 lg:px-8 text-white font-black text-2xl bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text">
                      {benchmark.accuracy}
                    </td>
                    <td className="py-6 px-6 lg:px-8">
                      <a
                        href={benchmark.benchmarkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-all duration-300 group-hover:scale-105"
                      >
                        Visit Benchmark
                        <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </a>
                    </td>
                    <td className="py-6 px-6 lg:px-8">
                      {benchmark.trajectoryUrl && (
                        <a
                          href={benchmark.trajectoryUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-all duration-300 group-hover:scale-105"
                        >
                          View Trajectories
                          <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {benchmarks.map((benchmark, index) => (
              <div
                key={index}
                className="rounded-2xl bg-slate-900/50 backdrop-blur-sm border border-white/10 shadow-xl shadow-purple-500/10 p-6 hover:shadow-purple-500/20 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  {benchmark.icon}
                  <h3 className="text-xl font-bold text-white/90">{benchmark.name}</h3>
                </div>

                <div className="mb-4">
                  <div className="text-sm text-white/50 uppercase tracking-wider mb-2">Metric</div>
                  <div className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text">
                    {benchmark.accuracy}
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-white/50 uppercase tracking-wider mb-2">Benchmark URL</div>
                    <a
                      href={benchmark.benchmarkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-all duration-300 text-sm"
                    >
                      Visit Benchmark
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  {benchmark.trajectoryUrl && (
                    <div>
                      <div className="text-sm text-white/50 uppercase tracking-wider mb-2">Details</div>
                      <a
                        href={benchmark.trajectoryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-all duration-300 text-sm"
                      >
                        View Trajectories
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Research Papers Section
const ResearchPapersSection = () => {
  const [elementRef, isVisible] = useScrollAnimation(0.2);

  const papers = [
    {
      title: "Towards Enterprise-Ready Computer Using Generalist Agent",
      url: "https://arxiv.org/pdf/2503.01861",
      description: "Our evolutionary approach to building enterprise-ready agentic systems, achieving state-of-the-art performance on WebArena and AppWorld through systematic evaluation, analysis, and refinement.",
    },
    {
      title: "From Benchmarks to Business Impact: Deploying IBM Generalist Agent in Enterprise Production",
      url: "https://arxiv.org/pdf/2510.23856",
      description: "Evidence from deploying CUGA in enterprise production, including architectural modifications for auditability, safety, and governance.",
    },
    {
      title: "ST-WEBAGENTBENCH: A Benchmark for Evaluating Safety and Trustworthiness in Web Agents",
      url: "https://arxiv.org/pdf/2410.06703",
      description: "A configurable benchmark suite with 222 tasks for evaluating web agent safety and trustworthiness across enterprise scenarios, introducing the Completion Under Policy (CuP) metric.",
    },
  ];

  return (
    <section className="py-16 md:py-24 px-4 md:px-5 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-48 h-48 md:w-80 md:h-80 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div ref={elementRef} className="max-w-6xl mx-auto relative z-10">
        <div
          className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            Research Papers
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-white/70 max-w-3xl mx-auto">
            Explore the research behind CUGA's architecture and enterprise deployment
          </p>
        </div>

        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {papers.map((paper, index) => (
            <a
              key={index}
              href={paper.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl overflow-hidden bg-slate-900/50 backdrop-blur-sm border border-white/10 hover:border-cyan-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 p-6"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300">
                  <ExternalLink className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white/90 group-hover:text-white transition-colors leading-snug">
                  {paper.title}
                </h3>
              </div>
              <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors leading-relaxed">
                {paper.description}
              </p>
              <div className="mt-4 flex items-center gap-2 text-cyan-400 group-hover:gap-3 transition-all duration-300">
                <span className="text-sm font-semibold">Read Paper</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

// Sister Project Section (ALTK)
const SisterProjectSection = () => {
  const [elementRef, isVisible] = useScrollAnimation(0.2);

  return (
    <section className="py-16 md:py-24 px-4 md:px-5 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-gradient-to-r from-green-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse animation-delay-1000" />
        <div className="absolute bottom-1/4 left-1/4 w-40 h-40 md:w-80 md:h-80 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
      </div>

      <div ref={elementRef} className="max-w-6xl mx-auto relative z-10">
        <div
          className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/20 to-cyan-500/20 border border-green-400/30 mb-6">
            <Package className="w-5 h-5 text-green-400" />
            <span className="text-sm font-bold text-green-400 uppercase tracking-wider">Sister Project</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 bg-clip-text bg-gradient-to-r from-green-400 to-cyan-500">
            Agent Lifecycle Toolkit
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-white/70 max-w-3xl mx-auto">
            Reusable components for building better performing agents
          </p>
        </div>

        <div
          className={`transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <a
            href="https://github.com/AgentToolkit/agent-lifecycle-toolkit"
            target="_blank"
            rel="noopener noreferrer"
            className="group block max-w-5xl mx-auto rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm border border-white/10 hover:border-green-400/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-500/20"
          >
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-green-400 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-green-500/50 transition-all duration-300 group-hover:rotate-6">
                  <Package className="w-8 h-8 text-white" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl md:text-3xl font-black text-white group-hover:text-green-400 transition-colors">
                      Agent Lifecycle Toolkit (ALTK)
                    </h3>
                    <ExternalLink className="w-6 h-6 text-green-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                  
                  <p className="text-lg text-white/80 leading-relaxed mb-6">
                    The Agent Lifecycle Toolkit helps agent builders create better performing agents by easily integrating our components into agent pipelines. The components help improve the performance of agents by addressing key gaps in various stages of the agent lifecycle, such as in reasoning, or tool calling errors, or output guardrails.
                  </p>

                  <div className="flex flex-wrap gap-3 mb-6">
                    {[
                      "Pre-LLM Components",
                      "Tool Validation",
                      "Error Recovery",
                      "Output Guardrails",
                      "Framework Agnostic",
                    ].map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 rounded-full bg-gradient-to-r from-green-500/20 to-cyan-500/20 border border-green-400/30 text-sm font-semibold text-green-400"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-green-400 group-hover:gap-3 transition-all duration-300">
                    <Github className="w-5 h-5" />
                    <span className="text-base font-bold">View on GitHub</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-slate-800/50 border border-white/5">
                  <h4 className="text-sm font-bold text-white/90 mb-2 uppercase tracking-wider">Key Benefits</h4>
                  <ul className="space-y-2 text-sm text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span>Minimal integration effort and setup</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span>Plug-and-play components</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span>Framework-agnostic design</span>
                    </li>
                  </ul>
                </div>

                <div className="p-5 rounded-xl bg-slate-800/50 border border-white/5">
                  <h4 className="text-sm font-bold text-white/90 mb-2 uppercase tracking-wider">Component Types</h4>
                  <ul className="space-y-2 text-sm text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">•</span>
                      <span>Pre-LLM: Spotlight for instruction emphasis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">•</span>
                      <span>Pre-tool: Refraction, SPARC validation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">•</span>
                      <span>Post-tool: Silent error review, RAG repair</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </a>
        </div>
      </div>
    </section>
  );
};

// Enhanced Footer Component
const Footer = () => {
  const [elementRef, isVisible] = useScrollAnimation(0.3);

  return (
    <footer className="bg-gradient-to-t from-slate-950 to-slate-900 border-t border-white/10 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 w-96 h-96 bg-gradient-to-r from-cyan-500/5 to-purple-600/5 rounded-full blur-3xl" />
      </div>

      <div ref={elementRef} className="max-w-7xl mx-auto px-5 py-16 relative z-10">
        <div
          className={`grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 text-white/60 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <img 
                src="https://avatars.githubusercontent.com/u/231742966?s=48&v=4" 
                alt="CUGA Logo" 
                className="w-12 h-12 rounded-xl shadow-lg shadow-purple-500/30"
              />
              <h3 className="text-2xl font-black text-white bg-gradient-to-r from-white to-cyan-200 bg-clip-text">
                CUGA
              </h3>
            </div>
            <p className="max-w-md text-lg leading-relaxed">Configurable Generalist Agent - An open-source framework from IBM Research for trustworthy, policy-aware enterprise automation.</p>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg mb-6">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://docs.cuga.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors duration-300 text-base"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://arxiv.org/html/2503.01861v3"
                  className="hover:text-cyan-400 transition-colors duration-300 text-base"
                >
                  Research Paper
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg mb-6">Connect</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://github.com/cuga-project/cuga-agent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors duration-300 text-base"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://forms.office.com/r/GjLf7a7fju"
                  className="hover:text-cyan-400 transition-colors duration-300 text-base"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className={`pt-8 border-t border-white/10 text-center text-white/50 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-base">© 2025 CUGA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component with routing
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </BrowserRouter>
  );
};

// Landing Page Component
const LandingPage = () => {
  useEffect(() => {
    document.title = "CUGA - Configurable Generalist Agent for Enterprise Automation";

    // Add custom CSS animations
    const style = document.createElement("style");
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(5deg); }
      }
      
      @keyframes gradientShift {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
      
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes pulse {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.6; }
      }
      
      .animation-delay-200 { animation-delay: 0.2s; }
      .animation-delay-400 { animation-delay: 0.4s; }
      .animation-delay-600 { animation-delay: 0.6s; }
      .animation-delay-800 { animation-delay: 0.8s; }
      .animation-delay-1000 { animation-delay: 1s; }
      .animation-delay-1200 { animation-delay: 1.2s; }
      .animation-delay-2000 { animation-delay: 2s; }
      .animation-delay-3000 { animation-delay: 3s; }
      .animation-delay-4000 { animation-delay: 4s; }
      
      /* Smooth scroll behavior */
      html {
        scroll-behavior: smooth;
      }
      
      /* Custom scrollbar */
      ::-webkit-scrollbar {
        width: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: rgba(15, 23, 42, 0.5);
      }
      
      ::-webkit-scrollbar-thumb {
        background: linear-gradient(to bottom, #06b6d4, #8b5cf6);
        border-radius: 4px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(to bottom, #0891b2, #7c3aed);
      }
      
      /* Parallax smoothing */
      * {
        will-change: transform;
      }
      
      /* Enhanced glow effects */
      .glow-cyan {
        box-shadow: 0 0 20px rgba(6, 182, 212, 0.3), 0 0 40px rgba(6, 182, 212, 0.1);
      }
      
      .glow-purple {
        box-shadow: 0 0 20px rgba(139, 92, 246, 0.3), 0 0 40px rgba(139, 92, 246, 0.1);
      }
      
      /* Glassmorphism effect */
      .glass {
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      /* Advanced hover effects */
      .hover-lift:hover {
        transform: translateY(-8px) scale(1.02);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      /* Magnetic hover effect */
      .magnetic:hover {
        transform: scale(1.1);
        filter: brightness(1.2);
      }
      
      /* Neon text effect */
      .neon-text {
        text-shadow: 
          0 0 5px currentColor,
          0 0 10px currentColor,
          0 0 15px currentColor,
          0 0 20px currentColor;
      }
      
      /* Particle animation */
      .particle {
        position: absolute;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(233, 1, 74, 0.8) 0%, transparent 70%);
        animation: particleFloat 6s infinite ease-in-out;
      }
      
      @keyframes particleFloat {
        0%, 100% {
          transform: translateY(0px) translateX(0px);
          opacity: 0.3;
        }
        25% {
          transform: translateY(-100px) translateX(50px);
          opacity: 0.8;
        }
        50% {
          transform: translateY(-50px) translateX(-30px);
          opacity: 0.6;
        }
        75% {
          transform: translateY(-80px) translateX(30px);
          opacity: 0.4;
        }
      }
      
      /* Interactive gradient */
      .interactive-gradient {
        background: linear-gradient(45deg, #06b6d4, #8b5cf6, #ec4899, #06b6d4);
        background-size: 300% 300%;
        animation: gradientShift 4s ease infinite;
      }
      
      /* Ripple effect */
      .ripple {
        position: relative;
        overflow: hidden;
      }
      
      .ripple::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        transform: translate(-50%, -50%);
        transition: width 0.6s, height 0.6s;
      }
      
      .ripple:hover::before {
        width: 300px;
        height: 300px;
      }
      
      /* Advanced text animations */
      .typewriter {
        overflow: hidden;
        border-right: 0.15em solid #06b6d4;
        white-space: nowrap;
        margin: 0 auto;
        letter-spacing: 0.15em;
        animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;
      }
      
      @keyframes typing {
        from { width: 0; }
        to { width: 100%; }
      }
      
      @keyframes blink-caret {
        from, to { border-color: transparent; }
        50% { border-color: #06b6d4; }
      }
      
      /* Morphing shapes */
      .morph {
        animation: morph 8s ease-in-out infinite;
      }
      
      @keyframes morph {
        0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
        25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        50% { border-radius: 50% 60% 30% 60% / 60% 40% 60% 40%; }
        75% { border-radius: 60% 40% 60% 40% / 30% 60% 40% 70%; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="specialBody min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 text-white overflow-x-hidden">
      <Header />
      <main>
        <WelcomeBanner />
        <BenchmarksSection />
        <ResearchPapersSection />
        <SisterProjectSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
