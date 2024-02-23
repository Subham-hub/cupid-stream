import { validationResult } from "express-validator";

import User from "../../models/user-model.js";
import { cookieToken, HttpError, messages } from "../../utils/index.js";

export const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(new HttpError(messages.inputError, 422));

  const { username, email, password } = req.body;

  try {
    const existingUserEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });

    if (existingUserEmail)
      return next(
        new HttpError("Email already exists, please login instead", 422)
      );
    if (existingUsername)
      return next(new HttpError("Username already exists", 422));

    const newUser = await User.create({
      username,
      email,
      password,
    });
    cookieToken(newUser, res);
  } catch (e) {
    return next(new HttpError(messages.serverError, 500));
  }
};
