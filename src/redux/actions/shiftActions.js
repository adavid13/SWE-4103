import * as types from "./actionTypes";
import * as shiftApi from "../../api/shiftApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";
import { transformToApplication, transformToServer } from "../../utils/transformShift";
import { ShiftOperations } from "../../constants";

export function loadShiftsSuccess(shifts) {
  return { type: types.LOAD_SHIFTS_SUCCESS, shifts };
}

export function updateShiftSuccess(shift) {
  return { type: types.UPDATE_SHIFT_SUCCESS, shift };
}

/**
 * This function requests all the shifts from the backend.
 * The response is then stored in the shifts state of the store.
 */
export function loadShifts() {
  return function(dispatch, getState) {
    dispatch(beginApiCall());
    
    return shiftApi
      .getShifts()
      .then(shifts => {
        const user = getState().auth.user;
        const transformedShifts = transformToApplication(shifts, user);
        dispatch(loadShiftsSuccess(transformedShifts));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

/**
 * This function requests all the shifts from the backend.
 * The response is then stored in the shifts state of the store.
 */
export function saveShift(shift, method) {
  return function(dispatch, getState) {
    dispatch(beginApiCall());
    let user = getState().auth.user;
    let updatedShift = { ...shift };
  
    if (method === ShiftOperations.ASSIGN_TO_SHIFT) {
      updatedShift = {
        ...shift,
        userSignedUpForShift: user,
        title: `${user.firstName} ${user.lastName}`,
        backgroundColor: "#81B1DE"
      }
    }

    return shiftApi
      .updateShift(transformToServer(updatedShift), user, method)
      .then(() => {
        dispatch(updateShiftSuccess(updatedShift));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function cancelShift(shift, method) {
  return function(dispatch, getState) {
    dispatch(beginApiCall());
    const user = getState().auth.user;
    const updatedShift = {
      ...shift,
      userSignedUpForShift: null,
      title: `Available`,
      backgroundColor: "#A0DB8E"
    }
    return shiftApi
      .updateShift(transformToServer(updatedShift), user, method)
      .then(() => {
        dispatch(updateShiftSuccess(updatedShift));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
