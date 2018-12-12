import * as actions from "../actions/action-types";

export default function documentReducer(state, action = {}){
    switch (action.type) {
        case actions.GET_ATTACK_FILE_DOCUMENT_SUCESS:
            return state.withMutations(state => state
                .set('progress', false)
                .set('hasAttackFile', true)
                .set('attackFileData', action.attackFileData));
        case actions.GET_ATTACK_FILE_DOCUMENT_ERROR:
            return state.withMutations(state => state
                .set('progress', false)
                .set('hasAttackFile', false)
                .set('attackFileData', [])
                .set('attackFileError', action.error));
        
        case actions.GET_VIEW_FILE_SUCESS:
            return state.withMutations(state => state
                .set('progress', false)
                .set('viewFileData', action.viewFileData));
        case actions.GET_VIEW_FILE_ERROR:
            return state.withMutations(state => state
                .set('progress', false)
                .set('viewFileData', '')
                .set('viewFileError', action.error));        
        default:
            return state;
    }
}

