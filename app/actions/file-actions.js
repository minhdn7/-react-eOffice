import * as actions from "../actions/action-types";



// detail document



export const getAttackFileAction = (documentID) => {
    return {
        type: actions.GET_ATTACK_FILE_DOCUMENT,
        documentID: documentID
    }
}

export const setAttackFileSuccessAction = (attackFileData) => {
    return {
        type: actions.GET_ATTACK_FILE_DOCUMENT_SUCESS,
        attackFileData: attackFileData,
    }
}

export const setAttackFileErrorAction = (error) => {
    return {
        type: actions.GET_LIST_DOCUMENT_ERROR,
        error: error
    }
}