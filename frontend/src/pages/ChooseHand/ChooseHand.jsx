import "./ChooseHand.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { reset, updateUserSettings } from "../../features/auth/authSlice";
import Grid2 from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import { CircularProgress } from "@mui/material";
import choose_hand from "../../assets/choose_hand_illustration.png";
import left_hand from "../../assets/left_hand.png";
import right_hand from "../../assets/right_hand.png";
import left_hand_selected from "../../assets/left_hand_selected.png";
import right_hand_selected from "../../assets/right_hand_selected.png";

const ChooseHand = () => {
  const dispatch = useDispatch();
  const { user, token, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [isHandActive, setIsHandActive] = useState(user.userSettings.hand);

  const toastID = useRef(null);

  const notify = () =>
    (toastID.current = toast.loading("Updating User Settings...", {
      autoClose: 15000,
      position: "top-right",
    }));

  const submit = () => {
    const params = {
      userInputs: {
        hand: isHandActive,
      },
      userData: {
        id: user._id,
        token: token,
      },
    };
    notify();
    dispatch(updateUserSettings(params));
  };

  useEffect(() => {
    if (isSuccess) {
      toast.update(toastID.current, {
        render: "Success",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
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
  }, [user, isSuccess, isError, message]);

  return (
    <div className="choose-hand">
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
                Choose <br /> <span>Hand</span>
              </h1>
              <p>
                Which hands are you consistently drawn to? Alter your hand
                preference based on your dominant hand.
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
              <img src={choose_hand} alt="Choose hand Logo" />
            </Grid2>
          </Grid2>
        </header>
        <div className="hand-container">
          <div
            className="choices-container"
            onClick={() => setIsHandActive(false)}
          >
            <span>
              Left
              <span> Hand</span>
            </span>
            <img
              src={!isHandActive ? left_hand_selected : left_hand}
              alt="Left hand illustration"
            />
          </div>

          <div
            className="choices-container"
            onClick={() => setIsHandActive(true)}
          >
            <span>
              Right
              <span> Hand</span>
            </span>
            <img
              src={isHandActive ? right_hand_selected : right_hand}
              alt="Right hand illustration"
            />
          </div>
        </div>

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
      </main>
    </div>
  );
};

export default ChooseHand;
