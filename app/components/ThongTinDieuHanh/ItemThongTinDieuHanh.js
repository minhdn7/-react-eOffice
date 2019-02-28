import React, { Component } from "react";
import { Text, View, Dimensions } from "react-native";
import * as thongTinDieuHanhAction from "../../actions/thongTinDieuHanh-actions";
import Toast from 'react-native-simple-toast';
import strings from "../../resources/strings";
import styles from '../../styles/styleQLVanBan';
import ModalDropdown from 'react-native-modal-dropdown';
import Icon from 'react-native-vector-icons/Entypo';

const { height, width } = Dimensions.get('window');

export default class ItemThongTinDieuHanh extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    _updateAnDeleteHandle = (option, id) => {
        if (option == 0) {
            this.props.navigator.navigate('SendThongTin', {
                id: id,
                title: "Chỉnh sửa thông tin điều hành"
            });
        }
        else if (option == 1) {
            this.props._deleteInfoHandle(id);
        }
        // load data
    }

    render() {
        let dataStr = [strings.sua, strings.xoa];
        let status;
        let color;
        if (this.props.actionType === 'Gui') {
            status = this.props.item.daGui !== null ? strings.daGui : strings.banNhap;
            dataStr = this.props.item.daGui !== null ? [strings.sua] : [strings.sua, strings.xoa];
            color = this.props.item.daGui !== null ? 'blue' : 'red';
        } else {
            //status = this.props.item.isRead === 1 ? strings.daDoc : strings.chuaDoc;
        }
        return (
            <View style={styles.container}>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    backgroundColor: 'white',
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingTop: 2,
                }}>
                    <Text style={{ backgroundColor: 'white', fontWeight: 'bold' }}>{this.props.item.tieuDe}</Text>
                    {this.props.actionType === 'Gui' ? <View style={styles.row1}>
                        <Text style={{ flex: 3 }}>{strings.ngayTao + ":"} </Text>
                        <Text style={{ flex: 7, color: 'red' }}>{this.props.item.ngayTao}</Text>
                    </View> :
                        <View style={styles.row1}>
                            <Text style={{ flex: 3 }}>{strings.ngayNhan + ":"} </Text>
                            <Text style={{ flex: 7, color: 'red' }}>{this.props.item.ngayNhan}</Text>
                        </View>}

                    {this.props.actionType === 'Gui' ?
                        <View style={styles.row1}>
                            <Text style={{ flex: 3 }}>{strings.trangThai + ":"} </Text>
                            <Text style={{ flex: 7, color: color }}>{status}</Text>
                        </View> :
                        <View style={styles.row1}>
                            <Text style={{ flex: 3 }}>{strings.nguoiGui + ":"} </Text>
                            <Text style={{ flex: 7, color: 'black' }}>{this.props.item.nguoiGui}</Text>
                        </View>
                    }

                    <View style={styles.row1}>
                        <Text tyle={{ flex: 3 }}>{strings.tepDinhKem + ":"} </Text>
                        <Text style={{ flex: 7 }}></Text>
                    </View>

                </View>
                {this.props.actionType === 'Gui' ? <View style={styles.right}>
                    <ModalDropdown
                        options={dataStr}
                        dropdownStyle={{ width: width * 0.3, height: height * 0.2, backgroundColor: "#0033FF", }}
                        dropdownTextStyle={styles.dropdownTextStyle}
                        dropdownTextHighlightStyle={styles.dropdownTextHighlightStyle}
                        onSelect={(idx, value) => this._updateAnDeleteHandle(idx, this.props.item.id)}
                    >
                        <Icon name="dots-three-vertical" size={20} />
                    </ModalDropdown>
                </View> : null}

            </View>
        );
    }
}