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
import DrawerMenu from "./DrawerMenu";
import RepositoriesList from "../RepositoriesList";
import RepositoryDetails from "../RepositoryDetails";

const store = configureStore();
const Routes = {
  Login: {screen: Login},
  Home: {screen: Home},
  ThongTinDieuHanh: {screen: ThongTinDieuHanh},
  ChiTietDieuHanh: {screen: ChiTietDieuHanh},
  SendThongTin: {screen: SendThongTin},
  DanhSachNhan: {screen: DanhSachNhan},
  LichCongTac: {screen: LichCongTac},
  DrawerMenu: {screen: DrawerMenu},
  RepositoriesList: {screen: RepositoriesList},
  RepositoryDetails: {screen: RepositoryDetails},
  
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
    login: state.login
  }
}
export default connect(
  mapStateToProps)(Navigation);
