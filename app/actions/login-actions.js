/**
 * Created by MinhDN.
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

export function setError(loginError) {
  return {
    type: actions.LOGIN_ERROR,
    loginError: loginError
  }
}

export function setLoginSuccess(data) {
  return {
    type: actions.LOGIN_SUCCESS,
    data: data
  }
}

export function resetLogin() {
  return {
    type: actions.RESET_LOGIN_ACTION,
  }
}
// get contact list after login success
export function getContact() {
  return {
    type: actions.GET_CONTACT
  }
}

export function getContactError(contactError) {
  return {
    type: actions.GET_CONTACT_ERROR,
    contactError: contactError
  }
}

export function getContactSuccess(dataContact) {
  return {
    type: actions.GET_CONTACT_SUCCESS,
    dataContact: dataContact
  }
}
