import { useState } from "react";
import { alpha, IconButton, InputBase, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowCircleRightSharpIcon from "@mui/icons-material/ArrowCircleRightSharp";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Searchbar = ({ onSendSearchValue }) => {
  const [searchInputValue, setSearchInputValue] = useState();
  return (
    <>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          id="search"
          placeholder="Movie Name"
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => setSearchInputValue(e.target.value)}
        />
      </Search>
      <IconButton
        onClick={() => onSendSearchValue(searchInputValue)}
        size="large"
        edge="start"
        color="inherit"
        sx={{ ml: 0.1 }}
      >
        <ArrowCircleRightSharpIcon />
      </IconButton>
    </>
  );
};

export default Searchbar;
