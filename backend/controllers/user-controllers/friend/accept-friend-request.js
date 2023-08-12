import mongoose from "mongoose";
import { validationResult } from "express-validator";

import User from "../../../models/user-model.js";
import { HttpError, messages } from "../../../utils/index.js";

export const acceptFriendRequest = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(new HttpError(messages.inputError, 422));

  const { accepterUid, requestSenderUid } = req.body;
  let accepterUser, requestSenderUser;

  try {
    //getting both users
    accepterUser = await User.findById(accepterUid);
    requestSenderUser = await User.findById(requestSenderUid);
    if (!accepterUser || !requestSenderUser)
      return next(new HttpError(messages.notFound, 404));
  } catch (e) {
    return next(new HttpError(messages.serverError, 500));
  }

  //checking for existing friend
  const existingAUFriend = accepterUser.friends.find(
    (f) => f.uid.toString() === requestSenderUid
  );
  const existingRUFriend = requestSenderUser.friends.find(
    (f) => f.uid.toString() === accepterUid
  );
  if (existingAUFriend || existingRUFriend) {
    const errorMessage = `${requestSenderUser.username} already exists as friend`;
    return next(new HttpError(errorMessage, 422));
  }

  //checking for existing friend request
  const existingAccepterUserRequest = accepterUser.friendRequests.find(
    (r) => r.uid.toString() === requestSenderUid
  );
  const existingRecieverUserRequest = requestSenderUser.friendRequests.find(
    (r) => r.uid.toString() === accepterUid
  );
  if (!existingAccepterUserRequest || !existingRecieverUserRequest)
    return next(new HttpError("Friend request doesn't exist", 422));

  //checking if correct user accepts the request
  if (existingAccepterUserRequest.requestType !== "incoming")
    return next(new HttpError("Wrong user cannot accept friend request", 422));

  //filtering out request objects from both users accordingly
  accepterUser.friendRequests = accepterUser.friendRequests.filter(
    (r) => r.uid.toString() !== requestSenderUid
  );
  requestSenderUser.friendRequests = requestSenderUser.friendRequests.filter(
    (r) => r.uid.toString() !== accepterUid
  );

  //pushing friend objects to both users accordingly
  accepterUser.friends.push({
    uid: requestSenderUid,
    username: requestSenderUser.username,
    avatar: requestSenderUser.avatar,
    status: requestSenderUser.status,
  });
  requestSenderUser.friends.push({
    uid: accepterUid,
    username: accepterUser.username,
    avatar: accepterUser.avatar,
    status: accepterUser.status,
  });

  //saving the users
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await accepterUser.save({ session });
    await requestSenderUser.save({ session });
    await session.commitTransaction();
    res
      .status(200)
      .json({ success: true, data: { accepterUser, requestSenderUser } });
  } catch (e) {
    await session.abortTransaction();
    return next(new HttpError(messages.serverError, 500));
  } finally {
    session.endSession();
  }
};
