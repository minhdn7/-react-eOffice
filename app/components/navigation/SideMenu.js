import PropTypes from 'prop-types';
import React, {Component} from 'react';

import {NavigationActions, StackActions} from 'react-navigation';
import {TouchableOpacity,TouchableWithoutFeedback, ScrollView, Text, View, StyleSheet, Image, FlatList, ToastAndroid, Alert} from 'react-native';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import strings from "../../resources/strings";
import {connect} from "react-redux";
import * as documentAction from "../../actions/document-action";
import { Toast } from 'native-base';
import * as menuActions from "../../actions/menu-actions";
import * as logoutActions from "../../actions/logout-actions";
import ListKhoItem from './ListKhoItem';
import Login from "../screen/Login";
class SideMenu extends Component {
      countMenu: object;
      constructor() {
        super();

        this.state = {
          name: "username",
          address: "unitName",
          kho: [],
          collapsedDocument: false,
          collapsedSetting: false,
          collapsedControls: false,
        };
    }

    componentWillMount() {
      this.props.dispatch(menuActions.resetCountMenu());
      this.props.dispatch(menuActions.getCountMenu());
      loginData = this.props.login.get('loginData');
      danhSachKho = [];
      if(loginData.kho && loginData.kho.length > 0){
          danhSachKho = loginData.kho;
      }
      danhSachKho.push(strings.vanBanDaXuLy);
      danhSachKho.push(strings.vanBanXemDeBiet);
      this.setState({
        name: loginData.username,
        address: loginData.unitName,
        kho: danhSachKho,
      });
    }

    componentDidMount(){
      this.countMenu = this.props.menuReducer.get('countMenuData');

      // console.log("count menu response 2:", this.props.menuReducer.get('countMenuData'));
      countMenuError = this.props.menuReducer.get('countMenuError');
      if(countMenuError && countMenuError != ''){
        ToastAndroid.show(countMenuError, ToastAndroid.SHORT);

      }

    }

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  changeDocument = (type) => {
    this.props.dispatch(documentAction.resetListDocumentAction());
    this.props.dispatch(documentAction.setTypeDocumentAction(type));
    this.props.navigation.navigate('DocManagement'); 
  }

