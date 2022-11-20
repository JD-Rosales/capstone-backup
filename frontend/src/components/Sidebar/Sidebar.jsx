import "./Sidebar.css";
import { useState } from "react";
import logo2 from "../../assets/logo2.png";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { AiFillControl } from "react-icons/ai";
import { IoMdHand } from "react-icons/io";
import { BiDumbbell } from "react-icons/bi";
import { RiDashboardFill } from "react-icons/ri";
import { MdAssignment } from "react-icons/md";
import { MdPeopleAlt } from "react-icons/md";
import { FaGamepad } from "react-icons/fa";
import { BiText } from "react-icons/bi";
import { RiSettings3Fill } from "react-icons/ri";
import { RiLightbulbFill } from "react-icons/ri";
import { MdManageAccounts } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { resetAll } from "../../features/auth/authSlice";
import { Fade, Modal, Box, Backdrop, Button } from "@mui/material";
import logout_illustration from "../../assets/logout_illustration.png";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  background: "#fff",
  borderRadius: "15px",
  boxShadow: 20,
  outline: "none",
  p: 4,
  pb: 6,
};

const btnStyle = {
  background: "#1d2549",
  width: "100px",
  borderRadius: "8px",
  margin: "0 5px",
  ":hover": {
    background: "#42C9A3",
    color: "white",
  },
};

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleModal = () => {
    setModalOpen(!modalOpen);
  };

  const logout = () => {
    localStorage.clear();
    dispatch(resetAll());
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={logo2} alt="logo"></img>
        <div className="greeting">
          <div className="img-container">
            <div
              className="image"
              style={{ backgroundImage: `url(${user?.userInfo.image})` }}
            ></div>
          </div>
          <div className="name-container">
            <span>
              {user?.userInfo.firstName + " " + user?.userInfo.lastName}{" "}
            </span>
            <span>
              (
              {user?.role === "generaluser"
                ? "Public User"
                : user?.role === "student"
                ? "Student"
                : user?.role === "teacher"
                ? "Teacher"
                : "Admin"}
              )
            </span>
          </div>
        </div>
      </div>

      <div className="list-container">
        {user?.role === "teacher" ? (
          <ul>
            <li>
              <NavLink to="/teacher-dashboard">
                <RiDashboardFill className="icon" /> <span>Dashboard</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/enrolled-students">
                <MdPeopleAlt className="icon" /> <span>My Students</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/teacher/assignments">
                <MdAssignment className="icon" /> <span>Assignments</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/play-game">
                <FaGamepad className="icon" /> <span>Play a Game</span>
              </NavLink>
            </li>
          </ul>
        ) : user?.role === "student" ? (
          <ul>
            <li>
              <NavLink to="/dashboard">
                <RiDashboardFill className="icon" /> <span>Dashboard</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/asl-translator">
                <IoMdHand className="icon" /> <span>ASL to Character</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/text-to-asl">
                <BiText className="icon" /> <span>Text to ASL</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/student-assignments">
                <MdAssignment className="icon" /> <span>Assignments</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/play-game">
                <FaGamepad className="icon" /> <span>Play a Game</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/practice">
                <BiDumbbell className="icon" /> <span>Practice</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/learn">
                <RiLightbulbFill className="icon" /> <span>Learn ASL</span>
              </NavLink>
            </li>
          </ul>
        ) : user?.role === "admin" ? (
          <ul>
            <li>
              <NavLink to="/manage-games">
                <AiFillControl className="icon" /> <span>Manage Games</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/account-activation">
                <MdManageAccounts className="icon" />{" "}
                <span>Account Activation</span>
              </NavLink>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <NavLink to="/dashboard">
                <RiDashboardFill className="icon" /> <span>Dashboard</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/asl-translator">
                <IoMdHand className="icon" /> <span>ASL to Character</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/text-to-asl">
                <BiText className="icon" /> <span>Text to ASL</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/play-game">
                <FaGamepad className="icon" /> <span>Play a Game!</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/practice">
                <BiDumbbell className="icon" /> <span>Practice</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/learn">
                <RiLightbulbFill className="icon" /> <span>Learn ASL</span>
              </NavLink>
            </li>
          </ul>
        )}
      </div>

      <div className="bottom-list">
        <ul>
          <li>
            <Link
              to="#"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={isMenuOpen ? "active-menu" : ""}
            >
              <RiSettings3Fill className="icon" />
              <span>Settings</span>
            </Link>
          </li>

          {isMenuOpen ? (
            <div className="menu-container">
              <ul>
                <li>
                  <NavLink to="/update-profile">
                    <span>Edit Profile</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/change-password">
                    <span>Change password</span>
                  </NavLink>
                </li>

                {user.role !== "admin" ? ( //removes choose hand in settings menu if role is admin
                  <li>
                    <NavLink to="/choose-hand">
                      <span>Choose hand</span>
                    </NavLink>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </div>
          ) : (
            ""
          )}

          <li>
            <Link to="#" onClick={handleModal}>
              <RiLogoutBoxRFill className="icon" />
              <span>Sign out</span>
            </Link>
          </li>
        </ul>
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalOpen}
        onClose={handleModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <Box sx={modalStyle}>
            <div className="modal-container">
              <span
                onClick={() => {
                  handleModal();
                }}
                className="x-close"
              >
                X
              </span>
              <img
                className="image"
                src={logout_illustration}
                alt="Logout Illustration"
              />

              <h2>Are you sure you want to logout your account?</h2>

              <div className="action-container">
                <Button
                  onClick={() => {
                    handleModal();
                  }}
                  variant="contained"
                  sx={btnStyle}
                >
                  No
                </Button>
                <Button
                  onClick={() => {
                    logout();
                  }}
                  variant="contained"
                  sx={btnStyle}
                >
                  Yes
                </Button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default Sidebar;
