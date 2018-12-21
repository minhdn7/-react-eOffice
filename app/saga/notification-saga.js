/**
 * Created by MinhDN on 19/12/2018.
 */
import {call, put, take} from "redux-saga/effects";
import * as actions from "../actions/action-types";
import * as Api from "../api";
import * as loginActions from "../actions/login-actions";
import * as notificationActions from "../actions/notification-actions";
import * as rootActions from "../actions/root-actions";
import apiUrl from "../network/apiUrl";
import consts from "../const";
import queryString from "query-string";

function getListNotificationURL() {

    url = apiUrl.ROOT_URL + apiUrl.GET_NOTIFY_URL;
    console.log("url getListNotification", url);
    return fetch(url, {
      method: 'GET',
      headers: consts.BASE_HEADER
    })
    .then((list) => {
    return list.json();
    })
    .catch((error) => {
      console.log(String(error));
    });

    
}


function* getListNotification() {
  try {
    response = yield call(getListNotificationURL);
    console.log("getListNotification", response);
    if(typeof(response) != "undefined"  && typeof(response.status) != "undefined"){
        if (response.status.code == "0" && typeof(response.data) != "undefined") {
          if(response.data != null && response.data.length > 0){
            yield put(notificationActions.setListNotificationSuccessAction(response.data));
          }else{
            yield put(notificationActions.setListNotificationSuccessAction());
          }
  
          return response;
        } else {
          yield put(notificationActions.setListNotificationErrorAction(response.status.message));
          return undefined;
        }
      }else{
        yield put(notificationActions.setListNotificationErrorAction("Không lấy được dữ liệu!"));
        return undefined;
      }

  } catch (error) {
    
    yield put(notificationActions.setListNotificationErrorAction(String(error)));
  }
}



export function* listNotificationFlow() {
  while (true) {
    yield take(actions.GET_LIST_NOTIFICATION);
    yield put(rootActions.controlProgress(true));
    yield call(getListNotification);
    yield put(rootActions.controlProgress(false));

  }
}


