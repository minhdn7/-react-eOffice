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
import { getIdByUnitAndUser, convertJsonToTreeMapCustom } from '../../utils/Utils';

const { height, width } = Dimensions.get('window');

export class ChuyenXuLy extends Component {
    constructor() {
        super();
        this.delayTimer = null;
        this.state = {
            flagThugon: true,
            textThugon: strings.thuGon,
            iconThugon: "arrowup",
            flagThugonNoiBo: true,
            textThugonNoiBo: strings.thuGon,
            iconThugonNoiBo: "arrowup",
            lstUnit: [],
            txtUnit: "",
            txtInputName: "",
            lstUserConcurentSend: [],
            lstInternal: [],
            actionType: "",
            txtNameUnitSelect: strings.chonDonVi,
            isRefresh: true,
        }
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

        // this.setState({
        //     lstUnit: this.props.chuyenXuLyReducer.get('listUnit'),
        //     lstUserConcurentSend: this.props.chuyenXuLyReducer.get('listUserConcurrentSend'),
        //     lstInternal: this.props.chuyenXuLyReducer.get('listInternal'),
        // })
    }

    // componentWillReceiveProps() {

    //     if (this.props.chuyenXuLyReducer.get('listUnit')) {
    //         this.setState({
    //             lstUnit: this.props.chuyenXuLyReducer.get('listUnit'),
    //         });
    //     }
    //     // let lstData = this.props.chuyenXuLyReducer.get('lstTreeData');
    //     // if(!lstData || ! lstData.length){
    //     //     lstData = this.props.chuyenXuLyReducer.get('listUserConcurrentSend');
    //     // }
    //     this.setState(() => {
    //         return{
    //             lstUserConcurentSend: this.props.chuyenXuLyReducer.get('listUserConcurrentSend'),
    //             lstInternal: this.props.chuyenXuLyReducer.get('listInternal'),
    //         }
    //     });
    // }

    selectGroupByUnitAndUser = (type) => {
        this.setState({
            actionType: type,
        });

        this.props.navigation.navigate('SelectGroupUnitAndUser', {
            actionType: type,
            onGoBack: this.refresh,
        });
    }

    handleShowHide = (type) => {
        switch (type) {
            case "DonVi":
                if (this.state.flagThugon) {
                    this.setState({
                        flagThugon: false,
                        textThugon: strings.nhanVaoDeChonNguoiNhan,
                        iconThugon: "arrowdown"
                    });
                } else {
                    this.setState({
                        flagThugon: true,
                        textThugon: strings.thuGon,
                        iconThugon: "arrowup"
                    });
                }
                break;
            case "NoiBo":
                if (this.state.flagThugonNoiBo) {
                    this.setState({
                        flagThugonNoiBo: false,
                        textThugonNoiBo: strings.nhanVaoDeChonNguoiNhan,
                        iconThugonNoiBo: "arrowdown"
                    });
                } else {
                    this.setState({
                        flagThugonNoiBo: true,
                        textThugonNoiBo: strings.thuGon,
                        iconThugonNoiBo: "arrowup"
                    });
                }
                break;
        }


    }

