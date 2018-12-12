import * as actions from "../actions/action-types";



// file đính kèm



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

// get file view
export const getViewFileAction = (fileID) => {
    return {
        type: actions.GET_VIEW_FILE,
        fileID: fileID
    }
}

export const setViewFileSuccessAction = (viewFileData) => {
    return {
        type: actions.GET_VIEW_FILE_SUCESS,
        viewFileData: viewFileData,
    }
}

export const setViewFileErrorAction = (error) => {
    return {
        type: actions.GET_VIEW_FILE_ERROR,
        error: error
    }
}