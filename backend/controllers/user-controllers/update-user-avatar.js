import cloudinary from "cloudinary";
import { validationResult } from "express-validator";

import User from "../../models/user-model.js";
import { HttpError, messages } from "../../utils/index.js";

export const updateUseravatar = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(new HttpError(messages.inputError, 422));
  let user;
  try {
    user = await User.findById(req.body.uid).select("-password");
    if (!user) return next(new HttpError(messages.notFound, 404));
  } catch (e) {
    console.log(e);
    return next(new HttpError(messages.serverError, 500));
  }

  const { update, remove } = JSON.parse(req.body.action);
  if (update) {
    let avatar = req.files.avatar;
    if (!avatar) return next(new HttpError("No file found", 404));
    if (user.avatar.id) await cloudinary.v2.uploader.destroy(user.avatar.id);
    let avatarUploadResult;
    try {
      avatarUploadResult = await cloudinary.v2.uploader.upload(
        avatar.tempFilePath,
        {
          name: "avatar",
          folder: process.env.CLOUDINARY_FOLDER + "avatar",
        }
      );
      user.avatar.id = avatarUploadResult.public_id;
      user.avatar.src = avatarUploadResult.secure_url;
      await user.save();
    } catch (e) {
      console.log(e);
      return next(new HttpError(messages.serverError, 500));
    }
  } else if (remove) {
    try {
      if (!user.avatar.id) return next(new HttpError("No Image exists", 404));
      await cloudinary.v2.uploader.destroy(user.avatar.id);
      user.avatar = null;
      await user.save();
    } catch (e) {
      console.log(e);
      return next(new HttpError(messages.serverError, 500));
    }
  }
  res.status(200).json({ success: true, avatar: user.avatar });
};
