/**
 * Created by saionara1 on 6/22/17.
 */
import {call, put, take} from "redux-saga/effects";
import * as actions from "../actions/action-types";
import * as Api from "../api";
import * as loginActions from "../actions/login-actions";
import * as rootActions from "../actions/root-actions";
import apiUrl from "../network/apiUrl";
import consts from "../const";

function logInRequestURL(username, password, tokenFireBase) {
  console.log("username:", username);
  console.log("password:", password);
  console.log("tokenFireBase:", tokenFireBase);
  url = apiUrl.ROOT_URL + apiUrl.LOGIN_URL;
  console.log("url:", url);
  return fetch(url, {
  method: 'POST',
  headers: {
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

function getContactURL() {

    url = apiUrl.ROOT_URL + apiUrl.GET_CONTACT_URL;
    return fetch(url, {
      method: 'GET',
      headers: consts.BASE_HEADER
    }).then((list) => {
      return list.json()
    })
      .catch((error) => {
        console.log(error);
      });

}

function* login(username, password, tokenFireBase) {
  try {
    const response = yield call(logInRequestURL, username, password, tokenFireBase);
    console.log("response log 2", response);
    if(typeof(response) != "undefined"  && typeof(response.status) != "undefined"){
      if (response.status.code == "0") {
        yield put(loginActions.setLoginSuccess(response.data));
        yield call(getContact);
        return response;
      } else {
        yield put(loginActions.setError(response.status.message));
        return undefined;
      }
    }else{
      yield put(loginActions.setError("Đăng nhập thất bại"));
      return undefined;
    }

  } catch (error) {
    
    yield put(loginActions.setError(String(error)));
  }
}

function* getContact() {
  try {
    const response = yield call(getContactURL);
    console.log("contact:", response);
    if(typeof(response) != "undefined"  && typeof(response.status) != "undefined"){
      if (response.status.code == "0") {
        yield put(loginActions.getContactSuccess(response.data));
        return response;
      } else {
        yield put(loginActions.getContactError(response.status.message));
        return undefined;
      }
    }else{
      yield put(loginActions.getContactError("Lấy thông tin danh bạ thất bại"));
      return undefined;
    }

  } catch (error) {
    
    yield put(loginActions.setError(String(error)));
  }
}

export function* loginFlow() {
  while (true) {
    const {username, password, tokenFireBase} = yield take(actions.LOGIN_ACTION);
    const {} = yield take(actions.GET_CONTACT);
    yield put(rootActions.controlProgress(true));
    yield call(login, username, password, tokenFireBase);
    
    yield put(rootActions.controlProgress(false));

  }
}


