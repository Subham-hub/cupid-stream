import { Fragment, useState } from "react";
import Chip from "@mui/material/Chip";
import { Typography } from "@mui/material";
import { Input } from "../../../shared/UIElements";
import { useSelector } from "react-redux";

const TagsInput = ({ tags, setTags, label, info, error }) => {
  const [inputValue, setInputValue] = useState("");
  const { theme } = useSelector((s) => s.themeSlice);

  const handleDelete = (tagToDelete) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToDelete));
  };

  const handleAdd = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags((prevTags) => [...prevTags, inputValue]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <Fragment>
      <Input
        label={label}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        fullWidth
        error={error}
      />
      {info && (
        <Typography
          component="p"
          variant="caption"
          color={theme === "dark" ? "white" : "initial"}
          defaultValue={tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              onDelete={() => handleDelete(tag)}
              style={{
                margin: "4px",
                backgroundColor: theme === "dark" ? "white" : "initial",
              }}
            />
          ))}
        >
          {info}
        </Typography>
      )}
      {tags.map((tag, index) => (
        <Chip
          key={index}
          label={tag}
          onDelete={() => handleDelete(tag)}
          style={{
            margin: "4px",
            backgroundColor: theme === "dark" ? "white" : "initial",
          }}
        />
      ))}
    </Fragment>
  );
};

export default TagsInput;
