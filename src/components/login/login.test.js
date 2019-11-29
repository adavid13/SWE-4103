import * as actions from "../../redux/actions/authActions";
import * as types from "../../redux/actions/actionTypes";
import reducer, { AUTH_STATES } from "../../redux/reducers/authReducer";
import { USER_COOKIE_KEY } from "../../constants";
import Cookie from "js-cookie";
describe("login", () => {
  it("should create an action login success", () => {
    const email = "user@test.com";
    const expectedAction = {
      type: types.LOGIN_SUCCESS,
      user: email
    };
    expect(actions.loginSuccess(email)).toEqual(expectedAction);
  });
});

describe("logout", () => {
  it("should create an action logout", () => {
    const expectedAction = {
      type: types.LOGOUT
    };
    expect(actions.logoutSuccess()).toEqual(expectedAction);
  });
});

describe("auth reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      user: Cookie.get(USER_COOKIE_KEY)
        ? JSON.parse(Cookie.get(USER_COOKIE_KEY))
        : null,
      authState: AUTH_STATES.LOGIN,
      googleAuthenticated: false
    });
  });

  it("should handle change auth state", () => {
    expect(
      reducer([], {
        type: types.SET_AUTH_STATE,
        state: AUTH_STATES.AUTHENTICATED
      })
    ).toEqual({
      authState: AUTH_STATES.AUTHENTICATED
    });
  });
  it("should handle logout", () => {
    expect(
      reducer([], {
        type: types.LOGOUT
      })
    ).toEqual({
      user: null
    });
  });
  it("should handle login success (set the user in the state)", () => {
    expect(
      reducer([], {
        type: types.LOGIN_SUCCESS,
        user: {
          first_name: "test"
        }
      })
    ).toEqual({
      user: {
        first_name: "test"
      }
    });
  });
  it("should handle updating user", () => {
    expect(
      reducer([], {
        type: types.UPDATE_USER_INFO,
        user: {
          first_name: "test change"
        }
      })
    ).toEqual({
      user: {
        first_name: "test change"
      }
    });
  });
});
