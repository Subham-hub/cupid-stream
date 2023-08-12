import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  // video: { id: String, src: String, required: true },
  thumnail: { id: String, src: String },
  uploadedBy: {
    uid: { type: mongoose.Types.ObjectId, ref: "User" },
    username: String,
  },
});

export default mongoose.model("Movie", movieSchema);
