import * as actions from "../actions/action-types";

export default function lichSuXuLyReducer(state, action = {}) {
    switch (action.type) {
        case actions.GET_ACTIVITY_LOG_SUCESS:
            return state.withMutations(state => state
                .set('isLichSuXuLy', true)
                .set('progress', false)
                .set('listActivityLog', action.listActivityLog)
            );
        case actions.GET_ACTIVITY_LOG_ERROR:
            return state.withMutations(state => state
                .set('progress', false)
                .set('error', action.error)
            );
            case actions.SET_STATUS_ACTIVITY_LOG:
            return state.withMutations(state => state
                .set('status', action.status));
        default:
            return state
    }
}