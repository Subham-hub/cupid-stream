import logo from "../../../assets/images/logo.png";

import classes from "./Avatar.module.css";

const Avatar = ({ src, alt, height, width, className, status, onClick }) => {
  return (
    <div onClick={onClick}>
      <div className={classes.logo + " " + className}>
        <img
          src={src}
          alt={alt}
          height={height}
          width={width}
          style={{ borderRadius: "10rem" }}
        />
      </div>
      {status && (
        <div className={classes.status}>
          <img src={logo} alt={alt} height="10" width="10" />
        </div>
      )}
    </div>
  );
};

export default Avatar;
