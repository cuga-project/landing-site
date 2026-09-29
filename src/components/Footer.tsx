import type { CSSProperties } from "react";
import { Link } from "react-router-dom";

const footerLinks = [
  { label: "Docs", href: "https://docs.cuga.dev" },
  { label: "Skills", href: "https://cuga-project.github.io/cuga-skills/" },
  { label: "Knowledge Check", href: "/quiz" },
  { label: "GitHub", href: "https://github.com/cuga-project/cuga-agent" },
  { label: "Papers", href: "/#papers" },
  { label: "Contact", href: "https://forms.office.com/r/GjLf7a7fju" },
];

export const Footer = () => {
  const s: CSSProperties = {
    backgroundColor: "#05080f",
    borderTop: "1px solid rgba(255,255,255,0.07)",
    padding: "56px 20px 32px",
    fontFamily: "IBM Plex Sans, system-ui, sans-serif",
  };
  const inner: CSSProperties = {
    maxWidth: 1152,
    margin: "0 auto",
    display: "flex",
    flexWrap: "wrap" as const,
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 32,
  };
  const brand: CSSProperties = {
    display: "flex",
    flexDirection: "column" as const,
    gap: 4,
  };
  const brandName: CSSProperties = {
    color: "#ffffff",
    fontWeight: 600,
    fontSize: 16,
    fontFamily: '"IBM Plex Serif", Georgia, serif',
  };
  const brandDesc: CSSProperties = {
    color: "rgba(255,255,255,0.55)",
    fontSize: 13,
    maxWidth: 320,
    lineHeight: 1.6,
  };
  const nav: CSSProperties = {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "12px 32px",
    alignItems: "center",
  };
  const linkStyle: CSSProperties = {
    color: "rgba(255,255,255,0.6)",
    textDecoration: "none",
    fontSize: 14,
  };
  const copy: CSSProperties = {
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
            ) : href.startsWith("/") ? (
              <Link key={label} to={href} style={linkStyle}>
                {label}
              </Link>
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

export default Footer;
