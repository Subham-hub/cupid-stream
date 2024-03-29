import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import ThemeIconDropdown from "./ThemeIconDropdown";
import { socket } from "../../../main";
import { uiThemeInitializer } from "../../../shared/utils/ui-theme-initializer";
import {
  switchToDark,
  switchToLight,
  switchToPink,
} from "../../../shared/store/themeSlice";

const ThemeIcon = () => {
  const initialTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(uiThemeInitializer(initialTheme));
  const [anchorEl, setAnchorEl] = useState(null);
  const { uid } = useSelector((s) => s.userData);
  const dispatch = useDispatch();

  const open = Boolean(anchorEl);
  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  useEffect(() => {
    if (initialTheme !== "light" && theme.current[1] === "light") {
      dispatch(switchToLight());
      if (uid !== "") socket.emit("change_theme", { uid, newTheme: "light" });
    }
    if (theme.current[1] === "dark") {
      dispatch(switchToDark());
      if (uid !== "") socket.emit("change_theme", { uid, newTheme: "dark" });
    }
    if (theme.current[1] === "pink") {
      dispatch(switchToPink());
      if (uid !== "") socket.emit("change_theme", { uid, newTheme: "pink" });
    }
  }, [dispatch, theme, uid, initialTheme]);

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {theme.current[0]}
      </Button>
      <ThemeIconDropdown
        anchorEl={anchorEl}
        handleClose={handleClose}
        open={open}
        theme={theme}
        setTheme={setTheme}
      />
    </>
  );
};

export default ThemeIcon;
