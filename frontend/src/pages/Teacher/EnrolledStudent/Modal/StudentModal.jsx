import { useState, useEffect } from "react";
import {
  Fade,
  Modal,
  Box,
  Backdrop,
  Grid,
  Avatar,
  Typography,
  Divider,
} from "@mui/material";
import Chart from "react-apexcharts";

const styles = {
  modalStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    background: "#fff",
    color: "var(--navyBlue)",
    borderRadius: "15px",
    boxShadow: 20,
    outline: "none",
    p: 4,
    pb: 6,
  },
};

const StudentModal = ({ studentData, handleStudentData }) => {
  const [open, setOpen] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress((studentData?.lesson?.progress / 5) * 100);
    // eslint-disable-next-line
  }, []);

  const closeModal = () => {
    setOpen(false);
    handleStudentData(null);
  };

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
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#fff",
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24,
            },
          },
          track: {
            background: "#fff",
            strokeWidth: "67%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35,
            },
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: "#888",
              fontSize: "17px",
            },
            value: {
              formatter: function (val) {
                return parseInt(val);
              },
              color: "#111",
              fontSize: "36px",
              show: true,
            },
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#ABE5A1"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      stroke: {
        lineCap: "round",
      },
      labels: ["Percent"],
    },
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={styles.modalStyle}>
            <Grid container spacing={2}>
              <Grid item={true} xs={6}>
                <Avatar
                  alt="Student Profile"
                  src={studentData.userInfo.image}
                  sx={{ marginX: "auto", width: 100, height: 100 }}
                />
                <Typography
                  variant="h5"
                  align="center"
                  sx={{ color: "var(--aquaGreen)", margin: "5px 0" }}
                >
                  {studentData.userInfo.firstName + " "}
                  {studentData.userInfo.middleInitial
                    ? studentData.userInfo.middleInitial + "."
                    : ""}
                  {" " + studentData.userInfo.lastName}
                </Typography>

                <Typography
                  align="center"
                  sx={{ color: "var(--aquaGreen)", mt: 1 }}
                >
                  {studentData.userInfo.school}
                </Typography>

                <Divider />

                <Typography align="center">School</Typography>

                <Typography
                  align="center"
                  sx={{ color: "var(--aquaGreen)", mt: 1 }}
                >
                  {studentData.email}
                </Typography>

                <Divider />

                <Typography align="center">Email Address</Typography>
              </Grid>
              <Grid item={true} xs={6}>
                <Chart
                  options={chartOptions.options}
                  series={chartOptions.series}
                  type="radialBar"
                  height={230}
                />
                <h2
                  style={{
                    color: "var(--aquaGreen)",
                    textAlign: "center",
                    marginTop: "-30px",
                  }}
                >
                  Lesson Progress
                </h2>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default StudentModal;
