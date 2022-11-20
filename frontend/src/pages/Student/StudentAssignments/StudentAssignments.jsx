import "./StudentAssignments.css";
import { useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import assignment_illustration from "../../../assets/assignment_illustration.png";
import { GiNotebook } from "react-icons/gi";
import { Grid, Box, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getAssignments,
  reset,
} from "../../../features/assignment/assignmentSlice";
import SkeletonLoader from "../../../components/Loader/SkeletonLoader";
import moment from "moment";

const styles = {
  gridContainer: {
    backgroundColor: "var(--navyBlue)",
    borderRadius: "15px",
    paddingX: 5,
    paddingY: 2,
    mt: 4,
  },
  gridImage: {
    height: "200px",
  },
  paperStyle: {
    backgroundColor: "var(--navyBlue)",
    display: "flex",
    alignItems: "center",
    color: "#fff",
    py: 2,
    px: 3,
    borderRadius: "15px",
    mb: 1,
  },
  iconStyle: {
    fontSize: "30px",
    color: "var(--aquaGreen)",
    marginRight: "15px",
  },
};

const StudentAssignments = () => {
  const navigate = useNavigate();
  const { data, isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.assignment
  );
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const params = {
      token,
    };
    dispatch(getAssignments(params));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
    }

    if (isError) {
      dispatch(reset());
      alert(message);
    }
    // eslint-disable-next-line
  }, [data, isSuccess, isError, message]);

  const renderAssignments = (array) => {
    const assignments = array.map((item) => {
      return (
        <Paper
          onClick={() => {
            navigate("/student-classwork", { state: item });
          }}
          elevation={0}
          sx={{
            ...styles.paperStyle,
            cursor: "pointer",
            transition: ".3s",
            ":hover": { backgroundColor: !item.isClose ? "" : "" },
          }}
          key={item._id}
        >
          <GiNotebook
            style={{
              ...styles.iconStyle,
              color: item.isClose ? "#df5c61" : "var(--aquaGreen)",
            }}
          />
          <Typography
            sx={{
              mr: 2,
              fontSize: "1.1rem",
              color: "#fff",
            }}
          >
            {item.title}
          </Typography>
          <Typography
            sx={{
              mr: 2,
              fontSize: ".9rem",
              color: item.isClose ? "#df5c61" : "#fff",
            }}
          >
            {item.submissions.map((data) => {
              if (data.student === user._id) {
                if (data.late) {
                  return "(Turned in late)";
                } else {
                  return "(Turned in)";
                }
              } else {
                return null;
              }
            })}
          </Typography>
          <Typography
            sx={{
              ml: "auto",
              fontSize: ".8rem",
              color: item.isClose ? "#df5c61" : "#fff",
            }}
          >
            {/* Test submission populate */}
            Due: {moment(item.deadline).format("LL")}{" "}
            {moment(item.deadline).format("h:mma")}{" "}
            {item.submissions.map((data) => {
              if (data.student === user._id) {
                return data.submission.score;
              } else {
                return null;
              }
            })}
          </Typography>
        </Paper>
      );
    });

    return assignments;
  };

  return (
    <div className="student-assignments">
      <Sidebar />

      <main>
        <Grid container spacing={0} sx={styles.gridContainer}>
          <Grid
            item={true}
            xs={6}
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <h1>
              ASSIGN<span style={{ color: "var(--aquaGreen)" }}>MENT</span>
            </h1>
            <p>
              Assignments are the basis of the teacher if the learners gained
              something today, so make sure to ace your assignments, and finish
              them on time to ensure that you have understood the lesson.
            </p>
          </Grid>

          <Grid
            item={true}
            xs={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <img
              style={styles.gridImage}
              src={assignment_illustration}
              alt="assignment Illustration"
            />
          </Grid>
        </Grid>

        <Box
          sx={{
            height: "300px",
            width: "100%",
            maxHeight: "300px",
            overflow: "auto",
            mt: 4,
          }}
        >
          {isLoading ? <SkeletonLoader /> : data ? renderAssignments(data) : ""}
        </Box>
      </main>
    </div>
  );
};

export default StudentAssignments;
