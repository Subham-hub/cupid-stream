import { useSelector } from "react-redux";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import MyMoviesBody from "../components/MainBody/MyMoviesBody";
import Header from "../components/Header/Header";

const MyMovies = ({ sendRequest }) => {
  const { bgColors, colors, iconColors } = useSelector((s) => s.uiSlice);

  return (
    <>
      <Header headerBg={bgColors.headerBg} headerColor={colors.headerColor} />
      <Navbar navbarBg={bgColors.navbarBg} navbarColor={colors.navbarColor} />
      <MyMoviesBody
        mainBodyBg={bgColors.mainBodyBg}
        movieCardBg={bgColors.movieCardBg}
        watchlistHeaderBg={bgColors.watchlistHeaderBg}
        movieCardColor={colors.movieCardColor}
        watchlostHeaderColor={colors.watchlistHeaderColor}
      />
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

export default MyMovies;
