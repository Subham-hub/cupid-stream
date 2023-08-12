import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "UI",
  initialState: {
    bgColors: {
      headerBg: "#FFF5E9",
      navbarBg: "#ceaa9a",
      mainBodyBg: "#ebcdc3",
      movieCardBg: "#e8d0d0",
      watchlistHeaderBg: "#e8dbd5",
      footerBg: "#ceaa9a",
      footerBtnBg: "#ffebd2",
      historyBlockBg: "#dabcb2",
      chatHeaderBg: "#f3eaf4",
      chatBodyBg: "#ffebd2",
      chatInputBg: "#bca3ac",
      queueSliderBg: "#ebcdc3",
      queueGenreBg: "ffdcd0",
      queueGenreHeaderBg: "#e9d2b1",
      queueCardBg: "#fbeadc",
      footerProfileDropdownBg: "#fafoe6",
      historyModalBg: "#Fef7da",
    },
    colors: {
      headerColor: "#2e1a1c",
      navbarColor: "#2e1a1c",
      movieCardColor: "#2e1a1c",
      watchlistHeaderColor: "#2e1a1c",
      footerBtnColor: "#2e1a1c",
      chatFontColor: "black",
      queueCardColor: "black",
      footerProfileDropdownColor: "#bfa79c",
      historyModalColor: "#D59572",
      historyModalTitleColor: "#E09789",
    },
    borderColors: {
      historyCard: "#ffdac1",
      historyModalBorder: "5px solid #EDC483",
    },
    iconColors: {
      // IC= Icon Color
      footerProfileDropdownIC: "#D3AD81",
    },
  },
  reducers: {
    changeTheme(state, action) {
      const newTheme = action.payload;
      if (newTheme === "dark") {
        localStorage.setItem("theme", "dark");
        // background colors
        state.bgColors.headerBg = "#1d243d";
        state.bgColors.navbarBg = "#010e1a";
        state.bgColors.mainBodyBg = "#273248";
        state.bgColors.movieCardBg = "#44426e";
        state.bgColors.watchlistHeaderBg = "#44426e";
        state.bgColors.footerBg = "#010e1a";
        state.bgColors.footerBtnBg = "#5a6794";
        state.bgColors.historyBlockBg = "#2d3b43";
        state.bgColors.chatHeaderBg = "#443c3c";
        state.bgColors.chatBodyBg = "#48404d";
        state.bgColors.chatInputBg = "#3e3636";
        state.bgColors.queueSliderBg = "#273248";
        state.bgColors.queueGenreBg = "#15253f";
        state.bgColors.queueGenreHeaderBg = "#2e4052";
        state.bgColors.queueCardBg = "#2b3d5b";
        state.bgColors.footerProfileDropdownBg = "#4c587d";
        state.bgColors.historyModalBg = "#555D9F";
        // text colors
        state.colors.headerColor = "#C6caeb";
        state.colors.navbarColor = "#C6caeb";
        state.colors.movieCardColor = "#C6caeb";
        state.colors.watchlistHeaderColor = "#C6caeb";
        state.colors.footerBtnColor = "#C6caeb";
        state.colors.chatFontColor = "#fcf1f2";
        state.colors.queueCardColor = "white";
        state.colors.footerProfileDropdownColor = "#a4b3d4";
        state.colors.historyModalColor = "#b4c5db";
        state.colors.historyModalTitleColor = "#bfd6ed";
        // border colors
        state.borderColors.historyCard = "#e2f0cb";
        state.borderColors.historyModalBorder = "5px solid #152850";
        // IC= icon color
        state.iconColors.footerProfileDropdownIC = "#cfceea";
      } else if (newTheme === "pink") {
        localStorage.setItem("theme", "pink");
        // background colors
        state.bgColors.headerBg = "pink";
        state.bgColors.navbarBg = "#bf567d";
        state.bgColors.mainBodyBg = "#fff5e9";
        state.bgColors.movieCardBg = "#e8d0d0";
        state.bgColors.watchlistHeaderBg = "#E4908A";
        state.bgColors.footerBg = "#E4908A";
        state.bgColors.footerBtnBg = "#fcbab6";
        state.bgColors.historyBlockBg = "#efdcce";
        state.bgColors.chatHeaderBg = "#ca7c83";
        state.bgColors.chatBodyBg = "#ffebd2";
        state.bgColors.chatInputBg = "#eeb6bb";
        state.bgColors.queueSliderBg = "#fff5e9";
        state.bgColors.queueGenreBg = "#f2c1bd";
        state.bgColors.queueGenreHeaderBg = "#f3dbcf";
        state.bgColors.queueCardBg = "#fbdcd7";
        state.bgColors.footerProfileDropdownBg = "#d9a3a3";
        state.bgColors.historyModalBg = "#e3daee";
        // text colors
        state.colors.headerColor = "#220f3d";
        state.colors.navbarColor = "#220f3d";
        state.colors.movieCardColor = "#220f3d";
        state.colors.watchlistHeaderColor = "#220f3d";
        state.colors.footerBtnColor = "#220f3d";
        state.colors.chatFontColor = "black";
        state.colors.queueCardColor = "black";
        state.colors.footerProfileDropdownColor = "#924646";
        state.colors.historyModalColor = "#DC597C";
        state.colors.historyModalTitleColor = "#D88A9b";
        // border colors
        state.borderColors.historyCard = "#ffb7b2";
        state.borderColors.historyModalBorder = "5px solid #86588C";
        // IC= icon color
        state.iconColors.footerProfileDropdownIC = "#91526F";
      } else if (newTheme === "light") {
        localStorage.setItem("theme", "light");
        // background colors
        state.bgColors.headerBg = "#FFF5E9";
        state.bgColors.navbarBg = "#ceaa9a";
        state.bgColors.mainBodyBg = "#ebcdc3";
        state.bgColors.movieCardBg = "#e8d0d0";
        state.bgColors.watchlistHeaderBg = "#e8dbd5";
        state.bgColors.footerBg = "#ceaa9a";
        state.bgColors.footerBtnBg = "#e8b372";
        state.bgColors.historyBlockBg = "#dabcb2";
        state.bgColors.chatHeaderBg = "#f3eaf4";
        state.bgColors.chatBodyBg = "#ffebd2";
        state.bgColors.chatInputBg = "#bca3ac";
        state.bgColors.queueSliderBg = "#ebcdc3";
        state.bgColors.queueGenreBg = "#ffdcd0";
        state.bgColors.queueGenreHeaderBg = "#e9d2b1";
        state.bgColors.queueCardBg = "#fbeadc";
        state.bgColors.footerProfileDropdownBg = "#fafoe6";
        state.bgColors.historyModalBg = "#Fef7da";
        // text colors
        state.colors.headerColor = "#2e1a1c";
        state.colors.navbarColor = "#2e1a1c";
        state.colors.movieCardColor = "#2e1a1c";
        state.colors.watchlistHeaderColor = "#2e1a1c";
        state.colors.footerBtnColor = "#2e1a1c";
        state.colors.chatFontColor = "black";
        state.colors.queueCardColor = "black";
        state.colors.footerProfileDropdownColor = "#bfa79c";
        state.colors.historyModalColor = "#D59572";
        state.colors.historyModalTitleColor = "#E09789";
        // border colors
        state.borderColors.historyCard = "#e2f0cb";
        state.borderColors.historyModalBorder = "5px solid #EDC483";
        // IC= icon color
        state.iconColors.footerProfileDropdownIC = "#D3AD81";
      }
    },
  },
});

export const { changeTheme } = uiSlice.actions;
export default uiSlice.reducer;
