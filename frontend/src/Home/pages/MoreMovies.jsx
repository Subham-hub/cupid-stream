import { useLocation, useParams } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import MovieCard from "../../Global/Cards/MovieCard";
import { useEffect, useState } from "react";
import { notify, types } from "../../shared/utils/notification";
import { useHttp } from "../../shared/hooks/http-hook";

const MoreMovies = () => {
  const { moviesType } = useParams();
  const { sendRequest, isLoading, error, clearError } = useHttp();
  const {
    bgColor: { primaryBG, secondaryBG },
    textColor: { primaryText, secondaryText },
  } = useSelector((s) => s.themeSlice);
  const { movieDetails } = useSelector((s) => s.userData);
  const watchList = movieDetails.filter((m) => m.category === "watchList");

  const { state: navStateMovies } = useLocation();

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (navStateMovies || navStateMovies?.length > 0) setMovies(navStateMovies);
    else
      (async () => {
        const response = await sendRequest(`get_dummy_movies/${moviesType}`);
        console.log(response);
        setMovies(response);
      })();
  }, [sendRequest, moviesType, navStateMovies]);

  useEffect(() => {
    if (!error) return;
    notify(types.ERROR, error);
    clearError();
  }, [error, clearError]);

  let heading;
  if (moviesType === "popular") heading = moviesType;
  if (moviesType === "nowPlaying") heading = "Now playing";
  if (moviesType === "topMovies") heading = "Top movies";
  if (moviesType === "upcoming") heading = moviesType;

  return (
    <Box bgcolor={primaryBG} color={primaryText} minHeight="100vh">
      <Typography
        textTransform="uppercase"
        variant="h4"
        align="center"
        color={primaryText}
        pt={1}
      >
        {heading}
      </Typography>
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
                watchList.find((m) => m?.movieId == movie?.movieId) &&
                "Go to Watchlist"
              }
              username={movie?.uploadedBy?.username}
            />
          </Grid>
        ))}
      </Grid>{" "}
    </Box>
  );
};

export default MoreMovies;
