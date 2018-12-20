import * as actions from "../actions/action-types";

export const getListUnitAction = () => {
    return{
        type: actions.GET_LIST_UNIT,

    }
}

export const getListUnitSucessAction = (response) => {
    return{
        type: actions.GET_LIST_UNIT_SUCESS,
        listUnit: response
    }
}

export const getListUnitErorrAction = (error) => {
    return{
        type: actions.GET_LIST_UNIT_SUCESS,
        error
    }
}