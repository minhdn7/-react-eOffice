import * as actions from "../actions/action-types";

export const getLuongVanBanAction = (instanceId, processId) => {
    return{
        type: actions.GET_LUONG_VAN_BAN,
        instanceId,
        processId
    }
}

export const setLuongVanBanSucessAction = (response) => {
    return{
        type: actions.GET_LUONG_VAN_BAN_SUCESS,
        imageDocFlow: response
    }
}

export const setLuongVanBanErorrAction = (error) => {
    return{
        type: actions.GET_LUONG_VAN_BAN_ERORR,
        error
    }
}