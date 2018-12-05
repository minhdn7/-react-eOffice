import * as actions from "../actions/action-types";

export const getListDocumentAction = () => {
    return {
        type: actions.GET_LIST_DOCUMENT,

    }
}

export const getListWaitingDocumentAction = (pageNo, pageRec, param) => {
    return {
        type: actions.GET_LIST_WAITING_DOCUMENT,
        pageNo: pageNo,
        pageRec: pageRec,
        param: param,
    }
}

export const getListProcessedDocumentAction = (pageNo, pageRec, param) => {

    return {
        type: actions.GET_LIST_PROCESSED_DOCUMENT,
        pageNo2: pageNo,
        pageRec2: pageRec,
        param2: param,
    }
}

export const setListDocumentSuccessAction = (receivedDocs) => {
    return {
        type: actions.GET_LIST_DOCUMENT_SUCCESS,
        receivedDocs
    }
}

export const setListWaitingDocumentSuccess = (listDocumentData) => {
    return {
        type: actions.GET_LIST_WAITING_DOCUMENT_SUCESS,
        listDocumentData: listDocumentData,
    }
}

export const setListProcessedDocumentSuccess = (listDocumentData) => {
    return {
        type: actions.GET_LIST_WAITING_DOCUMENT_SUCESS,
        listDocumentData: listDocumentData,
    }
}

export const setListDocumentErrorAction = (error) => {
    return {
        type: actions.GET_LIST_DOCUMENT_ERROR,
        error: error
    }
}

export const setTypeDocumentAction = (type) => {
    return {
        type: actions.SET_TYPE_DOCUMENT,
        typeDocument: type
    }
}