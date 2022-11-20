import "./FourPicOneWord.css";
import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { IoMdSend, IoMdBackspace } from "react-icons/io";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { images as rightImages } from "../../util/rightImages";
import { images as leftImages } from "../../util/LeftImages";
import { useSelector, useDispatch } from "react-redux";
import { reset, getWords } from "../../features/gameWord/gameWordSlice";
import FourPicStart from "../../components/Game/FourPic/FourPicStart";
import {
  reset as resetLeaderboard,
  addLeaderboard,
  getLeaderboard,
} from "../../features/leaderboard/leaderboardSlice";
import Leaderboard from "../../components/Leaderboard/Leaderboard";
import FourPicGameOver from "../../components/Game/FourPic/FourPicGameOver";
import GameLoader from "../../components/GameLoader/GameLoader";

const FourPicOneWord = () => {
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

  const { user, token } = useSelector((state) => state.auth);

  const gameType = "fourpiconeword";
  const [aslImages, setAslImages] = useState([]);
  const [gameStart, setGameStart] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [imagesArr, setImagesArr] = useState([]);
  const [arrIndex, setArrIndex] = useState(0);
  const [choicesArr, setChoicesArr] = useState([]);
  const [answerArr, setAnswerArr] = useState([]);
  const [answerIndexArr, setAnswerIndexArr] = useState([]);
  const [blankAnswerArr, setBlankAnswerArr] = useState([]);
  const [answerImageArr, setAnswerImageArr] = useState([]);
  const [difficulty, setDifficulty] = useState("EASY");
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [remainingLives, setRemainingLives] = useState([]);
  const [lostLives, setLostLives] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      setGameEnded(false);
      setIsLoading(false);

      setGameStart(true);

      const words = data.map((item) => {
        return { value: item.word.split(""), image: item.image };
      });

      if (difficulty === "EASY") {
        setImagesArr(getRandomItems(words, 5));
      }
      if (difficulty === "MEDIUM") {
        setImagesArr(getRandomItems(words, 10));
      }
      if (difficulty === "HARD") {
        setImagesArr(getRandomItems(words, 15));
      }
      getRemainingLives();
    }

    if (isError) {
      dispatch(reset());
      setIsLoading(false);
      alert(message);
    }
    // eslint-disable-next-line
  }, [data, isSuccess, isError, message]);

  useEffect(() => {
    if (gameEnded) {
      const params = {
        token: token,
        gameType: gameType,
        difficulty: difficulty,
        score: correct,
        time: 0,
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
    isErrorLeaderboard,
    isSuccessLeaderboard,
    isLoadingLeaderboard,
    messageLeaderboard,
  ]);

  useEffect(() => {
    const params = {
      token: token,
      gameType: gameType,
      difficulty: difficulty,
    };
    dispatch(getLeaderboard(params));
    // eslint-disable-next-line
  }, [difficulty]);

  function startGame() {
    resetGame();
    setIsLoading(true);
    const params = {
      token: token,
      gameType: gameType,
      difficulty: difficulty,
    };

    setTimeout(() => {
      dispatch(getWords(params));
    }, 500);
  }

  function resetGame() {
    setGameStart(false);
    setArrIndex(0);
    setImagesArr([]);
    setChoicesArr([]);
    setAnswerArr([]);
    setAnswerIndexArr([]);
    setAnswerImageArr([]);
    setCorrect(0);
    setWrong(0);
    setRemainingLives([]);
    setLostLives([]);
    setBlankAnswerArr([]);
    setGameEnded(false);
  }

  function changeDifficulty(e) {
    setDifficulty(e.target.value);
    resetGame();
  }

  function renderImage() {
    if (imagesArr.length !== 0 && !gameEnded) {
      return <img src={imagesArr[arrIndex].image} alt=""></img>;
    }
  }

  function submitAnswer() {
    if (
      gameStart &&
      answerArr.length === imagesArr[arrIndex].value.length &&
      arrIndex !== imagesArr.length
    ) {
      if (
        JSON.stringify(imagesArr[arrIndex].value) === JSON.stringify(answerArr)
      ) {
        setArrIndex(arrIndex + 1);
        setCorrect(correct + 1);

        if (arrIndex === imagesArr.length - 1) {
          setArrIndex(imagesArr.length - 1);
          setGameEnded(true);
          setGameStart(false);
        }

        setAnswerArr([]);
        setAnswerIndexArr([]);
        setAnswerImageArr([]);
      } else {
        setArrIndex(arrIndex + 1);
        setWrong(wrong + 1);

        if (arrIndex === imagesArr.length - 1) {
          setArrIndex(imagesArr.length - 1);
          setGameEnded(true);
          setGameStart(false);
        }

        setAnswerArr([]);
        setAnswerIndexArr([]);
        setAnswerImageArr([]);
        reduceLives();
      }
    }
  }

  function getChoices() {
    const arr = [...imagesArr[arrIndex].value];
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let i = arr.length; i < 10; i++) {
      arr.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
    }

    return getImages(shuffle(arr));
  }

  function getImages(arr) {
    const imgArr = [];

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < aslImages.length; j++) {
        if (arr[i] === aslImages[j].value) {
          imgArr.push(aslImages[j]);
        }
      }
    }
    return imgArr;
  }

  function shuffle(arr) {
    const arrCopy = [...arr];
    const items = [];

    for (let i = 0; i < arr.length; i++) {
      let randomIndex = [Math.floor(Math.random() * arrCopy.length)];
      items.push(arrCopy[randomIndex]);
      arrCopy.splice(randomIndex, 1);
    }

    return items;
  }

  function getRandomItems(arr, num) {
    const arrCopy = [...arr];

    const items = [];

    for (let i = 0; i < num; i++) {
      let randomIndex = [Math.floor(Math.random() * arrCopy.length)];
      items.push(arrCopy[randomIndex]);
      arrCopy.splice(randomIndex, 1);
    }

    return items;
  }

  function renderChoicesImages(arr) {
    if (arr.length !== 0) {
      const choices = [];
      // eslint-disable-next-line
      arr.map((item, key) => {
        choices.push(
          <button
            key={key}
            value={item.value}
            onClick={(event) => handleBtnChoices(event, key)}
          >
            <img src={item.image} alt=""></img>
          </button>
        );
      });

      return choices;
    }
  }

  function renderAnswerImages(arr) {
    if (arr.length !== 0) {
      const choices = [];
      // eslint-disable-next-line
      arr.map((item, key) => {
        choices.push(
          <button key={key} value={item.value}>
            <img src={item.image} alt=""></img>
          </button>
        );
      });

      return choices;
    }
  }

  function renderBlankAnswers(arr) {
    if (arr.length !== 0) {
      const blankAnswer = [];
      // eslint-disable-next-line
      arr.map((item, key) => {
        blankAnswer.push(<div key={key} className="blank-answer"></div>);
      });

      return blankAnswer;
    }
  }

  function getBlankAnswers(arr) {
    for (let i = 0; i < arr.length; i++) {
      blankAnswerArr.push("");
    }
  }

  function decrementBlankAnswers(arr) {
    const blankAnswerArrCopy = [...arr];
    blankAnswerArrCopy.splice(blankAnswerArrCopy.length - 1, 1);
    setBlankAnswerArr(blankAnswerArrCopy);
  }

  function incrementBlankAnswers(arr) {
    const blankAnswerArrCopy = [...arr];
    blankAnswerArrCopy.push("");
    setBlankAnswerArr(blankAnswerArrCopy);
  }

  const handleBtnChoices = (event, key) => {
    if (
      gameStart &&
      event.currentTarget.value !== "" &&
      imagesArr[arrIndex].value.length !== answerArr.length
    ) {
      decrementBlankAnswers(blankAnswerArr);
      const prevAnswerArr = [...answerArr];
      const prevAnswerIndexArr = [...answerIndexArr];
      prevAnswerArr.push(event.currentTarget.value);
      setAnswerArr(prevAnswerArr);

      prevAnswerIndexArr.push(key);
      setAnswerIndexArr(prevAnswerIndexArr);

      const choicesCopy = [...choicesArr];
      choicesCopy.splice(key, 1, { value: "", image: null });
      setChoicesArr(choicesCopy);

      //set the button value to empty to avoid multiple clicks of answer button
      event.currentTarget.value = "";
      event.target.src = null;
    }
  };

  function backSpace() {
    if (answerImageArr.length !== 0) {
      incrementBlankAnswers(blankAnswerArr);
      const choicesCopy = [...choicesArr];

      const item = getImages(answerArr[answerArr.length - 1]);
      choicesCopy.splice(answerIndexArr[answerIndexArr.length - 1], 1, item[0]);
      setChoicesArr(choicesCopy);

      const answerImageArrCopy = [...answerImageArr];
      answerImageArrCopy.splice(answerImageArrCopy.length - 1, 1);
      setAnswerImageArr(answerImageArrCopy);

      const answerArrCopy = [...answerArr];
      answerArrCopy.splice(answerArrCopy.length - 1, 1);
      setAnswerArr(answerArrCopy);

      const answerIndexArrCopy = [...answerIndexArr];
      answerIndexArrCopy.splice(answerIndexArrCopy.length - 1, 1);
      setAnswerIndexArr(answerIndexArrCopy);
    }
  }

  function renderLostLives(arr) {
    if (arr.length !== 0) {
      const lives = [];
      // eslint-disable-next-line
      arr.map((item, key) => {
        lives.push(<AiOutlineHeart className="outlined-heart" key={key} />);
      });
      return lives;
    }
  }

  function renderRemainingLives(arr) {
    if (arr.length !== 0) {
      const lives = [];
      // eslint-disable-next-line
      arr.map((item, key) => {
        lives.push(<AiFillHeart className="filled-heart" key={key} />);
      });

      return lives;
    }
  }

  function getRemainingLives() {
    const remainingLivesCopy = [];
    if (difficulty === "EASY") {
      for (let i = 0; i < 5; i++) {
        remainingLivesCopy.push("");
      }
      setRemainingLives(remainingLivesCopy);
    } else if (difficulty === "MEDIUM") {
      for (let i = 0; i < 4; i++) {
        remainingLivesCopy.push("");
      }
      setRemainingLives(remainingLivesCopy);
    } else {
      for (let i = 0; i < 3; i++) {
        remainingLivesCopy.push("");
      }
      setRemainingLives(remainingLivesCopy);
    }
  }

  function reduceLives() {
    const remainingLivesCopy = [...remainingLives];
    remainingLivesCopy.splice(remainingLivesCopy.length - 1, 1);
    setRemainingLives(remainingLivesCopy);

    lostLives.push("");
  }

  //if the length of the remainingLives array is equals to zero set the game status to ended
  useEffect(() => {
    if (gameStart) {
      if (remainingLives.length === 0) {
        setGameEnded(true);
        setGameStart(false);
      }
    }
    // eslint-disable-next-line
  }, [correct, wrong]);

  //when answerArr changes state get image value
  useEffect(() => {
    if (choicesArr.length !== 0) {
      setAnswerImageArr(getImages(answerArr));
    }
    // eslint-disable-next-line
  }, [answerArr]);

  useEffect(() => {
    if (imagesArr.length !== 0) {
      console.log(imagesArr[arrIndex].value);
      setChoicesArr(getChoices);

      //getter and renderer for the blank answer
      getBlankAnswers(imagesArr[arrIndex].value);
    }
    // eslint-disable-next-line
  }, [imagesArr]);

  //when the arrIndex change state shuffle the correct answer with other random items then render the button choices
  useEffect(() => {
    if (gameStart) {
      // console.log(imagesArr[arrIndex].value);
      setChoicesArr(getChoices);

      //getter and renderer for the blank answer
      getBlankAnswers(imagesArr[arrIndex].value);
    }
    // eslint-disable-next-line
  }, [arrIndex]);

  //scratch useEffect to check the correct answer on console
  useEffect(() => {
    if (answerImageArr.length !== 0) {
      // console.log(answerImageArr);
    }
  }, [answerImageArr]);

  // useEffect(() => {
  //   if (gameEnded) {
  //     alert("Game Ended!");
  //   }
  // }, [gameEnded]);

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
        return { value: item, image: Object.values(rightImages)[index] };
      });
      setAslImages(asl);
    } else {
      const asl = alphabets.map((item, index) => {
        return { value: item, image: Object.values(leftImages)[index] };
      });
      setAslImages(asl);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="four-pic">
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
            {/* <button onClick={startGame}>START</button>
            <div className="divider"></div> */}
            <button onClick={resetGame}>RESET</button>
          </div>

          <div className="lives-container">
            {renderLostLives(lostLives)}
            {renderRemainingLives(remainingLives)}
          </div>
        </div>

        <div className="picture-container">
          {!gameEnded && !isLoading ? renderImage() : ""}
          {!gameStart && !gameEnded && !isLoading ? (
            <FourPicStart start={startGame} />
          ) : (
            ""
          )}

          {gameEnded && !isLoading && (
            <FourPicGameOver
              start={startGame}
              difficulty={difficulty}
              score={`${correct} / ${imagesArr.length}`}
            />
          )}

          {isLoading ? <GameLoader className="game-loader" /> : ""}
        </div>

        <div className="bottom-indicator">
          <span>
            Correct: <span>{correct}</span>
          </span>

          <span>
            {gameStart ? arrIndex + 1 : 0}/{imagesArr.length}
          </span>

          <span>
            Wrong: <span>{wrong}</span>
          </span>
        </div>

        <div className="bottom-controls">
          <button onClick={backSpace}>
            <IoMdBackspace className="btn-icon-backspace" />
          </button>

          <div className="answer-container">
            {renderAnswerImages(answerImageArr)}
            {renderBlankAnswers(blankAnswerArr)}
          </div>

          <button onClick={submitAnswer}>
            <IoMdSend className="btn-icon-submit" />
          </button>
        </div>

        <div className="asl-button-container">
          {renderChoicesImages(choicesArr)}
        </div>
      </div>

      <Leaderboard
        difficulty={difficulty}
        data={dataLeaderboard}
        gameType={gameType}
      />
    </div>
  );
};

export default FourPicOneWord;
