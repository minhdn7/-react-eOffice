import React, { Component } from 'react';
import { View, Text, TextInput, Dimensions, TouchableOpacity, ScrollView, FlatList, Platform, ToastAndroid } from 'react-native';
import HeaderChuyenXuLy from '../QLVanBan/HeaderChuyenXuLy';
import DateTimePicker from 'react-native-modal-datetime-picker';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import styles from '../../styles/styleQLVanBan';
import moment from 'moment';
import CheckBox from 'react-native-check-box';
import { connect } from "react-redux";
import * as chuyenXuLyAction from "../../actions/chuyenXuLy-actions";
import strings from "../../resources/strings";
import Toast from 'react-native-simple-toast';

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
            lstXlcInternal: [],
            lstPhInternal: [],
            lstXemInternal: [],
        }
    }

    componentDidMount() {
        let lstData = this.props.navigation.getParam('lstDataSelect', []);
        let lstDataInternal = this.props.navigation.getParam('lstDataSelectInternal', []);
        if (lstData && lstData.length) {
            let lstXuLyChinh = lstData.filter((item) => { return item.isCheckXLC });
            let lstPhoiHop = lstData.filter((item) => { return item.isCheckPH });
            let lstXem = lstData.filter((item) => { return item.isCheckXem });
            this.setState({
                lstData: lstData,
                lstXuLyChinh: lstXuLyChinh,
                lstPhoiHop: lstPhoiHop,
                lstXem: lstXem,
            })
            console.log("list data select: ", (lstPhoiHop.map((item) => { return item.id })).toString());
        }
        if (lstDataInternal && lstDataInternal.length) {
            let lstXuLyChinh = lstDataInternal.filter((item) => { return item.isCheckXLC });
            let lstPhoiHop = lstDataInternal.filter((item) => { return item.isCheckPH });
            let lstXem = lstDataInternal.filter((item) => { return item.isCheckXem });
            this.setState({
                lstXlcInternal: lstXuLyChinh,
                lstPhInternal: lstPhoiHop,
                lstXemInternal: lstXem,
            })
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

    _saveDataHandle = async () => {
        var idDocument = this.props.navigation.getParam('idDocument', "");
        let lstPhoiHop = "";
        let lstXem = "";
        let lstPhInternal = "";
        let lstXemInternal = "";
        let job = this.state.isCheckedTuDongGiaoViec ? 1 : 0;
        let kho = "Văn bản đến chờ xử lý";
        let idXlcInternal = "";
        let idXlc = "";
        let actionType = "0";
        let approvedValue = "";
        let sms = this.state.isCheckedGuiSms ? 1 : 0;
        let strAction = "Chuyển xử lý";
        let comment = this.state.txtContent ? this.state.txtContent.trim() : "";

        if (this.state.lstXuLyChinh && this.state.lstXuLyChinh.length) {
            idXlc = (this.state.lstXuLyChinh.map((item) => { return item.id })).toString();
        }
        if (this.state.lstXlcInternal && this.state.lstXlcInternal.length) {
            idXlcInternal = (this.state.lstXlcInternal.map((item) => { return item.id })).toString();
        }
        if (this.state.lstPhoiHop && this.state.lstPhoiHop.length) {
            lstPhoiHop = (this.state.lstPhoiHop.map((item) => { return item.id })).toString();
        }
        if (this.state.lstXem && this.state.lstXem.length) {
            lstXem = (this.state.lstXem.map((item) => { return item.id })).toString();
        }
        if (this.state.lstPhInternal && this.state.lstPhInternal.length) {
            lstPhInternal = (this.state.lstPhInternal.map((item) => { return item.id })).toString();
        }
        if (this.state.lstXemInternal && this.state.lstXemInternal.length) {
            lstXemInternal = (this.state.lstXemInternal.map((item) => { return item.id })).toString();
        }

        await this.props.dispatch(chuyenXuLyAction.documentMoveAction(actionType, approvedValue, lstPhInternal, lstPhoiHop,
            comment, idDocument, this.state.txtDateTimePicker, job, kho, idXlcInternal, idXlc, lstXemInternal,
            lstXem, sms, strAction));

        let result = this.props.chuyenXuLyReducer.get('response');
        if (result != null && result.toUpperCase() === "TRUE") {
            Toast.show(strings.chuyenVanBanThanhCong);

        } else {
            let message = this.props.chuyenXuLyReducer.get('error');
            console.log("loi: ", message);
            Toast.show(strings.messageServerError);

        }
    }

    _view = (data, type) => {
        if (data && data.length) {
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
    }

    render() {
        let viewXuLyChinh;
        let viewPhoiHop;
        let viewXem;
        if ((this.state.lstXuLyChinh && this.state.lstXuLyChinh.length) ||
            (this.state.lstXlcInternal && this.state.lstXlcInternal.length)) {
            viewXuLyChinh = <View style={{ marginBottom: 5 }}>
                <View style={[styles.tableHeader, { backgroundColor: "#205AA7", justifyContent: 'flex-start', paddingLeft: 5 }]}>
                    <Text style={styles.titleStyle}>{strings.xuLyChinh}</Text>
                </View>
                {this._view(this.state.lstXuLyChinh, 1)}
                {this._view(this.state.lstXlcInternal, 1)}
            </View>
        } else {
            viewXuLyChinh = null;
        }

        if ((this.state.lstPhoiHop && this.state.lstPhoiHop.length) ||
            (this.state.lstPhInternal && this.state.lstPhInternal.length)) {
            viewPhoiHop = <View style={{ marginBottom: 5 }}>
                <View style={[styles.tableHeader, { backgroundColor: "#205AA7", justifyContent: 'flex-start', paddingLeft: 5 }]}>
                    <Text style={styles.titleStyle}>{strings.phoiHop}</Text>
                </View>
                {this._view(this.state.lstPhoiHop, 2)}
                {this._view(this.state.lstPhInternal, 2)}
            </View>
        } else {
            viewPhoiHop = null;
        }

        if ((this.state.lstXem && this.state.lstXem.length) ||
            (this.state.lstXemInternal && this.state.lstXemInternal.length)) {
            viewXem = <View style={{ marginBottom: 5 }}>
                <View style={[styles.tableHeader, { backgroundColor: "#205AA7", justifyContent: 'flex-start', paddingLeft: 5 }]}>
                    <Text style={styles.titleStyle}>{strings.xemDeBiet}</Text>
                </View>
                {this._view(this.state.lstXem, 3)}
                {this._view(this.state.lstXemInternal, 3)}
            </View>
        } else {
            viewXem = null;
        }
        return (
            <View style={{ flex: 1 }}>
                <HeaderChuyenXuLy myTitle='Chuyển văn bản' navigator={this.props.navigation} type="2" saveHandle={this._saveDataHandle} />
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