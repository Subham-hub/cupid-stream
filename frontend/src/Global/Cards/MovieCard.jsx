import { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import WatchLaterSharpIcon from "@mui/icons-material/WatchLaterSharp";
import {
  Box,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  IconButton,
  Input,
  TextareaAutosize,
  Card,
  Button,
  Typography,
  CardMedia,
  CardActions,
} from "@mui/material";

import Modal from "../../shared/UIElements/Modal/Modal";
import WatchAloneModal from "../Modals/WatchAloneModal";
import { useHttp } from "../../shared/hooks/http-hook";
import { setData, updateData } from "../../shared/store/userDataSlice";
import { notify, types } from "../../shared/utils/notification";
import { useScreenWidth } from "../../shared/hooks/useScreenWidth";

import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import classes from "./MovieCard.module.css";
import CallMissedOutgoingOutlinedIcon from "@mui/icons-material/CallMissedOutgoingOutlined";
import { noImage } from "../../assets/images";

const MovieCard = ({
  movieId,
  title,
  description,
  src,
  genres,
  btn2,
  username,
  isApi = false,
}) => {
  const { isLoggedIn } = useSelector((s) => s.auth);
  const { uid, token } = useSelector((s) => s.userData);
  const { sendRequest, isLoading, error, clearError } = useHttp();
  const { screenWidth } = useScreenWidth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const editControlsInitalState = {
    title: false,
    description: false,
    btnState: true,
  };
  const [editMovieInfo, setEditInfo] = useState(editControlsInitalState);
  const dispatch = useDispatch();

  // watchAlone modal controls
  const [openWatchAloneModal, setOpenWatchAloneModal] = useState(false);
  const handleOpenWatchAloneModal = () => setOpenWatchAloneModal(true);
  const handleCloseWatchAloneModal = () => setOpenWatchAloneModal(false);

  //read more modal controls
  const [openReadMoreModal, setOpenReadMoreModal] = useState(false);
  const handleOpenReadMoreModal = () => setOpenReadMoreModal(true);
  const handleCloseReadMoreModal = () => setOpenReadMoreModal(false);

  // edit Modal controls
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleOpenEditModal = () => setOpenEditModal(true);
  const handleCloseEditModal = () => {
    setEditInfo(editControlsInitalState);
    setOpenEditModal(false);
  };

  //delete movie confirmation modal controls
  const [openDeleteConfirmModal, setOpenDeleteConfirmModal] = useState(false);
  const handleOpenDeleteConfirmModal = () => setOpenDeleteConfirmModal(true);
  const handleCloseDeleteConfirmModal = () => setOpenDeleteConfirmModal(false);

  const watchListHandler = async () => {
    if (isLoading) return;
    if (btn2 === "Go to Watchlist") return navigate("/my-movies");
    const apiEndPoint = btn2 ? "remove_from_watchlist" : "add_to_watch_list";
    const payload = { movieId, uid, isApi, title, description, src, genres };

    try {
      const response = await sendRequest(apiEndPoint, "PATCH", payload, token);
      dispatch(setData({ ...response.user, token }));
      console.log("apiEndPoint ", apiEndPoint);
      console.log("payload ", payload);
      const message = `Successfully ${btn2 ? "removed" : "added"} the movie ${
        btn2 ? "from " : "to"
      }  watch list`;
      notify(types.SUCCESS, message);
    } catch (e) {
      console.error(e);
    }
  };

  const editMovieHandler = async (data) => {
    if (!editMovieInfo.title && !editMovieInfo.description) return;
    if (editMovieInfo.title) {
      if (title === data.title)
        return notify(
          types.ERROR,
          "Please update the title or untick the title box"
        );
    }
    if (editMovieInfo.description) {
      if (description === data.description)
        return notify(
          types.ERROR,
          "Please update the description or untick the description box"
        );
    }
    const isTitle = editMovieInfo.title && "title";
    const isDescription = editMovieInfo.description && "description";
    const field = [isTitle, isDescription];
    try {
      const payload = {
        uid,
        movieId,
        title: data.title,
        description: data.description,
        field,
      };
      const response = await sendRequest("edit_movie", "PATCH", payload, token);
      if (response.success) {
        const dispatchPayload = {
          field: "uploadedMovies",
          type: "edit",
          newData: { ...payload },
        };
        dispatch(updateData(dispatchPayload));
        handleCloseEditModal();
        notify(
          types.SUCCESS,
          `Successfully changed ${
            field[0] === "title" && field[1] === "description"
              ? "both description and title"
              : !field[0]
              ? "description"
              : "title"
          }`
        );
      }
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const deleteMovieHandler = async () => {
    const payload = { uid, movieId };
    try {
      const response = await sendRequest(
        "delete_movie",
        "PATCH",
        payload,
        token
      );
      if (response.success) {
        const dispatchPayload = {
          field: "uploadedMovies",
          type: "delete",
          newData: movieId,
        };
        dispatch(updateData(dispatchPayload));
        handleCloseDeleteConfirmModal();
        notify(types.SUCCESS, "Successfully deleted the movie");
      }
    } catch (e) {
      throw new Error(e.message);
    }
  };

  useEffect(() => {
    if (!error) return;
    notify(types.ERROR, error);
    clearError();
  }, [error, clearError]);

  return (
    <Fragment>
      {/* delete movie confirmation modal */}
      <Modal
        open={openDeleteConfirmModal}
        handleClose={handleCloseDeleteConfirmModal}
        minWidth={screenWidth < 1000 ? "80%" : "auto"}
      >
        {isLoading && <CircularProgress />}
        {!isLoading && (
          <Box
            component="div"
            overflow="hidden"
            className={classes["modal-height-limit"]}
          >
            <Typography component="p" variant="h6">
              Are you sure you want to delete this movie?
            </Typography>
            <Typography
              component="p"
              variant="body2"
              color="error"
              gutterBottom
            >
              This action is irreversible
            </Typography>
            <Box component="div" mt="1rem">
              <Button
                variant="contained"
                color="secondary"
                onClick={deleteMovieHandler}
              >
                yes
              </Button>
              <span className="invisible">......</span>
              <Button
                variant="contained"
                color="success"
                onClick={handleCloseDeleteConfirmModal}
              >
                No
              </Button>
            </Box>
          </Box>
        )}
      </Modal>

      {/* edit movie modal */}
      <Modal
        open={openEditModal}
        handleClose={handleCloseEditModal}
        closeIcon
        minWidth={screenWidth < 1000 ? "80%" : "40%"}
      >
        {isLoading && <CircularProgress />}
        {!isLoading && (
          <div className={classes["modal-height-limit"]}>
            <Box
              overflow="hidden"
              component="form"
              onSubmit={handleSubmit(editMovieHandler)}
            >
              <Box component="div">
                <FormControlLabel
                  control={
                    <Checkbox
                      color="secondary"
                      onChange={(e) =>
                        setEditInfo((prevVal) => ({
                          title: e.target.checked,
                          description: prevVal.description,
                          btnState:
                            !editMovieInfo.description && !prevVal.btnState,
                        }))
                      }
                    />
                  }
                  label="Update Title"
                />
                <Input
                  fullWidth
                  style={{ color: "white", margin: "1rem auto" }}
                  defaultValue={title}
                  {...register("title")}
                />
              </Box>
              <Box component="div">
                <FormControlLabel
                  control={
                    <Checkbox
                      color="secondary"
                      onChange={(e) =>
                        setEditInfo((prevVal) => ({
                          title: prevVal.title,
                          description: e.target.checked,
                          btnState: !editMovieInfo.title && !prevVal.btnState,
                        }))
                      }
                    />
                  }
                  label="Update Description"
                />
                <TextareaAutosize
                  className={classes["edit-modal-textarea"]}
                  defaultValue={description}
                  {...register("description")}
                />{" "}
              </Box>
              <FormControl fullWidth>
                <Button
                  disabled={editMovieInfo.btnState}
                  variant="contained"
                  color="secondary"
                  type="submit"
                >
                  Confirm
                </Button>
              </FormControl>
            </Box>
          </div>
        )}
      </Modal>

      {/* read more modal */}
      <Modal
        open={openReadMoreModal}
        handleClose={handleCloseReadMoreModal}
        closeIcon
        minWidth={screenWidth < 1000 ? "80%" : "auto"}
      >
        <div className={classes["modal-height-limit"]}>{description}</div>
      </Modal>

      {/*watch alone modal */}
      <Modal
        open={openWatchAloneModal}
        handleClose={handleCloseWatchAloneModal}
        minWidth={screenWidth < 1000 ? "80%" : "auto"}
        maxHeight="70%"
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
              onClick={handleCloseWatchAloneModal}
            >
              Let&#39;s Save the Fun for Later 🕒🎉
            </Button>
          </div>
        )}
        {isLoggedIn && (
          <WatchAloneModal
            movieId={movieId}
            title={title}
            description={description}
            src={src}
            genres={genres}
            isApi={isApi}
            handleCloseWatchAloneModal={handleCloseWatchAloneModal}
            handleOpenReadMoreModal={handleOpenReadMoreModal}
          />
        )}
      </Modal>

      <Box minHeight={200}>
        <Card className={classes.card}>
          <div className={classes.thumbnailContainer}>
            <CardMedia
              className={classes.media}
              component="img"
              loading="lazy"
              image={src.includes("null") ? noImage : src || noImage}
              alt="Image Cannot Be Loaded"
            />
            <div className={classes.overlay}>
              <Typography
                variant="h6"
                className={classes.title}
                textAlign="center"
              >
                {title}
              </Typography>

              {username && (
                <Typography
                  variant="body2"
                  color="whitesmoke"
                  className={classes.username}
                >
                  Uploaded by: {username}
                </Typography>
              )}
              <CardActions className={classes.actions}>
                <IconButton
                  onClick={handleOpenWatchAloneModal}
                  style={{ color: "#ffffff" }}
                >
                  <PlayCircleFilledWhiteOutlinedIcon fontSize="large" />
                </IconButton>
                {isLoading && (
                  <div style={{ marginLeft: "auto", marginRight: "2.3rem" }}>
                    <CircularProgress />
                  </div>
                )}
                {!isLoading && btn2 && (
                  <IconButton
                    onClick={watchListHandler}
                    disabled={isLoading}
                    style={{ color: "#ffffff" }}
                  >
                    {btn2 === "Go to Watchlist" ? (
                      <CallMissedOutgoingOutlinedIcon
                        fontSize="large"
                        titleAccess="Goto Watchlist"
                      />
                    ) : (
                      <RemoveCircleOutlineIcon
                        fontSize="large"
                        titleAccess="Remove from watchlist"
                      />
                    )}
                  </IconButton>
                )}
                {!isLoading &&
                pathname !== "/my-movies" &&
                btn2 !== "Go to Watchlist" ? (
                  <IconButton
                    onClick={watchListHandler}
                    disabled={isLoading}
                    style={{ color: "white" }}
                  >
                    <WatchLaterSharpIcon fontSize="large" />
                  </IconButton>
                ) : (
                  !isLoading &&
                  !btn2 && (
                    <>
                      <Button
                        size="small"
                        disabled={isLoading}
                        style={{ marginLeft: "auto" }}
                        color="inherit"
                        onClick={handleOpenEditModal}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        disabled={isLoading}
                        style={{ marginRight: "2rem" }}
                        color="inherit"
                        onClick={handleOpenDeleteConfirmModal}
                      >
                        Delete
                      </Button>
                    </>
                  )
                )}
              </CardActions>
              <ul>
                {genres &&
                  genres.map((g) => (
                    <li
                      key={g.id}
                      style={{ display: "inline-block", marginRight: 8 }}
                    >
                      <Typography
                        component="p"
                        variant="caption"
                        textAlign="center"
                      >
                        {g.name.toUpperCase()}
                      </Typography>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </Card>
      </Box>
    </Fragment>
  );
};

export default MovieCard;
