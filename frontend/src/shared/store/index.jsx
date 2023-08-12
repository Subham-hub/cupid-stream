import { configureStore } from "@reduxjs/toolkit";

import userData from "./userDataSlice";
import auth from "./authSlice";
import messages from "./messageSlice";
import uiSlice from "./uiSlice";

const store = configureStore({
  reducer: { auth, userData, messages, uiSlice },
});

export default store;
