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
  movieDetails: [
    {
      movieId: String,
      title: String,
      description: String,
      thumbnail: { id: String, src: String },
      genres: [{ id: String, name: String }],
      category: {
        type: String,
        enum: ["uploadedMovies", "watchList"],
      },
      movieOrigin: { type: String, enum: ["user", "api"], default: "user" },
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
  createdAt: { type: Date, default: Date.now },
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
