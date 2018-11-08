import React, {Component} from "react";
import {Platform, SectionList, Image, Text, View, Alert, TouchableOpacity, StyleSheet, TextInput, Input, FlatList, TouchableWithoutFeedback} from "react-native";
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
import {sectionListData} from '../../data/sectionListData';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Moment from 'moment';

export default class LichCongTac extends Component {
    constructor(props) {
        super(props);
        this.state = {
            week: 'Tuần 42 năm 2018',
            weekTime: '15/10/2018 - 21/10/2018',
        };
      }


    render() {
      
      return (
        <View style = {{flex: 1}}>
            <DefaultHeader myTitle= "Lịch công tác lãnh đạo" navigator= {this.props.navigation} />
            <View style={{flexDirection: 'row', padding: 10, justifyContent: 'space-between'}}>
                <Image source={require('../../image/ic_arrow_left.png')} style={{width: 30, height: 30, margin: 10}}/>
                <View style={{alignContent: 'center'}}>
                    <Text style={{fontSize: 18, color: 'red', marginLeft: 16}}>{this.state.week}</Text>
                    <Text style={{fontSize: 18, color: 'black'}}>{this.state.weekTime}</Text>
                </View>
                <Image source={require('../../image/ic_arrow_right.png')} style={{width: 30, height: 30, margin: 10}}/>
            </View>
            <View style={{ flex: 1, marginTop: Platform.OS === 'ios' ? 34 : 0 }}>
                <SectionList
                    renderItem={({ item, index, section }) => {
                        return (<SectionListItem item={item} index={index} >

                        </SectionListItem>);
                    }}
                    renderSectionHeader={({ section }) => {
                        return (<SectionHeader section={section} />);
                    }}
                    sections={sectionListData}
                    keyExtractor={(item, index) => item + index}
                >

                </SectionList>
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

  // section list

class SectionListItem extends Component {
    render() {

        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                backgroundColor: 'white'
            }}>
                <View style={{flexDirection: 'row', backgroundColor: 'limegreen', height: 40, justifyContent:'center', alignItems: 'center'}}>
                <Text style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: 'white',
                      marginLeft: 20,
                      
                  }}>Đ/C:
                  </Text>
                  <Text style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: 'white',
                      marginLeft: 4,
                      marginRight: 10,
                      
                  }}>{this.props.item.name}
                  </Text>
                </View>

                 {/* sáng  */}
                 <View style={{flexDirection: 'row',marginTop: 6}}>
                      <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: 'grey',
                            marginLeft: 10,
                            
                        }}>Sáng:
                      </Text>
                      <Text style={{
                        fontSize: 16,
                        marginLeft: 10,
                        marginRight: 10,
                        
                        color: 'red',
                      }}>{this.props.item.lichSang}
                      </Text>
                </View>
                <View style={{backgroundColor: 'rgb(77,120, 140)', height: 1, margin: 4, marginLeft: 10,marginRight: 10}}/>

                {/* chiều  */}
                <View style={{flexDirection: 'row', marginTop: 6}}>
                      <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: 'grey',
                            marginLeft: 10,
                            
                        }}>Chiều:
                      </Text>
                      <Text style={{
                        fontSize: 16,
                        marginLeft: 10,
                        marginRight: 10,
                        color: 'red',
                      }}>{this.props.item.lichChieu}
                      </Text>
                </View>
                <View style={{ height: 10, margin: 4, marginLeft: 10,marginRight: 10}}/>

            </View>
        );
    }
}
class SectionHeader extends Component {

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: 'dodgerblue',
                justifyContent: 'center',
                alignItems: 'center',
      
            }}>
                <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    
                    color: 'white',
                    margin: 20
                }}>{this.props.section.title}
                </Text>
            </View>
        );
    }
}
  