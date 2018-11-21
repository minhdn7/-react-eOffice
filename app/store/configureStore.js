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
import rootReducer from "../reducers/rootReducer";
import listReducer from "../reducers/listReducer";
import detailsReducer from "../reducers/detailsReducer";
import createSagaMiddleware from "redux-saga";
import * as loginSaga from "../saga/login-saga";
import * as calendarSaga from "../saga/calendar-saga";
import * as logoutSaga from "../saga/logout-saga";
import * as listSaga from "../saga/list-saga";
import * as detailsSaga from "../saga/details-saga";


const combinedReducers = combineReducers({
  root: rootReducer,
  login: loginReducer,
  list: listReducer,
  details: detailsReducer,
  calendar: calendarReducer
});

const initialState = new Immutable.Map({
  root: Immutable.Map({
    progress: undefined,
  }),
  login: Immutable.Map({
    isLoggedIn: false,
    token: '',
    loginError: '',
    username:'',
    password:'',
    authorizationId:'',
    loginData:{},
    hasContact: false,
    contactError: '',
    dataContact: {}

  }),
  list: Immutable.Map({
    data: [],
  }),
  
  details: Immutable.Map({
    readMe: ''
  }),
  calendar: Immutable.Map({
    // calendarError: '',
    // calendarData: {}
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
      sagaMiddleware.run(calendarSaga.calendarFlow)
    ]
  };
}