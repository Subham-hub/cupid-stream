import express from "express";
import { check } from "express-validator";

import {
  addToWatchlist,
  getAllMovies,
  getMovieByMovieId,
  getMoviesByUid,
  removeFromWatchlist,
} from "../controllers/movie-controller/index.js";
import { isLoggedIn } from "../middleware/user-middleware.js";

const router = express.Router();

router.get("/get_all_movies", getAllMovies);
router.get("/get_movies_by_uid/:uid", isLoggedIn, getMoviesByUid);
router.get("/get_movies_by_movieId/:movieId", isLoggedIn, getMovieByMovieId);

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

export default router;
