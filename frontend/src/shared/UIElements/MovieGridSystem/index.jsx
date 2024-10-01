import { useSelector } from "react-redux";
import { Grid } from "@mui/material";

import MovieCard from "../../../Global/Cards/MovieCard";

const MovieGridSystem = ({ movies }) => {
  const { movieDetails } = useSelector((s) => s.userData);
  const watchList = movieDetails.filter((m) => m.category === "watchList");

  return (
    <Grid container justifyContent="center" spacing={2}>
      {movies.map((movie) => (
        <Grid key={movie.movieId} item xs={12} sm={6} md={5} lg={3} xl={2.5}>
          <MovieCard
            title={movie?.title}
            description={movie?.description}
            movieId={movie?.movieId}
            src={movie?.thumbnail?.src}
            genres={movie?.genres}
            isApi={movie?.isApi}
            btn2={
              watchList?.find((m) => m?.movieId == movie?.movieId) &&
              "Go to Watchlist"
            }
            username={movie?.uploadedBy?.username}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieGridSystem;
