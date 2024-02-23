import classes from "./Header.module.css";

const Header = ({ headerBG, secondaryText }) => {
  return (
    <header className={classes.header} style={{ backgroundColor: headerBG }}>
      <h1 style={{ color: secondaryText }}>Watch something together?</h1>
      <h2 style={{ color: secondaryText }}>Cupid Stream</h2>
    </header>
  );
};

export default Header;
