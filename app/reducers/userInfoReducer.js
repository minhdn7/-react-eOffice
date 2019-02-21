import * as actions from "../actions/action-types";

export default function userInfoReducer(state, action = {}) {
    switch (action.type) {
        case actions.GET_USER_INFO_SUCESS:
            return state.withMutations(state => state
                .set('progress', false)
                .set('userInfo', action.userInfo)
            );
        case actions.GET_USER_INFO_ERROR:
            return state.withMutations(state => state
                .set('progress', false)
                .set('error', action.error)
            );
        default:
            return state;
    }
}