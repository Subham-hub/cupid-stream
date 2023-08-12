import User from "../../models/user-model.js";
import { HttpError, messages } from "../../utils/index.js";

export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (e) {
    return next(new HttpError(messages.serverError, 500));
  }
  if (users.length === 0) return next(new HttpError(messages.notFound, 404));
  res.status(200).json(users);
};
