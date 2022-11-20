import "./FourPicStart.css";
import fourpics1word_illustration from "../../../assets/fourpics1word_illustration.png";
import { Button } from "@mui/material";

const buttonStyle = {
  width: 150,
  height: 40,
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

const FourPicStart = ({ start }) => {
  return (
    <div className="four-pic-start">
      <h1>
        4 PIC <br /> <span style={{ color: "var(--aquaGreen)" }}>1 WORD</span>
      </h1>

      <img src={fourpics1word_illustration} alt="Guess The Hand Sign" />

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

export default FourPicStart;
