import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import styles from '../../styles/styleQLVanBan';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

export default class Header extends Component {
    render() {
        const { wrapper, row1, textInput, iconStyle, titleStyle } = styles;
        return (
            <View style={wrapper}>
                <View style={row1}>
                    <TouchableOpacity onPress={this.props.onOpen}>
                        <MaterialIcons name="menu" size={40} color="#ffffff" />
                    </TouchableOpacity>
                    <Text style={titleStyle}>Văn bản đến</Text>
                    <EvilIcons name="bell" size={40} color="#ffffff" />
                </View>
                <View style={styles.searchSection}  >
                    <EvilIcons style={styles.searchIcon} name="search" size={20} color="#000" />
                    <TextInput
                        style={textInput}
                        underlineColorAndroid='transparent'
                        placeholder='Tìm kiếm'
                    />
                </View>
            </View>
        );
    }
}