  logOut = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Login' })],
    });
    Alert.alert(
      'Xác nhận', 'Đăng xuất tài khoản?',
      [
          { text: 'Đồng ý', onPress:  () => {
              this.props.navigation.navigate('Login');
              this.props.dispatch(logoutActions.logout());
            }
 
              },
          { text: 'Đóng lại' },
      ],
      { cancelable: false },
    );
  }
  
  render () {

    return (
      <View style={menuStyles.container}>
        <ScrollView>
          <View>
            {/* header */}
            <View style={{ flexDirection: 'row', backgroundColor: '#0d47a1'}}>
                <Image style={{width: 80, height: 80}} 
                source={require('../../image/ic_avatar.png')}/>
                <View style={{flex: 1,justifyContent: 'center', padding: 4, }}>
                  <Text style={{fontSize: 16,color: 'white', fontWeight: 'bold'}}>{this.state.name}</Text>
                  <Text style={{fontSize: 16, color: 'white'}}>{this.state.address}</Text>
                </View>
            </View>

              {/* Trang chủ */}
              <TouchableOpacity
              onPress={ () => this.props.navigation.closeDrawer()}
              style={{flexDirection: 'row', alignItems: 'center', padding: 4}}>
                  <Image style={{width: 30, height: 30, margin: 4}} 
                  source={require('../../image/ic_home.png')}/>
                  <Text style={{color: '#0d47a1', padding: 4}}>{strings.trangChu}</Text>
              </TouchableOpacity>
              <View style={{height: 1, backgroundColor: 'gainsboro'}}/>

              {/* Trang tin tức */}
              <View style={{flexDirection: 'row', alignItems: 'center', padding: 4}}>
                  <Image style={{width: 30, height: 30, margin: 4}} 
                  source={require('../../image/ic_news.png')}/>
                  <Text style={{color: '#0d47a1', padding: 4}}>{strings.trangTinTuc}</Text>
              </View>
              <View style={{height: 1, backgroundColor: 'gainsboro'}}/>

              {/* Quản lý văn bản */}
              <Collapse 
                isCollapsed={this.state.collapsedDocument} 
	              onToggle={(isCollapsed)=>this.setState({collapsedDocument:isCollapsed})}> >
                <CollapseHeader>
                  <View style={{flexDirection: 'row', alignItems: 'center', padding: 4}}>
                      <Image style={{width: 30, height: 30, margin: 4}} 
                      source={require('../../image/ic_document.png')}/>
                      <Text style={{color: '#0d47a1', padding: 4}}>{strings.quanLyVanBan}</Text>
                      <View style={{flex: 1, alignItems: 'flex-end'}}>
                        <Image style={{width: 20, height: 20, margin: 4}} 
                        source={require('../../image/ic_expand.png')}/>
                      </View>

                  </View>
                  <View style={{height: 1, backgroundColor: 'gainsboro'}}/>
                </CollapseHeader>
                <CollapseBody style={{marginLeft: 10}}>
                <FlatList 
                    data={this.state.kho}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({item, index})=>{
                        return (
                          <TouchableOpacity onPress={ () => this.changeDocument(item)}>
                            <ListKhoItem item={item} index={index} >
                            
                            </ListKhoItem>
                          </TouchableOpacity>
                          );
          
                    }}
                    >

                    </FlatList>   
                </CollapseBody>
            </Collapse>


              {/* Danh bạ */}
              <TouchableOpacity
              onPress={ () => this.props.navigation.navigate('DanhBa')}
              style={{flexDirection: 'row', alignItems: 'center', padding: 4}}>
                  <Image style={{width: 30, height: 30, margin: 4}} 
                  source={require('../../image/contact.png')}/>
                  <Text style={{color: '#0d47a1', padding: 4}}>{strings.danhBa}</Text>
              </TouchableOpacity>
              <View style={{height: 1, backgroundColor: 'gainsboro'}}/>

              {/* Lịch công tác */}
              <TouchableOpacity 
              onPress={ () => this.props.navigation.navigate('LichCongTac')}
              style={{flexDirection: 'row', alignItems: 'center', padding: 4}}>
                  <Image style={{width: 30, height: 30, margin: 4}} 
                  source={require('../../image/ic_calendar.png')}/>
                  <Text style={{color: '#0d47a1', padding: 4}}>{strings.lichCongTacLanhDao}</Text>
              </TouchableOpacity>
              <View style={{height: 1, backgroundColor: 'gainsboro'}}/>

              {/* Thông tin điều hành */}
              <Collapse 
                isCollapsed={this.state.collapsedControls} 
	              onToggle={(isCollapsed)=>this.setState({collapsedControls:isCollapsed})}>
                <CollapseHeader>
                  <View style={{flexDirection: 'row', alignItems: 'center', padding: 4}}>
                      <Image style={{width: 30, height: 30, margin: 4}} 
                      source={require('../../image/ic_boss.png')}/>
                      <Text style={{color: '#0d47a1', padding: 4}}>{strings.thongTinDieuHanh}</Text>
                      <View style={{flex: 1, alignItems: 'flex-end'}}>
                        <Image style={{width: 20, height: 20, margin: 4}} 
                        source={require('../../image/ic_expand.png')}/>
                      </View>

                  </View>
                  <View style={{height: 1, backgroundColor: 'gainsboro'}}/>
                </CollapseHeader>
                <CollapseBody style={{marginLeft: 10}}>
                      <View style={{flexDirection: 'row', alignItems: 'center', padding: 4}}>
                        <Image style={{width: 30, height: 30, margin: 4}} 
                        source={require('../../image/ic_boss.png')}/>
                        <Text style={{color: '#0d47a1', padding: 4}}>{strings.thongTinDieuHanhNhan}</Text>
                      </View>
                      <View style={{height: 1, backgroundColor: 'gainsboro'}}/>

                      <View style={{flexDirection: 'row', alignItems: 'center', padding: 4}}>
                        <Image style={{width: 30, height: 30, margin: 4}} 
                        source={require('../../image/ic_chidao_gui.png')}/>
                        <Text style={{color: '#0d47a1', padding: 4}}>{strings.thongTinDieuHanhGui}</Text>
                      </View>
                      <View style={{height: 1, backgroundColor: 'gainsboro'}}/>
                </CollapseBody>
            </Collapse>
              


              {/* Báo cáo thống kê */}
              <TouchableOpacity
              onPress={ () => this.props.navigation.navigate('BaoCaoThongKe')} 
              style={{flexDirection: 'row', alignItems: 'center', padding: 4}}>
                  <Image style={{width: 30, height: 30, margin: 4}} 
                  source={require('../../image/ic_report.png')}/>
                  <Text style={{color: '#0d47a1', padding: 4}}>{strings.baoCaoThongKe}</Text>
              </TouchableOpacity>
              <View style={{height: 1, backgroundColor: 'gainsboro'}}/>

              {/* Cài đặt hệ thống */}
              <Collapse
                isCollapsed={this.state.collapsedSetting} 
	              onToggle={(isCollapsed)=>this.setState({collapsedSetting:isCollapsed})}>
                <CollapseHeader>
                  <View style={{flexDirection: 'row', alignItems: 'center', padding: 4}}>
                      <Image style={{width: 30, height: 30, margin: 4}} 
                      source={require('../../image/ic_default_home.png')}/>
                      <Text style={{color: '#0d47a1', padding: 4}}>{strings.caiDatHeThong}</Text>
                      <View style={{flex: 1, alignItems: 'flex-end'}}>
                        <Image style={{width: 20, height: 20, margin: 4}} 
                        source={require('../../image/ic_expand.png')}/>
                      </View>

                  </View>
                  <View style={{height: 1, backgroundColor: 'gainsboro'}}/>
                </CollapseHeader>
                <CollapseBody style={{marginLeft: 10}}>
                      <TouchableOpacity
                      onPress={ () => this.props.navigation.navigate('UserInfo')}
                      style={{flexDirection: 'row', alignItems: 'center', padding: 4}}>
                        <Image style={{width: 30, height: 30, margin: 4}} 
                        source={require('../../image/profile.png')}/>
                        <Text style={{color: '#0d47a1', padding: 4}}>{strings.thongTinCaNhan}</Text>
                      </TouchableOpacity>
                      <View style={{height: 1, backgroundColor: 'gainsboro'}}/>

                      <TouchableOpacity
                      onPress={ () => this.props.navigation.navigate('ChangePassword')}
                      style={{flexDirection: 'row', alignItems: 'center', padding: 4}}>
                        <Image style={{width: 30, height: 30, margin: 4}} 
                        source={require('../../image/password.png')}/>
                        <Text style={{color: '#0d47a1', padding: 4}}>{strings.doiMatKhau}</Text>
                      </TouchableOpacity>
                      <View style={{height: 1, backgroundColor: 'gainsboro'}}/>

                      <TouchableOpacity 
                      onPress={ () => this.props.navigation.navigate('Setting')}
                      style={{flexDirection: 'row', alignItems: 'center', padding: 4}}>
                        <Image style={{width: 30, height: 30, margin: 4}} 
                        source={require('../../image/ic_default_home.png')}/>
                        <Text style={{color: '#0d47a1', padding: 4}}>{strings.thietLapMacDinh}</Text>
                      </TouchableOpacity>
                      <View style={{height: 1, backgroundColor: 'gainsboro'}}/>
                </CollapseBody>
            </Collapse>

              {/* Đăng xuất */}
              <TouchableOpacity 
              onPress={ () => this.logOut()}
              style={{flexDirection: 'row', alignItems: 'center', padding: 4}}>
                  <Image style={{width: 30, height: 30, margin: 4}} 
                  source={require('../../image/logout.png')}/>
                  <Text style={{color: '#0d47a1', padding: 4}}>{strings.dangXuat}</Text>
              </TouchableOpacity>
              <View style={{height: 1, backgroundColor: 'gainsboro'}}/>
            
          </View>
        </ScrollView>
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

// export default SideMenu;

const menuStyles = StyleSheet.create({
    container: {
    flex: 1
  },
  navItemStyle: {
    padding: 10
  },
  navSectionStyle: {
    backgroundColor: 'lightgrey'
  },
  sectionHeadingStyle: {
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  footerContainer: {
    padding: 20,
    backgroundColor: 'lightgrey'
  },
  outerCircle: {
    borderRadius: 40,
    width: 30,
    height: 30,
    backgroundColor: 'red',
  },
  innerCircle: {
    borderRadius: 35,
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red'
  },
  itemDocumentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    padding: 2
  },
  });



  const mapStateToProps = (state) => ({
    login: state.get('login'),
    root: state.get('root'),
    menuReducer: state.get('menuReducer'),
  });
  
  export default connect(mapStateToProps)(SideMenu)  