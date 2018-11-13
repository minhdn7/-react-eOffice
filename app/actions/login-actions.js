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

export function setError(error) {
  return {
    type: actions.LOGIN_ERROR,
    error: error
  }
}

export function setLoginSuccess(data) {
  return {
    type: actions.LOGIN_SUCCESS,
    data: data
  }
}

// get contact list after login success
export function getContact() {
  return {
    type: actions.GET_CONTACT
  }
}

export function getContactError(error) {
  return {
    type: actions.GET_CONTACT_ERROR,
    error: error
  }
}

export function getContactSuccess(dataContact) {
  return {
    type: actions.GET_CONTACT_SUCCESS,
    dataContact: dataContact
  }
}
