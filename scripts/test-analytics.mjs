import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const source = readFileSync(
  new URL("../src/analytics.ts", import.meta.url),
  "utf8",
);
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2020,
  },
}).outputText;

function setup(hostname = "cuga.dev") {
  const scripts = [];
  const listeners = new Map();
  const deletedCookies = [];
  const exports = {};
  const window = {
    location: { hostname, origin: `https://${hostname}`, pathname: "/" },
  };
  const document = {
    referrer: "https://example.org/source?private=value#fragment",
    head: { appendChild: (script) => scripts.push(script) },
    createElement: () => ({}),
    getElementById: (id) => scripts.find((script) => script.id === id),
    addEventListener: (name, callback) => listeners.set(name, callback),
    removeEventListener: (name, callback) => {
      if (listeners.get(name) === callback) listeners.delete(name);
    },
    set cookie(value) {
      deletedCookies.push(value);
    },
  };
  class Element {
    constructor(href, placement) {
      this.href = href;
      this.placement = placement;
      this.tagName = "A";
    }
    getAttribute(name) {
      return name === "href" ? this.href : null;
    }
    closest(selector) {
      if (selector === "a, button") return this;
      return selector === this.placement ? this : null;
    }
  }
  vm.runInNewContext(compiled, {
    exports,
    window,
    document,
    URL,
    Date,
    Element,
  });
  const calls = () => (window.dataLayer || []).map((args) => Array.from(args));
  return {
    api: exports,
    window,
    scripts,
    listeners,
    deletedCookies,
    calls,
    Element,
  };
}

test("analytics is silent until consent and stays disabled after decline", () => {
  const app = setup();
  assert.equal(app.scripts.length, 0);
  assert.equal(app.window.dataLayer, undefined);
  app.api.setAnalyticsConsent(false);
  assert.equal(app.scripts.length, 0);
  assert.equal(app.listeners.size, 0);
  assert.equal(app.window["ga-disable-G-EM61QTY6TJ"], true);
});

test("localhost, LAN previews, and lookalike domains never initialize Google", () => {
  for (const hostname of [
    "localhost",
    "127.0.0.1",
    "192.168.0.244",
    "preview.cuga.dev",
    "cuga.dev.example.org",
  ]) {
    const app = setup(hostname);
    app.api.setAnalyticsConsent(true);
    assert.equal(app.scripts.length, 0, hostname);
    assert.equal(app.window.dataLayer, undefined, hostname);
  }
});

test("production consent initializes once with the exact ID and advertising denied", () => {
  const app = setup();
  app.api.setAnalyticsConsent(true);
  app.api.setAnalyticsConsent(true);
  assert.equal(app.scripts.length, 1);
  assert.equal(
    app.scripts[0].src,
    "https://www.googletagmanager.com/gtag/js?id=G-EM61QTY6TJ",
  );
  assert.equal(app.calls().filter((call) => call[0] === "config").length, 1);
  const consent = app.calls().find((call) => call[0] === "consent");
  assert.equal(consent[2].analytics_storage, "granted");
  assert.equal(consent[2].ad_storage, "denied");
  assert.equal(consent[2].ad_user_data, "denied");
  assert.equal(consent[2].ad_personalization, "denied");
  const config = app.calls().find((call) => call[0] === "config");
  assert.equal(config[1], "G-EM61QTY6TJ");
  assert.equal(config[2].allow_google_signals, false);
});

test("only known destinations are classified and private query values are not captured", () => {
  const app = setup();
  const classify = app.api.classifyLink;
  assert.equal(classify("/#apps", "https://cuga.dev"), "try_cuga_apps");
  assert.equal(
    classify("https://docs.cuga.dev/docs/", "https://cuga.dev"),
    "get_started",
  );
  assert.equal(
    classify(
      "https://github.com/cuga-project/cuga-harness-kit",
      "https://cuga.dev",
    ),
    "harness_kit_click",
  );
  assert.equal(
    classify("https://github.com/cuga-project/cuga-apps", "https://cuga.dev"),
    "apps_source_click",
  );
  assert.equal(
    classify("https://github.com/cuga-project/cuga-agent", "https://cuga.dev"),
    "github_click",
  );
  assert.equal(
    classify(
      "https://huggingface.co/spaces/ibm-research/cuga-apps",
      "https://cuga.dev",
    ),
    "huggingface_click",
  );
  assert.equal(
    classify("https://docs.cuga.dev.evil.example/", "https://cuga.dev"),
    undefined,
  );
  assert.equal(
    classify(
      "https://github.com/cuga-project/cuga-agent-unrelated",
      "https://cuga.dev",
    ),
    undefined,
  );
  assert.equal(
    classify("mailto:private@example.org", "https://cuga.dev"),
    undefined,
  );
  app.api.setAnalyticsConsent(true);
  app.listeners.get("click")({
    button: 0,
    target: new app.Element(
      "https://docs.cuga.dev/?email=private@example.org",
      ".bs-quick-actions",
    ),
  });
  const event = app.calls().find((call) => call[0] === "event");
  assert.equal(event[1], "get_started");
  assert.deepEqual(JSON.parse(JSON.stringify(event[2])), {
    placement: "quick_actions",
  });
  assert.equal(JSON.stringify(event).includes("private@example.org"), false);
});

test("revoking consent disables collection, removes the listener, and expires GA cookies", () => {
  const app = setup();
  app.api.setAnalyticsConsent(true);
  app.api.setAnalyticsConsent(false);
  assert.equal(app.window["ga-disable-G-EM61QTY6TJ"], true);
  assert.equal(app.listeners.size, 0);
  assert.ok(app.deletedCookies.some((cookie) => cookie.startsWith("_ga=")));
  assert.ok(
    app.deletedCookies.some((cookie) => cookie.startsWith("_ga_EM61QTY6TJ=")),
  );
  assert.ok(app.deletedCookies.every((cookie) => cookie.includes("Max-Age=0")));
  assert.equal(app.calls().at(-1)[2].analytics_storage, "denied");
  app.api.setAnalyticsConsent(true);
  assert.equal(app.scripts.length, 1);
  assert.equal(app.listeners.size, 1);
});
