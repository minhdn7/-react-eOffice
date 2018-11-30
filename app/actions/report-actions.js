/**
 * Created by MinhDN 26/11/2018
 */
import * as actions from "../actions/action-types";

export function getReportDocument() {
  return {
    type: actions.GET_REPORT_DOCUMENT,
  }
}

export function getReportWord(month) {
    return {
      type: actions.GET_REPORT_WORD,
      month: month,
    }
}


export function setReportDocumentError(error) {
  return {
    type: actions.GET_REPORT_DOCUMENT_ERROR,
    reportDocumentError: error
  }
}

export function setReportWordError(error) {
    return {
      type: actions.GET_REPORT_WORD_ERROR,
      reportWordError: error
    }
}

export function setReportDocumentSuccess(data) {
    return {
        type: actions.GET_REPORT_DOCUMENT_SUCCESS,
        reportDocumentData: data
    }
}

export function setReportWordSuccess(data) {
    return {
      type: actions.GET_REPORT_WORD_SUCCESS,
      reportWordData: data
    }
  }
