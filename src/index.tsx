// @ts-nocheck
import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ArrowRight,
  ChevronRight,
  ExternalLink,
  Menu,
  X,
  Star,
  Github,
  Globe,
  Package,
  Shield,
  Server,
  Code2,
  Layers,
  Workflow,
  BookOpen,
  Lock,
  Sparkles,
  Users,
  Cpu,
  AlertTriangle,
  Ban,
  Shuffle,
  Building2,
  Trophy,
  Boxes,
  Network,
  Database,
  Terminal,
} from "lucide-react";

const fontDisplay = { fontFamily: '"IBM Plex Serif", Georgia, serif' };

const AmbientBackground = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
    <div className="absolute inset-0 bg-[#05080f]" />
    <div
      className="absolute inset-0 opacity-[0.4]"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(59, 130, 246, 0.14), transparent), radial-gradient(ellipse 60% 40% at 100% 50%, rgba(139, 92, 246, 0.08), transparent), radial-gradient(ellipse 50% 30% at 0% 80%, rgba(96, 165, 250, 0.07), transparent)",
      }}
    />
    <div
      className="absolute inset-0 opacity-[0.35]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }}
    />
  </div>
);

const useScrollAnimation = (threshold = 0.12) => {
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
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [elementRef, isVisible];
};

const NAV_INPAGE = [
  ["Why CUGA", "#why-adopt"],
  ["Problem", "#problem"],
  ["Solution", "#solution"],
  ["Demos", "#demos"],
  ["Papers", "#papers"],
  ["Blogs", "#blogs"],
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[padding,background,box-shadow] duration-300 ${
        isScrolled ? "py-3 bg-[#05080f]/85 backdrop-blur-xl border-b border-white/[0.06]" : "py-5 border-b border-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between gap-4 px-5">
        <a href="/" className="flex items-center gap-2.5 shrink-0 group">
          <img
            src="https://avatars.githubusercontent.com/u/231742966?s=48&v=4"
            alt=""
            className="w-9 h-9 rounded-lg ring-1 ring-white/10 group-hover:ring-blue-400/30 transition-all"
          />
          <span className="text-[17px] font-semibold text-white tracking-tight" style={fontDisplay}>
            CUGA
          </span>
        </a>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((o) => !o)}
          className="lg:hidden p-2 rounded-lg text-white/90 hover:bg-white/10"
          aria-expanded={isMobileMenuOpen}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <ul className="hidden lg:flex list-none m-0 p-0 items-center gap-0.5 text-[13px] font-medium text-white/55">
          {NAV_INPAGE.map(([label, href]) => (
            <li key={href}>
              <a href={href} className="px-3 py-2 rounded-md hover:text-white hover:bg-white/[0.06] transition-colors">
                {label}
              </a>
            </li>
          ))}
        </ul>

        <ul className="hidden md:flex list-none m-0 p-0 items-center gap-2 shrink-0">
          <li>
            <a
              href="https://docs.cuga.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              Docs
            </a>
          </li>
          <li>
            <a
              href="https://forms.office.com/r/GjLf7a7fju"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors"
            >
              Contact
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </li>
        </ul>
      </nav>

      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-white/[0.08] bg-[#080c14] px-5 py-4 space-y-3">
          {NAV_INPAGE.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2.5 text-white/90 font-medium border-b border-white/[0.06] last:border-0"
            >
              {label}
            </a>
          ))}
          <div className="flex flex-col gap-2 pt-2">
            <a
              href="https://docs.cuga.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 text-center rounded-lg bg-white/10 text-white font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Docs
            </a>
            <a
              href="https://github.com/cuga-project/cuga-agent"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 text-center rounded-lg bg-white/10 text-white font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              GitHub
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

const PulseArrow = ({ from, to, shimmer }: { from: string; to: string; shimmer: string }) => (
  <>
    {/* Horizontal arrow — desktop */}
    <div className="hidden sm:flex items-center shrink-0">
      <div className="relative w-8 h-px overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-r ${from} ${to}`} />
        <div
          className={`absolute inset-y-0 w-6 bg-gradient-to-r ${shimmer} blur-[1px]`}
          style={{ animation: "arrowShimmer 2s ease-in-out infinite" }}
        />
      </div>
      <svg width="6" height="8" viewBox="0 0 6 8" className="text-white/25 -ml-px shrink-0">
        <path d="M0 0L6 4L0 8Z" fill="currentColor" />
      </svg>
    </div>
    {/* Vertical arrow — mobile */}
    <div className="flex sm:hidden flex-col items-center shrink-0">
      <div className="relative h-6 w-px overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-b ${from} ${to}`} />
        <div
          className={`absolute inset-x-0 h-4 bg-gradient-to-b ${shimmer} blur-[1px]`}
          style={{ animation: "arrowShimmerV 2s ease-in-out infinite" }}
        />
      </div>
      <svg width="8" height="6" viewBox="0 0 8 6" className="text-white/25 -mt-px shrink-0">
        <path d="M0 0L4 6L8 0Z" fill="currentColor" />
      </svg>
    </div>
  </>
);

