import * as actions from "../actions/action-types";

export default function thongTinDieuHanhReducer(state, action = {}) {
    switch (action.type) {
        case actions.GET_LIST_RECEIVE_SUCESS:
            return state.withMutations(state => state
                .set('progress', false)
                .set('listReceive', action.listReceive)
            );
            case actions.GET_LIST_RECEIVE_ERROR:
            return state.withMutations(state => state
                .set('progress', false)
                .set('error', action.error)
            );
        default:
            return state
    }
}