/**
 * Created by saionara1 on 7/5/17.
 */
import * as actions from "../actions/action-types";


export default function notificationReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.GET_LIST_NOTIFICATION_SUCCESS:
      return state.withMutations(state => state
        .set('listNotificationData', action.listNotificationData));
    case actions.GET_LIST_NOTIFICATION_ERROR:
        return state.withMutations(state => state
        .set('listNotificationData', [])
        .set('listNotificationError', action.listNotificationError));
    default:
      return state
  }
}