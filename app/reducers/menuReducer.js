import * as actions from "../actions/action-types";

export default function calendarReducer(state, action = {}) {
  switch (action.type) {
    case actions.GET_COUNT_MENU_ERROR:
      return state.withMutations(state => state
        .set('countMenuData', {})
        .set('countMenuError', action.countMenuError));

    case actions.GET_COUNT_MENU_SUCESS:
      return state.withMutations(state => state
        .set('countMenuData', action.countMenuData));

    case actions.RESET_COUNT_MENU_DATA:
      return state.withMutations(state => state
        .set('countMenuData', {}));
    case actions.SET_NAVIGATOR:
      return state.withMutations(state => state
        .set('navigator', action.navigator));
    default:
      return state;
  }
}
