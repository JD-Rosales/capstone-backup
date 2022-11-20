import "./SpellHandSignStart.css";
import spellHandSign_illustration from "../../../assets/spellHandSign_illustration.png";
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

const SpellHandSignStart = ({ start }) => {
  return (
    <div className="spell-hand-sign-start">
      <h1>
        SPELL THE <br />{" "}
        <span style={{ color: "var(--aquaGreen)" }}>HAND SIGN</span>
      </h1>

      <img src={spellHandSign_illustration} alt="Guess The Hand Sign" />

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

export default SpellHandSignStart;
