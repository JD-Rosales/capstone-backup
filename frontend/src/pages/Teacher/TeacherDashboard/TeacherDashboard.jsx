import "./TeacherDashboard.css";
import { useEffect, useRef } from "react";
import teacher2 from "../../../assets/Teacher2.png";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  reset,
  getEnrolledStudents,
} from "../../../features/student/studentSlice";
import { getAssignments } from "../../../features/assignment/assignmentSlice";
import { toast } from "react-toastify";
import GameLogs from "../../../components/GameLogs/GameLogs";
import { useNavigate } from "react-router-dom";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";

const TeacherDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const classCodeRef = useRef(null);

  const { user, token } = useSelector((state) => state.auth);
  const { data, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.student
  );

  const { data: allAssignment } = useSelector((state) => state.assignment);

  useEffect(() => {
    const params = {
      classCode: user.userInfo.classCode,
      token: token,
    };
    dispatch(getEnrolledStudents(params));
    dispatch(getAssignments(params));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
    }

    if (isError) {
      dispatch(reset());
      toast.error(message);
    }
    // eslint-disable-next-line
  }, [data, isLoading, isError, isSuccess, message]);

  return (
    <div className="teacher-dashboard">
      <Sidebar />

      <main>
        <Grid
          container
          sx={{
            marginTop: "20px",
            p: 2,
            backgroundColor: "var(--navyBlue)",
            borderRadius: "20px",
            maxWidth: "1200px",
          }}
        >
          <Grid
            item={true}
            xs={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h1>
              Hi, Teacher{" "}
              <span style={{ color: "var(--aquaGreen)" }}>
                {user.userInfo.firstName + "!"}
              </span>
            </h1>

            <p>
              It's great to have you here. Ensure that the learners are actively
              engaged with their coursework.
            </p>
          </Grid>
          <Grid item={true} xs={6} align="center">
            <img height={180} src={teacher2} alt="Teacher Illustration" />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: "20px", maxWidth: "1200px" }}>
          <Grid item={true} xs={8}>
            <GameLogs />
          </Grid>
          <Grid
            item={true}
            xs={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              justifyContent: "space-around",
            }}
          >
            <div className="container1">
              <span
                style={{
                  display: "block",
                  width: "60%",
                  wordWrap: "break-word",
                }}
              >
                CLASS CODE{" "}
                <h2 ref={classCodeRef} value={user.userInfo.classCode}>
                  {user.userInfo.classCode}
                </h2>
              </span>

              <ContentCopyRoundedIcon
                className="copyClipboard"
                onClick={() => {
                  navigator.clipboard.writeText(
                    classCodeRef.current.attributes.value.nodeValue
                  );
                  toast("Copied to Clipboard", {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    progress: undefined,
                    theme: "light",
                  });
                }}
              />
            </div>
            <div
              className="container2"
              onClick={() => navigate("/enrolled-students")}
            >
              <span
                style={{
                  display: "block",
                  width: "60%",
                  wordWrap: "break-word",
                }}
              >
                ENROLLED STUDENTS
              </span>

              <h2>{data?.students?.length}</h2>
            </div>
            <div
              className="container3"
              onClick={() => navigate("/teacher/assignments")}
            >
              <span
                style={{
                  display: "block",
                  width: "60%",
                  wordWrap: "break-word",
                }}
              >
                ASSIGNED WORK
              </span>

              <h2>{allAssignment?.length}</h2>
            </div>
          </Grid>
        </Grid>
      </main>
    </div>
  );
};
export default TeacherDashboard;
