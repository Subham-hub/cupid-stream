// import { useParams } from "react-router-dom";
import vid from "../../assets/videos/test.mp4";
import classes from "./Movie.module.css";
import { Avatar, Badge, Paper, styled, TextField } from "@mui/material";
import { useSelector } from "react-redux";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
}));
const dummy = [{}, {}, {}, {}, {}];
const Movie = () => {
  const { bgColors, colors } = useSelector((s) => s.uiSlice);
  const { username } = useSelector((s) => s.userData);
  //   const { mid } = useParams();

  return (
    <div className={classes.content} style={{ color: colors.chatFontColor }}>
      <div className={classes["video-player"]} style={{ width: "80%" }}>
        <video controls crossOrigin="anonymous" poster="" preload="auto">
          <source src={vid} type="video/mp4" />
        </video>
      </div>
      <div
        className={classes["chat-box"]}
        style={{ backgroundColor: bgColors.chatHeaderBg, width: "20%" }}
      >
        <div className={classes.header}>
          <h2>Watch and Talk!</h2>
          <p>Never get scared </p>
        </div>
        <div className={classes.profile}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar alt={username} src={"/"} />
          </StyledBadge>
          <h3>{username}</h3>
        </div>
        <div className={classes.users}>
          Watching with : <b>Reya</b>
        </div>
        <Paper
          className={classes["message-box"]}
          style={{
            backgroundColor: bgColors.chatBodyBg,
            color: colors.chatFontColor,
          }}
          elevation="6"
        >
          {dummy.map(() => (
            <div className={classes["chat-body"]} key={Math.random()}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <p>
                assfdsn dsiojopakfjsdkjla jlpo jadsjs Ut anim eu laborum amet
                ullamco aliqua est dolor deserunt velit. Aute ex aliqua amet qui
                elit. Sunt ad dolore labore id dolore ex ad commodo nostrud.
                Ipsum laborum Lorem id sunt ipsum qui exercitation culpa culpa
                qui ea. Lorem culpa ex amet ea cillum nisi commodo ullamco irure
                duis fugiat voluptate. Excepteur cillum dolor labore tempor
                minim eiusmod ipsum ullamco quis incididunt aute sint irure id.
              </p>
            </div>
          ))}
        </Paper>
        <div className={classes.input}>
          <TextField
            style={{ backgroundColor: bgColors.chatInputBg }}
            color="secondary"
            fullWidth
            label="Enter Message"
          />
        </div>
      </div>
    </div>
  );
};

export default Movie;
