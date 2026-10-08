import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import assert from "node:assert/strict";

const manifest = JSON.parse(readFileSync(new URL("../public/install/manifest.json", import.meta.url)));
const script = readFileSync(new URL("../public/install.sh", import.meta.url));
const hash = value => createHash("sha256").update(value).digest("hex");
assert.equal(hash(script), manifest.sha256, "Installer differs from approved manifest");
assert.equal(script.toString().split("\n")[0], "#!/usr/bin/env bash");
assert.ok(script.toString().includes(`CUGA_RELEASE="${manifest.release}"`));
assert.deepEqual(script, readFileSync(new URL(`../public/install/v${manifest.release}.sh`, import.meta.url)));
assert.ok(readFileSync(new URL("../src/components/InstallPanel.tsx", import.meta.url), "utf8").includes(`blob/v${manifest.release}/docs/getting-started.md`));

async function fetchChecked(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(20000) });
  assert.ok(response.ok, `${url} returned ${response.status}`);
  return response;
}
if (process.argv.includes("--release")) {
  const release = await (await fetchChecked(`https://pypi.org/pypi/cuga/${manifest.release}/json`)).json();
  assert.ok(release.urls.some(file => file.packagetype === "bdist_wheel" && !file.yanked), "An approved wheel must be available before deployment");
  const source = Buffer.from(await (await fetchChecked(manifest.source)).arrayBuffer());
  assert.deepEqual(script, source, "Public installer must byte-match the versioned cuga-agent source");
}
if (process.argv.includes("--deployed")) {
  const deployed = Buffer.from(await (await fetchChecked("https://cuga.dev/install.sh")).arrayBuffer());
  assert.equal(hash(deployed), manifest.sha256, "Deployed URL must return the approved shell script");
}
console.log(`Installer ${manifest.release} verified${process.argv.includes("--release") ? " against the published release" : " locally"}.`);
