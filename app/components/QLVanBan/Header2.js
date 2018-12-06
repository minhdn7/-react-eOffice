import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import styles from '../../styles/styleQLVanBan';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import icBack from '../../image/back.png';

export default class Header extends React.Component {
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
                        <Image source={icBack} style={styles.iconStyle}/>
                    </TouchableOpacity>
                    <Text style={titleStyle}>{this.props.myTitle}</Text>
                    <EvilIcons name="bell" size={40} color="#ffffff" />
                </View>
                {/* <View style={styles.searchSection}  >
                    <EvilIcons style={styles.searchIcon} name="search" size={20} color="#000" />
                    <TextInput
                        style={textInput}
                        underlineColorAndroid='transparent'
                        placeholder='Tìm kiếm'
                    />
                </View> */}
            </View>
        );
    }
}


