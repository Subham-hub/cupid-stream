import { useSelector } from "react-redux";

import AuthButtons from "./sub-components/AuthButtons";
import UserDetails from "./sub-components/UserAccountDropDown";

const Footer = ({
  footerBg,
  footerBtnBg,
  footerBtnColor,
  footerProfileDropdownBg,
  footerProfileDropdownColor,
  footerProfileDropdownIC,
  sendRequest,
}) => {
  const { isLoggedIn } = useSelector((s) => s.auth);

  return (
    <footer style={{ backgroundColor: footerBg, height: "6rem" }}>
      {!isLoggedIn && (
        <AuthButtons
          footerBtnBg={footerBtnBg}
          footerBtnColor={footerBtnColor}
        />
      )}
      {isLoggedIn && (
        <UserDetails
          footerProfileDropdownBg={footerProfileDropdownBg}
          footerProfileDropdownColor={footerProfileDropdownColor}
          footerProfileDropdownIC={footerProfileDropdownIC}
          footerBtnColor={footerBtnColor}
          sendRequest={sendRequest}
        />
      )}
    </footer>
  );
};

export default Footer;
