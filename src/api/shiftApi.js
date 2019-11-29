import { handleResponse, handleError } from "./apiUtils";
import { ShiftOperations } from "../constants";

const baseUrl = process.env.API_URL + "/shifts/";

export async function getShifts() {
  const requestURL = process.env.NODE_ENV === "production" ? baseUrl + "all" : baseUrl;
  return fetch(requestURL)
    .then(handleResponse)
    .catch(handleError);
}

export async function updateShift(shift, user, method) {
  if (process.env.NODE_ENV === "production") {
    let requestURL;
    switch(method) {
      case ShiftOperations.ASSIGN_TO_SHIFT:
        requestURL = `${baseUrl}update/user?shiftID=${shift.id}&userID=${user.id}`;
        break;
      case ShiftOperations.REMOVE_FROM_SHIFT:
        requestURL = `${baseUrl}update/user/remove?shiftID=${shift.id}`;
        break;
      case ShiftOperations.UPDATE_DATETIME:
        requestURL = `${baseUrl}update/time?shiftID=${shift.id}&startTime=${shift.startTime}&endTime=${shift.endTime}`;
        break;
    }
    return fetch(requestURL, {
      method: "POST",
      mode: 'cors',
      headers: { "content-type": "application/json" }
    })
      .then(handleResponse)
      .catch(handleError);
  }

  return fetch(baseUrl + shift.id, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(shift)
  })
    .then(handleResponse)
    .catch(handleError);
}
