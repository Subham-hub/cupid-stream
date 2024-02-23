import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import classes from "./MovieUploader.module.css";
import { setData } from "../../shared/store/userDataSlice";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { notify, types } from "../../shared/utils/notification";
import MovieUploaderFields from "../components/MovieUploader/MovieUploaderFields";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { useHttp } from "../../shared/hooks/http-hook";
import { useNavigate } from "react-router-dom";

const MovieUploader = () => {
  const {
    bgColor: { primaryBG, primaryBtnBG },
    textColor: { secondaryText },
  } = useSelector((s) => s.themeSlice);
  const { uid, token } = useSelector((s) => s.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { sendRequest, isLoading, error, clearError } = useHttp();

  const [isSubmitted, setIsSubmitted] = useState({ state: false, in: "" });
  const [page1, setPage1] = useState(true);

  const [cast, setCast] = useState([]);
  const [thumbnail, setThumbnail] = useState();
  const [releaseDate, setReleaseDate] = useState();
  const [runtime, setRuntime] = useState();
  const [language, setLanguage] = useState();
  const [country, setCountry] = useState();
  const [ageRating, setAgeRating] = useState();
  const [privacySetting, setPrivacySetting] = useState();
  const [genres, setGenres] = useState([]);

  const onSubmit = async (data) => {
    if (
      !releaseDate ||
      !runtime ||
      !language ||
      !country ||
      !ageRating ||
      !privacySetting ||
      (page1 && setPage1(false))
    )
      return;

    if (cast.length === 0 || genres.length === 0 || !thumbnail) return;

    const formData = new FormData();
    formData.append("uid", uid);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("language", language);
    formData.append("country", country);
    formData.append("ageRating", ageRating);
    formData.append("privacySetting", privacySetting);
    formData.append("releaseDate", releaseDate);
    formData.append("runtime", runtime);
    formData.append("director", data.director);
    formData.append("trailerLink", data.trailerLink);
    formData.append("cast", JSON.stringify(cast));
    formData.append("genres", JSON.stringify(genres));
    formData.append("thumbnail", thumbnail);

    try {
      const response = await sendRequest(
        "upload_movie",
        "POST",
        formData,
        token
      );
      if (response.success) {
        dispatch(setData({ ...response.user, token }));
        notify(types.SUCCESS, "Successfully uploaded the movie");
        navigate("/my-movies");
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
    <>
      <Box
        className={classes.movieUploader}
        minHeight="74vh"
        pt={3}
        bgcolor={primaryBG}
      >
        <Typography
          variant="h3"
          pb={page1 ? 3 : 0}
          textAlign="center"
          color={secondaryText}
        >
          UPLOAD A MOVIE
        </Typography>
        <Container maxWidth="md">
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {!page1 && (
              <Button
                style={{ backgroundColor: primaryBtnBG }}
                startIcon={<KeyboardDoubleArrowLeftIcon />}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => setPage1(true)}
              >
                Previous Page
              </Button>
            )}
            <MovieUploaderFields
              page1={page1}
              setPage1={setPage1}
              hookErrors={errors}
              isSubmitted={isSubmitted}
              register={register}
              onSendExtraData={(data) => {
                if (!page1) {
                  setThumbnail(data.thumbnail);
                  setCast(data.cast);
                  setGenres(data.genres);
                }
                if (page1) {
                  setLanguage(data.language);
                  setReleaseDate(data.releaseDate);
                  setRuntime(data.runtime);
                  setAgeRating(data.ageRating);
                  setCountry(data.country);
                  setPrivacySetting(data.privacySetting);
                }
              }}
            />

            {!page1 && (
              <Button
                style={{ backgroundColor: primaryBtnBG }}
                startIcon={!isLoading && <CloudUploadIcon />}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isLoading}
                onClick={() => setIsSubmitted({ state: true, in: "page2" })}
              >
                {isLoading ? <CircularProgress color="inherit" /> : "Upload"}
              </Button>
            )}
            {page1 && (
              <Button
                type="submit"
                style={{ backgroundColor: primaryBtnBG }}
                endIcon={<KeyboardDoubleArrowRightIcon />}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => setIsSubmitted({ state: true, in: "page1" })}
              >
                Next Page
              </Button>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default MovieUploader;
