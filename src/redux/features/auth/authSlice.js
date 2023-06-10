import { createSlice } from '@reduxjs/toolkit';

const localStorageSafe = {
  getItem(key) {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`Error getting item '${key}' from localStorage:`, error);
      return null;
    }
  },

  setItem(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error setting item '${key}' in localStorage:`, error);
    }
  },
};
const isLoggedInFromStorage = localStorageSafe.getItem("isLoggedIn") === "true";

const nameFromStorage = localStorageSafe.getItem("name");

const initialState = {
  isLoggedIn: isLoggedInFromStorage,
  name: nameFromStorage || "",
  user: {
    name: "",
    email: "",
  },
  userID: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      localStorageSafe.setItem("isLoggedIn", action.payload);
      state.isLoggedIn = action.payload;
    },
    
    SET_NAME(state, action) {
      console.log("Received name: ", action.payload); // Add this line
      localStorageSafe.setItem("name", action.payload);
      state.name = action.payload;
    },
    

    SET_USER(state, action) {
      const profile = action.payload;
      state.user.name = profile.name;
      state.user.email = profile.email;
    },
  },
});

export const { SET_LOGIN, SET_NAME, SET_USER } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectName = (state) => state.auth.name;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
