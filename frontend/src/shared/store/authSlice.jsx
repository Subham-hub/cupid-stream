import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { setData } from "./userDataSlice";
import { changeTheme } from "./uiSlice";

const authSlice = createSlice({
  name: "Authentication",
  initialState: {
    isLoggedIn: false,
    authID: "",
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.authID = action.payload;
    },
    destroyAuthID(state) {
      state.authID = null;
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.removeItem("userData");
      sessionStorage.removeItem("userData");
    },
  },
});

export const autoLogin = (data, setLoadingData) => {
  return async (dispatch) => {
    if (!data) return;
    const { uid, token } = JSON.parse(data);
    try {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_BACKEND_URL}/api/v1/get_user/${uid}`,
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setData({ token, ...response.data }));
      dispatch(login());
      dispatch(changeTheme(response.data.uiTheme));
      setLoadingData(false);
    } catch (e) {
      console.error(e);
      throw e;
    }
  };
};

export const { login, destroyAuthID, logout } = authSlice.actions;
export default authSlice.reducer;
