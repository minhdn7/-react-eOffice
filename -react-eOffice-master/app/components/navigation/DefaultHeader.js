import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, TextInput, StyleSheet, Alert, BackHandler } from 'react-native';
import { Navigation } from 'react-native-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const { height } = Dimensions.get('window');
import Color from 'react-native-material-color';
import icBack from '../../image/back.png';

export default class DefaultHeader extends React.Component {
    constructor(props){
        super(props);
    }

    handleBackPress = () => {
        this.props.navigator.goBack(null);
        return true;
      }

    render() {
        const { wrapper, row1, textInput, iconStyle, titleStyle } = styles;
        return (
            <View style={wrapper}>
                <View style={row1}>
                    <TouchableOpacity onPress={() => this.handleBackPress()}>
                        <Image source={icBack} style={iconStyle}/>
                    </TouchableOpacity>
                    <View style={{flex: 1, alignItems: "center"}}>
                        <Text style={titleStyle}>{this.props.myTitle}</Text>
                    </View>
                    
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
    iconStyle: { width: 20, height: 20 },
    titleStyle: { color:'#FFF', fontSize:20, alignItems: "center" }
});
