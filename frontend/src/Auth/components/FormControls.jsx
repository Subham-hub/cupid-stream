import { Button, Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const FormControls = ({ authType, setAuthType }) => {
  const navigate = useNavigate();

  return (
    <>
      <Button
        style={{ backgroundColor: "#cb5c64" }}
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        {authType === "login" ? "LOG IN" : "SIGN UP"}
      </Button>
      <Grid container>
        <Grid item xs>
          <p
            style={{ cursor: "pointer" }}
            onClick={() => {
              if (authType === "login") {
                setAuthType("signup");
                navigate("/auth/signup");
              } else if (authType === "signup") {
                setAuthType("login");
                navigate("/auth/login");
              }
            }}
          >
            {authType === "signup"
              ? "Already have an account? Log In"
              : "Don't have an account? Sign Up"}
          </p>
        </Grid>
        {authType === "login" && (
          <Grid item>
            <Link t0="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default FormControls;
