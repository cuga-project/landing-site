import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  CircuitBoard,
  Clipboard,
  Code2,
  Database,
  FileText,
  Fingerprint,
  Github,
  Globe2,
  Layers3,
  LayoutGrid,
  LockKeyhole,
  Menu,
  Network,
  Play,
  RotateCcw,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
  Workflow,
  X,
  Zap,
} from "lucide-react";
import "./landing.css";
import { Screenshot } from "./ProductMedia";

const REPO = "https://github.com/cuga-project/cuga-agent";
const SOURCE = `${REPO}/blob/main`;
const DOCS = "https://docs.cuga.dev";

function External({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}

function Brand() {
  return (
    <a href="/" className="ns-brand" aria-label="CUGA home">
      <img src="/images/cuga-logo.png" alt="" width="34" height="34" />
      <span>
        CUGA<span className="ns-brand-dot">.</span>
      </span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    ["Platform", "#platform"],
    ["Control", "#control"],
    ["Deploy", "#deploy"],
    ["Ecosystem", "#ecosystem"],
  ];
  return (
    <>
      <a className="ns-skip" href="#main">
        Skip to content
      </a>
      <div className="ns-announcement">
        <span className="ns-status-dot" />
        Your infrastructure. Your policies. Your models.
        <External href={`${SOURCE}/LICENSE`}>
          Open source · Apache 2.0 <ArrowUpRight size={12} />
        </External>
      </div>
      <header className="ns-header">
        <div className="ns-container ns-nav">
          <Brand />
          <nav className="ns-desktop-nav" aria-label="Main navigation">
            {links.map(([name, href]) => (
              <a href={href} key={name}>
                {name}
              </a>
            ))}
          </nav>
          <div className="ns-nav-actions">
            <External href={REPO} className="ns-github">
              <Github size={18} />
              <span>GitHub</span>
            </External>
            <a className="ns-button ns-button-small" href="#build">
              Start building <ArrowUpRight size={15} />
            </a>
          </div>
          <button
            className="ns-menu"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="ns-mobile-nav"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <nav
            id="ns-mobile-nav"
            className="ns-mobile-nav"
            aria-label="Mobile navigation"
          >
            {links.map(([name, href]) => (
              <a href={href} key={name} onClick={() => setOpen(false)}>
                {name}
                <ArrowUpRight size={17} />
              </a>
            ))}
            <a href="#build" onClick={() => setOpen(false)}>
              Start building
              <ArrowUpRight size={17} />
            </a>
            <External href={REPO}>
              GitHub
              <ArrowUpRight size={17} />
            </External>
          </nav>
        )}
      </header>
    </>
  );
}

