import * as actions from "../actions/action-types";

export default function documentReducer(state, action = {}){
    switch (action.type) {
        case actions.GET_LIST_DOCUMENT_SUCCESS:
            return state.withMutations(state => state
                .set('progress', false)
                .set('hasDocument', true)
                .set('documentData', action.receivedDocs));
        case actions.GET_LIST_WAITING_DOCUMENT_SUCESS:
            return state.withMutations(state => state
                .set('progress', false)
                .set('hasDocument', true)
                .set('listDocumentData', action.listDocumentData));
        case actions.GET_LIST_WAITING_DOCUMENT_SUCESS:
            return state.withMutations(state => state
                .set('progress', false)
                .set('hasDocument', true)
                .set('listDocumentData', action.listDocumentData));
        case actions.GET_LIST_DOCUMENT_ERROR:
            return state.withMutations(state => state
                .set('progress', false)
                .set('hasDocument', false)
                .set('documentError', action.error));
        case actions.SET_TYPE_DOCUMENT:
            return state.withMutations(state => state
                .set('typeDocument', action.typeDocument));        
        default:
            return state;
    }
}

