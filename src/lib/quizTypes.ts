export type QuizDifficulty = "easy" | "medium" | "hard";

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  difficulty: QuizDifficulty;
  question: string;
  options: QuizOption[];
}

export interface QuizResponse {
  questionId: string;
  optionId: string;
}

export interface QuizOutcome {
  score: number;
  total: number;
  percent: number;
  pass: boolean;
}

export interface QuizAttemptPayload {
  v: 1;
  id: string;
  ts: number;
  responses: QuizResponse[];
  outcome: QuizOutcome;
}

export interface DecodedResult {
  payload: QuizAttemptPayload;
  valid: boolean;
}
