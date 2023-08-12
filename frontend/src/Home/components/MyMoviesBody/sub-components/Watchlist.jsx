import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";

import classes from "./css/Watchlist.module.css";

const Watchlist = ({
  watchlistHeaderBg,
  watchlostHeaderColor,
  movieCardBg,
  movieCardColor,
}) => {
  const { watchList } = useSelector((s) => s.userData);

  return (
    <div className={classes.watchlist}>
      <h2
        style={{
          backgroundColor: watchlistHeaderBg,
          color: watchlostHeaderColor,
        }}
      >
        Watchlist
      </h2>
      {watchList.length === 0 && <p>No movies added yet</p>}
      <Grid container spacing={4} justify="center">
        {watchList.map((movie) => (
          <Grid item md={12} key={movie.movieId}>
            <MovieCard
              style={{
                backgroundColor: movieCardBg,
                color: movieCardColor,
              }}
              className={classes["watchlist-card"]}
              btn2="Remove from watch later"
              movieId={movie.movieId}
              title={movie.title}
              description={movie.description}
              src={movie.thumnail !== undefined && movie.thumnail.src}
              username={
                movie.uploadedBy !== undefined && movie.uploadedBy.username
              }
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Watchlist;
