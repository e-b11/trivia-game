import { useEffect, useReducer, useState } from "react";
import { useTrivia } from "../hooks/useTrivia";
import { gameReducer } from "../state/gameReducer";

export default function Game() {
  const trivia = useTrivia();

  const [gameState, dispatch] = useReducer(gameReducer, {
    status: "idle",
  });

  const [randomValue] = useState(() => Math.random());

  //Effect for making sure trivia questions fetched correctly, starting game
  useEffect(() => {
    if (trivia.status === "success") {
      dispatch({ type: "START", questions: trivia.data });
    }
  }, [trivia]);

  //effect for ticking the timer
  useEffect(() => {
    if (gameState.status !== "playing") return;

    const id = setInterval(() => {
      dispatch({ type: "TICK" });
    }, 1000);

    return () => clearInterval(id);
  }, [gameState.status, gameState.index]);

  //effect for time being up
  useEffect(() => {
    if (gameState.status !== "playing") return;

    if (gameState.timeLeft <= 0) {
      dispatch({ type: "TIME_UP" });
    }
  }, [gameState.timeLeft, gameState.status]);

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
        <p>⏱️ {gameState.timeLeft}s</p>
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
