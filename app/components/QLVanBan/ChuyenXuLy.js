import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Picker, Text, Dimensions, ScrollView } from 'react-native';
import { connect } from "react-redux";
import ModalDropdown from 'react-native-modal-dropdown';
import AntDesign from "react-native-vector-icons/AntDesign"
import Octicons from "react-native-vector-icons/Octicons";
import Icon from 'react-native-vector-icons/Entypo';
import HeaderChuyenXuLy from '../QLVanBan/HeaderChuyenXuLy';
import TreeViewChuyenXuLy from '../QLVanBan/TreeView'
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

    selectGroupByUnitAndUser = (type) => {
        this.props.navigation.navigate('SelectGroupUnitAndUser',{
            actionType: type,
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
        
        if (this.props.chuyenXuLyReducer.get('listUnit')) {
            this.setState({
                lstUnit: this.props.chuyenXuLyReducer.get('listUnit'),
            });
        }

        this.setState({
            lstUserConcurentSend: this.props.chuyenXuLyReducer.get('listUserConcurrentSend'),
            lstInternal: this.props.chuyenXuLyReducer.get('listInternal'),
        });

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
                <HeaderChuyenXuLy myTitle={strings.chonNguoiNhanVanBan} save={this.save} />

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
                        {/* <TreeViewChuyenXuLy data={this.listDataById} /> */}

                        {/* </View> */}
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