import { useState, useEffect, useRef } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./GuessHandSign.css";
import { images as rightImages } from "../../util/rightImages";
import { images as leftImages } from "../../util/LeftImages";
import Countdown, { zeroPad } from "react-countdown";
import GameLoader from "../../components/GameLoader/GameLoader";
import GuessHandSignStart from "../../components/Game/GuessHandSign/GuessHandSignStart";
import GameOver from "../../components/Game/GameOver/GameOver";
import { useSelector, useDispatch } from "react-redux";
import {
  reset as resetLeaderboard,
  addLeaderboard,
  getLeaderboard,
} from "../../features/leaderboard/leaderboardSlice";
import Leaderboard from "../../components/Leaderboard/Leaderboard";
import axios from "axios";

const GuessHandSign = () => {
  const dispatch = useDispatch();

  const gameType = "guesshandsign";
  const { user, token } = useSelector((state) => state.auth);

  const {
    data: dataLeaderboard,
    isError: isErrorLeaderboard,
    isSuccess: isSuccessLeaderboard,
    isLoading: isLoadingLeaderboard,
    message: messageLeaderboard,
  } = useSelector((state) => state.leaderboard);

  const currentDate = Date.now();
  const [timer, setTimer] = useState(currentDate);

  const [asl, setASL] = useState([]);
  const [letter, setLetter] = useState("");
  const [gameStart, setGameStart] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [aslArray, setAslArray] = useState([]);
  const [imgIndex, setImgIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [difficulty, setDifficulty] = useState("EASY");
  const renderAsl = () => {
    if (aslArray.length > 0) {
      return <img src={aslArray[imgIndex].image} alt="ASL" />;
    }
  };

  //Test
  useEffect(() => {
    if (aslArray.length > 0) {
      // console.log(aslArray);
    }
  }, [aslArray]);

  const addGuesshandsignLog = async () => {
    const params = {
      gameType: gameType,
      token: token,
    };
    try {
      await axios.post("/api/game-logs", params, {
        headers: { authorization: `Bearer ${params.token}` },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (gameStart) {
      const sum = correct + wrong;
      if (sum === aslArray.length) {
        setGameEnded(true);
      }
    }
    // eslint-disable-next-line
  }, [correct, wrong]);

  useEffect(() => {
    if (letter !== "") {
      checkAnswer();
    }
    // eslint-disable-next-line
  }, [letter]);

  const startGame = () => {
    resetGame();
    setGameStart(true);
    addGuesshandsignLog();
    if (difficulty === "EASY") {
      setTimer(Date.now() + 60000);
      setAslArray(getRandomItems(asl, 5));
    } else if (difficulty === "MEDIUM") {
      setTimer(Date.now() + 60000);
      setAslArray(getRandomItems(asl, 10));
    } else {
      setTimer(Date.now() + 30000);
      setAslArray(getRandomItems(asl, 15));
    }
  };

  const resetGame = () => {
    setTimer(currentDate);
    setGameStart(false);
    setLetter("");
    setAslArray([]);
    setImgIndex(0);
    setCorrect(0);
    setWrong(0);
    setGameEnded(false);
  };

  const changeDifficulty = (e) => {
    setDifficulty(e.target.value);
    resetGame();
  };

  function getRandomItems(arr, num) {
    const arrCopy = [...arr];
    const res = [];

    for (let i = 0; i < num; i++) {
      let index = Math.floor(Math.random() * arrCopy.length);
      res.push(arrCopy[index]);
      arrCopy.splice(index, 1);
    }
    return res;
  }

  const btnClick = (e) => {
    if (gameStart && !gameEnded) {
      setLetter(e.currentTarget.value);
    }
  };

  const checkAnswer = () => {
    if (letter === aslArray[imgIndex].name) {
      setCorrect(correct + 1);
      setLetter("");
      //only increment if the imgIndex is not greater than the length of AslArray
      if (imgIndex < aslArray.length - 1) {
        setImgIndex(imgIndex + 1);
      }
    } else if (letter !== aslArray[imgIndex].name && letter !== "") {
      setWrong(wrong + 1);
      setLetter("");
      //only increment if the imgIndex is not greater than the length of AslArray
      if (imgIndex < aslArray.length - 1) {
        setImgIndex(imgIndex + 1);
      }
    }
  };

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

  // pause timer if gameEnded
  useEffect(() => {
    if (gameEnded && gameStart) {
      const endTimer = timerRef.current;
      endTimer.pause();

      const params = {
        token: token,
        gameType: gameType,
        difficulty: difficulty,
        score: correct,
        time: endTimer.state.timeDelta.total,
      };
      dispatch(addLeaderboard(params));
    }
    // eslint-disable-next-line
  }, [gameEnded]);

  useEffect(() => {
    if (isSuccessLeaderboard) {
      dispatch(resetLeaderboard());
    }

    if (isErrorLeaderboard) {
      dispatch(resetLeaderboard());
    }
    // eslint-disable-next-line
  }, [
    dataLeaderboard,
    isSuccessLeaderboard,
    isErrorLeaderboard,
    isLoadingLeaderboard,
    messageLeaderboard,
  ]);

  // fetch leaderboard data onchange difficulty
  useEffect(() => {
    const params = {
      token: token,
      gameType: gameType,
      difficulty: difficulty,
    };
    dispatch(getLeaderboard(params));
    // eslint-disable-next-line
  }, [difficulty]);

  // start timer if model is loaded and the game is started
  useEffect(() => {
    const gameTimer = timerRef.current;
    if (gameStart && timer !== currentDate) {
      gameTimer.start();
    }
    // eslint-disable-next-line
  }, [timer, gameStart]);

  useEffect(() => {
    const alphabets = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ];
    if (user.userSettings.hand) {
      const asl = alphabets.map((item, index) => {
        return { name: item, image: Object.values(rightImages)[index] };
      });
      setASL(asl);
    } else {
      const asl = alphabets.map((item, index) => {
        return { name: item, image: Object.values(leftImages)[index] };
      });
      setASL(asl);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="guess-hand-sign">
      <Sidebar />

      <div className="main">
        <div className="top">
          <div className="difficulty-container">
            <span>Game Difficulty: </span>
            <select onChange={changeDifficulty}>
              <option value="EASY">EASY</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HARD">HARD</option>
            </select>
          </div>

          <div className="btn-container">
            {/* <button onClick={startGame}>START</button>
            <div className="divider"></div> */}
            <button onClick={resetGame}>RESET</button>
          </div>

          <div className="timer-container">
            <span>
              Time:{" "}
              <span>
                <Countdown
                  ref={timerRef}
                  date={timer}
                  intervalDelay={0}
                  precision={1}
                  renderer={renderer}
                  autoStart={false}
                  onComplete={() => {
                    setGameEnded(true);
                  }}
                />
              </span>
            </span>
          </div>
        </div>

        <div className="asl-container">
          {!gameEnded && !isLoadingLeaderboard && renderAsl()}

          {!gameStart && !isLoadingLeaderboard && (
            <GuessHandSignStart start={startGame} />
          )}

          {gameEnded &&
          !isLoadingLeaderboard &&
          (timerRef.current.state.status === "PAUSED" ||
            timerRef.current.state.status === "COMPLETED") ? (
            <GameOver
              start={startGame}
              difficulty={difficulty}
              timeLeft={`${zeroPad(
                timerRef.current.state.timeDelta.minutes
              )}:${zeroPad(timerRef.current.state.timeDelta.seconds)}:${zeroPad(
                String(timerRef.current.state.timeDelta.milliseconds).slice(
                  0,
                  2
                )
              )}`}
              score={`${correct} / ${aslArray.length}`}
            />
          ) : (
            ""
          )}

          {isLoadingLeaderboard ? <GameLoader className="game-loader" /> : ""}
        </div>

        <div className="bottom">
          <span>
            Correct: <span>{correct}</span>
          </span>

          <span>
            {gameStart ? imgIndex + 1 : 0}/{gameStart ? aslArray.length : 0}
          </span>

          <span>
            Wrong: <span>{wrong}</span>
          </span>
        </div>

        <div className="letter-container">
          <button type="button" value="A" onClick={(e) => btnClick(e)}>
            A
          </button>
          <button type="button" value="B" onClick={(e) => btnClick(e)}>
            B
          </button>
          <button type="button" value="C" onClick={(e) => btnClick(e)}>
            C
          </button>
          <button type="button" value="D" onClick={(e) => btnClick(e)}>
            D
          </button>
          <button type="button" value="E" onClick={(e) => btnClick(e)}>
            E
          </button>
          <button type="button" value="F" onClick={(e) => btnClick(e)}>
            F
          </button>
          <button type="button" value="G" onClick={(e) => btnClick(e)}>
            G
          </button>
          <button type="button" value="H" onClick={(e) => btnClick(e)}>
            H
          </button>
          <button type="button" value="I" onClick={(e) => btnClick(e)}>
            I
          </button>
          <button type="button" value="J" onClick={(e) => btnClick(e)}>
            J
          </button>
          <button type="button" value="K" onClick={(e) => btnClick(e)}>
            K
          </button>
          <button type="button" value="L" onClick={(e) => btnClick(e)}>
            L
          </button>
          <button type="button" value="M" onClick={(e) => btnClick(e)}>
            M
          </button>
          <button type="button" value="N" onClick={(e) => btnClick(e)}>
            N
          </button>
          <button type="button" value="O" onClick={(e) => btnClick(e)}>
            O
          </button>
          <button type="button" value="P" onClick={(e) => btnClick(e)}>
            P
          </button>
          <button type="button" value="Q" onClick={(e) => btnClick(e)}>
            Q
          </button>
          <button type="button" value="R" onClick={(e) => btnClick(e)}>
            R
          </button>
          <button type="button" value="S" onClick={(e) => btnClick(e)}>
            S
          </button>
          <button type="button" value="T" onClick={(e) => btnClick(e)}>
            T
          </button>
          <button type="button" value="U" onClick={(e) => btnClick(e)}>
            U
          </button>
          <button type="button" value="V" onClick={(e) => btnClick(e)}>
            V
          </button>
          <button type="button" value="W" onClick={(e) => btnClick(e)}>
            W
          </button>
          <button type="button" value="X" onClick={(e) => btnClick(e)}>
            X
          </button>
          <button type="button" value="Y" onClick={(e) => btnClick(e)}>
            Y
          </button>
          <button type="button" value="Z" onClick={(e) => btnClick(e)}>
            Z
          </button>
        </div>
      </div>
      <Leaderboard difficulty={difficulty} data={dataLeaderboard} />
    </div>
  );
};

export default GuessHandSign;
