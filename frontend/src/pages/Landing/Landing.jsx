import "./Landing.css";
import illustration1 from "../../assets/illustration1.png";
import logo2 from "../../assets/logo2.png";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <nav>
        <img src={logo2} alt="logo"></img>
      </nav>

      <main>
        <div className="illustrator-container">
          <img src={illustration1} alt="Illustration"></img>
        </div>
        <div className="header-container">
          <h1>
            IT'S A <span>BEAUTIFUL</span> <br />
            DAY TO <span>LEARN</span> <br />
            SOMETHING <span>NEW</span>!
          </h1>

          <span className="subtitle">
            Get a better understanding of the sign lanuage that is most widely
            used around the world.
          </span>

          <button
            className="getStarted"
            onClick={() => {
              navigate("/login");
            }}
          >
            Access Your Account
          </button>

          <span id="signUp">
            Don't have an account?
            <span
              className="signUp"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign Up
            </span>
          </span>
        </div>
      </main>
    </div>
  );
};

export default Landing;
