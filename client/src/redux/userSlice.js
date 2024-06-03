import { createSlice } from "@reduxjs/toolkit";
import { dummyUser } from "../assets/data";
const initialState = {
  user: JSON.parse(window?.localStorage.getItem("user")) ?? dummyUser,
  edit: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout(state, action) {
      state.user = null;
      localStorage?.removeItem("user");
    }
    
  },
});

export default userSlice.reducer;

export const { login, logout } = userSlice.actions;

export function UserLogin(user) {
  return (dispatch, getState) => {
    dispatch(login(user));
  };
}

export function Logout() {
  return (dispatch, getState) => {
    dispatch(logout());
  };
}
