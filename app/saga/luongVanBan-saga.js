import { call, put, take } from "redux-saga/effects";
import * as actions from "../actions/action-types";
import * as Api from "../api";
import * as loginActions from "../actions/login-actions";
import * as luongVanBanActions from "../actions/luongVanBan-actions";
import * as rootActions from "../actions/root-actions";
import apiUrl from "../network/apiUrl";
import consts from "../const";

function getLuongVanBanURL(instanceId, processId){
    url = apiUrl.GET_LUONG_VAN_BAN_URL + "insid=" + instanceId + "&defid=" + processId;
    return fetch(url, {
      method: 'GET',
      headers: consts.BASE_HEADER,
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
}

function* getLuongVanBan(instanceId, processId) {
    try {
      response = yield call(getLuongVanBanURL, instanceId, processId);
      console.log("luong van ban:", response);
      if (typeof (response) != "undefined" && typeof (response.status) != "undefined") {
        if (response.status == "200") {
          yield put(luongVanBanActions.setLuongVanBanSucessAction(response));
          return response;
        } else {
          yield put(luongVanBanActions.setLuongVanBanErorrAction("Không lấy được dữ liệu!"));
          return undefined;
        }
      } else {
        yield put(luongVanBanActions.setLuongVanBanErorrAction("Không lấy được dữ liệu!"));
        return undefined;
      }
  
    } catch (error) {
  
      yield put(luongVanBanActions.setLuongVanBanErorrAction(String(error)));
    }
  }
  
  export function* luongVanBanFlow() {
    while (true) {
  
      const { instanceId, processId } = yield take(actions.GET_LUONG_VAN_BAN);
      yield put(rootActions.controlProgress(true));
      yield call(getLuongVanBan, instanceId, processId);
      yield put(rootActions.controlProgress(false));
  
    }
  }