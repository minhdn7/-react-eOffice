/**
 * Created by MinhDN.
 */
import * as actions from "../actions/action-types";


export function getCalendar(startDate, endDate) {
  return {
    type: actions.GET_CALENDAR,
    startDate: startDate,
    endDate: endDate,
  }
}

export function setCalendarError(error) {
  return {
    type: actions.GET_CALENDAR_ERROR,
    hasCalendar: false,
    calendarError: error,
  }
}

export function setCalendarSuccess(data) {
  return {
    type: actions.GET_CALENDAR_SUCCESS,
    hasCalendar: true,
    dataCalendar: data,
  }
}
