import express from "express";
import { check } from "express-validator";

import {
  getAllUsers,
  getUserById,
  login,
  logout,
  signup,
} from "../controllers/user-controllers/index.js";

import { isLoggedIn } from "../middleware/user-middleware.js";
import { updateUser } from "../controllers/user-controllers/update-user.js";
import { updateUseravatar } from "../controllers/user-controllers/update-user-avatar.js";
import { getDummyMovieDetails } from "../controllers/user-controllers/get-dummy-movies-details.js";

const router = express.Router();

router.get("/get_dummy_movies/:type", getDummyMovieDetails);
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
  "/update_user_details",
  isLoggedIn,
  [check("uid").isLength({ min: 24 }), check("field").notEmpty()],
  updateUser
);

router.patch(
  "/update_user_avatar",
  isLoggedIn,
  [check("uid").isLength({ min: 24 }), check("action").notEmpty()],
  updateUseravatar
);

export default router;
