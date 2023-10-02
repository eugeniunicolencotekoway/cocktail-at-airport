import {configureStore, createAction, createReducer, createSelector} from "@reduxjs/toolkit";

const logIn = createAction("authentication/login");
const logOut = createAction("authentication/logout");
const authStorageKey = '_isAuthenticated';

export const initialAuthState = {loggedIn: localStorage.getItem(authStorageKey)};
export const authenticationReducer = createReducer(
  initialAuthState,
  (builder) => {
    builder
      .addCase(logIn, (state) => {
        state.loggedIn = true;
        localStorage.setItem(authStorageKey, '1');
      })
      .addCase(logOut, (state) => {
        state.loggedIn = false;
        localStorage.removeItem(authStorageKey);
      })
      .addDefaultCase((state) => state)
  }
);

const store = configureStore({
  reducer: {authentication: authenticationReducer},
});

export const isLoggedIn = ({ authentication }) =>  authentication.loggedIn;

export const AuthActions = {
  logIn,
  logOut,
};

export default store;
