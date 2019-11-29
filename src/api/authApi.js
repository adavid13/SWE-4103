import Cookies from "js-cookie";
import { handleError, handleResponse } from "./apiUtils";
import { USER_COOKIE_KEY } from "../constants";

let baseUrl = process.env.API_URL + "/users/";

export async function setCookies(user) {
  Cookies.set(USER_COOKIE_KEY, user, {
    expires: 1
  });
}

// Mock login for local development
async function getUserFromResponse(response, email, pass) {
  if (response.ok) {
    return response.json().then(async users => {
      const user = users.filter(user => user.email === email)[0];
      if (!user || user.password !== pass) {
        throw new Error("Login failed");
      }
      setCookies(user);
      return user;
    });
  }
  if (response.status === 400) {
    const error = await response.text();
    throw new Error(error);
  }
  throw new Error("Network response was not ok.");
}

export function logout() {
  Cookies.remove(USER_COOKIE_KEY);
  if (process.env.NODE_ENV === "production") {
    const requestURL = `${process.env.API_URL}logout`;
    return fetch(requestURL)
      .catch(handleError);
  }
}

export async function login(email, pass) {
  if (process.env.NODE_ENV === "production") {
    let requestURL = `${process.env.API_URL}login?email=${email}&pass=${pass}`;
    await fetch(requestURL, {
      method: "POST",
      mode: 'cors',
      headers: { "content-type": "application/json" }
    });

    return fetch(`${process.env.API_URL}current`)
      .then(handleResponse);
  }

  return fetch(baseUrl)
    .then(response => getUserFromResponse(response, email, pass))
    .catch(handleError);
}
