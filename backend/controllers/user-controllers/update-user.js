import { validationResult } from "express-validator";

import User from "../../models/user-model.js";
import { HttpError, messages } from "../../utils/index.js";

export const updateUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(new HttpError(messages.inputError, 422));

  const { uid, field, newEmail, newUsername } = req.body;
  try {
    const user = await User.findById(uid).select("-password");
    if (!user) return next(new HttpError(messages.inputError, 404));
    const userDetails = await User.find().select("username email");

    for (let i = 0; i < userDetails.length; i++) {
      if (field.isUsername && userDetails[i].username === newUsername)
        return next(new HttpError("User name unavialable", 422));

      if (field.isEmail && userDetails[i].email === newEmail)
        return next(new HttpError("Email ID name unavialable", 422));
    }

    if (field.isEmail) user.email = newEmail;
    if (field.isUsername) user.username = newUsername;
    await user.save();
    res.status(200).json({ success: true, user });
  } catch (e) {
    console.log(e);
    return next(new HttpError(messages.serverError, 500));
  }
};
