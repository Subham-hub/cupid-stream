import { Box, Button, Grid, Typography } from "@mui/material";
import MovieCard from "../../../Global/Cards/MovieCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MovieSlider = ({ heading, movies = [], type }) => {
  const { movieDetails } = useSelector((s) => s.userData);
  const watchList = movieDetails.filter((m) => m.category === "watchList");

  const {
    bgColor: { primaryBtnBG },
    iconColor: { primaryIC },
  } = useSelector((s) => s.themeSlice);
  const navigate = useNavigate();

  return (
    movies.length !== 0 && (
      <Box
        padding={1}
        borderBottom={`2px solid ${primaryIC}`}
        overflow="hidden"
      >
        <Typography variant="h4" align="center" gutterBottom>
          {heading}
        </Typography>
        <Grid container justifyContent="center" spacing={2}>
          {movies?.slice(0, 4)?.map((movie) => (
            <Grid
              key={movie.movieId}
              item
              xs={12}
              sm={6}
              md={5}
              lg={3}
              xl={2.5}
            >
              <MovieCard
                title={movie?.title}
                description={movie?.description}
                movieId={movie?.movieId}
                src={movie?.thumbnail?.src}
                genres={movie?.genres}
                isApi={movie?.isApi}
                btn2={
                  watchList.find((m) => m.movieId == movie.movieId) &&
                  "Go to Watchlist"
                }
                username={movie?.uploadedBy?.username}
              />
            </Grid>
          ))}
        </Grid>
        <Box textAlign="center">
          <Button
            onClick={() =>
              type === "self"
                ? navigate("/my-movies")
                : navigate(`/more-movies/${type}`, {
                    replace: true,
                    state: movies,
                  })
            }
            style={{ backgroundColor: primaryBtnBG }}
            variant="contained"
          >
            Show More
          </Button>
        </Box>
      </Box>
    )
  );
};

export default MovieSlider;
