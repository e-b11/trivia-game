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

// export async function loadTrivia(
//   signal: AbortSignal,
// ): Promise<TriviaQuestion[]> {
//   setState({ status: "loading" });

//   const result = await fetchJsonUnknown(url, signal);

//   if (!result.ok) {
//     const error = result.error;

//     switch (error.type) {
//       case "network":
//         setState({ status: "error", message: "Network Failure" });
//         return;

//       case "http":
//         setState({
//           status: "error",
//           message: `HTTP error: ${error.status} ${error.statusText}`,
//         });
//         return;

//       case "parse":
//         setState({ status: "error", message: "JSON parse failure" });
//         return;

//       default: {
//         const _exhaustive: never = error;
//         return _exhaustive;
//       }
//     }
//   }

//   const data = result.data;

//   if (!isTriviaResponse(data)) {
//     setState({
//       status: "error",
//       message: "Schema mismatch: Invalid trivia response",
//     });
//     return;
//   }

//   if (data.response_code !== 0) {
//     setState({
//       status: "error",
//       message: "Trivia API returned no results",
//     });
//     return;
//   }

//   setState({ status: "success", data: data.results });
// }
