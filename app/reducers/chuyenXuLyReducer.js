import * as actions from "../actions/action-types";

export default function chuyenXuLyReducer(state, action = {}) {
    switch (action.type) {
        case actions.GET_LIST_UNIT_SUCESS:
            return state.withMutations(state => state
                .set('isChuyenXuLy', true)
                .set('progress', false)
                .set('listUnit', action.listUnit)
            );
        case actions.GET_LIST_UNIT_ERROR:
            return state.withMutations(state => state
                .set('progress', false)
                .set('error', action.error)
            );
        case actions.GET_USER_CONCURRENT_SEND_SUCESS:
            return state.withMutations(state => state
                .set('progress', false)
                .set('listUserConcurrentSend', action.listUserConcurrentSend)
            );
            case actions.GET_USER_CONCURRENT_SEND_ERROR:
            return state.withMutations(state => state
                .set('progress', false)
                .set('error', action.error)
            );
        default:
            return state
    }
}