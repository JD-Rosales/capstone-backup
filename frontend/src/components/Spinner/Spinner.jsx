import "./Spinner.css";
// import simple_spinner from "../../assets/simple_spinner.gif";
import { RotatingLines } from "react-loader-spinner";

const Spinner = () => {
  return (
    <div className="simple_spinner">
      {/* <img
        className="simple_spinner-image"
        src={simple_spinner}
        alt="Loading"
      ></img> */}
      <RotatingLines
        strokeColor="#42C9A3"
        strokeWidth="4"
        animationDuration="0.75"
        width="80"
        visible={true}
      />
    </div>
  );
};

export default Spinner;
