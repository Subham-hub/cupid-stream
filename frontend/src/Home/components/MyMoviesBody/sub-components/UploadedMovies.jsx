import { useSelector } from "react-redux";
import {
  Button,
  CircularProgress,
  Grid,
  Input,
  Typography,
} from "@mui/material";

import MovieCard from "./MovieCard";
import { useEffect, useState } from "react";
import { useHttp } from "../../../../shared/hooks/http-hook";
import { notify, types } from "../../../../shared/utils/notification";

import classes from "./css/UploadedMovies.module.css";

const UploadedMovies = ({ movieCardBg, movieCardColor }) => {
  const [movies, setMovies] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState("");

  const { sendRequest, isLoading, error, clearError } = useHttp();
  const { uid } = useSelector((s) => s.userData);

  useEffect(() => {
    (async () => {
      try {
        const response = await sendRequest(
          `get_movies_by_uid/${uid}?page=${currentPage}&limit=${8}`
        );
        const { success, movies, paginationInfo } = response;
        if (success) {
          setMovies(movies);
          setPaginationInfo(paginationInfo);
        }
      } catch (e) {
        throw new Error(e.message);
      }
    })();
  }, [currentPage, sendRequest, uid]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= paginationInfo.totalPages)
      setCurrentPage(newPage);
  };

  const handlePageInputSubmit = (event) => {
    event.preventDefault();
    const newPage = parseInt(pageInput);
    if (!isNaN(newPage)) {
      handlePageChange(newPage);
      setPageInput("");
    }
  };

  useEffect(() => {
    if (!error) return;
    notify(types.ERROR, error);
    clearError();
  }, [error, clearError]);

  return (
    <div className={classes.movies}>
      {isLoading && (
        <div style={{ textAlign: "center" }}>
          <CircularProgress />
        </div>
      )}
      {!isLoading && (
        <Grid container spacing={4} justify="center">
          {[{ uploadCard: "true" }, ...movies].map((movie, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <MovieCard
                movieId={movie._id}
                title={movie.title}
                description={movie.description}
                src={movie.thumnail !== undefined && movie.thumnail.src}
                username={
                  movie.uploadedBy !== undefined && movie.uploadedBy.username
                }
                className={movie.uploadCard ? classes["upload-card"] : null}
                uploadCard={movie.uploadCard}
                style={{
                  backgroundColor: movieCardBg,
                  color: movieCardColor,
                }}
              />
            </Grid>
          ))}
        </Grid>
      )}
      {!isLoading && (
        <div
          className={classes.paginationControls}
          style={{ color: movieCardColor }}
        >
          <Button
            variant="contained"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Typography variant="h6" component="span" m="0 1rem">
            Page {currentPage} of {paginationInfo.totalPages}
          </Typography>
          <Button
            variant="contained"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === paginationInfo.totalPages}
          >
            Next
          </Button>
          <br />
          <br />
          <form onSubmit={handlePageInputSubmit}>
            <Input
              type="number"
              min="1"
              placeholder={currentPage}
              max={paginationInfo.totalPages}
              style={{ color: "inherit" }}
              onChange={(e) => setPageInput(e.target.value)}
            />
            <span className="invisible">.....</span>
            <Button variant="contained" type="submit" size="small">
              Go to Page
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UploadedMovies;
