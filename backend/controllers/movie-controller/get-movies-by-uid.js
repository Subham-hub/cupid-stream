import Movie from "../../models/movie-modal.js";
import { HttpError, messages } from "../../utils/index.js";

export const getMoviesByUid = async (req, res, next) => {
  const { uid } = req.params;
  if (!uid) return next(new HttpError("Invalid UID", 422));
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const totalMovies = await Movie.countDocuments({ "uploadedBy.uid": uid });
    const totalPages = Math.ceil(totalMovies / limit);
    const movies = await Movie.find({ "uploadedBy.uid": uid })
      .skip(startIndex)
      .limit(limit);

    const paginationInfo = {
      currentPage: page,
      totalPages: totalPages,
      totalMovies: totalMovies,
      startIndex: startIndex + 1,
      endIndex: Math.min(endIndex, totalMovies),
    };

    res.status(200).json({ success: true, movies, paginationInfo });
  } catch (e) {
    return next(new HttpError(messages.serverError, 500));
  }
};
