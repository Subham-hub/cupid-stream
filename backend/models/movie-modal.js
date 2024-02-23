import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  language: { type: String, required: true },
  country: { type: String, required: true },
  ageRating: { type: String, required: true },
  privacySetting: { type: String, required: true },
  releaseDate: { type: String, required: true },
  runtime: { type: String, required: true },
  director: { type: String, required: true },
  trailerLink: { type: String, required: true },
  cast: { type: Array, required: true },
  genres: [{ id: String, name: String }],
  thumbnail: { id: String, src: String },
  // video: { id: String, src: String, required: true },
  uploadedBy: {
    uid: { type: mongoose.Types.ObjectId, ref: "User" },
    username: String,
  },
});

export default mongoose.model("Movie", movieSchema);
