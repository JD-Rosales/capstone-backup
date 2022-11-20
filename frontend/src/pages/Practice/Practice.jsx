import "./Practice.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import RightNav from "../../components/RightNav/RightNav";
import { useRef, useState, useEffect } from "react";
import Camera from "react-webcam";
import * as handPose from "@tensorflow-models/handpose";
import "@tensorflow/tfjs-backend-webgl";
import * as fingerpose from "fingerpose";
import correct from "../../assets/correct.gif";
import wrong from "../../assets/wrong.gif";
import GameLoader from "../../components/GameLoader/GameLoader";
import { useSelector } from "react-redux";
import { rightSigns } from "../../util/rightASL/rightSigns";
import { leftSigns } from "../../util/leftASL/leftSigns";
import { toast } from "react-toastify";
import { images as rightImages } from "../../util/rightImages";
import { images as leftImages } from "../../util/LeftImages";

const Practice = () => {
  const { user } = useSelector((state) => state.auth);

  const cameraRef = useRef(null);

  const [handImage, setHandImage] = useState();
  const [asl, setASL] = useState([]);
  const [handsign, setHandsign] = useState("");
  const [handView, setHandView] = useState(false);
  const [cameraEnable, setCameraEnable] = useState(false);
  const [letter, setLetter] = useState(null);
  const [aslImg, setAslImg] = useState(null);
  const [gestureMatch, setGestureMatch] = useState(null);
  const [loading, setloading] = useState(true);

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

      const hand = await model.estimateHands(video, true);

      if (loading) setloading(false);

      if (hand.length > 0) {
        setHandView(true);
      } else {
        setHandView(false);
      }

      if (hand.length > 0) {
        const estimateGesture = new fingerpose.GestureEstimator(asl);

        const gesture = await estimateGesture.estimate(hand[0].landmarks, 8.5);

        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          const arrConfidence = gesture.gestures.map(
            (confidence) => confidence.score
          );

          const max = Math.max(...arrConfidence);

          const highestConfidence = arrConfidence.indexOf(max);
          // console.log(gesture.gestures[highestConfidence].name)

          setHandsign(gesture.gestures[highestConfidence].name);
        }
      }
    }
  };

  async function startDetection() {
    const model = await handPose.load();

    setInterval(() => {
      detectHand(model);
    }, 500);
  }

  useEffect(() => {
    if (cameraEnable) {
      startDetection();
    }
    // eslint-disable-next-line
  }, [cameraEnable]);

  useEffect(() => {
    if (user.userSettings.hand) {
      setASL(rightSigns);
      setHandImage(rightImages);
    } else {
      setASL(leftSigns);
      setHandImage(leftImages);
    }
    checkCamera();
    // eslint-disable-next-line
  }, [cameraEnable]);

  useEffect(() => {
    if (handsign === letter) {
      setGestureMatch(true);
    } else {
      setGestureMatch(false);
    }
  }, [handsign, letter, gestureMatch]);

  const btnClick = (e, img) => {
    setLetter(e.currentTarget.value);
    setAslImg(img);

    //reset state if the same button is clicked twice
    if (e.currentTarget.value === letter) {
      setLetter(null);
      setAslImg(null);
      e.target.blur();
    }
  };

  return (
    <div className="practice">
      <Sidebar isAdmin="false" />

      <div className="main">
        <div className="top">
          <span>
            Web Camera:
            <span onClick={checkCamera}>
              {" "}
              {cameraEnable ? `Enabled` : `Disable`}
            </span>
          </span>

          <br />
          <span>
            Hand Detected: <span>{handView ? "True" : "False"}</span>
          </span>

          <span>
            ASL <span>Character</span>
          </span>
        </div>

        <div className="container">
          <div className="camera-container">
            <Camera
              className="camera"
              ref={cameraRef}
              mirrored={true}
              style={{
                height: "100%",
                width: "100%",
              }}
            />

            {loading ? <GameLoader /> : ""}
          </div>
          <div className="asl-container">
            {letter ? (
              <img className="asl-image" src={aslImg} alt="ASL"></img>
            ) : (
              ""
            )}
          </div>
        </div>

        {letter ? (
          <div
            className="status-container"
            style={{ display: handView ? "flex" : "none" }}
          >
            <span>Gesture Match!</span>
            {gestureMatch ? (
              <img src={correct} alt="correct!"></img>
            ) : (
              <img src={wrong} alt="wrong!"></img>
            )}
          </div>
        ) : (
          ""
        )}

        <span className="text">Click any letter to start</span>

        <div className="btn-container">
          <button
            type="button"
            value="A"
            onClick={(e) => btnClick(e, handImage.A)}
          >
            A
          </button>
          <button
            type="button"
            value="B"
            onClick={(e) => btnClick(e, handImage.B)}
          >
            B
          </button>
          <button
            type="button"
            value="C"
            onClick={(e) => btnClick(e, handImage.C)}
          >
            C
          </button>
          <button
            type="button"
            value="D"
            onClick={(e) => btnClick(e, handImage.D)}
          >
            D
          </button>
          <button
            type="button"
            value="E"
            onClick={(e) => btnClick(e, handImage.E)}
          >
            E
          </button>
          <button
            type="button"
            value="F"
            onClick={(e) => btnClick(e, handImage.F)}
          >
            F
          </button>
          <button
            type="button"
            value="G"
            onClick={(e) => btnClick(e, handImage.G)}
          >
            G
          </button>
          <button
            type="button"
            value="H"
            onClick={(e) => btnClick(e, handImage.H)}
          >
            H
          </button>
          <button
            type="button"
            value="I"
            onClick={(e) => btnClick(e, handImage.I)}
          >
            I
          </button>
          <button
            type="button"
            value="J"
            onClick={(e) => btnClick(e, handImage.J)}
          >
            J
          </button>
          <button
            type="button"
            value="K"
            onClick={(e) => btnClick(e, handImage.K)}
          >
            K
          </button>
          <button
            type="button"
            value="L"
            onClick={(e) => btnClick(e, handImage.L)}
          >
            L
          </button>
          <button
            type="button"
            value="M"
            onClick={(e) => btnClick(e, handImage.M)}
          >
            M
          </button>
          <button
            type="button"
            value="N"
            onClick={(e) => btnClick(e, handImage.N)}
          >
            N
          </button>
          <button
            type="button"
            value="O"
            onClick={(e) => btnClick(e, handImage.O)}
          >
            O
          </button>
          <button
            type="button"
            value="P"
            onClick={(e) => btnClick(e, handImage.P)}
          >
            P
          </button>
          <button
            type="button"
            value="Q"
            onClick={(e) => btnClick(e, handImage.Q)}
          >
            Q
          </button>
          <button
            type="button"
            value="R"
            onClick={(e) => btnClick(e, handImage.R)}
          >
            R
          </button>
          <button
            type="button"
            value="S"
            onClick={(e) => btnClick(e, handImage.S)}
          >
            S
          </button>
          <button
            type="button"
            value="T"
            onClick={(e) => btnClick(e, handImage.T)}
          >
            T
          </button>
          <button
            type="button"
            value="U"
            onClick={(e) => btnClick(e, handImage.U)}
          >
            U
          </button>
          <button
            type="button"
            value="V"
            onClick={(e) => btnClick(e, handImage.V)}
          >
            V
          </button>
          <button
            type="button"
            value="W"
            onClick={(e) => btnClick(e, handImage.W)}
          >
            W
          </button>
          <button
            type="button"
            value="X"
            onClick={(e) => btnClick(e, handImage.X)}
          >
            X
          </button>
          <button
            type="button"
            value="Y"
            onClick={(e) => btnClick(e, handImage.Y)}
          >
            Y
          </button>
          <button
            type="button"
            value="Z"
            onClick={(e) => btnClick(e, handImage.Z)}
          >
            Z
          </button>
        </div>
      </div>

      <RightNav
        coloredText="PRACTICE"
        text="Practice signing the American Sign Language (ASL) alphabets.
        
        How to use:
        Choose a character from the set of letters below; the ASL equivalent of this letter may be found in the right box labeled as ASL Character, and to see if you are signing correctly, turn on your camera and imitate the one in the photo. On the upper left corner, it will tell you if your camera is enabled and can detect your hand.

        "
      />
    </div>
  );
};

export default Practice;
