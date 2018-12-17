import * as actions from "../actions/action-types";

export default function infoExchangeReducer(state, action = {}) {
    switch (action.type) {
        case actions.GET_LIST_COMMENT_SUCESS:
            return state.withMutations(state => state
                .set('isInfoExchange', true)
                .set('progress', false)
                .set('listComment', action.listComment)
            );
        case actions.GUI_Y_KIEN_TRAO_DOI_SUCESS:
            return state.withMutations(state => state
                .set('progress', false)
                .set('result', action.result)
            );
        case actions.GUI_Y_KIEN_TRAO_DOI_ERROR:
            return state.withMutations(state => state
                .set('progress', false)
                .set('error', action.error)
            );
        default:
            return state
    }
}