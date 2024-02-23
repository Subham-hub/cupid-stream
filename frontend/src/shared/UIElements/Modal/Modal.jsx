import MuiModal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Close } from "@mui/icons-material";
import { useSelector } from "react-redux";

import classes from "./Modal.module.css";
const Modal = ({
  open,
  handleClose,
  children,
  color,
  bgcolor,
  // bgcolor = "#333",
  // color = "#fff",
  border,
  borderRadius = 8,
  width = "fit-content",
  height,
  opacity,
  minWidth,
  minHeight,
  closeIcon,
  disableCloseIcon,
}) => {
  const { theme } = useSelector((s) => s.themeSlice);
  const isDarkMode = theme === "dark";
  const isLightMode = theme === "light";

  const modalColorScheme = color
    ? color
    : isDarkMode
    ? "#fff"
    : isLightMode
    ? "black"
    : "black";

  const modalBgColorScheme = bgcolor
    ? bgcolor
    : isDarkMode
    ? "#333"
    : isLightMode
    ? "#EBCDC3"
    : "pink";

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width,
    color: modalColorScheme,
    bgcolor: modalBgColorScheme,
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
      <Box sx={style} minWidth={minWidth} minHeight={minHeight}>
        {closeIcon && (
          <div
            style={{ pointerEvents: disableCloseIcon ? "none" : "initial" }}
            className={classes.cross}
            onClick={handleClose}
          >
            <Close />
          </div>
        )}
        {children}
      </Box>
    </MuiModal>
  );
};

export default Modal;
