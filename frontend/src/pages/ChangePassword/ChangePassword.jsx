import "./ChangePassword.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useState, useEffect, useRef } from "react";
import { FormControl, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import { CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { reset, changePassword } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner/Spinner";
import change_password from "../../assets/change_password.png";

const textfieldStyle = {
  mt: 2,
  backgroundColor: "#182240",
  color: "#F0F0F0",
  "& .MuiFormLabel-root": {
    //textfield label
    color: "#42C9A3",
  },
  "& .MuiFormLabel-root.Mui-focused": {
    //textfield label on focused
    color: "#42C9A3",
  },
  "& .MuiOutlinedInput-root": {
    //textfield boder
    "& > fieldset": { borderColor: "#42C9A3" },
  },
  "& .MuiOutlinedInput-root.Mui-focused": {
    //textfield boder color on focused
    "& > fieldset": { borderColor: "#42C9A3" },
  },
  "& .MuiOutlinedInput-root:hover": {
    "& > fieldset": {
      borderColor: "#F0F0F0",
    },
  },
};

const ChangePassword = () => {
  const dispatch = useDispatch();
  const { user, token, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const toastID = useRef(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");

  const notify = () =>
    (toastID.current = toast.loading("Updating Password...", {
      autoClose: 10000,
      position: "top-right",
    }));

  const submit = async (e) => {
    e.preventDefault();

    const userInputs = {
      currentPassword: currentPassword,
      newPassword: newPassword,
      newPassword2: newPassword2,
    };

    if (newPassword.trim() !== newPassword2.trim()) {
      toast.warning("Password do not match!", {
        autoClose: 2000,
        position: "top-right",
      });
    } else {
      const params = {
        userInputs,
        userData: {
          id: user._id,
          token: token,
        },
      };

      notify();
      dispatch(changePassword(params));
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.update(toastID.current, {
        render: "Password Change!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      setCurrentPassword("");
      setNewPassword("");
      setNewPassword2("");
      dispatch(reset());
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
  }, [user, isError, isSuccess, message]);

  return (
    <div className="change-password">
      <Sidebar />

      <main>
        <header>
          <Grid2 container spacing={0}>
            <Grid2
              xs={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1>
                CHANGE <br /> <span>PASSWORD</span>
              </h1>
              <p>
                Be confident that your account is protected and secured, make
                sure your password: • is longer than 8 characters <br />• is a
                combination of numbers, letters, and special characters
              </p>
            </Grid2>
            <Grid2
              xs={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={change_password} alt="Change Password Logo" />
            </Grid2>
          </Grid2>
        </header>

        <form>
          <FormControl fullWidth={true}>
            <Grid2 container spacing={1}>
              <Grid2 xs={4}>
                <div className="profile-container">
                  <div className="img-container">
                    <div
                      className="img"
                      style={{
                        backgroundImage: `url(${user?.userInfo.image})`,
                      }}
                    ></div>
                  </div>

                  <span style={{ marginTop: "8px" }}>
                    School/University: <span>{user?.userInfo.school}</span>
                  </span>
                  <span>
                    Name:{" "}
                    <span>
                      {user?.userInfo.firstName + " "}
                      {user?.userInfo.middleInitial + " "}
                      {user?.userInfo.lastName}
                    </span>
                  </span>
                  <span>
                    Email: <span>{user?.email}</span>
                  </span>
                </div>
              </Grid2>
              <Grid2 xs={8}>
                <Grid2 xs={12}>
                  <TextField
                    label="Current Password"
                    type="text"
                    name="current_password"
                    fullWidth
                    autoComplete="off"
                    sx={textfieldStyle}
                    InputProps={{ sx: { height: 50, color: "#F0F0F0" } }}
                    value={currentPassword}
                    onChange={(e) => {
                      setCurrentPassword(e.target.value);
                    }}
                  />
                </Grid2>

                <Grid2 xs={12}>
                  <TextField
                    label="New Password"
                    type="text"
                    name="new_password"
                    autoComplete="off"
                    fullWidth
                    sx={textfieldStyle}
                    InputProps={{ sx: { height: 50, color: "#F0F0F0" } }}
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                    }}
                  />
                </Grid2>

                <Grid2 container spacing={1}>
                  <Grid2 xs={12}>
                    <TextField
                      label="Re-enter New Password"
                      type="text"
                      name="new_password2"
                      autoComplete="off"
                      fullWidth
                      sx={textfieldStyle}
                      InputProps={{ sx: { height: 50, color: "#F0F0F0" } }}
                      value={newPassword2}
                      onChange={(e) => {
                        setNewPassword2(e.target.value);
                      }}
                    />
                  </Grid2>
                </Grid2>
              </Grid2>
            </Grid2>
            <hr />

            <Grid2
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                // onClick={}
                variant="contained"
                sx={{
                  background: "var(--backgroundColor)",
                  boxShadow: "none",
                  color: "#F0F0F0",
                  height: 40,
                  mt: 2,
                  mr: 1,
                  width: "150px",
                  borderRadius: "20px",
                  fontSize: "14px",
                }}
              >
                Cancel
              </Button>

              <LoadingButton
                onClick={submit}
                loading={isLoading}
                variant="contained"
                loadingIndicator={
                  <CircularProgress size="1.5em" sx={{ color: "#182240" }} />
                }
                sx={{
                  background: "#42C9A3",
                  color: "#F0F0F0",
                  height: 40,
                  mt: 2,
                  width: "150px",
                  borderRadius: "20px",
                  fontSize: "14px",
                }}
              >
                Update
              </LoadingButton>
            </Grid2>
          </FormControl>
        </form>
      </main>

      {isLoading ? <Spinner /> : ""}
    </div>
  );
};

export default ChangePassword;
