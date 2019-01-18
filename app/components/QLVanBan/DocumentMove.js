import React, { Component } from 'react';
import { View, Text, TextInput, Dimensions, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import HeaderChuyenXuLy from '../QLVanBan/HeaderChuyenXuLy';
import DateTimePicker from 'react-native-modal-datetime-picker';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import styles from '../../styles/styleQLVanBan';
import moment from 'moment';
import CheckBox from 'react-native-check-box';
import { connect } from "react-redux";
import * as chuyenXuLyAction from "../../actions/chuyenXuLy-actions";
import strings from "../../resources/strings";

const { height, width } = Dimensions.get('window');

//POST http://14.225.6.6/qlvb/api/incommingdocument/promulgatedocument/
//{"actionType":"0","approvedValue":"","coevalInternal":"","coevalProcess":"U17,U18","comment":"noi dung",
//"docId":"2032621","hanXuLy":"18/01/2019","job":1,"kho":"Văn bản đến chờ xử lý","primaryInternal":"",
//"primaryProcess":"U16","referInternal":"","referProcess":"U1","sms":0,"strAction":"Chuyển xử lý"}
// back ve van ban den co xu ly


export class DocumentMove extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txtContent: "",
            isDateTimePickerVisible: false,
            txtDateTimePicker: "",
            isCheckedTuDongGiaoViec: false,
            isCheckedGuiSms: false,
            lstData: [],
            lstXuLyChinh: [],
            lstPhoiHop: [],
            lstXem: [],
        }
    }

    componentDidMount() {
        if (this.props.chuyenXuLyReducer.get('lstDataSelect')) {
            let lstData = this.props.chuyenXuLyReducer.get('lstDataSelect')
            let lstXuLyChinh = lstData.filter((item) => { return item.isCheckXLC });
            let lstPhoiHop = lstData.filter((item) => { return item.isCheckPH });
            let lstXem = lstData.filter((item) => { return item.isCheckXem });
            this.setState({
                lstData: lstData,
                lstXuLyChinh: lstXuLyChinh,
                lstPhoiHop: lstPhoiHop,
                lstXem: lstXem,
            })
            console.log("list data select: ", this.state.lstData);
        }
    }

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        console.log('A date has been picked: ', date);
        this.setState({ txtDateTimePicker: moment(date).format('DD/MM/YYYY').toString() });
        this._hideDateTimePicker();
    };

    _removeItemHandle = (id, type) => {
        if (id != null && id != "" && id != "undefined") {
            switch (type) {
                case 1:// xử lý chính
                    var lstXuLyChinh = this.state.lstXuLyChinh;
                    if (lstXuLyChinh && lstXuLyChinh.length) {
                        this.setState({
                            lstXuLyChinh: lstXuLyChinh.filter((item) => {
                                return item.id !== id
                            })
                        });
                    }
                    break;
                case 2:// phối hợp
                    var lstPhoiHop = this.state.lstPhoiHop;
                    if (lstPhoiHop && lstPhoiHop.length) {
                        this.setState({
                            lstPhoiHop: lstPhoiHop.filter((item) => {
                                return item.id !== id
                            })
                        });
                    }
                    break;
                case 3://xem để biết
                    var lstXem = this.state.lstXem;
                    if (lstXem && lstXem.length) {
                        this.setState({
                            lstXem: lstXem.filter((item) => {
                                return item.id !== id
                            })
                        });
                    }
                    break;
                default: break;
            }
        }
    }

    _view = (data, type) => {
        
        return data.map((item) => {
            return (
                <View style={{ height: height * 0.07, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderBottomWidth: 1 }} key={item.id}>
                    <Text style={{ flex: 9, color: 'black' }}>{item.name}</Text>
                    <TouchableOpacity
                        style={{ flex: 1, }}
                        onPress={() => this._removeItemHandle(item.id, type)}
                    >
                        <EvilIcons style={{ flex: 1, fontWeight: 'bold', paddingTop: 10, paddingBottom: 10 }} name="close" size={30} color="black" />
                    </TouchableOpacity>
                </View>
            )
        })
    }

    render() {
        let viewXuLyChinh;
        let viewPhoiHop;
        let viewXem;
        if (this.state.lstXuLyChinh && this.state.lstXuLyChinh.length) {
            viewXuLyChinh = <View style={{ marginBottom: 5 }}>
                <View style={[styles.tableHeader, { backgroundColor: "#205AA7", justifyContent: 'flex-start', paddingLeft: 5 }]}>
                    <Text style={styles.titleStyle}>{strings.xuLyChinh}</Text>
                </View>
                {this._view(this.state.lstXuLyChinh, 1)}
            </View>
        } else {
            viewXuLyChinh = null;
        }

        if (this.state.lstPhoiHop && this.state.lstPhoiHop.length) {
            viewPhoiHop = <View style={{ marginBottom: 5 }}>
                <View style={[styles.tableHeader, { backgroundColor: "#205AA7", justifyContent: 'flex-start', paddingLeft: 5 }]}>
                    <Text style={styles.titleStyle}>{strings.phoiHop}</Text>
                </View>
                {this._view(this.state.lstPhoiHop, 2)}
            </View>
        } else {
            viewPhoiHop = null;
        }

        if (this.state.lstXem && this.state.lstXem.length) {
            viewXem = <View style={{ marginBottom: 5 }}>
                <View style={[styles.tableHeader, { backgroundColor: "#205AA7", justifyContent: 'flex-start', paddingLeft: 5 }]}>
                    <Text style={styles.titleStyle}>{strings.xemDeBiet}</Text>
                </View>
                {this._view(this.state.lstXem, 3)}
            </View>
        } else {
            viewXem = null;
        }
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
                        <ScrollView style={{ flex: 1 }}>
                            <View style={{ flex: 1, flexDirection: 'column', marginBottom: 5 }}>
                                {viewXuLyChinh}
                                {viewPhoiHop}
                                {viewXem}
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>

        );

    }
}

const mapStateToProps = (state) => ({
    chuyenXuLyReducer: state.get('chuyenXuLyReducer'),
});

export default connect(mapStateToProps)(DocumentMove)  