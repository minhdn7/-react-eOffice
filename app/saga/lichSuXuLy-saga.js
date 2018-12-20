import { call, put, take } from "redux-saga/effects";
import * as actions from "../actions/action-types";
import * as Api from "../api";
import * as loginActions from "../actions/login-actions";
import * as lichSuXuLyActions from "../actions/lichSuXuLy-action";
import * as rootActions from "../actions/root-actions";
import apiUrl from "../network/apiUrl";
import consts from "../const";

function getListActivityLogURL(docId) {

  url = apiUrl.ROOT_URL + apiUrl.GET_LIST_ACTIVITY_LOG_URL + docId + "/";
  console.log("docId:", docId);
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

function* getListActivityLog(docId) {
  try {
    response = yield call(getListActivityLogURL, docId);
    console.log("list activity log:", response);
    if (typeof (response) != "undefined" && typeof (response.status) != "undefined") {
      if (response.status.code == "0" && typeof (response.data) != "undefined") {
        yield put(lichSuXuLyActions.setListActivityLogSuccessAction(response.data));
        return response;
      } else {
        yield put(lichSuXuLyActions.setListActivityLogErrorAction(response.status.message));
        return undefined;
      }
    } else {
      yield put(lichSuXuLyActions.setListActivityLogErrorAction("Không lấy được dữ liệu!"));
      return undefined;
    }

  } catch (error) {

    yield put(lichSuXuLyActions.setListActivityLogErrorAction(String(error)));
  }
}

export function* lichSuXuLyFlow() {
  while (true) {

    const { docId } = yield take(actions.GET_ACTIVITY_LOG);
    yield put(rootActions.controlProgress(true));
    yield call(getListActivityLog, docId);
    yield put(rootActions.controlProgress(false));

  }
}