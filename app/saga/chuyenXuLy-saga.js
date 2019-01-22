import { call, put, take } from "redux-saga/effects";
import * as actions from "../actions/action-types";
import * as Api from "../api";
import * as loginActions from "../actions/login-actions";
import * as chuyenXuLyActions from "../actions/chuyenXuLy-actions";
import * as rootActions from "../actions/root-actions";
import apiUrl from "../network/apiUrl";
import consts from "../const";
import { convertJsonToTreeMap, convertJsonToTreeMapCustom } from '../utils/Utils';

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

function getUserConcurrentSendURL(id, jobPosition, name) {

  url = apiUrl.ROOT_URL + apiUrl.GET_USER_CONCURRENT_SEND_URL;
  return fetch(url, {
    method: 'POST',
    headers: consts.BASE_HEADER,
    body: JSON.stringify({
      "id": id,
      "jobPosition": jobPosition,
      "name": name
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
}

function getListInternalURL(idDoc) {

  url = apiUrl.ROOT_URL + apiUrl.GET_LIST_INTERNAL_URL + idDoc + "/";
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

function getListGroupUnitlURL() {

  url = apiUrl.ROOT_URL + apiUrl.GET_LIST_GROUP_UNIT_URL;
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

function getListGroupUserURL() {

  url = apiUrl.ROOT_URL + apiUrl.GET_LIST_GROUP_USER_URL;
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

function documentMoveURL(actionType, approvedValue, coevalInternal, coevalProcess, comment, docId, hanXuLy, job, kho, primaryInternal, primaryProcess, referInternal, referProcess, sms, strAction) {
  url = apiUrl.ROOT_URL + apiUrl.CHANGE_DOC_DIRECT_URL
  return fetch(url, {
    method: 'POST',
    headers: consts.BASE_HEADER,
    body: JSON.stringify({
      "actionType": actionType,
      "approvedValue": approvedValue,
      "coevalInternal": coevalInternal,
      "coevalProcess": coevalProcess,
      "comment": comment,
      "docId": docId,
      "hanXuLy": hanXuLy,
      "job": job,
      "kho": kho,
      "primaryInternal": primaryInternal,
      "primaryProcess": primaryProcess,
      "referInternal": referInternal,
      "referProcess": referProcess,
      "sms": sms,
      "strAction": strAction
    }),
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
    console.log("list unit:", response);
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

function* getUserConcurrentSend(id, jobPosition, name) {
  try {
    response = yield call(getUserConcurrentSendURL, id, jobPosition, name);
    if (typeof (response) != "undefined" && typeof (response.status) != "undefined") {
      if (response.status.code == "0" && typeof (response.data) != "undefined") {
        let convertTreeData = convertJsonToTreeMapCustom(response.data);
        console.log("list user concurrent send:", convertTreeData);
        yield put(chuyenXuLyActions.getUserConcurrentSendSucessAction(convertTreeData));
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

function* getListInternal(idDoc) {
  try {
    response = yield call(getListInternalURL, idDoc);
    console.log("list internal:", response);
    if (typeof (response) != "undefined" && typeof (response.status) != "undefined") {
      if (response.status.code == "0" && typeof (response.data) != "undefined") {
        let convertTreeData = convertJsonToTreeMapCustom(response.data)
        yield put(chuyenXuLyActions.getListInternalSucessAction(convertTreeData));
        return response;
      } else {
        yield put(chuyenXuLyActions.getListInternalErrorAction(response.status.message));
        return undefined;
      }
    } else {
      yield put(chuyenXuLyActions.getListInternalErrorAction("Không lấy được dữ liệu!"));
      return undefined;
    }

  } catch (error) {

    yield put(chuyenXuLyActions.getListInternalErrorAction(String(error)));
  }
}

function* getListGroupUnit() {
  try {
    response = yield call(getListGroupUnitlURL);
    console.log("list group unit:", response);
    if (typeof (response) != "undefined" && typeof (response.status) != "undefined") {
      if (response.status.code == "0" && typeof (response.data) != "undefined") {
        let convertTreeData = convertJsonToTreeMapCustom(response.data)
        yield put(chuyenXuLyActions.getListGroupUnitSucessAction(convertTreeData));
        return response;
      } else {
        yield put(chuyenXuLyActions.getListGroupUnitErrorAction(response.status.message));
        return undefined;
      }
    } else {
      yield put(chuyenXuLyActions.getListGroupUnitErrorAction("Không lấy được dữ liệu!"));
      return undefined;
    }

  } catch (error) {

    yield put(chuyenXuLyActions.getListGroupUnitErrorAction(String(error)));
  }
}

function* getListGroupUser() {
  try {
    response = yield call(getListGroupUserURL);
    console.log("list group user:", response);
    if (typeof (response) != "undefined" && typeof (response.status) != "undefined") {
      if (response.status.code == "0" && typeof (response.data) != "undefined") {
        yield put(chuyenXuLyActions.getListGroupUserSucessAction(convertJsonToTreeMapCustom(response.data)));
        return response;
      } else {
        yield put(chuyenXuLyActions.getListGroupUserErrorAction(response.status.message));
        return undefined;
      }
    } else {
      yield put(chuyenXuLyActions.getListGroupUserErrorAction("Không lấy được dữ liệu!"));
      return undefined;
    }

  } catch (error) {

    yield put(chuyenXuLyActions.getListGroupUserErrorAction(String(error)));
  }
}

function* documentMove(actionType, approvedValue, coevalInternal, coevalProcess, comment, docId, hanXuLy, job, kho, primaryInternal, primaryProcess, referInternal, referProcess, sms, strAction) {
  try {
    response = yield call(documentMoveURL, actionType, approvedValue, coevalInternal, coevalProcess, comment, docId, hanXuLy, job, kho, primaryInternal, primaryProcess, referInternal, referProcess, sms, strAction);
    console.log("result documentMove:", response);
    if (typeof (response) != "undefined" && typeof (response.status) != "undefined") {
      if (response.status.code == "0" && typeof (response.data) != "undefined") {
        yield put(chuyenXuLyActions.documentMoveSucessAction(response.data));
        return response;
      } else {
        yield put(chuyenXuLyActions.documentMoveErrorAction(response.status.message));
        return undefined;
      }
    } else {
      yield put(chuyenXuLyActions.documentMoveErrorAction("Server lỗi, vui lòng thử lại sau!"));
      return undefined;
    }

  } catch (error) {

    yield put(chuyenXuLyActions.documentMoveErrorAction(String(error)));
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

    const { id, jobPosition, name } = yield take(actions.GET_USER_CONCURRENT_SEND);
    yield put(rootActions.controlProgress(true));
    yield call(getUserConcurrentSend, id, jobPosition, name);
    yield put(rootActions.controlProgress(false));

  }
}

export function* getListInternalFlow() {
  while (true) {

    const { idDoc } = yield take(actions.GET_LIST_INTERNAL);
    yield put(rootActions.controlProgress(true));
    yield call(getListInternal, idDoc);
    yield put(rootActions.controlProgress(false));

  }
}

export function* getListGroupUnitFlow() {
  while (true) {

    yield take(actions.GET_LIST_GROUP_UNIT);
    yield put(rootActions.controlProgress(true));
    yield call(getListGroupUnit);
    yield put(rootActions.controlProgress(false));

  }
}

export function* getListGroupUserFlow() {
  while (true) {

    yield take(actions.GET_LIST_GROUP_USER);
    yield put(rootActions.controlProgress(true));
    yield call(getListGroupUser);
    yield put(rootActions.controlProgress(false));

  }
}

export function* documentMoveFlow() {
  while (true) {

    const { actionType, approvedValue, coevalInternal, coevalProcess, comment, docId, hanXuLy, job, kho, primaryInternal, primaryProcess, referInternal, referProcess, sms, strAction } = yield take(actions.DOCUMENT_MOVE);
    yield put(rootActions.controlProgress(true));
    yield call(documentMove, actionType, approvedValue, coevalInternal, coevalProcess, comment, docId, hanXuLy, job, kho, primaryInternal, primaryProcess, referInternal, referProcess, sms, strAction);
    yield put(rootActions.controlProgress(false));

  }
}