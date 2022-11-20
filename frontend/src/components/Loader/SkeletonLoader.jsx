import React from "react";
import { Box, Skeleton } from "@mui/material";

const styles = {
  container: {
    height: "100%",
    width: "100%",
    padding: 1,
  },
};

const SkeletonLoader = () => {
  return (
    <>
      <Box sx={styles.container}>
        <Box
          sx={{
            width: "100%",
            height: "50px",
            display: "flex",
          }}
        >
          <Box
            sx={{
              width: "25%",
              display: "flex",
              flexDirection: "column",
              paddingRight: "10px",
            }}
          >
            <Skeleton
              variant="text"
              animation="wave"
              sx={{ fontSize: "1rem" }}
            />
            <Skeleton
              variant="text"
              animation="wave"
              sx={{ fontSize: "1rem" }}
            />
          </Box>

          <Box
            sx={{
              width: "25%",
              display: "flex",
              flexDirection: "column",
              paddingRight: "10px",
            }}
          >
            <Skeleton
              variant="text"
              animation="wave"
              sx={{ fontSize: "1rem" }}
            />
            <Skeleton
              variant="text"
              animation="wave"
              sx={{ fontSize: "1rem" }}
            />
          </Box>

          <Box
            sx={{
              width: "25%",
              display: "flex",
              flexDirection: "column",
              paddingRight: "5px",
            }}
          >
            <Skeleton
              variant="text"
              animation="wave"
              sx={{ fontSize: "1rem" }}
            />
            <Skeleton
              variant="text"
              animation="wave"
              sx={{ fontSize: "1rem" }}
            />
          </Box>

          <Box
            sx={{
              width: "25%",
              display: "flex",
              flexDirection: "column",
              paddingLeft: "5px",
            }}
          >
            <Skeleton
              variant="text"
              animation="wave"
              sx={{ fontSize: "1rem" }}
            />
            <Skeleton
              variant="text"
              animation="wave"
              sx={{ fontSize: "1rem" }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            width: "100%",
            height: "calc(100% - 150px)",
            display: "flex",
            mt: 1,
          }}
        >
          <Box
            sx={{
              width: "50%",
              height: "100%",
              paddingRight: "10px",
            }}
          >
            <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
          </Box>

          <Box
            sx={{
              width: "50%",
              height: "100%",
            }}
          >
            <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
          </Box>
        </Box>

        <Box
          sx={{
            width: "100%",
            height: "100px",
            display: "flex",
            pt: 1,
          }}
        >
          <Box
            sx={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              paddingRight: "10px",
            }}
          >
            <Skeleton
              variant="text"
              animation="wave"
              sx={{ fontSize: "1rem" }}
            />
            <Skeleton
              variant="text"
              animation="wave"
              sx={{ fontSize: "1rem", width: "75%" }}
            />
            <Skeleton
              variant="text"
              animation="wave"
              sx={{ fontSize: "1rem", width: "50%" }}
            />
          </Box>

          <Box
            sx={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Skeleton
              variant="text"
              animation="wave"
              sx={{ fontSize: "1rem" }}
            />
            <Skeleton
              variant="text"
              animation="wave"
              sx={{ fontSize: "1rem", width: "75%" }}
            />
            <Skeleton
              variant="text"
              animation="wave"
              sx={{ fontSize: "1rem", width: "50%" }}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SkeletonLoader;
