import "./Classwork.css";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import AssignmentComplete from "../../../../components/AssignmentComplete/AssignmentComplete";
import { useLocation } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import Camera from "react-webcam";
import moment from "moment";
import * as handPose from "@tensorflow-models/handpose";
import "@tensorflow/tfjs-backend-webgl";
import * as fingerpose from "fingerpose";
import { drawHand } from "../../../../util/Drawing";
import GameLoader from "../../../../components/GameLoader/GameLoader";
import { rightSigns } from "../../../../util/rightASL/rightSigns";
import { leftSigns } from "../../../../util/leftASL/leftSigns";
import { toast } from "react-toastify";
import Countdown, { zeroPad } from "react-countdown";
import { useSelector, useDispatch } from "react-redux";
import {
  addSubmission,
  checkSubmission,
  reset,
} from "../../../../features/submission/submissionSlice";

const styles = {
  cameraContainer: {
    position: "relative",
    height: "350px",
    width: "450px",
    minHeight: "350px",
    maxHeight: "350px",
    mminWidth: "450px",
    maxWidth: "450px",
    borderRadius: "20px",
  },
  camera: {
    position: "absolute",
    top: 0,
    left: 0,
    borderRadius: "inherit",
    height: "100%",
    width: "100%",
    objectFit: "fill",
  },
  canvas: {
    height: "100%",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,
    borderRadius: "inherit",
  },
};

