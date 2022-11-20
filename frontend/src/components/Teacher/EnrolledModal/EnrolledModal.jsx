import "./EnrolledModal.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { getStudents } from "../../../features/teacher/teacherSlice";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const EnrolledModal = () => {
  const dispatch = useDispatch();
  const { students, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.teacher
  );

  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    const data = {
      classCode: "Dynu97UV",
    };
    // dispatch(getStudents(data));
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setStudentList(students);
    }

    if (isError) {
      alert(message);
    }
  }, [students, isLoading, isError, isSuccess, message]);

  return (
    <div className="enrolledModal">
      <h1>
        ENROLLED <span>STUDENTS</span>
        <span className="closeBtn">X</span>
      </h1>

      <div className="studentListHeader">
        <div></div>
        <div>Name</div>
        <div>Progress</div>
        <div></div>
      </div>

      <div className="dataContainer">
        {studentList.map((data) => {
          return (
            <div key={data._id} className="studentListContainer">
              <div className="userIconContainer">
                <AccountCircleIcon className="icon" />
              </div>
              <div className="name">
                {data.userInfo.lastName}, {data.userInfo.firstName}{" "}
                {data.userInfo.middleInitial}.
              </div>
              <div className="progressContainer">
                <div className="progress">
                  <div className="lineProgress"></div>
                </div>
              </div>

              <div className="option">
                <MoreVertIcon />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EnrolledModal;
