import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Picker, Text, Dimensions, ScrollView } from 'react-native';
import { connect } from "react-redux";
import ModalDropdown from 'react-native-modal-dropdown';
import AntDesign from "react-native-vector-icons/AntDesign"
import Octicons from "react-native-vector-icons/Octicons";
import Icon from 'react-native-vector-icons/Entypo';
import HeaderChuyenXuLy from '../QLVanBan/HeaderChuyenXuLy';

import styles from '../../styles/styleQLVanBan';
import * as chuyenXuLyAction from "../../actions/chuyenXuLy-actions";
import * as rootActions from "../../actions/root-actions";
import TreeSelectCustom from '../QLVanBan/TreeSelectCustom';
import { convertJsonToTreeMap, shortText } from '../../utils/Utils';
import ContactData from "../../data/ContactData";
import strings from "../../resources/strings";
import { getIdByUnitAndUser } from '../../utils/Utils';

const { height, width } = Dimensions.get('window');

export class ChuyenXuLy extends Component {
    constructor() {
        super();
        this.state = {
            flagThugon: true,
            textThugon: "Thu gọn",
            iconThugon: "arrowup",
            lstUnit: [],
            txtUnit: "",
            txtInputName: "",
            lstUserConcurentSend: [],
            lstInternal: [],
            actionType: "",
            txtNameUnitSelect: strings.chonDonVi,
        }
    }

    selectGroupByUnitAndUser = (type) => {
        this.setState({
            actionType: type,
        });

        this.props.navigation.navigate('SelectGroupUnitAndUser', {
            actionType: type,
            onGoBack: this.refresh,
        });
    }



    handleShowHide = () => {
        if (this.state.flagThugon) {
            this.setState({
                flagThugon: false,
                textThugon: "Nhấn vào để chọn người nhận",
                iconThugon: "arrowdown"
            });
        } else {
            this.setState({
                flagThugon: true,
                textThugon: "Thu gọn",
                iconThugon: "arrowup"
            });
        }

    }

    selectUnitHandle = (index) => {
        let item = this.state.lstUnit[index - 1];
        if (item) {
            let id = item.id;
            if (id.indexOf('U') !== -1) {
                id = id.substring(1, id.length);
            }
            this.setState({
                txtNameUnitSelect: shortText(item.name, 5),
                txtUnit: id,
            });
            this.props.dispatch(chuyenXuLyAction.getUserConcurrentSendAction(id, "", this.state.txtInputName));
        } else {
            this.setState({
                txtNameUnitSelect: strings.chonDonVi,
            });
        }
    }

    _onChangeTextHandle = (event) => {
        const {name, type, value} = event.nativeEvent;
        console.log("test event.nativeEvent: ", value);
        this.setState({
            txtInputName: value,
        });
        setTimeout(
            () => {
                alert("test " + value);
                this.props.dispatch(chuyenXuLyAction.getUserConcurrentSendAction(this.state.txtUnit, "", value ? value.trim() : ""));
            },
            3000
        )
    }

    componentWillMount() {
        //this.props.dispatch(chuyenXuLyAction.resetTreeDataAction());
    }

    componentDidMount() {
        //var lstData = convertJsonToTreeMap(ContactData);
        //var lstData = convertJsonToTreeMap(this.props.login.get('dataContact'));
        var idDocument = this.props.navigation.getParam('idDocument', 'NO-ID');

        this.props.dispatch(chuyenXuLyAction.getListUnitAction());
        this.props.dispatch(chuyenXuLyAction.getUserConcurrentSendAction("", "", ""));
        this.props.dispatch(chuyenXuLyAction.getListInternalAction(idDocument));
        //this.props.dispatch(chuyenXuLyAction.setListTreeDataAction(lstData));
        //this.lstUserConcurentSend = this.props.login.get('dataContact');
    }

    componentWillReceiveProps() {

        if (this.props.chuyenXuLyReducer.get('listUnit')) {
            this.setState({
                lstUnit: this.props.chuyenXuLyReducer.get('listUnit'),
            });
        }
        // let lstData = this.props.chuyenXuLyReducer.get('lstTreeData');
        // if(!lstData || ! lstData.length){
        //     lstData = this.props.chuyenXuLyReducer.get('listUserConcurrentSend');
        // }
        this.setState({
            lstUserConcurentSend: this.props.chuyenXuLyReducer.get('listUserConcurrentSend'),
            lstInternal: this.props.chuyenXuLyReducer.get('listInternal'),
        });
    }

