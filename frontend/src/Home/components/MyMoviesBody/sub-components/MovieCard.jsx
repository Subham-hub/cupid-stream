import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CircularProgress } from "@mui/material";

import Modal from "../../../../shared/UIElements/Modal/Modal";
import MovieCardModal from "./MovieCardModal";
import { useHttp } from "../../../../shared/hooks/http-hook";
import { setData } from "../../../../shared/store/userDataSlice";
import { notify, types } from "../../../../shared/utils/notification";

import classes from "./css/MovieCard.module.css";

const MovieCard = ({
  movieId,
  title,
  description,
  src,
  style,
  className,
  btn2,
  uploadCard = false,
  username,
}) => {
  const { isLoggedIn } = useSelector((s) => s.auth);
  const { uid, token } = useSelector((s) => s.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const [openSearchFriends, setOpenSearchFriends] = useState(false);
  const handleOpenSearchFriends = () => setOpenSearchFriends(true);
  const handleCloseSearchFriends = () => setOpenSearchFriends(false);
  const { sendRequest, isLoading, error, clearError } = useHttp();

  const watchListHandler = async () => {
    if (!isLoggedIn) return handleOpenSearchFriends();
    if (isLoading) return;
    if (btn2 === "Go to Watchlist") return navigate("/my-movies");
    const apiEndPoint = btn2 ? "remove_from_watchlist" : "add_to_watch_list";

    try {
      const response = await sendRequest(
        apiEndPoint,
        "PATCH",
        { movieId, uid },
        { Authorization: `Bearer ${token}` }
      );
      if (response.success) {
        dispatch(setData({ ...response.user, token }));
        const message = `Successfully ${btn2 ? "removed" : "added"} the movie ${
          btn2 ? "from " : "to"
        }  watch list`;
        notify(types.SUCCESS, message);
      }
    } catch (e) {
      throw new Error(e);
    }
  };

  useEffect(() => {
    if (!error) return;
    notify(types.ERROR, error);
    clearError();
  }, [error, clearError]);

  return (
    <>
      <Modal
        open={openSearchFriends}
        handleClose={handleCloseSearchFriends}
        width={isLoggedIn ? "fit-content" : 400}
        bgcolor="#333"
        borderRadius={8}
        color="#fff"
      >
        {!isLoggedIn && (
          <div className={classes.container}>
            <Typography variant="h5" className={classes.heading} gutterBottom>
              Time to Dive In!🚀
            </Typography>
            <Typography variant="h6" className={classes.heading} gutterBottom>
              Register and Secure the Fun Zone 🔐
            </Typography>
            <Button
              size="large"
              color="success"
              variant="contained"
              className={classes.closeButton}
              onClick={() => navigate("/auth/signup")}
            >
              Count Me In! 🎮🙌
            </Button>
            <br />
            <br />
            <Button
              size="large"
              color="secondary"
              variant="contained"
              className={classes.button}
              onClick={handleCloseSearchFriends}
            >
              Let&#39;s Save the Fun for Later 🕒🎉
            </Button>
          </div>
        )}
        {isLoggedIn && (
          <MovieCardModal handleCloseSearchFriends={handleCloseSearchFriends} />
        )}
      </Modal>
      {uploadCard ? (
        <Card
          onClick={() => navigate("/upload-movie")}
          sx={{ maxWidth: 345, height: 279 }}
          style={{ cursor: "pointer", ...style }}
        >
          <CardContent style={{ textAlign: "center", marginTop: "4.5rem" }}>
            <Typography gutterBottom variant="h5">
              +
            </Typography>
            <Typography gutterBottom variant="h5" component="p">
              Upload a movie
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <div className={className}>
          <Card sx={{ maxWidth: 345 }} style={style}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image={src}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="p">
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
              <Typography variant="overline" color="text.secondary">
                Uploaded By: {username}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                onClick={handleOpenSearchFriends}
                size="small"
                color="inherit"
              >
                Watch
              </Button>
              {isLoading && (
                <div style={{ marginLeft: "auto", marginRight: "2.3rem" }}>
                  <CircularProgress />
                </div>
              )}
              {!isLoading && btn2 && (
                <Button
                  size="small"
                  onClick={watchListHandler}
                  disabled={isLoading}
                  style={{ marginLeft: "auto", marginRight: "3rem" }}
                  color="inherit"
                >
                  {btn2}
                </Button>
              )}
              {!isLoading &&
              pathname !== "/my-movies" &&
              btn2 !== "Go to Watchlist" ? (
                <Button
                  size="small"
                  onClick={watchListHandler}
                  disabled={isLoading}
                  style={{ marginLeft: "auto", marginRight: "3rem" }}
                  color="inherit"
                >
                  Add to Watch Later
                </Button>
              ) : (
                !isLoading &&
                !btn2 && (
                  <>
                    <Button
                      size="small"
                      disabled={isLoading}
                      style={{ marginLeft: "auto" }}
                      color="inherit"
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      disabled={isLoading}
                      style={{ marginRight: "2rem" }}
                      color="inherit"
                    >
                      Delete
                    </Button>
                  </>
                )
              )}
            </CardActions>
          </Card>
        </div>
      )}
    </>
  );
};

export default MovieCard;
