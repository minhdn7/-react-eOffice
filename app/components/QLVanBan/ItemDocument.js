import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import styles from '../../styles/styleQLVanBan';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Entypo';
import ModalDropdown from 'react-native-modal-dropdown';

export default class ItemDocument extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    gotoScreen(option) {
        if (option == 1) {
            this.props.navigator.navigate('DocHistory');
        }
        else if (option == 2) {
            this.props.navigator.navigate('InfoExchange');
        }
        // load data
}

    render() {
        const { name } = this.props.data;
        let dataStr= ["Đánh dấu", "Trao đổi  thông tin", "Lịch sử xử lý"];
        return (
            <View style={styles.container}>
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={this.props.gotoDocumentDetail}>
                    <View style={styles.left}>
                        <Text style={[styles.textTitle, { textAlign: 'center', color: '#B2001F' }]}>15:23</Text>
                        <Text style={[styles.textColorBlack, { textAlign: 'center' }]}>01/01/2018</Text>
                    </View>
                    <View style={styles.center}>
                        <Text style={[styles.centerText, styles.textTitle]}>{ name }</Text>
                        <View style={styles.styleRow}>
                            <Text style={styles.textColor}>KH: </Text>
                            <Text style={styles.textColorBlack}>4/2018-CV</Text>
                        </View>
                        <View style={styles.styleRow}>
                            <Text style={styles.textColor}>CQBH:</Text>
                            <Text style={styles.textColorBlack}>4/2018-CV</Text>
                        </View>
                        <View style={styles.styleRow}>
                            <Text style={styles.textColor}>Ngày VB: </Text>
                            <Text style={{ color: '#0033FF' }}>17/10/2018</Text>
                        </View>
                        <View style={styles.styleRow}>
                            <Text style={styles.textColor}>Độ khẩn: </Text>
                            <Text>Hỏa tốc</Text>
                        </View>
                        <View style={styles.styleRow}>
                            <Text style={styles.textColor}>Tệp tin đính kèm:</Text>
                            <MaterialIcons name="insert-link" size={23} color="black" />
                        </View>

                    </View>
                </TouchableOpacity>
                <View style={styles.right}>
                    <ModalDropdown
                        options={dataStr}
                        dropdownStyle={{ width: 120, height: 142, backgroundColor: "#0033FF", }}
                        dropdownTextStyle={{ color: "#ffffff", fontSize: 15, backgroundColor: "#0033FF" }}
                        onSelect={ (idx, value) => this.gotoScreen(idx) }
                    >
                        <Icon name="dots-three-vertical" size={20} />
                    </ModalDropdown>
                </View>
            </View>
        );
    }
}
