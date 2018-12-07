import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Picker, Text, Dimensions } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import Icon from 'react-native-vector-icons/Entypo';
import HeaderChuyenXuLy from '../QLVanBan/HeaderChuyenXuLy';
import styles from '../../styles/styleQLVanBan';

const { height, width } = Dimensions.get('window');

export default class ChuyenXuLy extends Component {

    handleChonTheoNhomDonVi = () => {
        alert("Chọn theo nhóm đơn vị");
    }

    handleChonTheoNhomCaNhan = () => {
        alert("Chọn theo nhóm cá nhâ");
    }

    gotoScreen(value) {
        alert(value);
}


    state = {}
    render() {
        let dataStr = ["Đánh dấu", "Trao đổi  thông tin", "Lịch sử xử lýyyyyyy yyyyyyyyyyyy yyyyyyyyyyyyyyy yyyyyyyyyyyyyy yyyyyyyyyyyyyy"];
        return (
            <View style={{ flex: 1 }}>
                <HeaderChuyenXuLy myTitle='Chọn người nhận văn bản' navigator={this.props.navigation} />

                <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#D7D7D7' }}>
                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 5, marginLeft: 5, marginRight: 5 }}>
                        <TextInput
                            style={{ flex: 1, backgroundColor: '#ffffff', height: 40, marginRight: 5 }}
                            placeholder="Họ tên"
                        />
                        <View style={{ flex: 1, backgroundColor: '#ffffff', height: 40, }}>
                            <ModalDropdown
                                options={dataStr}
                                dropdownStyle={{ backgroundColor: "#ffffff", color: 'black', fontSize: 16, }}
                                dropdownTextStyle={{ color: "black", fontSize: 16, backgroundColor: "#ffffff", width: width*0.9 }}
                                onSelect={ (idx, value) => this.gotoScreen(value) }
                            >
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 7 }}>
                                    <Text style={{ color: 'black', fontSize: 16 }}>--Chọn đơn vị--</Text>
                                    <Icon name="chevron-small-down" size={23} color='black' />
                                </View>
                            </ModalDropdown>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 5, marginLeft: 5, marginRight: 5 }}>
                        <View style={{ width: width*0.5 }}>
                            <TouchableOpacity
                                style={[styles.btn, { backgroundColor: '#205AA7', }]}
                                onPress={() => this.handleChonTheoNhomDonVi()}
                            >
                                <Text style={styles.btnText}>Chọn theo nhóm đơn vị</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: width*0.5 }}>
                            <TouchableOpacity
                                style={[styles.btn, { backgroundColor: '#205AA7', marginLeft: 2, marginRight: 10}]}
                                onPress={() => this.handleChonTheoNhomCaNhan()}
                            >
                                <Text style={styles.btnText}>Chọn theo nhóm cá nhân</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 5 }}>

                </View>
            </View>

        );
    }
}