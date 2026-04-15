import { type TriviaQuestion } from "../types/trivia";

export type GameState =
  | { status: "idle" }
  | {
      status: "playing";
      questions: TriviaQuestion[];
      index: number;
      score: number;
      timeLeft: number;
    }
  | {
      status: "feedback";
      isCorrect: boolean;
      correctAnswer: string;
      index: number;
      score: number;
      questions: TriviaQuestion[];
    }
  | { status: "finished"; score: number; total: number };

export type Action =
  | { type: "START"; questions: TriviaQuestion[] }
  | { type: "ANSWER"; answer: string }
  | { type: "NEXT" }
  | { type: "TICK" }
  | { type: "TIME_UP" };

export function gameReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "START":
      return {
        status: "playing",
        questions: action.questions,
        index: 0,
        score: 0,
        timeLeft: 10,
      };

    case "TICK":
      if (state.status !== "playing") return state;

      if (state.timeLeft < 1) {
        return state;
      }

      return {
        ...state,
        timeLeft: state.timeLeft - 1,
      };

    case "TIME_UP": {
      if (state.status !== "playing") return state;

      const current = state.questions[state.index];

      return {
        status: "feedback",
        isCorrect: false,
        correctAnswer: current.correct_answer,
        index: state.index,
        score: state.score,
        questions: state.questions,
      };
    }

    case "ANSWER": {
      if (state.status !== "playing") return state;

      const current = state.questions[state.index];
      const isCorrect = action.answer === current.correct_answer;

      return {
        status: "feedback",
        isCorrect,
        correctAnswer: current.correct_answer,
        index: state.index,
        score: isCorrect ? state.score + 1 : state.score,
        questions: state.questions,
      };
    }

    case "NEXT": {
      if (state.status !== "feedback") return state;

      const nextIndex = state.index + 1;

      if (nextIndex >= state.questions.length) {
        return {
          status: "finished",
          score: state.score,
          total: state.questions.length,
        };
      }

      return {
        status: "playing",
        questions: state.questions,
        index: nextIndex,
        score: state.score,
        timeLeft: 10,
      };
    }

    default: {
      const _exhaustive: never = action;
      return _exhaustive;
    }
  }
}
