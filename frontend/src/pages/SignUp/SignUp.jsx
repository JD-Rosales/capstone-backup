import "./SignUp.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
// import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import back from "../../assets/back.png";
import Grid2 from "@mui/material/Unstable_Grid2";
import {
  FormControl,
  FormControlLabel,
  TextField,
  Switch,
  Fade,
  Modal,
  Box,
  Backdrop,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ChooseRole from "../../components/ChooseRole/ChooseRole";
import { useSelector, useDispatch } from "react-redux";
import { reset, register } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import LoadingButton from "@mui/lab/LoadingButton";
import { CircularProgress } from "@mui/material";
import Otp from "../../components/Otp/Otp";
import { useTheme } from "@mui/material/styles";
import axios from "axios";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#182240",
    fontFamily: "Poppins",
    fontWeight: 600,
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#182240",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "1px solid #E1E3E6",
      borderRadius: "10px",
    },
    "&:hover fieldset": {
      borderColor: "#182240",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#182240",
    },
  },
});

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&:before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&:after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));

const SignUp = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: 250, sm: 455, md: 700, lg: 1000, xl: 1200 },
    height: { xs: 400, sm: 660, md: 525, lg: 610, xl: 680 },
    background: "#fff",
    borderRadius: "15px",
    boxShadow: 20,
    outline: "none",
    p: { xs: 0, sm: 0, md: 4, lg: 4, xl: 4 },
    pb: { xs: 0, sm: 0, md: 6, lg: 6, xl: 6 },
    backgroundColor: "#182142",
  };
  const replyiconStyle = {
    fontSize: "70px",
    color: "#fff",
    "&:hover": {
      color: "#182240",
    },

    [theme.breakpoints.down("sm")]: {
      fontSize: "50px",
      color: "#43c9a3",
      "&:hover": {
        color: "#182240",
      },
    },
  };

  const textFieldStyle = {
    mt: 2,
    [theme.breakpoints.down("sm")]: {
      mt: 1,
    },
  };

  const [sentOTP, setSentOTP] = useState(false);

  const [role, setRole] = useState("generaluser");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [school, setSchool] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleInitial, setMiddleInitial] = useState("");
  const [classCode, setClassCode] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [formHeight, setFormHeight] = useState("470px");

  const sendOTP = async () => {
    if (password !== password2) {
      toast.warning("Password do not match", {
        autoClose: 2000,
        position: "top-right",
      });
    } else {
      notify2();
      const userData = {
        email,
        password,
        role,
        userInfo: {
          firstName: firstName,
          lastName: lastName,
          middleInitial: middleInitial,
          school: school,
          classCode: classCode,
        },
      };
      await axios
        .post("/api/otp/send-otp", userData)
        .then((response) => {
          setSentOTP(true);
          toast.update(toastID2.current, {
            render: "Email sent!",
            type: "success",
            isLoading: false,
            autoClose: 2000,
          });
          console.log(response?.data?.message);
        })
        .catch((error) => {
          toast.update(toastID2.current, {
            render:
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString(),
            type: "error",
            isLoading: false,
            autoClose: 2000,
          });
        });
    }
  };

  const toastID = useRef(null);
  const toastID2 = useRef(null);

  const notify = () =>
    (toastID.current = toast.loading("Creating your account...", {
      autoClose: 10000,
      position: "top-right",
    }));

  const notify2 = () =>
    (toastID2.current = toast.loading("Verifying data...", {
      autoClose: 10000,
      position: "top-right",
    }));

  const [open, setOpen] = useState(true);
  const handleModal = () => {
    setOpen(!open);
  };

  const setChoosenRole = (role) => {
    setRole(role);
    handleModal();
  };

  const submit = async (e) => {
    // e.preventDefault();
    const userData = {
      email,
      password,
      role,
      userInfo: {
        firstName: firstName,
        lastName: lastName,
        middleInitial: middleInitial,
        school: school,
        classCode: classCode,
      },
    };

    if (password !== password2) {
      toast.warning("Password do not match", {
        autoClose: 2000,
        position: "top-right",
      });
    } else {
      notify();
      dispatch(register(userData));
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setEmail("");
      setPassword("");
      setPassword2("");
      setFirstName("");
      setLastName("");
      setMiddleInitial("");
      setSchool("");
      setClassCode("");
      dispatch(reset());
      toast.update(toastID.current, {
        render: "Account Created Successfully",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      setTimeout(() => {
        if (user.role === "teacher") {
          navigate("/teacher-dashboard");
        } else {
          navigate("/dashboard");
        }
      }, 2000);
    }

    if (isError) {
      dispatch(reset());
      toast.update(toastID.current, {
        render: message,
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }

    // eslint-disable-next-line
  }, [user, isError, isSuccess, isLoading, message]);

  useEffect(() => {
    if (role === "generaluser") {
      setFormHeight("470px");
    } else {
      setFormHeight("530px");
    }
  }, [role]);

  return (
    <div className="signup">
      <div
        className="back_home"
        onClick={() => {
          navigate("/");
        }}
      >
        <ChevronLeftRoundedIcon sx={replyiconStyle} />
      </div>

      <div className="container" style={{ height: formHeight }}>
        <h1 style={{ display: sentOTP ? "none" : "" }}>
          S<span>i</span>gn up
          <img
            src={back}
            alt="Back"
            onClick={() => {
              handleModal();
            }}
          />
        </h1>
        <span style={{ display: sentOTP ? "none" : "" }}>
          As a {role}, it's quick and easy
        </span>

        <form style={{ display: sentOTP ? "none" : "" }}>
          <FormControl fullWidth={true}>
            {role !== "generaluser" ? (
              <Grid2 container spacing={{ sm: 0, md: 1 }}>
                <Grid2 xs={12} md={role === "teacher" ? 12 : 6}>
                  <CssTextField
                    id="custom-css-outlined-input"
                    label={
                      role === "teacher"
                        ? "In which school do you teach?"
                        : "In which school do you study?"
                    }
                    type="text"
                    name="school"
                    autoComplete="school"
                    fullWidth
                    sx={textFieldStyle}
                    InputProps={{
                      sx: {
                        height: 50,
                        [theme.breakpoints.down("sm")]: {
                          height: 45,
                        },
                        fontFamily: "Poppins",
                      },
                    }}
                    InputLabelProps={{ sx: { fontFamily: "Poppins" } }}
                    value={school}
                    onChange={(e) => {
                      setSchool(e.target.value);
                    }}
                  />
                </Grid2>

                {role !== "teacher" ? (
                  <Grid2 xs={12} md={6}>
                    <CssTextField
                      id="custom-css-outlined-input"
                      label="Class code"
                      type="text"
                      name="classCode"
                      autoComplete="classCode"
                      fullWidth
                      sx={textFieldStyle}
                      InputProps={{
                        sx: {
                          height: 50,
                          backgroundColor: "#CAF4F4",
                          borderRadius: "10px",
                          [theme.breakpoints.down("sm")]: {
                            height: 45,
                          },
                          fontFamily: "Poppins",
                        },
                      }}
                      InputLabelProps={{ sx: { fontFamily: "Poppins" } }}
                      value={classCode}
                      onChange={(e) => {
                        setClassCode(e.target.value);
                      }}
                    />
                  </Grid2>
                ) : (
                  ""
                )}
              </Grid2>
            ) : (
              ""
            )}

            <Grid2 container spacing={{ sm: 0, md: 1 }}>
              <Grid2 xs={12} sm={5}>
                <CssTextField
                  id="custom-css-outlined-input"
                  label="Last name"
                  type="text"
                  name="lastName"
                  autoComplete="lastName"
                  fullWidth
                  sx={textFieldStyle}
                  InputProps={{
                    sx: {
                      height: 50,
                      [theme.breakpoints.down("sm")]: {
                        height: 45,
                      },
                      fontFamily: "Poppins",
                    },
                  }}
                  InputLabelProps={{ sx: { fontFamily: "Poppins" } }}
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </Grid2>

              <Grid2 xs={12} sm={5}>
                <CssTextField
                  id="custom-css-outlined-input"
                  label="First name"
                  type="text"
                  name="firstName"
                  autoComplete="firstName"
                  fullWidth
                  sx={textFieldStyle}
                  InputProps={{
                    sx: {
                      height: 50,
                      [theme.breakpoints.down("sm")]: {
                        height: 45,
                      },
                      fontFamily: "Poppins",
                    },
                  }}
                  InputLabelProps={{ sx: { fontFamily: "Poppins" } }}
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </Grid2>

              <Grid2 xs={12} sm={2}>
                <CssTextField
                  id="custom-css-outlined-input"
                  label="M.I"
                  type="text"
                  name="middleInitial"
                  autoComplete="middleInitial"
                  fullWidth
                  sx={textFieldStyle}
                  inputProps={{ maxLength: 1 }} //Set the input max length to 1
                  InputProps={{
                    sx: {
                      height: 50,
                      [theme.breakpoints.down("sm")]: {
                        height: 45,
                      },
                      fontFamily: "Poppins",
                    },
                  }}
                  InputLabelProps={{ sx: { fontFamily: "Poppins" } }}
                  value={middleInitial}
                  onChange={(e) => {
                    setMiddleInitial(e.target.value.toUpperCase());
                  }}
                />
              </Grid2>
            </Grid2>

            <Grid2 container>
              <Grid2 xs={12}>
                <CssTextField
                  id="custom-css-outlined-input"
                  label="Email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  fullWidth
                  sx={textFieldStyle}
                  InputProps={{
                    sx: {
                      height: 50,
                      [theme.breakpoints.down("sm")]: {
                        height: 45,
                      },
                      fontFamily: "Poppins",
                    },
                  }}
                  InputLabelProps={{ sx: { fontFamily: "Poppins" } }}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Grid2>
            </Grid2>

            <Grid2 container spacing={1}>
              <Grid2 xs={12} sm={6}>
                <CssTextField
                  id="custom-css-outlined-input"
                  label="Password"
                  type={passwordShown ? "text" : "password"}
                  name="password"
                  autoComplete="password"
                  fullWidth
                  sx={textFieldStyle}
                  md={textFieldStyle}
                  InputProps={{
                    sx: {
                      height: 50,
                      [theme.breakpoints.down("sm")]: {
                        height: 45,
                      },
                      fontFamily: "Poppins",
                    },
                  }}
                  InputLabelProps={{ sx: { fontFamily: "Poppins" } }}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Grid2>
              <Grid2 xs={12} sm={6}>
                <CssTextField
                  id="custom-css-outlined-input"
                  label="Confirm Password"
                  type={passwordShown ? "text" : "password"}
                  name="password2"
                  autoComplete="password2"
                  fullWidth
                  sx={textFieldStyle}
                  InputProps={{
                    sx: {
                      height: 50,
                      [theme.breakpoints.down("sm")]: {
                        height: 45,
                      },
                      fontFamily: "Poppins",
                    },
                  }}
                  InputLabelProps={{ sx: { fontFamily: "Poppins" } }}
                  value={password2}
                  onChange={(e) => {
                    setPassword2(e.target.value);
                  }}
                />
              </Grid2>
            </Grid2>

            <span className="invisible_margin"></span>

            <FormControlLabel
              control={
                <Android12Switch
                  sx={{ ml: 0.5 }}
                  onChange={() => {
                    setPasswordShown(!passwordShown);
                  }}
                />
              }
              label={
                <Typography
                  variant="body2"
                  color="textSecondary"
                  fontFamily="Poppins"
                >
                  Show Password
                </Typography>
              }
            />

            <LoadingButton
              // onClick={submit}
              onClick={sendOTP}
              loading={isLoading}
              loadingIndicator={
                <CircularProgress size="2em" sx={{ color: "#182240" }} />
              }
              variant="contained"
              disableElevation="true"
              sx={{
                width: "70%",
                mx: "auto",
                background: "#42C9A3",
                fontFamily: "Poppins",
                fontWeight: 600,
                height: 50,
                borderRadius: "10px",
                mt: 2,
                ":hover": {
                  bgcolor: "#182240",
                  color: "white",
                },
              }}
            >
              Sign up
            </LoadingButton>
          </FormControl>
        </form>

        {sentOTP && <Otp submit={submit} email={email} sendOTP={sendOTP} />}
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        // onClose={handleModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        style={{ backdropFilter: "blur(5px)" }}
      >
        <Fade in={open}>
          <Box sx={modalStyle}>
            <ChooseRole onChange={handleModal} setRole={setChoosenRole} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default SignUp;
