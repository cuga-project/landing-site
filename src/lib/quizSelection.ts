import { EASY_COUNT, MEDIUM_COUNT, HARD_COUNT } from "./quizConfig";
import type { QuizDifficulty, QuizQuestion } from "./quizTypes";

function cryptoShuffle<T>(items: T[]): T[] {
  const result = [...items];
  const randomValues = new Uint32Array(result.length);
  crypto.getRandomValues(randomValues);
  for (let i = result.length - 1; i > 0; i--) {
    const j = randomValues[i] % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function pickByDifficulty(pool: QuizQuestion[], difficulty: QuizDifficulty, count: number): QuizQuestion[] {
  const candidates = pool.filter((q) => q.difficulty === difficulty);
  return cryptoShuffle(candidates).slice(0, count);
}

// Reorders a question's options for display only — option `id`s (and the
// hashes keyed by them in quizAnswerKey) are untouched, so grading is
// unaffected. Without this, a skewed correct-answer distribution across the
// pool (e.g. "b" far more often than the others) turns into a shortcut: pick
// the same letter every time and pass well above chance.
function shuffleOptionOrder(question: QuizQuestion): QuizQuestion {
  return { ...question, options: cryptoShuffle(question.options) };
}

export function selectQuizQuestions(pool: QuizQuestion[]): QuizQuestion[] {
  const selected = [
    ...pickByDifficulty(pool, "easy", EASY_COUNT),
    ...pickByDifficulty(pool, "medium", MEDIUM_COUNT),
    ...pickByDifficulty(pool, "hard", HARD_COUNT),
  ];
  return cryptoShuffle(selected).map(shuffleOptionOrder);
}
