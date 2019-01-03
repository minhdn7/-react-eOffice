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

export const getUserConcurrentSendAction = (unitId) => {
    return{
        type: actions.GET_USER_CONCURRENT_SEND,
        unitId: unitId
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

export const setIdCheckXlcAction = (idCheckXlc) => {
    return{
        type: actions.SET_ID_CHECK_XLC,
        idCheckXlc
    }
}

export const setListIdCheckPhAction = (lstIdCheckPh) => {
    return{
        type: actions.SET_LIST_ID_CHECK_PH,
        lstIdCheckPh
    }
}

export const setListIdCheckXemAction = (lstIdCheckXem) => {
    return{
        type: actions.SET_LIST_ID_CHECK_XEM,
        lstIdCheckXem
    }
}

export const resetTreeDataAction = () => {
    return{
        type: actions.RESET_TREE_DATA,
        
    }
}