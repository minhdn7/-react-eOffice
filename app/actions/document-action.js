import { GET_LIST_DOCUMENT, GET_LIST_DOCUMENT_ERROR, GET_LIST_DOCUMENT_SUCCESS } from '../actions/action-types';

export const getListDocumentAction = () => {
    return {
        type: GET_LIST_DOCUMENT,

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