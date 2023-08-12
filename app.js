import "dotenv/config";

import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import cloudinary from "cloudinary";

import userRoutes from "./backend/routes/users-route.js";
import messageRoutes from "./backend/routes/messages-route.js";
import movieRoutes from "./backend/routes/movie-routes.js";
import HttpError from "./backend/utils/http-error.js";
import {
  sendMessage,
  updateTheme,
} from "./backend/socket-controllers/index.js";

const app = express();
const httpServer = createServer(app);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true, tempFileDir: "./temp" }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  })
);
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

app.use("/api/v1", userRoutes);
app.use("/api/v1", messageRoutes);
app.use("/api/v1", movieRoutes);

app.use(() => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
  },
}).on("connection", (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log("User with id: " + socket.id + " joined room: " + data);
  });

  sendMessage(socket);
  updateTheme(socket);

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

export default httpServer;
