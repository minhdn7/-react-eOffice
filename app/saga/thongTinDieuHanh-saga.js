import { call, put, take } from "redux-saga/effects";
import * as actions from "../actions/action-types";
import * as thongTinDieuHanhActions from "../actions/thongTinDieuHanh-actions";
import * as rootActions from "../actions/root-actions";
import apiUrl from "../network/apiUrl";
import consts from "../const";
import { convertJsonToTreeMapCustom } from '../utils/Utils';

function getListReceiveURL(pageNo, pageRec, startDate, endDate, nguoiGui, tieuDe) {
  let url = apiUrl.ROOT_URL + apiUrl.GET_CHIDAO_NHAN_URL;
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

function getListSendURL(endDate, pageNo, pageRec, startDate, tieuDe) {
  let url = apiUrl.ROOT_URL + apiUrl.GET_CHIDAO_GUI_URL;
  return fetch(url, {
    method: 'POST',
    headers: consts.BASE_HEADER,
    body: JSON.stringify({
      "endDate": endDate,
      "pageNo": pageNo,
      "pageRec": pageRec,
      "startDate": startDate,
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

function getListUserUnitURL(param) {
  let url = apiUrl.ROOT_URL + apiUrl.GET_PERSON_CHIDAO_URL;
  return fetch(url, {
    method: 'POST',
    headers: consts.BASE_HEADER,
    body: JSON.stringify({
      "param": param
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
}

function getDetailByIdURL(id){
  let url = apiUrl.ROOT_URL + apiUrl.GET_DETAIL_CHIDAO_URL + id + "/";
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

function getListFilesByIdURL(id){
  let url = apiUrl.ROOT_URL + apiUrl.GET_FILE_CHIDAO_URL + id + "/";
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

function* getListReceive(pageNo, pageRec, startDate, endDate, nguoiGui, tieuDe) {
  try {
    response = yield call(getListReceiveURL, pageNo, pageRec, startDate, endDate, nguoiGui, tieuDe);
    if (typeof (response) != "undefined" && typeof (response.status) != "undefined") {
      if (response.status.code == "0" && typeof (response.data) != "undefined") {
        yield put(thongTinDieuHanhActions.getListReceiveSucessAction(response.data));
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

function* getListSend(endDate, pageNo, pageRec, startDate, tieuDe) {
  try {
    let response = yield call(getListSendURL, endDate, pageNo, pageRec, startDate, tieuDe);
    if (response.status.code == "0" && typeof (response.data) != "undefined") {
      yield put(thongTinDieuHanhActions.getListSendSucessAction(response.data));
      return response;
    } else {
      yield put(thongTinDieuHanhActions.getListSendErrorAction(response.status.message));
      return undefined;
    }
  } catch (error) {
    yield put(thongTinDieuHanhActions.getListSendErrorAction(String(error)));
  }
}

function* getListUserUnit(param) {
  try {
    let response = yield call(getListUserUnitURL, param);
    if (response.status.code == "0" && typeof (response.data) != "undefined") {
      let convertTreeData = convertJsonToTreeMapCustom(response.data);
      yield put(thongTinDieuHanhActions.getListUserUnitSucessAction(convertTreeData));
      return response;
    } else {
      yield put(thongTinDieuHanhActions.getListReceiveErrorAction(response.status.message));
      return undefined;
    }
  } catch (error) {
    yield put(thongTinDieuHanhActions.getListUserUnitErrorAction(String(error)));
  }
}

function* getDetailById(id) {
  try {
    let response = yield call(getDetailByIdURL, id);
    if (response.status.code == "0" && typeof (response.data) != "undefined") {
      yield put(thongTinDieuHanhActions.getDetailByIdSucessAction(response.data));
      return response;
    } else {
      yield put(thongTinDieuHanhActions.getDetailByIdErrorAction(response.status.message));
      return undefined;
    }
  } catch (error) {
    yield put(thongTinDieuHanhActions.getDetailByIdErrorAction(String(error)));
  }
}

function* getListFilesById(id) {
  try {
    let response = yield call(getListFilesByIdURL, id);
    if (response.status.code == "0" && typeof (response.data) != "undefined") {
      yield put(thongTinDieuHanhActions.getListFilesByIdSucessAction(response.data));
      return response;
    } else {
      yield put(thongTinDieuHanhActions.getListFilesByIdErrorAction(response.status.message));
      return undefined;
    }
  } catch (error) {
    yield put(thongTinDieuHanhActions.getListFilesByIdErrorAction(String(error)));
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

export function* getListSendFlow() {
  while (true) {

    const { endDate, pageNo, pageRec, startDate, tieuDe } = yield take(actions.GET_LIST_SEND);
    yield put(rootActions.controlProgress(true));
    yield call(getListSend, endDate, pageNo, pageRec, startDate, tieuDe);
    yield put(rootActions.controlProgress(false));

  }
}

export function* getListUserUnitFlow() {
  while (true) {

    const { param } = yield take(actions.GET_LIST_USER_UNIT);
    yield put(rootActions.controlProgress(true));
    yield call(getListUserUnit, param);
    yield put(rootActions.controlProgress(false));

  }
}

export function* getDetailByIdFlow() {
  while (true) {

    const { id } = yield take(actions.GET_INFO_DETAIL_BY_ID);
    yield put(rootActions.controlProgress(true));
    yield call(getDetailById, id);
    yield put(rootActions.controlProgress(false));

  }
}

export function* getDetailByIdFlow() {
  while (true) {

    const { id } = yield take(actions.INFO_GET_FILES_BY_ID);
    yield put(rootActions.controlProgress(true));
    yield call(getListFilesById, id);
    yield put(rootActions.controlProgress(false));

  }
}