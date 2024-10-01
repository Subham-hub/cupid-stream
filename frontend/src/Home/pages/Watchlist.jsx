import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import MovieGridSystem from "../../shared/UIElements/MovieGridSystem";

const Watchlist = () => {
  const { movieDetails } = useSelector((s) => s.userData);
  const watchList = movieDetails.filter((m) => m.category === "watchList");

  const {
    bgColor: { primaryBG, secondaryBG },
    textColor: { primaryText },
  } = useSelector((s) => s.themeSlice);

  return (
    <Box
      minHeight="100vh"
      maxHeight="fit-content"
      style={{ backgroundColor: primaryBG }}
    >
      <Typography
        textAlign="center"
        variant="h4"
        p={1.5}
        style={{
          backgroundColor: secondaryBG,
          color: primaryText,
        }}
      >
        Watchlist
      </Typography>
      {watchList.length === 0 && (
        <Typography
          color={primaryText}
          component="p"
          variant="h5"
          textAlign="center"
          pt={2}
        >
          No movies added yet
        </Typography>
      )}
      <MovieGridSystem movies={watchList} />
    </Box>
  );
};

export default Watchlist;
