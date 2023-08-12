import cloudinary from "cloudinary";
import { validationResult } from "express-validator";

import Movie from "../../models/movie-modal.js";
import User from "../../models/user-model.js";
import { HttpError, messages } from "../../utils/index.js";

export const uploadMovie = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(new HttpError(messages.inputError, 422));

  const { uid, title, description } = req.body;

  let user;
  try {
    user = await User.findById(uid).select("-password -__v");
    if (!user) return next(new HttpError(messages.notFound, 404));
  } catch (e) {
    return next(new HttpError(messages.serverError, 500));
  }

  let thumnail = req.files.thumnail;
  let thumnailUploadResult;
  try {
    thumnailUploadResult = await cloudinary.v2.uploader.upload(
      thumnail.tempFilePath,
      {
        name: "thumnail",
        folder: process.env.CLOUDINARY_FOLDER + "movie/thumnail",
      }
    );
  } catch (e) {
    return next(new HttpError(messages.serverError, 500));
  }
  try {
    const movieObj = {
      title,
      description,
      thumnail: {
        id: thumnailUploadResult.public_id,
        src: thumnailUploadResult.secure_url,
      },
      uploadedBy: { uid, username: user.username },
    };
    const newMovie = await Movie.create(movieObj);
    user.uploadedMovies.push({ movieId: newMovie._id, ...movieObj });
    await user.save();
    res.json({ success: true, newMovie, user });
  } catch (e) {
    return next(new HttpError(messages.serverError, 500));
  }
};
