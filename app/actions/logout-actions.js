/**
 * Created by MinhDN 3/1/2018
 */
import * as actions from "../actions/action-types";

export function logout() {
  return {
    type: actions.LOGOUT_ACTION,
  }
}

export function setLogoutSuccess() {
  return {type: actions.LOGOUT_SUCCESS}
}

export function setError(error) {
  return {
    type: actions.LOGOUT_ERROR,
    error: error
  }
}