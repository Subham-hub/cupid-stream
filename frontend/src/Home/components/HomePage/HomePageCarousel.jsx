import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { noImage } from "../../../assets/images";
import { useNavigate } from "react-router-dom";

const HomePageCarousel = ({ uploadedMovies = [], apiCarouselContant }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoverOverSlider, setHoverOverSlider] = useState(false);
  const [carouselContent, setCarouselContent] = useState([]);
  const {
    bgColor: { primaryBtnBG },
    textColor: { primaryText },
  } = useSelector((s) => s.themeSlice);
  const navigate = useNavigate();

  useEffect(() => {
    const combinedContent = [...apiCarouselContant, ...uploadedMovies];
    const randomContent = combinedContent.sort(() => Math.random() - 0.5);
    setCarouselContent(randomContent.slice(0, 15));
  }, [uploadedMovies, apiCarouselContant]);

  useEffect(() => {
    if (hoverOverSlider) return;
    if (carouselContent && carouselContent.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % carouselContent.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [carouselContent, hoverOverSlider]);

  const handleMouseEnter = () => setHoverOverSlider(true);
  const handleMouseLeave = () => setHoverOverSlider(false);

  const handleNextSlide = () => {
    if (carouselContent && carouselContent.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % carouselContent.length);
    }
  };

  const handlePrevSlide = () => {
    if (carouselContent && carouselContent.length > 0) {
      setCurrentSlide(
        (prev) => (prev - 1 + carouselContent.length) % carouselContent.length
      );
    }
  };

  return (
    <Box
      minHeight={550}
      position="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Box display="flex">
        <Button
          style={{ color: primaryText, backgroundColor: primaryBtnBG }}
          onClick={handlePrevSlide}
        >
          <ArrowBackIosIcon />
        </Button>
        <img
          loading="lazy"
          src={
            carouselContent[currentSlide]?.thumbnail?.src.includes("null")
              ? noImage
              : carouselContent[currentSlide]?.thumbnail?.src || noImage
          }
          alt="Image Cannot Be Loaded"
          style={{
            height: 550,
            width: "100%",
            filter: hoverOverSlider ? "brightness(20%)" : "brightness(100%)",
          }}
        />
        <Button
          style={{ color: primaryText, backgroundColor: primaryBtnBG }}
          onClick={handleNextSlide}
        >
          <ArrowForwardIosIcon />
        </Button>
      </Box>
      {hoverOverSlider && (
        <Box position="absolute" top={0} left={50} right={50} bottom={0} p={5}>
          <Typography variant="h3" color="white">
            {carouselContent[currentSlide]?.title}
          </Typography>
          <Typography color="white">
            {carouselContent[currentSlide]?.description}
          </Typography>
          <Button
            style={{
              backgroundColor: primaryBtnBG,
              color: "#fff",
            }}
            onClick={() =>
              navigate(`movie/${carouselContent[currentSlide]?.movieId}`)
            }
          >
            Watch
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default HomePageCarousel;
