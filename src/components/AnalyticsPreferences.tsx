import { useEffect, useRef, useState } from "react";
import { CONSENT_KEY, setAnalyticsConsent } from "../analytics";
import "./analytics.css";

type Consent = "granted" | "denied" | null;
function readConsent(): Consent {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export default function AnalyticsPreferences() {
  const [consent, setConsent] = useState<Consent>(readConsent);
  const [open, setOpen] = useState(() => readConsent() === null);
  const settings = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setAnalyticsConsent(consent === "granted");
  }, [consent]);

  useEffect(() => {
    function syncChoice(event: StorageEvent) {
      if (event.key === CONSENT_KEY || event.key === null) {
        const choice = readConsent();
        setConsent(choice);
        if (choice === null) setOpen(true);
      }
    }
    window.addEventListener("storage", syncChoice);
    return () => window.removeEventListener("storage", syncChoice);
  }, []);

  function choose(value: Exclude<Consent, null>) {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {
      /* Keep the choice for this visit. */
    }
    setConsent(value);
    setOpen(false);
    settings.current?.focus();
  }

  return (
    <div className="ga-preferences">
      <button
        className="ga-settings"
        ref={settings}
        aria-expanded={open}
        aria-controls={open ? "ga-preferences-panel" : undefined}
        onClick={() => setOpen(!open)}
      >
        Analytics settings
      </button>
      {open && (
        <section
          id="ga-preferences-panel"
          className="ga-panel"
          aria-labelledby="ga-preferences-title"
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setOpen(false);
              settings.current?.focus();
            }
          }}
        >
          <h2 id="ga-preferences-title">Website analytics</h2>
          <p>
            Allow optional Google Analytics cookies to measure website visits
            and navigation clicks. We do not track form entries or activity
            inside the Apps embed.
          </p>
          <div className="ga-actions">
            <button className="ga-allow" onClick={() => choose("granted")}>
              Allow analytics
            </button>
            <button onClick={() => choose("denied")}>Decline</button>
          </div>
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Privacy Policy ↗
          </a>
        </section>
      )}
    </div>
  );
}
