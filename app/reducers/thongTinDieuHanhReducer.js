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
        case actions.INFO_DELETE_BY_ID_SUCESS:
            return state.withMutations(state => state
                .set('progress', false)
                .set('result', action.result)
            );
        case actions.INFO_DELETE_BY_ID_ERROR:
            return state.withMutations(state => state
                .set('progress', false)
                .set('error', action.error)
            );
        case actions.INFO_GET_FLOW_BY_ID_SUCESS:
            return state.withMutations(state => state
                .set('progress', false)
                .set('lstFlow', action.lstFlow)
            );
        case actions.INFO_GET_FLOW_BY_ID_ERROR:
            return state.withMutations(state => state
                .set('progress', false)
                .set('error', action.error)
            );
        case actions.INFO_GET_USER_RECEIVER_SUCCES:
            return state.withMutations(state => state
                .set('progress', false)
                .set('lstUserReceiver', action.lstUserReceiver)
            );
        case actions.INFO_GET_USER_RECEIVER_ERROR:
            return state.withMutations(state => state
                .set('progress', false)
                .set('error', action.error)
            );
        case actions.SET_ID_INFO:
            return state.withMutations(state => state
                .set('progress', false)
                .set('idInfo', action.idInfo)
            );
        case actions.INFO_CREATE_SUCESS:
            return state.withMutations(state => state
                .set('progress', false)
                .set('createResult', action.createResult)
            );
        case actions.INFO_CREATE_ERROR:
            return state.withMutations(state => state
                .set('progress', false)
                .set('error', action.error)
            );
        case actions.INFO_UPDATE_EMPLOYEE_SUCESS:
            return state.withMutations(state => state
                .set('progress', false)
                .set('updateEmpResult', action.updateEmpResult)
            );
        case actions.INFO_UPDATE_EMPLOYEE_ERROR:
            return state.withMutations(state => state
                .set('progress', false)
                .set('updateEmpError', action.updateEmpError)
            );
        case actions.INFO_SEND_SUCESS:
            return state.withMutations(state => state
                .set('progress', false)
                .set('sendResult', action.sendResult)
            );
        case actions.INFO_SEND_ERROR:
            return state.withMutations(state => state
                .set('progress', false)
                .set('sendError', action.sendError)
            );
        default:
            return state
    }
}