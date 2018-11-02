import React, {Component} from "react";
import {Image, Text, View, Alert, TouchableOpacity, StyleSheet, TextInput, Input, FlatList, TouchableWithoutFeedback} from "react-native";
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

export default class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName : 'Lê Hữu Hoàng',
            gioiTinh: 'Nam',
            ngaySinh: '1/11/2018',
            phone: '0123456789',
            email: '123@gmail.com',
            tenDangNhap: 'hoanglx',
            danToc: 'Kinh',
            tonGiao: 'Không',
            hocVan: 'Đại học',
            diaChi: 'Thống nhất',
            donVi: 'VNPT',
            trangThai: 'chờ duyệt',
        };
      }
      


    render() {
      
      return (
        <View style = {{flex: 1}}>
            <DefaultHeader myTitle= "Thông tin cá nhân" navigator= {this.props.navigation} />
            <View style={{flex: 1}}>
                <View style={{flexDirection: 'row' ,margin: 10, alignItems: 'center'}}>
                    <Image source={require('../../image/ic_avatar.png')} style={{width: 60, height: 60}}/>
                    <Text style={{color: 'black', fontSize: 18, padding: 4, fontWeight: 'bold' }}>{this.state.userName}</Text>
                </View>
                <View style={{margin: 6, height: 1, backgroundColor: 'lightslategray'}}/>
                <View style={{margin: 6}}>
                    <View style={itemStyles.viewBound}>
                        <Text style={itemStyles.textLabel}>{strings.gioiTinh}</Text>
                        <Text style={itemStyles.textData}>{this.state.gioiTinh}</Text>
                    </View>

                    <View style={itemStyles.viewBound}>
                        <Text style={itemStyles.textLabel}>{strings.ngaySinh}</Text>
                        <Text style={itemStyles.textData}>{this.state.ngaySinh}</Text>
                    </View>

                    <View style={itemStyles.viewBound}>
                        <Text style={itemStyles.textLabel}>{strings.dienThoai}</Text>
                        <Text style={itemStyles.textData}>{this.state.phone}</Text>
                    </View>

                    <View style={itemStyles.viewBound}>
                        <Text style={itemStyles.textLabel}>{strings.email}</Text>
                        <Text style={itemStyles.textData}>{this.state.email}</Text>
                    </View>

                    <View style={itemStyles.viewBound}>
                        <Text style={itemStyles.textLabel}>{strings.tenDangNhap}</Text>
                        <Text style={itemStyles.textData}>{this.state.tenDangNhap}</Text>
                    </View>

                    <View style={itemStyles.viewBound}>
                        <Text style={itemStyles.textLabel}>{strings.danToc}</Text>
                        <Text style={itemStyles.textData}>{this.state.danToc}</Text>
                    </View>

                    <View style={itemStyles.viewBound}>
                        <Text style={itemStyles.textLabel}>{strings.tonGiao}</Text>
                        <Text style={itemStyles.textData}>{this.state.tonGiao}</Text>
                    </View>

                    <View style={itemStyles.viewBound}>
                        <Text style={itemStyles.textLabel}>{strings.hocVan}</Text>
                        <Text style={itemStyles.textData}>{this.state.hocVan}</Text>
                    </View>

                    <View style={itemStyles.viewBound}>
                        <Text style={itemStyles.textLabel}>{strings.diaChi}</Text>
                        <Text style={itemStyles.textData}>{this.state.diaChi}</Text>
                    </View>

                    <View style={itemStyles.viewBound}>
                        <Text style={itemStyles.textLabel}>{strings.donVi}</Text>
                        <Text style={itemStyles.textData}>{this.state.donVi}</Text>
                    </View>

                    <View style={itemStyles.viewBound}>
                        <Text style={itemStyles.textLabel}>{strings.trangThai}</Text>
                        <Text style={itemStyles.textData}>{this.state.trangThai}</Text>
                    </View>
                </View>




            </View>
          

        </View>
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
    textLabel: {
      flex: 2,
      margin: 4,
      fontSize: 16,
    },
    textData: {
        flex: 8,
        margin: 4,
        fontSize: 16,
      },
    viewBound:{
        flexDirection:'row',
        margin: 4,
    }  
  });
