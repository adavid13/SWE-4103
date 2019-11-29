import { combineReducers } from "redux";
import users from "./userReducer";
import auth from "./authReducer";
import shifts from "./shiftReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  users,
  shifts,
  auth,
  apiCallsInProgress
});

export default rootReducer;
