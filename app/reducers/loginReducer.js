/**
 * Created by saionara1 on 6/21/17.
 */
import * as actions from "../actions/action-types";

export default function loginReducer(state, action = {}) {
  switch (action.type) {
    case actions.LOGIN_ERROR:
      
      return state.withMutations(state => state
        .set('isLoggedIn', false)
        .set('progress', false)
        .set('loginError', action.error));
    case actions.LOGIN_SUCCESS:
        // const data = action.data;
      return state.withMutations(state => state
        .set('isLoggedIn', true)
        .set('progress', false)
        .set('loginData', action.data)
        .set('token', action.data.token)
        );
    case actions.LOGOUT_SUCCESS: {
      return state.withMutations(state => state
        .set('progress', false)
        .set('isLoggedIn', false)
        .set('token', '')
        .set('authorizationId', '')
        .set('username', '')
        .set('username', '')
        .set('password', ''));
    }
    case actions.LOGOUT_ERROR: {
      return state.withMutations(state => state
        .set('progress', false)
        .set('isLoggedIn', false)
        .set('loginError', action.err));
    }
    default:
      return state
  }
}