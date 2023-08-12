import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./shared/store/index";
import io from "socket.io-client";
import ErrorBoundary from "./ErrorBoundary";
export const socket = io.connect(import.meta.env.VITE_BACKEND_URL);
import "react-toastify/dist/ReactToastify.css";

import "./main.css";

createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ErrorBoundary>
);
