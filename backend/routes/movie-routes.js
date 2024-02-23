import express from "express";
import { check } from "express-validator";

import {
  addToWatchlist,
  deleteMovie,
  editMovieInfo,
  getAllMovies,
  getMovieByMovieId,
  getMoviesByUid,
  removeFromWatchlist,
  uploadMovie,
} from "../controllers/movie-controller/index.js";
import { isLoggedIn } from "../middleware/user-middleware.js";

const router = express.Router();

router.get("/get_all_movies", getAllMovies);
router.get("/get_movies_by_uid/:uid", isLoggedIn, getMoviesByUid);
router.get("/get_movies_by_movieId/:movieId", isLoggedIn, getMovieByMovieId);

router.post(
  "/upload_movie",
  isLoggedIn,
  [
    check("uid").isLength({ min: 24 }),
    check("title").isString(),
    check("description").isString(),
    check("language").isString(),
    check("country").isString(),
    check("ageRating").notEmpty(),
    check("privacySetting").notEmpty(),
    check("releaseDate").notEmpty(),
    check("runtime").notEmpty(),
    check("director").notEmpty(),
    check("trailerLink").notEmpty(),
    check("cast").notEmpty(),
    check("genres").notEmpty(),
  ],
  uploadMovie
);

router.patch(
  "/add_to_watch_list",
  isLoggedIn,
  [
    check("uid").isLength({ min: 24 }),
    check("movieId").notEmpty(),
    check("isApi").isBoolean(),
    check("title").isString(),
    check("description").isString(),
    check("src").isString(),
    check("genres").notEmpty(),
  ],
  addToWatchlist
);
router.patch(
  "/remove_from_watchlist",
  isLoggedIn,
  [check("uid").isLength({ min: 24 }), check("movieId").notEmpty()],
  removeFromWatchlist
);
router.patch(
  "/edit_movie",
  isLoggedIn,
  [
    check("uid").isLength({ min: 24 }),
    check("movieId").isLength({ min: 24 }),
    check("title").notEmpty(),
    check("description").notEmpty(),
    check("field").notEmpty(),
  ],
  editMovieInfo
);
router.patch(
  "/delete_movie",
  isLoggedIn,
  [check("uid").isLength({ min: 24 }), check("movieId").isLength({ min: 24 })],
  deleteMovie
);

export default router;
