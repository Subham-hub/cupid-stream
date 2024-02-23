import cloudinary from "cloudinary";
import { validationResult } from "express-validator";

import Movie from "../../models/movie-modal.js";
import User from "../../models/user-model.js";
import { HttpError, messages } from "../../utils/index.js";

export const editMovieInfo = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(new HttpError(messages.inputError, 422));

  const { uid, title, description, movieId, field } = req.body;

  try {
    const user = await User.findById(uid).select("-password -__v");
    const movie = await Movie.findById(movieId);
    if (!user || !movie) return next(new HttpError(messages.notFound, 404));

    const finderFn = (m) => m.movieId.toString() === movieId;
    const userModelObj = user.uploadedMovies.find(finderFn);
    const userModeIndex = user.uploadedMovies.indexOf(userModelObj);

    if (field[0] === "title") {
      user.uploadedMovies[userModeIndex].title = title;
      movie.title = title;
    }
    if (field[1] === "description") {
      user.uploadedMovies[userModeIndex].description = description;
      movie.description = description;
    }

    await user.save();
    await movie.save();
    res.status(200).json({ success: true });
  } catch (e) {
    console.error(e);
    return next(new HttpError(messages.serverError, 500));
  }
};
