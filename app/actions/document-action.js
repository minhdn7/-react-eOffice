import * as actions from "../actions/action-types";

export const getListDocumentAction = () => {
    return {
        type: actions.GET_LIST_DOCUMENT,

    }
}

export const getListWaitingDocumentAction = (pageNo, pageRec, kho, param) => {
    return {
        type: actions.GET_LIST_WAITING_DOCUMENT,
        pageNo: pageNo,
        pageRec: pageRec,
        kho: kho,
        param: param,
    }
}

export const getListProcessedDocumentAction = (pageNo, pageRec, param) => {
    console.log("param:", param);
    return {
        type: actions.GET_LIST_PROCESSED_DOCUMENT,
        pageNo: pageNo,
        pageRec: pageRec,
        kho: kho,
        param: param,
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


// detail document

export const setIdDocumentAction = (documentID) => {
    return {
        type: actions.SET_ID_DOCUMENT,
        documentID: documentID
    }
}


export const getDetailDocumentAction = (documentID) => {
    return {
        type: actions.GET_DETAIL_DOCUMENT,
        documentID: documentID
    }
}

export const setDetailDocumentSuccessAction = (detailDocumentData) => {
    return {
        type: actions.GET_DETAIL_DOCUMENT_SUCESS,
        detailDocumentData: detailDocumentData,
    }
}

export const setDetailDocumentErrorAction = (error) => {
    return {
        type: actions.GET_LIST_DOCUMENT_ERROR,
        error: error
    }
}


export const getCommentDocumentAction = (documentID) => {
    return {
        type: actions.GET_LOG_COMMENT_DOCUMENT,
        documentID: documentID
    }
}

export const setCommentDocumentSuccessAction = (commentDocumentData) => {
    return {
        type: actions.GET_LOG_COMMENT_DOCUMENT_SUCESS,
        commentDocumentData: commentDocumentData,
    }
}

export const setCommentDocumentErrorAction = (error) => {
    return {
        type: actions.GET_LOG_COMMENT_DOCUMENT_ERROR,
        error: error
    }
}