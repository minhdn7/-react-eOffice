import { call, put, take } from "redux-saga/effects";
import * as actions from "../actions/action-types";
import * as thongTinDieuHanhActions from "../actions/thongTinDieuHanh-actions";
import * as rootActions from "../actions/root-actions";
import apiUrl from "../network/apiUrl";
import consts from "../const";
import { convertJsonToTreeMapCustom } from '../utils/Utils';
import { Yellow } from "react-native-material-color";

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

function deleteInfoByIdURL(id){
  let url = apiUrl.ROOT_URL + apiUrl.GET_DELETE_CHIDAO_URL + id + "/";
  return fetch(url, {
    method: 'DELETE',
    headers: consts.BASE_HEADER,
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
}

function getFlowByIdURL(id){
  let url = apiUrl.ROOT_URL + apiUrl.GET_FLOW_CHIDAO_URL + id + "/";
  return fetch(url, {
    method: 'GET',
    headers: consts.BASE_HEADER,
  }).then((response) => {
    return response.json();
  }).catch((error) => {
    console.log(error);
  });
}

function getUserReceiverURL(id, name, pageNo, pageRec){
  let url = apiUrl.ROOT_URL + apiUrl.GET_PERSON_RECEIVED_CHIDAO_URL;
  return fetch(url, {
    method: 'POST',
    headers: consts.BASE_HEADER,
    body: JSON.stringify({
      "id": id,
      "name": name,
      "pageNo": pageNo,
      "pageRec": pageRec
    }),
  }).then((response) => {
    return response.json();
  }).catch((error) => {
    console.log(error);
  });
}

function createURL(chuyenTiep, deleteFiles, files, id, noiDung, parentId, tieuDe){
  let url = apiUrl.ROOT_URL + apiUrl.CREATE_CHIDAO_URL;
  return fetch(url, {
    method: 'POST',
    headers: consts.BASE_HEADER,
    body: JSON.stringify({
      "chuyenTiep": chuyenTiep,
      "deleteFiles": deleteFiles,
      "files": files,
      "id": id,
      "noiDung": noiDung,
      "parentId": parentId,
      "tieuDe": tieuDe
    }),
  }).then((response) => {
    return response.json();
  }).catch((error) => {
    console.log(error);
  });
}

function updateEmployeeURL(empAdd, empDelete, id){
  let url = apiUrl.ROOT_URL + apiUrl.SAVE_PERSON_CHIDAO_URL;
  return fetch(url, {
    method: 'POST',
    headers: consts.BASE_HEADER,
    body: JSON.stringify({
      "empAdd": empAdd,
      "empDelete": empDelete,
      "id": id
    }),
  }).then((response) => {
    return response.json();
  }).catch((error) => {
    console.log(error);
  });
}

function sendURL(id, sms, user){
  let url = apiUrl.ROOT_URL + apiUrl.SEND_CHIDAO_URL;
  return fetch(url, {
    method: 'POST',
    headers: consts.BASE_HEADER,
    body: JSON.stringify({
      "id": id,
      "sms": sms,
      "user": user
    }),
  }).then((response) => {
    return response.json();
  }).catch((error) => {
    console.log(error);
  });
}


function* getListReceive(pageNo, pageRec, startDate, endDate, nguoiGui, tieuDe) {
  try {
    response = yield call(getListReceiveURL, pageNo, pageRec, startDate, endDate, nguoiGui, tieuDe);
    //console.log("list receive: ", response);
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
    return undefined;
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
    return undefined;
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
    return undefined;
  }
}

function* deleteInfoById(id) {
  try {
    let response = yield call(deleteInfoByIdURL, id);
    if (response.status.code == "0" && typeof (response.data) != "undefined") {
      yield put(thongTinDieuHanhActions.deleteInfoByIdSucess(response.data));
      return response;
    } else {
      yield put(thongTinDieuHanhActions.deleteInfoByIdError(response.status.message));
      return undefined;
    }
  } catch (error) {
    yield put(thongTinDieuHanhActions.deleteInfoByIdError(String(error)));
    return undefined;
  }
}

function* getFlowById(id){
  try {
    let response = yield call(getFlowByIdURL, id);
    console.log("list flow: ", response);
    if(response.status.code === '0' && typeof(response.data) !== "undefined"){
      yield put(thongTinDieuHanhActions.getFlowByIdSucessAction(response.data));
      return response;
    }else{
      yield put(thongTinDieuHanhActions.getFlowByIdErrorAction(response.status.message));
      return undefined;
    }
  } catch (error) {
    yield put(thongTinDieuHanhActions.getFlowByIdErrorAction(String(error)));
    return undefined;
  }
}

function* getUserReceiver(id, name, pageNo, pageRec){
  try {
    let response = yield call(getUserReceiverURL, id, name, pageNo, pageRec);
    //console.log("list getUserReceiver: ", response);
    if(response.status.code === '0' && typeof(response.data) !== "undefined"){
      yield put(thongTinDieuHanhActions.getUserReceiverSucessAction(response.data));
      return response;
    }else{
      yield put(thongTinDieuHanhActions.getUserReceiverErrorAction(response.status.message));
      return undefined;
    }
  } catch (error) {
    yield put(thongTinDieuHanhActions.getUserReceiverErrorAction(String(error)));
    return undefined;
  }
}

function* create(chuyenTiep, deleteFiles, files, id, noiDung, parentId, tieuDe){
  try {
    let response = yield call(createURL, chuyenTiep, deleteFiles, files, id, noiDung, parentId, tieuDe);
    console.log("create: ", response);
    if(response.status.code === '0' && typeof(response.data) !== "undefined"){
      yield put(thongTinDieuHanhActions.createSucessAction(response.data));
      return response;
    }else{
      yield put(thongTinDieuHanhActions.createErrorAction(response.status.message));
      return undefined;
    }
  } catch (error) {
    yield put(thongTinDieuHanhActions.createErrorAction(String(error)));
    return undefined;
  }
}

function* updateEmployee(empAdd, empDelete, id){
  try {
    let response = yield call(updateEmployeeURL, empAdd, empDelete, id);
    console.log("updateEmployee: ", response);
    if(response.status.code === '0' && typeof(response.data) !== "undefined"){
      yield put(thongTinDieuHanhActions.updateEmployeeSucessAction(response.data));
      return response;
    }else{
      yield put(thongTinDieuHanhActions.updateEmployeeErrorAction(response.status.message));
      return undefined;
    }
  } catch (error) {
    yield put(thongTinDieuHanhActions.updateEmployeeErrorAction(String(error)));
    return undefined;
  }
}

function* send(id, sms, user){
  try {
    let response = yield call(sendURL, id, sms, user);
    console.log("send: ", response);
    if(response.status.code === '0' && typeof(response.data) !== "undefined"){
      yield put(thongTinDieuHanhActions.sendSucessAction(response.data));
      return response;
    }else{
      yield put(thongTinDieuHanhActions.sendErrorAction(response.status.message));
      return undefined;
    }
  } catch (error) {
    yield put(thongTinDieuHanhActions.sendErrorAction(String(error)));
    return undefined;
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

export function* getListFilesByIdFlow() {
  while (true) {

    const { id } = yield take(actions.INFO_GET_FILES_BY_ID);
    yield put(rootActions.controlProgress(true));
    yield call(getListFilesById, id);
    yield put(rootActions.controlProgress(false));

  }
}

export function* deleteInfoByIdFlow() {
  while (true) {

    const { id } = yield take(actions.INFO_DELETE_BY_ID);
    yield put(rootActions.controlProgress(true));
    yield call(deleteInfoById, id);
    yield put(rootActions.controlProgress(false));

  }
}

export function* getFlowByIdFlow(){
  while(true){
    const { id } = yield take(actions.INFO_GET_FLOW_BY_ID);
    yield put(rootActions.controlProgress(true));
    yield call(getFlowById, id);
    yield put(rootActions.controlProgress(false));
  }
}

export function* getUserReceiverFlow(){
  while(true){
    const { id, name, pageNo, pageRec } = yield take(actions.INFO_GET_USER_RECEIVER);
    yield put(rootActions.controlProgress(true));
    yield call(getUserReceiver, id, name, pageNo, pageRec);
    yield put(rootActions.controlProgress(false));
  }
}

export function* createFlow(){
  while(true){
    const { chuyenTiep, deleteFiles, files, id, noiDung, parentId, tieuDe } = yield take(actions.INFO_CREATE);
    yield put(rootActions.controlProgress(true));
    yield call(create, chuyenTiep, deleteFiles, files, id, noiDung, parentId, tieuDe);
    yield put(rootActions.controlProgress(false));
  }
}

export function* updateEmployeeFlow(){
  while(true){
    const { empAdd, empDelete, id } = yield take(actions.INFO_UPDATE_EMPLOYEE);
    yield put(rootActions.controlProgress(true));
    yield call(create, empAdd, empDelete, id);
    yield put(rootActions.controlProgress(false));
  }
}

export function* sendFlow(){
  while(true){
    const { id, sms, user } = yield take(actions.INFO_SEND);
    yield put(rootActions.controlProgress(true));
    yield call(create, id, sms, user);
    yield put(rootActions.controlProgress(false));
  }
}