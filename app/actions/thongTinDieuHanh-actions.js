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