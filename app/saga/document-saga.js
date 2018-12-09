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

function getWaitingDocumentURL(pageNo, pageRec, kho, param) {

    url = apiUrl.ROOT_URL + apiUrl.GET_DOC_WAIT_URL;
    console.log("url get waiting document:", url);
    console.log("pageNo:", pageNo);
    console.log("pageRec:", pageRec);
    console.log("kho:", kho);
    console.log("param:", param);
    return fetch(url, {
    method: 'POST',
    headers: consts.BASE_HEADER,
    body: JSON.stringify({
      "pageNo": pageNo,
      "pageRec": pageRec,
      "kho": kho,
      "param": param,

    }),
  })    
  .then((response) => {
    return response.json();
  })
  .catch((error) => {
    console.log(error);
  });

    
}


function getProcessedDocumentURL(pageNo, pageRec, kho, param) {

  url = apiUrl.ROOT_URL + apiUrl.GET_DOC_PROCECSSED_URL;
  console.log("url get processed document:", url);

  return fetch(url, {
  method: 'POST',
  headers: consts.BASE_HEADER,
  body: JSON.stringify({
    "pageNo": pageNo,
    "pageRec": pageRec,
    "kho": kho,
    "param": param,
    // "parameter": {
    //   "param": param,
    // },

  }),
})    
.then((response) => {
  return response.json();
})
.catch((error) => {
  console.log(error);
});

  
}

function getDetailDocumentURL(documentID) {

  url = apiUrl.ROOT_URL + apiUrl.GET_DETAIL_DOCUMENT_URL + documentID + '/';
  console.log("url get detail document:", url);

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

function* getDetailDocument(documentID) {
  try {
    response = yield call(getDetailDocumentURL, documentID);
    console.log("detail document data:", response);
    if(typeof(response) != "undefined"  && typeof(response.status) != "undefined"){
      if (response.status.code == "0" && typeof(response.data) != "undefined") {
        yield put(documentActions.setDetailDocumentSuccessAction(response.data));
        return response;
      } else {
        yield put(documentActions.setDetailDocumentErrorAction(response.status.message));
        return undefined;
      }
    }else{
      yield put(documentActions.setDetailDocumentErrorAction("Không lấy được dữ liệu!"));
      return undefined;
    }

  } catch (error) {
    
    yield put(documentActions.setDetailDocumentErrorAction(String(error)));
  }
}

function* getWaitingDocument(pageNo, pageRec, kho, param) {
  try {
    response = yield call(getWaitingDocumentURL, pageNo, pageRec, kho, param);
    console.log("wating data:", response);
    if(typeof(response) != "undefined"  && typeof(response.status) != "undefined"){
      if (response.status.code == "0" && typeof(response.data) != "undefined") {
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

function* getProcessedDocument(pageNo, pageRec, kho, param) {
  try {
    response = yield call(getProcessedDocumentURL, pageNo, pageRec, kho, param);
    console.log("processed data", response);
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

    const {pageNo, pageRec, kho, param}  = yield take(actions.GET_LIST_WAITING_DOCUMENT);
    yield put(rootActions.controlProgress(true));
    yield call(getWaitingDocument, pageNo, pageRec, kho, param);
    yield put(rootActions.controlProgress(false));

  }
}


export function* documentProcessedFlow() {
  while (true) {

    const {pageNo, pageRec, kho, param} = yield take(actions.GET_LIST_PROCESSED_DOCUMENT);
    yield put(rootActions.controlProgress(true));
    yield call(getProcessedDocument, pageNo, pageRec, kho, param);
    yield put(rootActions.controlProgress(false));

  }
}

export function* detailDocumentFlow() {
  while (true) {

    const {documentID} = yield take(actions.GET_DETAIL_DOCUMENT);
    yield put(rootActions.controlProgress(true));
    yield call(getDetailDocument, documentID);
    yield put(rootActions.controlProgress(false));

  }
}


