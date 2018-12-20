import * as actions from "../actions/action-types";

export const getListActivityLogAction = (docId) => {
    console.log("docId:", docId);
    return {
        type: actions.GET_ACTIVITY_LOG,
        docId: docId,
    }
}

export const setListActivityLogSuccessAction = (receivedCmts) => {
    return {
        type: actions.GET_ACTIVITY_LOG_SUCESS,
        listActivityLog: receivedCmts
    }
}

export const setListActivityLogErrorAction = (error) => {
    return {
        type: actions.GET_ACTIVITY_LOG_ERROR,
        error: error
    }
}

export const setStatusActivityLog = (status) => {
    return {
        type: actions.SET_STATUS_ACTIVITY_LOG,
        status
    }
}