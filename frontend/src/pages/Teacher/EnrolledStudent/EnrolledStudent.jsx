import "./EnrolledStudent.css";
import { useState } from "react";
import SideBar from "../../../components/Sidebar/Sidebar";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getEnrolledStudents,
  reset,
} from "../../../features/student/studentSlice";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
  Grid,
  Avatar,
} from "@mui/material";
import enrolledStudents_illustration from "../../../assets/enrolledStudents_illustration.png";
import SkeletonLoader from "./Loader/SkeletonLoader";
import StudentModal from "./Modal/StudentModal";

const styles = {
  header: {
    mt: 3,
    backgroundColor: "var(--navyBlue)",
    borderRadius: "20px",
    padding: 2,
  },
  grid: {
    height: "100%",
    justifyContent: "center",
    pl: 3,
    pt: 2,
  },
  text: {
    color: "#fff",
    borderColor: "#ffffff11",
    padding: "10px 0",
  },
};

const EnrolledStudent = () => {
  const dispatch = useDispatch();
  const { data, isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.student
  );
  const { user, token } = useSelector((state) => state.auth);

  const [studentData, setStudentData] = useState(null);

  const handleStudentData = (newValue) => {
    setStudentData(newValue);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
    }

    if (isError) {
      dispatch(reset());
      alert(message);
    }
    // eslint-disable-next-line
  }, [data, isSuccess, isError, isLoading, message]);

  useEffect(() => {
    const params = {
      classCode: user.userInfo.classCode,
      token: token,
    };
    dispatch(getEnrolledStudents(params));
    // eslint-disable-next-line
  }, []);

  return (
    <div className="enrolled-student">
      <SideBar />
      <main>
        <Grid container spacing={0} sx={styles.header}>
          <Grid item={true} xs={6}>
            <Box sx={styles.grid}>
              <h1>
                ENROLLED{" "}
                <span style={{ color: "var(--aquaGreen)" }}>STUDENTS</span>
              </h1>
              <p>
                All your learners are listed below. Make sure to monitor them to
                keep your class list organized and in tact.
              </p>
            </Box>
          </Grid>

          <Grid item={true} xs={6} align="center">
            <img
              height={170}
              src={enrolledStudents_illustration}
              alt="Student Illustration"
            />
          </Grid>
        </Grid>

        <Box sx={{ height: "380px", mt: 2 }}>
          {isLoading ? (
            <SkeletonLoader />
          ) : (
            <TableContainer sx={{ height: "380px", mt: 2 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        borderTopLeftRadius: "20px",
                        borderBottomLeftRadius: "20px",
                        background: "var(--navyBlue)",
                        color: "#fff",
                        border: "none",
                      }}
                    ></TableCell>
                    <TableCell
                      sx={{
                        background: "var(--navyBlue)",
                        color: "#fff",
                        border: "none",
                      }}
                    >
                      Email
                    </TableCell>
                    <TableCell
                      sx={{
                        background: "var(--navyBlue)",
                        color: "#fff",
                        border: "none",
                      }}
                    >
                      School
                    </TableCell>
                    <TableCell
                      sx={{
                        borderTopRightRadius: "20px",
                        borderBottomRightRadius: "20px",
                        background: "var(--navyBlue)",
                        color: "#fff",
                        border: "none",
                      }}
                    >
                      Full Name
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.students?.map((student) => {
                    return (
                      <TableRow
                        onClick={() => {
                          setStudentData(student);
                        }}
                        key={student._id}
                        sx={{
                          cursor: "pointer",
                          "&:hover": {
                            backgroundColor: "#212b53",
                          },
                        }}
                      >
                        <TableCell
                          sx={{
                            ...styles.text,
                            borderTopLeftRadius: "20px",
                            borderBottomLeftRadius: "20px",
                          }}
                        >
                          <Avatar
                            alt="Profile Image"
                            src={student.userInfo.image}
                            sx={{ marginX: "auto", width: 50, height: 50 }}
                          />
                        </TableCell>
                        <TableCell sx={styles.text}>{student.email}</TableCell>
                        <TableCell sx={styles.text}>
                          {student.userInfo.school}
                        </TableCell>
                        <TableCell
                          sx={{
                            ...styles.text,
                            borderTopRightRadius: "20px",
                            borderBottomRightRadius: "20px",
                          }}
                        >
                          {student.userInfo.firstName + " "}
                          {student.userInfo.middleInitial
                            ? student.userInfo.middleInitial + "."
                            : ""}
                          {" " + student.userInfo.lastName}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </main>
      {studentData && (
        <StudentModal
          studentData={studentData}
          handleStudentData={handleStudentData}
        />
      )}
    </div>
  );
};

export default EnrolledStudent;
