import { AppBar, Toolbar, Button } from "@mui/material";
import { useScreenWidth } from "../../../shared/hooks/useScreenWidth";
import WatchLaterSharpIcon from "@mui/icons-material/WatchLaterSharp";
import FileUploadSharpIcon from "@mui/icons-material/FileUploadSharp";
import Searchbar from "./Searchbar";
import { useSelector } from "react-redux";

const UploadedMoviesFilterBar = ({
  toggleWatchListDrawer,
  navigate,
  onSeachMovie,
}) => {
  const { screenWidth } = useScreenWidth();

  const {
    bgColor: { secondaryBG, primaryBtnBG, secondaryBtnBG },
    textColor: { primaryText },
  } = useSelector((s) => s.themeSlice);

  return (
    <AppBar
      position="static"
      style={{
        backgroundColor: secondaryBG,
        color: primaryText,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
        {/* Search Input */}
        <Searchbar onSendSearchValue={(value) => onSeachMovie(value)} />
        {/* Buttons */}
        <Button
          sx={{ ml: 2, mr: 2 }}
          variant="contained"
          onClick={() => navigate("/upload-movie")}
          endIcon={<FileUploadSharpIcon />}
          style={{
            backgroundColor: primaryBtnBG,
            color: primaryText,
          }}
        >
          Upload
        </Button>
        {screenWidth < 1550 && (
          <Button
            sx={{ ml: 2, mr: 2 }}
            variant="contained"
            onClick={toggleWatchListDrawer}
            endIcon={<WatchLaterSharpIcon />}
            style={{
              backgroundColor: secondaryBtnBG,
              color: primaryText,
            }}
          >
            Watchlist
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default UploadedMoviesFilterBar;
