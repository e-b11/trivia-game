import { useEffect, useReducer, useState } from "react";
import { useTrivia } from "../hooks/useTrivia";
import { gameReducer } from "../state/gameReducer";

export default function Game() {
  const trivia = useTrivia();

  const [gameState, dispatch] = useReducer(gameReducer, {
    status: "idle",
  });

  const [randomValue] = useState(() => Math.random());

  // 🔥 BRIDGE: when data loads → start game
  useEffect(() => {
    if (trivia.status === "success") {
      dispatch({ type: "START", questions: trivia.data });
    }
  }, [trivia]);

  // Loading / Error handled separately
  if (trivia.status === "loading") return <p>Loading...</p>;
  if (trivia.status === "error") return <p>{trivia.message}</p>;

  // Game rendering
  if (gameState.status === "playing") {
    const q = gameState.questions[gameState.index];

    const answers = [...q.incorrect_answers, q.correct_answer].sort(
      () => randomValue - 0.5,
    );

    return (
      <div>
        <h2 dangerouslySetInnerHTML={{ __html: q.question }} />

        {answers.map((a) => (
          <button
            key={a}
            onClick={() => dispatch({ type: "ANSWER", answer: a })}
            dangerouslySetInnerHTML={{ __html: a }}
          />
        ))}
      </div>
    );
  }

  if (gameState.status === "feedback") {
    return (
      <div>
        <h2>{gameState.isCorrect ? "✅ Correct!" : "❌ Wrong!"}</h2>
        <p>{gameState.correctAnswer}</p>

        <button onClick={() => dispatch({ type: "NEXT" })}>Next</button>
      </div>
    );
  }

  if (gameState.status === "finished") {
    return (
      <div>
        <h2>
          Score: {gameState.score} / {gameState.total}
        </h2>
      </div>
    );
  }

  return null;
}
