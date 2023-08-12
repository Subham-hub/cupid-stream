import express from "express";
import { check } from "express-validator";

import {
  acceptFriendRequest,
  blockUser,
  getAllUsers,
  getUserById,
  login,
  logout,
  removeFriend,
  sendFriendRequest,
  signup,
  unBlockUser,
} from "../controllers/user-controllers/index.js";

import { isLoggedIn } from "../middleware/user-middleware.js";

const router = express.Router();

router.get("/get_all_users", isLoggedIn, getAllUsers);
router.get("/get_user/:uid", isLoggedIn, getUserById);

router.post(
  "/signup",
  [
    check("username").notEmpty().isLength({ min: 4 }),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  signup
);

router.post(
  "/login",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  login
);

router.get("/logout", isLoggedIn, logout);

router.patch(
  "/send_friend_request",
  isLoggedIn,
  [
    check("senderUid").isLength({ min: 24 }),
    check("recieverUid").isLength({ min: 24 }),
  ],
  sendFriendRequest
);

router.patch(
  "/accept_friend_request",
  isLoggedIn,
  [
    check("accepterUid").isLength({ min: 24 }),
    check("requestSenderUid").isLength({ min: 24 }),
  ],
  acceptFriendRequest
);

router.patch(
  "/remove_friend",
  isLoggedIn,
  [
    check("removerUid").isLength({ min: 24 }),
    check("otherUid").isLength({ min: 24 }),
  ],
  removeFriend
);

router.patch(
  "/block_user",
  isLoggedIn,
  [
    check("blockerUid").isLength({ min: 24 }),
    check("otherUid").isLength({ min: 24 }),
  ],
  blockUser
);

router.patch(
  "/unblock_user",
  isLoggedIn,
  [
    check("blockerUid").isLength({ min: 24 }),
    check("otherUid").isLength({ min: 24 }),
  ],
  unBlockUser
);

export default router;
