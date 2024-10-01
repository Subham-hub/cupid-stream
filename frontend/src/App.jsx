import { Suspense, lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const HomePage = lazy(() => import("./Home/pages/HomePage"));
const Auth = lazy(() => import("./Auth/pages/Auth"));
const Watchlist = lazy(() => import("./Home/pages/Watchlist"));
const Profile = lazy(() => import("./Home/pages/Profile"));
const MoreMovies = lazy(() => import("./Home/pages/MoreMovies"));

import Layout from "./Layout/";
import { autoLogin } from "./shared/store/authSlice";
import { useHttp } from "./shared/hooks/http-hook";
import { LoadingSpinner } from "./shared/UIElements";
import { notify, types } from "./shared/utils/notification";
import { socket } from "./main";
import {
  switchToDark,
  switchToLight,
  switchToPink,
} from "./shared/store/themeSlice";

const App = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((s) => s.auth);
  const { uiTheme } = useSelector((s) => s.userData);

  const { sendRequest, isLoading, error, clearError } = useHttp();
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme && !isLoggedIn) {
      if (theme === "dark") dispatch(switchToDark());
      else if (theme === "light") dispatch(switchToLight());
      else if (theme === "pink") dispatch(switchToPink());
    } else localStorage.setItem("theme", uiTheme);

    const local = localStorage.getItem("userData");
    const session = sessionStorage.getItem("userData");
    if (local) dispatch(autoLogin(local, setLoadingData));
    else dispatch(autoLogin(session, setLoadingData));
  }, [dispatch, isLoggedIn, uiTheme]);

  useEffect(() => {
    if (!error) return;
    notify(types.ERROR, error);
    clearError();
  }, [error, clearError]);

  useEffect(() => {
    socket.on("error", (data) => console.error(data));
  }, [error, clearError]);

  return (
    <Suspense fallback={<LoadingSpinner asOverlay />}>
      <Layout sendRequest={sendRequest}>
        {(isLoading || loadingData) && <LoadingSpinner asOverlay />}
        {!isLoading && !loadingData && (
          <Routes>
            <Route path="/" element={<HomePage sendRequest={sendRequest} />} />
            <Route
              path="/auth/:type"
              element={<Auth sendRequest={sendRequest} />}
            />
            <Route path="/more-movies/:moviesType" element={<MoreMovies />} />
            {isLoggedIn && (
              <>
                <Route
                  path="/watchlist"
                  element={<Watchlist sendRequest={sendRequest} />}
                />
                <Route
                  path="/profile"
                  element={<Profile sendRequest={sendRequest} />}
                />
              </>
            )}
            {/* <Route path="/not-found" element={<NotFound />} /> */}
            <Route
              path="*"
              element={<Auth sendRequest={sendRequest} inValidAccess />}
            />
            <Route path="*" element={<Navigate to="/not-found" replace />} />
          </Routes>
        )}
        <ToastContainer />
      </Layout>
    </Suspense>
  );
};

export default App;
