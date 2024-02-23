import { validationResult } from "express-validator";

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

  const existingMovie = user.movieDetails.some(
    (m) => m.category === "watchList" && m.movieId.toString() === movieId
  );
  if (!existingMovie)
    return next(new HttpError("The movie have been already removed", 404));

  user.movieDetails = user.movieDetails.filter(
    (m) => !(m.category === "watchList" && m.movieId == movieId)
  );

  try {
    await user.save();
    res.status(200).json({ success: true, user });
  } catch (e) {
    return next(new HttpError(messages.serverError, 500));
  }
};
