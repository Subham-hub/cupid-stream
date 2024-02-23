import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { Fragment } from "react";

const Fields = ({ authType, register, errors }) => {
  const errorStyle = (field) => ({
    color: errors[field].type === "required" ? "red" : "#AA336A",
  });

  return (
    <>
      {authType === "signup" && (
        <Fragment>
          <TextField
            id="username"
            autoFocus={authType === "signup"}
            style={{ backgroundColor: "#f3bfbe" }}
            margin="normal"
            fullWidth
            label="Username"
            autoComplete="username"
            {...register("username", {
              required: {
                value: authType === "signup",
                message: "Username is required",
              },
              minLength: {
                value: 4,
                message:
                  "Please choose a username with a minimum of 4 characters.",
              },
            })}
          />
          {errors.username && (
            <p style={errorStyle("username")}>{errors.username.message}</p>
          )}
        </Fragment>
      )}
      <TextField
        id="email"
        autoFocus={authType === "login"}
        style={{ backgroundColor: "#f3bfbe" }}
        margin="normal"
        fullWidth
        label="Email Address"
        autoComplete="email"
        {...register("email", {
          required: { value: true, message: "Email ID is required" },
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Invalid Email ID",
          },
        })}
      />
      {errors.email && (
        <p style={errorStyle("email")}>{errors.email.message}</p>
      )}

      <TextField
        id="password"
        style={{ backgroundColor: "#f3bfbe" }}
        margin="normal"
        fullWidth
        label="Password"
        type="password"
        autoComplete="current-password"
        {...register("password", {
          required: { value: true, message: "Password is required" },
          minLength: { value: 6, message: "6+ chars, safe" },
        })}
      />
      {errors.password && (
        <p style={errorStyle("password")}>{errors.password.message}</p>
      )}

      <FormControlLabel
        control={
          <Checkbox
            id="remember-me"
            color="primary"
            {...register("rememberMe")}
          />
        }
        label="Remember me"
      />
    </>
  );
};

export default Fields;
