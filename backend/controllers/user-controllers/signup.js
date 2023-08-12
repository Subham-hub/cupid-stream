import { validationResult } from "express-validator";

import User from "../../models/user-model.js";
import { cookieToken, HttpError, messages } from "../../utils/index.js";

export const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(new HttpError(messages.inputError, 422));

  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return next(
        new HttpError("Account already exists, please login instead", 422)
      );
  } catch (e) {
    return next(new HttpError(messages.serverError, 500));
  }

  try {
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
