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

export default class DanhSachNhan extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isDateTimePickerVisible: false,
          isStartDate: true,
          startDate: 'Từ ngày',
          endDate: 'Đến ngày',
        };
      }
      
      openDetailControls= (item) =>{
        // this.props.navigation.navigate('ChiTietDieuHanh');
      }


    render() {
      
      return (
        <View style = {{flex: 1}}>
            <DefaultHeader myTitle= "Danh sách người nhận" navigator= {this.props.navigation} />
            <View style={{flex: 1, alignItems:'center'}}>

                <View style={{height: 40, flexDirection:'row', margin: 4, 
                borderRadius: 4, borderWidth: 1, alignItems:'center'}}>
                <Image source={require('../../image/ic_search.png')} style={{width: 24, height: 24}}/>
                <TextInput 
                          style={{flex: 1,
                          padding: 4,}}
                          placeholder="Tìm kiếm"/>
                </View>


                <View style={{flex: 1, flexDirection:'row', margin: 4, marginTop: 4}}>
                    <FlatList 
                    data={flatListData}
                    renderItem={({item, index})=>{
                        return (
                          <TouchableOpacity onPress={ () => this.openDetailControls(item)}>
                            <FlatListItem item={item} index={index} >

                            </FlatListItem>
                          </TouchableOpacity>);
          
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

  class FlatListItem extends Component {
    render() {          
        return ( 
          <View style={{ flex: 1,backgroundColor: 'white', flexDirection: 'row', margin: 4}}>
              <View>
                <Image style={{width: 80, height: 80}}
                          source={require('../../image/ic_avatar.png')}/>
                <Text style={{color: 'dodgerblue'}}>{this.props.item.name}</Text>
                <Text style={{color: 'dodgerblue'}}>{this.props.item.time}</Text>            
              </View>

              <View style={{
                              flex: 1,
                              flexDirection:'column',
                              backgroundColor: 'white',
                              padding: 8,
                              paddingLeft: 4,
                              borderRadius: 10,                              
                          }}> 
                              <Text style={{fontWeight: 'bold', marginLeft: 8}}>{this.props.item.name}</Text>           
                              <Text style={{flex: 7, marginLeft: 8}}>{this.props.item.time}</Text> 
                              <View style={{
                                      flex: 1,
                                      flexDirection:'row',                
                                      marginLeft: 8
                              }}>            
                                <Text style={{fontWeight: 'bold'}}>{strings.trL}</Text>
                                <Text style={{fontWeight: 'bold'}}>{this.props.item.nameSend}</Text>              
                              </View>
                              <Text style={{flex: 1, marginLeft: 8}}>{this.props.item.foodDescription}</Text> 

                        </View>     
          </View> 
        );
    }
  }
  