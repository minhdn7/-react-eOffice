import {call, put, take} from "redux-saga/effects";
import * as actions from "../actions/action-types";
import * as Api from "../api";
import * as loginActions from "../actions/login-actions";
import * as documentActions from "../actions/document-action";
import * as rootActions from "../actions/root-actions";
import apiUrl from "../network/apiUrl";
import consts from "../const";

function getListCommentURL(param) {

    url = apiUrl.ROOT_URL + apiUrl.GET_DOC_WAIT_URL;
    console.log("url get waiting document:", url);
    console.log("param:", param);
    return fetch(url, {
    method: 'GET',
    headers: consts.BASE_HEADER,
    body: JSON.stringify({
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

function* getListComment(param) {
    try {
      response = yield call(getListCommentURL, param);
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
