import { Fragment, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Drawer,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import UploadedMoviesFilterBar from "./UploadedMoviesFilterBar";
import MovieCard from "../../../Global/Cards/MovieCard";
import { useScreenWidth } from "../../../shared/hooks/useScreenWidth";

import classes from "./css/UploadedMovies.module.css";

const UploadedMovies = ({ primaryBG, secondaryBG, primaryText, primaryIC }) => {
  const { movieDetails } = useSelector((s) => s.userData);
  const watchList = movieDetails.filter((m) => m.category === "watchList");

  const navigate = useNavigate();
  const { screenWidth } = useScreenWidth();

  const [visibleItems, setVisibleItems] = useState(5);
  const pageSize = 5;
  const [loading, setLoading] = useState(false);

  const loadMoreItems = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleItems((prevVisibleItems) => prevVisibleItems + pageSize);
      setLoading(false);
    }, 800);
  };

  const uploadedMovies = movieDetails.filter(
    (m) => m.category === "uploadedMovies"
  );
  const visibleMovies = useMemo(
    () => uploadedMovies.slice(0, visibleItems),
    [uploadedMovies, visibleItems]
  );

  const [openNotifDrawer, setOpenNotifDrawer] = useState(false);
  const toggleWatchListDrawer = () => setOpenNotifDrawer(!openNotifDrawer);

  return (
    <Fragment>
      {screenWidth < 1550 && (
        <Drawer
          anchor="right"
          open={openNotifDrawer}
          onClose={toggleWatchListDrawer}
        >
          <Box
            bgcolor={primaryBG}
            minHeight="100vh"
            sx={{ overflowY: watchList.length === 0 ? "hidden" : "scroll" }}
            className={classes.drawerBox}
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
              <IconButton
                onClick={toggleWatchListDrawer}
                sx={{ float: "right", color: primaryIC }}
              >
                <CloseIcon />
              </IconButton>
            </Typography>
            {watchList.length === 0 ? (
              <Typography
                mt={2}
                color={primaryText}
                variant="h5"
                component="p"
                p={1}
              >
                No movies added to watchlist
              </Typography>
            ) : (
              watchList.map((movie) => (
                <Grid key={movie.movieId} item md={12}>
                  <MovieCard
                    btn2="Remove from watch later"
                    movieId={movie?.movieId}
                    title={movie?.title}
                    genres={movie?.genres}
                    description={movie?.description}
                    src={movie?.thumbnail?.src}
                    username={movie?.uploadedBy?.username}
                  />
                </Grid>
              ))
            )}
          </Box>
        </Drawer>
      )}

      <div className={classes.movies}>
        <UploadedMoviesFilterBar
          navigate={navigate}
          toggleWatchListDrawer={toggleWatchListDrawer}
          onSeachMovie={(val) => {
            console.log(val);
          }}
        />
        <Container
          maxWidth="xl"
          sx={{ textAlign: "center" }}
          className={classes["movie-cards"]}
        >
          {visibleMovies.length === 0 && (
            <Typography variant="h4" component="p" pt={5}>
              No Movies Uploaded yet
            </Typography>
          )}
          {visibleMovies.length !== 0 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Grid container spacing={2} justifyContent="center">
                {visibleMovies.map((movie, index) => (
                  <Grid item md={6} lg={4} xl={4} key={index}>
                    <Fragment>
                      <MovieCard
                        movieId={movie?.movieId}
                        title={movie?.title}
                        description={movie?.description}
                        src={movie?.thumbnail.src}
                        genres={movie?.genres}
                        username={movie?.uploadedBy?.username}
                      />
                    </Fragment>
                  </Grid>
                ))}
              </Grid>
              {loading && <CircularProgress />}
              {!loading && uploadedMovies.length > visibleItems && (
                <Button
                  sx={{ marginBottom: "1rem" }}
                  onClick={loadMoreItems}
                  variant="outlined"
                  color="primary"
                >
                  Load More
                </Button>
              )}
            </Box>
          )}
        </Container>
      </div>
    </Fragment>
  );
};

export default UploadedMovies;
