import express from "express";
import { check } from "express-validator";

import {
  addToWatchlist,
  getAllMovies,
  getMoviesByUid,
  removeFromWatchlist,
  uploadMovie,
} from "../controllers/movie-controller/index.js";
import { isLoggedIn } from "../middleware/user-middleware.js";

const router = express.Router();

router.get("/get_all_movies", getAllMovies);
router.get("/get_movies_by_uid/:uid", getMoviesByUid);

router.post(
  "/upload_movie",
  isLoggedIn,
  [
    check("uid").isLength({ min: 24 }),
    check("title").notEmpty(),
    check("description").notEmpty(),
  ],
  uploadMovie
);

router.patch(
  "/add_to_watch_list",
  isLoggedIn,
  [check("uid").isLength({ min: 24 }), check("movieId").isLength({ min: 24 })],
  addToWatchlist
);
router.patch(
  "/remove_from_watchlist",
  isLoggedIn,
  [check("uid").isLength({ min: 24 }), check("movieId").isLength({ min: 24 })],
  removeFromWatchlist
);

export default router;
