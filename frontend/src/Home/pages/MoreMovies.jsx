import { useLocation, useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import { useEffect, useState } from "react";
import { notify, types } from "../../shared/utils/notification";
import { useHttp } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner/LoadingSpinner";
import MovieGridSystem from "../../shared/UIElements/MovieGridSystem";

const MoreMovies = () => {
  const { moviesType } = useParams();
  const { sendRequest, isLoading, error, clearError } = useHttp();
  const {
    bgColor: { primaryBG },
    textColor: { primaryText },
  } = useSelector((s) => s.themeSlice);

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
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && (
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
          <MovieGridSystem movies={movies} />
        </Box>
      )}
    </>
  );
};

export default MoreMovies;
