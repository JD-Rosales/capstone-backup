import { Skeleton, Grid } from "@mui/material";

const SkeletonLoader = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item={true} xs={8}>
          <Skeleton variant="rectangular" width={"100%"} height={50} />
        </Grid>

        <Grid item={true} xs={4}>
          <Skeleton variant="rectangular" width={"100%"} height={50} />
        </Grid>

        <Grid item={true} xs={8}>
          <Skeleton variant="rectangular" width={"100%"} height={50} />
        </Grid>

        <Grid item={true} xs={4}>
          <Skeleton variant="rectangular" width={"100%"} height={50} />
        </Grid>

        <Grid item={true} xs={8}>
          <Skeleton variant="rectangular" width={"100%"} height={50} />
        </Grid>

        <Grid item={true} xs={4}>
          <Skeleton variant="rectangular" width={"100%"} height={50} />
        </Grid>

        <Grid item={true} xs={8}>
          <Skeleton variant="rectangular" width={"100%"} height={45} />
        </Grid>

        <Grid item={true} xs={4}>
          <Skeleton variant="rectangular" width={"100%"} height={45} />
        </Grid>

        <Grid item={true} xs={8}>
          <Skeleton variant="rectangular" width={"100%"} height={45} />
        </Grid>

        <Grid item={true} xs={4}>
          <Skeleton variant="rectangular" width={"100%"} height={45} />
        </Grid>
      </Grid>
    </>
  );
};

export default SkeletonLoader;
