import * as actions from "../actions/action-types";

export const getListCommentAction = (pageNo, pageRec, docId) => {
    console.log("docId:", docId);
    return {
        type: actions.GET_LIST_COMMENT,
        pageNo: pageNo,
        pageRec: pageRec,
        docId: docId,
    }
}

export const setListCommentSuccessAction = (receivedCmts) => {
    return {
        type: actions.GET_LIST_COMMENT_SUCESS,
        listComment: receivedCmts
    }
}

export const setListCommentErrorAction = (error) => {
    return {
        type: actions.GET_LIST_COMMENT_ERROR,
        error: error
    }
}

export const guiYKienTraoDoiAction = (docId, comments) => {
    return{
        type: actions.GUI_Y_KIEN_TRAO_DOI,
        docId: docId,
        comments: comments
    }
}

export const guiYKienTraoDoiSucessAction = (response) => {
    return{
        type: actions.GUI_Y_KIEN_TRAO_DOI_SUCESS,
        result: response
    }
}

export const guiYKienTraoDoiErrorAction = (error) => {
    return{
        type: actions.GUI_Y_KIEN_TRAO_DOI_ERROR,
        error
    }
}