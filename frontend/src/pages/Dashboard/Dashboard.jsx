import "./Dashboard.css";
import Sidebar from "../../components/Sidebar/Sidebar";
// import { useSelector } from "react-redux";
import Carousel from "react-material-ui-carousel";
import { facts } from "../../util/ASLFacts";
import GameLogs from "../../components/GameLogs/GameLogs";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress((user.lesson.progress / 5) * 100);
    // eslint-disable-next-line
  }, []);

  const chartOptions = {
    series: [progress],
    options: {
      // chart: {
      //   height: 100,
      //   type: "radialBar",
      //   toolbar: {
      //     show: true,
      //   },
      // },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 15,
            size: "70%",
          },

          track: {
            background: "#182240",
          },

          dataLabels: {
            name: {
              offsetY: -10,
              show: false,
              color: "#888",
              fontSize: "0px",
            },
            value: {
              color: "#fff",
              fontFamily: "Poppins",
              fontSize: "20px",
              fontWeight: "600",
              show: true,
            },
          },
        },
      },
      fill: {
        type: "solid",
        colors: "#42C9A3",
      },
      stroke: {
        lineCap: "square",
      },
      labels: ["Percent"],
    },
  };
  return (
    <div className="dashboard">
      <Sidebar />

      <main>
        <div className="header-container">
          <div className="text-container">
            <h2 style={{ marginTop: "10px" }}>
              DID YOU <span style={{ color: "var(--aquaGreen)" }}>KNOW</span>?
            </h2>
            <Carousel
              autoPlay={true}
              interval={6000}
              stopAutoPlayOnHover={false}
              navButtonsAlwaysVisible={false}
              navButtonsAlwaysInvisible={true}
              indicators={false}
              fullHeightHover={true}
              animation="slide"
              height={130}
            >
              {facts.map((fact, i) => {
                return (
                  <p key={i} style={{ fontSize: ".9rem" }}>
                    {fact}
                  </p>
                );
              })}
            </Carousel>
          </div>

          <div className="img-container">
            <Chart
              options={chartOptions.options}
              series={chartOptions.series}
              type="radialBar"
              height={200}
            />
            <h2
              style={{
                color: "var(--aquaGreen)",
                textAlign: "center",
                marginTop: "-30px",
                lineHeight: "23px",
                marginBottom: "5px",
              }}
            >
              <span>LESSON</span> <br />
              PROGRESS
            </h2>
          </div>
        </div>

        <div className="game-logs-container">
          <GameLogs />
        </div>
      </main>
    </div>
  );
};
export default Dashboard;
