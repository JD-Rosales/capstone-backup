import "./ChooseRole.css";
import student from "../../assets/Student.png";
import backlogo from "../../assets/back.png";
import teacher from "../../assets/Teacher.png";
import publicUser from "../../assets/PublicUser.png";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Button } from "@mui/material";

const buttonStyle = {
  width: 170,
  height: 50,
  mb: 2,
  fontFamily: "Poppins",
  fontWeight: 600,
  borderRadius: "10px",
  backgroundColor: "#fff",
  color: "#000",
  "&:hover": {
    backgroundColor: "#42C9A3",
    color: "#fff",
  },
};

const ChooseRole = (props) => {
  const handleParenChange = (e) => {
    props.onChange(e.target.value);
  };

  return (
    <div className="chooseRole">
      <div className="header-container">
        <img src={backlogo} alt="logo" onClick={handleParenChange}></img>

        <h1>SELECT YOUR ROLE</h1>
        <p>
          Please choose a <span>role</span> in order for us to identify you.
        </p>
      </div>
      <Grid2
        container
        spacing={2}
        flexDirection={{
          xs: "column",
          sm: "column",
          md: "column",
          lg: "row",
          xl: "row",
        }}
        alignItems="center"
      >
        <Grid2
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          xs={4}
        >
          <img className="userRoleImg" src={publicUser} alt="General User" />
          <Button
            className="userRoleBtn"
            value="generaluser"
            variant="contained"
            disableElevation={true}
            sx={buttonStyle}
            onClick={(e) => {
              props.setRole(e.target.value);
            }}
          >
            General User
          </Button>
        </Grid2>
        <Grid2
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          xs={4}
        >
          <img className="studentRoleImg" src={student} alt="Student" />
          <Button
            className="studentRoleBtn"
            value="student"
            variant="contained"
            disableElevation={true}
            sx={buttonStyle}
            onClick={(e) => {
              props.setRole(e.target.value);
            }}
          >
            Student
          </Button>
        </Grid2>
        <Grid2
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          xs={4}
        >
          <img className="teacherRoleImg" src={teacher} alt="Teacher" />
          <Button
            className="teacherRoleBtn"
            value="teacher"
            variant="contained"
            disableElevation={true}
            sx={buttonStyle}
            onClick={(e) => {
              props.setRole(e.target.value);
            }}
          >
            Teacher
          </Button>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default ChooseRole;
