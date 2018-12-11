import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, TextInput, StyleSheet, Alert } from 'react-native';
import icLogo from '../../image/ic_logo.png';
import icMenu from '../../image/ic_menu.png';
import AntDesign from 'react-native-vector-icons/AntDesign';
const { height } = Dimensions.get('window');
import Color from 'react-native-material-color';

export default class HeaderChuyenXuLy extends Component {
    constructor(props){
        super(props);
                
    }

    handleBackPress = () => {
        this.props.navigator.goBack(null);
        return true;
      }

    save =() =>{
        alert("Save");
    }

    render() {
        const { wrapper, row1, textInput, iconStyle, titleStyle } = styles;
        return (
            <View style={wrapper}>
                <View style={row1}>
                    <TouchableOpacity onPress={() => this.handleBackPress()}>
                        <AntDesign name="arrowleft" size={30} color="#ffffff" />
                    </TouchableOpacity>
                    <Text style={titleStyle}>{this.props.myTitle}</Text>

                    <TouchableOpacity onPress={() => this.save()}>
                        <AntDesign name="check" size={30} color="#ffffff" />
                    </TouchableOpacity>

                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: { height: 60, backgroundColor: Color.BLUE[900], padding: 10, justifyContent: 'space-around' },
    row1: { 
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textInput: { height: height / 22, backgroundColor: '#FFF', paddingLeft: 10 },
    iconStyle: { width: 30, height: 30, marginRight: 16},
    titleStyle: { color:'#FFF', fontSize:20 }
});