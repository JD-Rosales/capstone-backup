import "./GameLogs.css";
import { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, getElementAtEvent } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getGameLogs } from "../../features/gameLogs/gameLogsSlice";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const GameLogs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.gameLogs);

  const chartRef = useRef();

  const handleClick = (event) => {
    const gameIndex = getElementAtEvent(chartRef.current, event)[0].index;
    if (gameIndex === 0) {
      navigate("/finger-spell");
    } else if (gameIndex === 1) {
      navigate("/spell-hand-sign");
    } else if (gameIndex === 2) {
      navigate("/guess-hand-sign");
    } else if (gameIndex === 3) {
      navigate("/4-pics-1-word");
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      title: {
        display: true,
        text: "Weekly Game Trend",
        color: "#fff",
      },
    },
  };

  const labels = [
    "Fingerspell",
    "Spell The Hand Sign",
    "Guess The Hand Sign",
    "4 Pic 1 Word",
  ];

  const gameLogsData = {
    labels,
    datasets: [
      {
        label: "Play Count",
        data: data,
        backgroundColor: ["#4F6D7A", "#474974", "#A69CAC", "#F1DCA4"],
      },
    ],
  };

  useEffect(() => {
    const params = {
      token,
    };
    dispatch(getGameLogs(params));
    // eslint-disable-next-line
  }, []);

  return (
    <div className="game-logs">
      <Bar
        ref={chartRef}
        onClick={handleClick}
        options={options}
        data={gameLogsData}
      />
    </div>
  );
};

export default GameLogs;
