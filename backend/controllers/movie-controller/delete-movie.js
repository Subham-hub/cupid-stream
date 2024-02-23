import cloudinary from "cloudinary";
import { validationResult } from "express-validator";

import Movie from "../../models/movie-modal.js";
import User from "../../models/user-model.js";
import { HttpError, messages } from "../../utils/index.js";

export const deleteMovie = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(new HttpError(messages.inputError, 422));

  const { uid, movieId } = req.body;

  try {
    const user = await User.findById(uid).select("-password -__v");
    const movie = await Movie.findById(movieId);
    if (!user || !movie) return next(new HttpError(messages.notFound, 404));

    user.movieDetails = user.movieDetails.filter((m) => m.movieId !== movieId);

    if (movie.thumbnail.id)
      await cloudinary.v2.uploader.destroy(movie.thumbnail.id);
    await Movie.findByIdAndDelete(movieId);
    await user.save();
    res.status(200).json({ success: true });
  } catch (e) {
    console.error(e);
    return next(new HttpError(messages.serverError, 500));
  }
};
