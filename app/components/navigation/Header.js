import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, TextInput, StyleSheet } from 'react-native';
import icLogo from '../../image/ic_logo.png';
import icMenu from '../../image/ic_menu.png';
import icNotification from '../../image/ic_notifi.png';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const { height } = Dimensions.get('window');
import Color from 'react-native-material-color';

export default class Header extends Component {
    constructor(props){
        super(props);

    }



    render() {
        const { wrapper, row1, textInput, iconStyle, titleStyle } = styles;
        return (
            <View style={wrapper}>
                <View style={row1}>
                    <TouchableOpacity onPress={this.props.onOpen}>
                        <Image source={icMenu} style={iconStyle}/>
                    </TouchableOpacity>
                    <Text style={titleStyle}>{this.props.myTitle}</Text>
                    <Image source={icNotification} style={iconStyle}/>
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
    iconStyle: { width: 30, height: 30 },
    titleStyle: { color:'#FFF', fontSize:20 }
});
