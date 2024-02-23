import { useEffect, useState } from "react";

const throttle = (callback, delay) => {
  let lastCall = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - lastCall >= delay) {
      lastCall = now;
      callback(...args);
    }
  };
};

export const useScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    const throttledUpdate = throttle(
      () => setScreenWidth(window.innerWidth),
      200
    );
    window.addEventListener("resize", throttledUpdate);
    return () => {
      window.removeEventListener("resize", throttledUpdate);
    };
  }, []);

  return { screenWidth };
};
