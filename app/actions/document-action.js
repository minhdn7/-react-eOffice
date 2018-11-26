import { GET_LIST_DOCUMENT, GET_LIST_DOCUMENT_ERROR, GET_LIST_DOCUMENT_SUCCESS } from './action-types';

export const getListDocumentAction = (type) => {
    return {
        type: GET_LIST_DOCUMENT,
        type
    }
}

export const getListDocumentSuccessAction = (receivedDocs) => {
    return {
        type: GET_LIST_DOCUMENT_SUCCESS,
        receivedDocs
    }
}

export const getListDocumentErrorAction = (error) => {
    return {
        type: GET_LIST_DOCUMENT_ERROR,
        error
    }
}