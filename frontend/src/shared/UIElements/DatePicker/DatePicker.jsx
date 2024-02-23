import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Typography, styled } from "@mui/material";

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

export default function DatePicker({
  onEnteredDate,
  label,
  fullWidth,
  width,
  error,
  ...rest
}) {
  const { theme } = useSelector((s) => s.themeSlice);
  const isDarkMode = theme === "dark";

  const color = theme === "dark" ? "white" : "initial";
  const CustomDatePicker = styled(MuiDatePicker)({
    "& label": { color },
    "& .MuiIconButton-root": { color },
    "&.Mui-error": {
      border: "none",
    },
  });

  const [enteredDate, setEnteredDate] = useState();

  useEffect(() => {
    if (enteredDate !== undefined)
      onEnteredDate(enteredDate.$d.toLocaleDateString());
  }, [onEnteredDate, enteredDate]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CustomDatePicker
        defaultValue={enteredDate}
        onChange={(d) => setEnteredDate(d)}
        format="DD-MM-YYYY"
        label={label}
        {...rest}
        sx={{
          width: fullWidth ? "100%" : width,
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
        }}
      />
      {error && (
        <Typography variant="body2" color={isDarkMode ? "#FF9494" : "#D9534F"}>
          {error}
        </Typography>
      )}
    </LocalizationProvider>
  );
}