function WorkflowIllustration() {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    if (stage !== 1 && stage !== 3) return;
    const timer = window.setTimeout(() => setStage(stage === 1 ? 2 : 4), 1100);
    return () => window.clearTimeout(timer);
  }, [stage]);
  const statuses = [
    "Ready to explore",
    "Planning the workflow",
    "Waiting for your approval",
    "Applying approved action",
    "Workflow complete",
    "Update blocked",
  ];
  return (
    <div className={`ns-scene ns-scene-stage-${stage}`}>
      <div className="ns-scene-top">
        <span>
          <span className="ns-status-dot" />
          YOUR ENVIRONMENT
        </span>
        <span className="ns-scene-private">
          <LockKeyhole size={11} /> Private
        </span>
      </div>
      <div className="ns-scene-grid" aria-hidden="true" />
      <div className="ns-request">
        <span className="ns-micro">BUSINESS REQUEST</span>
        <p>
          “Prepare a revenue report.
          <br />
          Draft CRM updates for review.”
        </p>
        <span className="ns-request-icon">
          <ArrowUpRight size={18} />
        </span>
      </div>
      <div
        className={`ns-connector ${stage > 0 ? "ns-active" : ""}`}
        aria-hidden="true"
      >
        <span />
      </div>
      <div className="ns-harness">
        <span className="ns-harness-icon">
          <CircuitBoard size={30} strokeWidth={1.4} />
        </span>
        <div>
          <span className="ns-micro">CONFIGURABLE GENERALIST AGENT</span>
          <strong>
            CUGA<span>.</span>
          </strong>
          <p>
            Plan <ChevronRight size={11} /> Act <ChevronRight size={11} />{" "}
            Inspect
          </p>
        </div>
        <span className="ns-harness-spark">
          <Sparkles size={17} />
        </span>
      </div>
      <div className="ns-tool-branches" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="ns-tools">
        <div>
          <Database size={19} />
          <span>CRM</span>
          <small>OpenAPI</small>
        </div>
        <div>
          <FileText size={19} />
          <span>Workspace</span>
          <small>MCP</small>
        </div>
        <div>
          <Code2 size={19} />
          <span>Your tools</span>
          <small>Python</small>
        </div>
      </div>
      <div
        className={`ns-approval ${stage === 2 ? "ns-approval-waiting" : ""}`}
      >
        <ShieldCheck size={20} />
        <div>
          <strong>Tool Approval</strong>
          <span>
            {stage === 4
              ? "CRM update approved by you"
              : stage === 5
                ? "CRM update denied by you"
                : "Your approval before CRM updates"}
          </span>
        </div>
        <span className="ns-policy-badge">
          {stage === 4 ? "APPROVED" : stage === 5 ? "BLOCKED" : "POLICY"}
        </span>
      </div>
      <div className="ns-scene-footer">
        <div className="ns-scene-status" role="status">
          <span
            className={`ns-status-dot ${stage === 2 ? "ns-dot-amber" : ""}`}
          />
          {statuses[stage]}
        </div>
        {stage === 2 ? (
          <div className="ns-scene-decisions">
            <button onClick={() => setStage(5)}>Deny</button>
            <button onClick={() => setStage(3)} className="ns-approve-button">
              Approve <Check size={13} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setStage(1)}
            disabled={stage === 1 || stage === 3}
          >
            {stage === 0 ? (
              <>
                <Play size={12} fill="currentColor" />
                Run illustration
              </>
            ) : stage === 1 || stage === 3 ? (
              <>Running…</>
            ) : (
              <>
                <RotateCcw size={12} />
                Replay
              </>
            )}
          </button>
        )}
      </div>
      <div className="ns-scene-disclosure">
        INTERACTIVE ILLUSTRATION · NO LIVE TOOLS
      </div>
      <div className="ns-scene-sticker">
        <Fingerprint size={18} />
        <span>
          THE BOUNDARY
          <br />
          <strong>IS YOURS.</strong>
        </span>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="ns-hero">
      <div className="ns-container ns-hero-grid">
        <div className="ns-hero-copy">
          <p className="ns-eyebrow">
            <span className="ns-line" />
            THE ENTERPRISE AGENT HARNESS
          </p>
          <h1>
            Enterprise
            <br />
            automation.
            <br />
            <span>
              Under your
              <br />
              control.
            </span>
          </h1>
          <p className="ns-hero-description">
            Turn business requests into actions across your applications, APIs,
            and documents. Run on your infrastructure. Govern every workflow
            with your policies.
          </p>
          <div className="ns-hero-actions">
            <a href="#build" className="ns-button">
              Build with CUGA <ArrowUpRight size={18} />
            </a>
            <a href="#platform" className="ns-text-link">
              Explore the platform <ArrowDown size={16} />
            </a>
          </div>
          <div className="ns-hero-note">
            <span className="ns-status-dot" />
            Open source. Built with IBM SiL.
          </div>
        </div>
        <div className="ns-hero-visual">
          <div className="ns-visual-index">
            <span>01 / REQUEST → ACTION</span>
            <span>GOVERNED BY YOU</span>
          </div>
          <WorkflowIllustration />
          <div className="ns-visual-caption">
            <span>Connect. Configure. Execute.</span>
            <span>CUGA / SYSTEM OVERVIEW</span>
          </div>
        </div>
      </div>
      <div className="ns-container ns-principles">
        <div>
          <Globe2 size={18} />
          <span>Your infrastructure</span>
          <small>Private cloud & air-gapped preparation</small>
        </div>
        <div>
          <ShieldCheck size={18} />
          <span>Your policies</span>
          <small>Fine-grained execution control</small>
        </div>
        <div>
          <Zap size={18} />
          <span>Your models</span>
          <small>Open models & efficient inference</small>
        </div>
      </div>
    </section>
  );
}

