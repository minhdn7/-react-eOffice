/**
 * Created by MinhDN 26/11/2018
 */
import * as actions from "../actions/action-types";

export default function reportReducer(state, action = {}) {
  switch (action.type) {
    case actions.GET_REPORT_DOCUMENT_ERROR:
        return state.withMutations(state => state
            .set('isReportDocument', false)
            .set('progress', false)
            .set('reportDocumentError', action.reportDocumentError));

    case actions.GET_REPORT_DOCUMENT_SUCCESS:
        return state.withMutations(state => state
            .set('isReportWord', true)
            .set('progress', false)
            .set('reportDocumentData', action.reportDocumentData)
            );

    case actions.GET_REPORT_WORD_ERROR:
        return state.withMutations(state => state
            .set('isReportWord', false)
            .set('progress', false)
            .set('reportDocumentError', action.reportDocumentError));

    case actions.GET_REPORT_WORD_SUCCESS:
        return state.withMutations(state => state
            .set('isReportWord', true)
            .set('progress', false)
            .set('reportWordData', action.reportWordData)
            );

    default:
      return state
  }
}