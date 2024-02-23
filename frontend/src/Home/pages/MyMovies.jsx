import { Box } from "@mui/material";
import { useSelector } from "react-redux";

import UploadedMovies from "../components/MyMovies/UploadedMovies";
import Watchlist from "../components/MyMovies/Watchlist";

const MyMovies = () => {
  const {
    bgColor: { primaryBG, secondaryBG },
    textColor: { primaryText },
    iconColor: { primaryIC },
  } = useSelector((s) => s.themeSlice);

  return (
    <Box
      display="flex"
      overflow="hidden"
      height="100vh"
      style={{ backgroundColor: primaryBG }}
    >
      <UploadedMovies
        primaryIC={primaryIC}
        primaryBG={primaryBG}
        secondaryBG={secondaryBG}
        primaryText={primaryText}
      />
      <Watchlist secondaryBG={secondaryBG} primaryText={primaryText} />
    </Box>
  );
};

export default MyMovies;
