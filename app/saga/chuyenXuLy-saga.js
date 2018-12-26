import { call, put, take } from "redux-saga/effects";
import * as actions from "../actions/action-types";
import * as Api from "../api";
import * as loginActions from "../actions/login-actions";
import * as chuyenXuLyActions from "../actions/chuyenXuLy-actions";
import * as rootActions from "../actions/root-actions";
import apiUrl from "../network/apiUrl";
import consts from "../const";

function getListUnitURL() {

    url = apiUrl.ROOT_URL + apiUrl.GET_LIST_UNIT_URL;
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

  function getUserConcurrentSendURL(unitId) {

    url = apiUrl.ROOT_URL + apiUrl.GET_USER_CONCURRENT_SEND_URL + unitId + "/";
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
  
  function* getUserConcurrentSend(unitId) {
    try {
      response = yield call(getUserConcurrentSendURL, unitId);
      //console.log("list unit:", response);
      if (typeof (response) != "undefined" && typeof (response.status) != "undefined") {
        if (response.status.code == "0" && typeof (response.data) != "undefined") {
          yield put(chuyenXuLyActions.getUserConcurrentSendSucessAction(response.data));
          return response;
        } else {
          yield put(chuyenXuLyActions.getUserConcurrentSendErrorAction(response.status.message));
          return undefined;
        }
      } else {
        yield put(chuyenXuLyActions.getUserConcurrentSendErrorAction("Không lấy được dữ liệu!"));
        return undefined;
      }
  
    } catch (error) {
  
      yield put(chuyenXuLyActions.getUserConcurrentSendErrorAction(String(error)));
    }
  }
  
  export function* chuyenXuLyFlow() {
    while (true) {
  
      yield take(actions.GET_LIST_UNIT);
      yield put(rootActions.controlProgress(true));
      yield call(getListUnit);
      yield put(rootActions.controlProgress(false));
  
    }
  }

  export function* userConcurrentSendFlow() {
    while (true) {
  
      const {unitId} = yield take(actions.GET_USER_CONCURRENT_SEND);
      yield put(rootActions.controlProgress(true));
      yield call(getUserConcurrentSend, unitId);
      yield put(rootActions.controlProgress(false));
  
    }
  }