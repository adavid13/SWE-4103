import * as types from "../actions/actionTypes";

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) === "_SUCCESS";
}

const initialStatusState = {
  apiCallsInProgress: 0
};

export default function apiCallStatusReducer(
  state = initialStatusState.apiCallsInProgress,
  action
) {
  if (action.type == types.BEGIN_API_CALL) {
    return state + 1;
  } else if (
    action.type === types.API_CALL_ERROR ||
    actionTypeEndsInSuccess(action.type)
  ) {
    return state - 1;
  }
  
  return state;
}
