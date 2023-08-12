import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import classes from "./css/AuthButtons.module.css";

const AuthButtons = ({ footerBtnBg, footerBtnColor }) => {
  const navigate = useNavigate();
  const btnStyle = {
    backgroundColor: footerBtnBg,
    color: footerBtnColor,
  };
  return (
    <div className={classes.btn}>
      <Button
        variant="contained"
        style={btnStyle}
        onClick={() => navigate("/auth/signup")}
      >
        Signup
      </Button>
      <Button
        variant="contained"
        style={btnStyle}
        onClick={() => navigate("/auth/login")}
      >
        Login
      </Button>
    </div>
  );
};

export default AuthButtons;
