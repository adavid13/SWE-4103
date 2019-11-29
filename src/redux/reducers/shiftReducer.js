import * as types from "../actions/actionTypes";

const initialState = {
  shifts: []
};

export default function shiftReducer(state = initialState.shifts, action) {
  switch (action.type) {
    case types.LOAD_SHIFTS_SUCCESS:
      return action.shifts;
    case types.UPDATE_SHIFT_SUCCESS:
      return state.map(shift =>
        shift.id === action.shift.id ? action.shift : shift
      );
    default:
      return state;
  }
}
