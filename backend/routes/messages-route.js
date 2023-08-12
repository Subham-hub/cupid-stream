import express from "express";

import { getMessageById } from "../controllers/message-controllers/index.js";
import { isLoggedIn } from "../middleware/user-middleware.js";

const router = express.Router();

// router.get('/:mid', isLoggedIn, getMessageById)

export default router;
