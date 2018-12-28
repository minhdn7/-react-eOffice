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
import TreeSelectCustom from "../QLVanBan/TreeSelectCustom";


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

    _onClick = ({ item, routes }) => {
        console.log(item.userName);
        console.log(routes);
        
      };
    
      _onClickLeaf = ({ item, routes }) => {
        console.log(item.userName);
        console.log(routes);
      };

    componentDidMount() {
        this.props.dispatch(chuyenXuLyAction.getListUnitAction());
        //this.lstUserConcurentSend = this.props.login.get('dataContact');
        
    }

    componentWillReceiveProps() {
        this.setState({
            lstUnit: this.props.chuyenXuLyReducer.get('listUnit'),
            lstUserConcurentSend: this.props.login.get('dataContact'),
        });
        console.log("lstUserConcurentSend:", this.state.lstUserConcurentSend);

    }

    state = {}
    render() {
        let dataStr = [];
        let viewTree;
        if (this.state.lstUnit != null && this.state.lstUnit.length != 0) {
            dataStr = this.state.lstUnit.map((item) => { return item.name });
        }

        if (this.lstUserConcurentSend != null && this.lstUserConcurentSend.length != 0) {

        }

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

                        <TreeSelect
                            data={this.state.lstUserConcurentSend}
                            isOpen
                            //openIds={['1363-U1']}
                            onClick={this._onClick}
                            onClickLeaf={this._onClickLeaf}
                        />

                        {/* </View> */}

                        {/* <View style={{ flex: 1, margin: 5 }}> */}

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