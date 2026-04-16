import { Stack, LinearProgress } from "@mui/material";

type TimerProps = {
  timeLeft: number;
  total: number;
};

export function Timer({ timeLeft, total }: TimerProps) {
  const percent = (timeLeft / total) * 100;

  return (
    <Stack spacing={1}>
      <LinearProgress variant="determinate" value={percent} />
    </Stack>
  );
}
