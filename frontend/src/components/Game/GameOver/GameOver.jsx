import "./GameOver.css";
import gameOver_illustration from "../../../assets/gameOver_illustration.png";
import { Button } from "@mui/material";

const buttonStyle = {
  width: 180,
  height: 45,
  fontSize: "1.1rem",
  fontWeight: "bold",
  boxShadow: 20,
  mt: 2,
  borderRadius: "15px",
  backgroundColor: "#42C9A3",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#42C9A3",
  },
};

const GameOver = ({ start, difficulty, timeLeft, score }) => {
  return (
    <div className="game-over">
      <h1>
        GAME <span style={{ color: "var(--aquaGreen)" }}>OVER</span>
      </h1>

      <img
        height={100}
        style={{ margin: "20px 0" }}
        src={gameOver_illustration}
        alt="Game Over"
      />

      <span>
        Game Difficulty: <span>{difficulty}</span>
      </span>
      <span>
        Time Left: <span>{timeLeft}</span>
      </span>
      <span>
        Score: <span>{score}</span>
      </span>

      <Button
        variant="contained"
        sx={buttonStyle}
        onClick={() => {
          start();
        }}
      >
        PLAY AGAIN
      </Button>
    </div>
  );
};

export default GameOver;
