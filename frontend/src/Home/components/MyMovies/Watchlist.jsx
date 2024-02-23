import { Box, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import classes from "./css/Watchlist.module.css";
import MovieCard from "../../../Global/Cards/MovieCard";

const Watchlist = ({ secondaryBG, primaryText }) => {
  const { movieDetails } = useSelector((s) => s.userData);
  const watchList = movieDetails.filter((m) => m.category === "watchList");

  return (
    <Box
      sx={{
        float: "right",
        width: "23%",
        borderLeft: "2px solid black",
        overflowY: "scroll",
        overflowX: "hidden",
      }}
      className={classes.watchlist}
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
      <Grid container spacing={4} justifyContent="center" ml={-1.3}>
        {watchList.map((movie) => (
          <Grid item md={12} key={movie.movieId}>
            <MovieCard
              genres={movie.genres}
              btn2="Remove from watch later"
              movieId={movie.movieId}
              title={movie.title}
              description={movie.description}
              src={movie.thumbnail !== undefined && movie.thumbnail.src}
              username={
                movie.uploadedBy !== undefined && movie.uploadedBy.username
              }
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Watchlist;
