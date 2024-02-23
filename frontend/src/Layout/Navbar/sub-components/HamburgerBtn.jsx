import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const HamburgerBtn = ({ handleOpenNavMenu }) => {
  return (
    <IconButton
      size="large"
      aria-label="account of current user"
      aria-controls="menu-appbar"
      aria-haspopup="true"
      onClick={handleOpenNavMenu}
      color="inherit"
    >
      <MenuIcon />
    </IconButton>
  );
};

export default HamburgerBtn;
