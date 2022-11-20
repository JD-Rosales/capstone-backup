import "./FourPic.css";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import RightNav from "../../../../components/RightNav/RightNav";
import { useState, useEffect, useRef } from "react";
import {
  Grid,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
  Fade,
  Modal,
  Box,
  Backdrop,
  Button,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  reset,
  addGameWord,
  getGameWord,
  deleteGameWord,
  updateGameWord,
} from "../../../../features/gameWord/gameWordSlice";
import { toast } from "react-toastify";
import noDataAvailable_illustration from "../../../../assets/noDataAvailable_illustration.png";

const styles = {
  button: {
    backgroundColor: "var(--aquaGreen)",
    borderRadius: "8px",
  },
  textfieldStyle: {
    mt: 2,
    color: "#fff",
    "& .MuiFormLabel-root": {
      color: "#fff",
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "#fff",
    },
    "& .MuiOutlinedInput-root": {
      "& > fieldset": { borderColor: "var(--aquaGreen)" },
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
  modalTextfieldStyle: {
    mt: 2,
    color: "#000",
    "& .MuiFormLabel-root": {
      color: "#000",
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "#000",
    },
    "& .MuiOutlinedInput-root": {
      "& > fieldset": { borderColor: "var(--aquaGreen)" },
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
  optionStyle: {
    mt: 2,
    color: "#fff",
    height: "50px",
    ".MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--aquaGreen)",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--aquaGreen)",
    },
    ".MuiSvgIcon-root ": {
      fill: "white !important",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--aquaGreen)",
    },
  },
  modalOptionStyle: {
    mt: 2,
    mb: 3,
    color: "#000",
    height: "50px",
    ".MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--aquaGreen)",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--aquaGreen)",
    },
    ".MuiSvgIcon-root ": {
      fill: "black !important",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--aquaGreen)",
    },
  },
  loadingButtonStyle: {
    background: "#42C9A3",
    height: "50px",
    borderRadius: "5px",
    mt: 2,
  },
  paperStyle: {
    backgroundColor: "var(--navyBlue)",
    height: "500px",
    mt: 3,
  },
  tableCellStyle: {
    color: "#fff",
    borderColor: "rgb(255, 255, 255, 0.2)",
  },
  deleteModalStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    background: "#fff",
    borderRadius: "15px",
    boxShadow: 20,
    outline: "none",
    p: 4,
    color: "#000",
  },
  updateModalStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    background: "#fff",
    borderRadius: "15px",
    boxShadow: 20,
    outline: "none",
    p: 4,
    color: "#000",
  },
  deleteBtnStyle: {
    background: "#1d2549",
    width: "45%",
    borderRadius: "8px",
    margin: "0 2.5%",
    ":hover": {
      background: "#42C9A3",
      color: "white",
    },
  },
  updateBtnStyle: {
    background: "#1d2549",
    height: "45px",
    width: "45%",
    borderRadius: "8px",
    margin: "0 2.5%",
    ":hover": {
      background: "#42C9A3",
      color: "white",
    },
  },
};
const ManageFingerspell = () => {
  const dispatch = useDispatch();
  const { data, isError, isSuccess, message } = useSelector(
    (state) => state.gameWord
  );
  const inputFile = useRef(null);
  const [selectedImage, setSelectedImage] = useState("");

  const chooseFile = () => {
    inputFile.current.click();
  };

  const previewImage = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.onerror = () => {
        toast.error("An error has occured!");
      };
    }
  };

  const gameType = "fourpiconeword";
  const [selectedID, setSelectedID] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const [addFormData, setAddFormData] = useState({
    word: "",
    difficulty: "EASY",
  });

  const [updateFormData, setUpdateFormData] = useState({
    word: "",
    difficulty: "EASY",
  });

  const toastID = useRef(null);

  const notify = () =>
    (toastID.current = toast.loading("Adding data...", {
      autoClose: 15000,
      position: "top-right",
    }));

  const notify2 = () =>
    (toastID.current = toast.loading("Deleting data...", {
      autoClose: 15000,
      position: "top-right",
    }));

  const notify3 = () =>
    (toastID.current = toast.loading("Updating data...", {
      autoClose: 15000,
      position: "top-right",
    }));

  // modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const handleDeleteModal = () => {
    setDeleteModalOpen(!deleteModalOpen);
  };

  const handleUpdateModal = () => {
    setUpdateModalOpen(!updateModalOpen);
  };

  const submitGameWord = (e) => {
    e.preventDefault();

    if (
      !addFormData.word ||
      addFormData.word === "" ||
      !selectedImage ||
      selectedImage === ""
    ) {
      toast.warning("Please input all fields");
    } else {
      const params = {
        word: addFormData.word,
        difficulty: addFormData.difficulty,
        gameType: gameType,
        image: !selectedImage || selectedImage === "" ? null : selectedImage,
        token: token,
      };

      notify();
      dispatch(addGameWord(params));
    }
  };

  useEffect(() => {
    const params = {
      token: token,
      gameType: gameType,
    };
    dispatch(getGameWord(params));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setAddFormData({ ...addFormData, word: "" });
      setSelectedImage("");
      toast.update(toastID.current, {
        render: "Success",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      dispatch(reset());
    }

    if (isError) {
      toast.update(toastID.current, {
        render: message,
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
      dispatch(reset());
    }
    // eslint-disable-next-line
  }, [data, isSuccess, isError, message]);
  return (
    <div className="manage-four-pic">
      <Sidebar />

      <main>
        <FormControl fullWidth>
          <Grid container spacing={4} fullwidth="true">
            <Grid item={true} xs={6}>
              <div className="profile-container">
                <div className="img-container">
                  {!selectedImage ? (
                    <div
                      onClick={chooseFile}
                      className="img"
                      style={{
                        backgroundImage: `url()`,
                      }}
                    ></div>
                  ) : (
                    <div
                      onClick={chooseFile}
                      className="img"
                      style={{ backgroundImage: `url(${selectedImage})` }}
                    ></div>
                  )}
                </div>

                <span onClick={chooseFile} className="select-image">
                  Choose Image
                </span>
                <input
                  type="file"
                  ref={inputFile}
                  style={{ display: "none" }}
                  accept="image/x-png,image/gif,image/jpeg"
                  onChange={previewImage}
                />
              </div>
            </Grid>

            <Grid container spacing={1} item={true} xs={6}>
              {/* <Grid item={true} xs={8}> */}
              <TextField
                label="Input a word"
                type="text"
                fullWidth
                sx={{ ...styles.textfieldStyle, mt: 3 }}
                InputProps={{ sx: { height: 50, color: "#fff" } }}
                value={addFormData.word}
                onChange={(e) => {
                  setAddFormData({
                    ...addFormData,
                    word: e.target.value,
                  });
                }}
              />

              <Select
                fullWidth
                displayEmpty
                sx={styles.optionStyle}
                value={addFormData.difficulty}
                onChange={(e) => {
                  setAddFormData({
                    ...addFormData,
                    difficulty: e.target.value,
                  });
                }}
              >
                <MenuItem value="EASY">EASY</MenuItem>
                <MenuItem value="MEDIUM">MEDIUM</MenuItem>
                <MenuItem value="HARD">HARD</MenuItem>
              </Select>

              <LoadingButton
                onClick={submitGameWord}
                // loading={isLoading}
                loadingIndicator={
                  <CircularProgress size="2em" sx={{ color: "#182240" }} />
                }
                variant="contained"
                fullWidth
                sx={styles.loadingButtonStyle}
              >
                Add
              </LoadingButton>
              {/* </Grid> */}

              {/* <Grid item={true} xs={4}>
                <LoadingButton
                  onClick={submitGameWord}
                  // loading={isLoading}
                  loadingIndicator={
                    <CircularProgress size="2em" sx={{ color: "#182240" }} />
                  }
                  variant="contained"
                  fullWidth
                  sx={styles.loadingButtonStyle}
                >
                  Add
                </LoadingButton>
              </Grid> */}
            </Grid>
            {/* <Grid item={true} xs={5}>
            <TextField
              label="Input a word"
              type="text"
              fullWidth
              sx={styles.textfieldStyle}
              InputProps={{ sx: { height: 50, color: "#fff" } }}
              value={addFormData.word}
              onChange={(e) => {
                setAddFormData({
                  ...addFormData,
                  word: e.target.value,
                });
              }}
            />
          </Grid>

          <Grid item={true} xs={4}>
            <Select
              fullWidth
              displayEmpty
              sx={styles.optionStyle}
              value={addFormData.difficulty}
              onChange={(e) => {
                setAddFormData({ ...addFormData, difficulty: e.target.value });
              }}
            >
              <MenuItem value="EASY">EASY</MenuItem>
              <MenuItem value="MEDIUM">MEDIUM</MenuItem>
              <MenuItem value="HARD">HARD</MenuItem>
            </Select>
          </Grid>

          <Grid item={true} xs={3}>
            <LoadingButton
              onClick={submitGameWord}
              // loading={isLoading}
              loadingIndicator={
                <CircularProgress size="2em" sx={{ color: "#182240" }} />
              }
              variant="contained"
              fullWidth
              sx={styles.loadingButtonStyle}
            >
              Add
            </LoadingButton>
          </Grid> */}
          </Grid>

          <Paper fullwidth="true" sx={styles.paperStyle}>
            <TableContainer
              sx={{
                maxHeight: "500px",
              }}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        backgroundColor: "var(--navyBlue)",
                        color: "#fff",
                        width: "45%",
                      }}
                    >
                      Words
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "var(--navyBlue)",
                        color: "#fff",
                      }}
                    >
                      Difficulty
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        backgroundColor: "var(--navyBlue)",
                        color: "#fff",
                      }}
                    ></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!data || data.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} sx={{ border: 0 }}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: "90px",
                          }}
                        >
                          <Typography
                            variant="h4"
                            sx={{ color: "var(--aquaGreen)", margin: "10px 0" }}
                          >
                            No Data Available
                          </Typography>

                          <img
                            height="150px"
                            src={noDataAvailable_illustration}
                            alt="No Data Available"
                          />
                        </Box>
                      </TableCell>
                    </TableRow>
                  ) : (
                    data.map((item) => {
                      return (
                        <TableRow key={item._id}>
                          <TableCell sx={styles.tableCellStyle}>
                            {item.word}
                          </TableCell>
                          <TableCell sx={styles.tableCellStyle}>
                            {item.difficulty}
                          </TableCell>
                          <TableCell align="right" sx={styles.tableCellStyle}>
                            <IconButton
                              onClick={() => {
                                setSelectedID(item._id);
                                handleDeleteModal();
                              }}
                              aria-label="delete"
                            >
                              <Tooltip
                                transitioncomponent={Fade}
                                transitiontrops={{ timeout: 500 }}
                                title="Delete"
                                arrow
                              >
                                <DeleteIcon color="error" />
                              </Tooltip>
                            </IconButton>

                            <IconButton
                              onClick={() => {
                                setSelectedID(item._id);
                                handleUpdateModal();
                              }}
                              aria-label="update"
                            >
                              <Tooltip
                                onClick={() => {
                                  setSelectedID(item._id);
                                  setUpdateFormData({
                                    word: item.word,
                                    difficulty: item.difficulty,
                                  });
                                }}
                                transitioncomponent={Fade}
                                transitiontrops={{ timeout: 500 }}
                                title="Update"
                                arrow
                              >
                                <EditIcon sx={{ color: "var(--aquaGreen)" }} />
                              </Tooltip>
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </FormControl>
      </main>

      {/* Delete Modal */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={deleteModalOpen}
        onClose={handleDeleteModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={deleteModalOpen}>
          <Box sx={styles.deleteModalStyle}>
            <h2>Delete</h2>

            <Typography sx={{ lineHeight: "1rem", mb: 3, fontSize: ".9rem" }}>
              Are you sure you want to remove this word?
            </Typography>

            <Button
              onClick={() => {
                handleDeleteModal();
              }}
              variant="contained"
              sx={styles.deleteBtnStyle}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                const params = {
                  id: selectedID,
                  token: token,
                };
                notify2();
                dispatch(deleteGameWord(params));
                handleDeleteModal();
              }}
              variant="contained"
              sx={{
                ...styles.deleteBtnStyle,
                background: "red",
                color: "white",
              }}
            >
              Yes
            </Button>
          </Box>
        </Fade>
      </Modal>
      {/* End Delete Modal */}

      {/* Update Modal */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={updateModalOpen}
        onClose={handleUpdateModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={updateModalOpen}>
          <Box sx={styles.updateModalStyle}>
            <h2>
              Ed<span style={{ color: "var(--aquaGreen)" }}>i</span>t
            </h2>

            <Typography sx={{ lineHeight: "1rem", fontSize: ".9rem" }}>
              Click the input field to edit the word.
            </Typography>

            <Typography sx={{ lineHeight: "1rem", fontSize: ".9rem", mb: 2 }}>
              To change the difficulty, clilck the dropdown menu.
            </Typography>

            <TextField
              label="Input a word"
              type="text"
              fullWidth
              sx={styles.modalTextfieldStyle}
              InputProps={{ sx: { height: 50, color: "#000" } }}
              value={updateFormData.word}
              onChange={(e) => {
                setUpdateFormData({
                  ...updateFormData,
                  word: e.target.value,
                });
              }}
            />

            <Select
              fullWidth
              displayEmpty
              sx={styles.modalOptionStyle}
              value={updateFormData.difficulty}
              onChange={(e) => {
                setUpdateFormData({
                  ...updateFormData,
                  difficulty: e.target.value,
                });
              }}
            >
              <MenuItem value="EASY">EASY</MenuItem>
              <MenuItem value="MEDIUM">MEDIUM</MenuItem>
              <MenuItem value="HARD">HARD</MenuItem>
            </Select>

            <Button
              onClick={() => {
                handleUpdateModal();
              }}
              variant="contained"
              sx={styles.updateBtnStyle}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                const params = {
                  word: updateFormData.word,
                  difficulty: updateFormData.difficulty,
                  gameType: gameType,
                  id: selectedID,
                  token: token,
                };
                notify3();
                dispatch(updateGameWord(params));
                setUpdateModalOpen(false);
              }}
              variant="contained"
              sx={{
                ...styles.updateBtnStyle,
                background: "#4681f4",
                color: "white",
              }}
            >
              Update
            </Button>
          </Box>
        </Fade>
      </Modal>
      {/* End Update Modal */}

      <RightNav
        header="MANAGE"
        coloredText="4 PIC 1 WORD"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget metus eu dui ornare laoreet vitae ac nibh. Donec porttitor orci sit amet aliquet rutrum. Nunc quis massa a nunc finibus sollicitudin mollis eu nunc. Nullam lorem diam, fringilla pellentesque sodales ac, aliquam at ex. Nam vitae placerat risus, a ultricies ex. Nulla sagittis ut urna ac viverra. Vestibulum condimentum, leo placerat blandit consectetur, magna nisi porta lorem, a sagittis ex justo nec felis."
      />
    </div>
  );
};

export default ManageFingerspell;
