import "./GuessHandSignStart.css";
import guessTheHandSign_illustration from "../../../assets/guessTheHandSign_illustration.png";
import { Button } from "@mui/material";

const buttonStyle = {
  width: 180,
  height: 45,
  fontSize: "1.1rem",
  fontWeight: "bold",
  boxShadow: 20,
  mt: 1,
  borderRadius: "15px",
  backgroundColor: "#42C9A3",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#42C9A3",
  },
};

const GuessHandSignStart = ({ start }) => {
  return (
    <div className="guess-hand-sign-start">
      <h1>
        GUESS THE <br />{" "}
        <span style={{ color: "var(--aquaGreen)" }}>HAND SIGN</span>
      </h1>

      <img src={guessTheHandSign_illustration} alt="Guess The Hand Sign" />

      <Button
        variant="contained"
        sx={buttonStyle}
        onClick={() => {
          start();
        }}
      >
        START
      </Button>
    </div>
  );
};

export default GuessHandSignStart;
