import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";

import {
  BigScreenLogo,
  BigScreenNavbarLinks,
  SmallScreenLogo,
  SmallScreenNavbarLinks,
  ThemeIcon,
} from "./sub-components";
import UserProfileLinks from "./sub-components/UserProfileLinks";

const Navbar = ({
  navbarBG,
  primaryText,
  sendRequest,
  navbarDropDownBG,
  navbarDropDownText,
  secondaryIC,
  primaryIC,
  primaryBtnBG,
  secondaryBtnBG,
}) => {
  return (
    <AppBar
      position="static"
      style={{ backgroundColor: navbarBG, color: primaryText }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <BigScreenLogo />
          <SmallScreenNavbarLinks />
          <SmallScreenLogo />
          <BigScreenNavbarLinks />
          <Box sx={{ display: "flex" }}>
            <ThemeIcon />
            <UserProfileLinks
              navbarDropDownBG={navbarDropDownBG}
              navbarDropDownText={navbarDropDownText}
              secondaryIC={secondaryIC}
              primaryIC={primaryIC}
              primaryBtnBG={primaryBtnBG}
              secondaryBtnBG={secondaryBtnBG}
              sendRequest={sendRequest}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
