export const MEASUREMENT_ID = "G-EM61QTY6TJ";
export const CONSENT_KEY = "cuga.analytics-consent";

type AnalyticsEvent =
  | "try_cuga_apps"
  | "get_started"
  | "harness_kit_click"
  | "github_click"
  | "apps_source_click"
  | "huggingface_click"
  | "product_tour_open";
type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
    "ga-disable-G-EM61QTY6TJ"?: boolean;
  }
}

let active = false;
let configured = false;

export function isProductionHost(hostname: string) {
  return hostname === "cuga.dev" || hostname === "www.cuga.dev";
}

export function classifyLink(
  href: string,
  origin: string,
): AnalyticsEvent | undefined {
  let url: URL;
  try {
    url = new URL(href, origin);
  } catch {
    return;
  }
  if (url.origin === origin && url.pathname === "/" && url.hash === "#apps")
    return "try_cuga_apps";
  if (url.protocol !== "https:") return;
  if (url.hostname === "docs.cuga.dev") return "get_started";
  if (
    url.hostname === "huggingface.co" &&
    url.pathname.replace(/\/$/, "") === "/spaces/ibm-research/cuga-apps"
  )
    return "huggingface_click";
  if (url.hostname !== "github.com") return;
  const repository = url.pathname.split("/").slice(1, 3).join("/");
  if (repository === "cuga-project/cuga-harness-kit")
    return "harness_kit_click";
  if (repository === "cuga-project/cuga-apps") return "apps_source_click";
  if (repository === "cuga-project/cuga-agent") return "github_click";
}

function trackClick(event: MouseEvent) {
  if (!active || event.button !== 0 || !(event.target instanceof Element))
    return;
  const control = event.target.closest("a, button");
  if (!control) return;
  const name =
    control.getAttribute("data-analytics-event") === "product_tour_open"
      ? "product_tour_open"
      : control.tagName === "A"
        ? classifyLink(
            control.getAttribute("href") || "",
            window.location.origin,
          )
        : undefined;
  if (!name) return;
  const placement = control.closest("header")
    ? "header"
    : control.closest(".bs-quick-actions")
      ? "quick_actions"
      : control.closest("#apps")
        ? "apps_gallery"
        : control.closest("footer")
          ? "footer"
          : "content";
  // Send only allowlisted event names and placements, never input values or link queries.
  window.gtag?.("event", name, { placement });
}

function clearAnalyticsCookies() {
  const names = ["_ga", `_ga_${MEASUREMENT_ID.slice(2)}`];
  for (const name of names) {
    for (const domain of [
      "",
      `; Domain=${window.location.hostname}`,
      "; Domain=cuga.dev",
    ]) {
      document.cookie = `${name}=; Max-Age=0; Path=/${domain}; SameSite=Lax`;
    }
  }
}

export function setAnalyticsConsent(granted: boolean) {
  if (!isProductionHost(window.location.hostname)) return;
  window["ga-disable-G-EM61QTY6TJ"] = !granted;
  if (!granted) {
    active = false;
    document.removeEventListener("click", trackClick, true);
    if (configured) {
      window.gtag?.("consent", "update", { analytics_storage: "denied" });
      clearAnalyticsCookies();
    }
    return;
  }
  if (active) return;
  active = true;
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function () {
      window.dataLayer?.push(arguments);
    };
  }
  const consent = {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  };
  window.gtag("consent", configured ? "update" : "default", consent);
  if (!configured) window.gtag("js", new Date());
  // GA4 Enhanced measurement handles History API page views, including /quiz.
  window.gtag("config", MEASUREMENT_ID, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
  configured = true;
  document.addEventListener("click", trackClick, true);
  if (!document.getElementById("cuga-google-analytics")) {
    const script = document.createElement("script");
    script.id = "cuga-google-analytics";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    document.head.appendChild(script);
  }
}
