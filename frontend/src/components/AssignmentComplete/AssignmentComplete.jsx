import "./AssignmentComplete.css";
import check from "../../assets/check.png";
import assignmentComplete_illustration from "../../assets/assignmentComplete_illustration.png";
import moment from "moment";

const AssignmentComplete = ({ data }) => {
  return (
    <div className="assignment-complete">
      <img src={assignmentComplete_illustration} alt="Assignment Completed" />

      <h2>
        ASSIGNMENT <span>COMPLETED</span>
      </h2>

      <hr />

      <div className="data-container">
        <div className="text-container">
          <span>
            SCORE: <span>{data.score}</span>
          </span>

          <br />

          <span>
            Time Left: <span>{data.timeLeft}</span>
          </span>

          <br />

          <span>
            Date:{" "}
            <span style={{ color: data.late ? "#df5c61" : "var(--aquaGreen)" }}>
              {moment(data.date).format("LL")}{" "}
              {moment(data.date).format("h:mma")}
            </span>
          </span>
        </div>
        <div className="check-container">
          <img src={check} alt="Check" />
        </div>
      </div>
    </div>
  );
};

export default AssignmentComplete;
