import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";

const command = "curl -fsSL https://cuga.dev/install.sh | bash";

export function InstallPanel() {
  const [status, setStatus] = useState("");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setStatus("Copied");
    } catch {
      setStatus("Select and copy the command below.");
    }
  };
  return <div id="install" className="mx-auto mb-8 max-w-2xl rounded-2xl border border-blue-400/25 bg-white/[0.04] p-5 text-left">
    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white"><Terminal size={17} className="text-blue-300" /> Start locally in two commands</div>
    <div className="flex items-start gap-3 rounded-lg bg-black/30 p-3">
      <code className="min-w-0 flex-1 break-all text-xs sm:text-sm text-blue-100">{command}</code>
      <button type="button" onClick={copy} aria-label="Copy installation command" className="flex shrink-0 items-center gap-1.5 rounded-md border border-white/15 px-2.5 py-1 text-xs text-white hover:bg-white/10">
        {status === "Copied" ? <Check size={14} /> : <Copy size={14} />}{status === "Copied" ? "Copied" : "Copy"}
      </button>
    </div>
    <p role="status" aria-live="polite" className="mt-2 text-xs text-blue-200">{status}</p>
    <p className="mt-3 text-sm text-white/60">Next, run <code className="rounded bg-white/5 px-1.5 py-1 text-blue-100">cuga start manager</code> and choose your provider in the terminal. Credentials stay local.</p>
    <div className="mt-3 flex flex-wrap justify-between gap-2 text-xs text-white/40"><span>macOS (Apple Silicon) · Linux · WSL · Python managed for you</span><a className="text-blue-300 hover:underline" href="https://github.com/cuga-project/cuga-agent/blob/v0.4.1/docs/getting-started.md">Setup guide →</a></div>
  </div>;
}
