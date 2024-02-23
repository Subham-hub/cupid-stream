import { Typography, styled } from "@mui/material";
import {
  LocalizationProvider,
  TimePicker as MuiTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
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

const TimePicker = ({
  onEnteredTime,
  label,
  fullWidth,
  width,
  error,
  ...rest
}) => {
  const { theme } = useSelector((s) => s.themeSlice);
  const isDarkMode = theme === "dark";

  const color = theme === "dark" ? "white" : "initial";
  const CustomTimePicker = styled(MuiTimePicker)({
    "& label": { color },
    "& .MuiIconButton-root": { color },
    "&.Mui-error": {
      border: "none",
    },
  });

  const [enteredTime, setEnteredTime] = useState();

  useEffect(() => {
    if (enteredTime === undefined) return;
    const hours = enteredTime.$d.getHours().toString().padStart(2, "0");
    const minutes = enteredTime.$d.getMinutes();
    onEnteredTime(`${hours}:${minutes}`);
  }, [onEnteredTime, enteredTime]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CustomTimePicker
        openTo="hours"
        value={enteredTime}
        onChange={(t) => setEnteredTime(t)}
        format="hh:mm"
        ampm={false}
        label={label}
        {...rest}
        slotProps={{ actionBar: { hidden: false } }}
        views={["hours", "minutes"]}
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
          ".MuiPickersModal-dialog": {
            backgroundColor: "green",
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
};

export default TimePicker;
