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