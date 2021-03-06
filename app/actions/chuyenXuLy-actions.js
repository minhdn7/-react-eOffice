import * as actions from "../actions/action-types";

export const getListUnitAction = () => {
    return{
        type: actions.GET_LIST_UNIT,

    }
}

export const getListUnitSucessAction = (response) => {
    return{
        type: actions.GET_LIST_UNIT_SUCESS,
        listUnit: response
    }
}

export const getListUnitErorrAction = (error) => {
    return{
        type: actions.GET_LIST_UNIT_SUCESS,
        error
    }
}

export const getUserConcurrentSendAction = (id, jobPosition, name) => {
    return{
        type: actions.GET_USER_CONCURRENT_SEND,
        id,
        jobPosition,
        name
    }
}

export const getUserConcurrentSendSucessAction = (data) => {
    return{
        type: actions.GET_USER_CONCURRENT_SEND_SUCESS,
        listUserConcurrentSend: data
    }
}

export const getUserConcurrentSendErrorAction = (error) => {
    return{
        type: actions.GET_USER_CONCURRENT_SEND_ERROR,
        error
    }
}

export const setListTreeDataAction = (lstTreeData) => {
    return{
        type: actions.SET_LIST_TREE_DATA,
        lstTreeData
    }
}

export const setListTreeDonViAction = (lstTreeData) => {
    return{
        type: actions.SET_LIST_TREE_DON_VI,
        lstTreeDonVi: lstTreeData
    }
}

export const setListDataSelectAction = (lstDataSelect) => {
    return{
        type: actions.SET_LIST_DATA_SELECT,
        lstDataSelect
    }
}

export const setListDataSelectByUnitOrUserAction = (lstDataSelect) => {
    return{
        type: actions.SET_LIST_DATA_SELECT_UNIT_OR_USER,
        lstDataSelect
    }
}

export const setListIdCheckXlcAction = (lstIdCheckXlc) => {
    return{
        type: actions.SET_LIST_ID_CHECK_XLC,
        lstIdCheckXlc
    }
}

// export const setListIdCheckPhAction = (lstIdCheckPh) => {
//     return{
//         type: actions.SET_LIST_ID_CHECK_PH,
//         lstIdCheckPh
//     }
// }

// export const setListIdCheckXemAction = (lstIdCheckXem) => {
//     return{
//         type: actions.SET_LIST_ID_CHECK_XEM,
//         lstIdCheckXem
//     }
// }

export const resetTreeDataAction = () => {
    return{
        type: actions.RESET_TREE_DATA,
        
    }
}

export const getListInternalAction = (idDoc) => {
    return{
        type: actions.GET_LIST_INTERNAL,
        idDoc
    }
}

export const getListInternalSucessAction = (response) => {
    return{
        type: actions.GET_LIST_INTERNAL_SUCESS,
        listInternal: response,
    }
}

export const getListInternalErrorAction = (error) => {
    return{
        type: actions.GET_LIST_INTERNAL_ERROR,
        error
    }
}

export const getListGroupUnitAction = () => {
    return{
        type: actions.GET_LIST_GROUP_UNIT,
    }
}

export const getListGroupUnitSucessAction = (response) => {
    return{
        type: actions.GET_LIST_GROUP_UNIT_SUCESS,
        listGroupUnit: response,
    }
}

export const getListGroupUnitErrorAction = (error) => {
    return{
        type: actions.GET_LIST_GROUP_UNIT_ERROR,
        error
    }
}

export const getListGroupUserAction = () => {
    return{
        type: actions.GET_LIST_GROUP_USER,
    }
}

export const getListGroupUserSucessAction = (response) => {
    return{
        type: actions.GET_LIST_GROUP_USER_SUCESS,
        listGroupUser: response,
    }
}

export const getListGroupUserErrorAction = (error) => {
    return{
        type: actions.GET_LIST_GROUP_USER_ERROR,
        error
    }
}

export const documentMoveAction = (actionType, approvedValue, coevalInternal, coevalProcess, comment, docId, hanXuLy, job, kho, primaryInternal, primaryProcess, referInternal, referProcess, sms, strAction) => {
    return{
        type: actions.DOCUMENT_MOVE,
        actionType,
        approvedValue,
        coevalInternal,
        coevalProcess,
        comment, 
        docId,
        hanXuLy,
        job,
        kho,
        primaryInternal,
        primaryProcess,
        referInternal,
        referProcess,
        sms,
        strAction
    }
}

export const documentMoveSucessAction = (response) => {
    return{
        type: actions.DOCUMENT_MOVE_SUCESS,
        response
    }
}

export const documentMoveErrorAction = (error) => {
    return{
        type: actions.DOCUMENT_MOVE_ERROR,
        error
    }
}