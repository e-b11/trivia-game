type GameState =
  | { status: "idle" }
  | { status: "loading" }
  | {
      status: "playing";
      questions: Question[];
      currentIndex: number;
      score: number;
    }
  | { status: "feedback"; isCorrect: boolean; correctAnswer: string }
  | { status: "finished"; score: number; total: number };

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "START":
      return { status: "loading" };

    case "SUCCESS":
      return {
        status: "playing",
        questions: action.questions,
        currentIndex: 0,
        score: 0,
      };

    case "ANSWER":
      return {
        status: "feedback",
        isCorrect: action.isCorrect,
        correctAnswer:
          state.status === "playing"
            ? state.questions[state.currentIndex].correct_answer
            : "",
      };

    case "NEXT":
      if (state.status !== "feedback") return state;

      const nextIndex = (state as any).currentIndex + 1; // we'll fix this cleanly later

      return {
        ...state,
        status: "playing",
        currentIndex: nextIndex,
      };

    case "FINISH":
      return {
        status: "finished",
        score: (state as any).score,
        total: (state as any).questions.length,
      };

    default:
      return state;
  }
}
