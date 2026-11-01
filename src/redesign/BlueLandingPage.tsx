import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowUpRight,
  CheckCheck,
  Code2,
  Database,
  Globe2,
  LayoutGrid,
  LockKeyhole,
  Menu,
  Network,
  ShieldCheck,
  Workflow,
  X,
  Zap,
} from "lucide-react";
import {
  PoliciesSection,
  CapabilitiesSection,
  DeploymentSection,
  BenchmarksSection,
  EcosystemSection,
  BuildSection,
} from "./LandingPage";
import "./blue.css";
import "./improvements.css";
import { Screenshot } from "./ProductMedia";
import WorkflowSection from "./WorkflowSection";
import AppsSection from "./AppsSection";
import { GitHubStars, useGitHubStars } from "./GitHubStars";

const REPO = "https://github.com/cuga-project/cuga-agent";
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

function BlueBrand() {
  return (
    <a href="/" className="bs-brand" aria-label="CUGA home">
      <img src="/images/cuga-logo.png" alt="" width={35} height={35} />
      <span>CUGA</span>
      <i />
    </a>
  );
}

function BlueHeader({ stars }: { stars: number }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    ["Platform", "#platform"],
    ["Policies", "#control"],
    ["Deployment", "#deploy"],
    ["Community", "#ecosystem"],
  ];
  return (
    <>
      <a className="ns-skip" href="#main">
        Skip to content
      </a>
      <header className="bs-header">
        <div className="ns-container bs-nav">
          <BlueBrand />
          <nav className="bs-desktop-nav" aria-label="Main navigation">
            {links.map(([label, href]) => (
              <a href={href} key={label}>
                {label}
              </a>
            ))}
          </nav>
          <div className="bs-nav-star">
            <GitHubStars stars={stars} compact />
          </div>
          <div className="bs-nav-actions">
            <a href="#apps" className="bs-button bs-button-small">
              Try CUGA Apps <ArrowUpRight size={15} />
            </a>
          </div>
          <button
            className="bs-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="bs-mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
        {menuOpen && (
          <nav
            id="bs-mobile-menu"
            className="bs-mobile-menu"
            aria-label="Mobile navigation"
          >
            {links.map(([label, href]) => (
              <a href={href} key={label} onClick={() => setMenuOpen(false)}>
                {label}
                <ArrowUpRight size={17} />
              </a>
            ))}
            <a href="#apps" onClick={() => setMenuOpen(false)}>
              Try CUGA Apps <ArrowUpRight size={17} />
            </a>
            <External href={DOCS}>
              Get started <ArrowUpRight size={17} />
            </External>
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

const previewScreens = [
  {
    label: "Configure",
    name: "Agent manager",
    image: "manager",
    icon: LayoutGrid,
    title: "Your agent. Ready for work.",
    description:
      "Connect tools and policies beside a draft chat. Test, then publish.",
    path: "manage / revenue-ops",
  },
  {
    label: "Govern",
    name: "Tool Approval",
    image: "policies",
    icon: ShieldCheck,
    title: "You approve the next move.",
    description: "Choose the tools that need approval before execution.",
    path: "manage / policies",
  },
  {
    label: "Automate",
    name: "Events Studio",
    image: "events",
    icon: Workflow,
    title: "Put recurring work in motion.",
    description:
      "Explore schedules and application events with the separate events service.",
    path: "studio / workflows",
  },
];

function ProductPreview() {
  const [active, setActive] = useState(0);
  const screen = previewScreens[active];
  return (
    <div className="bs-preview-shell">
      <div className="bs-preview-meta">
        <span>
          <i />
          CUGA WORKSPACE
        </span>
        <span>
          <LockKeyhole size={10} />
          YOUR ENVIRONMENT
        </span>
      </div>
      <div
        className="bs-preview-tabs"
        role="tablist"
        aria-label="Product preview"
      >
        {previewScreens.map((item, index) => (
          <button
            id={`bs-preview-tab-${index}`}
            role="tab"
            aria-selected={active === index}
            aria-controls="bs-preview-panel"
            tabIndex={active === index ? 0 : -1}
            className={active === index ? "bs-active" : ""}
            key={item.label}
            onClick={() => setActive(index)}
            onKeyDown={(event) => {
              if (
                ["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)
              ) {
                event.preventDefault();
                const next =
                  event.key === "Home"
                    ? 0
                    : event.key === "End"
                      ? 2
                      : (active + (event.key === "ArrowRight" ? 1 : 2)) % 3;
                setActive(next);
                document.getElementById(`bs-preview-tab-${next}`)?.focus();
              }
            }}
          >
            <item.icon size={14} />
            {item.label}
            <span>0{index + 1}</span>
          </button>
        ))}
      </div>
      <div
        className="bs-preview-panel"
        id="bs-preview-panel"
        role="tabpanel"
        aria-labelledby={`bs-preview-tab-${active}`}
        tabIndex={0}
      >
        <div className="bs-preview-topbar">
          <span className="bs-window-dots">
            <i />
            <i />
            <i />
          </span>
          <code>cuga / {screen.path}</code>
          <span>DRAFT</span>
        </div>
        <div className="bs-preview-image">
          <Screenshot
            src={`/images/${screen.image}.jpg`}
            alt={`${screen.name}: current CUGA interface with illustrative configuration data.`}
          />
        </div>
        <div className="bs-preview-detail">
          <div>
            <span className="bs-preview-mini-icon">
              <screen.icon size={17} />
            </span>
            <h2>{screen.title}</h2>
            <p>{screen.description}</p>
          </div>
          <a href="#platform" aria-label="Explore the platform">
            <ArrowUpRight size={21} />
          </a>
        </div>
      </div>
      <div className="bs-preview-foot">
        <span>
          <CheckCheck size={12} />
          Connect → Configure → Test → Publish
        </span>
        <span>SAMPLE DATA · PRODUCT PREVIEW</span>
      </div>
    </div>
  );
}

function BlueHero({ stars }: { stars: number }) {
  return (
    <section className="bs-hero">
      <div className="bs-hero-grid-bg" aria-hidden="true" />
      <nav className="bs-quick-actions" aria-label="Start with CUGA">
        <div className="ns-container">
          <p>Start with CUGA</p>
          <div className="bs-quick-action-buttons">
            <a href="#apps" className="bs-action-button bs-action-primary">
              Try CUGA Apps <ArrowUpRight size={18} />
            </a>
            <External href={DOCS} className="bs-action-button">
              Get started <ArrowUpRight size={18} />
            </External>
            <External
              href="https://github.com/cuga-project/cuga-harness-kit"
              className="bs-action-button"
            >
              Get Harness Kit <ArrowUpRight size={18} />
            </External>
          </div>
        </div>
      </nav>
      <div className="ns-container bs-hero-grid">
        <div className="bs-hero-copy">
          <div className="bs-hero-eyebrow">
            <span className="bs-blue-dot" />
            OPEN SOURCE. ENTERPRISE READY.
          </div>
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
          <p>
            Turn business requests into actions. Connect your applications,
            APIs, and documents with an agent harness built to run on your
            infrastructure.
          </p>
          <div className="bs-hero-star">
            <GitHubStars stars={stars} />
          </div>
          <div className="bs-hero-credits">
            <span>
              Built with <strong>IBM SiL</strong>
            </span>
            <i />
            <External href={`${REPO}/blob/main/LICENSE`}>
              Apache 2.0 <ArrowUpRight size={11} />
            </External>
          </div>
        </div>
        <div className="bs-hero-product">
          <div className="bs-product-caption">
            <span className="bs-caption-line" />
            <span>YOUR WORK, CONNECTED.</span>
          </div>
          <ProductPreview />
          <div className="bs-product-note">
            <span>Actual product interface. Illustrative data.</span>
            <span>01 / EXPLORE CUGA</span>
          </div>
        </div>
      </div>
      <div className="ns-container bs-value-strip">
        <div>
          <span className="bs-value-number">01</span>
          <Globe2 size={20} />
          <div>
            <strong>Your infrastructure.</strong>
            <span>Private cloud & air-gapped preparation</span>
          </div>
        </div>
        <div>
          <span className="bs-value-number">02</span>
          <ShieldCheck size={20} />
          <div>
            <strong>Your policies.</strong>
            <span>Fine-grained execution control</span>
          </div>
        </div>
        <div>
          <span className="bs-value-number">03</span>
          <Zap size={20} />
          <div>
            <strong>Your models.</strong>
            <span>Open models & efficient inference</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function IntegrationStrip() {
  return (
    <section className="bs-integrations">
      <div className="ns-container">
        <p>
          Fits the stack
          <br />
          <strong>you already have.</strong>
        </p>
        <div>
          <span>
            <Network size={18} />
            MCP
          </span>
          <span>
            <Database size={18} />
            OpenAPI
          </span>
          <span>
            <Code2 size={18} />
            Python tools
          </span>
          <span>
            <Globe2 size={18} />
            Browser + API
          </span>
          <span>
            <LockKeyhole size={18} />
            Private models
          </span>
        </div>
      </div>
    </section>
  );
}

function BlueFooter() {
  return (
    <footer className="bs-footer">
      <div className="ns-container">
        <div className="bs-footer-main">
          <div>
            <BlueBrand />
            <p>
              The enterprise agent harness for sovereign,
              <br />
              policy-controlled automation.
            </p>
          </div>
          <div className="bs-footer-links">
            <div>
              <span>BUILD</span>
              <External href={DOCS}>
                Documentation <ArrowUpRight size={12} />
              </External>
              <External href={REPO}>
                GitHub <ArrowUpRight size={12} />
              </External>
              <External href="https://github.com/cuga-project/cuga-harness-kit">
                Harness Kit <ArrowUpRight size={12} />
              </External>
            </div>
            <div>
              <span>CONNECT</span>
              <External href="https://discord.gg/PN3Zdq4dEd">
                Discord <ArrowUpRight size={12} />
              </External>
              <External href={`${REPO}/blob/main/CONTRIBUTING.md`}>
                Contribute <ArrowUpRight size={12} />
              </External>
              <External href="https://forms.office.com/r/GjLf7a7fju">
                Contact <ArrowUpRight size={12} />
              </External>
            </div>
          </div>
        </div>
        <div className="bs-footer-tagline">
          <span>
            Your next workflow
            <br />
            starts <em>here.</em>
          </span>
          <a href="#build" aria-label="Start building with CUGA">
            <ArrowUpRight strokeWidth={1} />
          </a>
        </div>
        <div className="bs-footer-bottom">
          <span>© {new Date().getFullYear()} CUGA · Built with IBM SiL</span>
          <External href={`${REPO}/blob/main/LICENSE`}>
            Open source / Apache 2.0
          </External>
          <a href="#main">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}

export default function BlueLandingPage() {
  const stars = useGitHubStars();
  useEffect(() => {
    document.title = "CUGA — Enterprise automation. Under your control.";
  }, []);
  return (
    <div className="ns-site ns-blue">
      <BlueHeader stars={stars} />
      <main id="main">
        <BlueHero stars={stars} />
        <AppsSection />
        <IntegrationStrip />
        <WorkflowSection />
        <PoliciesSection />
        <CapabilitiesSection />
        <DeploymentSection />
        <BenchmarksSection />
        <EcosystemSection />
        <BuildSection />
      </main>
      <BlueFooter />
    </div>
  );
}
