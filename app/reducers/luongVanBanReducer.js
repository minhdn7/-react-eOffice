import * as actions from "../actions/action-types";

export default function luongVanBanReducer(state, action = {}) {
    switch (action.type) {
        case actions.GET_LUONG_VAN_BAN_SUCESS:
            return state.withMutations(state => state
                .set('progress', false)
                .set('imageDocFlow', action.imageDocFlow)
            );
        case actions.GET_LUONG_VAN_BAN_ERORR:
            return state.withMutations(state => state
                .set('progress', false)
                .set('error', action.error)
            );
        default:
            return state
    }
}