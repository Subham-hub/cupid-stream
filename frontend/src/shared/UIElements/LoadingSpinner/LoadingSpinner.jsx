import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = ({ asOverlay }) => {
  return (
    <div className={`${asOverlay && classes["loading-spinner-overlay"]}`}>
      <div className={classes["lds-dual-ring"]}></div>
    </div>
  );
};

export default LoadingSpinner;
