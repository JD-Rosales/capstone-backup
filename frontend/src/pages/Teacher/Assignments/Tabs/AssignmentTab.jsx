import {
  Box,
  Tab,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Grid,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateAssignment,
  deleteAssignment,
  reset,
} from "../../../../features/assignment/assignmentSlice";
import moment from "moment";
import { CircularProgress } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SubmissionTable from "./SubmissionTable";
import { toast } from "react-toastify";

const styles = {
  text: {
    fontSize: ".85rem",
    lineHeight: "1rem",
  },
  textfieldStyle: {
    mt: 2,
    color: "#F0F0F0",
    "& .MuiFormLabel-root": {
      color: "var(--navyBlue)",
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "var(--navyBlue)",
    },
    "& .MuiOutlinedInput-root": {
      "& > fieldset": { borderColor: "var(--navyBlue)" },
    },
    "& .MuiOutlinedInput-root.Mui-focused": {
      "& > fieldset": { borderColor: "var(--navyBlue)" },
    },
    "& .MuiOutlinedInput-root:hover": {
      "& > fieldset": {
        borderColor: "var(--aquaGreen)",
      },
    },
  },
  loadingButtonStyle: {
    background: "#42C9A3",
    height: 45,
    borderRadius: "5px",
    width: "175px",
    mt: 1,
  },
};

const AssignmentTab = ({
  assignmentID,
  title,
  description,
  deadline,
  words,
  closeModal,
}) => {
  const dispatch = useDispatch();
  const { data, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.assignment
  );

  const [assignmentData, setAssignmentData] = useState({
    title: title,
    description: description,
  });

  const { token } = useSelector((state) => state.auth);
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toastID = useRef(null);
  const toastID2 = useRef(null);

  const notify = () =>
    (toastID.current = toast.loading("Updating...", {
      autoClose: 15000,
      position: "top-right",
    }));

  const notify2 = () =>
    (toastID2.current = toast.loading("Deleting...", {
      autoClose: 15000,
      position: "top-right",
    }));

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      toast.update(toastID.current, {
        render: "Success!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      toast.update(toastID2.current, {
        render: "Success!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      closeModal();
    }

    if (isError) {
      dispatch(reset());
      toast.update(toastID.current, {
        render: message,
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });

      toast.update(toastID2.current, {
        render: message,
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
    // eslint-disable-next-line
  }, [data, isSuccess, isError, isLoading, message]);

  return (
    <>
      <Box sx={{ width: "100%", typography: "body1", mt: 1 }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Submissions" value={"1"} />
              <Tab label="Manage" value={"2"} />
            </TabList>
          </Box>
          <TabPanel value={"1"}>
            {/* Table */}
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Score</TableCell>
                    <TableCell>Time Left</TableCell>
                    <TableCell>Submission Date</TableCell>
                    <TableCell>Remarks</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <SubmissionTable assignmentID={assignmentID} />
                </TableBody>
              </Table>
            </TableContainer>
            {/* End Table */}
          </TabPanel>
          <TabPanel value={"2"}>
            <Grid container spacing={2}>
              <Grid item={true} xs={7}>
                <TextField
                  label="Title"
                  type="text"
                  name="title"
                  fullWidth
                  sx={styles.textfieldStyle}
                  InputProps={{ sx: { height: 50 } }}
                  value={assignmentData?.title}
                  onChange={(e) => {
                    setAssignmentData({
                      ...assignmentData,
                      title: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item={true} xs={5}>
                <Typography sx={{ mt: 2 }}>Deadline:</Typography>
                <Typography>
                  {moment(deadline).format("LL")}{" "}
                  {moment(deadline).format("h:mma")}
                </Typography>
              </Grid>

              <Grid item={true} xs={7}>
                <TextField
                  label="Description"
                  type="text"
                  name="description"
                  fullWidth
                  multiline
                  rows={5}
                  sx={styles.textfieldStyle}
                  InputProps={{ sx: { height: "auto" } }}
                  value={assignmentData.description}
                  onChange={(e) => {
                    setAssignmentData({
                      ...assignmentData,
                      description: e.target.value,
                    });
                  }}
                />
              </Grid>

              <Grid item={true} xs={5}>
                <Typography sx={{ mt: 2 }}>Characters to Perform:</Typography>
                <Typography sx={{ fontSize: "1.5rem" }}>
                  {words.map((word, index) => {
                    if (index === words.length - 1) {
                      return word;
                    } else {
                      return word + ", ";
                    }
                  })}
                </Typography>
              </Grid>

              <Grid item={true} xs={12}>
                <LoadingButton
                  onClick={() => {
                    const params = {
                      id: assignmentID,
                      title: assignmentData.title,
                      description: assignmentData.description,
                      token: token,
                    };
                    notify();
                    dispatch(updateAssignment(params));
                  }}
                  loading={isLoading}
                  loadingIndicator={
                    <CircularProgress size="2em" sx={{ color: "#182240" }} />
                  }
                  variant="contained"
                  fullWidth
                  sx={styles.loadingButtonStyle}
                >
                  UPDATE
                </LoadingButton>

                <LoadingButton
                  onClick={() => {
                    const params = {
                      id: assignmentID,
                      token: token,
                    };
                    notify2();
                    dispatch(deleteAssignment(params));
                  }}
                  loadingIndicator={
                    <CircularProgress size="2em" sx={{ color: "#182240" }} />
                  }
                  variant="contained"
                  fullWidth
                  sx={{
                    ...styles.loadingButtonStyle,
                    background: "#df5c61",
                    ml: 2,
                  }}
                >
                  DELETE
                </LoadingButton>
              </Grid>
            </Grid>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default AssignmentTab;
