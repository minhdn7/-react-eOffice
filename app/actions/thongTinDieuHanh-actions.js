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

export const deleteInfoByIdAction = (id) => {
    return {
        type: actions.INFO_DELETE_BY_ID,
        id
    }
}

export const deleteInfoByIdSucess = (data) => {
    return {
        type: actions.INFO_DELETE_BY_ID_SUCESS,
        result: data
    }
}

export const deleteInfoByIdError = (error) => {
    return{
        type: actions.INFO_DELETE_BY_ID_ERROR,
        error
    }
}

export const getFlowByIdAction = (id) => {
    return{
        type: actions.INFO_GET_FLOW_BY_ID,
        id
    }
}

export const getFlowByIdSucessAction = (data) => {
    return{
        type: actions.INFO_GET_FLOW_BY_ID_SUCESS,
        lstFlow: data
    }
}

export const getFlowByIdErrorAction = (error) => {
    return{
        type: actions.INFO_GET_FLOW_BY_ID_ERROR,
        error
    }
}

export const getUserReceiverAction = (id, name, pageNo, pageRec) => {
    return{
        type: actions.INFO_GET_USER_RECEIVER,
        id,
        name,
        pageNo,
        pageRec
    }
}

export const getUserReceiverSucessAction = (data) => {
    return{
        type: actions.INFO_GET_USER_RECEIVER_SUCCES,
        lstUserReceiver: data
    }
}

export const getUserReceiverErrorAction = (error) => {
    return{
        type: actions.INFO_GET_USER_RECEIVER_ERROR,
        error
    }
}

export const setIdInfomationAction = (id) => {
    return{
        type: actions.SET_ID_INFO,
        idInfo: id
    }
}

export const createAction = (chuyenTiep, deleteFiles, files, id, noiDung, parentId, tieuDe) => {
    return{
        type: actions.INFO_CREATE,
        chuyenTiep,
        deleteFiles,
        files,
        id,
        noiDung,
        parentId,
        tieuDe
    }
}

export const createSucessAction = (data) => {
    return{
        type: actions.INFO_CREATE_SUCESS,
        createResult: data
    }
}

export const createErrorAction = (error) => {
    return{
        type: actions.INFO_CREATE_ERROR,
        error
    }
}

export const updateEmployeeAction = (empAdd, empDelete, id) => {
    return{
        type: actions.INFO_UPDATE_EMPLOYEE,
        empAdd,
        empDelete,
        id
    }
}

export const updateEmployeeSucessAction = (data) => {
    return{
        type: actions.INFO_UPDATE_EMPLOYEE_SUCESS,
        updateEmpResult: data
    }
}

export const updateEmployeeErrorAction = (error) => {
    return{
        type: actions.INFO_UPDATE_EMPLOYEE_ERROR,
        updateEmpError: error
    }
}

export const sendAction = (id, sms, user) => {
    return{
        type: actions.INFO_SEND,
        id,
        sms,
        user
    }
}

export const sendSucessAction = (data) => {
    return{
        type: actions.INFO_SEND_SUCESS,
        sendResult: data
    }
}

export const sendErrorAction = (error) => {
    return{
        type: actions.INFO_SEND_ERROR,
        sendError: error
    }
}