/**
 * Created by MinhDN.
 */
import * as actions from "../actions/action-types";


export function getCalendar(startDate, endDate) {
  return {
    type: actions.GET_CALENDAR,
    startDate: startDate,
    endDate: endDate
  }
}

export function setCalendarError(error) {
  console.log("action calendar: ", error);
  return {
    type: actions.GET_CALENDAR_ERROR,
    calendarError: error
  }
}

export function resetCalendarDate() {
  return {
    type: actions.RESET_CALENDAR_DATA,
    calendarData: []
  }
}

export function setCalendarSuccess(data) {
  return {
    type: actions.GET_CALENDAR_SUCCESS,
    calendarData: data
  }
}
