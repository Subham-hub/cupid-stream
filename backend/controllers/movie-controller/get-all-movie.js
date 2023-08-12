import Movie from "../../models/movie-modal.js";
import { HttpError, messages } from "../../utils/index.js";

export const getAllMovies = async (req, res, next) => {
  try {
    // const page = parseInt(req.query.page) || 1;
    // const limit = parseInt(req.query.limit) || 10;

    // const startIndex = (page - 1) * limit;
    // const endIndex = page * limit;

    // const totalMovies = await Movie.countDocuments();
    // const totalPages = Math.ceil(totalMovies / limit);

    // const movies = await Movie.find().skip(startIndex).limit(limit);

    // const paginationInfo = {
    //   currentPage: page,
    //   totalPages: totalPages,
    //   totalMovies: totalMovies,
    //   startIndex: startIndex + 1,
    //   endIndex: Math.min(endIndex, totalMovies),
    // };
    const movies = await Movie.find();

    res.status(200).json({ success: true, movies });
  } catch (e) {
    return next(new HttpError(messages.serverError, 500));
  }
};
