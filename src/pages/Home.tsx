import { Box, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: "100%", px: 2 }}>
      <Stack spacing={4} alignitems="center" mt={10}>
        <Typography
          variant="h4"
          sx={{
            fontSize: {
              xs: "1.5rem",
              sm: "2rem",
              md: "2.5rem",
            },
          }}
        >
          Trivia Game
        </Typography>

        <Typography variant="body1" textalign="center">
          Test your knowledge with timed questions!
        </Typography>

        <Button
          variant="contained"
          size="medium"
          onClick={() => navigate("/game")}
        >
          Start Game
        </Button>
      </Stack>
    </Box>
  );
};

export default Home;
