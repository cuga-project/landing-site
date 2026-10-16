import { ArrowUpRight, Blocks, Code2, LayoutGrid, Terminal } from "lucide-react";

const fontDisplay = { fontFamily: '"IBM Plex Serif", Georgia, serif' };

export const CugaProjects = () => (
  <div className="relative z-10 w-full max-w-5xl mx-auto mt-8">
    <p className="text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40 mb-4">
      Explore the CUGA ecosystem
    </p>
    <div className="grid md:grid-cols-2 gap-4">
      <a
        href="https://github.com/cuga-project/cuga-apps"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative overflow-hidden flex flex-col rounded-2xl border border-teal-400/25 bg-gradient-to-br from-teal-950/50 to-[#080e17] p-6 text-left hover:border-teal-300/60 hover:-translate-y-1 transition-all focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300"
      >
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-teal-300/25 bg-teal-400/10">
              <LayoutGrid className="h-5 w-5 text-teal-300" aria-hidden="true" />
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-teal-300">Built with CUGA</span>
          </div>
          <div className="flex gap-1.5 text-teal-300/60" aria-hidden="true">
            {[LayoutGrid, Blocks, Code2].map((Icon, index) => (
              <span key={index} className="flex h-7 w-7 items-center justify-center rounded-md border border-teal-300/15 bg-teal-300/[0.04]">
                <Icon className="h-3.5 w-3.5" />
              </span>
            ))}
          </div>
        </div>
        <h2 className="text-xl font-semibold text-white mb-2" style={fontDisplay}>CUGA Apps</h2>
        <p className="text-sm text-white/60 leading-relaxed mb-5 flex-1">
          Explore agentic apps built with CUGA. Find an example, inspect the code, and make it your own.
        </p>
        <span className="flex items-center justify-between border-t border-teal-300/15 pt-4 text-sm font-semibold text-teal-300">
          Explore the apps
          <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
        </span>
      </a>

      <a
        href="https://github.com/cuga-project/cuga-harness-kit"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative overflow-hidden flex flex-col rounded-2xl border border-amber-400/25 bg-gradient-to-br from-amber-950/30 to-[#100e16] p-6 text-left hover:border-amber-300/60 hover:-translate-y-1 transition-all focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-300/25 bg-amber-400/10">
            <Terminal className="h-5 w-5 text-amber-300" aria-hidden="true" />
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-amber-300">Build with your coding assistant</span>
        </div>
        <h2 className="text-xl font-semibold text-white mb-2" style={fontDisplay}>CUGA Harness Kit</h2>
        <p className="text-sm text-white/60 leading-relaxed mb-5 flex-1">
          Give Claude Code, Cursor, Codex, and Bob the skills to install, launch, and build with CUGA.
        </p>
        <span className="flex flex-wrap items-center justify-between gap-3 border-t border-amber-300/15 pt-4 text-amber-300">
          <code className="text-xs"><span className="text-amber-300/50" aria-hidden="true">$ </span>cuga-harness-kit init</code>
          <span className="inline-flex items-center gap-2 text-sm font-semibold">
            Get the kit
            <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
          </span>
        </span>
      </a>
    </div>
  </div>
);
