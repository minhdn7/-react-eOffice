import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, TextInput, StyleSheet, Alert } from 'react-native';
import icLogo from '../../image/ic_logo.png';
import icMenu from '../../image/ic_menu.png';
import AntDesign from 'react-native-vector-icons/AntDesign';
const { height } = Dimensions.get('window');
import Color from 'react-native-material-color';
import stylesNdd from '../../styles/styleQLVanBan';
import strings from '../../resources/strings';
import ModalDropdown from 'react-native-modal-dropdown';

export default class HeaderLichSuXuLy extends Component {
    constructor(props) {
        super(props);

    }

    handleBackPress = () => {
        this.props.navigator.goBack(null);
        return true;
    }

    gotoScreen(idx){
        this.props.search(idx);
    }

    render() {
        const { wrapper, row1, textInput, iconStyle, titleStyle } = styles;
        let dataStr = [strings.choXuLy, strings.dangXuLy, strings.daXuLy];
        return (
            <View style={wrapper}>
                <View style={row1}>
                    <TouchableOpacity onPress={() => this.handleBackPress()}>
                        <AntDesign name="arrowleft" size={30} color="#ffffff" />
                    </TouchableOpacity>
                    <Text style={titleStyle}>{this.props.myTitle}</Text>

                    <TouchableOpacity >
                        <ModalDropdown
                            options={dataStr}
                            dropdownStyle={stylesNdd.dropdownStyle}
                            dropdownTextStyle={stylesNdd.dropdownTextStyle}
                            dropdownTextHighlightStyle={stylesNdd.dropdownTextHighlightStyle}
                            onSelect={(idx, value) => this.gotoScreen(idx)}
                        >
                            <AntDesign name="search1" size={30} color="#ffffff" />
                        </ModalDropdown>

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
    iconStyle: { width: 30, height: 30, marginRight: 16 },
    titleStyle: { color: '#FFF', fontSize: 20 }
});
