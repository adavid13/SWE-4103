import * as types from "./actionTypes";
import * as authApi from "../../api/authApi";
import { AUTH_STATES } from "../reducers/authReducer";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function setGoogleAuthenticated(auth) {
  return { type: types.SET_GOOGLE_AUTHENTICATED, auth };
}

export function loginSuccess(user) {
  return { type: types.LOGIN_SUCCESS, user };
}

export function logoutSuccess() {
  return { type: types.LOGOUT };
}

export function setAuthState(state) {
  return { type: types.SET_AUTH_STATE, state };
}

export function updateUser(user) {
  return { type: types.UPDATE_USER_INFO, user };
}

export function login(email, pass) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return authApi
      .login(email, pass)
      .then(user => {
        dispatch(loginSuccess(user));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function logout() {
  return function(dispatch) {
    dispatch(setAuthState(AUTH_STATES.LOGIN));
    dispatch(logoutSuccess());
    authApi.logout();
  };
}
