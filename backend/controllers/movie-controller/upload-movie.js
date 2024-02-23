import cloudinary from "cloudinary";
import { validationResult } from "express-validator";

import Movie from "../../models/movie-modal.js";
import User from "../../models/user-model.js";
import { HttpError, messages } from "../../utils/index.js";

export const uploadMovie = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(new HttpError(messages.inputError, 422));

  const {
    uid,
    title,
    description,
    language,
    country,
    ageRating,
    privacySetting,
    releaseDate,
    runtime,
    director,
    trailerLink,
  } = req.body;
  const genres = JSON.parse(req.body.genres);
  const cast = JSON.parse(req.body.cast);

  let user;
  try {
    user = await User.findById(uid).select("-password -__v");
    if (!user) return next(new HttpError(messages.notFound, 404));
  } catch (e) {
    console.error(e);
    return next(new HttpError(messages.serverError, 500));
  }

  const thumbnail = req.files.thumbnail;
  let thumbnailUploadResult;
  try {
    thumbnailUploadResult = await cloudinary.v2.uploader.upload(
      thumbnail.tempFilePath,
      {
        name: "thumbnail",
        folder: process.env.CLOUDINARY_FOLDER + "movie/thumbnail",
      }
    );
  } catch (e) {
    return next(new HttpError(messages.serverError, 500));
  }
  try {
    const movieObj = {
      title,
      description,
      language,
      country,
      ageRating,
      privacySetting,
      releaseDate,
      runtime,
      director,
      trailerLink,
      cast,
      genres,
      thumbnail: {
        id: thumbnailUploadResult.public_id,
        src: thumbnailUploadResult.secure_url,
      },
      uploadedBy: { uid, username: user.username },
    };
    const newMovie = await Movie.create(movieObj);
    user.movieDetails.push({
      movieId: newMovie._id,
      category: "uploadedMovies",
      ...movieObj,
    });
    await user.save();
    res.status(201).json({ success: true, newMovie, user });
  } catch (e) {
    console.error(e);
    return next(new HttpError(messages.serverError, 500));
  }
};
