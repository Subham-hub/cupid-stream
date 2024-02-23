import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Chip, Select as MuiSelect, Typography, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

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

export default function Select({
  label,
  children,
  onSendValue,
  fullWidth,
  minWidth,
  maxWidth = "fit-content",
  error,
  type, // Add type prop
  ...rest
}) {
  const { theme } = useSelector((s) => s.themeSlice);
  const isDarkMode = theme === "dark";
  const [value, setValue] = useState("");
  const [tags, setTags] = useState([]); // State to store tags when type is "tag"

  const CustomSelect = styled(MuiSelect)(() => ({
    color: `${isDarkMode ? grey[300] : grey[900]}`,
    backgroundColor: `${isDarkMode ? grey[900] : "#fff"}`,
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: `${isDarkMode ? grey[700] : grey[200]}`,
    },
    "&:focus": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: isDarkMode ? "white" : "initial",
      },
    },
    "& .MuiSelect-root": {
      color: isDarkMode ? "white" : "initial",
    },
    "& .MuiMenu-list": {
      "& .MuiMenuItem-root": {
        color: isDarkMode ? "white" : "initial",
      },
    },
  }));

  useEffect(() => {
    if (value && type !== "tag") {
      onSendValue(value);
    }

    // Check if type is "tag" and add the selected value as a unique tag
    if (type === "tag" && value && !tags.includes(value)) {
      setTags((prevTags) => [...prevTags, value]);
    }
  }, [value, onSendValue, type, tags]);

  useEffect(() => {
    // Send the entire array of tags when type is "tag"
    if (type === "tag") {
      onSendValue(tags);
    }
  }, [tags, onSendValue, type]);

  const handleDeleteTag = (index) => {
    setTags((prevTags) => {
      const updatedTags = [...prevTags];
      updatedTags.splice(index, 1);
      return updatedTags;
    });
    setValue(null);
  };

  //   <MenuItem value={10}>Ten</MenuItem>
  return (
    <>
      <FormControl sx={{ minWidth: fullWidth ? "100%" : minWidth, maxWidth }}>
        <InputLabel
          id={label + "label"}
          sx={{ color: `${isDarkMode ? grey[300] : grey[900]}` }}
        >
          {label}
        </InputLabel>
        <CustomSelect
          labelId={label + "label"}
          id={label}
          onChange={(e) => setValue(e.target.value)}
          value={type === "tag" ? "" : value}
          label={label}
          {...rest}
        >
          {children}
        </CustomSelect>
        {error && (
          <Typography
            variant="body2"
            color={isDarkMode ? "#FF9494" : "#D9534F"}
          >
            {error}
          </Typography>
        )}
      </FormControl>
      {type === "tag" &&
        tags.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            onDelete={() => handleDeleteTag(index)}
            sx={{
              ml: 1,
              mt: 1,
              bgcolor: theme === "dark" ? "white" : "initial",
            }}
          />
        ))}
    </>
  );
}
