import { GET_LIST_DOCUMENT, GET_LIST_DOCUMENT_ERROR, GET_LIST_DOCUMENT_SUCCESS } from './action-types';

const docReducers = (docs = [], action) => {
    switch (action.type) {
        case GET_LIST_DOCUMENT_SUCCESS:
            return action.receivedDocs;
        case GET_LIST_DOCUMENT_ERROR:
            return [];
        default:
            return docs;
    }
}

export default docReducers;