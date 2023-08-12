import { Menu, MenuItem } from "@mui/material";

const ThemeIconDropdown = ({
  anchorEl,
  handleClose,
  open,
  theme,
  setTheme,
}) => {
  const handleThemeChange1 = () => {
    setTheme((prevVal) => {
      return {
        current: theme.second,
        second: prevVal.current,
        third: prevVal.third,
      };
    });
    handleClose();
  };

  const handleThemeChange2 = () => {
    setTheme((prevVal) => {
      return {
        current: theme.third,
        second: prevVal.second,
        third: prevVal.current,
      };
    });
    handleClose();
  };

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      <MenuItem
        style={{
          background:
            theme.current[1] === "light"
              ? "white"
              : theme.current[1] === "dark"
              ? "#acc8d7"
              : "pink",
        }}
        onClick={handleThemeChange1}
      >
        {theme.second}
      </MenuItem>
      <MenuItem
        style={{
          background:
            theme.current[1] === "light"
              ? "white"
              : theme.current[1] === "dark"
              ? "#acc8d7"
              : "pink",
        }}
        onClick={handleThemeChange2}
      >
        {theme.third}
      </MenuItem>
    </Menu>
  );
};

export default ThemeIconDropdown;
