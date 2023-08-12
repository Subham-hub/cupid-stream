import mongoose from "mongoose";
import { validationResult } from "express-validator";

import User from "../../../models/user-model.js";
import { HttpError, messages } from "../../../utils/index.js";

export const blockUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(new HttpError(messages.inputError, 422));

  const { blockerUid, otherUid } = req.body;
  let blockerUser, otherUser;

  try {
    //getting both users
    blockerUser = await User.findById(blockerUid);
    otherUser = await User.findById(otherUid);
    if (!blockerUser || !otherUser)
      return next(new HttpError(messages.notFound, 404));
  } catch (e) {
    return next(new HttpError(messages.serverError, 500));
  }

  //checking for existing friend or friend request and removing
  const existingBlockerUserFriend = blockerUser.friends.find(
    (f) => f.uid.toString() === otherUid
  );
  const existingOtherUserFriend = otherUser.friends.find(
    (f) => f.uid.toString() === blockerUid
  );
  const existingBlockerUserFriendRequest = blockerUser.friendRequests.find(
    (f) => f.uid.toString() === otherUid
  );
  const existingOtherUserFriendRequest = otherUser.friendRequests.find(
    (f) => f.uid.toString() === blockerUid
  );

  if (existingBlockerUserFriend)
    blockerUser.friends = blockerUser.friends.filter(
      (r) => r.uid.toString() !== otherUid
    );
  if (existingOtherUserFriend)
    otherUser.friends = otherUser.friends.filter(
      (r) => r.uid.toString() !== blockerUid
    );
  if (existingBlockerUserFriendRequest)
    blockerUser.friendRequests = blockerUser.friendRequests.filter(
      (r) => r.uid.toString() !== otherUid
    );
  if (existingOtherUserFriendRequest)
    otherUser.friendRequests = otherUser.friendRequests.filter(
      (r) => r.uid.toString() !== blockerUid
    );

  // pushing usre object into blockerUser
  blockerUser.blocked.push({
    uid: otherUid,
    username: otherUser.username,
    avatar: otherUser.avatar,
  });

  //saving the users
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await blockerUser.save({ session });
    await otherUser.save({ session });
    await session.commitTransaction();
    res.status(200).json({ success: true, data: { blockerUser, otherUser } });
  } catch (e) {
    await session.abortTransaction();
    console.error(e);
    return next(new HttpError(messages.serverError, 500));
  } finally {
    session.endSession();
  }
};
