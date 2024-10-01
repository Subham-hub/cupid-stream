import { useState } from "react";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import HamburgerBtn from "./HamburgerBtn";
import { useSelector } from "react-redux";

export const SmallScreenNavbarLinks = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((s) => s.auth);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const handleOpenNavMenu = (e) => setAnchorElNav(e.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  return (
    isLoggedIn && (
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <HamburgerBtn handleOpenNavMenu={handleOpenNavMenu} />
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          <MenuItem
            onClick={() => {
              handleCloseNavMenu();
              navigate("/watchlist");
            }}
          >
            <Typography textAlign="center">Watchlist</Typography>
          </MenuItem>
        </Menu>
      </Box>
    )
  );
};

export const BigScreenNavbarLinks = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((s) => s.auth);
  const { pathname } = useLocation();

  return (
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
      {isLoggedIn && (
        <>
          <Button
            onClick={() => navigate("/")}
            sx={{
              my: 2,
              color: "white",
              display: "block",
              borderBottom: pathname === "/" ? "2px solid #3498db" : "none",
            }}
          >
            Home
          </Button>
          <Button
            onClick={() => navigate("/watchlist")}
            sx={{
              my: 2,
              color: "white",
              display: "block",
              borderBottom:
                pathname === "/watchlist" ? "2px solid #3498db" : "none",
            }}
          >
            Watchlist
          </Button>
        </>
      )}
    </Box>
  );
};
