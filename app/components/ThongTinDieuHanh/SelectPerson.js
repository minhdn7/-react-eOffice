import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Dimensions, KeyboardAvoidingView } from 'react-native';
import styles from '../../styles/styleQLVanBan';
import { connect } from "react-redux";
import ModalDropdown from 'react-native-modal-dropdown';
import DefaultHeader from '../navigation/DefaultHeader';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import strings from "../../resources/strings";
import Icon from 'react-native-vector-icons/Entypo';
import * as thongTinDieuHanhAction from "../../actions/thongTinDieuHanh-actions";
import TreeSelectUserUnit from './TreeSelectUserUnit';

const { height, width } = Dimensions.get('window');

export class SelectPerson extends Component {
    constructor(props) {
        super(props);
        this.delayTimer = null;
        this.state = {
            txtNameSelectPerson: strings.chonNhomNguoiNhan,
            param: "",
            lstData: [],
        }
    }

    componentDidMount(){
        this.props.dispatch(thongTinDieuHanhAction.getListUserUnitAction(this.state.param));
    }

    componentWillReceiveProps(){
        this.setState({
            lstData: this.props.thongTinDieuHanhReducer.get('listUserUnit'),
        })
    }

    renderComboboxSelectPerson = () => {
        let dataStr = [""];
        let lstUnit = this.props.chuyenXuLyReducer.get('listUnit');
        // if (lstUnit != null && lstUnit.length != 0) {
        //     dataStr = lstUnit.map((item) => { return item.name });
        //     dataStr.splice(0, 0, strings.chonDonVi);
        // }
        return (
            <View style={{ flex: 1, backgroundColor: '#ffffff', borderRadius: 4,}}>
                <ModalDropdown
                    options={dataStr}
                    style={{ flex: 1, }}
                    dropdownStyle={{ backgroundColor: "#ffffff", color: 'black', fontSize: 16, }}
                    dropdownTextStyle={{ flex: 1, color: "black", fontSize: 16, backgroundColor: "#ffffff", width: width * 0.9 }}
                    onSelect={(idx, value) => this.selectPersonReceiveHandle(idx, value)}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 2, paddingTop: 10 }}>
                        <Text style={{ color: 'black', fontSize: 14 }}>{this.state.txtNameSelectPerson}</Text>
                        <Icon name="chevron-small-down" size={23} color='black' />
                    </View>
                </ModalDropdown>
            </View>
        );
    }

    _onChangeTextHandle = (textInput) => {
        clearTimeout(this.delayTimer);

        this.setState({
            param: textInput,
        });
        this.delayTimer = setTimeout(
            () => {
                this.props.dispatch(thongTinDieuHanhAction.getListUserUnitAction(this.state.param));

            },
            1500
        )
    }

    searchSubmit = (txtInput) => {
        this.setState({
            param: txtInput,
        });
        this.props.dispatch(thongTinDieuHanhAction.getListUserUnitAction(this.state.param));
    }

    renderTree = () => {
        let lstData = this.state.lstData;
        //lstData = this.props.thongTinDieuHanhReducer.get('listUserUnit');
        if(lstData != null && lstData.length > 0){
            return (
                <TreeSelectUserUnit
                    data={lstData}
                    isOpen={false}
                //handleRadioButtonClick={this.handleRadioButtonClick}
                // onClick={this._onClick}
                // onClickLeaf={this._onClickLeaf}
                />
            );
        }else {
            return (<Text>{strings.khongCoDuLieu}</Text>);
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <DefaultHeader myTitle="Gửi thông tin điều hành" navigator={this.props.navigation} />
                <View style={[styles.styleContainer]}>
                    <View style={{ flex: 2 }}>
                        <View style={[styles.searchSection, { flex: 1, margin: 3 }]} >
                            <EvilIcons style={styles.searchIcon} name="search" size={20} color="#000" />
                            <TextInput
                                style={styles.textInput}
                                underlineColorAndroid='transparent'
                                placeholder='Tìm kiếm'
                                returnKeyType='search'
                                onSubmitEditing={(event) => this.searchSubmit(event.nativeEvent.text)}
                                onChangeText={(text) => this._onChangeTextHandle(text)}
                            />
                        </View>
                        <View style={{flex: 1, margin: 3}}>
                            {this.renderComboboxSelectPerson()}
                        </View>
                    </View>

                    <View style={{ flex: 8 }}>
                        {this.renderTree()}
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', marginBottom: 4, marginTop: 2 }}>
                        <TouchableOpacity style={[styles.styleBtn_TTDieuHanh, { backgroundColor: '#008B00' }]}>
                            <Text style={{ color: 'white' }}>{strings.quayLai}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.styleBtn_TTDieuHanh, { backgroundColor: '#205AA7' }]}>
                            <Text style={{ color: 'white' }}>{strings.luuLai}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    chuyenXuLyReducer: state.get('chuyenXuLyReducer'),
    thongTinDieuHanhReducer: state.get('thongTinDieuHanhReducer'),
    root: state.get('root'),
});

export default connect(mapStateToProps)(SelectPerson)  
