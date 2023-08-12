import { Avatar, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const AuthIcon = ({ authType }) => {
  return (
    <>
      <Avatar
        sx={{
          m: 1,
          bgcolor: authType === "login" ? "warning.main" : "secondary.main",
        }}
      >
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {authType === "signup" ? "Sign up" : "Log in"}
      </Typography>
    </>
  );
};

export default AuthIcon;
