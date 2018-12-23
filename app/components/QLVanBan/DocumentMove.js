import React, { Component } from 'react';
import { View, Text, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import HeaderChuyenXuLy from '../QLVanBan/HeaderChuyenXuLy';
import DateTimePicker from 'react-native-modal-datetime-picker';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import styles from '../../styles/styleQLVanBan';
import moment from 'moment';
import CheckBox from 'react-native-check-box'

const { height, width } = Dimensions.get('window');

export default class DocumentMove extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txtContent: "",
            isDateTimePickerVisible: false,
            txtDateTimePicker: "",
            isCheckedTuDongGiaoViec: false,
            isCheckedGuiSms: false
        }
    }

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        console.log('A date has been picked: ', date);
        this.setState({ txtDateTimePicker: moment(date).format('DD/MM/YYYY').toString() });
        this._hideDateTimePicker();
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <HeaderChuyenXuLy myTitle='Chuyển văn bản' navigator={this.props.navigation} type="2" />
                <View style={{ flex: 1, backgroundColor: "#E0EEEE", flexDirection: 'column' }}>
                    <View style={{ flex: 2, margin: 5 }}>
                        <TextInput
                            style={{ flex: 1, borderWidth: 1, borderRadius: 5 }}
                            multiline={true}
                            placeholder='Nội dung xử lý'
                            placeholderTextColor='#9C9C9C'
                            onChangeText={(text) => this.setState({ txtContent: text })}
                            value={this.state.txtContent}
                        />
                    </View>
                    <View style={{ flex: 1, margin: 5 }}>
                        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}
                            onPress={this._showDateTimePicker}
                        >
                            <TextInput
                                style={{ flex: 1, borderWidth: 1, borderRadius: 5, color: 'black' }}
                                placeholder='Hạn xử lý'
                                placeholderTextColor='#9C9C9C'
                                editable={false}
                                value={this.state.txtDateTimePicker}
                            />
                            <EvilIcons style={{ position: 'absolute', right: '1%' }} name="calendar" size={34} color="#79CDCD" />
                        </TouchableOpacity>
                        <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this._handleDatePicked}
                            onCancel={this._hideDateTimePicker}
                        />
                    </View>
                    <View style={{ flex: 1, margin: 5, flexDirection: 'row', justifyContent: 'space-around' }}>
                        <CheckBox
                            style={{ flex: 1, paddingLeft: 2 }}
                            onClick={() => {
                                this.setState({
                                    isCheckedTuDongGiaoViec: !this.state.isCheckedTuDongGiaoViec
                                })
                            }}
                            isChecked={this.state.isCheckedTuDongGiaoViec}
                            rightText={"Tự động giao việc"}
                            rightTextStyle={{ color: 'black', marginRight: '5%' }}
                        />
                        <CheckBox
                            style={{ flex: 1, paddingRight: 10 }}
                            onClick={() => {
                                this.setState({
                                    isCheckedGuiSms: !this.state.isCheckedGuiSms
                                })
                            }}
                            isChecked={this.state.isCheckedGuiSms}
                            leftText={"Gửi SMS"}
                            leftTextStyle={{ color: 'black', marginLeft: '40%' }}
                        />
                    </View>

                    <View style={{ flex: 8, margin: 5 }}>
                        <View style={{ flex: 1, flexDirection: 'column', marginBottom: 5 }}>
                            <View style={[styles.tableHeader, { backgroundColor: "#205AA7", justifyContent: 'flex-start', paddingLeft: 5 }]}>
                                <Text style={styles.titleStyle}>Xử lý chính</Text>
                            </View>
                            <View style={{ height: height * 0.07, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderBottomWidth: 1 }}>
                                <Text style={{ flex: 9, color: 'black' }}>Tập đoàn bưu chính Viễn thông</Text>
                                <TouchableOpacity style={{ flex: 1, }}>
                                    <EvilIcons style={{ flex: 1, fontWeight: 'bold', paddingTop: 10, paddingBottom: 10 }} name="close" size={30} color="black" />
                                </TouchableOpacity>
                            </View>

                        </View>

                    </View>
                </View>
            </View>

        );

    }
}