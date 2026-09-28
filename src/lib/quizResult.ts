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

export async function verifyResultCode(
  code: string
): Promise<{ valid: boolean; payload: QuizAttemptPayload | null; reason?: string }> {
  const trimmed = code.trim();
  const parts = trimmed.split(".");
  if (parts.length !== 3 || parts[0] !== CODE_PREFIX) {
    return { valid: false, payload: null, reason: "Not a recognized quiz result code." };
  }
  const [, payloadB64, signature] = parts;

  let payload: QuizAttemptPayload;
  try {
    payload = JSON.parse(base64UrlDecode(payloadB64));
  } catch {
    return { valid: false, payload: null, reason: "Payload could not be decoded." };
  }

  const signatureValid = await hmacVerify(payloadB64, signature);
  if (!signatureValid) {
    return { valid: false, payload, reason: "Signature does not match — this code was edited or corrupted." };
  }
  return { valid: true, payload };
}
