import UploadedMovies from "./sub-components/UploadedMovies";
import Watchlist from "./sub-components/Watchlist";

import classes from "./MyMoviesBody.module.css";

const MainBody = ({
  mainBodyBg,
  movieCardBg,
  watchlistHeaderBg,
  movieCardColor,
  watchlostHeaderColor,
}) => {
  const watchlistStyles = {
    watchlistHeaderBg,
    watchlostHeaderColor,
  };
  const movieStyles = { movieCardBg, movieCardColor };

  return (
    <div
      className={classes["main-body"]}
      style={{ backgroundColor: mainBodyBg }}
    >
      <UploadedMovies {...movieStyles} />
      <Watchlist {...watchlistStyles} {...movieStyles} />
    </div>
  );
};

export default MainBody;
