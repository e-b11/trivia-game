import { isTriviaResponse, type TriviaQuestion } from "../types/trivia";

export async function fetchTrivia(
  signal: AbortSignal,
): Promise<TriviaQuestion[]> {
  const res = await fetch(
    "https://opentdb.com/api.php?amount=10&type=multiple",
    { signal },
  );

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

  return data.results;
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
