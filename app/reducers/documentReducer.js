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
                .set('listDocumentData', [])
                .set('documentError', action.error));

        case actions.SET_TYPE_DOCUMENT:
            return state.withMutations(state => state
                .set('typeDocument', action.typeDocument));

        case actions.SET_ID_DOCUMENT:
            return state.withMutations(state => state
                .set('documentID', action.documentID));

        case actions.SET_DETAIL_DOCUMENT_ERROR:
            return state.withMutations(state => state
                .set('progress', false)
                .set('detailDocumentError', action.error));
        case actions.GET_DETAIL_DOCUMENT_SUCESS:
            return state.withMutations(state => state
                .set('progress', false)
                .set('detailDocumentData', action.detailDocumentData));    
                
        case actions.GET_LOG_COMMENT_DOCUMENT_SUCESS:
            return state.withMutations(state => state
                .set('progress', false)
                .set('commentDocumentData', action.commentDocumentData));
        case actions.GET_LOG_COMMENT_DOCUMENT_ERROR:
            return state.withMutations(state => state
                .set('progress', false)
                .set('commentDocumentData', [])
                .set('commentDocumentError', action.error));
                
        case actions.GET_ITEM_DOCUMENT_EVENT:
            return state.withMutations(state => state
                .set('itemDocumentData', action.itemDocumentData));
        
        case actions.GET_FINISH_DOCUMENT_SUCESS:
            return state.withMutations(state => state
                .set('finishDocumentData', action.finishDocumentData));
        case actions.GET_FINISH_DOCUMENT_ERROR:
            return state.withMutations(state => state
                .set('finishDocumentError', action.error));        
        default:
            return state;
    }
}

