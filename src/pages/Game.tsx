import { useEffect, useReducer, useState } from "react";
import { useTrivia } from "../hooks/useTrivia";
import { gameReducer } from "../state/gameReducer";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { Timer } from "../components/Timer";
import QuestionCard from "../components/QuestionCard";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

export default function Game() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const difficulty = params.get("difficulty") || "easy";

  const trivia = useTrivia(difficulty);

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
  }, [gameState]);

  //effect for time being up
  useEffect(() => {
    if (gameState.status !== "playing") return;

    if (gameState.timeLeft <= 0) {
      dispatch({ type: "TIME_UP" });
    }
  }, [gameState]);

  if (trivia.status === "loading") return <p>Loading...</p>;
  if (trivia.status === "error") return <p>{trivia.message}</p>;

  // Game rendering
  if (gameState.status === "playing") {
    const q = gameState.questions[gameState.index];

    const answers = [...q.incorrect_answers, q.correct_answer].sort(
      () => randomValue - 0.5,
    );

    return (
      <Box
        sx={{
          width: "100%",
          maxWidth: 600,
          mx: "auto",
          px: 2,
        }}
      >
        <Stack spacing={3} sx={{ mt: 4 }}>
          {/* Timer */}
          <Timer timeLeft={gameState.timeLeft} total={10} />

          {/* Question */}
          <QuestionCard
            question={q.question}
            answers={answers}
            onAnswer={(a) => dispatch({ type: "ANSWER", answer: a })}
          />
        </Stack>
      </Box>
    );
  }

  if (gameState.status === "feedback") {
    return (
      <Card>
        <CardContent>
          <Stack spacing={3} sx={{ alignItems: "center" }}>
            <Typography variant="h5">
              {gameState.isCorrect ? "✅ Correct!" : "❌ Wrong!"}
            </Typography>

            <Typography>Correct Answer: {gameState.correctAnswer}</Typography>

            <Button
              variant="contained"
              onClick={() => dispatch({ type: "NEXT" })}
            >
              Next Question
            </Button>
          </Stack>
        </CardContent>
      </Card>
    );
  }

  if (gameState.status === "finished") {
    return (
      <Card>
        <CardContent>
          <Stack spacing={3} sx={{ alignItems: "center" }}>
            <Typography variant="h4">Game Over 🎉</Typography>

            <Typography variant="h6">
              Score: {gameState.score} / {gameState.total}
            </Typography>

            <Button variant="contained" onClick={() => navigate("/")}>
              Play Again
            </Button>
          </Stack>
        </CardContent>
      </Card>
    );
  }

  return null;
}
