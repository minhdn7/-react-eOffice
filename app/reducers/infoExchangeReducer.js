import * as actions from "../actions/action-types";

export default function infoExchangeReducer(state, action = {}) {
    switch (action.type) {
      case actions.GET_LIST_COMMENT_SUCESS:
          return state.withMutations(state => state
              .set('isInfoExchange', true)
              .set('progress', false)
              .set('listComment', action.listComment)
              );

      default:
        return state
    }
  }