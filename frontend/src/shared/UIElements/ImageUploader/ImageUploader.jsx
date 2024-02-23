import { useEffect, useRef, useState } from "react";
import { Box, Button } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import classes from "./ImageUploader.module.css";
import CloseIcon from "@mui/icons-material/Close";
const ImageUploader = ({ onImageUpload }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [serverFile, setServerFile] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    let file = e.target.files[0];
    setServerFile(file);
    const reader = new FileReader();
    reader.onload = () => setSelectedImage(reader.result);
    reader.readAsDataURL(file);
    setSelectedImage(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setServerFile(file);
    const reader = new FileReader();
    reader.onload = () => setSelectedImage(reader.result);
    reader.readAsDataURL(file);
    setSelectedImage(null);
  };

  useEffect(() => {
    if (confirm) onImageUpload(selectedImage, serverFile);
  }, [confirm, onImageUpload, selectedImage, serverFile]);

  return (
    <div className={classes["image-uploader"]}>
      <div
        className={classes["drop-container"]}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => fileInputRef.current.click()}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className={classes["file-input"]}
          ref={fileInputRef}
        />
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="Preview"
            className={classes["preview-image"]}
          />
        ) : (
          <div className={classes["placeholder"]}>
            Drag & Drop or Select Image
          </div>
        )}
      </div>
      {selectedImage && (
        <Box>
          <Button onClick={() => setConfirm(true)}>
            <DoneIcon />
          </Button>
          <Button onClick={() => setSelectedImage(null)}>
            <CloseIcon />
          </Button>
        </Box>
      )}
    </div>
  );
};

export default ImageUploader;
