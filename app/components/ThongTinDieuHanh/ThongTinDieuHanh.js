import React, {Component} from "react";
import {Image, Text, View, Alert, TouchableOpacity, StyleSheet, TextInput, Input, FlatList, TouchableWithoutFeedback} from "react-native";
import {Container, Content, Spinner, Button} from "native-base";

import Icon from 'react-native-vector-icons/MaterialIcons';
import DefaultHeader from '../navigation/DefaultHeader';
import flatListData from '../../data/flatListData';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Moment from 'moment';

export default class ThongTinDieuHanh extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isDateTimePickerVisible: false,
          isStartDate: true,
          startDate: 'Từ ngày',
          endDate: 'Đến ngày',
        };
      }
      openMenu(){
        // this.props.navigation.openDrawer();
        this.props.menu.openDrawer();
      }
      
      openDetailControls= (item) =>{
        this.props.navigation.navigate('ChiTietDieuHanh');
      }
      _showDateTimePicker = (isType) => {
        this.setState({ isDateTimePickerVisible: true});
        this.setState({ isStartDate: isType});
      }

      _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
    
      _handleDatePicked = (date) => {
        console.log('A date has been picked: ', date);
        this._hideDateTimePicker();
        sDate = JSON.stringify(date).replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').split('T');
        arrayDate = sDate[0].split('-');
        formatDate = arrayDate[2] + "/" + arrayDate[1] + "/" + arrayDate[0];

        if(this.state.isStartDate){
          this.setState({ startDate: formatDate})
        }else{
          this.setState({endDate: formatDate})
        }
      };

    render() {
      
      return (
        <View style = {{flex: 1}}>
            <DefaultHeader myTitle= 'Thông tin điều hành' navigator= {this.props.navigation} />
            <View style={{flex: 1, alignItems:'center'}}>

                <View style={{height: 40, flexDirection:'row'}}>
                    <TouchableOpacity style={itemStyles.textStyle} 
                        onPress={() =>this._showDateTimePicker(true)}>
                        <Text style={{ flex: 9}} >{this.state.startDate}</Text>
                        <Icon
                          name='3d-rotation'
                          color='#00aced'
                          style={{ flex: 1}} />
                    </TouchableOpacity>
                    <TouchableOpacity style={itemStyles.textStyle} 
                        onPress={() =>this._showDateTimePicker(false)}>
                        <Text style={{ flex: 9}}>{this.state.endDate}</Text>
                        <Icon
                          name='3d-rotation'
                          color='#00aced'
                          style={{ flex: 1}}
                           />
                    </TouchableOpacity>
                    <DateTimePicker
                      isVisible={this.state.isDateTimePickerVisible}
                      onConfirm={this._handleDatePicked}
                      onCancel={this._hideDateTimePicker}
                    />
                </View>
                <View style={{height: 40, flexDirection:'row', margin: 4}}>
                <TextInput 
                          style={{flex: 1,
                          borderRadius: 4,
                          borderWidth: 1,
                          padding: 4,}}
                          placeholder="Tiêu đề"/>
                </View>


                <View style={{height: 40, flexDirection:'row'}}>
                    <Button style={[itemStyles.buttonStyle, {backgroundColor:'royalblue'}]}>
                        <Text style={{color: 'white'}}>Tìm kiếm</Text>
                    </Button>
                    <Button style={[itemStyles.buttonStyle, {backgroundColor:'mediumseagreen'}]} onPress={() => this.props.navigation.navigate('SendThongTin')}>
                        <Text style={{color: 'white'}}>Thêm mới</Text>
                    </Button>
                </View>
                <View style={{flex: 1, flexDirection:'row', margin: 4, marginTop: 16}}>
                    <FlatList 
                    data={flatListData}
                    keyExtractor={(item, index) => index.toString()}
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
                  <Text style={{flex: 3}}>Ngày nhận: </Text>
                  <Text style={{flex: 7, color: 'red'}}>23/10/2018 10:23</Text>              
                </View>
                <View style={{
                        flex: 1,
                        flexDirection:'row',                
                        backgroundColor: 'white'
                }}>            
                  <Text style={{flex: 3}}>Người gửi: </Text>
                  <Text style={{flex: 7}}>{this.props.item.name}</Text>              
                </View>
                <View style={{
                        flex: 1,
                        flexDirection:'row',                
                        backgroundColor: 'white'
                }}>            
                  <Text tyle={{flex: 3}}>Tệp đính kèm: </Text>
                  <Text style={{flex: 7}}></Text>              
                </View>
                <View style={{
                    height: 2,
                    backgroundColor:'gainsboro'                            
                }}>
            
                </View>
          </View>
        );
    }
  }
  