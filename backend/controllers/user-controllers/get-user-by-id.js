import User from "../../models/user-model.js";
import { HttpError, messages } from "../../utils/index.js";

export const getUserById = async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.params.uid);
  } catch (e) {
    console.log(e);
    return next(new HttpError(messages.serverError, 500));
  }
  if (!user) return next(new HttpError(messages.inputError, 404));

  user.password = undefined;
  res.status(200).json(user);
};
