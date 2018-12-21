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

function getCommentDocumentURL(documentID) {

  url = apiUrl.ROOT_URL + apiUrl.GET_LOGS_DOCUMENT_URL + documentID + '/';
  console.log("url get comment document:", url);

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

function getFinishDocumentTypeURL(documentID) {

  url = apiUrl.ROOT_URL + apiUrl.CHECK_FINISH_DOC_URL + documentID + '/';
  console.log("url get finish document type:", url);

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

function getSignedDocumentURL(documentID) {

  url = apiUrl.ROOT_URL + apiUrl.MARK_DOC_URL + documentID + '/';
  console.log("url get signed document:", url);

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

function getFinishDocumentURL(documentID) {

  url = apiUrl.ROOT_URL + apiUrl.FINISH_DOC_URL + documentID + '/';
  console.log("url get finish document:", url);

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

function* getFinishDocument(documentID) {
  try {
    response = yield call(getFinishDocumentURL, documentID);
    console.log("check finish document data:", response);
    if(typeof(response) != "undefined"  && typeof(response.status) != "undefined"){
      if (response.status.code == "0" && typeof(response.data) != "undefined") {
        yield put(documentActions.setFinishDocumentSuccessAction(response.data));
        return response;
      } else {
        yield put(documentActions.setFinishDocumentSuccessAction(response.status.message));
        return undefined;
      }
    }else{
      yield put(documentActions.setFinishDocumentErrorAction("Không lấy được dữ liệu!"));
      return undefined;
    }

  } catch (error) {
    
    yield put(documentActions.setFinishDocumentErrorAction(String(error)));
  }
}


function* getSignedDocument(documentID) {
  try {
    response = yield call(getSignedDocumentURL, documentID);
    console.log("get signed document data:", response);
    if(typeof(response) != "undefined"  && typeof(response.status) != "undefined"){
      if (response.status.code == "0" && typeof(response.data) != "undefined") {
        yield put(documentActions.setSignedDocumentResultAction(response.data));
        return response;
      } else {
        yield put(documentActions.setSignedDocumentResultAction(response.status.message));
        return undefined;
      }
    }else{
      yield put(documentActions.setSignedDocumentResultAction("Không lấy được dữ liệu!"));
      return undefined;
    }

  } catch (error) {
    
    yield put(documentActions.setSignedDocumentResultAction(String(error)));
  }
}


function* getFinishDocumentType(documentID) {
  try {
    response = yield call(getFinishDocumentTypeURL, documentID);
    console.log("check finish document data:", response);
    if(typeof(response) != "undefined"  && typeof(response.status) != "undefined"){
      if (response.status.code == "0" && typeof(response.data) != "undefined") {
        yield put(documentActions.setFinishDocumentTypeSuccessAction(response.data));
        return response;
      } else {
        yield put(documentActions.setFinishDocumentTypeErrorAction(response.status.message));
        return undefined;
      }
    }else{
      yield put(documentActions.setFinishDocumentTypeErrorAction("Không lấy được dữ liệu!"));
      return undefined;
    }

  } catch (error) {
    
    yield put(documentActions.setFinishDocumentTypeErrorAction(String(error)));
  }
}

function* getCommentDocument(documentID) {
  try {
    response = yield call(getCommentDocumentURL, documentID);
    console.log("comment document data:", response);
    if(typeof(response) != "undefined"  && typeof(response.status) != "undefined"){
      if (response.status.code == "0" && typeof(response.data) != "undefined") {
        yield put(documentActions.setCommentDocumentSuccessAction(response.data));
        return response;
      } else {
        yield put(documentActions.setCommentDocumentErrorAction(response.status.message));
        return undefined;
      }
    }else{
      yield put(documentActions.setCommentDocumentErrorAction("Không lấy được dữ liệu!"));
      return undefined;
    }

  } catch (error) {
    
    yield put(documentActions.setCommentDocumentErrorAction(String(error)));
  }
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
        if(response.data != null && response.data.length > 0){
          yield put(documentActions.setListWaitingDocumentSuccess(response.data));
        }else{
          yield put(documentActions.setListDocumentErrorAction());
        }

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
        if(response.data != null && response.data.length > 0){
          yield put(documentActions.setListProcessedDocumentSuccess(response.data));
        }else{
          yield put(documentActions.setListProcessedDocumentSuccess([]));
        }

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


export function* logCommentDocumentFlow() {
  while (true) {

    const {documentID} = yield take(actions.GET_LOG_COMMENT_DOCUMENT);
    yield put(rootActions.controlProgress(true));
    yield call(getCommentDocument, documentID);
    yield put(rootActions.controlProgress(false));

  }
}

export function* checkFinishDocumentTypeFlow() {
  while (true) {

    const {documentID} = yield take(actions.GET_FINISH_DOCUMENT_TYPE);
    yield put(rootActions.controlProgress(true));
    yield call(getFinishDocumentType, documentID);
    yield put(rootActions.controlProgress(false));

  }
}

export function* checkSignedDocumentFlow() {
  while (true) {

    const {documentID} = yield take(actions.CHECK_SIGNED_DOCUMENT);
    yield put(rootActions.controlProgress(true));
    yield call(getSignedDocument, documentID);
    yield put(rootActions.controlProgress(false));

  }
}

export function* checkFinishDocumentFlow() {
  while (true) {

    const {documentID} = yield take(actions.GET_FINISH_DOCUMENT);
    yield put(rootActions.controlProgress(true));
    yield call(getFinishDocument, documentID);
    yield put(rootActions.controlProgress(false));

  }
}


