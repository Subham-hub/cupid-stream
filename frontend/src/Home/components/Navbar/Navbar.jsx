import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";

import {
  BigScreenLogo,
  BigScreenNavbarLinks,
  Searchbar,
  SmallScreenLogo,
  SmallScreenNavbarLinks,
  ThemeIcon,
} from "./sub-components";

const Navbar = ({ navbarBg, navbarColor }) => {
  return (
    <AppBar
      position="static"
      style={{ backgroundColor: navbarBg, color: navbarColor }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <BigScreenLogo />
          <SmallScreenNavbarLinks />
          <SmallScreenLogo />
          <BigScreenNavbarLinks />
          <Box sx={{ display: "flex" }}>
            <Searchbar />
            <ThemeIcon />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