const ArchDiagram = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } }, { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const nodeClass = (delay: string) =>
    `transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`;
  const nodeStyle = (delay: number) => ({ transitionDelay: visible ? `${delay}ms` : "0ms" });

  return (
    <>
      <style>{`
        @keyframes arrowShimmer {
          0%   { left: -24px; opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { left: 32px; opacity: 0; }
        }
        @keyframes arrowShimmerV {
          0%   { top: -16px; opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { top: 24px; opacity: 0; }
        }
      `}</style>

      <div ref={ref} className="mb-6 flex flex-col gap-2">

        {/* Layer 1 — Agent Harness */}
        <div
          className={`relative rounded-2xl border border-blue-500/20 bg-blue-500/[0.04] px-8 pt-7 pb-5 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: visible ? "0ms" : "0ms" }}
        >
          <div className="absolute -top-3 left-5 px-2.5 py-0.5 rounded-full bg-[#05080f] border border-blue-500/30 text-[10px] font-bold uppercase tracking-widest text-blue-400/80 whitespace-nowrap">
            Agent Harness
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className={nodeClass("0")} style={nodeStyle(100)}>
              <div className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-blue-500/40 bg-blue-500/[0.10] shadow-lg shadow-blue-500/10 text-center sm:text-left">
                <p className="text-[10px] font-bold uppercase tracking-wider text-blue-400/70 mb-0.5">Supervisor</p>
                <p className="text-sm font-semibold text-white whitespace-nowrap">CugaSupervisor</p>
                <p className="text-[10px] text-white/35 mt-0.5 whitespace-nowrap">Decomposes · Routes · Delegates</p>
              </div>
            </div>

            <PulseArrow from="from-blue-500/30" to="to-violet-500/20" shimmer="from-transparent via-blue-300/70 to-transparent" />

            <div className={nodeClass("")} style={nodeStyle(250)}>
              <div className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-violet-500/35 bg-violet-500/[0.08] shadow-lg shadow-violet-500/10 text-center sm:text-left">
                <p className="text-[10px] font-bold uppercase tracking-wider text-violet-400/70 mb-0.5">Agent</p>
                <p className="text-sm font-semibold text-white whitespace-nowrap">CugaAgent</p>
                <p className="text-[10px] text-white/35 mt-0.5 whitespace-nowrap">API · Web · Hybrid</p>
              </div>
            </div>

            <PulseArrow from="from-violet-500/30" to="to-indigo-500/20" shimmer="from-transparent via-violet-300/70 to-transparent" />

            <div className={nodeClass("")} style={nodeStyle(400)}>
              <div className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-indigo-500/35 bg-indigo-500/[0.07] shadow-lg shadow-indigo-500/10 text-center sm:text-left">
                <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-400/70 mb-0.5">Agent</p>
                <p className="text-sm font-semibold text-white whitespace-nowrap">CugaAgent</p>
                <p className="text-[10px] text-white/35 mt-0.5 whitespace-nowrap">API · Web · Hybrid</p>
              </div>
            </div>

            <PulseArrow from="from-indigo-500/30" to="to-white/10" shimmer="from-transparent via-indigo-300/70 to-transparent" />

            <div className={nodeClass("")} style={nodeStyle(550)}>
              <div className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-white/[0.09] bg-white/[0.03] text-center sm:text-left">
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/30 mb-0.5">Tools</p>
                <p className="text-sm font-semibold text-white/60 whitespace-nowrap">Your systems</p>
                <p className="text-[10px] text-white/25 mt-0.5 whitespace-nowrap">APIs · Browsers · DBs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Connector */}
        <div className="flex justify-center">
          <div className="w-px h-3 bg-gradient-to-b from-blue-500/30 to-emerald-500/30" />
        </div>

        {/* Layer 2 — Policy layer */}
        <div
          className={`relative rounded-2xl border border-dashed border-emerald-500/35 bg-emerald-500/[0.03] px-8 pt-7 pb-5 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: visible ? "600ms" : "0ms" }}
        >
          <div className="absolute -top-3 left-5 px-2.5 py-0.5 rounded-full bg-[#05080f] border border-emerald-500/30 text-[10px] font-bold uppercase tracking-widest text-emerald-400/80 whitespace-nowrap">
            Policy layer
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap">
            <div className={nodeClass("")} style={nodeStyle(700)}>
              <div className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-emerald-500/40 bg-emerald-500/[0.10] shadow-lg shadow-emerald-500/10 text-center sm:text-left">
                <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400/70 mb-0.5">Policy Agent</p>
                <p className="text-sm font-semibold text-white whitespace-nowrap">CugaPolicy</p>
                <p className="text-[10px] text-white/35 mt-0.5 whitespace-nowrap">Evaluates · Decides · Enforces</p>
              </div>
            </div>

            <PulseArrow from="from-emerald-500/30" to="to-emerald-500/15" shimmer="from-transparent via-emerald-300/70 to-transparent" />

            <div className={nodeClass("")} style={nodeStyle(850)}>
              <div className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-emerald-500/25 bg-emerald-500/[0.06] text-center sm:text-left">
                <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400/60 mb-0.5">Enactment</p>
                <p className="text-sm font-semibold text-white/80 whitespace-nowrap">Trigger → Action</p>
                <p className="text-[10px] text-white/30 mt-0.5 whitespace-nowrap">Block · Redirect · Approve</p>
              </div>
            </div>

            <div className="w-px h-10 bg-emerald-500/15 hidden sm:block" />

            <div className={`flex flex-wrap gap-2 justify-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: visible ? "950ms" : "0ms" }}>
              {["Playbooks", "Intent guards", "Tool guides", "Human approval"].map((label) => (
                <span key={label} className="text-[11px] font-semibold text-emerald-400/70 border border-emerald-500/25 rounded-full px-3.5 py-1.5 bg-emerald-500/[0.06]">
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

const Hero = () => {
  const [stars, setStars] = useState(null);

  useEffect(() => {
    fetch("https://api.github.com/repos/cuga-project/cuga-agent")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        if (data && typeof data.stargazers_count === "number") setStars(data.stargazers_count);
      })
      .catch(() => setStars(null));
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-10 md:pt-28 md:pb-12 px-5">
      <AmbientBackground />
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.22em] text-blue-400/90 mb-3">
          IBM · Open source
        </p>
        <h1 className="mb-3 max-w-3xl mx-auto" style={fontDisplay}>
          <span className="block text-5xl sm:text-6xl md:text-7xl font-semibold text-white tracking-tight leading-none mb-3">
            CUGA
          </span>
          <span className="block text-[1.55rem] sm:text-2xl md:text-3xl font-medium text-white/80 leading-snug tracking-tight">
            Configurable Generalist Agent — <span className="text-blue-300 font-semibold">Agent Harness</span> for the enterprise.
          </span>
        </h1>
        <p className="text-base md:text-lg text-white/50 max-w-xl mx-auto leading-relaxed mb-6">
          Configurable, production-ready, validated on public benchmarks and real-world enterprise deployments. Set your policies, deploy on your infrastructure, ship in days.
        </p>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-5">
        <ArchDiagram />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <a
          href="https://github.com/cuga-project/cuga-agent"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.12] hover:border-blue-500/40 hover:bg-white/[0.08] transition-all mb-4"
        >
          <Github className="w-4 h-4 text-white/60" />
          <span className="text-sm text-white/55">cuga-project/cuga-agent</span>
          <span className="flex items-center gap-1.5 text-amber-300 font-bold text-base tabular-nums">
            <Star className="w-4 h-4 fill-amber-300" />
            {stars != null ? stars.toLocaleString() : "—"}
          </span>
        </a>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="https://docs.cuga.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20"
          >
            Start building
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#why-adopt"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white/90 rounded-xl border border-white/15 hover:bg-white/[0.05] transition-colors"
          >
            Why teams adopt CUGA
          </a>
        </div>
      </div>
    </section>
  );
};

const WhyTeamsAdoptSection = () => {
  const [ref, visible] = useScrollAnimation(0.08);

  const cards = [
    {
      icon: <Trophy className="w-5 h-5 text-amber-300" />,
      title: "Benchmark-proven",
      highlight: "#1 on AppWorld",
      lines: ["Evaluated on enterprise verticals — healthcare, BPO, and more."],
      accent: "amber",
    },
    {
      icon: <Layers className="w-5 h-5 text-sky-300" />,
      title: "Three execution modes",
      lines: [
        "API — OpenAPI, LangChain, MCP.",
        "Web — Playwright, BrowserGym.",
        "Hybrid — both in one flow.",
      ],
      accent: "sky",
    },
    {
      icon: <Boxes className="w-5 h-5 text-violet-300" />,
      title: "Tool registry",
      lines: [
        "OpenAPI specs as tools.",
        "MCP & LangChain drop in.",
        "Hierarchical shortlisting.",
      ],
      accent: "violet",
    },
    {
      icon: <Shield className="w-5 h-5 text-blue-300" />,
      title: "Enterprise governance",
      lines: [
        "Intent guard — validate before execution.",
        "Playbooks — behavioral rules.",
        "Tool guide — constrain tool use.",
        "Human-in-the-loop approval.",
      ],
      accent: "blue",
    },
    {
      icon: <Network className="w-5 h-5 text-indigo-300" />,
      title: "Multi-agent",
      lines: [
        "Supervisor decomposes & delegates.",
        "Local or remote (A2A) handoffs.",
        "Variable forwarding across agents.",
      ],
      accent: "indigo",
    },
    {
      icon: <Database className="w-5 h-5 text-cyan-300" />,
      title: "Sandbox + memory",
      lines: [
        "CodeAct for safer execution.",
        "Local, Docker, or E2B cloud.",
        "Vector memory compounds over time.",
      ],
      accent: "cyan",
    },
    {
      icon: <Server className="w-5 h-5 text-fuchsia-300" />,
      title: "Four deploy shapes",
      lines: [
        "Python SDK.",
        "Production server — Helm chart, autoscaling, full ops.",
        "MCP server.",
        "Langflow low-code.",
      ],
      accent: "fuchsia",
    },
  ];

  const accentRing = {
    amber: "border-amber-500/20 bg-amber-500/[0.06]",
    sky: "border-sky-500/20 bg-sky-500/[0.06]",
    violet: "border-violet-500/20 bg-violet-500/[0.06]",
    blue: "border-blue-500/20 bg-blue-500/[0.06]",
    indigo: "border-indigo-500/20 bg-indigo-500/[0.06]",
    cyan: "border-cyan-500/20 bg-cyan-500/[0.06]",
    fuchsia: "border-fuchsia-500/20 bg-fuchsia-500/[0.06]",
  };

  return (
    <section id="why-adopt" className="relative py-20 md:py-28 px-5 border-t border-white/[0.06] bg-[#060910] scroll-mt-24">
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className={`max-w-2xl mb-12 md:mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-400/85 mb-3">Why teams adopt CUGA</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-3" style={fontDisplay}>
            Configurable Generalist Agent — Agent Harness that drops into your stack
          </h2>
          <p className="text-lg text-white/45 leading-relaxed">
            Benchmark-backed execution, controlled tool use, multi-agent orchestration — all configurable without starting from scratch.
          </p>
        </div>

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 transition-all duration-700 delay-75 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {cards.map((card) => (
            <article
              key={card.title}
              className={`rounded-2xl border p-5 md:p-6 flex flex-col ${accentRing[card.accent]}`}
            >
              <div className="w-10 h-10 rounded-xl border border-white/10 bg-black/20 flex items-center justify-center mb-4">{card.icon}</div>
              <h3 className="text-base font-semibold text-white mb-1">{card.title}</h3>
              {card.highlight && <p className="text-sm font-semibold text-amber-200/90 mb-3">{card.highlight}</p>}
              <ul className="mt-1 space-y-2 text-sm text-white/50 leading-relaxed flex-1">
                {card.lines.map((line) => (
                  <li key={line} className="flex gap-2">
                    <span className="text-white/25 shrink-0">·</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}

          <article className="rounded-2xl border border-blue-500/35 bg-gradient-to-br from-blue-700/20 via-blue-900/40 to-indigo-900/35 p-6 md:p-8 sm:col-span-2 lg:col-span-4 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                <Terminal className="w-5 h-5 text-blue-200" />
              </div>
              <div>
                <p className="text-lg md:text-xl font-semibold text-white leading-snug" style={fontDisplay}>
                  Configurable Generalist Agent — <span className="text-blue-300">Agent Harness</span> for the enterprise. Configure for your domain — no platform rebuild.
                </p>
                <p className="text-sm text-blue-100/75 mt-2 leading-relaxed max-w-2xl">
                  Skip the scaffolding. Inherit the quality. Ship in days.
                </p>
              </div>
            </div>
            <a
              href="https://docs.cuga.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 shrink-0 px-5 py-3 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-500 transition-colors"
            >
              Read the docs
              <ArrowRight className="w-4 h-4" />
            </a>
          </article>
        </div>
      </div>
    </section>
  );
};

const ProblemSection = () => {
  const [ref, visible] = useScrollAnimation(0.1);
  const pains = [
    {
      icon: <Shuffle className="w-5 h-5 text-rose-300" />,
      title: "Multi-step work falls apart",
      body: "Single prompts and brittle scripts do not survive real workflows that mix UIs, APIs, and retries.",
    },
    {
      icon: <Ban className="w-5 h-5 text-rose-300" />,
      title: "Tool use is a liability",
      body: "Without guardrails, agents call the wrong capability, pass unsafe arguments, or escalate silently.",
    },
    {
      icon: <AlertTriangle className="w-5 h-5 text-rose-300" />,
      title: "Outputs are not operational",
      body: "Free-form chat is hard to log, review, or plug into downstream systems that expect structure.",
    },
    {
      icon: <Building2 className="w-5 h-5 text-rose-300" />,
      title: "SaaS-only is a non-starter",
      body: "Regulated teams need VPC, air-gapped, or dedicated environments—not another black-box endpoint.",
    },
  ];

  return (
    <section id="problem" className="relative py-20 md:py-28 px-5 border-t border-white/[0.06] bg-[#060910]">
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className={`max-w-2xl mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="text-xs font-semibold uppercase tracking-widest text-rose-300/80 mb-3">The problem</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4" style={fontDisplay}>
            General-purpose LLMs are not enough for enterprise automation
          </h2>
          <p className="text-lg text-white/45 leading-relaxed">
            The gap is not “smarter text.” It is <span className="text-white/70">reliable execution, controlled tool use, and governable behavior</span> over hundreds of steps.
          </p>
        </div>
        <div className={`grid sm:grid-cols-2 gap-4 md:gap-5 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {pains.map((p) => (
            <div
              key={p.title}
              className="group rounded-2xl p-6 md:p-7 bg-white/[0.02] border border-white/[0.06] hover:border-rose-500/20 hover:bg-white/[0.03] transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-4">{p.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{p.title}</h3>
              <p className="text-sm text-white/45 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SolutionSection = () => {
  const [ref, visible] = useScrollAnimation(0.1);

  const pairs = [
    {
      problem: "You need agents that finish complex jobs",
      answer: "CugaAgent combines ReAct, CodeAct, and Planner–Executor so the right reasoning pattern is available for each task—not a one-size-fits-all loop.",
      icon: <Cpu className="w-5 h-5 text-blue-300" />,
    },
    {
      problem: "You need oversight when stakes are high",
      answer: "Supervisor orchestrates multi-step flows, routes work, and supports human-in-the-loop at critical checkpoints.",
      icon: <Users className="w-5 h-5 text-blue-300" />,
    },
    {
      problem: "You need safety as configuration",
      answer: "Playbooks, intent guards, tool guides, and an output formatter turn policies into concrete runtime behavior—not post-hoc hope.",
      icon: <Shield className="w-5 h-5 text-blue-300" />,
    },
    {
      problem: "You need to ship inside your stack",
      answer: "SDKs, a Langflow component, a stable consumption interface, and self-hosted deployment meet builders, integrators, and operators where they already work.",
      icon: <Layers className="w-5 h-5 text-blue-300" />,
    },
  ];


  return (
    <section id="solution" className="relative py-20 md:py-28 px-5 bg-[#05080f]">
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-blue-500/[0.03] via-transparent to-transparent" />
      <div ref={ref} className="max-w-6xl mx-auto relative">
        <div className={`max-w-2xl mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-400/80 mb-3">What CUGA gives you</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4" style={fontDisplay}>
            A single stack from execution to policy to deployment
          </h2>
          <p className="text-lg text-white/45 leading-relaxed">
            Each piece exists because teams hit the same wall: great demos, fragile production. CUGA is built to cross that wall on purpose.
          </p>
        </div>

        <div className={`space-y-5 mb-16 transition-all duration-700 delay-75 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {pairs.map((row) => (
            <div
              key={row.problem}
              className="grid md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-6 items-stretch rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden"
            >
              <div className="p-6 md:p-7 border-b md:border-b-0 md:border-r border-white/[0.06]">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-white/35 mb-2">The ask</p>
                <p className="text-white/75 font-medium leading-snug">{row.problem}</p>
              </div>
              <div className="hidden md:flex items-center justify-center px-2 bg-white/[0.02]">
                <ArrowRight className="w-5 h-5 text-blue-500/50" />
              </div>
              <div className="p-6 md:p-7 flex gap-4">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center">{row.icon}</div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-400/80 mb-2">CUGA</p>
                  <p className="text-sm text-white/55 leading-relaxed">{row.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-0 flex flex-wrap gap-3 justify-center transition-all duration-700 delay-200 ${visible ? "opacity-100" : "opacity-0"}`}>
          {[
            { Icon: Code2, label: "TypeScript & Python SDK" },
            { Icon: Workflow, label: "Langflow component" },
            { Icon: Layers, label: "Consumption interface" },
            { Icon: Server, label: "Self-hosted" },
          ].map(({ Icon, label }) => (
            <span key={label} className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium text-white/55 bg-white/[0.04] border border-white/[0.08]">
              <Icon className="w-3.5 h-3.5 text-blue-400/80" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

const DemosSection = () => {
  const [ref, visible] = useScrollAnimation(0.12);
  const demos = [
    {
      videoSrc: "/videos/demo_1.mp4",
      title: "Hybrid web + API: pull top accounts, then use them on the page",
      tag: "Real workflows",
    },
    {
      videoSrc: "/videos/demo_2.mp4",
      title: "Human approval before high-impact steps",
      tag: "Governed automation",
    },
  ];

  return (
    <section id="demos" className="relative py-20 md:py-28 px-5 border-t border-white/[0.06] bg-[#060910]">
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className={`text-center max-w-2xl mx-auto mb-12 md:mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="text-xs font-semibold uppercase tracking-widest text-white/35 mb-3">See it</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-3" style={fontDisplay}>
            Agent behavior in action
          </h2>
          <p className="text-white/45">Short clips—not marketing fiction—of hybrid execution and governed decisions.</p>
        </div>
        <div className={`grid lg:grid-cols-2 gap-6 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {demos.map((demo) => (
            <div key={demo.videoSrc} className="rounded-2xl overflow-hidden border border-white/[0.08] bg-black/40">
              <div className="aspect-video bg-black">
                <video src={demo.videoSrc} controls autoPlay loop muted playsInline className="w-full h-full object-contain" />
              </div>
              <div className="p-5 md:p-6 border-t border-white/[0.06]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400/90">{demo.tag}</span>
                <h3 className="text-base font-semibold text-white mt-2 leading-snug">{demo.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProofSection = () => {
  const [ref, visible] = useScrollAnimation(0.12);

  const benchmarks = [
    { name: "WebArena", score: "61.7%", url: "https://webarena.dev/", trajectories: "/dashboard?benchmark=webarena" },
    { name: "AppWorld", score: "48.2%", url: "https://appworld.dev/", trajectories: null },
  ];

  const papers = [
    {
      title: "Towards Enterprise-Ready Computer Using Generalist Agent",
      url: "https://arxiv.org/pdf/2503.01861",
      blurb: "Architecture, evaluation, and refinement path for enterprise-ready agents.",
    },
    {
      title: "From Benchmarks to Business Impact",
      url: "https://arxiv.org/pdf/2510.23856",
      blurb: "Production deployment: auditability, safety, governance.",
    },
    {
      title: "ST-WEBAGENTBENCH",
      url: "https://arxiv.org/pdf/2410.06703",
      blurb: "Safety & trustworthiness benchmark suite; CuP metric.",
    },
  ];

  return (
    <section id="proof" className="relative py-20 md:py-28 px-5 bg-[#05080f] border-t border-white/[0.06]">
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className={`text-center max-w-2xl mx-auto mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-300/70 mb-3">Research & Innovation</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight" style={fontDisplay}>
            Peer-reviewed. Independently validated.
          </h2>
          <p className="text-white/45 mt-3 text-sm md:text-base">
            CUGA's work is published in top-tier venues and reviewed by external researchers — a direct signal that the approach is meaningful, novel, and trusted beyond IBM.
          </p>
        </div>

        <div className={`transition-all duration-700 delay-75 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="rounded-2xl border border-white/[0.08] overflow-hidden mb-12">
            <div className="px-5 py-3 bg-white/[0.03] border-b border-white/[0.06] text-xs font-semibold uppercase tracking-wider text-white/40">Benchmarks</div>
            <div className="divide-y divide-white/[0.06]">
              {benchmarks.map((b) => (
                <div key={b.name} className="grid grid-cols-[1fr_auto_auto] items-center gap-6 p-5 md:px-6 hover:bg-white/[0.02] transition-colors">
                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-blue-400/80 shrink-0" />
                    <span className="font-medium text-white">{b.name}</span>
                  </div>
                  <div className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-violet-300 tabular-nums text-right w-24">{b.score}</div>
                  <div className="flex gap-3 w-44 justify-end">
                    <a href={b.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-400/90 hover:text-blue-300 inline-flex items-center gap-1">
                      Site <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    {b.trajectories ? (
                      <a href={b.trajectories} target="_blank" rel="noopener noreferrer" className="text-sm text-white/45 hover:text-white/70 inline-flex items-center gap-1">
                        Trajectories <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="text-sm text-white/0 pointer-events-none select-none inline-flex items-center gap-1">
                        Trajectories <ExternalLink className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div id="papers" className="scroll-mt-24">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-violet-300/70">Peer-reviewed research</p>
            <span className="text-[10px] font-bold uppercase tracking-wider text-violet-400/60 border border-violet-500/20 rounded-full px-2.5 py-1">arxiv · top-tier venues</span>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {papers.map((paper) => (
              <a
                key={paper.url}
                href={paper.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl p-6 border border-violet-500/15 bg-gradient-to-br from-violet-900/20 to-[#060910] hover:border-violet-400/35 hover:from-violet-900/30 transition-all"
              >
                <div className="flex items-center gap-1.5 mb-3">
                  <BookOpen className="w-3.5 h-3.5 text-violet-400/80" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-violet-400/80">Peer-reviewed</span>
                </div>
                <h3 className="text-sm font-semibold text-white group-hover:text-violet-200/95 leading-snug mb-2">{paper.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed mb-4">{paper.blurb}</p>
                <span className="text-xs font-medium text-blue-400/90 inline-flex items-center gap-1">
                  Read paper <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </a>
            ))}
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const BlogsSection = () => {
  const [ref, visible] = useScrollAnimation(0.08);

  const blogs = [
    {
      title: "Introducing CUGA: The enterprise-ready configurable generalist agent",
      url: "https://research.ibm.com/blog/cuga-agent-framework",
      source: "IBM Research",
      sourceBadge: "bg-blue-500/15 text-blue-300 border-blue-500/20",
      date: "Oct 2025",
      blurb: "Why we built CUGA, what makes it different, and benchmark results from AppWorld and WebArena.",
    },
    {
      title: "CUGA on Hugging Face: Democratizing Configurable AI Agents",
      url: "https://huggingface.co/blog/ibm-research/cuga-on-hugging-face",
      source: "Hugging Face",
      sourceBadge: "bg-yellow-500/15 text-yellow-300 border-yellow-500/20",
      date: "Dec 2025",
      blurb: "Open models, open source — how CUGA runs on Groq and Llama 4 with 80–90% cost savings vs closed models.",
    },
    {
      title: "Build a Robust Enterprise AI Agent Workflow in Langflow with CUGA",
      url: "https://www.langflow.org/blog/robust-enterprise-ai-agent-workflow-langflow-cuga",
      source: "Langflow",
      sourceBadge: "bg-violet-500/15 text-violet-300 border-violet-500/20",
      date: "Dec 2025",
      blurb: "Step-by-step: wiring CRM, filesystem, and Gmail tools into a production multi-step flow.",
    },
    {
      title: "From Research to Reality: CUGA — the open-source agent redefining enterprise automation",
      url: "https://medium.com/@sami.marreed.16/from-research-to-reality-cuga-the-open-source-agent-thats-redefining-enterprise-automation-fe34a821d2fb",
      source: "Medium",
      sourceBadge: "bg-white/10 text-white/60 border-white/10",
      date: "2025",
      blurb: "From SOTA benchmark to real users — the journey of taking CUGA into production.",
    },
    {
      title: "Introducing CUGA",
      url: "https://pub.towardsai.net/introducing-cuga-ccea3f99206e",
      source: "Towards AI",
      sourceBadge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
      date: "2025",
      blurb: "A high-level overview of CUGA's architecture, capabilities, and enterprise value proposition.",
    },
    {
      title: "Engineering CUGA: Architectural lessons from migrating a SOTA benchmark agent to serving users",
      url: "https://medium.com/@sami.marreed.16/engineering-cuga-architectural-lessons-from-migrating-a-sota-benchmark-agent-to-serving-users-and-35132dbea9fd",
      source: "Medium",
      sourceBadge: "bg-white/10 text-white/60 border-white/10",
      date: "2025",
      blurb: "Deep dive into the architectural decisions made when evolving CUGA from research to production.",
    },
  ];

  return (
    <section id="blogs" className="relative py-20 md:py-28 px-5 bg-[#05080f] border-t border-white/[0.06] scroll-mt-24">
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className={`max-w-2xl mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-400/80 mb-3">Around the web</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-3" style={fontDisplay}>
            Written about, built on, talked about
          </h2>
          <p className="text-lg text-white/45 leading-relaxed">
            From IBM Research to Hugging Face and Langflow — what the community is saying about CUGA.
          </p>
        </div>

        <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-700 delay-75 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {blogs.map((blog, i) => (
            <a
              key={blog.url}
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-blue-500/25 hover:bg-white/[0.04] transition-all p-5 md:p-6"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`text-[10px] font-bold uppercase tracking-wider border rounded-full px-2.5 py-0.5 ${blog.sourceBadge}`}>
                  {blog.source}
                </span>
                <span className="text-[10px] text-white/30">{blog.date}</span>
              </div>
              <h3 className="text-sm font-semibold text-white group-hover:text-blue-200/90 leading-snug mb-3 flex-1">
                {blog.title}
              </h3>
              <p className="text-xs text-white/40 leading-relaxed mb-4">{blog.blurb}</p>
              <span className="text-xs font-medium text-blue-400/80 inline-flex items-center gap-1 mt-auto">
                Read <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const AltkSection = () => {
  const [ref, visible] = useScrollAnimation(0.15);

  return (
    <section className="relative py-16 md:py-20 px-5 bg-[#060910] border-t border-white/[0.06]">
      <div ref={ref} className="max-w-6xl mx-auto">
        <a
          href="https://github.com/AgentToolkit/agent-lifecycle-toolkit"
          target="_blank"
          rel="noopener noreferrer"
          className={`block rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/40 to-[#080c14] p-6 md:p-8 hover:border-emerald-400/35 transition-all ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex items-center gap-4 md:shrink-0">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-400/25 flex items-center justify-center">
                <Package className="w-6 h-6 text-emerald-300" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400/90 mb-1">Related open source</p>
                <h3 className="text-lg font-semibold text-white" style={fontDisplay}>
                  Agent Lifecycle Toolkit
                </h3>
              </div>
            </div>
            <p className="text-sm text-white/45 leading-relaxed flex-1 md:border-l md:border-white/[0.08] md:pl-6">
              Plug-in components for reasoning emphasis, tool validation, error recovery, and output guardrails—framework-agnostic complements to CUGA-sized deployments.
            </p>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-400 shrink-0">
              GitHub <ExternalLink className="w-4 h-4" />
            </span>
          </div>
        </a>
      </div>
    </section>
  );
};

const footerLinks = [
  { label: "Docs", href: "https://docs.cuga.dev" },
  { label: "GitHub", href: "https://github.com/cuga-project/cuga-agent" },
  { label: "Papers", href: "#papers" },
  { label: "Contact", href: "https://forms.office.com/r/GjLf7a7fju" },
];

const Footer = () => {
  const s: React.CSSProperties = {
    backgroundColor: "#05080f",
    borderTop: "1px solid rgba(255,255,255,0.07)",
    padding: "56px 20px 32px",
    fontFamily: "IBM Plex Sans, system-ui, sans-serif",
  };
  const inner: React.CSSProperties = {
    maxWidth: 1152,
    margin: "0 auto",
    display: "flex",
    flexWrap: "wrap" as const,
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 32,
  };
  const brand: React.CSSProperties = {
    display: "flex",
    flexDirection: "column" as const,
    gap: 4,
  };
  const brandName: React.CSSProperties = {
    color: "#ffffff",
    fontWeight: 600,
    fontSize: 16,
    fontFamily: '"IBM Plex Serif", Georgia, serif',
  };
  const brandDesc: React.CSSProperties = {
    color: "rgba(255,255,255,0.55)",
    fontSize: 13,
    maxWidth: 320,
    lineHeight: 1.6,
  };
  const nav: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "12px 32px",
    alignItems: "center",
  };
  const linkStyle: React.CSSProperties = {
    color: "rgba(255,255,255,0.6)",
    textDecoration: "none",
    fontSize: 14,
  };
  const copy: React.CSSProperties = {
    color: "rgba(255,255,255,0.35)",
    fontSize: 12,
    textAlign: "center" as const,
    marginTop: 40,
    maxWidth: 1152,
    margin: "40px auto 0",
    display: "block",
  };

  return (
    <footer style={s}>
      <div style={inner}>
        <div style={brand}>
          <span style={brandName}>CUGA</span>
          <span style={brandDesc}>Configurable Generalist Agent — Agent Harness for the enterprise.</span>
        </div>
        <nav style={nav}>
          {footerLinks.map(({ label, href }) =>
            href.startsWith("#") ? (
              <a key={label} href={href} style={linkStyle}>
                {label}
              </a>
            ) : (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                {label}
              </a>
            )
          )}
        </nav>
      </div>
      <span style={copy}>© 2026 CUGA</span>
    </footer>
  );
};

const LandingPage = () => {
  useEffect(() => {
    document.title = "CUGA — Configurable Generalist Agent · Agent Harness for the enterprise";

    const style = document.createElement("style");
    style.textContent = `
      html { scroll-behavior: smooth; }
      ::-webkit-scrollbar { width: 8px; }
      ::-webkit-scrollbar-track { background: #0a0f18; }
      ::-webkit-scrollbar-thumb {
        background: linear-gradient(to bottom, #3b82f6, #6366f1);
        border-radius: 4px;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#05080f", color: "#ffffff" }} className="antialiased">
      <Header />
      <main>
        <Hero />
        <WhyTeamsAdoptSection />
        <ProblemSection />
        <SolutionSection />
        <DemosSection />
        <ProofSection />
        <BlogsSection />
        <AltkSection />
      </main>
      <Footer />
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
