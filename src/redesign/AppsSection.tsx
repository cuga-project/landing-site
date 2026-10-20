import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Github, LayoutGrid } from "lucide-react";

const SPACE = "https://huggingface.co/spaces/ibm-research/cuga-apps";
const EMBED = "https://ibm-research-cuga-apps.static.hf.space/index.html";
const SOURCE = "https://github.com/cuga-project/cuga-apps";

export default function AppsSection() {
  const frameContainer = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const container = frameContainer.current;
    if (!container) return;
    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="apps"
      className="bs-apps-section ns-section"
      aria-labelledby="bs-apps-title"
    >
      <div className="ns-container">
        <div className="ns-section-heading bs-apps-heading">
          <div>
            <p className="ns-eyebrow">TRY CUGA APPS</p>
            <h2 id="bs-apps-title">
              Find an app.
              <br />
              <span>See what CUGA can do.</span>
            </h2>
          </div>
          <div className="ns-heading-aside">
            <p>
              Browse the live gallery, choose an app, and explore its tools and
              source code.
            </p>
            <div className="bs-apps-links">
              <a
                className="bs-action-button"
                href={SPACE}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open on Hugging Face <ArrowUpRight size={16} />
              </a>
              <a
                className="bs-action-button"
                href={SOURCE}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={16} /> View source on GitHub{" "}
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>
        <div className="bs-apps-browser">
          <div className="bs-apps-toolbar">
            <span>
              <LayoutGrid size={16} /> CUGA Apps / Live gallery
            </span>
            <span>Hosted on Hugging Face</span>
          </div>
          <div className="bs-apps-viewport" ref={frameContainer}>
            {!loaded && (
              <div className="bs-apps-placeholder" role="status">
                <LayoutGrid size={28} />
                <p>
                  {shouldLoad
                    ? "Loading the app gallery…"
                    : "The app gallery loads as you reach it."}
                </p>
                <a href={SPACE} target="_blank" rel="noopener noreferrer">
                  Open on Hugging Face <ArrowUpRight size={16} />
                </a>
              </div>
            )}
            {shouldLoad && (
              <iframe
                src={EMBED}
                title="CUGA Apps — interactive gallery on Hugging Face"
                loading="lazy"
                referrerPolicy="no-referrer"
                onLoad={() => setLoaded(true)}
              />
            )}
          </div>
        </div>
        <p className="bs-apps-note">
          Browse within the gallery. Apps may open in a new tab. If the gallery
          does not appear,{" "}
          <a href={SPACE} target="_blank" rel="noopener noreferrer">
            open it on Hugging Face <ArrowUpRight size={13} />
          </a>
          .
        </p>
      </div>
    </section>
  );
}
