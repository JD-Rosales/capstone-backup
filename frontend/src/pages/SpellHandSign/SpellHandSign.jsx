import "./SpellHandSign.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useState, useEffect, useRef } from "react";
import Countdown, { zeroPad } from "react-countdown";
import GameLoader from "../../components/GameLoader/GameLoader";
import { reset, getWords } from "../../features/gameWord/gameWordSlice";
import { images as rightImages } from "../../util/rightImages";
import { images as leftImages } from "../../util/LeftImages";
import SpellHandSignStart from "../../components/Game/SpellHandSign/SpellHandSignStart";
import GameOver from "../../components/Game/GameOver/GameOver";
import { useSelector, useDispatch } from "react-redux";
import {
  reset as resetLeaderboard,
  addLeaderboard,
  getLeaderboard,
} from "../../features/leaderboard/leaderboardSlice";
import Leaderboard from "../../components/Leaderboard/Leaderboard";

const SpellHandSign = () => {
  const dispatch = useDispatch();
  const { data, isError, isSuccess, message } = useSelector(
    (state) => state.gameWord
  );

  const {
    data: dataLeaderboard,
    isError: isErrorLeaderboard,
    isSuccess: isSuccessLeaderboard,
    isLoading: isLoadingLeaderboard,
    message: messageLeaderboard,
  } = useSelector((state) => state.leaderboard);

  const gameType = "spellhandsign";
  const { user, token } = useSelector((state) => state.auth);

  const [asl, setASL] = useState([]);
  const [inputWord, setInputWord] = useState("");
  const [gameStart, setGameStart] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [difficulty, setDifficulty] = useState("EASY");
  const [wordsArray, setWordsArray] = useState([]);
  const [currentWord, setCurrentWord] = useState(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const currentDate = Date.now();
  const [timer, setTimer] = useState(currentDate);

  useEffect(() => {
    if (wordsArray.length !== 0 && !gameEnded) {
      // console.log(wordsArray);
      setCurrentWord(wordsArray[wordIndex]);
    }
    // eslint-disable-next-line
  }, [wordsArray, wordIndex]);

  useEffect(() => {
    if (gameStart && wordsArray.length !== 0) {
      const sum = correct + wrong;
      if (sum === wordsArray.length) {
        setGameEnded(true);
      }
    }
    // eslint-disable-next-line
  }, [correct, wrong]);

  const renderImages = () => {
    if (currentWord) {
      const imgArray = [];

      for (let i = 0; i < currentWord.length; i++) {
        for (let j = 0; j < asl.length; j++) {
          if (currentWord[i] === asl[j].name) {
            imgArray.push(asl[j].image);
          }
        }
      }

      const imgElements = imgArray.map((img, key) => {
        return <img key={key} src={img} alt="handsign" />;
      });

      return imgElements;
    }
  };

  function submitBtn() {
    if (gameStart && inputWord && !gameEnded) {
      if (currentWord === inputWord) {
        setCorrect(correct + 1);
      } else {
        setWrong(wrong + 1);
      }
      setInputWord("");
      setWordIndex(wordIndex + 1);
    }
  }

  function handleInputChange(event) {
    //remove white spaces on input field
    let input = event.target.value.toUpperCase().replace(/\s/g, "");
    setInputWord(input);
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      submitBtn();
    }
  }

  const startGame = () => {
    resetGame();
    setGameStart(true);
    setIsLoading(true);
    const params = {
      token: token,
      gameType: gameType,
      difficulty: difficulty,
    };

    dispatch(getWords(params));
  };

  const resetGame = () => {
    setTimer(currentDate);
    setGameEnded(false);
    setGameStart(false);
    setInputWord("");
    setWordsArray([]);
    setCurrentWord(null);
    setWordIndex(0);
    setCorrect(0);
    setWrong(0);
  };

  function getRandomItems(arr, num) {
    const arrCopy = [...arr];
    const res = [];

    for (let i = 0; i < num; i++) {
      let index = Math.floor(Math.random() * arrCopy.length);
      res.push(arrCopy[index].word);
      arrCopy.splice(index, 1);
    }
    return res;
  }

  function changeDifficulty(e) {
    setDifficulty(e.target.value);
    resetGame();
  }

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

  // start timer if model is loaded and the game is started
  useEffect(() => {
    const gameTimer = timerRef.current;
    if (gameStart && !isLoading && timer !== currentDate && !gameEnded) {
      gameTimer.start();
    }
    // eslint-disable-next-line
  }, [timer, isLoading, gameStart]);

  // pause timer if gameEnded
  useEffect(() => {
    const endTimer = timerRef.current;
    if (gameEnded && gameStart) {
      endTimer.pause();
      const params = {
        token: token,
        gameType: gameType,
        difficulty: difficulty,
        score: correct,
        time: endTimer.state.timeDelta.total,
      };
      dispatch(addLeaderboard(params));
      // setTimer(currentDate);
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
    isErrorLeaderboard,
    isSuccessLeaderboard,
    isLoadingLeaderboard,
    messageLeaderboard,
  ]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      setGameEnded(false);
      setIsLoading(false);

      if (difficulty === "EASY") {
        setTimer(Date.now() + 90000);
        setWordsArray(getRandomItems(data, 5));
      } else if (difficulty === "MEDIUM") {
        setTimer(Date.now() + 60000);
        setWordsArray(getRandomItems(data, 8));
      } else {
        setTimer(Date.now() + 30000);
        setWordsArray(getRandomItems(data, 10));
      }
    }

    if (isError) {
      dispatch(reset());
      setIsLoading(false);
      alert(message);
    }
    // eslint-disable-next-line
  }, [data, isSuccess, isError, message]);

  useEffect(() => {
    const params = {
      token: token,
      gameType: gameType,
      difficulty: difficulty,
    };
    dispatch(getLeaderboard(params));
    // eslint-disable-next-line
  }, [difficulty]);

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
    <div className="spell-hand">
      <Sidebar isAdmin="false" />

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
            {/* <button
              onClick={startGame}
              style={{ display: gameStart ? "none" : "" }}
            >
              START
            </button>
            <div
              className="divider"
              style={{ display: gameStart ? "none" : "" }}
            ></div> */}
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
          {!gameEnded && renderImages()}
          {!gameStart && !gameEnded ? (
            <SpellHandSignStart start={startGame} />
          ) : (
            ""
          )}

          {isLoading ? <GameLoader className="game-loader" /> : ""}

          {gameEnded &&
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
              score={`${correct} / ${wordsArray.length}`}
            />
          ) : (
            ""
          )}
        </div>

        <div className="bottom">
          <span>
            Correct: <span>{correct}</span>
          </span>

          <span style={{ visibility: !gameStart ? "hidden" : "" }}>
            {gameEnded ? wordIndex : gameStart ? wordIndex + 1 : 0}/
            {wordsArray.length}
          </span>

          <span>
            Wrong: <span>{wrong}</span>
          </span>
        </div>

        <div className="input-container">
          <input
            type="text"
            onKeyUp={handleKeyPress}
            onChange={handleInputChange}
            value={inputWord}
            placeholder="Text here..."
          ></input>

          <button onClick={submitBtn}>SUBMIT</button>
        </div>
      </div>
      <Leaderboard difficulty={difficulty} data={dataLeaderboard} />
    </div>
  );
};

export default SpellHandSign;
