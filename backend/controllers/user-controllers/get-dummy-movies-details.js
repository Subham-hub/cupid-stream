import { HttpError, messages } from "../../utils/index.js";
import axios from "axios";

const genresArray = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

const formatMoviesData = (movies) =>
  movies.map((movie) => {
    const genres = movie.genre_ids.map((genreId) =>
      genresArray.find((g) => g.id === genreId)
    );

    return {
      movieId: movie.id,
      title: movie.title,
      description: movie.overview,
      thumbnail: {
        src: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
      },
      genres,
      isApi: true,
    };
  });

export const getDummyMovieDetails = async (req, res, next) => {
  const randomPage = Math.floor(Math.random() * 5) + 1;

  const popularUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=${randomPage}&sort_by=popularity.desc&with_origin_country=IN`;
  const nowPlayingdUrl = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${randomPage}&with_origin_country=IN`;
  const topRatedUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${randomPage}&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200&with_origin_country=IN`;
  const upComingUrl = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${randomPage}&with_origin_country=IN`;

  if (req.params.type !== "null") {
    const type = req.params.type;
    let url;
    if (type === "popular") url = popularUrl;
    if (type === "nowPlaying") url = nowPlayingdUrl;
    if (type === "topMovies") url = topRatedUrl;
    if (type === "upcoming") url = upComingUrl;

    try {
      const response = await axios.get(url, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_API}`,
        },
      });

      res.status(200).json(formatMoviesData(response.data.results));
    } catch (e) {
      console.log(e);
      return next(new HttpError(messages.serverError, 500));
    }
  } else {
    const apiUrls = [popularUrl, topRatedUrl, nowPlayingdUrl, upComingUrl];
    const fetchRequests = apiUrls.map((url) =>
      axios
        .get(url, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${process.env.TMDB_API}`,
          },
        })
        .then((response) => {
          if (response.status !== 200) {
            return next(new HttpError(messages.serverError, 500));
          }
          return response.data;
        })
        .catch((error) => {
          console.error("Error:", error.message);
          return next(new HttpError(messages.serverError, 500));
        })
    );

    Promise.all(fetchRequests)
      .then((responses) => {
        res
          .status(200)
          .json(responses.map((res) => formatMoviesData(res.results)));
      })
      .catch((e) => {
        console.error("Error:", e.message);
        return next(new HttpError(messages.serverError, 500));
      });
  }
};
