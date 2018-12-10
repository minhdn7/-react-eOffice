/**
 * Created by saionara1 on 6/21/17.
 */

import {autoRehydrate, persistStore} from "redux-persist-immutable";
import {combineReducers} from "redux-immutable";
import createActionBuffer from "redux-action-buffer";
import {REHYDRATE} from "redux-persist/constants";
import Immutable from "immutable";
import {applyMiddleware, compose, createStore} from "redux";
import {AsyncStorage} from "react-native";
import loginReducer from "../reducers/loginReducer";
import calendarReducer from "../reducers/calendarReducer";
import reportReducer from "../reducers/reportReducer";
import rootReducer from "../reducers/rootReducer";
import listReducer from "../reducers/listReducer";
import detailsReducer from "../reducers/detailsReducer";
import documentReducer from '../reducers/documentReducer';
import fileReducer from '../reducers/fileReducer';

import createSagaMiddleware from "redux-saga";
import * as loginSaga from "../saga/login-saga";
import * as calendarSaga from "../saga/calendar-saga";
import * as logoutSaga from "../saga/logout-saga";
import * as listSaga from "../saga/list-saga";
import * as detailsSaga from "../saga/details-saga";
import * as reportSaga from "../saga/report-saga";
import * as documentSaga from "../saga/document-saga";
import * as fileSaga from "../saga/file-saga";

const combinedReducers = combineReducers({
  root: rootReducer,
  login: loginReducer,
  list: listReducer,
  details: detailsReducer,
  calendar: calendarReducer,
  reportReducer: reportReducer,
  documentReducer: documentReducer,
  fileReducer: fileReducer
});

const initialState = new Immutable.Map({
  root: Immutable.Map({
    progress: undefined,
  }),
  login: Immutable.Map({

  }),
  list: Immutable.Map({
    data: [],
  }),
  
  details: Immutable.Map({
    readMe: ''
  }),
  calendar: Immutable.Map({
    calendarError: '',
    calendarData: []
  }),

  reportReducer: Immutable.Map({
    reportError: '',
    reportData: []
  }),

  documentReducer: Immutable.Map({

  }),

  fileReducer: Immutable.Map({

  }),
  
});

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    combinedReducers,
    initialState,
    compose(applyMiddleware(sagaMiddleware, createActionBuffer(REHYDRATE)), autoRehydrate({log: true})));

  persistStore(
    store,
    {
      storage: AsyncStorage,
      blacklist: ['root'],
    }
  );
  return {
    ...store, runSaga:
      [sagaMiddleware.run(listSaga.listFlow),
      sagaMiddleware.run(detailsSaga.detailsFlow),
      sagaMiddleware.run(logoutSaga.logoutFlow),
      sagaMiddleware.run(loginSaga.loginFlow),
      sagaMiddleware.run(calendarSaga.calendarFlow),
      sagaMiddleware.run(reportSaga.reportFlow),
      sagaMiddleware.run(documentSaga.documentFlow),
      sagaMiddleware.run(documentSaga.documentProcessedFlow),
      sagaMiddleware.run(documentSaga.detailDocumentFlow),
      sagaMiddleware.run(documentSaga.logCommentDocumentFlow),
      sagaMiddleware.run(fileSaga.attackFileFlow)
    ]
  };
}