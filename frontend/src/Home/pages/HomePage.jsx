import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, Skeleton } from "@mui/material";

import HomePageCarousel from "../components/HomePage/HomePageCarousel";
import MoviesSlider from "../components/HomePage/MoviesSlider";
import { notify, types } from "../../shared/utils/notification";
import { useLocation } from "react-router-dom";
import { destroyAuthID } from "../../shared/store/authSlice";
import { useScreenWidth } from "../../shared/hooks/useScreenWidth";
import { useHttp } from "../../shared/hooks/http-hook";

const HomePage = () => {
  const dispatch = useDispatch();
  const { authID: storedAuthID } = useSelector((s) => s.auth);
  const { username, movieDetails } = useSelector((s) => s.userData);
  const { search } = useLocation();
  const { screenWidth } = useScreenWidth();
  const { sendRequest, isLoading, error, clearError } = useHttp();
  const {
    bgColor: { primaryBG, secondaryBG },
    textColor: { secondaryText },
  } = useSelector((s) => s.themeSlice);

  useEffect(() => {
    if (search === "") return;
    const urlParams = new URLSearchParams(search);
    const recievedAuthID = urlParams.get("authID");
    const authType =
      urlParams.get("authType") === "login" ? "Logged-In" : "Signed Up";
    if (recievedAuthID === storedAuthID) {
      const welcomeMessage = `, welcome to cupid stream ${username}`;
      notify(
        types.SUCCESS,
        `Successfully ${authType}${
          authType === "Signed Up" ? welcomeMessage : ""
        }`
      );
      dispatch(destroyAuthID());
    }
  }, [storedAuthID, dispatch, search, username]);

  const [popularMoviesIN, setPopularMoviesIN] = useState([]);
  const [topMoviesIN, setTopMoviesIN] = useState([]);
  const [nowPlayingMoviesIN, setNowPlayingMoviesIN] = useState([]);
  const [upcomingMoviesIN, setUpcomingMoviesIN] = useState([]);

  const [apiCarouselContant, setApiCarouselContant] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await sendRequest("get_dummy_movies/null");
        setApiCarouselContant(
          response[Math.floor(Math.random() * response.length)]
        );
        setPopularMoviesIN(response[0]);
        setTopMoviesIN(response[1]);
        setNowPlayingMoviesIN(response[2]);
        setUpcomingMoviesIN(response[3]);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [sendRequest]);

  useEffect(() => {
    if (!error) return;
    notify(types.ERROR, error);
    clearError();
  }, [error, clearError]);

  const uploadedMovies = movieDetails.filter(
    (m) => m.category === "uploadedMovies"
  );

  return (
    <Box
      bgcolor={primaryBG}
      color={secondaryText}
      overflow="hidden"
      minHeight="100vh"
    >
      {isLoading && (
        <Fragment>
          <Skeleton
            sx={{ bgcolor: secondaryBG, borderRadius: "1rem", mt: 3.5 }}
            variant="rectangular"
            width="100%"
            height={550}
          />
          <Skeleton
            variant="text"
            width={screenWidth < 1200 ? "50%" : "20%"}
            height={50}
            sx={{ bgcolor: secondaryBG, mb: -10, mt: 3.5, textAlign: "center" }}
          />
          <Grid container spacing={2} justifyContent="center">
            {Array.from({ length: 4 }, (_, index) => (
              <Grid item md={6} lg={4} xl={3} key={index}>
                <Skeleton
                  height={350}
                  width={350}
                  sx={{ bgcolor: secondaryBG }}
                />
              </Grid>
            ))}
          </Grid>
        </Fragment>
      )}
      {!isLoading && (
        <Fragment>
          <div>
            <HomePageCarousel
              apiCarouselContant={apiCarouselContant}
              uploadedMovies={uploadedMovies}
              secondaryBG={secondaryBG}
            />
          </div>
          {uploadedMovies.length > 0 && (
            <MoviesSlider
              heading="Uploaded By You"
              movies={uploadedMovies}
              type="self"
            />
          )}
          <MoviesSlider
            heading="Popular Movies"
            movies={popularMoviesIN}
            type="popular"
          />
          <MoviesSlider
            heading="Now Playing"
            movies={nowPlayingMoviesIN}
            type="nowPlaying"
          />
          <MoviesSlider
            heading="Top Movies"
            movies={topMoviesIN}
            type="topMovies"
          />
          <MoviesSlider
            heading="Upcoming"
            movies={upcomingMoviesIN}
            type="upcoming"
          />
        </Fragment>
      )}
    </Box>
  );
};

export default HomePage;
