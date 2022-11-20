import "./Otp.css";
import otp_illustration from "../../assets/otp_illustration.png";
import OTPInput from "otp-input-react";
import { useState, useRef } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const buttonStyle = {
  width: 150,
  height: 45,
  boxShadow: 3,
  mt: 2,
  borderRadius: "10px",
  backgroundColor: "var(--navyBlue)",
  color: "#FFF",
  "&:hover": {
    backgroundColor: "#42c9a3",
    color: "#fff",
  },
};

const Otp = ({ submit, email, sendOTP }) => {
  const [otp, setOtp] = useState("");
  const [reSend, setReSend] = useState(true);

  const toastID = useRef(null);
  const notify = () =>
    (toastID.current = toast.loading("Verifying...", {
      autoClose: 10000,
      position: "top-right",
    }));

  const verifyOTP = async () => {
    notify();
    await axios
      .post("/api/otp/verify-otp", { otp, email })
      .then((response) => {
        toast.update(toastID.current, {
          render: "Verified!",
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });
        setTimeout(() => {
          submit();
          setOtp("");
        }, 1000);
      })
      .catch((error) => {
        toast.update(toastID.current, {
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
  };

  return (
    <div className="otp">
      <img height={120} src={otp_illustration} alt="OTP Illustration" />

      <h2>
        OTP Verificat<span style={{ color: "var(--aquaGreen)" }}>i</span>on
      </h2>

      <p>We sent a 6-digits code to</p>
      <span>{email}</span>

      <OTPInput
        value={otp}
        onChange={setOtp}
        inputClassName="input"
        className="otp-input"
        autoFocus
        OTPLength={6}
        otpType="number"
        disabled={false}
      />

      <h4>
        Didn't receive OTP? <br />{" "}
        <span
          onClick={() => {
            if (reSend) {
              // prevent multiple resend
              setReSend(false);
              sendOTP();
              setTimeout(() => {
                setReSend(true);
              }, 20000);
            }
          }}
          style={{ color: "var(--aquaGreen)", cursor: reSend ? "pointer" : "" }}
        >
          Resend OTP
        </span>
      </h4>

      <Button
        onClick={() => verifyOTP()}
        variant="contained"
        disableElevation={true}
        className="button"
        sx={buttonStyle}
      >
        Verify OTP
      </Button>
    </div>
  );
};

export default Otp;
