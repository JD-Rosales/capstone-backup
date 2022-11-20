import "./SignUp.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import back from "../../../assets/back.png";
import Grid2 from "@mui/material/Unstable_Grid2";
import {
  FormControl,
  FormControlLabel,
  TextField,
  Switch,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { reset, register } from "../../../features/auth/authSlice";
import { toast } from "react-toastify";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleInitial, setMiddleInitial] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [secretCode, setSecretCode] = useState("");

  const toastID = useRef(null);

  const notify = () =>
    (toastID.current = toast.loading("Creating your account....", {
      autoClose: 10000,
      position: "top-right",
    }));

  const submit = async (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
      role: "admin",
      secretCode,
      userInfo: {
        firstName,
        lastName,
        middleInitial,
      },
    };

    if (password !== password2) {
      alert("Password do not match");
    } else {
      notify();
      dispatch(register(userData));
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.update(toastID.current, {
        render: "Account Created Successfully",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      dispatch(reset());
      setLastName("");
      setFirstName("");
      setMiddleInitial("");
      setEmail("");
      setPassword("");
      setPassword2("");
      setSecretCode("");
    }

    if (isError) {
      toast.update(toastID.current, {
        render: message,
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
      dispatch(reset());
    }
    // eslint-disable-next-line
  }, [user, isError, isSuccess, isLoading, message]);

  return (
    <div className="admin-signup">
      <div
        className="back_home"
        onClick={() => {
          navigate("/");
        }}
      >
        <ReplyAllIcon
          sx={{
            fontSize: "50px",
            "&:hover": {
              color: "#182142",
            },
          }}
        />
      </div>

      <div className="container">
        <h1>
          S<span>i</span>gn up
          <img src={back} alt="Back" onClick={() => {}} />
        </h1>
        <span>For Administrator use only!</span>

        <form>
          <FormControl fullWidth={true}>
            <Grid2 container spacing={1}>
              <Grid2 xs={5}>
                <TextField
                  label="Last name"
                  type="text"
                  name="firstName"
                  autoComplete="firstName"
                  fullWidth
                  sx={{ mt: 2 }}
                  InputProps={{ sx: { height: 50 } }}
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </Grid2>

              <Grid2 xs={5}>
                <TextField
                  label="First name"
                  type="text"
                  name="firstName"
                  autoComplete="firstName"
                  fullWidth
                  sx={{ mt: 2 }}
                  InputProps={{ sx: { height: 50 } }}
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </Grid2>

              <Grid2 xs={2}>
                <TextField
                  label="M.I"
                  type="text"
                  name="middleInitial"
                  autoComplete="middleInitial"
                  fullWidth
                  sx={{ mt: 2 }}
                  inputProps={{ maxLength: 1 }} //Set the input max length to 1
                  InputProps={{ sx: { height: 50 } }}
                  value={middleInitial}
                  onChange={(e) => {
                    setMiddleInitial(e.target.value.toUpperCase());
                  }}
                />
              </Grid2>
            </Grid2>

            <Grid2 container>
              <Grid2 xs={12}>
                <TextField
                  label="Email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  fullWidth
                  sx={{ mt: 2 }}
                  InputProps={{ sx: { height: 50 } }}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Grid2>
            </Grid2>

            <Grid2 container spacing={1}>
              <Grid2 xs={6}>
                <TextField
                  label="Password"
                  type={passwordShown ? "text" : "password"}
                  name="password"
                  autoComplete="password"
                  fullWidth
                  sx={{ mt: 2 }}
                  InputProps={{ sx: { height: 50 } }}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Grid2>
              <Grid2 xs={6}>
                <TextField
                  label="Confirm Password"
                  type={passwordShown ? "text" : "password"}
                  name="password2"
                  autoComplete="password2"
                  fullWidth
                  sx={{ mt: 2 }}
                  InputProps={{ sx: { height: 50 } }}
                  value={password2}
                  onChange={(e) => {
                    setPassword2(e.target.value);
                  }}
                />
              </Grid2>
            </Grid2>

            <Grid2 container>
              <Grid2 xs={12}>
                <TextField
                  label="Admin Secret Code"
                  type="password"
                  name="secret code"
                  fullWidth
                  sx={{ mt: 2 }}
                  InputProps={{ sx: { height: 50 } }}
                  value={secretCode}
                  onChange={(e) => {
                    setSecretCode(e.target.value);
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
              label="Show Password"
            />

            <Button
              type="submit"
              variant="contained"
              sx={{
                background: "#42C9A3",
                height: 50,
                mt: 2,
                width: "80%",
                mx: "auto",
                borderRadius: "5px",
                fontSize: "18px",
              }}
              onClick={submit}
            >
              Sign up
            </Button>
          </FormControl>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
