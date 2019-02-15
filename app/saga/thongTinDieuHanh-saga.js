import { call, put, take } from "redux-saga/effects";
import * as actions from "../actions/action-types";
import * as thongTinDieuHanhActions from "../actions/thongTinDieuHanh-actions";
import * as rootActions from "../actions/root-actions";
import apiUrl from "../network/apiUrl";
import consts from "../const";

function getListReceiveURL(pageNo, pageRec, startDate, endDate, nguoiGui, tieuDe) {
    url = apiUrl.ROOT_URL + apiUrl.GET_CHIDAO_NHAN_URL;
  return fetch(url, {
    method: 'POST',
    headers: consts.BASE_HEADER,
    body: JSON.stringify({
        "pageNo": pageNo,
        "pageRec": pageRec,
        "startDate": startDate,
        "endDate": endDate,
        "nguoiGui": nguoiGui,
        "tieuDe": tieuDe
      }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
}

function* getListReceive() {
    try {
      response = yield call(getListReceiveURL);
      console.log("list receive:", response);
      if (typeof (response) != "undefined" && typeof (response.status) != "undefined") {
        if (response.status.code == "0" && typeof (response.data) != "undefined") {
          yield put(thongTinDieuHanhActions.getListReceiveAction(response.data));
          return response;
        } else {
          yield put(thongTinDieuHanhActions.getListReceiveErrorAction(response.status.message));
          return undefined;
        }
      } else {
        yield put(thongTinDieuHanhActions.getListReceiveErrorAction("Không lấy được dữ liệu!"));
        return undefined;
      }
  
    } catch (error) {
  
      yield put(thongTinDieuHanhActions.getListReceiveErrorAction(String(error)));
    }
  }

  export function* getListReceiveFlow() {
    while (true) {
  
      const { pageNo, pageRec, startDate, endDate, nguoiGui, tieuDe } = yield take(actions.GET_LIST_RECEIVE);
      yield put(rootActions.controlProgress(true));
      yield call(getListReceive, pageNo, pageRec, startDate, endDate, nguoiGui, tieuDe);
      yield put(rootActions.controlProgress(false));
  
    }
  }