const Classwork = () => {
  const dispatch = useDispatch();
  const cameraRef = useRef(null);
  const canvasRef = useRef(null);
  const { state } = useLocation();
  const { user, token } = useSelector((state) => state.auth);
  const { data, isSuccess, isError, message } = useSelector(
    (state) => state.submission
  );
  const [assigmentData] = useState(state);

  const [asl, setASL] = useState([]);
  const [handsign, setHandsign] = useState("");
  const [cameraEnable, setCameraEnable] = useState(false);
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const currentDate = Date.now();
  const [timer, setTimer] = useState(currentDate);

  let hasHand = 0;

  //check Camera permission
  const checkCamera = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraEnable(true);
    } catch (error) {
      setCameraEnable(false);
      toast.error("Cannot Access Camera!");
    }
  };

  const detectHand = async (model) => {
    if (
      cameraRef.current !== null &&
      cameraRef.current.video.readyState === 4
    ) {
      const video = cameraRef.current.video;
      const videoHeight = cameraRef.current.video.videoHeight;
      const videoWidth = cameraRef.current.video.videoWidth;

      cameraRef.current.video.width = videoWidth;
      cameraRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const hand = await model.estimateHands(video, true);

      if (!loading) setLoading(false);

      if (hand.length === 0) {
        hasHand++;
      }

      if (hasHand === 20) {
        setHandsign(null);
        hasHand = 0;
      }

      if (hand.length > 0) {
        const canvas = canvasRef.current.getContext("2d");
        drawHand(hand, canvas);

        const estimateGesture = new fingerpose.GestureEstimator(asl);

        const gesture = await estimateGesture.estimate(hand[0].landmarks, 8.5);

        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          const arrConfidence = gesture.gestures.map(
            (confidence) => confidence.score
          );

          const max = Math.max(...arrConfidence);

          const highestConfidence = arrConfidence.indexOf(max);

          setHandsign(gesture.gestures[highestConfidence].name);
        }
      }
    }
  };

  async function startDetection() {
    setLoading(true);
    const model = await handPose.load();

    setInterval(() => {
      detectHand(model);
    }, 100);
  }

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      if (data.length) {
        setEnded(true);
      }
    }

    if (isError) {
      dispatch(reset());
    }
    // eslint-disable-next-line
  }, [data, isSuccess, isError, message]);

  // start hand dectection when camera is enabled and the game is started
  useEffect(() => {
    if (cameraEnable && started) {
      startDetection();
    }
    // eslint-disable-next-line
  }, [cameraEnable, started]);

  useEffect(() => {
    setTimeout(() => {
      if (started && loading === false) {
        setTimer(Date.now() + assigmentData.timer);
      }
    }, 2000);
    // eslint-disable-next-line
  }, [started, loading]);

  // start timer if model is loaded and the game is started
  useEffect(() => {
    const gameTimer = timerRef.current;
    if (started && !loading && timer !== currentDate) {
      gameTimer.start();
    }
    // eslint-disable-next-line
  }, [timer, loading, started]);

  useEffect(() => {
    if (ended) {
      const gameTimer = timerRef.current;
      gameTimer.pause();
      const timeLeft =
        timerRef.current.state.timeDelta.minutes +
        " minutes " +
        timerRef.current.state.timeDelta.seconds +
        " seconds";

      const params = {
        token: token,
        assignmentID: assigmentData._id,
        timeLeft: timeLeft,
        score: `${index}/${assigmentData.words.length}`,
        date: Date.now(),
        deadline: assigmentData.deadline,
      };

      if (!data.length) {
        dispatch(addSubmission(params));
      }
    }
    // eslint-disable-next-line
  }, [ended]);

  useEffect(() => {
    // check user submission on component load
    const params = {
      assignmentID: assigmentData._id,
      token: token,
    };
    dispatch(checkSubmission(params));

    if (user.userSettings.hand) {
      setASL(rightSigns);
    } else {
      setASL(leftSigns);
    }
    checkCamera();
    // eslint-disable-next-line
  }, [cameraEnable]);

  // Timer
  const timerRef = useRef(null);
  const renderer = ({ minutes, seconds, milliseconds }) => {
    return (
      <span>
        {zeroPad(minutes)}:{zeroPad(seconds)}:
        {zeroPad(String(milliseconds).slice(0, 2))}
      </span>
    );
  };
  // End Timer

  // match detected handsign to current word/letter
  useEffect(() => {
    if (started && !ended) {
      if (index === assigmentData.words.length) {
        timerRef.current.pause();
        setEnded(true);
      } else if (handsign === assigmentData.words[index]) {
        setHandsign(null);
        setIndex(index + 1);
      }
    }
    // eslint-disable-next-line
  }, [handsign, index, started]);

  const renderElements = () => {
    const spanEl = assigmentData.words.map((word, i) => {
      if (index === i) {
        return (
          <span key={i} style={{ color: "var(--aquaGreen)" }}>
            {word}
          </span>
        );
      } else {
        return <span key={i}>{word}</span>;
      }
    });

    return spanEl;
  };

  if (!assigmentData) {
    return (
      <div className="student-classwork">
        <Sidebar />

        <h1>
          <span style={{ color: "var(--aquaGreen)" }}>404</span> NOT FOUND
        </h1>
      </div>
    );
  }

  return (
    <div className="student-classwork">
      <Sidebar />

      <header>
        <h1>{assigmentData.title}</h1>
        <p>{assigmentData.description}</p>

        <p>
          Due: {moment(assigmentData.deadline).format("LL")}{" "}
          {moment(assigmentData.deadline).format("h:mma")}
        </p>
      </header>
      <hr />

      <div className="top-controls">
        <div className="controls-container">
          <span style={{ fontSize: ".9rem" }}>
            Web Camera:
            <span
              onClick={checkCamera}
              style={{ cursor: "pointer", color: "var(--aquaGreen)" }}
            >
              {" "}
              {cameraEnable ? `(Enabled)` : `(Disable)`}
            </span>
          </span>

          <span>
            <span
              style={{ display: ended ? "none" : "" }}
              onClick={() => {
                if (!ended) {
                  setStarted(true);
                }
              }}
            >
              START
            </span>
          </span>

          <span>
            <Countdown
              ref={timerRef}
              date={timer}
              intervalDelay={0}
              precision={2}
              renderer={renderer}
              autoStart={false}
              onComplete={() => {
                setEnded(true);
              }}
            />
          </span>
        </div>
      </div>

      <main>
        <div className="camera-container" style={styles.cameraContainer}>
          <Camera
            ref={cameraRef}
            mirrored={true}
            style={{ ...styles.camera, display: ended ? "none" : "" }}
          />

          <canvas
            className="canvas"
            ref={canvasRef}
            style={{ ...styles.canvas, display: ended ? "none" : "" }}
          />
          {ended && started ? (
            <AssignmentComplete
              data={{
                timeLeft:
                  timerRef.current.state.timeDelta.minutes +
                  " minutes " +
                  timerRef.current.state.timeDelta.seconds +
                  " seconds",
                score: `${index}/${assigmentData.words.length}`,
                date: Date.now(),
              }}
            />
          ) : ended && data.length ? (
            <AssignmentComplete
              data={{
                timeLeft: data[0].timeLeft,
                score: data[0].score,
                date: data[0].date,
                late: data[0].late,
              }}
            />
          ) : (
            ""
          )}

          {loading ? <GameLoader /> : ""}
        </div>

        <div className="letter-container">
          <h3>PERFORM:</h3>
          <div className="array-container">{renderElements()}</div>
        </div>
      </main>
    </div>
  );
};

export default Classwork;
