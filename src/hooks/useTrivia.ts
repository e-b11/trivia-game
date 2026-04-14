import { useEffect, useState } from "react";
import { type AsyncState } from "../types/async";
import { type TriviaQuestion } from "../types/trivia";
import { fetchTrivia } from "../api/trivia";

export function useTrivia() {
  const [state, setState] = useState<AsyncState<TriviaQuestion[]>>({
    status: "idle",
  });

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setState({ status: "loading" });

      try {
        const data = await fetchTrivia(controller.signal);
        setState({ status: "success", data });
      } catch (err) {
        setState({
          status: "error",
          message: err instanceof Error ? err.message : "Unknown error",
        });
      }
    }

    load();

    return () => controller.abort();
  }, []);

  return state;
}
