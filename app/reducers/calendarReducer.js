import * as actions from "../actions/action-types";

export default function calendarReducer(state, action = {}) {
  switch (action.type) {
      case actions.GET_CALENDAR_ERROR:
        console.log('action.calendarError', action.calendarError);
        return state.withMutations(state => state
          .set('progress', false)
          .set('calendarError', action.calendarError));
      case actions.GET_CALENDAR_SUCCESS:

        return state.withMutations(state => state
          .set('progress', false)
          .set('calendarData', action.calendarData));
      default:
        return state
  }
}
