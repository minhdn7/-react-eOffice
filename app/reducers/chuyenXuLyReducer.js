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
        case actions.SET_LIST_TREE_DON_VI:
            return state.withMutations(state => state
                .set('lstTreeDonVi', action.lstTreeDonVi));
        case actions.SET_LIST_DATA_SELECT:
            return state.withMutations(state => state
                .set('lstDataSelect', action.lstDataSelect));
        case actions.SET_LIST_DATA_SELECT_UNIT_OR_USER:
            return state.withMutations(state => state
                .set('lstDataSelectByUnitOrUser', action.lstDataSelect));
        case actions.RESET_TREE_DATA:
            return state.withMutations(state => state
                .set('lstTreeData', [])
                .set('lstTreeDonVi', [])
                .set('lstDataSelect', [])
                .set('lstDataSelectByUnitOrUser', [])
            );
        case actions.SET_LIST_ID_CHECK_XLC:
            return state.withMutations(state => state
                .set('itemIsCheckXlc', action.lstIdCheckXlc));
        case actions.GET_LIST_INTERNAL_SUCESS:
            return state.withMutations(state => state
                .set('progress', false)
                .set('listInternal', action.listInternal)
            );
        case actions.GET_LIST_INTERNAL_ERROR:
            return state.withMutations(state => state
                .set('progress', false)
                .set('error', action.error)
            );
        case actions.GET_LIST_GROUP_UNIT_SUCESS:
            return state.withMutations(state => state
                .set('progress', false)
                .set('listGroupUnit', action.listGroupUnit)
            );
        case actions.GET_LIST_GROUP_USER_SUCESS:
            return state.withMutations(state => state
                .set('progress', false)
                .set('listGroupUser', action.listGroupUser)
            );
        case actions.GET_LIST_GROUP_UNIT_ERROR:
            return state.withMutations(state => state
                .set('progress', false)
                .set('error', action.error)
            );
        case actions.DOCUMENT_MOVE_SUCESS:
            return state.withMutations(state => state
                .set('progress', false)
                .set('response', action.response)
            );
        case actions.DOCUMENT_MOVE_ERROR:
            return state.withMutations(state => state
                .set('progress', false)
                .set('error', action.error)
            );
        default:
            return state
    }
}