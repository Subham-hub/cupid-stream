import Typography from "@mui/material/Typography";
import MuiModal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const Modal = ({
  open,
  handleClose,
  modalText,
  modalDescription,
  children,
  bgcolor = "black",
  color = "white",
  border,
  borderRadius,
  width = 400,
  height,
  opacity,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width,
    color,
    bgcolor,
    borderRadius,
    boxShadow: 24,
    p: 4,
    opacity,
    border,
    height,
    outline: "none",
  };
  return (
    <MuiModal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {modalText && (
          <Typography color="black" variant="h5" component="h2">
            {modalText}
          </Typography>
        )}
        {modalDescription && (
          <Typography sx={{ mt: 2 }}>{modalDescription}</Typography>
        )}{" "}
        {children}
      </Box>
    </MuiModal>
  );
};

export default Modal;
