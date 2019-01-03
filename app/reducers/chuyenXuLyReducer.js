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
        case actions.SET_LIST_TREE_DATA:
            return state.withMutations(state => state
                .set('lstTreeData', action.lstTreeData));
        case actions.SET_ID_CHECK_XLC:
            return state.withMutations(state => state
                .set('idCheckXlc', action.idCheckXlc));
        case actions.SET_LIST_ID_CHECK_PH:
            return state.withMutations(state => state
                .set('lstIdCheckPh', action.lstIdCheckPh));
        case actions.SET_LIST_ID_CHECK_XEM:
            return state.withMutations(state => state
                .set('lstIdCheckXem', action.lstIdCheckXem));
        case actions.RESET_TREE_DATA:
            return state.withMutations(state => state
                .set('lstTreeData', [])
                .set('idCheckXlc', "")
                .set('lstIdCheckPh', [])
                .set('lstIdCheckXem', [])
                );
        default:
            return state
    }
}