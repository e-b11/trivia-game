import { isTriviaResponse, type TriviaQuestion } from "../types/trivia";
import he from "he";

export async function fetchTrivia(
  difficulty: string,
  signal: AbortSignal,
): Promise<TriviaQuestion[]> {
  const url = `https://opentdb.com/api.php?amount=10&type=multiple&difficulty=${difficulty}`;

  const res = await fetch(url, { signal });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  const data: unknown = await res.json();

  if (!isTriviaResponse(data)) {
    throw new Error("Invalid response shape");
  }

  if (data.response_code !== 0) {
    throw new Error("Trivia API returned no results");
  }

  return data.results.map((q) => ({
    ...q,
    question: he.decode(q.question),
    correct_answer: he.decode(q.correct_answer),
    incorrect_answers: q.incorrect_answers.map(he.decode),
  }));
}
