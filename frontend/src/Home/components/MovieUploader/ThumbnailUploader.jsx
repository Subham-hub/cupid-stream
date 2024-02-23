import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ClearIcon from "@mui/icons-material/Clear";
import { Box, Typography } from "@mui/material";
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

const ThumbnailUploader = ({ onSendImage, error }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [displayFile, setDisplayFile] = useState(null);
  const { theme } = useSelector((s) => s.themeSlice);
  const isDarkMode = theme === "dark";

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setDisplayFile(reader.result);
      reader.readAsDataURL(file);
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  useEffect(() => {
    onSendImage(selectedFile);
  }, [onSendImage, selectedFile]);

  const btnStyle = {
    backgroundColor: isDarkMode
      ? "#2c3e50"
      : theme === "light"
      ? "#8bc34a"
      : "pink",
    color: isDarkMode ? "#fff" : theme === "light" ? "white" : "black",
  };
  // console.log(selectedFile);
  return (
    <Box
      textAlign="center"
      component="div"
      border={`1px solid ${isDarkMode ? grey[700] : grey[200]}`}
      borderRadius={1}
      p={2}
      bgcolor={isDarkMode ? grey[900] : "#fff"}
    >
      {!selectedFile && (
        <label htmlFor="file-input">
          <input
            id="file-input"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <Button
            style={btnStyle}
            variant="contained"
            component="span"
            startIcon={<CloudUploadIcon />}
          >
            Choose thumbnail
          </Button>
          {error && (
            <Typography
              variant="body2"
              color={isDarkMode ? "#FF9494" : "#D9534F"}
            >
              {error}
            </Typography>
          )}
        </label>
      )}

      {selectedFile && (
        <Box>
          <img
            src={displayFile}
            alt="Preview"
            style={{ maxHeight: "100%", maxWidth: "100%" }}
          />
          <Typography variant="h6" color="white" pb={1}>
            {selectedFile.name}
          </Typography>
          <Button
            style={btnStyle}
            variant="contained"
            startIcon={<ClearIcon />}
            onClick={() => {
              setSelectedFile(null);
              setDisplayFile(null);
            }}
          >
            Clear
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ThumbnailUploader;
