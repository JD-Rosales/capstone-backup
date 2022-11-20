import "./GameLoader.css";
import hourGlass from "../../assets/hour_glass_loader.gif";

const GameLoader = () => {
  return (
    <div className="game-loader">
      <img src={hourGlass} alt="Loading"></img>
    </div>
  );
};

export default GameLoader;
