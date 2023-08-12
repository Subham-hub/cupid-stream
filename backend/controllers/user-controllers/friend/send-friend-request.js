import mongoose from "mongoose";
import { validationResult } from "express-validator";

import User from "../../../models/user-model.js";
import { HttpError, messages } from "../../../utils/index.js";

export const sendFriendRequest = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(new HttpError(messages.inputError, 422));

  const { senderUid, recieverUid } = req.body;
  let senderUser, recieverUser;

  try {
    //getting both users
    senderUser = await User.findById(senderUid);
    recieverUser = await User.findById(recieverUid);
    if (!senderUser || !recieverUser)
      return next(new HttpError(messages.notFound, 404));
  } catch (e) {
    return next(new HttpError(messages.serverError, 500));
  }

  //checking for existing request
  const existingSenderRequest = senderUser.friendRequests.find(
    (r) => r.uid.toString() === recieverUid
  );
  const existingRecieverRequest = recieverUser.friendRequests.find(
    (r) => r.uid.toString() === senderUid
  );
  if (existingSenderRequest || existingRecieverRequest)
    return next(new HttpError("Friend request already exists", 422));

  //pushing request objects to both users accordingly
  senderUser.friendRequests.push({
    uid: recieverUid,
    username: recieverUser.username,
    avatar: recieverUser.avatar,
    status: recieverUser.status,
    requestType: "outgoing",
  });
  recieverUser.friendRequests.push({
    uid: senderUid,
    username: senderUser.username,
    avatar: senderUser.avatar,
    status: senderUser.status,
    requestType: "incoming",
  });

  //saving the users
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await senderUser.save({ session });
    await recieverUser.save({ session });
    await session.commitTransaction();
    res.status(200).json({ success: true, data: { senderUser, recieverUser } });
  } catch (e) {
    await session.abortTransaction();
    console.error(e);
    return next(new HttpError(messages.serverError, 500));
  } finally {
    session.endSession();
  }
};
