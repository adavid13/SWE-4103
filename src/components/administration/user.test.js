import * as actions from "../../redux/actions/userActions";
import * as types from "../../redux/actions/actionTypes";
import reducer from "../../redux/reducers/userReducer";
describe("user actions", () => {
  it("should create an action create user success", () => {
    const user = {
      id: 0,
      first_name: "test",
      last_name: "test"
    };
    const expectedAction = {
      type: types.CREATE_USER_SUCCESS,
      user
    };
    expect(actions.createUserSuccess(user)).toEqual(expectedAction);
  });
  it("should create an action load user success", () => {
    const users = [
      {
        id: 0,
        first_name: "test",
        last_name: "test"
      }
    ];
    const expectedAction = {
      type: types.LOAD_USERS_SUCCESS,
      users
    };
    expect(actions.loadUsersSuccess(users)).toEqual(expectedAction);
  });
});
describe("user reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it("should handle create user success", () => {
    expect(
      reducer([], {
        type: types.CREATE_USER_SUCCESS,
        user: {
          id: 0,
          first_name: "test",
          last_name: "test"
        }
      })
    ).toEqual([
      {
        id: 0,
        first_name: "test",
        last_name: "test"
      }
    ]);
  });

  it("should handle load shift success", () => {
    expect(
      reducer([], {
        type: types.LOAD_USERS_SUCCESS,
        users: [
          {
            id: 0,
            first_name: "test",
            last_name: "test"
          }
        ]
      })
    ).toEqual([
      {
        id: 0,
        first_name: "test",
        last_name: "test"
      }
    ]);
  });
});
