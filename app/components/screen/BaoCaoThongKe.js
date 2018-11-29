import React, {Component} from "react";
import {Image, Picker, Text, View, Alert, TouchableOpacity, StyleSheet, TextInput, Input, FlatList, TouchableWithoutFeedback} from "react-native";
import {Container, Content, Spinner, Button} from "native-base";
import { Navigation, StatusBar} from 'react-native-navigation';
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

import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation-performance';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DefaultHeader from '../navigation/DefaultHeader';
import flatListData from '../../data/flatListData';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Moment from 'moment';

import moment from 'moment';
import * as reportAction from "../../actions/report-actions";
import * as rootActions from "../../actions/root-actions";

export class BaoCaoThongKe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            month: moment().format('m'),
            idReport: 0,
            typeReport: 'Chọn báo cáo',
            iDenChoXuLy: '0',
            iDenQuaHan: '0',
            iDenDaXuLy: '0',
            iDenDaBanHanh: '0',

            iDiChoXuLy: '0',
            iDiQuaHan: '0',
            iDiDaXuLy: '0',
            iDiDaBanHanh: '0',

            iCongViecChoXuLy: '0',
            iCongViecQuaHan: '0',
            iCongViecDangThucHien: '0',
            iCongViecDaThucHien: '0',
            iCongViecDaHoanThanh: '0',
        };
      }
      
    componentWillMount(){
        this.props.dispatch(rootActions.controlProgress(false));
        this.props.dispatch(reportAction.getReportDocument());
        this.props.dispatch(reportAction.getReportWord(this.state.month));
    }

    render() {
      
      return (
        <View style = {{flex: 1}}>
            <DefaultHeader myTitle= 'Báo cáo thống kê' navigator= {this.props.navigation} />

            <View style={{flex: 1, backgroundColor: 'gainsboro'}}>
                <View style={{flexDirection: 'row', height: 50, justifyContent: 'center'}}> 
                        <View style={{ flex: 6, backgroundColor: 'white', justifyContent: 'center', padding: 4, margin: 6}}>
                            <Picker
                                selectedValue={this.state.typeReport}
                                
                                onValueChange={(itemValue, itemIndex) => this.setState({typeReport: itemValue})}>
                                <Picker.Item label="Chọn báo cáo" value="Chọn báo cáo" />
                                <Picker.Item label="Báo cáo thống kê đơn vị" value="Báo cáo thống kê đơn vị" />
                                <Picker.Item label="Báo cáo tổng hợp tháng" value="Báo cáo tổng hợp tháng" />
                                <Picker.Item label="Báo cáo tổng hợp năm" value="Báo cáo tổng hợp năm" />
                            </Picker>
                        </View>                   
                        <Button style={{ flex: 4, height: 40, backgroundColor: 'dodgerblue', margin: 4,  marginLeft: 10, marginRight: 10, justifyContent: 'center', borderRadius: 4 }}>
                            <Text style={{color: 'white'}}>Xem</Text>
                        </Button>
                </View>

                {/* Quản lý văn bản */}
                <View style={{height: 40, backgroundColor: "#0d47a1", marginLeft:4, marginRight: 4, paddingLeft: 8, justifyContent: 'center', borderTopLeftRadius: 4, borderTopRightRadius: 4}}>
                       <Text style={{color: 'white', fontWeight: "bold", fontSize: 18}}>{strings.quanLyVanBan}</Text>    
                </View>
                
                <View style={{backgroundColor: 'white', marginLeft:4, marginRight: 4}}>
                    <Text style={{color: 'black', fontWeight: "bold", paddingLeft: 10, fontSize: 16}}>{strings.vanBanDen}</Text>
                    <View style={{flexDirection:'row', padding: 4, paddingLeft: 10, paddingRight: 10}}>
                        <Text style={{width: '90%', fontSize: 16}}>{strings.tongVanBanDangXuLy}</Text>
                        <Text style={{width: '10%', color: 'orange', fontSize: 16}}>{this.state.iDenChoXuLy}</Text>
                    </View>
                    <View style={{flexDirection:'row', padding: 4, paddingLeft: 10, paddingRight: 10}}>
                        <Text style={{width: '90%', fontSize: 16}}>{strings.tongVanBanDen}</Text>
                        <Text style={{width: '10%', color: 'orange', fontSize: 16}}>{this.state.iDenQuaHan}</Text>
                    </View>
                    <View style={{flexDirection:'row', padding: 4, paddingLeft: 10, paddingRight: 10}}>
                        <Text style={{width: '90%', fontSize: 16}}>{strings.tongVanBanDaXuLy}</Text>
                        <Text style={{width: '10%', color: 'orange', fontSize: 16}}>{this.state.iDenDaXuLy}</Text>
                    </View>
                    <View style={{flexDirection:'row', padding: 4, paddingLeft: 10, paddingRight: 10}}>
                        <Text style={{width: '90%', fontSize: 16}}>{strings.tongVanBanDaBanHanh}</Text>
                        <Text style={{width: '10%', color: 'orange', fontSize: 16}}>{this.state.iDenDaXuLy}</Text>
                    </View>

                    <Text style={{color: 'black', fontWeight: "bold", paddingLeft: 10, fontSize: 16}}>{strings.vanBanDi}</Text>
                    <View style={{flexDirection:'row', padding: 4, paddingLeft: 10, paddingRight: 10}}>
                        <Text style={{width: '90%', fontSize: 16}}>{strings.tongVanBanDangXuLy}</Text>
                        <Text style={{width: '10%', color: 'orange', fontSize: 16}}>{this.state.iDiChoXuLy}</Text>
                    </View>
                    <View style={{flexDirection:'row', padding: 4, paddingLeft: 10, paddingRight: 10}}>
                        <Text style={{width: '90%', fontSize: 16}}>{strings.tongVanBanDen}</Text>
                        <Text style={{width: '10%', color: 'orange', fontSize: 16}}>{this.state.iDiQuaHan}</Text>
                    </View>
                    <View style={{flexDirection:'row', padding: 4, paddingLeft: 10, paddingRight: 10}}>
                        <Text style={{width: '90%', fontSize: 16}}>{strings.tongVanBanDaXuLy}</Text>
                        <Text style={{width: '10%', color: 'orange', fontSize: 16}}>{this.state.iDiDaXuLy}</Text>
                    </View>
                    <View style={{flexDirection:'row', padding: 4, paddingLeft: 10, paddingRight: 10}}>
                        <Text style={{width: '90%', fontSize: 16}}>{strings.tongVanBanDaBanHanh}</Text>
                        <Text style={{width: '10%', color: 'orange', fontSize: 16}}>{this.state.iDiDaXuLy}</Text>
                    </View>
                </View>

                {/* Quản lý công việc */}
               <View style={{height: 40, backgroundColor: "#0d47a1", marginLeft:4, marginRight: 4, marginTop: 4, paddingLeft: 8, justifyContent: 'center', borderTopLeftRadius: 4, borderTopRightRadius: 4}}>
                       <Text style={{color: 'white', fontWeight: "bold", fontSize: 18}}>{strings.quanLyCongViec}</Text>    
                </View>
                <View style={{backgroundColor: 'white', marginLeft:4, marginRight: 4}}>
                    
                    <View style={{flexDirection:'row', padding: 4, paddingLeft: 10, paddingRight: 10}}>
                        <Text style={{width: '90%', fontSize: 16}}>{strings.quanLyCongViec}</Text>
                        <Text style={{width: '10%', color: 'orange', fontSize: 16}}>{this.state.iCongViecChoXuLy}</Text>
                    </View>
                    <View style={{flexDirection:'row', padding: 4, paddingLeft: 10, paddingRight: 10}}>
                        <Text style={{width: '90%', fontSize: 16}}>{strings.congViecBanDangXuLy}</Text>
                        <Text style={{width: '10%', color: 'orange', fontSize: 16}}>{this.state.iCongViecQuaHan}</Text>
                    </View>
                    <View style={{flexDirection:'row', padding: 4, paddingLeft: 10, paddingRight: 10}}>
                        <Text style={{width: '90%', fontSize: 16}}>{strings.congViecBanDen}</Text>
                        <Text style={{width: '10%', color: 'orange', fontSize: 16}}>{this.state.iCongViecDangThucHien}</Text>
                    </View>
                    <View style={{flexDirection:'row', padding: 4, paddingLeft: 10, paddingRight: 10}}>
                        <Text style={{width: '90%', fontSize: 16}}>{strings.congViecBanDaXuLy}</Text>
                        <Text style={{width: '10%', color: 'orange', fontSize: 16}}>{this.state.iCongViecDaThucHien}</Text>
                    </View>
                    <View style={{flexDirection:'row', padding: 4, paddingLeft: 10, paddingRight: 10}}>
                        <Text style={{width: '90%', fontSize: 16}}>{strings.congViecBanDaBanHanh}</Text>
                        <Text style={{width: '10%', color: 'orange', fontSize: 16}}>{this.state.iCongViecDaHoanThanh}</Text>
                    </View>
                    
                </View> 
            
                {this.renderProgress()}
            </View>
            
        </View>
      )
    }
    
    renderProgress() {
        if (this.props.root.get('progress')) {
          return this.spinner()
        } else {
          return null;
        }
      }   
    
      spinner() {
        return (
          <Spinner
            color={colors.accentColor}
            animating={true}
            size={'large'}
            style={styles.progressStyle}/>
        )
      }
  }


  const itemStyles = StyleSheet.create({
    containerStyle: {
      flexDirection: 'column',
      resizeMode: 'cover',
      flex: 1,
      alignItems: 'center'
    },
    textStyle: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      margin: 4,
      borderRadius: 4,
      borderWidth: 1,
      padding: 4
    },
    buttonStyle: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      margin: 4,
      borderRadius: 4,
      borderWidth: 1,
      padding: 4,
      justifyContent:"center"
    },
      flatListItem: {
        color: 'white',
        padding: 10,
        fontSize: 16,  
    }
  });

function mapStateToProps(state){
    return {
        reportReducer: state.get('reportReducer'),
        root: state.get('root'),
        // login: state.get('login')
    }
}
export default connect(mapStateToProps)(BaoCaoThongKe)
  