import { Fragment } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import Header from "./Header/Header";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

const Layout = ({ children, sendRequest }) => {
  const { bgColor, textColor, iconColor } = useSelector((s) => s.themeSlice);
  const { pathname } = useLocation();

  return pathname.includes("/movie") ? (
    <Fragment>{children}</Fragment>
  ) : (
    <Fragment>
      <Header
        headerBG={bgColor.headerBG}
        secondaryText={textColor.secondaryText}
      />
      <Navbar
        navbarBG={bgColor.navbar_footerBG}
        primaryText={textColor.primaryText}
        navbarDropDownBG={bgColor.navbarDropDownBG}
        navbarDropDownText={textColor.navbarDropDownText}
        primaryIC={iconColor.primaryIC}
        secondaryIC={iconColor.secondaryIC}
        primaryBtnBG={bgColor.primaryBtnBG}
        secondaryBtnBG={bgColor.secondaryBtnBG}
        sendRequest={sendRequest}
      />
      {children}
      <Footer footerBG={bgColor.navbar_footerBG} />
    </Fragment>
  );
};

export default Layout;
