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

export default class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            olderPassword: '',
            newPassword: '',
        };
      }
      


    render() {
      
      return (
        <View style = {{flex: 1}}>
            <DefaultHeader myTitle= {strings.doiMatKhau} navigator= {this.props.navigation} />
            <View>
                <View style={itemStyles.viewBound}>
                    <Text style={itemStyles.textLabel}>{strings.matKhauCu}</Text>
                    <Text style={{color: 'red', fontStyle: 'italic'}}>*</Text>
                </View>
                <TextInput style={itemStyles.textInput}></TextInput>
            </View>         

            <View>
                <View style={itemStyles.viewBound}>
                    <Text style={itemStyles.textLabel}>{strings.matKhauMoi}</Text>
                    <Text style={{color: 'red', fontStyle: 'italic'}}>*</Text>
                </View>
                <TextInput style={itemStyles.textInput}></TextInput>
            </View>

            <View>
                <View style={itemStyles.viewBound}>
                    <Text style={itemStyles.textLabel}>{strings.xacNhanMatKhau}</Text>
                    <Text style={{color: 'red', fontStyle: 'italic'}}>*</Text>
                </View>
                <TextInput style={itemStyles.textInput}></TextInput>
            </View>
            <View style={{flexDirection: 'row', padding: 20, justifyContent:'center' }}>
                <Button style={itemStyles.buttonStyle}>
                    <Text style={{color: 'white', fontSize: 20}}>{strings.capNhat}</Text>
                </Button>
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
      margin: 4,
      fontSize: 18,
    },
    textData: {
        margin: 4,
        fontSize: 16,
    },
    textInput: {
        padding: 4,
        fontSize: 16,
        margin: 10,
        borderRadius: 4,
        borderColor: 'lightslategrey',
        borderWidth: 1,
    },
    buttonStyle: {
        padding: 20,
        width: '100%',
        fontSize: 16,
        borderRadius: 10,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent:'center',
    },
    viewBound:{
        flexDirection:'row',
        margin: 10,
        alignItems:'center',
    }
  });
