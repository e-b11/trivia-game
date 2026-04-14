export type TriviaQuestion = {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export type TriviaResponse = {
  response_code: number;
  results: TriviaQuestion[];
};

export function isTriviaResponse(data: unknown): data is TriviaResponse {
  if (typeof data !== "object" || data === null) return false;

  const d = data as TriviaResponse;

  return typeof d.response_code === "number" && Array.isArray(d.results);
}
