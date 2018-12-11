import {call, put, take} from "redux-saga/effects";
import * as actions from "../actions/action-types";
import * as Api from "../api";
import * as loginActions from "../actions/login-actions";
import * as infoExchangeActions from "../actions/infoExchange-actions";
import * as rootActions from "../actions/root-actions";
import apiUrl from "../network/apiUrl";
import consts from "../const";

function getListCommentURL(pageNo, pageRec, param) {

    url = apiUrl.ROOT_URL + apiUrl.GET_LIST_COMMENT_URL + param + "/" + pageNo + "/" + pageRec + "/";
    console.log("url get waiting document:", url);
    console.log("param:", param);
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

function* getListComment(pageNo, pageRec, param) {
    try {
      response = yield call(getListCommentURL, pageNo, pageRec, param);
      console.log("list comment:", response);
      if(typeof(response) != "undefined"  && typeof(response.status) != "undefined"){
        if (response.status.code == "0" && typeof(response.data) != "undefined") {
          yield put(infoExchangeActions.setListCommentSuccessAction(response.data));
          return response;
        } else {
          yield put(infoExchangeActions.setListCommentErrorAction(response.status.message));
          return undefined;
        }
      }else{
        yield put(infoExchangeActions.setListCommentErrorAction("Không lấy được dữ liệu!"));
        return undefined;
      }
  
    } catch (error) {
      
      yield put(infoExchangeActions.setListCommentErrorAction(String(error)));
    }
  }

  export function* infoExchangeFlow() {
    while (true) {
  
      const {pageNo, pageRec, param} = yield take(actions.GET_LIST_COMMENT);
      yield put(rootActions.controlProgress(true));
      yield call(getListComment, pageNo, pageRec, param);
      yield put(rootActions.controlProgress(false));
  
    }
  }