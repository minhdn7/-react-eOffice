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
  
  function* getListUnit() {
    try {
      response = yield call(getListUnitURL);
      //console.log("list unit:", response);
      if (typeof (response) != "undefined" && typeof (response.status) != "undefined") {
        if (response.status.code == "0" && typeof (response.data) != "undefined") {
          yield put(chuyenXuLyActions.getListUnitSucessAction(response.data));
          return response;
        } else {
          yield put(chuyenXuLyActions.getListUnitErorrAction(response.status.message));
          return undefined;
        }
      } else {
        yield put(chuyenXuLyActions.getListUnitErorrAction("Không lấy được dữ liệu!"));
        return undefined;
      }
  
    } catch (error) {
  
      yield put(chuyenXuLyActions.getListUnitErorrAction(String(error)));
    }
  }
  
  export function* chuyenXuLyFlow() {
    while (true) {
  
      //yield take(actions.GET_LIST_UNIT);
      yield put(rootActions.controlProgress(true));
      yield call(getListUnit);
      yield put(rootActions.controlProgress(false));
  
    }
  }