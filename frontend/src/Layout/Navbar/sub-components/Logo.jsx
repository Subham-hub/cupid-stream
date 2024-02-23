import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

import logo from "../../../assets/images/logo.png";

export const BigScreenLogo = () => {
  return (
    <Typography
      variant="h6"
      noWrap
      sx={{
        mr: 2,
        display: { xs: "none", md: "flex" },
        fontFamily: "monospace",
        fontWeight: 700,
        letterSpacing: "7px",
        color: "inherit",
        textDecoration: "none",
      }}
    >
      <Link to="/">
        <img src={logo} alt="logo" width={55} height={55} />
      </Link>
      <span style={{ paddingTop: "1rem", paddingLeft: "1rem" }}>
        <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
          Cupid Stream
        </Link>
      </span>
    </Typography>
  );
};

export const SmallScreenLogo = () => {
  return (
    <Typography
      variant="h5"
      noWrap
      sx={{
        mr: 2,
        display: { xs: "flex", md: "none" },
        flexGrow: 1,
        fontFamily: "monospace",
        fontWeight: 700,
        letterSpacing: ".3rem",
        color: "inherit",
        textDecoration: "none",
      }}
    >
      <Link to="/">
        <img src={logo} alt="logo" width={55} height={55} />
      </Link>
    </Typography>
  );
};