const productViews = [
  {
    label: "Agent manager",
    icon: LayoutGrid,
    image: "manager",
    title: "From draft to deployed.",
    text: "Connect tools, configure policies, and try your agent beside a draft chat. Publish a version when it is ready.",
    note: "Current manager UI with illustrative Revenue Operations configuration.",
  },
  {
    label: "Execution policies",
    icon: ShieldCheck,
    image: "policies",
    title: "Decide where an agent may act.",
    text: "Choose which tools require approval. Review the proposed action before allowing execution.",
    note: "Tool Approval configuration with illustrative CRM update rules.",
  },
  {
    label: "Events Studio",
    icon: Workflow,
    image: "events",
    title: "Give recurring work a workflow.",
    text: "Respond to schedules, webhooks, and application events. Inspect triggers, run history, and captured output in one workspace.",
    note: "Sample workflows and run history. The events service is deployed separately.",
  },
  {
    label: "Memory",
    icon: Layers3,
    image: "memory",
    title: "Build on previous experience.",
    text: "Retrieve relevant guidance and preferences with Evolve. Inspect what is remembered, where it came from, and when it was used.",
    note: "Illustrative memory records. Requires a configured Evolve backend.",
  },
];

function ProductSection() {
  const [selected, setSelected] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const view = productViews[selected];
  return (
    <section id="platform" className="ns-product ns-section">
      <div className="ns-container">
        <div className="ns-section-heading">
          <div>
            <p className="ns-eyebrow">02 / THE PLATFORM</p>
            <h2>
              Less scaffolding.
              <br />
              <span>More actual work.</span>
            </h2>
          </div>
          <div className="ns-heading-aside">
            <p>
              Your tools. Your domain expertise. One workspace to turn them into
              an agent people can use.
            </p>
            <button
              className="ns-text-link"
              data-analytics-event="product_tour_open"
              onClick={() => dialogRef.current?.showModal()}
            >
              <span className="ns-play-icon">
                <Play size={10} fill="currentColor" />
              </span>
              Watch the product tour <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
        <div
          className="ns-product-tabs"
          role="tablist"
          aria-label="Explore the product"
        >
          {productViews.map((item, i) => (
            <button
              key={item.image}
              id={`ns-product-tab-${i}`}
              role="tab"
              aria-selected={selected === i}
              aria-controls="ns-product-panel"
              tabIndex={selected === i ? 0 : -1}
              className={selected === i ? "ns-selected" : ""}
              onClick={() => setSelected(i)}
              onKeyDown={(event) => {
                if (
                  ["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)
                ) {
                  event.preventDefault();
                  const next =
                    event.key === "Home"
                      ? 0
                      : event.key === "End"
                        ? 3
                        : (selected + (event.key === "ArrowRight" ? 1 : 3)) % 4;
                  setSelected(next);
                  document.getElementById(`ns-product-tab-${next}`)?.focus();
                }
              }}
            >
              <item.icon size={17} />
              {item.label}
              <span>0{i + 1}</span>
            </button>
          ))}
        </div>
        <div
          id="ns-product-panel"
          role="tabpanel"
          aria-labelledby={`ns-product-tab-${selected}`}
          tabIndex={0}
        >
          <div className="ns-browser-frame">
            <div className="ns-browser-bar">
              <span className="ns-window-dots">
                <i />
                <i />
                <i />
              </span>
              <span>
                <LockKeyhole size={10} />
                cuga /{" "}
                {view.image === "manager" || view.image === "policies"
                  ? "manage"
                  : view.image === "events"
                    ? "studio"
                    : "memory"}
              </span>
              <span className="ns-frame-label">PRODUCT PREVIEW</span>
            </div>
            <div className="ns-product-image">
              <Screenshot src={`/images/${view.image}.jpg`} alt={view.note} loading="lazy" />
            </div>
          </div>
          <div className="ns-product-detail">
            <h3>{view.title}</h3>
            <p>{view.text}</p>
          </div>
          <p className="ns-media-note">
            {view.note} Screens use sample data; no live workflow is shown.
          </p>
        </div>
      </div>
      <dialog
        className="ns-tour-dialog"
        aria-label="CUGA product tour"
        ref={dialogRef}
        onClose={() => videoRef.current?.pause()}
      >
        <div className="ns-tour-header">
          <span>Inside CUGA / Product tour</span>
          <button
            aria-label="Close product tour"
            onClick={() => dialogRef.current?.close()}
          >
            <X size={22} />
          </button>
        </div>
        <video
          ref={videoRef}
          controls
          preload="none"
          playsInline
          src="/videos/product-tour.mp4"
        />
        <p>
          Current product UI with illustrative data. This tour does not show a
          live agent run.
        </p>
      </dialog>
    </section>
  );
}

const policies = [
  {
    name: "Intent Guard",
    verb: "Set the boundaries.",
    description:
      "Block or respond to requests matching configured intent rules before the workflow proceeds.",
    code: "request.intent",
    result: "Check the request",
    icon: Fingerprint,
  },
  {
    name: "Playbook",
    verb: "Bring your expertise.",
    description:
      "Supply a standard process for a matching task. Give the agent the steps your team already trusts.",
    code: "workflow.instructions",
    result: "Guide the process",
    icon: FileText,
  },
  {
    name: "Tool Approval",
    verb: "Keep the final say.",
    description:
      "Pause selected tool execution for human approval. Review the proposed action before it runs.",
    code: "crm.update_account",
    result: "Human approval required",
    icon: ShieldCheck,
  },
  {
    name: "Tool Guide",
    verb: "Enforce the rules.",
    description:
      "Add domain instructions and attach ToolGuard code. An applicable, enabled guard checks the call before the underlying tool executes.",
    code: "tool.guard.check()",
    result: "Allow or block the call",
    icon: LockKeyhole,
  },
  {
    name: "Output Formatter",
    verb: "Make results usable.",
    description:
      "Shape the response to match a configured format, ready for people or downstream systems.",
    code: "response.format",
    result: "Return the configured format",
    icon: Code2,
  },
];

function PoliciesSection() {
  const [selected, setSelected] = useState(2);
  const policy = policies[selected];
  return (
    <section id="control" className="ns-control ns-section">
      <div className="ns-container">
        <div className="ns-section-heading">
          <div>
            <p className="ns-eyebrow">03 / CONTROL AT EXECUTION</p>
            <h2>
              Let agents act.
              <br />
              <span>On your terms.</span>
            </h2>
          </div>
          <p className="ns-heading-aside">
            Five policy types. Configure the boundaries in the UI or Python SDK,
            then decide where automation needs explicit control.
          </p>
        </div>
        <div className="ns-policy-layout">
          <div className="ns-policy-list" aria-label="Policy types">
            {policies.map((item, i) => (
              <button
                key={item.name}
                onClick={() => setSelected(i)}
                aria-pressed={selected === i}
                className={selected === i ? "ns-selected" : ""}
              >
                <span className="ns-policy-number">0{i + 1}</span>
                <item.icon size={20} />
                <span>{item.name}</span>
                <ArrowUpRight size={17} />
              </button>
            ))}
          </div>
          <div className="ns-policy-explanation" aria-live="polite">
            <div className="ns-policy-graphic">
              <div className="ns-policy-wire" />
              <span className="ns-policy-input">
                <Terminal size={15} />
                <code>{policy.code}</code>
              </span>
              <span className="ns-policy-check">
                <policy.icon size={29} />
                <span>{policy.name}</span>
              </span>
              <span className="ns-policy-output">
                <span className="ns-status-dot" />
                {policy.result}
              </span>
            </div>
            <div className="ns-policy-copy">
              <h3>{policy.verb}</h3>
              <p>{policy.description}</p>
              <External
                href={`${DOCS}/docs/build/policies/`}
                className="ns-text-link"
              >
                Explore policies <ArrowUpRight size={15} />
              </External>
            </div>
          </div>
        </div>
        <p className="ns-policy-footnote">
          Intent matching and natural-language guidance depend on configuration.
          Use applicable ToolGuards and approval gates when execution needs
          explicit control.
        </p>
      </div>
    </section>
  );
}

function CapabilitiesSection() {
  const items = [
    {
      icon: Network,
      name: "Specialists, working together.",
      text: "Coordinate focused agents through CugaSupervisor. Give each specialist its own tools and instructions.",
      tag: "MULTI-AGENT",
      href: `${DOCS}/docs/build/cuga-supervisor/`,
    },
    {
      icon: FileText,
      name: "Answers with their sources.",
      text: "Combine shared company documents with conversation uploads, then inspect the citations.",
      tag: "KNOWLEDGE",
      href: `${SOURCE}/docs/examples/knowledge_demo/README.md`,
    },
    {
      icon: Layers3,
      name: "Expertise you can reuse.",
      text: "Package procedures in SKILL.md files. Load relevant instructions when a task needs them.",
      tag: "AGENT SKILLS",
      href: `${SOURCE}/docs/readme/configuration-guide.md#agent-skills`,
    },
  ];
  return (
    <section className="ns-capabilities">
      <div className="ns-container">
        <div className="ns-capability-intro">
          <span className="ns-eyebrow">BUILT AROUND YOUR TEAM’S EXPERTISE</span>
          <span>Connect the tools. Keep the context.</span>
        </div>
        <div className="ns-capability-grid">
          {items.map((item) => (
            <External key={item.tag} href={item.href} className="ns-capability">
              <div className="ns-capability-top">
                <item.icon size={25} strokeWidth={1.4} />
                <ArrowUpRight size={18} />
              </div>
              <p className="ns-micro">{item.tag}</p>
              <h3>{item.name}</h3>
              <p>{item.text}</p>
            </External>
          ))}
        </div>
      </div>
    </section>
  );
}

const deployments = [
  {
    title: "Local & private cloud",
    index: "01",
    text: "Run the CLI or SDK against your own model endpoint and internal tools.",
    tags: ["CLI + SDK", "Private endpoints"],
    icon: Server,
  },
  {
    title: "Kubernetes",
    index: "02",
    text: "Deploy with the Helm chart, your image registry, and Kubernetes secrets.",
    tags: ["Helm chart", "Your registry"],
    icon: Network,
  },
  {
    title: "Air-gapped environments",
    index: "03",
    text: "Prepare dependencies, images, and supporting model artifacts for disconnected deployment.",
    tags: ["Preloaded artifacts", "Local inference"],
    icon: LockKeyhole,
  },
];

function DeploymentSection() {
  return (
    <section id="deploy" className="ns-deploy ns-section">
      <div className="ns-container">
        <div className="ns-deploy-heading">
          <div>
            <p className="ns-eyebrow">04 / SOVEREIGN BY CONFIGURATION</p>
            <h2>
              Your environment.
              <br />
              <span>
                No compromises
                <br />
                on ownership.
              </span>
            </h2>
          </div>
          <div className="ns-boundary-art" aria-hidden="true">
            <div className="ns-boundary-label">
              <LockKeyhole size={12} />
              YOUR BOUNDARY
            </div>
            <div className="ns-orbit ns-orbit-one" />
            <div className="ns-orbit ns-orbit-two" />
            <div className="ns-boundary-core">
              <CircuitBoard size={31} />
              <strong>CUGA</strong>
            </div>
            <span className="ns-orbit-node ns-node-model">
              <CircuitBoard size={17} />
              Models
            </span>
            <span className="ns-orbit-node ns-node-data">
              <Database size={17} />
              Data
            </span>
            <span className="ns-orbit-node ns-node-tools">
              <Workflow size={17} />
              Tools
            </span>
          </div>
        </div>
        <div className="ns-deploy-options">
          {deployments.map((item) => (
            <article key={item.index}>
              <div className="ns-deploy-option-top">
                <item.icon size={24} />
                <span>{item.index}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <div className="ns-deploy-tags">
                {item.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
        <div className="ns-deploy-note">
          <p>
            Keep providers, connectors, and optional services inside your
            boundary. For air-gapped use, deploy your reasoning model and
            inference server separately.
          </p>
          <External
            className="ns-text-link"
            href={`${SOURCE}/deployment/README.md`}
          >
            Deployment guide <ArrowUpRight size={16} />
          </External>
        </div>
      </div>
    </section>
  );
}

function BenchmarksSection() {
  return (
    <section id="proof" className="ns-benchmarks ns-section">
      <div className="ns-container">
        <div className="ns-section-heading">
          <div>
            <p className="ns-eyebrow">05 / RESEARCH FOUNDATIONS</p>
            <h2>
              Measured on tasks.
              <br />
              <span>Built for your workload.</span>
            </h2>
          </div>
          <p className="ns-heading-aside">
            Strong benchmark foundations. Open models, reasoning modes, and tool
            budgets to tune what comes next.
          </p>
        </div>
        <div className="ns-benchmark-grid">
          <div className="ns-benchmark-feature">
            <div className="ns-benchmark-title">
              <span>APPWORLD</span>
              <External href="https://appworld.dev/">
                <ArrowUpRight size={18} />
                <span className="ns-sr-only">AppWorld website</span>
              </External>
            </div>
            <div className="ns-score">
              93.5<span>%</span>
            </div>
            <p>Task Goal Completion · Test-Normal</p>
            <span className="ns-benchmark-model">IBM CUGA + GLM-5.3-Flash</span>
            <div className="ns-benchmark-bars">
              <span style={{ width: "93.5%" }} />
              <span style={{ width: "92.8%" }} />
            </div>
          </div>
          <div className="ns-benchmark-table">
            <p className="ns-micro">APPWORLD / EVALUATION BREAKDOWN</p>
            <table>
              <thead>
                <tr>
                  <th scope="col">Evaluation set</th>
                  <th scope="col">
                    Task Goal
                    <br />
                    Completion
                  </th>
                  <th scope="col">
                    Scenario Goal
                    <br />
                    Completion
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Test-Normal</th>
                  <td>93.5%</td>
                  <td>91.1%</td>
                </tr>
                <tr>
                  <th scope="row">Test-Challenge</th>
                  <td>92.8%</td>
                  <td>84.2%</td>
                </tr>
              </tbody>
            </table>
            <div className="ns-webarena">
              <div>
                <strong>61.7%</strong>
                <span>WebArena overall success</span>
              </div>
              <External
                href="https://arxiv.org/html/2510.23856v1"
                className="ns-text-link"
              >
                Published result <ArrowUpRight size={14} />
              </External>
            </div>
          </div>
        </div>
        <div className="ns-benchmark-bottom">
          <span>
            AppWorld figures from the current CUGA README. Results vary with
            model, task, and configuration.
          </span>
          <External href={`${REPO}#strong-benchmark-foundations`}>
            View methodology & sources <ArrowUpRight size={14} />
          </External>
        </div>
        <div id="papers" className="ns-research-links">
          <span className="ns-micro">READ THE RESEARCH</span>
          <External href="https://arxiv.org/abs/2503.01861">
            Towards Enterprise-Ready Computer Using Generalist Agent{" "}
            <ArrowUpRight size={16} />
          </External>
          <External href="https://arxiv.org/abs/2510.23856">
            From Benchmarks to Business Impact <ArrowUpRight size={16} />
          </External>
        </div>
      </div>
    </section>
  );
}

function EcosystemSection() {
  return (
    <section id="ecosystem" className="ns-ecosystem ns-section">
      <div className="ns-container">
        <div className="ns-section-heading">
          <div>
            <p className="ns-eyebrow">06 / KEEP BUILDING</p>
            <h2>
              Start with something.
              <br />
              <span>Make it yours.</span>
            </h2>
          </div>
          <p className="ns-heading-aside">
            Go from exploring an agentic app to building your own. There is more
            than one way in.
          </p>
        </div>
        <div className="ns-ecosystem-grid">
          <External
            href="https://github.com/cuga-project/cuga-apps"
            className="ns-apps-card"
          >
            <div className="ns-ecosystem-card-top">
              <span className="ns-micro">THE APP COLLECTION</span>
              <ArrowUpRight size={23} />
            </div>
            <div className="ns-app-art" aria-hidden="true">
              <div>
                <FileText />
                <span>Research</span>
              </div>
              <div>
                <Database />
                <span>Operations</span>
              </div>
              <div>
                <Network />
                <span>Multi-agent</span>
              </div>
            </div>
            <div className="ns-ecosystem-card-copy">
              <h3>
                CUGA Apps<span>↗</span>
              </h3>
              <p>
                Real agentic apps built with CUGA. Explore the patterns, inspect
                the code, and start with an example.
              </p>
              <span>
                Explore the collection <ArrowRight size={17} />
              </span>
            </div>
          </External>
          <External
            href="https://github.com/cuga-project/cuga-harness-kit"
            className="ns-kit-card"
          >
            <div className="ns-ecosystem-card-top">
              <span className="ns-micro">YOUR CODING ASSISTANT, READY</span>
              <ArrowUpRight size={23} />
            </div>
            <div className="ns-kit-art" aria-hidden="true">
              <div>
                <span>~/your-next-project</span>
                <Terminal size={15} />
              </div>
              <code>
                <span>$</span> cuga-harness-kit init
              </code>
              <p>
                <Check size={12} />
                Skills ready. Let’s build.
              </p>
            </div>
            <div className="ns-ecosystem-card-copy">
              <h3>
                CUGA Harness Kit<span>↗</span>
              </h3>
              <p>
                Skills for Claude Code, Cursor, Codex, and Bob to install,
                launch, and build with CUGA.
              </p>
              <span>
                Get the kit <ArrowRight size={17} />
              </span>
            </div>
          </External>
        </div>
        <div className="ns-community-row">
          <span>Open source works better together.</span>
          <External href="https://discord.gg/PN3Zdq4dEd">
            Join Discord <ArrowUpRight size={15} />
          </External>
          <External href="https://cuga-project.github.io/cuga-skills/">
            Browse skills <ArrowUpRight size={15} />
          </External>
          <Link to="/quiz">
            Test your CUGA knowledge <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}

const cliCode = `git clone https://github.com/cuga-project/cuga-agent.git
cd cuga-agent
uv sync --python 3.12
test -f .env || cp .env.example .env

# Configure your model and credentials in .env
uv run cuga start manager --crm`;
const sdkCode = `import asyncio
from cuga import CugaAgent
from langchain_core.tools import tool

@tool
def get_account_revenue(account_id: str) -> dict:
    """Return revenue from a sample data source."""
    return {"account_id": account_id, "revenue": 250000}

async def main():
    agent = CugaAgent(tools=[get_account_revenue])
    result = await agent.invoke("Revenue for acc_01?")
    print(result.answer)

asyncio.run(main())`;

function BuildSection() {
  const [tab, setTab] = useState("cli");
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const copyTimer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(copyTimer.current), []);
  async function copyCode() {
    try {
      await navigator.clipboard.writeText(tab === "cli" ? cliCode : sdkCode);
      setCopied(true);
      setCopyFailed(false);
      window.clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopyFailed(true);
    }
  }
  return (
    <section id="build" className="ns-build ns-section">
      <div className="ns-container ns-build-grid">
        <div>
          <p className="ns-eyebrow">07 / YOUR NEXT WORKFLOW</p>
          <h2>
            From “what if”
            <br />
            to <span>working.</span>
          </h2>
          <p className="ns-build-description">
            Connect your tools. Configure your model. Build an agent around the
            work you know.
          </p>
          <External href={DOCS} className="ns-button ns-button-lime">
            Read the documentation <ArrowUpRight size={17} />
          </External>
          <div className="ns-build-requirements">
            <span>Python 3.12 + uv</span>
            <span>Your model credentials</span>
          </div>
        </div>
        <div className="ns-code-panel">
          <div className="ns-code-tabs">
            <div role="tablist" aria-label="Quickstart method">
              {[
                ["cli", "CLI quickstart"],
                ["sdk", "Python SDK"],
              ].map(([id, label]) => (
                <button
                  id={`ns-code-tab-${id}`}
                  key={id}
                  role="tab"
                  aria-selected={tab === id}
                  aria-controls="ns-code-content"
                  tabIndex={tab === id ? 0 : -1}
                  className={tab === id ? "ns-selected" : ""}
                  onClick={() => {
                    setTab(id);
                    setCopied(false);
                    setCopyFailed(false);
                  }}
                  onKeyDown={(event) => {
                    if (
                      ["ArrowLeft", "ArrowRight", "Home", "End"].includes(
                        event.key,
                      )
                    ) {
                      event.preventDefault();
                      const next =
                        event.key === "Home"
                          ? "cli"
                          : event.key === "End"
                            ? "sdk"
                            : tab === "cli"
                              ? "sdk"
                              : "cli";
                      setTab(next);
                      setCopied(false);
                      setCopyFailed(false);
                      document.getElementById(`ns-code-tab-${next}`)?.focus();
                    }
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
            <button
              className="ns-copy"
              aria-label={copied ? "Code copied" : "Copy quickstart code"}
              onClick={copyCode}
            >
              {copied ? <Check size={15} /> : <Clipboard size={15} />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>
          <pre
            id="ns-code-content"
            role="tabpanel"
            aria-labelledby={`ns-code-tab-${tab}`}
            tabIndex={0}
          >
            <code>
              {(tab === "cli" ? cliCode : sdkCode)
                .split("\n")
                .map((line, i) => (
                  <span
                    key={`${tab}-${i}`}
                    className={line.startsWith("#") ? "ns-code-comment" : ""}
                  >
                    <i aria-hidden="true">{String(i + 1).padStart(2, "0")}</i>
                    {line || " "}
                    {"\n"}
                  </span>
                ))}
            </code>
          </pre>
          <div className="ns-code-note" role="status">
            {copyFailed ? (
              "Copy unavailable. Select the code above to copy it."
            ) : tab === "cli" ? (
              <>Configure .env, then open /manage at the CLI’s local URL.</>
            ) : (
              <>
                Configure a model first; replace the sample tool with your own
                integration.
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="ns-footer">
      <div className="ns-container">
        <div className="ns-footer-main">
          <div>
            <Brand />
            <p>
              The enterprise agent harness for sovereign,
              <br />
              policy-controlled automation.
            </p>
          </div>
          <div className="ns-footer-links">
            <External href={DOCS}>Documentation</External>
            <External href={REPO}>GitHub</External>
            <External href={`${SOURCE}/CONTRIBUTING.md`}>Contribute</External>
            <External href="https://forms.office.com/r/GjLf7a7fju">
              Contact
            </External>
          </div>
        </div>
        <div className="ns-footer-wordmark" aria-hidden="true">
          CUGA<span>.</span>
          <ArrowUpRight />
        </div>
        <div className="ns-footer-bottom">
          <span>Configurable Generalist Agent · Built with IBM SiL</span>
          <External href={`${SOURCE}/LICENSE`}>Apache 2.0</External>
          <span>© {new Date().getFullYear()} CUGA</span>
          <a href="#main">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}

export {
  ProductSection,
  PoliciesSection,
  CapabilitiesSection,
  DeploymentSection,
  BenchmarksSection,
  EcosystemSection,
  BuildSection,
};

export default function LandingPage() {
  useEffect(() => {
    document.title = "CUGA — Enterprise automation. Under your control.";
  }, []);
  return (
    <div className="ns-site">
      <Header />
      <main id="main">
        <Hero />
        <ProductSection />
        <PoliciesSection />
        <CapabilitiesSection />
        <DeploymentSection />
        <BenchmarksSection />
        <EcosystemSection />
        <BuildSection />
      </main>
      <Footer />
    </div>
  );
}
