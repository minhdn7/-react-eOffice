/**
 * Created by MinhDN on 6/22/2018.
 */
import {call, put, take} from "redux-saga/effects";
import * as actions from "../actions/action-types";
import * as Api from "../api";
import * as loginActions from "../actions/login-actions";
import * as documentActions from "../actions/document-action";
import * as rootActions from "../actions/root-actions";
import apiUrl from "../network/apiUrl";
import consts from "../const";
import queryString from "query-string";

function getWaitingDocumentURL(pageNo, pageRec, param) {

    url = apiUrl.ROOT_URL + apiUrl.GET_DOC_WAIT_URL;
    console.log("url get waiting document:", url);
    return fetch(url, {
    method: 'POST',
    headers: consts.BASE_HEADER,
    body: JSON.stringify({
      "pageNo": pageNo,
      "pageRec": pageRec,
      "parameter": {
        "param": param,
      },

    }),
  })    
  .then((response) => {
    return response.json();
  })
  .catch((error) => {
    console.log(error);
  });

    
}


function getProcessedDocumentURL(pageNo, pageRec, param) {

  url = apiUrl.ROOT_URL + apiUrl.GET_DOC_PROCECSSED_URL;
  console.log("url get processed document:", url);
  return fetch(url, {
  method: 'POST',
  headers: consts.BASE_HEADER,
  body: JSON.stringify({
    "pageNo": pageNo,
    "pageRec": pageRec,
    "parameter": {
      "param": param,
    },

  }),
})    
.then((response) => {
  return response.json();
})
.catch((error) => {
  console.log(error);
});

  
}

function* getWaitingDocument(pageNo, pageRec, param) {
  try {
    response = yield call(getWaitingDocumentURL, pageNo, pageRec, param);
    console.log("getDocumentReport", response);
    if(typeof(response) != "undefined"  && typeof(response.status) != "undefined"){
      if (response.status.code == "0") {
        yield put(documentActions.setListWaitingDocumentSuccess(response.data));
        return response;
      } else {
        yield put(documentActions.setListDocumentErrorAction(response.status.message));
        return undefined;
      }
    }else{
      yield put(documentActions.setListDocumentErrorAction("Không lấy được dữ liệu!"));
      return undefined;
    }

  } catch (error) {
    
    yield put(documentActions.setListDocumentErrorAction(String(error)));
  }
}

function* getProcessedDocument(pageNo, pageRec, param) {
  try {
    response = yield call(getProcessedDocumentURL, pageNo, pageRec, param);
    console.log("getDocumentReport", response);
    if(typeof(response) != "undefined"  && typeof(response.status) != "undefined"){
      if (response.status.code == "0") {
        yield put(documentActions.setListProcessedDocumentSuccess(response.data));
        return response;
      } else {
        yield put(documentActions.setListDocumentErrorAction(response.status.message));
        return undefined;
      }
    }else{
      yield put(documentActions.setListDocumentErrorAction("Không lấy được dữ liệu!"));
      return undefined;
    }

  } catch (error) {
    
    yield put(documentActions.setListDocumentErrorAction(String(error)));
  }
}


export function* documentFlow() {
  while (true) {
    const{pageNo, pageRec, param} = yield take(actions.GET_LIST_WAITING_DOCUMENT);
    yield put(rootActions.controlProgress(true));
    yield call(getWaitingDocument, pageNo, pageRec, param);
    yield put(rootActions.controlProgress(false));

    const {pageNo2, pageRec2, param2} = yield take(actions.GET_LIST_PROCESSED_DOCUMENT);
    yield put(rootActions.controlProgress(true));
    yield call(getProcessedDocument, pageNo2, pageRec2, param2);
    yield put(rootActions.controlProgress(false));
  }
}


