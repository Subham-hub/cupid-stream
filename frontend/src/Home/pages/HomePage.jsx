import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import { notify, types } from "../../shared/utils/notification";
import { useLocation } from "react-router-dom";
import { destroyAuthID } from "../../shared/store/authSlice";
import classes from "./HomePage.module.css";
import Carousel from "react-material-ui-carousel";
import { CircularProgress, Grid, Paper } from "@mui/material";
import MovieCard from "../components/MainBody/sub-components/MovieCard";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useHttp } from "../../shared/hooks/http-hook";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [carouselContent, setCarouselContent] = useState([]);
  const dispatch = useDispatch();
  const { bgColors, colors, iconColors } = useSelector((s) => s.uiSlice);
  const { authID: storedAuthID } = useSelector((s) => s.auth);
  const { watchList } = useSelector((s) => s.userData);
  const { search } = useLocation();

  const NextArrow = ({ onClick }) => (
    <div
      className={`${classes["slick-arrow"]} ${classes["slick-next"]}`}
      onClick={onClick}
    >
      <KeyboardArrowRightIcon />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div
      className={`${classes["slick-arrow"]} ${classes["slick-prev"]}`}
      onClick={onClick}
    >
      <KeyboardArrowLeftIcon />
    </div>
  );
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1750,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const { sendRequest, isLoading, error, clearError } = useHttp();

  useEffect(() => {
    (async () => {
      try {
        const response = await sendRequest("get_all_movies");
        const { success, movies } = response;
        if (success) {
          setMovies(movies);
          let arr = [];
          for (let i = 0; i < movies.length; i++) {
            arr.push({ src: movies[i].thumnail.src, alt: movies[i].title });
          }
          setCarouselContent(arr);
        }
      } catch (e) {
        throw new Error(e.message);
      }
    })();
  }, [sendRequest]);

  useEffect(() => {
    if (search === "") return;
    const urlParams = new URLSearchParams(search);
    const recievedAuthID = urlParams.get("authID");
    const authType =
      urlParams.get("authType") === "login" ? "Logged-In" : "Signed Up";
    if (recievedAuthID === storedAuthID) {
      notify(types.SUCCESS, `Successfully ${authType}`);
      dispatch(destroyAuthID());
    }
  }, [storedAuthID, dispatch, search]);

  useEffect(() => {
    if (!error) return;
    notify(types.ERROR, error);
    clearError();
  }, [error, clearError]);

  return (
    <>
      <Header headerBg={bgColors.headerBg} headerColor={colors.headerColor} />
      <Navbar navbarBg={bgColors.navbarBg} navbarColor={colors.navbarColor} />
      <div className={classes.content}>
        <div
          className={classes.slider + " center"}
          style={{ backgroundColor: bgColors.queueSliderBg }}
        >
          {isLoading && (
            <div style={{ height: "70vh", marginTop: "10rem" }}>
              <CircularProgress />
            </div>
          )}
          {!isLoading && (
            <Carousel
              navButtonsAlwaysVisible
              interval={5000}
              className={classes.carousel}
              next={() => {}}
              prev={() => {}}
            >
              {carouselContent.map((item) => (
                <Paper key={item.alt}>
                  <img
                    src={item.src}
                    alt={item.alt}
                    style={{ height: 700, width: "100%" }}
                  />
                </Paper>
              ))}
            </Carousel>
          )}
        </div>
        <div
          className={classes.genre}
          style={{ backgroundColor: bgColors.queueGenreBg }}
        >
          <h2 style={{ backgroundColor: bgColors.queueGenreHeaderBg }}>
            Genre
          </h2>
          {isLoading && (
            <div
              style={{
                height: "10rem",
                textAlign: "center",
                paddingTop: "5rem",
              }}
            >
              <CircularProgress />
            </div>
          )}
          {!isLoading && (
            <Slider {...sliderSettings}>
              {movies.map((movie, index) => (
                <div key={index}>
                  <Grid item xs={12} lg={12}>
                    <MovieCard
                      title={movie.title}
                      description={movie.description}
                      uploadCard={movie.uploadCard}
                      movieId={movie._id}
                      src={movie.thumnail !== undefined && movie.thumnail.src}
                      btn2={
                        watchList.find((m) => m.movieId === movie._id)
                          ? "Go to Watchlist"
                          : undefined
                      }
                      username={
                        movie.uploadedBy !== undefined &&
                        movie.uploadedBy.username
                      }
                      className={classes["genre-card"]}
                      style={{
                        backgroundColor: bgColors.queueCardBg,
                        color: colors.queueCardColor,
                      }}
                    />
                  </Grid>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
      <Footer
        sendRequest={sendRequest}
        footerBg={bgColors.footerBg}
        footerBtnBg={bgColors.footerBtnBg}
        footerProfileDropdownBg={bgColors.footerProfileDropdownBg}
        footerBtnColor={colors.footerBtnColor}
        footerProfileDropdownColor={colors.footerProfileDropdownColor}
        footerProfileDropdownIC={iconColors.footerProfileDropdownIC}
      />
    </>
  );
};

export default HomePage;
