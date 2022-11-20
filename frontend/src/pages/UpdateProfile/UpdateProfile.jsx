import "./UpdateProfile.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useState, useEffect, useRef } from "react";
import { FormControl, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import { CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { reset, updateProfile } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner/Spinner";
import editProfile from "../../assets/edit_profile.png";

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

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const { user, token, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const inputFile = useRef(null);
  const toastID = useRef(null);

  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleInitial, setMiddleInitial] = useState("");
  const [school, setSchool] = useState("");
  const [email, setEmail] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  const notify = () =>
    (toastID.current = toast.loading("Updating Profile...", {
      autoClose: 10000,
      position: "top-right",
    }));

  const submit = async (e) => {
    e.preventDefault();

    const userInputs = {
      lastName,
      firstName,
      middleInitial,
      school,
      email,
      image: !selectedImage || selectedImage === "" ? null : selectedImage,
    };

    const userData = {
      id: user._id,
      token: token,
    };

    const params = {
      userInputs,
      userData,
    };

    notify();
    dispatch(updateProfile(params));
  };

  useEffect(() => {
    if (isSuccess) {
      toast.update(toastID.current, {
        render: "Profile Updated Successfully",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      setFirstName("");
      setLastName("");
      setMiddleInitial("");
      setSchool("");
      setEmail("");
      setSelectedImage("");
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

  const chooseFile = () => {
    inputFile.current.click();
  };

  const previewImage = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.onerror = () => {
        toast.error("An error has occured!");
      };
    }
  };

  useEffect(() => {
    setFirstName(user.userInfo.firstName);
    setLastName(user.userInfo.lastName);
    setMiddleInitial(user.userInfo.middleInitial);
    setSchool(user.userInfo.school);
    setEmail(user.email);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="update-profile">
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
                EDIT <br /> <span>PROFILE</span>
              </h1>
              <p>
                Want to edit you profile? Change your email? School University?
                Found an error in your inputs? Don't worry! You can do it all
                here.{" "}
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
              <img src={editProfile} alt="Edit Profile Logo" />
            </Grid2>
          </Grid2>
        </header>

        <form>
          <FormControl fullWidth={true}>
            <Grid2 container spacing={1}>
              <Grid2 xs={3}>
                <div className="profile-container">
                  <div className="img-container">
                    {!selectedImage ? (
                      <div
                        onClick={chooseFile}
                        className="img"
                        style={{
                          backgroundImage: `url(${user.userInfo.image})`,
                        }}
                      ></div>
                    ) : (
                      <div
                        onClick={chooseFile}
                        className="img"
                        style={{ backgroundImage: `url(${selectedImage})` }}
                      ></div>
                    )}
                  </div>

                  <span onClick={chooseFile} className="select-image">
                    Change Profile Picture
                  </span>
                  <input
                    type="file"
                    ref={inputFile}
                    style={{ display: "none" }}
                    accept="image/x-png,image/gif,image/jpeg"
                    onChange={previewImage}
                  />
                </div>
              </Grid2>
              <Grid2 xs={9}>
                <Grid2 xs={12}>
                  {user.role === "teacher" || user.role === "student" ? (
                    <TextField
                      label="School/University"
                      type="text"
                      name="school"
                      fullWidth
                      autoComplete="off"
                      sx={textfieldStyle}
                      InputProps={{ sx: { height: 50, color: "#F0F0F0" } }}
                      value={school}
                      onChange={(e) => {
                        setSchool(e.target.value);
                      }}
                    />
                  ) : (
                    ""
                  )}
                </Grid2>

                <Grid2 xs={12}>
                  <TextField
                    label="Email"
                    type="text"
                    name="email"
                    autoComplete="off"
                    fullWidth
                    sx={textfieldStyle}
                    InputProps={{ sx: { height: 50, color: "#F0F0F0" } }}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </Grid2>

                <Grid2 container spacing={1}>
                  <Grid2 xs={5}>
                    <TextField
                      label="Last Name"
                      type="text"
                      name="lastName"
                      autoComplete="off"
                      fullWidth
                      sx={textfieldStyle}
                      InputProps={{ sx: { height: 50, color: "#F0F0F0" } }}
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                    />
                  </Grid2>

                  <Grid2 xs={5}>
                    <TextField
                      label="First Name"
                      type="text"
                      name="firstName"
                      autoComplete="off"
                      fullWidth
                      sx={textfieldStyle}
                      InputProps={{ sx: { height: 50, color: "#F0F0F0" } }}
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                    />
                  </Grid2>

                  <Grid2 xs={2}>
                    <TextField
                      label="M.I."
                      type="text"
                      name="middleInitial"
                      fullWidth
                      autoComplete="off"
                      sx={textfieldStyle}
                      inputProps={{ maxLength: 1 }} //Set the input max length to 1
                      InputProps={{
                        sx: { height: 50, color: "#F0F0F0" },
                      }}
                      value={middleInitial}
                      onChange={(e) => {
                        setMiddleInitial(e.target.value.toUpperCase());
                      }}
                    />
                  </Grid2>

                  <Grid2
                    xs={12}
                    sx={{
                      display: "flex",
                      // display: user.role === "student"
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
                        <CircularProgress
                          size="1.5em"
                          sx={{ color: "#182240" }}
                        />
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
                </Grid2>
              </Grid2>
            </Grid2>
            {/* <hr />

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
            </Grid2> */}
          </FormControl>
        </form>
      </main>

      {isLoading ? <Spinner /> : ""}
    </div>
  );
};

export default UpdateProfile;