    componentWillUnmount() {
        this.props.dispatch(chuyenXuLyAction.resetTreeDataAction());
    }

    saveHandle = (check) => {
        var lstDataSelect = this.props.chuyenXuLyReducer.get('lstDataSelect');
        if (lstDataSelect && lstDataSelect.length) {
            this.props.navigation.navigate('DocumentMove');
        } else {
            alert(strings.thongBaoChuaChonNguoiNhanVanBan);
        }
    }

    refresh = async () => {
        let dataSelectByUnitOrUser = this.props.chuyenXuLyReducer.get('lstDataSelectByUnitOrUser');
        let data = dataSelectByUnitOrUser.filter(item => item.isCheckXLC || item.isCheckPH || item.isCheckXem);
        let lstData = this.props.chuyenXuLyReducer.get("listUserConcurrentSend");
        if (data && data.length) {
            for (let i = 0; i < data.length; i++) {
                await this.findByIdAndSwap(lstData, data[i]);
            }
        }
        this.props.dispatch(chuyenXuLyAction.getUserConcurrentSendAction(lstData));
    }

    findByIdAndSwap = (data, item) => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == getIdByUnitAndUser(item.id, this.state.actionType)) {
                data[i].isCheckXLC = item.isCheckXLC;
                data[i].isCheckPH = item.isCheckPH;
                data[i].isCheckXem = item.isCheckXem;
                this.addItemToListDataSelect(data[i]);
                return;
            } else if (data[i].children && data[i].children.length) {
                this.findByIdAndSwap(data[i].children, item);
            }
        }
    }

    addItemToListDataSelect = (item) => {
        let lstDataSelect = [];
        lstDataSelect = this.props.chuyenXuLyReducer.get('lstDataSelect');
        if (lstDataSelect && lstDataSelect.length) {
            for (let i = 0; i < lstDataSelect.length; i++) {
                if (lstDataSelect[i].id == item.id) {
                    lstDataSelect[i] = item;
                    //lstDataSelect[i].children = [];
                    this.props.dispatch(chuyenXuLyAction.setListDataSelectAction(lstDataSelect));
                    return;
                }
            }
        }
        lstDataSelect.push(item);
        this.props.dispatch(chuyenXuLyAction.setListDataSelectAction(lstDataSelect));
    }

    state = {}
    render() {
        let dataStr = [];
        let viewTree;
        let viewDonVi;

        if (this.state.lstUnit != null && this.state.lstUnit.length != 0) {
            dataStr = this.state.lstUnit.map((item) => { return item.name });
            dataStr.splice(0, 0, strings.chonDonVi);
        }

        if (this.state.lstUserConcurentSend && this.state.lstUserConcurentSend.length) {
            viewTree = <TreeSelectCustom
                data={this.state.lstUserConcurentSend}
                isOpen={false}
            //handleRadioButtonClick={this.handleRadioButtonClick}
            // onClick={this._onClick}
            // onClickLeaf={this._onClickLeaf}
            />
        } else {
            viewTree = <Text>{strings.khongCoDuLieu}</Text>
        }

        if (this.state.lstInternal && this.state.lstInternal.length) {
            viewDonVi = <TreeSelectCustom
                data={this.state.lstInternal}
                isOpen
            //handleRadioButtonClick={this.handleRadioButtonClick}
            // onClick={this._onClick}
            // onClickLeaf={this._onClickLeaf}
            />
        } else {
            viewDonVi = <Text>{strings.khongCoDuLieu}</Text>;
        }


        return (
            <View style={{ flex: 1 }}>
                <HeaderChuyenXuLy myTitle={strings.chonNguoiNhanVanBan} saveHandle={this.saveHandle} />

                <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#D7D7D7' }}>
                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 5, marginLeft: 5, marginRight: 5 }}>
                        <TextInput
                            style={{ flex: 1, backgroundColor: '#ffffff', height: 40, marginRight: 5 }}
                            placeholder="Họ tên"
                            value={this.state.txtInputName}
                            //onChangeText={text => this.setState({ txtInputName: text })}
                            onChange={() => this._onChangeTextHandle}
                        />
                        <View style={{ flex: 1, backgroundColor: '#ffffff', height: 40, }}>
                            <ModalDropdown
                                options={dataStr}
                                style={{ flex: 1 }}
                                dropdownStyle={{ backgroundColor: "#ffffff", color: 'black', fontSize: 16, }}
                                dropdownTextStyle={{ flex: 1, color: "black", fontSize: 16, backgroundColor: "#ffffff", width: width * 0.9 }}
                                onSelect={(idx, value) => this.selectUnitHandle(idx, value)}
                            >
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 7 }}>
                                    <Text style={{ color: 'black', fontSize: 14 }}>{this.state.txtNameUnitSelect}</Text>
                                    <Icon name="chevron-small-down" size={23} color='black' />
                                </View>
                            </ModalDropdown>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 5, marginLeft: 5, marginRight: 5 }}>
                        <View style={{ width: width * 0.5 }}>
                            <TouchableOpacity
                                style={[styles.btn, { backgroundColor: '#205AA7', }]}
                                onPress={() => this.selectGroupByUnitAndUser(1)}
                            >
                                <Text style={styles.btnText}>Chọn theo nhóm đơn vị</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: width * 0.5 }}>
                            <TouchableOpacity
                                style={[styles.btn, { backgroundColor: '#205AA7', marginLeft: 2, marginRight: 10 }]}
                                onPress={() => this.selectGroupByUnitAndUser(2)}
                            >
                                <Text style={styles.btnText}>Chọn theo nhóm cá nhân</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 5, margin: 5 }}>
                    <ScrollView style={{ flex: 1 }}>
                        {/* <View style={{ flex: 1 }}> */}

                        <View style={[styles.tableHeader, { backgroundColor: '#205AA7' }]}>
                            <View style={styles.width50}>
                                <Text style={styles.btnText}>{strings.hoTen}</Text>
                            </View>
                            <View style={styles.width15}>
                                <Text style={styles.btnText}>{strings.xlc}</Text>
                            </View>
                            <View style={styles.width15}>
                                <Text style={styles.btnText}>{strings.ph}</Text>
                            </View>
                            <View style={styles.width15}>
                                <Text style={styles.btnText}>{strings.xem}</Text>
                            </View>
                        </View>
                        <View style={{ height: height * 0.05, backgroundColor: '#D7D7D7', }}>
                            <TouchableOpacity
                                style={styles.styleCenterContent}
                                onPress={() => this.handleShowHide()}
                            >
                                <AntDesign name={this.state.iconThugon} size={30} color="black" />
                                <Text>{this.state.textThugon}</Text>
                            </TouchableOpacity>
                        </View>

                        {viewTree}
                        {/* <TreeSelectCustom
                            data={[this.props.chuyenXuLyReducer.get('lstTreeData')]}
                            isOpen
                            //handleRadioButtonClick={this.handleRadioButtonClick}
                        // onClick={this._onClick}
                        // onClickLeaf={this._onClickLeaf}
                        /> */}

                        <View style={[styles.tableHeader, { backgroundColor: "#32CD32" }]}>
                            <View style={styles.width50}>
                                <Text style={styles.btnText}>{strings.donVi}</Text>
                            </View>
                            <View style={styles.width15}>
                                <Text style={styles.btnText}>{strings.xlc}</Text>
                            </View>
                            <View style={styles.width15}>
                                <Text style={styles.btnText}>{strings.ph}</Text>
                            </View>
                            <View style={styles.width15}>
                                <Text style={styles.btnText}>{strings.xem}</Text>
                            </View>
                        </View>
                        <View style={{ height: height * 0.05, backgroundColor: '#D7D7D7', }}>
                            <TouchableOpacity
                                style={styles.styleCenterContent}
                                onPress={() => this.handleShowHide()}
                            >
                                <AntDesign name={this.state.iconThugon} size={30} color="black" />
                                <Text>{this.state.textThugon}</Text>
                            </TouchableOpacity>
                        </View>

                        {viewDonVi}

                    </ScrollView>
                </View>
            </View>

        );
    }
}

const mapStateToProps = (state) => ({
    chuyenXuLyReducer: state.get('chuyenXuLyReducer'),
    login: state.get('login'),
    root: state.get('root'),
});

export default connect(mapStateToProps)(ChuyenXuLy)  