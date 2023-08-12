import { Grid } from "@mui/material";

import classes from "./css/BackgroundImage.module.css";
import image from "../../assets/images/auth-image.png";

const BackgroundImage = () => {
  return (
    <Grid item xs={0} sm={0} md={7}>
      <img className={classes.img} src={image} alt="" />
      <img className={classes.img} src={image} alt="" />
    </Grid>
  );
};

export default BackgroundImage;
