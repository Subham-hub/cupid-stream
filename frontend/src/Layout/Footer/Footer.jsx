// import { useSelector } from "react-redux";

// import AuthButtons from "./sub-components/AuthButtons";
// import UserDetails from "./sub-components/UserAccountDropDown";

const Footer = ({ footerBG }) => {
  // const { isLoggedIn } = useSelector((s) => s.auth);

  // {!isLoggedIn && (
  //   <AuthButtons
  //     footerBtnBg={footerBtnBg}
  //     footerBtnColor={footerBtnColor}
  //   />
  // )}
  // {isLoggedIn && (
  //   <UserDetails
  //     footerProfileDropdownBg={footerProfileDropdownBg}
  //     footerProfileDropdownColor={footerProfileDropdownColor}
  //     footerProfileDropdownIC={footerProfileDropdownIC}
  //     footerBtnColor={footerBtnColor}
  //     sendRequest={sendRequest}
  //   />
  // )}

  return (
    <footer
      style={{
        backgroundColor: footerBG,
        height: "6rem",
      }}
    ></footer>
  );
};

export default Footer;
