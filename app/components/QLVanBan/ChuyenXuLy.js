import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Picker, Text, Dimensions, ScrollView } from 'react-native';
import { connect } from "react-redux";
import ModalDropdown from 'react-native-modal-dropdown';
import AntDesign from "react-native-vector-icons/AntDesign"
import Octicons from "react-native-vector-icons/Octicons";
import Icon from 'react-native-vector-icons/Entypo';
import HeaderChuyenXuLy from '../QLVanBan/HeaderChuyenXuLy';
import styles from '../../styles/styleQLVanBan';
import TreeView from "@zaguini/react-native-tree-view";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

const { height, width } = Dimensions.get('window');

export class ChuyenXuLy extends Component {
    constructor() {
        super();
        this.state = {
            flagThugon: true,
            textThugon: "Thu gọn",
            iconThugon: "arrowup"
        }
    }

    handleChonTheoNhomDonVi = () => {
        alert("Chọn theo nhóm đơn vị");
    }

    handleChonTheoNhomCaNhan = () => {
        alert("Chọn theo nhóm cá nhâ");
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

    handleRadioButtonClick(value){
        alert("Test: " + value);
    }

    gotoScreen(value) {
        alert(value);
    }

    componentWillMount() {
        dataConvert = this.props.login.get('dataContact');
        //dataConvert = [];
    }

    state = {}
    render() {
        let dataStr = ["Đánh dấu", "Trao đổi  thông tin", "Lịch sử xử lýyyyyyy yyyyyyyyyyyy yyyyyyyyyyyyyyy yyyyyyyyyyyyyy yyyyyyyyyyyyyy"];
        var radio_props = [
            { label: '', value: 0 },
        ];
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
                                dropdownStyle={{ backgroundColor: "#ffffff", color: 'black', fontSize: 16, }}
                                dropdownTextStyle={{ color: "black", fontSize: 16, backgroundColor: "#ffffff", width: width * 0.9 }}
                                onSelect={(idx, value) => this.gotoScreen(value)}
                            >
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 7 }}>
                                    <Text style={{ color: 'black', fontSize: 16 }}>--Chọn đơn vị--</Text>
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
                    <ScrollView style={{ flex: 1 }}>
                        <View style={{ flex: 1 }}>
                            <TreeView
                                ref={ref => (this.treeView = ref)}

                                data={[dataConvert]}

                                // data={ContactData}
                                deleteOnLongPress
                                renderItem={(item, level) => (
                                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                        <View style={styles.width50}>
                                            <Text
                                                style={{
                                                    marginLeft: 25 * level,
                                                    fontSize: 14
                                                }}
                                            >
                                                {item.collapsed !== null ? (
                                                    <Text style={{ fontSize: 14 }}>
                                                        {item.collapsed ?
                                                            <Octicons
                                                                name='diff-added'
                                                                color='#000'
                                                                size={14}
                                                            />
                                                            :
                                                            <AntDesign
                                                                name='minussquareo'
                                                                color='#000'
                                                                size={14}
                                                            />
                                                        }
                                                    </Text>
                                                ) : (

                                                        <Text>
                                                            <AntDesign
                                                                name='minussquareo'
                                                                color='#000'
                                                                size={14}
                                                            />
                                                        </Text>
                                                    )}
                                                {" "}
                                                {item.userName}
                                            </Text>
                                        </View>
                                        <View style={[styles.width15, {height: height*0.05}]}>
                                        <RadioForm
                                                radio_props={radio_props}
                                                initial={-1}
                                                buttonSize={10}
                                                selectedButtonColor={'black'}
                                                buttonColor={'black'}
                                                onPress={(value) => { this.handleRadioButtonClick({ value: value }) }}
                                            />
                                        </View>
                                    </View>
                                )}
                            />
                        </View>
                    </ScrollView>
                </View>
            </View>

        );
    }
}

const mapStateToProps = (state) => ({
    login: state.get('login'),
    root: state.get('root'),
});

export default connect(mapStateToProps)(ChuyenXuLy)  