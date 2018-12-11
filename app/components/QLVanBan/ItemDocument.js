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

    gotoScreen(option, idDocument, title) {
        if (option == 1) {
            this.props.navigator.navigate('InfoExchange', {
                idDocument: idDocument,
                title: title
            });
        }
        else if (option == 2) {
            this.props.navigator.navigate('DocHistory');
        }
        // load data
}

    render() {
        const { data } = this.props.item;
        let dataStr= ["Đánh dấu", "Trao đổi thông tin", "Lịch sử xử lý"];
        var date = this.props.item.ngayNhan.split(" ");
         

        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }} onPress={this.props.gotoDocumentDetail}>
                    <View style={styles.left}>
                        <Text style={[styles.textTitle, { textAlign: 'center', color: '#B2001F' }]}>{date[1]}</Text>
                        <Text style={[styles.textColorBlack, { textAlign: 'center' }]}>{date[0]}</Text>
                    </View>
                    <View style={styles.center}>
                        <Text style={[styles.centerText, styles.textTitle]}>{ this.props.item.trichYeu }</Text>
                        <View style={styles.styleRow}>
                            <Text style={styles.textColor}>KH: </Text>
                            <Text style={styles.textColorBlack}>{this.props.item.soKihieu}</Text>
                        </View>
                        <View style={styles.styleRow}>
                            <Text style={styles.textColor}>CQBH:</Text>
                            <Text style={styles.textColorBlack}>{this.props.item.coQuanBanHanh}</Text>
                        </View>
                        <View style={styles.styleRow}>
                            <Text style={styles.textColor}>Ngày VB: </Text>
                            <Text style={{ color: '#0033FF' }}>{this.props.item.ngayVanBan}</Text>
                        </View>
                        <View style={styles.styleRow}>
                            <Text style={styles.textColor}>Độ khẩn: </Text>
                            <Text>{this.props.item.doKhan}</Text>
                        </View>
                        <View style={styles.styleRow}>
                            <Text style={styles.textColor}>Tệp tin đính kèm:</Text>
                            <MaterialIcons name="insert-link" size={23} color="black" />
                        </View>

                    </View>
                </View>
                <View style={styles.right}>
                    <ModalDropdown
                        options={dataStr}
                        dropdownStyle={{ width: 120, height: 142, backgroundColor: "#0033FF", }}
                        dropdownTextStyle={{ color: "#ffffff", fontSize: 15, backgroundColor: "#0033FF" }}
                        onSelect={ (idx, value) => this.gotoScreen(idx, this.props.item.id, this.props.item.trichYeu) }
                    >
                        <Icon name="dots-three-vertical" size={20} />
                    </ModalDropdown>
                </View>
            </View>
        );
    }
}
