import mongoose from "mongoose";
import { validationResult } from "express-validator";

import User from "../../../models/user-model.js";
import { HttpError, messages } from "../../../utils/index.js";

export const removeFriend = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(new HttpError(messages.inputError, 422));

  const { removerUid, otherUid } = req.body;
  let removerUser, otherUser;

  try {
    //getting both users
    removerUser = await User.findById(removerUid);
    otherUser = await User.findById(otherUid);
    if (!removerUser || !otherUser)
      return next(new HttpError(messages.notFound, 404));
  } catch (e) {
    return next(new HttpError(messages.serverError, 500));
  }

  //checking for existing friend
  const existingRemoverUserFriend = removerUser.friends.find(
    (f) => f.uid.toString() === otherUid
  );
  const existingOtherUserFriend = otherUser.friends.find(
    (f) => f.uid.toString() === removerUid
  );
  if (!existingRemoverUserFriend || !existingOtherUserFriend) {
    const errorMessage = `${otherUser.username} doesn't exists as friend`;
    return next(new HttpError(errorMessage, 422));
  }

  //filtering out friend objects from both users accordingly
  removerUser.friends = removerUser.friends.filter(
    (r) => r.uid.toString() !== otherUid
  );
  otherUser.friends = otherUser.friends.filter(
    (r) => r.uid.toString() !== removerUid
  );

  //saving the users
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await removerUser.save({ session });
    await otherUser.save({ session });
    await session.commitTransaction();
    res.status(200).json({ success: true, data: { removerUser, otherUser } });
  } catch (e) {
    await session.abortTransaction();
    console.error(e);
    return next(new HttpError(messages.serverError, 500));
  } finally {
    session.endSession();
  }
};
