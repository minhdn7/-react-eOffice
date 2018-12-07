/**
 * Created by saionara1 on 6/21/17.
 */
import React, {Component} from "react";
import {connect, Provider} from "react-redux";
import configureStore from "../../store/configureStore.js";
import {StackNavigator} from "react-navigation";
import Login from "../screen/Login";
import Home from "../screen/Home";
import ThongTinDieuHanh from "../screen/ThongTinDieuHanh";
import ChiTietDieuHanh from "../screen/ChiTietDieuHanh";
import SendThongTin from "../screen/SendThongTin";
import DanhSachNhan from "../screen/DanhSachNhan";
import LichCongTac from "../screen/LichCongTac";
import BaoCaoThongKe from "../screen/BaoCaoThongKe";
import Notification from "../screen/Notification";
import UserInfo from "../screen/UserInfo";
import ChangePassword from "../screen/ChangePassword";
import Setting from "../screen/Setting";
import DanhBa from "../screen/DanhBa";
import DrawerMenu from "./DrawerMenu";
import RepositoriesList from "../RepositoriesList";
import RepositoryDetails from "../RepositoryDetails";
import DocManagement from "../QLVanBan/DocManagement";
import DocHistory from "../QLVanBan/DocHistory";
import InfoExchange from "../QLVanBan/InfoExchange";
import DocumentDetail from "../QLVanBan/DocumentDetail";
import ChuyenXuLy from "../QLVanBan/ChuyenXuLy";

const store = configureStore();
const Routes = {
  Login: {screen: Login},
  Home: {screen: Home},
  DanhBa: {screen: DanhBa},
  ThongTinDieuHanh: {screen: ThongTinDieuHanh},
  ChiTietDieuHanh: {screen: ChiTietDieuHanh},
  SendThongTin: {screen: SendThongTin},
  DanhSachNhan: {screen: DanhSachNhan},
  LichCongTac: {screen: LichCongTac},
  BaoCaoThongKe: {screen: BaoCaoThongKe},
  Notification: {screen: Notification},
  UserInfo: {screen: UserInfo},
  ChangePassword: {screen: ChangePassword},
  Setting: {screen: Setting},
  DrawerMenu: {screen: DrawerMenu},
  // RepositoriesList: {screen: RepositoriesList},
  // RepositoryDetails: {screen: RepositoryDetails},
  DocManagement: {screen: DocManagement},
  DocHistory: {screen: DocHistory},
  InfoExchange: {screen: InfoExchange},
  DocumentDetail: {screen: DocumentDetail},
  ChuyenXuLy: {screen: ChuyenXuLy},
  
};
const Navigator = StackNavigator(Routes, {
  headerMode: 'none',
  navigationOptions: {
      headerVisible: false,
  }
});

export class Navigation extends Component {

  render() {
    return (
      <Provider store={store}>
        <Navigator/>
      </Provider>
    );
  }

}

function mapStateToProps(state) {
  return {
    // login: state.login
  }
}
export default connect(
  mapStateToProps)(Navigation);
