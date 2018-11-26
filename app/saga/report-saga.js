/**
 * Created by MinhDN on 6/22/2018.
 */
import {call, put, take} from "redux-saga/effects";
import * as actions from "../actions/action-types";
import * as Api from "../api";
import * as loginActions from "../actions/login-actions";
import * as reportActions from "../actions/report-actions";
import * as rootActions from "../actions/root-actions";
import apiUrl from "../network/apiUrl";
import consts from "../const";

function getDocumentReportURL() {

    url = apiUrl.ROOT_URL + apiUrl.GET_REPORT_DOCUMENT_URL;
    return fetch(url, {
      method: 'GET',
      headers: consts.BASE_HEADER
    })
    .then((list) => {
    return listContact.json();
    })
    .catch((error) => {
      console.log(String(error));
    });

}

function getWordReportURL(month) {

    url = apiUrl.ROOT_URL + `api/report/jobreport/${month}/`;

    return fetch(url, {
      method: 'GET',
      headers: consts.BASE_HEADER
    })
    .then((list) => {
    return list.json();
    })
    .catch((error) => {
      console.log(String(error));
    });

}

function* getDocumentReport() {
  try {
    response = yield call(getDocumentReportURL);
    // console.log("getDocumentReport", response);
    if(typeof(response) != "undefined"  && typeof(response.status) != "undefined"){
      if (response.status.code == "0") {
        yield put(reportActions.setReportDocumentSuccess(response.data));
        return response;
      } else {
        yield put(reportActions.setReportDocumentError(String(response.status.message)));
        return undefined;
      }
    }else{
      yield put(reportActions.setReportDocumentError("Không lấy được báo cáo văn bản!"));
      return undefined;
    }

  } catch (error) {
    
    yield put(reportActions.setReportDocumentError(String(error)));
  }
}


function* getWordReport(month) {
    try {
      response = yield call(getWordReportURL, month);

      if(typeof(response) != "undefined"  && typeof(response.status) != "undefined"){
        if (response.status.code == "0") {
          yield put(reportActions.setReportWordSuccess(response.data));
          return response;
        } else {
          yield put(reportActions.setReportWordError(String(response.status.message)));
          return undefined;
        }
      }else{
        yield put(reportActions.setReportWordError("Không lấy được báo cáo công việc!"));
        return undefined;
      }
  
    } catch (error) {
      
      yield put(reportActions.setReportWordError(String(error)));
    }
  }


export function* reportFlow() {
  while (true) {
    yield take(actions.GET_REPORT_DOCUMENT);
    yield put(rootActions.controlProgress(true));
    yield call(getDocumentReport);
    yield put(rootActions.controlProgress(false));

    yield take(actions.GET_REPORT_WORD);
    yield put(rootActions.controlProgress(true));
    yield call(getWordReport, month);
    yield put(rootActions.controlProgress(false));
  }
}


