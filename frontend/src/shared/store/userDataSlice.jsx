import { createSlice, current } from "@reduxjs/toolkit";

const initialUserDataState = {
  uid: "",
  token: "",
  username: "",
  email: "",
  role: "",
  uiTheme: "",
  status: "",
  avatar: {},
  movieRequest: [],
  movieDetails: [],
  memories: [],
  createdAt: "",
};

const userDataSlice = createSlice({
  name: "User Data",
  initialState: initialUserDataState,
  reducers: {
    setData(state, { payload }) {
      state.uid = payload._id;
      state.token = payload.token;
      state.username = payload.username;
      state.email = payload.email;
      state.role = payload.role;
      state.uiTheme = payload.uiTheme;
      state.status = payload.status;
      state.avatar = payload.avatar;
      state.movieRequest = payload.movieRequest;
      state.movieDetails = payload.movieDetails;
      state.memories = payload.memories;
      state.createdAt = payload.createdAt;

      const data = JSON.stringify({
        uid: payload._id,
        token: payload.token,
      });
      if (payload.remember) {
        const existingData = localStorage.getItem("userData");
        if (!existingData) localStorage.setItem("userData", data);
      } else {
        const existingData = sessionStorage.getItem("userData");
        if (!existingData) sessionStorage.setItem("userData", data);
      }
    },
    updateData(state, action) {
      const { field, newData, type } = action.payload;
      if (!field) return;
      if (field === "username") state.username = newData;
      if (field === "email") state.email = newData;
      if (field === "role") state.email = newData;
      if (field === "uiTheme") state.email = newData;
      if (field === "avatar") state.avatar = newData;
      if (field === "status") state.status = newData;
      if (field === "uploadedMovies") {
        if (type === "edit") {
          const finderfn = (m) => m.movieId === newData.movieId;
          const obj = current(state).uploadedMovies.find(finderfn);
          const index = current(state).uploadedMovies.indexOf(obj);
          if (newData.field[1] === "description")
            state.uploadedMovies[index].description = newData.description;
          if (newData.field[0] === "title")
            state.uploadedMovies[index].title = newData.title;
        } else if (type === "delete")
          state.uploadedMovies = current(state).uploadedMovies.filter(
            (m) => m.movieId !== newData
          );
      }
      if (field === "watchList")
        state.watchList = [...current(state).watchList, newData];
      if (field === "memories")
        state.memories = [...current(state).memories, newData];
      if (field === "friends")
        state.friends = [...current(state).friends, newData];
      if (field === "friendRequests")
        state.friendRequests = [...current(state).friendRequests, newData];
      if (field === "blocked")
        state.blocked = [...current(state).blocked, newData];
      if (field === "movieRequest")
        state.movieRequest = [...current(state).movieRequest, newData];
    },
    clearData(state) {
      Object.assign(state, initialUserDataState);
    },
  },
});

export const { setData, updateData, clearData } = userDataSlice.actions;
export default userDataSlice.reducer;
