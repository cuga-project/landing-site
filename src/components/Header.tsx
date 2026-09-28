import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";

const fontDisplay = { fontFamily: '"IBM Plex Serif", Georgia, serif' };

const NAV_INPAGE = [
  ["Why CUGA", "/#why-adopt"],
  ["Problem", "/#problem"],
  ["Solution", "/#solution"],
  ["Demos", "/#demos"],
  ["Papers", "/#papers"],
  ["Blogs", "/#blogs"],
];

export const Header = () => {
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
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
          <img
            src="https://avatars.githubusercontent.com/u/231742966?s=48&v=4"
            alt=""
            className="w-9 h-9 rounded-lg ring-1 ring-white/10 group-hover:ring-blue-400/30 transition-all"
          />
          <span className="text-[17px] font-semibold text-white tracking-tight" style={fontDisplay}>
            CUGA
          </span>
        </Link>

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
              href="https://cuga-project.github.io/cuga-skills/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              Skills
            </a>
          </li>
          <li>
            <Link
              to="/quiz"
              className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              Knowledge Check
            </Link>
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
              href="https://cuga-project.github.io/cuga-skills/"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 text-center rounded-lg bg-white/10 text-white font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Skills
            </a>
            <Link
              to="/quiz"
              className="py-3 text-center rounded-lg bg-white/10 text-white font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Knowledge Check
            </Link>
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

export default Header;
