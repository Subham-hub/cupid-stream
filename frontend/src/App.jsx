import HomePage from "./Home/pages/HomePage";
import { Route, Routes, Navigate } from "react-router-dom";

import Auth from "./Auth/pages/Auth";
import History from "./Home/pages/History";
import Movie from "./Movie/pages/Movie";
import MyMovies from "./Home/pages/MyMovies";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { autoLogin } from "./shared/store/authSlice";
import { useHttp } from "./shared/hooks/http-hook";
import { LoadingSpinner } from "./shared/UIElements";
import { notify, types } from "./shared/utils/notification";
import { changeTheme } from "./shared/store/uiSlice";
import MovieUploader from "./Home/pages/MovieUploader";

const App = () => {
  const dispatch = useDispatch();
  const userData = useSelector((s) => s.userData);
  const { isLoggedIn } = useSelector((s) => s.auth);
  console.log(userData);
  const { sendRequest, isLoading, error, clearError } = useHttp();
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme && !isLoggedIn) dispatch(changeTheme(theme));
    else localStorage.setItem("theme", userData.uiTheme);

    const local = localStorage.getItem("userData");
    const session = sessionStorage.getItem("userData");
    if (local) {
      // setLoadingData(true);
      dispatch(autoLogin(local, setLoadingData));
    } else {
      // setLoadingData(true);
      dispatch(autoLogin(session, setLoadingData));
    }
  }, [dispatch, isLoggedIn, userData.uiTheme]);

  useEffect(() => {
    if (!error) return;
    notify(types.ERROR, error);
    clearError();
  }, [error, clearError]);

  return (
    <>
      {(isLoading || loadingData) && <LoadingSpinner asOverlay />}
      {!isLoading && !loadingData && (
        <Routes>
          <Route path="/" element={<HomePage sendRequest={sendRequest} />} />
          <Route
            path="/auth/:type"
            element={<Auth sendRequest={sendRequest} />}
          />
          {isLoggedIn && (
            <>
              <Route
                path="/history"
                element={<History sendRequest={sendRequest} />}
              />
              <Route
                path="/my-movies"
                element={<MyMovies sendRequest={sendRequest} />}
              />
              <Route
                path="/upload-movie"
                element={<MovieUploader sendRequest={sendRequest} />}
              />
              <Route path="/movie/:mid" element={<Movie />} />
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
    </>
  );
};

export default App;

// const sendMessage = (body) => {
//   socket.emit('send-message', { muid, ouid, body, roomId })
//   const myMessageObj = {
//     sender: { uid: muid, username, tag, status },
//     body,
//     sendAt: { date: currentDate(), time: currentTime() },
//     _id: nanoid(),
//   }
//   dispatch(messageActions.updateData(myMessageObj))
// }

// useEffect(() => {
//   socket.on('recieve-message', (data) => {
//     console.log(data)
//     dispatch(messageActions.updateData(data.message_body))
//   })
// }, [dispatch])
