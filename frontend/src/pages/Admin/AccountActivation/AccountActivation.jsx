import "./AccountActivation.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import manageRequestIllustration from "../../../assets/manageRequest.png";
import noDataAvailable_illustration from "../../../assets/noDataAvailable_illustration.png";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUnactivated,
  updateAccountStatus,
  reset,
} from "../../../features/teacher/teacherSlice";
import {
  deleteAccount,
  reset as authReset,
} from "../../../features/auth/authSlice";
import {
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  Pagination,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { toast } from "react-toastify";

const textStyle = {
  color: "#000",
};

const AccountActivation = () => {
  const dispatch = useDispatch();

  const toastID = useRef(null);
  const notify = () =>
    (toastID.current = toast.loading("Activating Account...", {
      autoClose: false,
      position: "top-right",
    }));

  const toastID2 = useRef(null);
  const notify2 = () =>
    (toastID2.current = toast.loading("Deleting Teacher Account...", {
      autoClose: false,
      position: "top-right",
    }));

  // state from teacherSlice
  const { data, isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.teacher
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      setTableData(data.teachers);
      toast.update(toastID.current, {
        render: "Success",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
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
  }, [data, isSuccess, isError, isLoading, message]);

  // state from authSlice
  const {
    user: auth,
    token,
    isSuccess: authSuccess,
    isError: authError,
    isLoading: authLoading,
    message: authMessage,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    if (authSuccess) {
      const params = {
        token,
      };
      dispatch(getUnactivated(params));
      dispatch(authReset());
      toast.update(toastID2.current, {
        render: "Success",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    }

    if (authError) {
      dispatch(authReset());
      toast.update(toastID2.current, {
        render: authMessage,
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }

    // eslint-disable-next-line
  }, [auth, authSuccess, authError, authLoading, authMessage]);

  const [selectedID, setSelectedID] = useState(null);

  // State for Table
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [pageCount, setPageCount] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    if (tableData.length > 0) {
      const count = tableData.length / rowsPerPage;

      setPageCount(Math.ceil(count));
    }
    // eslint-disable-next-line
  }, [tableData]);

  // State for Table

  // State for Menu
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const updateStatus = () => {
    const params = {
      id: selectedID,
      token: token,
    };
    notify();
    dispatch(updateAccountStatus(params));
  };

  const deleteTeacherAccount = () => {
    notify2();
    dispatch(deleteAccount(selectedID));
  };

  useEffect(() => {
    const params = {
      token,
    };
    dispatch(getUnactivated(params));
    // eslint-disable-next-line
  }, []);

  return (
    <div className="account-activation">
      <Sidebar />

      <header>
        <div className="header-text">
          <h1>
            Account <span>Activation</span>
          </h1>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget
            metus eu dui ornare laoreet vitae ac nibh. Donec porttitor orci sit
            amet aliquet rutrum. Nunc quis massa a nunc finibus metus eu dui
            ornare laoreet vitae ac nibh. Donec porttitor orci sit amet aliquet
            rutrum.
          </p>
        </div>
        <div className="header-img">
          <img src={manageRequestIllustration} alt="Illustration" />
        </div>
      </header>

      <main>
        <TableContainer
          sx={{
            marginTop: 2,
            height: 410,
            overflow: "hidden",
            backgroundColor: "#fff",
          }}
        >
          <Table>
            <TableHead
              sx={{
                backgroundColor: "var(--aquaGreen)",
              }}
            >
              <TableRow>
                <TableCell>
                  <Typography
                    sx={{
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    Email
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography
                    sx={{
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    School
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography
                    sx={{
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    Full Name
                  </Typography>
                </TableCell>

                <TableCell align="center">
                  <Typography
                    sx={{
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    Action
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "40px",
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
                tableData
                  .slice(
                    (page - 1) * rowsPerPage,
                    (page - 1) * rowsPerPage + rowsPerPage
                  )
                  .map((data) => {
                    return (
                      <TableRow key={data._id}>
                        <TableCell
                          sx={{
                            padding: "0 0 0 5",
                            width: "30%",
                          }}
                        >
                          <Typography sx={textStyle}>{data.email}</Typography>
                        </TableCell>

                        <TableCell
                          sx={{
                            padding: "0 0 0 5",
                            width: "30%",
                          }}
                        >
                          <Typography sx={textStyle}>
                            {data.userInfo.school}
                          </Typography>
                        </TableCell>

                        <TableCell
                          sx={{
                            padding: "0 0 0 5",
                            width: "30%",
                          }}
                        >
                          <Typography sx={textStyle}>
                            {data.userInfo.lastName + " "}
                            {data.userInfo.firstName + " "}
                            {data.userInfo.middleInitial}
                          </Typography>
                        </TableCell>

                        <TableCell align="center" sx={{ padding: 1 }}>
                          <IconButton
                            id="admin-menu-btn"
                            aria-controls={menuOpen ? "admin-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={menuOpen ? "true" : undefined}
                            onClick={(e) => {
                              setSelectedID(data._id);
                              handleMenu(e);
                            }}
                            sx={{
                              color: "#000",
                              transition: "0.3s",
                              "&:hover": {
                                backgroundColor: "var(--aquaGreen)",
                              },
                            }}
                          >
                            <MenuIcon />
                          </IconButton>
                          <Menu
                            id="admin-menu"
                            anchorEl={anchorEl}
                            open={menuOpen}
                            onClose={handleMenuClose}
                            MenuListProps={{
                              "aria-labelledby": "admin-menu-btn",
                            }}
                            anchorOrigin={{
                              vertical: "center",
                              horizontal: "center",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                            sx={{
                              backgroundColor: "rgba(0, 0, 0, 0.1)",
                              backdropFilter: "blur(2px)",
                              ".MuiMenu-paper": {
                                backgroundColor: "var(--aquaGreen)",
                                color: "#000",
                              },
                            }}
                          >
                            <MenuItem
                              divider={true}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                paddingX: 5,
                                color: "green",
                              }}
                              onClick={() => {
                                handleMenuClose();
                                updateStatus();
                              }}
                            >
                              Activate
                            </MenuItem>
                            <MenuItem
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                paddingX: 5,
                                color: "red",
                              }}
                              onClick={() => {
                                handleMenuClose();
                                deleteTeacherAccount();
                              }}
                            >
                              Remove
                            </MenuItem>
                          </Menu>
                        </TableCell>
                      </TableRow>
                    );
                  })
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell sx={{ border: "0" }}>
                  <Pagination
                    size="large"
                    count={pageCount}
                    page={page}
                    onChange={handleChangePage}
                    boundaryCount={1}
                    siblingCount={2}
                    color="primary"
                    sx={{
                      ".MuiPaginationItem-text": {
                        color: "#000",
                      },
                      ".css-bf9wz-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected":
                        {
                          backgroundColor: "var(--aquaGreen)",
                        },
                    }}
                  />
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </main>
    </div>
  );
};

export default AccountActivation;
