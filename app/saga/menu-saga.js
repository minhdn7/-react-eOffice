/**
 * Created by MinhDN on 6/22/2018.
 */
import {call, put, take} from "redux-saga/effects";
import * as actions from "../actions/action-types";
import * as Api from "../api";
import * as loginActions from "../actions/login-actions";
import * as menuActions from "../actions/menu-actions";
import * as rootActions from "../actions/root-actions";
import apiUrl from "../network/apiUrl";
import consts from "../const";
import queryString from "query-string";

function getCountMenuURL() {

    url = apiUrl.ROOT_URL + apiUrl.GET_COUNT_MENU_URL;
    console.log("count menu url", url);
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

function* getCountMenu() {
  try {
    response = yield call(getCountMenuURL);
    console.log("count menu response:", response);
    if(response  && response.status){
      if (response.status.code == "0") {
        yield put(menuActions.setCountMenuSuccess(response.data));
        return response;
      } else {
        yield put(menuActions.setCountMenuError(String(response.status.message)));
        return undefined;
      }
    }else{
      yield put(menuActions.setCountMenuError("Không lấy được dữ liệu menu!"));
      return undefined;
    }

  } catch (error) {
    
    yield put(menuActions.setCountMenuError(String(error)));
  }
}


export function* countMenuFlow() {
  while (true) {
    yield take(actions.GET_COUNT_MENU);
    yield put(rootActions.controlProgress(true));
    yield call(getCountMenu);
    yield put(rootActions.controlProgress(false));
  }
}


