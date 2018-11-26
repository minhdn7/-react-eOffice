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
import moment from 'moment';

import * as calendarAction from "../../actions/calendar-actions";
import * as rootActions from "../../actions/root-actions";



export class LichCongTac extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: moment().format('DD/MM/YYYY'),
            week: moment().format('w'),
            year: moment().format('YYYY'),
            startDateOfWeek: moment().startOf('isoweek').format("DD/MM/YYYY"),
            endDateOfWeek: moment().endOf('isoweek').format("DD/MM/YYYY"),
            sectionListData: [],
            flagLoad: true,
            hasCalendar: false,
        }
      }

    componentDidMount(){
        this.props.dispatch(rootActions.controlProgress(false));
        this.props.dispatch(calendarAction.getCalendar(this.state.startDateOfWeek, this.state.endDateOfWeek));
        
    }



    componentDidUpdate(){
        if(this.state.flagLoad == true){
            this.setState({
                flagLoad: false,
            });
            this.checkCalendar();
        }

    }

    convertDataSectionList(fetchData){
        sectionData = [];
        for(i = 0; i < fetchData.length; i++){
            title = this.convertDay(fetchData[i].dayOfWeek) + ', ' + fetchData[i].date;
            data = fetchData[i].scheduleBosses;
            object = {
                title: title,
                data: data
            }
            console.log('title:', title);
            sectionData.push(object);
        }
        console.log('sectionList:', JSON.stringify(sectionData));
        return  sectionData;   
    }

    checkCalendar(){
        if(this.props.calendar.get('hasCalendar')){
            console.log('data 2:', "message");
            fetchData = this.props.calendar.get('calendarData');
            
            if(fetchData != null){
                this.setState({
                    sectionListData : this.convertDataSectionList(fetchData),
                    hasCalendar: true,
                });
                return true;
            }else {
                this.setState({
                    hasCalendar: false,
                });
                return false;
            }

        }else{
            
            message = this.props.calendar.get('calendarError');
            console.log('message 2:', message);
            this.setState({
                hasCalendar: false,
            });
            // Alert.alert(
            //     'Thông báo',
            //         message,
            //     [
            //         {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            //         {text: 'OK', onPress: () => console.log('OK Pressed')},
            //     ],
            //     { cancelable: false }
            //     )
            //     return false;
        }
    }

    updateWeek(date, deltaDay){
        
        if(deltaDay > 0){
            newDate = moment(date, "DD/MM/YYYY").add(7, 'days');
        }else{
            newDate = moment(date, "DD/MM/YYYY").add(-7, 'days');
        }

        this.setState({
           flagLoad: true,
           date: newDate,
           week: moment(newDate).format('w'),
           year: moment(newDate).format('YYYY'),
           startDateOfWeek : moment(newDate).startOf('isoweek').format("DD/MM/YYYY"),
           endDateOfWeek: moment(newDate).endOf('isoweek').format("DD/MM/YYYY"),
        });
        // console.log('newDate', newDate);
        console.log('startDateOfWeek', this.state.startDateOfWeek);
        console.log('endDateOfWeek', this.state.endDateOfWeek);

        this.props.dispatch(calendarAction.getCalendar(this.state.startDateOfWeek, this.state.endDateOfWeek));
    }

    getWeekNumber(date) {
        var d = new Date(date);
        
        d.setHours(0,0,0);
        d.setDate(d.getDate()+4-(d.getDay()||7));
        return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
    }

    convertDay(day){
        switch(day){
            case 'MON':
                return 'Thứ 2';
            case 'TUE':
                return 'Thứ 3';
            case 'WED':
                return 'Thứ 4';
            case 'THU':
                return 'Thứ 5';
            case 'FRI':
                return 'Thứ 6';
            case 'SAT':
                return 'Thứ 7';
            case 'SUN':
                return 'Chủ nhật';
    
        }

    }

    render() {
      
      return (
        <View style = {{flex: 1, justifyContent: 'center'}}>
            <DefaultHeader myTitle= "Lịch công tác lãnh đạo" navigator= {this.props.navigation} />
            <View style={{flexDirection: 'row', padding: 10, justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={() =>this.updateWeek(this.state.date, -7)}>
                <Image source={require('../../image/ic_arrow_left.png')} style={{width: 30, height: 30, margin: 10}}/>
                </TouchableOpacity>

                <View style={{alignContent: 'center'}}>
                    {/* <Text style={{fontSize: 18, color: 'red', marginLeft: 16}}>{this.state.week}</Text> */}
                    <Text style={{fontSize: 18, color: 'red', marginLeft: 16}}>Tuần {this.state.week} năm {this.state.year}</Text>

                    <Text style={{fontSize: 18, color: 'black'}}>{this.state.startDateOfWeek} - {this.state.endDateOfWeek}</Text>
                </View>
                <TouchableOpacity onPress={() =>this.updateWeek(this.state.date, 7)}>
                <Image source={require('../../image/ic_arrow_right.png')} style={{width: 30, height: 30, margin: 10}}/>
                </TouchableOpacity>

            </View>
            
            <View style={{ flex: 1, marginTop: Platform.OS === 'ios' ? 34 : 0 }}>
                {this.state.hasCalendar? 
                    <SectionList
                    renderItem={({ item, index, section }) => {
                        return (<SectionListItem item={item} index={index} >
                        
                        </SectionListItem>);
                    }}
                    renderSectionHeader={({ section }) => {
                        return (<SectionHeader section={section} />);
                    }}
                    
                    sections={this.state.sectionListData}
                    // sections={sectionListData}
                    keyExtractor={(item, index) => item + index}
                    >

                    </SectionList>
                    :
                    <View style={{flex: 1, alignItems: 'center', marginTop: 50}}>
                        <Text style={itemStyles.textStyleRed}>
                            {strings.khongCoLichCongTac}
                        </Text>
                    </View>

                }
                
            </View>
            {this.renderProgress()}
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
    },

    textStyle1: {
        color: 'grey',
        padding: 10,
        paddingLeft: 10,
        fontSize: 14, 
    },

    textStyle2: {
        color: 'blue',
        paddingLeft: 10,
        fontSize: 14, 
    },
    textStyleRed: {
        fontSize: 16,
        marginLeft: 10,
        marginRight: 10,
        color: 'red',
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    },
    viewRowStyle1: {
        flexDirection: 'row',
        alignItems:'center',
        paddingLeft: 4,
    },
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
                <View style={{flexDirection: 'column', backgroundColor: 'limegreen', justifyContent:'center', alignItems: 'center'}}>
                <Text style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: 'white',
                      marginLeft: 20,
                      padding: 4
                  }}>Đ/C: {this.props.item.username}
                  </Text>
                  <Text style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: 'white',
                      marginLeft: 4,
                      marginRight: 10,
                      padding: 4
                  }}>{this.props.item.position}
                  </Text>
                </View>

                {/* {
                    for(i = 0; i < this.props.item.parameters.size; i++){
                        if(this.props.item.parameters[i].codeTime == 'SANG'){
                            
                        }else {

                        }
                    }
                } */}
                 {/* sáng  */}
                 <View style={{flexDirection: 'row',marginTop: 6}}>
                      <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: 'grey',
                            marginLeft: 10,
                            
                        }}>{strings.sang}
                      </Text>
                      <View>


                          <View style={itemStyles.viewRowStyle1}>
                              <Text style={itemStyles.textStyle1}>{strings.noiDung}</Text>
                              <Text style={itemStyles.textStyle2}>this.props.item.parameters[0].content</Text>
                          </View>

                          <View style={itemStyles.viewRowStyle1}>
                              <Text style={itemStyles.textStyle1}>{strings.thanhPhan}</Text>
                              <Text style={itemStyles.textStyle2}>this.props.item.parameters[0].participation</Text>
                          </View>

                          <View style={itemStyles.viewRowStyle1}>
                              <Text style={itemStyles.textStyle1}>{strings.diaDiem}</Text>
                              <Text style={itemStyles.textStyle2}>this.props.item.parameters[0].place</Text>
                          </View>
                      </View>

                </View>
                <View style={{backgroundColor: 'rgb(77,120, 140)', height: 1, margin: 4, marginLeft: 10,marginRight: 10}}/>

                {/* chiều  */}
                <View style={{flexDirection: 'row', marginTop: 6}}>
                      <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: 'grey',
                            marginLeft: 10,
                            
                        }}>{strings.chieu}
                      </Text>

                      <View>
                          <View style={itemStyles.viewRowStyle1}>
                              <Text style={itemStyles.textStyle1}>{strings.noiDung}</Text>
                              <Text style={itemStyles.textStyle2}>noiDung</Text>
                          </View>

                          <View style={itemStyles.viewRowStyle1}>
                              <Text style={itemStyles.textStyle1}>{strings.thanhPhan}</Text>
                              <Text style={itemStyles.textStyle2}>thanhPhan</Text>
                          </View>

                          <View style={itemStyles.viewRowStyle1}>
                              <Text style={itemStyles.textStyle1}>{strings.diaDiem}</Text>
                              <Text style={itemStyles.textStyle2}>diaDiem1</Text>
                          </View>
                      </View>
                      {/* <Text style={{
                        fontSize: 16,
                        marginLeft: 10,
                        marginRight: 10,
                        color: 'red',
                      }}>{this.props.item.lichChieu}
                      </Text> */}
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

function mapStateToProps(state){
    return {
    calendar: state.get('calendar'),
    root: state.get('root'),
    login: state.get('login')
    }
  }
  
export default connect(mapStateToProps)(LichCongTac)
  