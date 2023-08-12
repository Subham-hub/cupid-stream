import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: [true, "Email ID must be unique"],
  },
  role: { type: String, default: "user", enum: ["user", "admin"] },
  password: { type: String, required: true, minlength: 6 },
  uiTheme: { type: String, enum: ["light", "dark", "pink"] },
  avatar: { id: String, src: String },
  status: {
    type: String,
    default: "Offline",
    enum: ["Online", "Offline"],
  },
  uploadedMovies: [
    {
      movieId: { type: mongoose.Types.ObjectId, ref: "Movie" },
      title: String,
      description: String,
      thumnail: { id: String, src: String },
    },
  ],
  watchList: [
    {
      title: String,
      description: String,
      thumnail: { id: String, src: String },
      movieId: { type: mongoose.Types.ObjectId, ref: "Movie" },
      uploadedBy: {
        uid: { type: mongoose.Types.ObjectId, ref: "User" },
        username: String,
      },
    },
  ],
  watchHistory: [
    {
      movie: [{ type: mongoose.Types.ObjectId, ref: "Movie" }],
      watchedWith: [
        {
          uid: { type: mongoose.Types.ObjectId, ref: "User" },
          username: String,
        },
      ],
    },
  ],
  memories: [
    {
      madeWith: [{ type: mongoose.Types.ObjectId, ref: "User" }],
      content: [
        {
          user: { type: mongoose.Types.ObjectId, ref: "User" },
          text: String,
        },
      ],
    },
  ],
  friends: [
    {
      uid: { type: mongoose.Types.ObjectId },
      username: String,
      avatar: { id: String, src: String },
      status: {
        type: String,
        default: "Offline",
        enum: ["Online", "Offline"],
      },
    },
  ],
  friendRequests: [
    {
      uid: { type: mongoose.Types.ObjectId, ref: "User" },
      username: String,
      avatar: { id: String, src: String },
      requestType: { type: String, enum: ["incoming", "outgoing"] },
      status: {
        type: String,
        default: "Offline",
        enum: ["Online", "Offline"],
      },
    },
  ],
  blocked: [
    {
      uid: { type: mongoose.Types.ObjectId, ref: "User" },
      username: String,
      avatar: { id: String, src: String },
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isValidatedPassword = async function (userSendPassword) {
  return await bcrypt.compare(userSendPassword, this.password);
};

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};

export default mongoose.model("User", userSchema);
