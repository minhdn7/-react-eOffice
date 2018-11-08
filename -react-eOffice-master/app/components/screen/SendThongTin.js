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

export default class ChiTietDieuHanh extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: "Huỳnh Thị Trần Lê",
          date: "25/10/2018",
          sendingName: "ttdh gửi",
          description: "abc",
          guiToi: 'Bạn và 21 người khác',
        };
    }

    static navigationOptions = {
      visible: true,
    }


    render() {

      return (
        <View>
            <DefaultHeader myTitle= "Gửi thông tin điều hành" navigator= {this.props.navigation} />
            <View style = {itemStyles.containerStyle}>
                <Text>
                    {strings.tieuDe}
                    <Text style={{color: 'red'}}>  *</Text>
                </Text>
                <TextInput style={itemStyles.editTextStyle}></TextInput>

                <Text> {strings.noiDung}</Text>
                <TextInput style={[itemStyles.editTextStyle, {height: 180}]}></TextInput>
                <View style={itemStyles.rowStyle}>
                    <View style={{alignItems: 'center'}}>
                      <Text style={itemStyles.textStyle}>{strings.tapDinhKem}</Text>
                    </View>
                    
                    <Image source={require('../../image/ic_file_attach.png')} style={{height: 30, width: 30}} />
                    <View style={{alignItems: 'center'}}>
                    <Text style={{color: 'dodgerblue', textDecorationLine: 'underline'}}>{strings.chonTep}</Text> 
                    </View>
                    
                </View>
                    <View style={itemStyles.bottomStyle}>
                    <Button style={{flex: 5, backgroundColor: 'gray', justifyContent: 'center', borderRadius: 4, margin: 4}}>
                      <Text style={{color: 'white'}}>{strings.luuNhap}</Text>
                    </Button>

                    <Button style={{flex: 5, justifyContent: 'center', borderRadius: 4, margin: 4}}>
                      <Text style={{color: 'white'}}>{strings.chonNguoiNhan}</Text>
                    </Button>
                </View>
            </View>

        </View>
      )
    }

  }

const itemStyles = StyleSheet.create({
    containerStyle: {

      flexDirection: 'column',
      margin: 8
    },
    rowStyle:{
        marginTop: 10,
        flexDirection: 'row',
    },
    bottomStyle:{
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    editTextStyle: {
        height: 40,
        margin: 4,
        borderRadius: 4,
        borderWidth: 1,
        padding: 4,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    textStyle:{
        color: 'dimgrey',
        
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
    
