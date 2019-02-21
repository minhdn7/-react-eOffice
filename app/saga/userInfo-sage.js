import { call, put, take } from "redux-saga/effects";
import * as actions from "../actions/action-types";
import * as userInfoActions from "../actions/userInfo-action";
import * as rootActions from "../actions/root-actions";
import apiUrl from "../network/apiUrl";
import consts from "../const";

function getUserInfoURL() {
    let url = apiUrl.ROOT_URL + apiUrl.GET_USER_INFO_URL;
    return fetch(url, {
        method: 'GET',
        headers: consts.BASE_HEADER,
    })
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            console.log(error);
        });
}

function* getUserInfo(){
    try {
        let response = yield call(getUserInfoURL);
        console.log("user info: ", response);
        if(response.status.code === '0' && typeof(response.data) !== "undefined"){
            yield put(userInfoActions.getUserInfoSucessAction(response.data));
            return response;
        }else{
            yield put(userInfoActions.getUserInfoErrorAction(response.status.message));
            return undefined;
        }
    } catch (error) {
        yield put(userInfoActions.getUserInfoErrorAction(String(error)));
        return undefined;
    }
}

export function* getUserInfoFlow() {
    while (true) {
  
      yield take(actions.GET_USER_INFO);
      yield put(rootActions.controlProgress(true));
      yield call(getUserInfo);
      yield put(rootActions.controlProgress(false));
  
    }
  }