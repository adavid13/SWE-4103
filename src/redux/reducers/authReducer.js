import * as types from "../actions/actionTypes";
import * as Cookie from "js-cookie";
import { USER_COOKIE_KEY } from "../../constants";

export const AUTH_STATES = {
  LOGIN: "login",
  SET_PASSWORD: "password",
  SET_DETAILS: "details",
  SET_CONTACT_METHOD: "contact_method",
  AUTHENTICATED: "authenticated"
};

const initialState = {
  user: Cookie.get(USER_COOKIE_KEY)
    ? JSON.parse(Cookie.get(USER_COOKIE_KEY))
    : null,
  authState: AUTH_STATES.LOGIN,
  googleAuthenticated: false
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_GOOGLE_AUTHENTICATED:
      return { ...state, googleAuthenticated: action.auth };
    case types.LOGIN_SUCCESS:
      return { ...state, user: action.user };
    case types.LOGOUT:
      return { ...state, user: null };
    case types.SET_AUTH_STATE:
      return { ...state, authState: action.state };
    case types.UPDATE_USER_INFO:
      return { ...state, user: action.user };
    default:
      return state;
  }
}