    selectUnitHandle = async (index) => {
        let lstUnit = this.props.chuyenXuLyReducer.get('listUnit');
        let item = lstUnit[index - 1];

        if (item) {
            let id = item.id;
            if (id.indexOf('U') !== -1) {
                id = id.substring(1, id.length);
            }
            this.setState({
                txtNameUnitSelect: shortText(item.name, 5),
                txtUnit: id,
            });
            await this.props.dispatch(chuyenXuLyAction.getUserConcurrentSendAction(id, "", this.state.txtInputName));
        } else {
            this.setState({
                txtNameUnitSelect: strings.chonDonVi,
            });
            await this.props.dispatch(chuyenXuLyAction.getUserConcurrentSendAction("", "", this.state.txtInputName));
        }

        // this.setState({
        //     isRefresh: !isRefresh,
        // })
    }
    _onChangeTextHandle = async (textInput) => {
        clearTimeout(this.delayTimer);

        this.setState({
            txtInputName: textInput,
        });
        this.delayTimer = await setTimeout(
            () => {
                this.props.dispatch(chuyenXuLyAction.getUserConcurrentSendAction(this.state.txtUnit, "", textInput ? textInput.trim() : ""));
                
            },
            1500
        )
        // this.setState({
        //     isRefresh: !isRefresh,
        // })
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
        let lstData = this.props.chuyenXuLyReducer.get('listUserConcurrentSend');
        if (data && data.length) {
            for (let i = 0; i < data.length; i++) {
                await this.findByIdAndSwap(lstData, data[i]);
            }
        }

        this.setState({
            isRefresh: !isRefresh,
        })
        //this.props.dispatch(chuyenXuLyAction.getUserConcurrentSendAction(lstData));
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

    renderComboboxUnit = () => {
        let dataStr = [""];
        let lstUnit = this.props.chuyenXuLyReducer.get('listUnit');
        if (lstUnit != null && lstUnit.length != 0) {
            dataStr = lstUnit.map((item) => { return item.name });
            dataStr.splice(0, 0, strings.chonDonVi);
        }
        return (
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
        );
    }

    renderTree = (type) => {
        let lstData = [];
        if (type === 1) {
            lstData = this.props.chuyenXuLyReducer.get('listUserConcurrentSend');
        } else // cây đơn vị
        {
            lstData = this.props.chuyenXuLyReducer.get('listInternal');
        }
        if (lstData && lstData.length) {
            return (
                <TreeSelectCustom
                    data={lstData}
                    isOpen={false}
                //handleRadioButtonClick={this.handleRadioButtonClick}
                // onClick={this._onClick}
                // onClickLeaf={this._onClickLeaf}
                />
            );
        } else {
            return (<Text>{strings.khongCoDuLieu}</Text>);
        }
    }

    state = {}
    render() {
        return (
            <View style={{ flex: 1 }}>
                <HeaderChuyenXuLy myTitle={strings.chonNguoiNhanVanBan} saveHandle={this.saveHandle} />

                <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#D7D7D7' }}>
                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 5, marginLeft: 5, marginRight: 5 }}>
                        <TextInput
                            style={{ flex: 1, backgroundColor: '#ffffff', height: 40, marginRight: 5 }}
                            placeholder="Họ tên"
                            value={this.state.txtInputName}
                            onChangeText={(text) => this._onChangeTextHandle(text)}
                        />

                        {this.renderComboboxUnit()}

                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 5, marginLeft: 5, marginRight: 5 }}>
                        <View style={{ width: width * 0.5 }}>
                            <TouchableOpacity
                                style={[styles.btn, { backgroundColor: '#205AA7', }]}
                                onPress={() => this.selectGroupByUnitAndUser(1)}
                            >
                                <Text style={styles.btnText}>{strings.chonTheoNhomDonVi}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: width * 0.5 }}>
                            <TouchableOpacity
                                style={[styles.btn, { backgroundColor: '#205AA7', marginLeft: 2, marginRight: 10 }]}
                                onPress={() => this.selectGroupByUnitAndUser(2)}
                            >
                                <Text style={styles.btnText}>{strings.chonTheoNhomCaNhan}</Text>
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
                                onPress={() => this.handleShowHide("DonVi")}
                            >
                                <AntDesign name={this.state.iconThugon} size={30} color="black" />
                                <Text>{this.state.textThugon}</Text>
                            </TouchableOpacity>
                        </View>
                       {/* {this.renderTree(1)} */}
                        {this.state.flagThugon ? this.renderTree(1) : null}

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
                                onPress={() => this.handleShowHide("NoiBo")}
                            >
                                <AntDesign name={this.state.iconThugonNoiBo} size={30} color="black" />
                                <Text>{this.state.textThugonNoiBo}</Text>
                            </TouchableOpacity>
                        </View>

                        {this.state.flagThugonNoiBo ? this.renderTree(2) : null}

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