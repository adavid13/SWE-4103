import * as types from "./actionTypes";
import * as userApi from "../../api/userApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadUsersSuccess(users) {
  return { type: types.LOAD_USERS_SUCCESS, users };
}

export function createUserSuccess(user) {
  return { type: types.CREATE_USER_SUCCESS, user };
}

export function updateUserSuccess(user) {
  return { type: types.UPDATE_USER_SUCCESS, user };
}

export function deleteUserOptimistic(user) {
  return { type: types.DELETE_USER_OPTIMISTIC, user };
}

export function loadUsers() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return userApi
      .getUsers()
      .then(users => {
        dispatch(loadUsersSuccess(users));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveUser(user) {
  //eslint-disable-next-line no-unused-vars
  return function(dispatch, getState) {
    dispatch(beginApiCall());
    return userApi
      .saveUser(user)
      .then(savedUser => {
        user.id
          ? dispatch(updateUserSuccess(savedUser))
          : dispatch(createUserSuccess(savedUser));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteUser(user) {
  return function(dispatch) {
    dispatch(deleteUserOptimistic(user));
    return userApi.deleteUser(user.id);
  };
}
