import { createSlice, current } from "@reduxjs/toolkit";

const initialUserDataState = {
  username: "",
  email: "",
  role: "",
  uiTheme: "",
  avatar: {},
  status: "",
  uploadedMovies: [],
  watchHistory: [],
  watchList: [],
  queue: [],
  memories: [],
  uid: "",
  token: "",
  friends: [],
  friendRequests: [],
  blocked: [],
};

const userDataSlice = createSlice({
  name: "User Data",
  initialState: initialUserDataState,
  reducers: {
    setData(state, action) {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.uiTheme = action.payload.uiTheme;
      state.avatar = action.payload.avatar;
      state.status = action.payload.status;
      state.uploadedMovies = action.payload.uploadedMovies;
      state.watchHistory = action.payload.watchHistory;
      state.watchList = action.payload.watchList;
      state.queue = action.payload.queue;
      state.memories = action.payload.memories;
      state.uid = action.payload._id;
      state.token = action.payload.token;
      state.friends = action.payload.friends;
      state.friendRequests = action.payload.friendRequests;
      state.blocked = action.payload.blocked;

      const data = JSON.stringify({
        uid: action.payload._id,
        token: action.payload.token,
      });
      if (action.payload.remember) {
        const existingData = localStorage.getItem("userData");
        if (!existingData) localStorage.setItem("userData", data);
      } else {
        const existingData = sessionStorage.getItem("userData");
        if (!existingData) sessionStorage.setItem("userData", data);
      }
    },
    updateData(state, action) {
      const { field, newData } = action.payload;
      if (!field) return;
      if (field === "username") state.username = newData;
      if (field === "email") state.email = newData;
      if (field === "role") state.email = newData;
      if (field === "uiTheme") state.email = newData;
      if (field === "avatar") state.avatar = newData;
      if (field === "status") state.status = newData;
      if (field === "uploadedMovies")
        state.uploadedMovies = [...current(state).uploadedMovies, newData];
      if (field === "friendwatchHistoryRequests")
        state.watchHistory = [...current(state).watchHistory, newData];
      if (field === "memories")
        state.memories = [...current(state).memories, newData];
    },
    clearData(state) {
      Object.assign(state, initialUserDataState);
    },
  },
});

export const { setData, updateData, clearData } = userDataSlice.actions;
export default userDataSlice.reducer;
