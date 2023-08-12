import cloudinary from "cloudinary";
import { validationResult } from "express-validator";

import Movie from "../../models/movie-modal.js";
import User from "../../models/user-model.js";
import { HttpError, messages } from "../../utils/index.js";

export const removeFromWatchlist = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(new HttpError(messages.inputError, 422));

  const { uid, movieId } = req.body;
  let user;
  try {
    user = await User.findById(uid).select("-password -__v");
    if (!user) return next(new HttpError(messages.notFound, 404));
  } catch (e) {
    return next(new HttpError(messages.serverError, 500));
  }

  const existingMovie = user.watchList.find(
    (m) => m.movieId.toString() === movieId
  );
  if (!existingMovie)
    return next(new HttpError("The movie have been already removed", 404));

  user.watchList = user.watchList.filter(
    (m) => m.movieId.toString() !== movieId
  );

  try {
    await user.save();
    res.status(200).json({ success: true, user });
  } catch (e) {
    return next(new HttpError(messages.serverError, 500));
  }
};
