import { GET_LIST_DOCUMENT, GET_LIST_DOCUMENT_ERROR, GET_LIST_DOCUMENT_SUCCESS } from './action-types';
import { put } from 'redux-saga-effects';
import { Api } from '../api';

function* getListDocument(){
    try {
        const receivedDocs = Api.getDocumentsFromApi();
        yield put({ type: GET_LIST_DOCUMENT, receivedDocs: receivedDocs });
    } catch (error) {
        yield put({ type: GET_LIST_DOCUMENT_ERROR, error });
    }
}
