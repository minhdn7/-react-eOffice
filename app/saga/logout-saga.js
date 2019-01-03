/**
 * Created by ihor_kucherenko on 7/11/17.
 */
import {call, put, take} from "redux-saga/effects";
import * as actions from "../actions/action-types";
import * as Api from "../api";
import * as logoutActions from "../actions/logout-actions";
import * as rootActions from "../actions/root-actions";
import apiUrl from "../network/apiUrl";
import consts from "../const";

function logOutURL() {
  url = apiUrl.ROOT_URL + apiUrl.LOGOUT_URL;

    return fetch(url, {
      method: 'GET',
      headers: consts.BASE_HEADER
    })
    .then((response) => {
    return response.json();
    })
    .catch((error) => {
      console.log(String(error));
    });

}
function* logOut() {
  try {
    response = yield call(logOutURL);
    console.log('logout response:', response);
    if(response && response.status){
      if (response.status.code == "0") {
        yield put(logoutActions.setLogoutSuccess());
        return response;
      } else {
        yield put(logoutActions.setError(String(response.status.message)));
        return undefined;
      }
    }else{
      yield put(logoutActions.setError("Đăng xuất thất bại"));
      return undefined;
    }
  } catch (error) {    
    yield put(logoutActions.setError(String(error)));
  }
}

export function* logoutFlow() {
  while (true) {
    yield take(actions.LOGOUT_ACTION);
    yield put(rootActions.controlProgress(true));
    yield call(logOut);
    yield put(rootActions.controlProgress(false));
  }
}