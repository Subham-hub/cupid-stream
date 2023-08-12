import { ColorLens, DarkMode, LightMode } from "@mui/icons-material";

export const uiThemeInitializer = (initialTheme) => {
  let initialObj = {
    current: [<LightMode key="light" style={{ color: "white" }} />, "light"],
    second: [<DarkMode key="dark" style={{ color: "darkgrey" }} />, "dark"],
    third: [<ColorLens key="pink" style={{ color: "pink" }} />, "pink"],
  };

  if (initialTheme === "light")
    initialObj = {
      current: [<LightMode key="light" style={{ color: "white" }} />, "light"],
      second: [<DarkMode key="dark" style={{ color: "darkgrey" }} />, "dark"],
      third: [<ColorLens key="pink" style={{ color: "pink" }} />, "pink"],
    };
  else if (initialTheme === "dark")
    initialObj = {
      current: [<DarkMode key="dark" style={{ color: "darkgrey" }} />, "dark"],
      second: [<LightMode key="light" style={{ color: "white" }} />, "light"],
      third: [<ColorLens key="pink" style={{ color: "pink" }} />, "pink"],
    };
  else if (initialTheme === "pink")
    initialObj = {
      current: [<ColorLens key="pink" style={{ color: "pink" }} />, "pink"],
      second: [<LightMode key="light" style={{ color: "white" }} />, "light"],
      third: [<DarkMode key="dark" style={{ color: "darkgrey" }} />, "dark"],
    };
  return initialObj;
};
