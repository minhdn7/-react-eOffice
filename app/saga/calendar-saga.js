/**
 * Created by MinhDN.
 */
import {call, put, take} from "redux-saga/effects";
import * as actions from "../actions/action-types";
import * as Api from "../api";
import * as calendarActions from "../actions/calendar-actions";
import * as rootActions from "../actions/root-actions";
import apiUrl from "../network/apiUrl";
import consts from "../const";

function calendarRequestURL(startDate, endDate) {

  url = apiUrl.ROOT_URL + apiUrl.GET_SCHEDULES_URL;
  console.log("url:", url);
  console.log("startDate:", startDate);
  console.log("endDate:", endDate);
  console.log("token:", consts.BASE_HEADER["X-Authentication-Token"]);
  
  return fetch(url, {
  method: 'POST',
  headers: consts.BASE_HEADER,
  body: JSON.stringify({
    "startDate": startDate,
    "endDate": endDate,
  }),
})    
.then((response) => {
  return response.json();
})
.catch((error) => {
  console.log(error);
});

}


function* getCalendar(startDate, endDate) {
  try {
    console.log("startDate: ", startDate);
    console.log("endDate: ", endDate);
    const response = yield call(calendarRequestURL, startDate, endDate);
    console.log("data calendar: ", response);
    if(typeof(response) != "undefined"  && typeof(response.status) != "undefined"){
      if (response.status.code == "0") {
        yield put(calendarActions.setCalendarSuccess(response.data));
        return response;
      } else {
        // console.log("error calendar: ", response.status.message);
        yield put(calendarActions.setCalendarError(response.status.message));
        return undefined;
      }
    }else{
      yield put(calendarActions.setCalendarError("Không lấy được lịch họp!"));
      return undefined;
    }

  } catch (error) {
    
    yield put(calendarActions.setError(String(error)));
  }
}





export function* calendarFlow() {
  while (true) {
    const {startDate, endDate} = yield take(actions.GET_CALENDAR);
    yield put(rootActions.controlProgress(true));
    yield call(getCalendar, startDate, endDate);
    yield put(rootActions.controlProgress(false));

  }
}


