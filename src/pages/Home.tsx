import {
  Box,
  Typography,
  Button,
  Stack,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Home() {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState("easy");

  const handleStart = () => {
    navigate(`/game?difficulty=${difficulty}`);
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        spacing={4}
        sx={{
          width: "100%",
          maxWidth: 400,
          px: 2,
          mx: "auto",
          alignItems: "center",
        }}
      >
        <SportsEsportsIcon sx={{ fontSize: 90 }} />

        <Typography
          variant="h2"
          sx={{
            textAlign: "center",
            color: "#ffffff",
          }}
        >
          Trivia Game
        </Typography>

        <FormControl fullWidth>
          <Select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            sx={{
              bgcolor: "white",
              borderRadius: 2,
            }}
          >
            <MenuItem value="easy">Easy</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="hard">Hard</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          onClick={handleStart}
          sx={{
            width: "fit-content",
            px: 5,
            py: 1.5,
            fontWeight: "bold",
            letterSpacing: 1,
            borderRadius: 3,
          }}
        >
          Start Game
        </Button>
      </Stack>
    </Box>
  );
}
