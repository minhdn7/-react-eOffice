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

    openListPerson= () =>{
      this.props.navigation.navigate('DanhSachNhan');
    }

    static navigationOptions = {
      visible: true,
    }


    render() {

      return (
        <View style = {{flex: 1}}>
            <DefaultHeader myTitle= "Chi tiết thông tin điều hành" navigator= {this.props.navigation} />
            <View style={{flex: 1}}>
                <View style={{flexDirection:'row', margin: 8}}>
                    <Image style={{width: 80, height: 80}} 
                      source={require('../../image/ic_avatar.png')}/>

                    <View style={{flex: 8, flexDirection:"column", padding: 8}}>
                      <Text>{this.state.name}</Text>
                      <Text>{this.state.date}</Text>
                    </View>
                </View>
                <Text style={{paddingLeft: 12, fontWeight: 'bold'}}>{this.state.sendingName}</Text>
                <Text style={{paddingLeft: 12, marginBottom: 8}}>{this.state.description}</Text>
                
                <View style={{height: 1, backgroundColor: 'gray'}}/>
                    <View style={{flexDirection:'row', margin: 8, justifyContent:'space-between', paddingLeft: 20, paddingRight: 20}}>
                        <View style={{flexDirection:'row', margin: 4, alignItems:'center'}}>
                          <Image source={require('../../image/ic_forward.png')} 
                          style={{width: 25, height: 25}}/>
                          <Text>{strings.chuyenTiep}</Text>
                        </View>

                        <View style={{flexDirection:'row', margin: 4, alignItems:'center'}}>
                          <Image source={require('../../image/ic_reply.png')} 
                          style={{width: 25, height: 25}}/>
                          <Text>{strings.traLoi}</Text>
                        </View>

                        <View style={{flexDirection:'row', margin: 4, alignItems:'center'}}>
                          <Image source={require('../../image/ic_reply_all.png')} 
                          style={{width: 25, height: 25}}/>
                          <Text>{strings.traLoiTatCa}</Text>
                        </View>
                    </View>
                <View style={{height: 1, backgroundColor: 'gray'}}/>
                    <View style={{flexDirection:'row', margin: 12, alignItems:'center'}}>
                      <Image source={require('../../image/ic_list_receive.png')} 
                      style={{width: 25, height: 25}}/>
                      <Text>{strings.guiToi}</Text>
                      <TouchableOpacity onPress={()=> this.openListPerson()}>
                        <Text style={{fontWeight: 'bold', marginLeft: 4}}>{this.state.guiToi}</Text>
                      </TouchableOpacity>
                      
                    </View>
                <View style={{height: 1, backgroundColor: 'gray', marginBottom: 10}}/>

                            <View style={{flex: 1, flexDirection:'row'}}>
                    <FlatList 
                    data={flatListData}
                    renderItem={({item, index})=>{
                        return (
                          <View>
                            <FlatListItem item={item} index={index} >

                            </FlatListItem>
                          </View>);
          
                    }}
                    >

                    </FlatList>      
                </View>
            </View>


        </View>
      )
    }

  }

  class FlatListItem extends Component {
    render() {          
        return ( 
          <View style={{ flex: 1,backgroundColor: 'white', flexDirection: 'row', margin: 4}}>
              <Image style={{width: 80, height: 80}}
                      source={require('../../image/ic_avatar.png')}/>
              <View style={{
                              flex: 1,
                              flexDirection:'column',
                              backgroundColor: 'gainsboro',
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

                              <View style={{flexDirection:'row', margin: 8, justifyContent:'space-between', paddingLeft: 20, paddingRight: 20}}>
                                      <View style={{flexDirection:'row', margin: 4, alignItems:'center'}}>
                                        <Image source={require('../../image/ic_forward.png')} 
                                        style={{width: 25, height: 25}}/>
                                        <Text>{strings.chuyenTiep}</Text>
                                      </View>

                                      <View style={{flexDirection:'row', margin: 4, alignItems:'center'}}>
                                        <Image source={require('../../image/ic_reply.png')} 
                                        style={{width: 25, height: 25}}/>
                                        <Text>{strings.traLoi}</Text>
                                      </View>

                                      <View style={{flexDirection:'row', margin: 4, alignItems:'center'}}>
                                        <Image source={require('../../image/ic_reply_all.png')} 
                                        style={{width: 25, height: 25}}/>
                                        <Text>{strings.traLoiTatCa}</Text>
                                      </View>
                              </View>
                        </View>     
          </View> 
        );
    }
  }
    
