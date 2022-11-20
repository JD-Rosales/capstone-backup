import "./Learn.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import Grid2 from "@mui/material/Unstable_Grid2";
import learn_illustration from "../../assets/edit_profile.png"; //needs to change
import Carousel from "react-material-ui-carousel";
import {
  Button,
  Box,
  Card,
  Typography,
  CardContent,
  CardActions,
  Avatar,
} from "@mui/material";
import { useSelector } from "react-redux";

const carouselStyle = {
  height: "100%",
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-evenly",
};

const cardStyle = {
  width: 220,
  height: 270,
  borderRadius: 5,
  backgroundColor: "var(--navyBlue)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px 0",
  "&:hover": {
    transform: "scale(1.1)",
    transition: "all 0.3s",
  },
};

const CardContentStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px 20px",
};

const Learn = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="learn">
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
                LEARN <br /> <span>ASL</span>
              </h1>
              <p>
                Not sure on how or where to begin learning ASL? Do not sweat!
                Use these lessons as a guide as you learn American Sign
                Language, and with some practice, you'll be able to interact
                with hearing-impaired people.
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
              <img src={learn_illustration} alt="Edit Profile Logo" />
            </Grid2>
          </Grid2>
        </header>

        <div className="carousel-container">
          <Carousel
            autoPlay={false}
            cycleNavigation={false}
            infiniteLoop={false}
            navButtonsAlwaysVisible={true}
            fullHeightHover={false}
            animation="slide"
            height={300}
          >
            {/* Carousel Item 1 */}
            <Box sx={carouselStyle}>
              {/* Start Card */}
              <Card sx={cardStyle}>
                <CardContent sx={CardContentStyle}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: "#fff",
                    }}
                  >
                    LESSON
                  </Typography>

                  <Avatar
                    sx={{
                      bgcolor: "var(--aquaGreen)",
                      width: 80,
                      height: 80,
                      margin: "10px 0",
                    }}
                  >
                    <Typography variant="h3" sx={{ color: "#fff" }}>
                      1
                    </Typography>
                  </Avatar>

                  <Typography
                    sx={{
                      fontSize: ".9rem",
                      textAlign: "center",
                      color: "#fff",
                      lineHeight: "1rem",
                    }}
                  >
                    INTRODUCTION TO ASL
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    onClick={() => {
                      navigate("/lesson-1");
                    }}
                    sx={{
                      backgroundColor: "var(--aquaGreen)",
                      marginBottom: "10px",
                      width: 120,
                    }}
                  >
                    Start
                  </Button>
                </CardActions>
              </Card>
              {/* End Card */}

              {/* Start Card */}
              <Card sx={cardStyle}>
                <CardContent sx={CardContentStyle}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: "#fff",
                    }}
                  >
                    LESSON
                  </Typography>

                  <Avatar
                    sx={{
                      bgcolor: "var(--aquaGreen)",
                      width: 80,
                      height: 80,
                      margin: "10px 0",
                    }}
                  >
                    <Typography variant="h3" sx={{ color: "#fff" }}>
                      2
                    </Typography>
                  </Avatar>

                  <Typography
                    sx={{
                      fontSize: ".9rem",
                      textAlign: "center",
                      color: "#fff",
                      lineHeight: "1rem",
                    }}
                  >
                    FACIAL EXPRESSION AND SENTENCE STRUCTURE
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    disabled={user?.lesson?.progress < 1 ? true : false}
                    onClick={() => {
                      navigate("/lesson-2");
                    }}
                    sx={{
                      backgroundColor: "var(--aquaGreen)",
                      marginBottom: "10px",
                      width: 120,
                      "&.Mui-disabled": {
                        backgroundColor: "var(--aquaGreen)",
                        opacity: 0.7,
                      },
                    }}
                  >
                    Start
                  </Button>
                </CardActions>
              </Card>
              {/* End Card */}

              {/* Start Card */}
              <Card sx={cardStyle}>
                <CardContent sx={CardContentStyle}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: "#fff",
                    }}
                  >
                    LESSON
                  </Typography>

                  <Avatar
                    sx={{
                      bgcolor: "var(--aquaGreen)",
                      width: 80,
                      height: 80,
                      margin: "10px 0",
                    }}
                  >
                    <Typography variant="h3" sx={{ color: "#fff" }}>
                      3
                    </Typography>
                  </Avatar>

                  <Typography
                    sx={{
                      fontSize: ".9rem",
                      textAlign: "center",
                      color: "#fff",
                      lineHeight: "1rem",
                    }}
                  >
                    GRAMMAR AND SYNTAX
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    disabled={user?.lesson?.progress < 2 ? true : false}
                    onClick={() => {
                      navigate("/lesson-3");
                    }}
                    sx={{
                      backgroundColor: "var(--aquaGreen)",
                      marginBottom: "10px",
                      width: 120,
                      "&.Mui-disabled": {
                        backgroundColor: "var(--aquaGreen)",
                        opacity: 0.7,
                      },
                    }}
                  >
                    Start
                  </Button>
                </CardActions>
              </Card>
              {/* End Card */}
            </Box>
            {/* End Carousel Item 1 */}

            {/* Carousel Item 2 */}
            <Box sx={carouselStyle}>
              {/* Start Card */}
              <Card sx={cardStyle}>
                <CardContent sx={CardContentStyle}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: "#fff",
                    }}
                  >
                    LESSON
                  </Typography>

                  <Avatar
                    sx={{
                      bgcolor: "var(--aquaGreen)",
                      width: 80,
                      height: 80,
                      margin: "10px 0",
                    }}
                  >
                    <Typography variant="h3" sx={{ color: "#fff" }}>
                      4
                    </Typography>
                  </Avatar>

                  <Typography
                    sx={{
                      fontSize: ".9rem",
                      textAlign: "center",
                      color: "#fff",
                      lineHeight: "1rem",
                    }}
                  >
                    NON-MANUAL MARKERS (NMM).
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    disabled={user?.lesson?.progress < 3 ? true : false}
                    onClick={() => {
                      navigate("/lesson-4");
                    }}
                    sx={{
                      backgroundColor: "var(--aquaGreen)",
                      marginBottom: "10px",
                      width: 120,
                      "&.Mui-disabled": {
                        backgroundColor: "var(--aquaGreen)",
                        opacity: 0.7,
                      },
                    }}
                  >
                    Start
                  </Button>
                </CardActions>
              </Card>
              {/* End Card */}

              {/* Start Card */}
              <Card sx={cardStyle}>
                <CardContent sx={CardContentStyle}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: "#fff",
                    }}
                  >
                    LESSON
                  </Typography>

                  <Avatar
                    sx={{
                      bgcolor: "var(--aquaGreen)",
                      width: 80,
                      height: 80,
                      margin: "10px 0",
                    }}
                  >
                    <Typography variant="h3" sx={{ color: "#fff" }}>
                      5
                    </Typography>
                  </Avatar>

                  <Typography
                    sx={{
                      fontSize: ".9rem",
                      textAlign: "center",
                      color: "#fff",
                      lineHeight: "1rem",
                    }}
                  >
                    EYE GAZE
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    disabled={user?.lesson?.progress < 4 ? true : false}
                    onClick={() => {
                      navigate("/lesson-5");
                    }}
                    sx={{
                      backgroundColor: "var(--aquaGreen)",
                      marginBottom: "10px",
                      width: 120,
                      "&.Mui-disabled": {
                        backgroundColor: "var(--aquaGreen)",
                        opacity: 0.7,
                      },
                    }}
                  >
                    Start
                  </Button>
                </CardActions>
              </Card>
              {/* End Card */}

              {/* End Card */}
            </Box>
            {/* Carousel Item 3 */}
          </Carousel>
        </div>
      </main>
    </div>
  );
};

export default Learn;
