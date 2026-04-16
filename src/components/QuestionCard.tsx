import { Card, CardContent, Typography, Stack, Button } from "@mui/material";

type Props = {
  question: string;
  answers: string[];
  onAnswer: (a: string) => void;
};

export default function QuestionCard({ question, answers, onAnswer }: Props) {
  return (
    <Card elevation={3}>
      <CardContent>
        <Stack spacing={3}>
          <Typography variant="h6">{question}</Typography>

          <Stack
            spacing={2}
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
          >
            {answers.map((a) => (
              <Button
                key={a}
                variant="outlined"
                onClick={() => onAnswer(a)}
                fullWidth
              >
                {a}
              </Button>
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
