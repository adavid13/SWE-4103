import { handleResponse, handleError } from "./apiUtils";

const baseUrl = process.env.API_URL + "/users/";

const keysToString = obj => {
  const keyValuePairs = [];
  for (const key in obj) {
    keyValuePairs.push(
      encodeURIComponent(key) + "=" + encodeURIComponent(obj[key])
    );
  }
  return keyValuePairs.join("&");
};

export async function getUsers() {
  const requestURL =
    process.env.NODE_ENV === "production" ? baseUrl + "all" : baseUrl;
  return fetch(requestURL)
    .then(handleResponse)
    .catch(handleError);
}

export async function saveUser(user) {
  if (process.env.NODE_ENV === "production") {
    const requestURL = user.id
      ? `${baseUrl}update?${keysToString(user)}`
      : `${baseUrl}add?${keysToString(user)}`;
    return fetch(requestURL, {
      method: "POST",
      mode: "cors",
      headers: { "content-type": "application/json" }
    })
      .then(handleResponse)
      .catch(handleError);
  }

  return fetch(baseUrl + (user.id || ""), {
    method: user.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(user)
  })
    .then(handleResponse)
    .catch(handleError);
}

export async function deleteUser(userId) {
  const requestURL =
    process.env.NODE_ENV === "production"
      ? `${baseUrl}delete?id=${userId}`
      : baseUrl + userId;
  return fetch(requestURL, { method: "DELETE" }).catch(handleError);
}
