import * as actions from "../actions/action-types";


export const getListNotificationAction = () => {
    return {
        type: actions.GET_LIST_NOTIFICATION
    }
}

export const setListNotificationSuccessAction = (listNotificationData) => {
    return {
        type: actions.GET_LIST_NOTIFICATION_SUCCESS,
        listNotificationData: listNotificationData,
    }
}

export const setListNotificationErrorAction = (error) => {
    return {
        type: actions.GET_LIST_NOTIFICATION_ERROR,
        listNotificationError: error
    }
}

// end