import * as actions from "../actions/action-types";

export const getListCommentAction = (pageNo, pageRec, param) => {
    console.log("param:", param);
    return {
        type: actions.GET_LIST_COMMENT,
        param: param,
    }
}

export const setListCommentSuccessAction = (receivedCmts) => {
    return {
        type: actions.GET_LIST_COMMENT_SUCCESS,
        listComment: receivedCmts
    }
}