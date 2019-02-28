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
import infoExchangeReducer from '../reducers/infoExchangeReducer';
import notificationReducer from '../reducers/notificationReducer';
import lichSuXuLyReducer from '../reducers/lichSuXuLyReducer';
import luongVanBanReducer from '../reducers/luongVanBanReducer';
import chuyenXuLyReducer from '../reducers/chuyenXuLyReducer';
import menuReducer from '../reducers/menuReducer';
import thongTinDieuHanhReducer from '../reducers/thongTinDieuHanhReducer';
import userInfoReducer from '../reducers/userInfoReducer';

import createSagaMiddleware from "redux-saga";
import * as loginSaga from "../saga/login-saga";
import * as calendarSaga from "../saga/calendar-saga";
import * as logoutSaga from "../saga/logout-saga";
import * as listSaga from "../saga/list-saga";
import * as detailsSaga from "../saga/details-saga";
import * as reportSaga from "../saga/report-saga";
import * as documentSaga from "../saga/document-saga";
import * as fileSaga from "../saga/file-saga";
import * as infoExchangeSaga from "../saga/infoExchange-saga";
import * as notificationSaga from "../saga/notification-saga";
import * as lichSuXuLySaga from "../saga/lichSuXuLy-saga";
import * as luongVanBanSaga from "../saga/luongVanBan-saga";
import * as chuyenXuLySaga from "../saga/chuyenXuLy-saga";
import * as menuSaga from "../saga/menu-saga";
import * as thongTinDieuHanhSaga from "../saga/thongTinDieuHanh-saga";
import * as userInfroSage from "../saga/userInfo-sage";

const combinedReducers = combineReducers({
  root: rootReducer,
  login: loginReducer,
  list: listReducer,
  details: detailsReducer,
  calendar: calendarReducer,
  reportReducer: reportReducer,
  documentReducer: documentReducer,
  fileReducer: fileReducer,
  infoExchangeReducer: infoExchangeReducer,
  lichSuXuLyReducer: lichSuXuLyReducer,
  luongVanBanReducer: luongVanBanReducer,
  chuyenXuLyReducer: chuyenXuLyReducer,
  notificationReducer: notificationReducer,
  menuReducer: menuReducer,
  thongTinDieuHanhReducer: thongTinDieuHanhReducer,
  userInfoReducer: userInfoReducer,
});

const initialState = new Immutable.Map({
  root: Immutable.Map({
    // progress: undefined,
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

  infoExchangeReducer: Immutable.Map({

  }),

  lichSuXuLyReducer: Immutable.Map({

  }),
  luongVanBanReducer: Immutable.Map({

  }),

  chuyenXuLyReducer: Immutable.Map({

  }),
  
  notificationReducer: Immutable.Map({

  }),
  menuReducer: Immutable.Map({

  }),
  thongTinDieuHanhReducer: Immutable.Map({

  }),
  userInfoReducer: Immutable.Map({

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
      blacklist: ['root', 'thongTinDieuHanhReducer'],
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
      sagaMiddleware.run(documentSaga.documentNotifyFlow),
      sagaMiddleware.run(documentSaga.detailDocumentFlow),
      sagaMiddleware.run(documentSaga.logCommentDocumentFlow),
      sagaMiddleware.run(documentSaga.checkFinishDocumentFlow),
      sagaMiddleware.run(documentSaga.checkFinishDocumentTypeFlow),
      sagaMiddleware.run(documentSaga.checkSignedDocumentFlow),

      sagaMiddleware.run(fileSaga.attackFileFlow),
      sagaMiddleware.run(fileSaga.attackFileFlow),
      sagaMiddleware.run(fileSaga.viewFileFlow),

      sagaMiddleware.run(infoExchangeSaga.infoExchangeFlow),
      sagaMiddleware.run(infoExchangeSaga.guiYKienTraoDoiFlow),
      sagaMiddleware.run(notificationSaga.listNotificationFlow),
      sagaMiddleware.run(lichSuXuLySaga.lichSuXuLyFlow),
      sagaMiddleware.run(luongVanBanSaga.luongVanBanFlow),

      sagaMiddleware.run(chuyenXuLySaga.chuyenXuLyFlow),
      sagaMiddleware.run(chuyenXuLySaga.userConcurrentSendFlow),
      sagaMiddleware.run(chuyenXuLySaga.getListInternalFlow),
      sagaMiddleware.run(chuyenXuLySaga.getListGroupUnitFlow),
      sagaMiddleware.run(chuyenXuLySaga.documentMoveFlow),

      sagaMiddleware.run(menuSaga.countMenuFlow),

      sagaMiddleware.run(thongTinDieuHanhSaga.getListReceiveFlow),
      sagaMiddleware.run(thongTinDieuHanhSaga.getListSendFlow),
      sagaMiddleware.run(thongTinDieuHanhSaga.getListUserUnitFlow),
      sagaMiddleware.run(thongTinDieuHanhSaga.getDetailByIdFlow),
      sagaMiddleware.run(thongTinDieuHanhSaga.getListFilesByIdFlow),
      sagaMiddleware.run(thongTinDieuHanhSaga.deleteInfoByIdFlow),
      sagaMiddleware.run(thongTinDieuHanhSaga.getFlowByIdFlow),
      sagaMiddleware.run(thongTinDieuHanhSaga.getUserReceiverFlow),
      sagaMiddleware.run(thongTinDieuHanhSaga.createFlow),
      sagaMiddleware.run(thongTinDieuHanhSaga.updateEmployeeFlow),
      sagaMiddleware.run(thongTinDieuHanhSaga.sendFlow),


      sagaMiddleware.run(userInfroSage.getUserInfoFlow),
    ]
  };
}