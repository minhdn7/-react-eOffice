import {call, put, take} from "redux-saga/effects";
import * as actions from "../actions/action-types";
import * as Api from "../api";
import * as loginActions from "../actions/login-actions";
import * as documentActions from "../actions/document-action";
import * as fileActions from "../actions/file-actions";
import * as rootActions from "../actions/root-actions";
import apiUrl from "../network/apiUrl";
import consts from "../const";
import queryString from "query-string";


function getAttackFileURL(documentID) {

    url = apiUrl.ROOT_URL + apiUrl.GET_ATTACH_FILE_DOCUMENT_URL + documentID + '/';
    console.log("url get attack file:", url);
  
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
  
  function* getAttackFile(documentID) {
    try {
      response = yield call(getAttackFileURL, documentID);
      console.log("attack file data:", response);
      if(typeof(response) != "undefined"  && typeof(response.status) != "undefined"){
        if (response.status.code == "0" && typeof(response.data) != "undefined") {
          yield put(fileActions.setAttackFileSuccessAction(response.data));
          return response;
        } else {
          yield put(fileActions.setAttackFileErrorAction(response.status.message));
          return undefined;
        }
      }else{
        yield put(fileActions.setAttackFileErrorAction("Không lấy được dữ liệu!"));
        return undefined;
      }
  
    } catch (error) {
      
      yield put(fileActions.setAttackFileErrorAction(String(error)));
    }
  }

export function* attackFileFlow() {
    while (true) {
  
      const {documentID} = yield take(actions.GET_ATTACK_FILE_DOCUMENT);
      yield put(rootActions.controlProgress(true));
      yield call(getAttackFile, documentID);
      yield put(rootActions.controlProgress(false));
  
    }
  }