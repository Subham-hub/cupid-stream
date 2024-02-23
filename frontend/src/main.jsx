import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./shared/store/index";
import io from "socket.io-client";
import ErrorBoundary from "./ErrorBoundary";
export const socket = io.connect(import.meta.env.VITE_BACKEND_URL, {
  secure: true,
});
import "react-toastify/dist/ReactToastify.css";
import "./main.css";

// function onRender(
//   id,
//   phase,
//   actualDuration,
//   baseDuration,
//   startTime,
//   commitTime
// ) {
//   console.log(id);
//   console.log(phase);
//   console.log(actualDuration);
//   console.log(baseDuration);
//   console.log(startTime);
//   console.log(commitTime);
// }

const root = createRoot(document.getElementById("root"));
root.render(
  // <Profiler id="App" onRender={onRender}>
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </StrictMode>
  // </Profiler>
);
