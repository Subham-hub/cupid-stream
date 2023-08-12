import { useRef, useState } from "react";

import classes from "./ImageUploader.module.css";
import { Button } from "@mui/material";

const ImageUploader = ({ onFileUpload }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    let file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
    onFileUpload(file);
    setSelectedImage(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setSelectedImage(reader.result);
      reader.readAsDataURL(file);
    }
    onFileUpload(file);
    setSelectedImage(null);
  };

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
        <Button onClick={() => setSelectedImage(null)}>Clear</Button>
      )}
    </div>
  );
};

export default ImageUploader;
