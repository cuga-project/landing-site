import { quizAnswerKey } from "../data/quizAnswerKey";
import { PASS_PERCENT, TOTAL_QUESTIONS } from "./quizConfig";
import { answerHashFor, base64UrlDecode, base64UrlEncode, hmacSign, hmacVerify } from "./quizCrypto";
import type { QuizAttemptPayload, QuizOutcome, QuizQuestion, QuizResponse } from "./quizTypes";

// Same hash-check used for grading, run across all options instead of just
// the chosen one — this is how the review screen reveals which option was
// correct without the pool ever storing a plaintext answer letter.
export async function findCorrectOptionId(question: QuizQuestion): Promise<string | null> {
  const expectedHash = quizAnswerKey[question.id];
  if (!expectedHash) return null;
  for (const option of question.options) {
    const hash = await answerHashFor(question.id, option.id);
    if (hash === expectedHash) return option.id;
  }
  return null;
}

const CODE_PREFIX = "CUGA-QUIZ-V1";

export function generateAttemptId(): string {
  const bytes = new Uint8Array(9);
  crypto.getRandomValues(bytes);
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function gradeResponses(responses: QuizResponse[]): Promise<QuizOutcome> {
  let score = 0;
  for (const response of responses) {
    const expectedHash = quizAnswerKey[response.questionId];
    const actualHash = await answerHashFor(response.questionId, response.optionId);
    if (expectedHash && actualHash === expectedHash) score += 1;
  }
  const total = TOTAL_QUESTIONS;
  const percent = Math.round((score / total) * 100);
  return { score, total, percent, pass: percent >= PASS_PERCENT };
}

export async function buildResultCode(payload: QuizAttemptPayload): Promise<string> {
  const payloadB64 = base64UrlEncode(JSON.stringify(payload));
  const signature = await hmacSign(payloadB64);
  return `${CODE_PREFIX}.${payloadB64}.${signature}`;
}

function isQuizResponse(value: unknown): value is QuizResponse {
  return (
    !!value &&
    typeof value === "object" &&
    typeof (value as QuizResponse).questionId === "string" &&
    typeof (value as QuizResponse).optionId === "string"
  );
}

function isQuizOutcome(value: unknown): value is QuizOutcome {
  if (!value || typeof value !== "object") return false;
  const o = value as QuizOutcome;
  return (
    typeof o.score === "number" &&
    typeof o.total === "number" &&
    typeof o.percent === "number" &&
    typeof o.pass === "boolean"
  );
}

function isQuizAttemptPayload(value: unknown): value is QuizAttemptPayload {
  if (!value || typeof value !== "object") return false;
  const p = value as QuizAttemptPayload;
  return (
    p.v === 1 &&
    typeof p.id === "string" &&
    typeof p.ts === "number" &&
    Array.isArray(p.responses) &&
    p.responses.every(isQuizResponse) &&
    isQuizOutcome(p.outcome)
  );
}

// Checks the signature AND re-grades the embedded responses, so a payload
// that merely carries a valid signature but claims a score its responses
// don't actually earn (e.g. zero responses claiming 10/10) is rejected —
// not just one whose bytes were edited after signing.
export async function verifyResultCode(
  code: string
): Promise<{ valid: boolean; payload: QuizAttemptPayload | null; reason?: string }> {
  try {
    const trimmed = code.trim();
    const parts = trimmed.split(".");
    if (parts.length !== 3 || parts[0] !== CODE_PREFIX) {
      return { valid: false, payload: null, reason: "Not a recognized quiz result code." };
    }
    const [, payloadB64, signature] = parts;

    let decoded: unknown;
    try {
      decoded = JSON.parse(base64UrlDecode(payloadB64));
    } catch {
      return { valid: false, payload: null, reason: "Payload could not be decoded." };
    }

    if (!isQuizAttemptPayload(decoded)) {
      return { valid: false, payload: null, reason: "Payload doesn't match the expected result-code structure." };
    }
    const payload = decoded;

    let signatureValid: boolean;
    try {
      signatureValid = await hmacVerify(payloadB64, signature);
    } catch {
      return { valid: false, payload: null, reason: "Signature could not be read." };
    }
    if (!signatureValid) {
      return { valid: false, payload: null, reason: "Signature does not match — this code was edited or corrupted." };
    }

    if (payload.responses.length !== TOTAL_QUESTIONS) {
      return {
        valid: false,
        payload: null,
        reason: `Expected ${TOTAL_QUESTIONS} responses, found ${payload.responses.length} — inconsistent code.`,
      };
    }

    const recomputed = await gradeResponses(payload.responses);
    const outcomeMatches =
      recomputed.score === payload.outcome.score &&
      recomputed.total === payload.outcome.total &&
      recomputed.percent === payload.outcome.percent &&
      recomputed.pass === payload.outcome.pass;

    if (!outcomeMatches) {
      return {
        valid: false,
        payload: null,
        reason: "Signed, but the outcome doesn't match what these responses actually grade to.",
      };
    }

    return { valid: true, payload };
  } catch {
    return { valid: false, payload: null, reason: "Malformed code." };
  }
}
