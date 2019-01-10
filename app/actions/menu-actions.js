/**
 * Created by MinhDN 26/11/2018
 */
import * as actions from "../actions/action-types";

export function getCountMenu() {
  return {
    type: actions.GET_COUNT_MENU,
  }
}


export function setCountMenuError(error) {
  return {
    type: actions.GET_COUNT_MENU_ERROR,
    countMenuError: error
  }
}


export function setCountMenuSuccess(data) {
    return {
        type: actions.GET_COUNT_MENU_SUCESS,
        countMenuData: data
    }
}

export function resetCountMenu() {
    return {
      type: actions.RESET_COUNT_MENU_DATA,
      countMenuError: '',
      countMenuData: {},
    }
  }

  export function setNavigator(navigator){
    return{
      type: actions.SET_NAVIGATOR,
      navigator
    }
  }
