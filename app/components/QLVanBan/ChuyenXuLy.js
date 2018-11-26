import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Picker, Text } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import Icon from 'react-native-vector-icons/Entypo';

export default class extends Component {
    
    state = {}
    render() {
        let dataStr = ["Đánh dấu", "Trao đổi  thông tin", "Lịch sử xử lý"];
        return (
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#D7D7D7' }}>
                <View style={{ flex: 1, flexDirection: 'row', marginTop: 5, marginLeft: 5, marginRight: 5 }}>
                    <TextInput
                        style={{ flex: 1, backgroundColor: '#ffffff', height: 40, marginRight: 5 }}
                        placeholder="Họ tên"
                    />
                    <View style={{ flex: 1, backgroundColor: '#ffffff', height: 40, }}>
                        <ModalDropdown
                            options={dataStr}
                            dropdownStyle={{ backgroundColor: "#ffffff", color: 'black', fontSize: 16 }}
                            dropdownTextStyle={{ color: "black", fontSize: 16, backgroundColor: "#ffffff" }}
                        >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 7 }}>
                                <Text style={{ color: 'black', fontSize: 16 }}>--Chọn đơn vị--</Text>
                                <Icon name="chevron-small-down" size={23} color='black' />
                            </View>
                        </ModalDropdown>
                    </View>

                </View>
                <View style={{ flex: 1, marginTop: 5, marginLeft: 5, marginRight: 5 }}>
                    <TouchableOpacity style={{ flex: 1, backgroundColor: '#205AA7', borderRadius: 4, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#ffffff' }}>Chọn theo nhóm cá nhân</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        );
    }
}