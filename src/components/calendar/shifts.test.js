import * as actions from "../../redux/actions/shiftActions";
import * as types from "../../redux/actions/actionTypes";
import reducer from "../../redux/reducers/shiftReducer";
describe("shift actions", () => {
  it("should create an action update shift success", () => {
    const shift = {
      id: 0,
      volunteer: null,
      title: "Available",
      start: "2019-11-01T03:00:00.000Z",
      end: "2019-11-01T07:00:00.000Z"
    };
    const expectedAction = {
      type: types.UPDATE_SHIFT_SUCCESS,
      shift
    };
    expect(actions.updateShiftSuccess(shift)).toEqual(expectedAction);
  });
  it("should create an action load shift success", () => {
    const shifts = [
      {
        id: 0,
        volunteer: null,
        title: "Available",
        start: "2019-11-01T03:00:00.000Z",
        end: "2019-11-01T07:00:00.000Z"
      }
    ];
    const expectedAction = {
      type: types.LOAD_SHIFTS_SUCCESS,
      shifts
    };
    expect(actions.loadShiftsSuccess(shifts)).toEqual(expectedAction);
  });
});
describe("shifts reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it("should handle update shift", () => {
    expect(
      reducer([], {
        type: types.UPDATE_SHIFT_SUCCESS,
        shift: {
          id: 0,
          volunteer: null,
          title: "Available",
          start: "2019-11-01T03:00:00.000Z",
          end: "2019-11-01T07:00:00.000Z"
        }
      })
    ).toEqual([]);
  });

  it("should handle load shift success", () => {
    expect(
      reducer([], {
        type: types.LOAD_SHIFTS_SUCCESS,
        shifts: [
          {
            id: 0,
            volunteer: null,
            title: "Available",
            start: "2019-11-01T03:00:00.000Z",
            end: "2019-11-01T07:00:00.000Z"
          }
        ]
      })
    ).toEqual([
      {
        id: 0,
        volunteer: null,
        title: "Available",
        start: "2019-11-01T03:00:00.000Z",
        end: "2019-11-01T07:00:00.000Z"
      }
    ]);
  });
});
