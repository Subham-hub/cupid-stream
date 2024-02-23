import { validationResult } from "express-validator";

import User from "../../models/user-model.js";
import { HttpError, messages } from "../../utils/index.js";

export const addToWatchlist = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(new HttpError(messages.inputError, 422));

  const { movieId, uid, isApi, title, description, src, genres } = req.body;
  let user;
  try {
    user = await User.findById(uid).select("-password -__v");
    if (!user) return next(new HttpError(messages.notFound, 404));
  } catch (e) {
    console.error(e);
    return next(new HttpError(messages.serverError, 500));
  }
  const existingMovie = user.movieDetails.some(
    (m) => m.category === "watchList" && m.movieId == movieId
  );
  if (existingMovie)
    return next(new HttpError("The movie already exists in watchlist", 422));

  user.movieDetails.push({
    title,
    description,
    thumbnail: { id: "", src },
    genres,
    movieId,
    category: "watchList",
    movieOrigin: isApi ? "api" : "user",
  });

  try {
    await user.save();
    res.status(200).json({ success: true, user });
  } catch (e) {
    console.error(e);
    return next(new HttpError(messages.serverError, 500));
  }
};
