import { TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Input = ({
  label,
  fullWidth,
  register,
  name,
  validation,
  type = "text",
  sx,
  error,
  ...rest
}) => {
  const { theme } = useSelector((s) => s.themeSlice);
  const isDarkMode = theme === "dark";

  return (
    <>
      <TextField
        id={label}
        name={label}
        type={type}
        label={label}
        fullWidth={fullWidth}
        {...(register ? register(name, validation ? validation : {}) : {})}
        {...rest}
        InputLabelProps={{
          style: { color: `${isDarkMode ? grey[300] : grey[900]}` },
        }}
        sx={{
          backgroundColor: `${isDarkMode ? grey[900] : "#fff"}`,
          "& label.Mui-focused": {
            color: `${isDarkMode ? grey[700] : grey[200]}`,
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: `${isDarkMode ? grey[700] : grey[200]}`,
            },
            "&:hover fieldset": {
              borderColor: `${isDarkMode ? grey[700] : grey[200]}`,
            },
            "&.Mui-focused fieldset": {
              borderColor: `${isDarkMode ? grey[700] : grey[200]}`,
            },
          },
          "& input": {
            color: `${isDarkMode ? grey[300] : grey[900]}`,
          },
          ...sx,
        }}
        className="CustomInput"
      />
      {error && (
        <Typography variant="body2" color={isDarkMode ? "#FF9494" : "#D9534F"}>
          {error}
        </Typography>
      )}
    </>
  );
};

export default Input;
