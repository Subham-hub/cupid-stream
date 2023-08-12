import classes from "./Header.module.css";

const Header = ({ headerBg, headerColor }) => {
  return (
    <header className={classes.header} style={{ backgroundColor: headerBg }}>
      <h1 style={{ color: headerColor }}>Watch something together?</h1>
      <h2 style={{ color: headerColor }}>Cupid Stream</h2>
    </header>
  );
};

export default Header;
