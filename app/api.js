/**
 * Created by saionara1 on 6/21/17.
 */
import Base64 from "./utils/Base64";
import consts from "./const";
import queryString from "query-string";

// work with api goes here

const urlGetDocs = "";

export function getRepositories(token, page, limit) {
  const params = queryString.stringify({
    access_token: token,
    page: page,
    per_page: limit
  });
  return fetch(`https://api.github.com/user/repos?${params}`, {
    method: 'GET',
    headers: consts.BASE_HEADER
  }).then((list) => {
    return list.json()
  })
    .catch((error) => {
      console.log(error);
    });
}


export function getReadMe(token, username, repository) {
  const params = queryString.stringify({
    access_token: token,
  });
  return fetch(`https://api.github.com/repos/${username}/${repository}/readme?${params}`, {
    method: 'GET',
    headers: consts.BASE_HEADER
  }).then((readMe) => {
    return readMe.json()
  })
    .catch((error) => {
      console.log(error);
    });
}


export function getAccessToken(username, password) {

  return fetch(`https://api.github.com/authorizations/clients/${consts.CLIENT_ID}`, {
    method: 'PUT',
    headers: getAuthHeader(username, password),
    body: JSON.stringify({
      client_secret: consts.CLIENT_SECRET,
    })
  }).then((user) => {
    return user.json()
  })
    .catch((error) => {
      console.log(error);
    });
}

export function logOut(authId, username, password) {
  return fetch(`https://api.github.com/authorizations/${authId}`, {
    method: 'DELETE',
    headers: getAuthHeader(username, password)
  })
    .then((user) => {
      return user.json();
    })
    .catch((error) => {
      console.log(error);
    });
}

export function logIn(username, password) {
  return fetch(`https://api.github.com/authorizations/${authId}`, {
    method: 'DELETE',
    headers: getAuthHeader(username, password)
  })
    .then((user) => {
      return user.json();
    })
    .catch((error) => {
      console.log(error);
    });
}

export function logInAccount(username, password, tokenFireBase) {
  console.log("username:", username);
  console.log("password:", password);
  console.log("tokenFireBase:", tokenFireBase);
  return fetch('http://14.225.6.6/qlvb/api/login/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "username": username,
      "password": password,
      "tokenFireBase": tokenFireBase
    }),
  })
    .then((response) => {
      console.log("body request: ", JSON.stringify({
        "username": username,
        "password": password,
        "tokenFireBase": tokenFireBase
      }));
      console.log("log response login", JSON.stringify(response));
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });

}


function getAuthHeader(username, password) {
  const baseString = Base64.btoa(`${username}:${password}`).replace('\n', '\\n');
  return {
    ...consts.BASE_HEADER,
    "Authorization": `Basic ${baseString}`
  }
}

function* getDocumentsFromApi() {
  const response = yield fetch(urlGetDocs, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: ''
  });
  return response._bodyInit;
}

export const Api = {
  getDocumentsFromApi
}