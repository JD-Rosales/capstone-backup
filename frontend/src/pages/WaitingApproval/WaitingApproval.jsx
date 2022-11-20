import "./WaitingApproval.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import back from "../../assets/back.png";
import clock from "../../assets/waiting.png";

const WaitingApproval = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      localStorage.clear();
    }, 2000);
  }, []);

  return (
    <div className="waitingApproval">
      <div className="container">
        <div className="header">
          <h1>
            Wa<span>i</span>ting for approval
          </h1>
          <img
            src={back}
            alt="back"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
        <div className="body">
          <div className="side">
            <img src={clock} alt="clock" />
          </div>
          <div className="content">
            <p>Your account is waiting for our administrator's approval </p>
            <br />
            <p>
              Please try logging in your account from time to time. Thank you!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WaitingApproval;
