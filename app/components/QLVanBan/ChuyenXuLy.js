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
import { convertJsonToTreeMap } from '../../utils/Utils';
import ContactData from "../../data/ContactData";
import strings from "../../resources/strings";

const { height, width } = Dimensions.get('window');

export class ChuyenXuLy extends Component {
    constructor() {
        super();
        this.state = {
            flagThugon: true,
            textThugon: "Thu gọn",
            iconThugon: "arrowup",
            lstUnit: [],
            txtUnit: "--Chọn đơn vị--",
            lstUserConcurentSend: [],
            lstInternal: [],
        }
    }

    handleChonTheoNhomDonVi = () => {
        alert("Chọn theo nhóm đơn vị");
    }

    handleChonTheoNhomCaNhan = () => {
        alert("Chọn theo nhóm cá nhân");
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

    // listDataById = (id) => {
    //     if (this.lstUserConcurentSend == null && this.lstUserConcurentSend.length == 0)
    //         return [];
    //     if (id != null && id != "" && id != "undefined") {
    //         return this.lstUserConcurentSend.filter((item) => { return item.parentId == id });
    //     }
    //     return this.lstUserConcurentSend.filter((item) => { return item.parentId == null });
    // }

    gotoScreen(value) {
        // this.setState({
        //     txtUnit: value,
        // });
    }

    componentWillMount() {
        this.props.dispatch(chuyenXuLyAction.resetTreeDataAction());
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
        // var lstTreeData = this.props.chuyenXuLyReducer.get('lstTreeData');
        // var lstTreeDonVi = this.props.chuyenXuLyReducer.get('lstTreeDonVi');
        // if(!lstTreeData || !lstTreeData.length){
        //     lstTreeData = this.props.chuyenXuLyReducer.get('listUserConcurrentSend');
        //     this.props.dispatch(chuyenXuLyAction.setListTreeDataAction(lstTreeData));
        // }
        // if(!lstTreeDonVi || !lstTreeDonVi.length){
        //     lstTreeDonVi = this.props.chuyenXuLyReducer.get('listInternal');
        //     this.props.dispatch(chuyenXuLyAction.setListTreeDonViAction(lstTreeDonVi));
        // }

        if (this.props.chuyenXuLyReducer.get('listUnit')) {
            this.setState({
                lstUnit: this.props.chuyenXuLyReducer.get('listUnit'),
            });
        }
        //if (lstTreeData) {
        this.setState({
            lstUserConcurentSend: this.props.chuyenXuLyReducer.get('listUserConcurrentSend'),
            lstInternal: this.props.chuyenXuLyReducer.get('listInternal'),
        });
        // }

        console.log("lstUserConcurentSend:", this.state.lstUserConcurentSend);

    }

    save = (check) => {
        if(check == 1){
            var lstDataSelect = this.props.chuyenXuLyReducer.get('lstDataSelect');
            if(lstDataSelect && lstDataSelect.length){
                this.props.navigation.navigate('DocumentMove');
            }else{
                alert(strings.thongBaoChuaChonNguoiNhanVanBan);
            }
        }
    }


    state = {}
    render() {
        let dataStr = [];
        let viewTree;
        let viewDonVi;

        if (this.state.lstUnit != null && this.state.lstUnit.length != 0) {
            dataStr = this.state.lstUnit.map((item) => { return item.name });
        }

        if (this.state.lstUserConcurentSend) {
            viewTree = <TreeSelectCustom
                data={[this.state.lstUserConcurentSend]}
                isOpen
            //handleRadioButtonClick={this.handleRadioButtonClick}
            // onClick={this._onClick}
            // onClickLeaf={this._onClickLeaf}
            />
        } else {
            viewTree = <Text>{strings.khongCoDuLieu}</Text>
        }

        if (this.state.lstInternal) {
            viewDonVi = <TreeSelectCustom
                data={[this.state.lstInternal]}
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
                <HeaderChuyenXuLy myTitle='Chọn người nhận văn bản' navigator={this.props.navigation} save={this.save} />

                <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#D7D7D7' }}>
                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 5, marginLeft: 5, marginRight: 5 }}>
                        <TextInput
                            style={{ flex: 1, backgroundColor: '#ffffff', height: 40, marginRight: 5 }}
                            placeholder="Họ tên"
                        />
                        <View style={{ flex: 1, backgroundColor: '#ffffff', height: 40, }}>
                            <ModalDropdown
                                options={dataStr}
                                style={{ flex: 1 }}
                                dropdownStyle={{ backgroundColor: "#ffffff", color: 'black', fontSize: 16, }}
                                dropdownTextStyle={{ flex: 1, color: "black", fontSize: 16, backgroundColor: "#ffffff", width: width * 0.9 }}
                                onSelect={(idx, value) => this.gotoScreen(idx)}
                            >
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 7 }}>
                                    <Text style={{ color: 'black', fontSize: 14 }}>{this.state.txtUnit}</Text>
                                    <Icon name="chevron-small-down" size={23} color='black' />
                                </View>
                            </ModalDropdown>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 5, marginLeft: 5, marginRight: 5 }}>
                        <View style={{ width: width * 0.5 }}>
                            <TouchableOpacity
                                style={[styles.btn, { backgroundColor: '#205AA7', }]}
                                onPress={() => this.handleChonTheoNhomDonVi()}
                            >
                                <Text style={styles.btnText}>Chọn theo nhóm đơn vị</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: width * 0.5 }}>
                            <TouchableOpacity
                                style={[styles.btn, { backgroundColor: '#205AA7', marginLeft: 2, marginRight: 10 }]}
                                onPress={() => this.handleChonTheoNhomCaNhan()}
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
                                <Text style={styles.btnText}>Họ tên</Text>
                            </View>
                            <View style={styles.width15}>
                                <Text style={styles.btnText}>XLC</Text>
                            </View>
                            <View style={styles.width15}>
                                <Text style={styles.btnText}>PH</Text>
                            </View>
                            <View style={styles.width15}>
                                <Text style={styles.btnText}>Xem</Text>
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
                                <Text style={styles.btnText}>Đơn vị</Text>
                            </View>
                            <View style={styles.width15}>
                                <Text style={styles.btnText}>XLC</Text>
                            </View>
                            <View style={styles.width15}>
                                <Text style={styles.btnText}>PH</Text>
                            </View>
                            <View style={styles.width15}>
                                <Text style={styles.btnText}>Xem</Text>
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