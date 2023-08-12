import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ImageUploader from "../../shared/UIElements/ImageUploader/ImageUploader";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import classes from "./MovieUploader.module.css";
import { setData } from "../../shared/store/userDataSlice";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const MovieUploader = ({ sendRequest }) => {
  const [image, setImage] = useState();
  const { bgColors, colors, iconColors } = useSelector((s) => s.uiSlice);
  const { uid, token } = useSelector((s) => s.userData);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    if (!image) return;
    console.log(data);
    const formData = new FormData();
    formData.append("thumnail", image);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("uid", uid);
    try {
      const response = await sendRequest("upload_movie", "POST", formData, {
        Authorization: `Bearer ${token}`,
      });
      if (response.success) dispatch(setData({ ...response.user, token }));
    } catch (e) {
      throw new Error(e.message);
    } finally {
      setImage(null);
    }
  };

  return (
    <>
      <Header headerBg={bgColors.headerBg} headerColor={colors.headerColor} />
      <Navbar navbarBg={bgColors.navbarBg} navbarColor={colors.navbarColor} />
      <div className={classes.movieUploader}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    autoComplete="title"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextareaAutosize style={{ width: "100%" }} minRows={4} />
                </Grid>
                {/* <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid> */}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                <CloudUploadIcon /> Sign Up
              </Button>
            </Box>
          </Box>
          {/* <Copyright sx={{ mt: 5 }} /> */}
        </Container>
      </div>
      <Footer
        sendRequest={sendRequest}
        footerBg={bgColors.footerBg}
        footerBtnBg={bgColors.footerBtnBg}
        footerProfileDropdownBg={bgColors.footerProfileDropdownBg}
        footerBtnColor={colors.footerBtnColor}
        footerProfileDropdownColor={colors.footerProfileDropdownColor}
        footerProfileDropdownIC={iconColors.footerProfileDropdownIC}
      />
    </>
  );
};

export default MovieUploader;
