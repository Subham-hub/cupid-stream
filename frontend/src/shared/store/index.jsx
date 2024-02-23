import { configureStore } from "@reduxjs/toolkit";

import userData from "./userDataSlice";
import auth from "./authSlice";
import themeSlice from "./themeSlice";

const store = configureStore({
  reducer: { auth, userData, themeSlice },
});

export default store;
