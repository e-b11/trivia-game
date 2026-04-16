import { Typography, Stack, LinearProgress } from "@mui/material";

type TimerProps = {
  timeLeft: number;
  total: number;
};

export function Timer({ timeLeft, total }: TimerProps) {
  const percent = (timeLeft / total) * 100;

  return (
    <Stack spacing={1}>
      <Typography variant="body2">Time left: {timeLeft}s</Typography>
      <LinearProgress variant="determinate" value={percent} />
    </Stack>
  );
}
