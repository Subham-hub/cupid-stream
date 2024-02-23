import { useSelector } from "react-redux";

import classes from "./Movie.module.css";
import vid from "../../assets/videos/test.mp4";
import { useEffect } from "react";

const Movie = () => {
  const {
    textColor: { primaryText },
  } = useSelector((s) => s.themeSlice);
  useEffect(() => {
    alert(
      "This is just a dummy page as we cannot possibly upload a real movie"
    );
  }, []);
  return (
    <div className={classes.content} style={{ color: primaryText }}>
      <div className={classes["video-player"]}>
        <video controls crossOrigin="anonymous" poster="" preload="auto">
          <source src={vid} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default Movie;
