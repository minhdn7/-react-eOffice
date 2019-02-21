import * as actions from "../actions/action-types";

export const getListReceiveAction = (pageNo, pageRec, startDate, endDate, nguoiGui, tieuDe) => {
    return{
        type: actions.GET_LIST_RECEIVE,
        pageNo,
        pageRec,
        startDate,
        endDate,
        nguoiGui,
        tieuDe
    }
}

export const getListReceiveSucessAction = (data) => {
    return {
        type: actions.GET_LIST_RECEIVE_SUCESS,
        listReceive: data
    }
}

export const getListReceiveErrorAction = (error) => {
    return {
        type: actions.GET_LIST_RECEIVE_ERROR,
        error
    }
}

export const getListUserUnitAction = (param) => {
    return{
        type: actions.GET_LIST_USER_UNIT,
        param
    }
}

export const getListUserUnitSucessAction = (data) => {
    return {
        type: actions.GET_LIST_USER_UNIT_SUCESS,
        listUserUnit: data
    }
}

export const getListUserUnitErrorAction = (error) => {
    return {
        type: actions.GET_LIST_USER_UNIT_ERROR,
        error
    }
}

export const getListSendAction = (endDate, pageNo, pageRec, startDate, tieuDe) => {
    return{
        type: actions.GET_LIST_SEND,
        endDate,
        pageNo,
        pageRec,
        startDate,
        tieuDe
    }
}

export const getListSendSucessAction = (data) => {
    return {
        type: actions.GET_LIST_SEND_SUCESS,
        listSend: data
    }
}

export const getListSendErrorAction = (error) => {
    return {
        type: actions.GET_LIST_SEND_ERROR,
        error
    }
}

export const getDetailByIdAction = (id) => {
    return {
        type: actions.GET_INFO_DETAIL_BY_ID,
        id
    }
}

export const getDetailByIdSucessAction = (data) => {
    return {
        type: actions.GET_INFO_DETAIL_BY_ID_SUCESS,
        userDetail: data
    }
}

export const getDetailByIdErrorAction = (error) => {
    return {
        type: actions.GET_INFO_DETAIL_BY_ID_ERROR,
        error
    }
}

export const getListFilesByIdAction = (id) => {
    return {
        type: actions.INFO_GET_FILES_BY_ID,
        id
    }
}

export const getListFilesByIdSucessAction = (data) => {
    return {
        type: actions.INFO_GET_FILES_BY_ID_SUCESS,
        lstFiles: data
    }
}

export const getListFilesByIdErrorAction = (error) => {
    return{
        type: actions.INFO_GET_FILES_BY_ID_ERROR,
        error
    }
}