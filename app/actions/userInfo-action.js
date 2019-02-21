import * as actions from "../actions/action-types";

export const getUserInfoAction = () => {
    return {
        type: actions.GET_USER_INFO,
    }
}

export const getUserInfoSucessAction = (data) => {
    return {
        type: actions.GET_USER_INFO_SUCESS,
        userInfo: data
    }
}

export const getUserInfoErrorAction = (error) => {
    return {
        type: actions.GET_USER_INFO_ERROR,
        error
    }
}