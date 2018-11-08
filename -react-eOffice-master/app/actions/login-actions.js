/**
 * Created by saionara1 on 7/21/17.
 */
import * as actions from "../actions/action-types";

export function login(email, password) {
  return {
    type: actions.LOGIN_ACTION,
    username: email,
    password: password
  }
}


export function loginAccount(username, password, tokenFireBase) {
  return {
    type: actions.LOGIN_ACTION,
    username: username,
    password: password,
    tokenFireBase: tokenFireBase
  }
}

export function setError(error) {
  return {
    type: actions.LOGIN_ERROR,
    error: error
  }
}

export function setLoginSuccess(data) {
  return {
    type: actions.LOGIN_SUCCESS,
    data
  }
}
