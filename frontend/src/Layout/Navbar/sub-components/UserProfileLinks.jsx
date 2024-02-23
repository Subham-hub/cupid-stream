import {
  Avatar,
  Box,
  Button,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import { Fragment, useState } from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import Logout from "@mui/icons-material/Logout";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../../shared/store/authSlice";
import { clearData } from "../../../shared/store/userDataSlice";
import { notify, types } from "../../../shared/utils/notification";

const UserProfileLinks = ({
  sendRequest,
  navbarDropDownBG,
  navbarDropDownText,
  primaryIC,
  secondaryIC,
  primaryBtnBG,
  secondaryBtnBG,
}) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((s) => s.auth);
  const { token, username, avatar } = useSelector((s) => s.userData);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMobileMenuOpen = (e) => setMobileMoreAnchorEl(e.currentTarget);
  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const logOuthandler = async () => {
    handleMenuClose();

    try {
      const response = await sendRequest("logout", "GET", null, token);
      if (response.success) {
        dispatch(logout());
        dispatch(clearData());
        navigate("/");
        notify(types.SUCCESS, "Successfully logged out");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      PaperProps={{
        sx: {
          bgcolor: navbarDropDownBG,
          color: navbarDropDownText,
        },
      }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          handleMenuClose();
          setTimeout(() => {
            navigate("/profile");
          }, 5);
        }}
      >
        <ListItemIcon style={{ color: secondaryIC }}>
          <AccountCircleSharpIcon fontSize="small" />
        </ListItemIcon>
        Profile
      </MenuItem>
      <MenuItem onClick={logOuthandler}>
        <ListItemIcon style={{ color: secondaryIC }}>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
        >
          <AccountCircle sx={{ color: primaryIC }} />
        </IconButton>
        <p>{username}</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Fragment>
      {!isLoggedIn && (
        <Fragment>
          <Button
            sx={{ mr: 1 }}
            style={{ backgroundColor: primaryBtnBG }}
            variant="contained"
            onClick={() => navigate("/auth/signup")}
          >
            Signup
          </Button>
          <Button
            style={{ backgroundColor: secondaryBtnBG }}
            variant="contained"
            onClick={() => navigate("/auth/login")}
          >
            Login
          </Button>
        </Fragment>
      )}
      {isLoggedIn && (
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color={"inherit"}
          >
            <Avatar alt={username} src={avatar && avatar.src} />
          </IconButton>
        </Box>
      )}
      {isLoggedIn && (
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MoreIcon sx={{ color: primaryIC }} />
          </IconButton>
        </Box>
      )}
      {renderMobileMenu}
      {renderMenu}
    </Fragment>
  );
};

export default UserProfileLinks;
