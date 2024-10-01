import { Box, Button, Typography } from "@mui/material";
import { Fragment } from "react";
import { useSelector } from "react-redux";

import classes from "./WatchAloneModal.module.css";
import truncateChars from "../../shared/utils/truncateChars";
import { noImage } from "../../assets/images";

const WatchAloneModal = ({
  title,
  description,
  src,
  genres,
  handleOpenReadMoreModal,
}) => {
  const {
    bgColor: { primaryBtnBG },
  } = useSelector((s) => s.themeSlice);

  const watchMovieClickHandler = () => {
    alert("This is just a prop movie to populate the website");
  };

  return (
    <Fragment>
      <Box maxWidth={782} maxHeight={415.5}>
        <img
          src={src.includes("null") ? noImage : src || noImage}
          style={{ borderRadius: "1rem" }}
          height={415.5}
          width={782}
        />
      </Box>
      <Typography
        variant="h5"
        component="p"
        textAlign="center"
        fontSize="2rem"
        color="white"
        fontWeight="bold"
        fontFamily="Comic Sans MS, cursive, sans-serif"
        style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)" }}
      >
        {title}
      </Typography>
      <Typography
        variant="h6"
        component="p"
        textAlign="center"
        gutterBottom
        fontSize={15}
        color="grey"
        fontStyle="italic"
        fontFamily="Courier New, monospace"
        width={782}
        style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)" }}
      >
        {truncateChars(description || "Description not avialable", 500)}{" "}
        {description?.length > 500 && (
          <span className={classes.link} onClick={handleOpenReadMoreModal}>
            Read More
          </span>
        )}
      </Typography>
      <Typography component="ul" textAlign="center">
        {genres.map((g) => (
          <li key={g.id} style={{ display: "inline-block", marginRight: 8 }}>
            <Typography component="p" variant="body1">
              {g.name.toUpperCase()}
            </Typography>
          </li>
        ))}
      </Typography>
      <Box display="flex" alignItems="center" mt={1.5}>
        <Button
          style={{ backgroundColor: primaryBtnBG }}
          variant="contained"
          onClick={watchMovieClickHandler}
        >
          Watch
        </Button>
        <Typography variant="body1" component="p" ml="auto">
          Duration: <time>2 hours</time>
        </Typography>
      </Box>
    </Fragment>
  );
};

export default WatchAloneModal;
