export type Question = {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export function isQuestion(x: unknown): x is Todo {
  if (typeof x !== "object" || x === null) {
    return false;
  }

  const obj = x as Record<string, unknown>;

  return (
    typeof obj.question === "string" &&
    typeof obj.correct_answer === "string" &&
    Array.isArray(obj.incorrect_answers) &&
    obj.incorrect_answers.every((item) => typeof item === "string")
  );
}
