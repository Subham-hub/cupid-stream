import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "Theme",
  initialState: {
    theme: "light",
    bgColor: {
      //header footer
      headerBG: "#FFF5E9",
      navbar_footerBG: "#CEAA9A",
      navbarDropDownBG: "#fafoe6",
      //body
      primaryBG: "#EBCDC3",
      secondaryBG: "#d9a897",
      //btn
      primaryBtnBG: "#F79e77",
      secondaryBtnBG: "#ED6F6B",
    },
    textColor: {
      primaryText: "#333",
      secondaryText: "#bb8268",
      navbarDropDownText: "#bfa79c",
    },
    iconColor: {
      primaryIC: "#fff",
      secondaryIC: "#D3AD81",
    },
  },
  reducers: {
    switchToDark(state) {
      state.theme = "dark";
      localStorage.setItem("theme", "dark");
      /** BACKGROUND COLORS*/
      //header footer
      state.bgColor.headerBG = "#1D243D";
      state.bgColor.navbar_footerBG = "#010E1A";
      state.bgColor.navbarDropDownBG = "#4c587d";
      //body
      state.bgColor.primaryBG = "#273248";
      state.bgColor.secondaryBG = "#44426E";
      //btn
      state.bgColor.primaryBtnBG = "#4d6981";
      state.bgColor.secondaryBtnBG = "#546f85";

      /** TEXT COLORS*/
      state.textColor.primaryText = "#fff";
      state.textColor.secondaryText = "#0F777C";
      state.textColor.navbarDropDownText = "#a4b3d4";

      /** ICON COLORS */
      state.iconColor.primaryIC = "darkgrey";
      state.iconColor.secondaryIC = "cfceea";
    },
    switchToPink(state) {
      state.theme = "pink";
      localStorage.setItem("theme", "pink");
      /** BACKGROUND COLORS*/
      //header footer
      state.bgColor.headerBG = "#FFC0CB";
      state.bgColor.navbar_footerBG = "#BF567D";
      state.bgColor.navbarDropDownBG = "#d9a3a3";
      //body
      state.bgColor.primaryBG = "#FFF5E9";
      state.bgColor.secondaryBG = "#E4908A";
      //btn
      state.bgColor.primaryBtnBG = "#FF7B92";
      state.bgColor.secondaryBtnBG = "#DA70A3";

      /** TEXT COLORS*/
      state.textColor.primaryText = "#220F3D";
      state.textColor.secondaryText = "#333";
      state.textColor.navbarDropDownText = "#924646";

      /** ICON COLORS */
      state.iconColor.primaryIC = "pink";
      state.iconColor.secondaryIC = "#91526F";
    },
    switchToLight(state) {
      state.theme = "light";
      localStorage.setItem("theme", "light");
      /** BACKGROUND COLORS*/
      //header footer
      state.bgColor.headerBG = "#FFF5E9";
      state.bgColor.navbar_footerBG = "#CEAA9A";
      state.bgColor.navbarDropDownBG = "#fafoe6";
      //body
      state.bgColor.primaryBG = "#EBCDC3";
      state.bgColor.secondaryBG = "#edc5b8";
      //btn
      state.bgColor.primaryBtnBG = "#F79e77";
      state.bgColor.secondaryBtnBG = "#ED6F6B";

      /** TEXT COLORS*/
      state.textColor.primaryText = "#333";
      state.textColor.secondaryText = "#bb8268";
      state.textColor.navbarDropDownText = "#bfa79c";

      /** ICON COLORS */
      state.iconColor.primaryIC = "#fff";
      state.iconColor.secondaryIC = "#D3AD81";
    },
  },
});

export const { switchToDark, switchToPink, switchToLight } = themeSlice.actions;
export default themeSlice.reducer;
