import { useState } from "react";
import { Fade, Modal, Box, Backdrop, Typography } from "@mui/material";
import AssignmentTab from "../Tabs/AssignmentTab";

const styles = {
  modalStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 750,
    background: "#fff",
    color: "var(--navyBlue)",
    borderRadius: "15px",
    boxShadow: 20,
    outline: "none",
    p: 4,
    pb: 2,
  },
};

const AssignmentModal = ({ modalData, handleModalData }) => {
  const [open, setOpen] = useState(true);

  const closeModal = () => {
    setOpen(false);
    handleModalData(null);
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={closeModal}
        closeAfterTransition={true}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={styles.modalStyle}>
            <h2>
              CLASS<span style={{ color: "var(--aquaGreen)" }}>WORK</span>
            </h2>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 800,
                fontSize: "1.3rem",
                textAlign: "center",
              }}
            >
              {modalData.title}
            </Typography>

            <AssignmentTab
              assignmentID={modalData._id}
              title={modalData.title}
              description={modalData.description}
              deadline={modalData.deadline}
              words={modalData.words}
              closeModal={closeModal}
            />
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default AssignmentModal;
