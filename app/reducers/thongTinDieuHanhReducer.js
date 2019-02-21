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
        case actions.GET_LIST_USER_UNIT_SUCESS:
            return state.withMutations(state => state
                .set('progress', false)
                .set('listUserUnit', action.listUserUnit));
        case actions.GET_LIST_USER_UNIT_ERROR:
            return state.withMutations(state => state
                .set('progress', false)
                .set('error', action.error)
            );
        case actions.GET_LIST_SEND_SUCESS:
            return state.withMutations(state => state
                .set('progress', false)
                .set('listSend', action.listSend)
            );
        case actions.GET_LIST_SEND_ERROR:
            return state.withMutations(state => state
                .set('progress', false)
                .set('error', action.error)
            );
        case actions.GET_INFO_DETAIL_BY_ID_SUCESS:
            return state.withMutations(state => state
                .set('progress', false)
                .set('userDetail', action.userDetail)
            );
        case actions.GET_INFO_DETAIL_BY_ID_ERROR:
            return state.withMutations(state => state
                .set('progress', false)
                .set('error', action.error)
            );
        case actions.INFO_GET_FILES_BY_ID_SUCESS:
            return state.withMutations(state => state
                .set('progress', false)
                .set('lstFiles', action.lstFiles)
            );
        case actions.INFO_GET_FILES_BY_ID_ERROR:
            return state.withMutations(state => state
                .set('progress', false)
                .set('error', action.error)
            );
        default:
            return state
    }
}