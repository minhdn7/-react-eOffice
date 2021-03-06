/**
 * Created by MinhDN on 6/22/2018.
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
  // console.log(error);
});

}

function getContactURL() {

    url = apiUrl.ROOT_URL + apiUrl.GET_CONTACT_URL;
    console.log("url contact:", url);
    console.log('authen', consts.BASE_HEADER["X-Authentication-Token"]);
    return fetch(url, {
      method: 'GET',
      headers: consts.BASE_HEADER
    })
    .then((listContact) => {
    return listContact.json();
    })
    .catch((error) => {
      console.log(String(error));
    });
}

function* login(username, password, tokenFireBase) {
  try {
    response = yield call(logInRequestURL, username, password, tokenFireBase);
    console.log("response log 2", response);
    if(typeof(response) != "undefined"  && typeof(response.status) != "undefined"){
      if (response.status.code == "0" && typeof(response.data) != "undefined") {
        yield put(loginActions.setLoginSuccess(response.data));
        // yield call(getContact);
        return response;
      } else {
        yield put(loginActions.setError(String(response.status.message)));
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
    // console.log("step 0:", "0");
    responseContact = yield call(getContactURL);
    // console.log("contact:", responseContact);
    if(typeof(responseContact) != "undefined"  && typeof(responseContact.status) != "undefined"){

      if (responseContact.status.code == "0") {

        dataConvert = this.convertJsonToTreeMap(responseContact.data);
        yield put(loginActions.getContactSuccess(dataConvert));
        return responseContact;
      } else {
        // console.log("step 3:", "3");
        yield put(loginActions.getContactError(String(responseContact.status.message)));
        return undefined;
      }
    }else{

      yield put(loginActions.getContactError("Lấy thông tin danh bạ thất bại"));
      return undefined;
    }

  } catch (error) {
    // console.log("step 5:", String(error));
    yield put(loginActions.getContactError(String(error)));
  }
}

convertJsonToTreeMap = array => {
  var map = {};
  for (var i = 0; i < array.length; i++) {
    var obj = array[i];
    if (!(obj.id in map)) {
      map[obj.id] = obj;
      map[obj.id].children = [];
      map[obj.id].name = obj.userName;
    }

    if(typeof map[obj.id].userName == 'undefined'){
      map[obj.id].id = obj.id
      map[obj.id].userName = obj.userName
      map[obj.id].name = obj.userName
      map[obj.id].parentId = obj.parentId
    }

    var parent = obj.parentId || "-";
    if (!(parent in map)) {
      map[parent] = obj;

      map[parent].children = [];
    }else{
      map[parent].children.push(map[obj.id]);
    }


  }
  return map["-"];
};


export function* loginFlow() {
  while (true) {
    const {username, password, tokenFireBase} = yield take(actions.LOGIN_ACTION);
    yield put(rootActions.controlProgress(true));
    yield call(login, username, password, tokenFireBase);
    yield put(rootActions.controlProgress(false));

    yield take(actions.GET_CONTACT);
    // yield put(rootActions.controlProgress(true));
    yield call(getContact);
    // yield put(rootActions.controlProgress(false));
  }
}


