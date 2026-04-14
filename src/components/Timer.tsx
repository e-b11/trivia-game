import { useEffect, useState } from "react";

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    if (state.status !== "playing") return;

    setTimeLeft(10);

    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(interval);
          dispatch({ type: "ANSWER", isCorrect: false });
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.status, state.currentIndex]);

  export default function Timer() {
    <p>⏱️ {timeLeft}s</p>;
  }
};

export default Timer;
