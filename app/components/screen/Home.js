import React, {Component} from "react";
import {Image, Text, View, Alert, TouchableOpacity} from "react-native";
import {Container, Content, Spinner, Button} from "native-base";
import { Navigation } from 'react-native-navigation';
import colors from "../../resources/colors";
import {connect} from "react-redux";
import dimens from "../../resources/dimens";
import styles from "../../resources/styles";
import HTML from "react-native-render-html";
import showdown from "showdown";
import strings from "../../resources/strings";
import * as detailsActions from "../../actions/details-actions";
import Color from 'react-native-material-color';
import PropTypes from 'prop-types';

import BaoCaoThongKe from "../screen/BaoCaoThongKe";
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation-performance';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../navigation/Header';
import consts from "../../const";
import * as documentAction from "../../actions/document-action";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      isStartDate: true,
      startDate: 'Từ ngày',
      endDate: 'Đến ngày',
      menu: this.props.navigation,
    };
  }
  openMenu(){
    this.props.navigation.openDrawer();
  }
  
  openDetail= (id) =>{
      // Alert.alert("" + id);
      switch (id) {
        case 1:
          this.props.dispatch(documentAction.setTypeDocumentAction(strings.vanBanChoXuLy));
          this.props.navigation.navigate('DocManagement');
        
          break;
        case 2:
          this.props.navigation.navigate('LichCongTac');
          break;
        case 3:
        this.props.navigation.navigate('DanhBa');
          break;
        case 4:
          this.props.navigation.navigate('ThongTinDieuHanh');
          break;
        case 5:
          this.props.navigation.navigate('BaoCaoThongKe');

          break;
        case 6:
          Alert.alert('Thông báo',
          'Chức năng đang được phát triển!');
          break;
        default:
          break;
    }
  }
  
  componentDidMount() {
    // console.log('token 4', this.props.login.get('token'));
  }


    render() {

      return (
        <View>

              <Header onOpen={this.openMenu.bind(this)} myTitle= "Trang chủ"  navigator= {this.props.navigation} />

              <View style= {{}}>
                  <View style= {{alignItems: 'center', marginTop: 10, height: '30%'}}>
                    <View style={itemStyles.containerStyleRow}>
                          <TouchableOpacity style={itemStyles.itemStyle} onPress={() =>this.openDetail(1)}>
                            <Image source={require('../../image/home_document.png')} style={itemStyles.iconStyle50}/>
                            <Text style ={itemStyles.textStyle}>Quản lý văn bản</Text>
                          </TouchableOpacity>
                        
                          <TouchableOpacity style={[itemStyles.itemStyle , {backgroundColor:Color.BLUE[200]}]} onPress={() =>this.openDetail(2)}>
                            <Image source={require('../../image/home_schedule.png')} style={itemStyles.iconStyle50}/>
                            <Text style ={itemStyles.textStyle}>Lịch công tác lãnh đạo</Text>
                          </TouchableOpacity>
                      </View>
                  </View>
                  
                  <View style= {{alignItems: 'center', height: '30%'}}>
                    <View style={itemStyles.containerStyleRow}>
                          <TouchableOpacity style={[itemStyles.itemStyle , {backgroundColor:Color.BLUEGREY[300]}]} onPress={() =>this.openDetail(3)}>
                            <Image source={require('../../image/home_contact.png')} style={itemStyles.iconStyle50}/>
                            <Text style ={itemStyles.textStyle}>Danh bạ</Text>
                          </TouchableOpacity>
                        
                          <TouchableOpacity style={[itemStyles.itemStyle , {backgroundColor:Color.RED[300]}]} onPress={() =>this.openDetail(4)}>
                            <Image source={require('../../image/home_boss.png')} style={itemStyles.iconStyle50}/>
                            <Text style ={itemStyles.textStyle}>Thông tin điều hành</Text>
                          </TouchableOpacity>
                      </View>
                  </View>
      


                <View style= {{alignItems: 'center', height: '30%'}}>
                  <View style={itemStyles.containerStyleRow}>
                      <TouchableOpacity style={[itemStyles.itemStyle , {backgroundColor:Color.GREEN[500]}]} onPress={() =>this.openDetail(5)}>
                        <Image source={require('../../image/home_report.png')} style={itemStyles.iconStyle50}/>
                        <Text style ={itemStyles.textStyle}>Báo cáo thống kê</Text>
                      </TouchableOpacity>
                    
                      <TouchableOpacity style={[itemStyles.itemStyle , {backgroundColor:Color.ORANGE[500]}]} onPress={() =>this.openDetail(6)}>
                        <Image source={require('../../image/home_news.png')} style={itemStyles.iconStyle50}/>
                        <Text style ={itemStyles.textStyle}>Trang tin tức</Text>
                      </TouchableOpacity>
                  </View>
                </View>
              </View>
          </View>
      )
    }
    

  }


  const itemStyles = {
    containerStyle: {
      flexDirection: 'column',
      resizeMode: 'cover',
      flex: 1,
      alignItems: 'center'
    },

    containerStyleRow: {
      flexDirection: 'row',
      justifyContent:'center',
      height: '100%',
    },
    containerStyleColumn: {
      flexDirection: 'column',
      flex: 1,
      justifyContent: 'space-between',
    },
    textStyle: {
      color: '#fff',
      fontSize: 16,
    },
    itemStyle: {
      backgroundColor: Color.BLUE[900],
      width:'45%',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 6,
      margin: 4,
      borderRadius:10,

    },
    itemTitleStyle: {
      color: 'black',
      fontSize: 20,
      padding: 10
    },
    itemDescriptionStyle: {
      color: 'darkgrey',
      fontSize: 17,
      paddingLeft: 10
    },
    iconStyle: { 
      width: 30, 
      height: 30,
    },
    iconStyle50: {
      // marginTop: 40,
      width: 50, 
      height: 50,
    },
  };

  function mapStateToProps(state){
    return {
        documentReducer: state.get('documentReducer'),
        root: state.get('root'),
        login: state.get('login')
    }
}
export default connect(mapStateToProps)(Home)