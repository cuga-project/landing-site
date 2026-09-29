// This site is fully static (no backend), so nothing in this file is a real
// secret: PEPPER and HMAC_SECRET both ship inside the public JS bundle, and
// anyone willing to read that bundle can extract them and recompute hashes
// or forge signatures. What they DO buy us:
//   - PEPPER: the answer key (src/data/quizAnswerKey.ts) stores
//     sha256(questionId::correctOptionId::PEPPER) instead of a plaintext
//     letter, so a plain grep/skim of the data no longer hands over answers —
//     you have to actually run the hash check to know which option matches.
//   - HMAC_SECRET: a result code changes its signature if any byte of the
//     payload changes, so casually hand-editing a copied code (to fake a
//     pass, or forge someone else's attempt) is caught. It does not stop a
//     determined attacker who extracts the key from the bundle and re-signs.
// True secrecy/integrity would require a server holding these values — see
// the write-up in the PR description for stronger options.

const PEPPER = "cuga-quiz-pepper-v1";
const HMAC_SECRET = "cuga-quiz-hmac-secret-v1";

const textEncoder = new TextEncoder();

export async function sha256Hex(input: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", textEncoder.encode(input));
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function answerHashFor(questionId: string, optionId: string): Promise<string> {
  return sha256Hex(`${questionId}::${optionId}::${PEPPER}`);
}

async function hmacKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    textEncoder.encode(HMAC_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function hmacSign(message: string): Promise<string> {
  const key = await hmacKey();
  const signature = await crypto.subtle.sign("HMAC", key, textEncoder.encode(message));
  return base64UrlEncodeBytes(new Uint8Array(signature));
}

export async function hmacVerify(message: string, signatureB64Url: string): Promise<boolean> {
  const key = await hmacKey();
  const signature = base64UrlDecodeToBytes(signatureB64Url);
  return crypto.subtle.verify("HMAC", key, signature, textEncoder.encode(message));
}

export function base64UrlEncode(input: string): string {
  return base64UrlEncodeBytes(textEncoder.encode(input));
}

export function base64UrlDecode(input: string): string {
  return new TextDecoder().decode(base64UrlDecodeToBytes(input));
}

function base64UrlEncodeBytes(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecodeToBytes(input: string): Uint8Array {
  const padded = input.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(padded + "===".slice((padded.length + 3) % 4));
  return Uint8Array.from(binary, (c) => c.charCodeAt(0));
}
