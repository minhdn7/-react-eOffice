import * as actions from "../actions/action-types";

export default function calendarReducer(state, action = {}) {
  switch (action.type) {
      case actions.GET_CALENDAR_ERROR:
        // console.log('action.calendarError', action.calendarError);
        return state.withMutations(state => state
          .set('progress', false)
          .set('hasCalendar', false)
          .set('calendarData', [])
          .set('calendarError', action.calendarError));

      case actions.GET_CALENDAR_SUCCESS:
        return state.withMutations(state => state
          .set('progress', false)
          .set('hasCalendar', true)
          .set('calendarData', action.calendarData));

      case actions.RESET_CALENDAR_DATA:
          return state.withMutations(state => state
            .set('progress', false)
            .set('hasCalendar', false)
            .set('calendarData', []));    
      default:
        return state;
  }
}
