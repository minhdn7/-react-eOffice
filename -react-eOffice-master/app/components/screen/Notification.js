import React, {Component} from "react";
import {CheckBox, Image, Picker, Text, View, Alert, TouchableOpacity, StyleSheet, TextInput, Input, FlatList, TouchableWithoutFeedback} from "react-native";
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
import RoundCheckbox from 'rn-round-checkbox';

export default class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
          deletedRowKey: null,
          refresh : false,
          cal: 'abc',
        };
      }
      
    refreshFlatList = (deletedKey) => {
      this.setState((prevState) => {
          return {
              deletedRowKey: deletedKey
          };
      });
    }

    deleteItemFlastList=(index) =>{
      
      flatListData.splice(index, 1);     
      //Refresh FlatList ! 
      this.setState({
        refresh: !this.state.refresh
      });
      abc = '' + this.state.refresh;
      Alert.alert(abc);
    }

    render() {
      
      return (
        <View style = {{flex: 1}}>
            <DefaultHeader myTitle= 'Thông báo' navigator= {this.props.navigation} />
            <View style={{backgroundColor: 'lightgrey', flex: 1}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between',
                            paddingLeft: 10, paddingRight: 10}}>
                    <Text style={{color: 'black', fontSize: 18}}>{strings.tatCa}</Text>
                    <Text style={{color: 'royalblue', fontSize: 18}}>{strings.daDoc}</Text>
                </View>

                <FlatList
                    
                    data={flatListData}
                    renderItem={({item, index})=>{
                        return (
                          <TouchableOpacity onPress={() => this.deleteItemFlastList(index)}>
                            <FlatListItem item={item} index={index} parentFlatList={this}>

                            </FlatListItem>
                          </TouchableOpacity>);
          
                    }}
                    >

                </FlatList>
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

  });


  class FlatListItem extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isChecked: false,
        activeRowKey: null,
      };
    }
    render() {          
        return ( 
          <View style={{ flex: 1,backgroundColor: 'white', flexDirection: 'row', 
                      marginLeft: 6, marginRight: 6, marginTop: 1}}>
              <Image style={{width: 80, height: 80}}
                      source={require('../../image/ic_avatar.png')} refresh={this.props.refresh}/>
            <View style={{marginLeft: 10, marginRight: 10}}>
              <CheckBox
                    style={{flex: 1}}
                    onClick={()=>{
                      this.setState({                        
                          isChecked:!this.state.isChecked

                      })
                      // const deletingRow = this.state.activeRowKey;  
                      // flatListData.splice(this.props.index, 1);
                      
                      // //Refresh FlatList ! 
                      // this.props.parentFlatList.refreshFlatList(deletingRow);
                    }}
                    isChecked={false}
                />
            </View>

              <View style={{
                              flex: 1,
                              flexDirection:'column',
                              padding: 8,
                              paddingLeft: 4,
                              borderRadius: 10,                              
                          }}> 
                              <Text style={{fontWeight: 'bold', marginLeft: 8}}>{String(this.props.item.name)}</Text>           
                              <Text style={{flex: 7, marginLeft: 8}}>{this.props.item.time}</Text> 
                              <Text style={{flex: 7, marginLeft: 8}}
                              >{this.props.cal}</Text> 
                        </View>     
          </View> 
        );
    }
  }  


  
  