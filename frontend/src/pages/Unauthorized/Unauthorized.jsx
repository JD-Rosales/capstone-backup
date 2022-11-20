import "./Unauthorized.css";
import { useNavigate } from "react-router-dom";
import back from "../../assets/back.png";
import unauthorize from "../../assets/unauthorized_illustration.png";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="unauthorized">
      <div className="container">
        <div className="header">
          <h1>
            Unauthor<span>i</span>zed Access
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
            <img src={unauthorize} alt="unauthorize illustration" />
          </div>
          <div className="content">
            <p>
              The server could not verify that you are authorized to access the
              Teacher's Dashboard.
            </p>
            <br />
            <p>
              Either you supplied ther wrong credentials or your password does
              not understand how to supply the credentials required.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Unauthorized;
