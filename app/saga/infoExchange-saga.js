import { call, put, take } from "redux-saga/effects";
import * as actions from "../actions/action-types";
import * as Api from "../api";
import * as loginActions from "../actions/login-actions";
import * as infoExchangeActions from "../actions/infoExchange-actions";
import * as rootActions from "../actions/root-actions";
import apiUrl from "../network/apiUrl";
import consts from "../const";

function getListCommentURL(pageNo, pageRec, docId) {

  url = apiUrl.ROOT_URL + apiUrl.GET_LIST_COMMENT_URL + docId + "/" + pageNo + "/" + pageRec + "/";
  console.log("url get waiting document:", url);
  console.log("docId:", docId);
  console.log('authen', consts.BASE_HEADER["X-Authentication-Token"]);
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

function guiYKienTraoDoiURL(docId, comments) {
  url = apiUrl.ROOT_URL + apiUrl.GUI_Y_KIEN_TRAO_DOI;
  console.log("url get processed document:", url);
  return fetch(url, {
    method: 'POST',
    headers: consts.BASE_HEADER,
    body: JSON.stringify({
      "docId": docId,
      "comments": comments,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
}

function* getListComment(pageNo, pageRec, docId) {
  try {
    response = yield call(getListCommentURL, pageNo, pageRec, docId);
    console.log("list comment:", response);
    if (typeof (response) != "undefined" && typeof (response.status) != "undefined") {
      if (response.status.code == "0" && typeof (response.data) != "undefined") {
        yield put(infoExchangeActions.setListCommentSuccessAction(response.data));
        return response;
      } else {
        yield put(infoExchangeActions.setListCommentErrorAction(response.status.message));
        return undefined;
      }
    } else {
      yield put(infoExchangeActions.setListCommentErrorAction("Không lấy được dữ liệu!"));
      return undefined;
    }

  } catch (error) {

    yield put(infoExchangeActions.setListCommentErrorAction(String(error)));
  }
}

function* guiYKienTraoDoi(docId, comments){
  try {
    response = yield call(guiYKienTraoDoiURL, docId, comments);
    if(typeof(response) != "undefined"  && typeof(response.status) != "undefined"){
      if (response.status.code == "0") {
        yield put(infoExchangeActions.guiYKienTraoDoiSucessAction(response.data));
        return response;
      } else {
        yield put(infoExchangeActions.guiYKienTraoDoiErrorAction(response.status.message));
        return undefined;
      }
    }else{
      yield put(infoExchangeActions.guiYKienTraoDoiErrorAction ("Không lấy được dữ liệu!"));
      return undefined;
    }

  } catch (error) {
    
    yield put(infoExchangeActions.guiYKienTraoDoiErrorAction(String(error)));
  }
}

export function* infoExchangeFlow() {
  while (true) {

    const { pageNo, pageRec, docId } = yield take(actions.GET_LIST_COMMENT);
    yield put(rootActions.controlProgress(true));
    yield call(getListComment, pageNo, pageRec, docId);
    yield put(rootActions.controlProgress(false));

  }
}

export function* guiYKienTraoDoiFlow(){
  while (true) {
    const { docId, comments } = yield take(actions.GUI_Y_KIEN_TRAO_DOI);
    yield put(rootActions.controlProgress(true));
    yield call(guiYKienTraoDoi, docId, comments);
    yield put(rootActions.controlProgress(false));

  }
}