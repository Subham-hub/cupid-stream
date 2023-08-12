import mongoose from "mongoose";
import { validationResult } from "express-validator";

import User from "../../../models/user-model.js";
import { HttpError, messages } from "../../../utils/index.js";

export const unBlockUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(new HttpError(messages.inputError, 422));

  const { blockerUid, otherUid } = req.body;
  let blockerUser;

  try {
    //getting the user
    blockerUser = await User.findById(blockerUid);
    if (!blockerUser) return next(new HttpError(messages.notFound, 404));
  } catch (e) {
    return next(new HttpError(messages.serverError, 500));
  }

  const existingBlockerUserObj = blockerUser.blocked.find(
    (u) => u.uid.toString() === otherUid
  );
  if (!existingBlockerUserObj)
    return next(new HttpError("User is already unblocked on your end", 422));

  // removing user object from blockerUser
  blockerUser.blocked = blockerUser.blocked.filter(
    (u) => u.uid.toString() !== otherUid
  );

  //saving the users
  try {
    await blockerUser.save();
    res.status(200).json({ success: true, data: { blockerUser } });
  } catch (e) {
    console.error(e);
    return next(new HttpError(messages.serverError, 500));
  }
};
