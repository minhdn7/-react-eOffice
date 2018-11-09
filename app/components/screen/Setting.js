import React, {Component} from "react";
import {Image, Text, View, Alert, TouchableOpacity, StyleSheet, TextInput, Input, FlatList, TouchableWithoutFeedback} from "react-native";
import {Container, Content, Spinner, Button, CheckBox, ListItem, Body, Header} from "native-base";
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
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

export default class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            radio_props : [
                {id: '1', label: strings.trangChu, value: 0 },
                {id: '2', label: strings.vanBanDaXuLy, value: 1 },
                {id: '3', label: strings.vanBanXemDeBiet, value: 2 },
                {id: '4', label: strings.vanBanDanhDau, value: 3 },
                {id: '5', label: strings.danhBa, value: 4 },
                {id: '6', label: strings.lichCongTacLanhDao, value: 5 },
            ],

            selectedId: 0,
        };
      };
      

    onCheckBoxPress(value) {
        this.setState({
          selectedId: value
        });
      }

    render() {

      return (
        <View style = {{flex: 1}}>
            <DefaultHeader myTitle= {strings.thietLapMacDinh} navigator= {this.props.navigation} />
            <View style={{flex: 1}}>
                <View style={{alignItems: 'center'}}>
                    <Text style={{color: 'blue', fontSize: 20, margin: 12, fontWeight:'bold'}}>{strings.chonChucNangMacDinh}</Text> 
                </View>

               <View style={{margin: 20, borderWidth: 1, borderRadius: 4}}>

                    <View style={{flexDirection: 'row', backgroundColor: 'blue', height: 50, justifyContent: "center", alignItems: 'center'}}>
                            <Text style={{width:'90%', color: 'white', fontSize: 16}}>{strings.chucNangManHinh}</Text>
                            <Text style={{fontSize: 16, justifyContent: 'center', color: 'white', textAlign: 'center'}}>{strings.chon}</Text>
                    </View>
                    <FlatList 
                    extraData={this.state}
                    keyExtractor={(item, index) => item.id}
                    data={this.state.radio_props}
                    renderItem={({item, index})=>{
                        return <ListItem>
                            <Body style={{width:'90%'}}>
                                <Text>{item.label}</Text>
                            </Body>
                            <CheckBox
                                checked={this.state.selectedId == item.id}
                                onPress={() => this.onCheckBoxPress(item.id)}
                            />
                            </ListItem>
          
                    }}
                    >

                    </FlatList>  
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

  class FlatListItem extends Component {
    render() {          
        return (        
            <View style={{
                flex: 1,
                flexDirection:'column',
                backgroundColor: 'white',
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 2,                              
            }}> 
                <Text style={{backgroundColor: 'white', fontWeight: 'bold'}}>{this.props.item.name}</Text>           
                <View style={{
                        flex: 1,
                        flexDirection:'row',                
                        backgroundColor: 'white'
                }}>            
                  <Text style={{flex: 3}}>{this.props.item.name}</Text>
                  <CheckBox
                    checked={this.state.selectedId == item.value}
                    onPress={() => this.onCheckBoxPress(item.value)}
                  />            
                </View>
                
          </View>
        );
    }
  }
  