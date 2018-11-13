import PropTypes from 'prop-types';
import React, {Component} from 'react';

import {NavigationActions} from 'react-navigation';
import {TouchableOpacity, ScrollView, Text, View, StyleSheet, Image} from 'react-native';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import strings from "../../resources/strings";
import {connect} from "react-redux";
class SideMenu extends Component {
      constructor() {
        super();

        this.state = {
          name: "username",
          address: "unitName",
        };
    }

    componentWillMount() {
      console.log('token 3', this.props.login.get('token'));
      loginData = this.props.login.get('loginData');
      // res = this.props.login.get('token');
      this.setState({
        name: loginData.username,
        address: loginData.unitName,
      });
    }

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
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
              <Collapse>
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
                      <View style={{flexDirection: 'row', alignItems: 'center', padding: 4}}>
                        <Image style={{width: 30, height: 30, margin: 4}} 
                        source={require('../../image/document.png')}/>
                        <Text style={{color: '#0d47a1', padding: 4}}>{strings.vanBanChoXuLy}</Text>
                      </View>
                      <View style={{height: 1, backgroundColor: 'gainsboro'}}/>

                      <View style={{flexDirection: 'row', alignItems: 'center', padding: 4}}>
                        <Image style={{width: 30, height: 30, margin: 4}} 
                        source={require('../../image/ic_doc_processed.png')}/>
                        <Text style={{color: '#0d47a1', padding: 4}}>{strings.vanBanDaXuLy}</Text>
                      </View>
                      <View style={{height: 1, backgroundColor: 'gainsboro'}}/>

                      <View style={{flexDirection: 'row', alignItems: 'center', padding: 4}}>
                        <Image style={{width: 30, height: 30, margin: 4}} 
                        source={require('../../image/ic_doc_notification.png')}/>
                        <Text style={{color: '#0d47a1', padding: 4}}>{strings.vanBanXemDeBiet}</Text>
                      </View>
                      <View style={{height: 1, backgroundColor: 'gainsboro'}}/>

                      <View style={{flexDirection: 'row', alignItems: 'center', padding: 4,}}>
                        <Image style={{width: 30, height: 30, margin: 4}} 
                        source={require('../../image/ic_doc_expired.png')}/>
                        <Text style={{color: '#0d47a1', padding: 4}}>{strings.vanBanDanhDau}</Text>
                      </View>
                      <View style={{height: 1, backgroundColor: 'gainsboro'}}/>

                      <View style={{flexDirection: 'row', alignItems: 'center', padding: 4}}>
                        <Image style={{width: 30, height: 30, margin: 4}} 
                        source={require('../../image/ic_document_search.png')}/>
                        <Text style={{color: '#0d47a1', padding: 4}}>{strings.traCuuVanBan}</Text>
                      </View>
                      <View style={{height: 1, backgroundColor: 'gainsboro'}}/>
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
              <Collapse>
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
              <Collapse>
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
              <View style={{flexDirection: 'row', alignItems: 'center', padding: 4}}>
                  <Image style={{width: 30, height: 30, margin: 4}} 
                  source={require('../../image/logout.png')}/>
                  <Text style={{color: '#0d47a1', padding: 4}}>{strings.dangXuat}</Text>
              </View>
              <View style={{height: 1, backgroundColor: 'gainsboro'}}/>


            
          </View>
        </ScrollView>
        {/* <View style={menuStyles.footerContainer}>
          <Text>This is my fixed footer</Text>
        </View> */}
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
  
  });

  const mapStateToProps = (state) => ({
    login: state.get('login'),
    root: state.get('root'),
  });
  
  export default connect(mapStateToProps)(SideMenu)  