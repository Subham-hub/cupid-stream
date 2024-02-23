import Movie from "../../models/movie-modal.js";
import { HttpError, messages } from "../../utils/index.js";

export const getMovieByMovieId = async (req, res, next) => {
  const { movieId } = req.params;
  if (!movieId) return next(new HttpError("Invalid Movid ID", 422));
  try {
    const movie = await Movie.findById(movieId);
    res.status(200).json({ success: true, movie });
  } catch (e) {
    return next(new HttpError(messages.serverError, 500));
  }
};
