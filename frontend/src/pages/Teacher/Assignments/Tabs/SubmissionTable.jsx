import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getSubmissions,
  reset,
} from "../../../../features/submission/submissionSlice";
import { Typography, TableRow, TableCell } from "@mui/material";
import moment from "moment";

const styles = {
  text: {
    fontSize: ".85rem",
    lineHeight: "1rem",
  },
};

const SubmissionTable = ({ assignmentID }) => {
  const dispatch = useDispatch();
  const { data, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.submission
  );
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
    }

    if (isError) {
      dispatch(reset());
      alert(message);
    }
    // eslint-disable-next-line
  }, [data, isSuccess, isError, isLoading, message]);

  useEffect(() => {
    const params = {
      assignmentID: assignmentID,
      token: token,
    };

    dispatch(getSubmissions(params));
    // eslint-disable-next-line
  }, []);

  const renderSubmission = (arr) => {
    const submissions = arr?.map((item, index) => {
      return (
        <TableRow key={item._id}>
          <TableCell sx={{ color: "var(--aquaGreen)" }}>{index + 1}</TableCell>

          <TableCell>
            <Typography sx={styles.text}>
              {item?.user?.userInfo?.firstName + " "}
              {item?.user?.userInfo?.middleInitial
                ? item?.user?.userInfo?.middleInitial + "."
                : ""}
              {" " + item?.user?.userInfo?.lastName}
            </Typography>
          </TableCell>

          <TableCell>
            <Typography sx={styles.text}>{item?.score}</Typography>
          </TableCell>

          <TableCell>
            <Typography sx={styles.text}>{item?.timeLeft}</Typography>
          </TableCell>

          <TableCell>
            <Typography sx={styles.text}>
              {moment(item?.date).format("LL")}{" "}
              {moment(item?.date).format("h:mma")}
            </Typography>
          </TableCell>

          <TableCell>
            <Typography
              sx={{
                ...styles.text,
                color: item.late ? "red" : "var(--aquaGreen)",
              }}
            >
              {item.late ? "LATE" : "ON TIME"}
            </Typography>
          </TableCell>
        </TableRow>
      );
    });

    return submissions;
  };
  return <>{data && data.length > 0 && renderSubmission(data)}</>;
};

export default SubmissionTable;
