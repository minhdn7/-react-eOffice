import React, { Component } from "react";
import { Image, Text, View, Alert, TouchableOpacity, StyleSheet, TextInput, Input, FlatList, TouchableWithoutFeedback } from "react-native";
import strings from "../../resources/strings";
import DefaultHeader from '../navigation/DefaultHeader';
import { connect } from "react-redux";
import * as userInfoAction from "../../actions/userInfo-action";

export class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {},
        };
    }

    componentDidMount() {
        this.props.dispatch(userInfoAction.getUserInfoAction());
    }

    render() {
        let userInfo = this.props.userInfoReducer.get('userInfo');
        if(userInfo === undefined) userInfo = {};
        if(userInfo.avatar !== null && typeof(userInfo.avatar) != "undefined"){
            showAvatar = <Image source={{uri: userInfo.avatar}} style={{ width: 90, height: 90 }} />
        }else{
            showAvatar = <Image source={require('../../image/ic_avatar.png')} style={{ width: 90, height: 90 }} />
        }
        return (
            <View style={{ flex: 1 }}>
                <DefaultHeader myTitle="Thông tin cá nhân" navigator={this.props.navigation} />
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, flexDirection: 'row', margin: 10, alignItems: 'center' }}>
                        <View style={{ flex: 4 }}>
                            {showAvatar}
                        </View>
                        <Text style={{ flex: 6, color: 'black', fontSize: 18, padding: 4, fontWeight: 'bold' }}>{userInfo.userName}</Text>
                    </View>
                    {/* <View style={{margin: 6, height: 1, backgroundColor: 'lightslategray'}}/> */}
                    <View style={{ flex: 5, margin: 6 }}>
                        <View style={itemStyles.viewBound}>
                            <Text style={itemStyles.textLabel}>{strings.gioiTinh}</Text>
                            <Text style={itemStyles.textData}>{userInfo.sexName}</Text>
                        </View>

                        <View style={itemStyles.viewBound}>
                            <Text style={itemStyles.textLabel}>{strings.ngaySinh}</Text>
                            <Text style={itemStyles.textData}></Text>
                        </View>

                        <View style={itemStyles.viewBound}>
                            <Text style={itemStyles.textLabel}>{strings.dienThoai}</Text>
                            <Text style={itemStyles.textData}>{userInfo.mobile}</Text>
                        </View>

                        <View style={itemStyles.viewBound}>
                            <Text style={itemStyles.textLabel}>{strings.email}</Text>
                            <Text style={itemStyles.textData}>{userInfo.email}</Text>
                        </View>

                        <View style={itemStyles.viewBound}>
                            <Text style={itemStyles.textLabel}>{strings.tenDangNhap}</Text>
                            <Text style={itemStyles.textData}>{userInfo.userId}</Text>
                        </View>

                        <View style={itemStyles.viewBound}>
                            <Text style={itemStyles.textLabel}>{strings.danToc}</Text>
                            <Text style={itemStyles.textData}>{userInfo.danToc}</Text>
                        </View>

                        <View style={itemStyles.viewBound}>
                            <Text style={itemStyles.textLabel}>{strings.tonGiao}</Text>
                            <Text style={itemStyles.textData}>{userInfo.tonGiao}</Text>
                        </View>

                        <View style={itemStyles.viewBound}>
                            <Text style={itemStyles.textLabel}>{strings.hocVan}</Text>
                            <Text style={itemStyles.textData}>{userInfo.trinhDo}</Text>
                        </View>

                        <View style={itemStyles.viewBound}>
                            <Text style={itemStyles.textLabel}>{strings.diaChi}</Text>
                            <Text style={itemStyles.textData}>{userInfo.address}</Text>
                        </View>

                        <View style={itemStyles.viewBound}>
                            <Text style={itemStyles.textLabel}>{strings.donVi}</Text>
                            <Text style={itemStyles.textData}>{userInfo.unitName}</Text>
                        </View>

                        <View style={itemStyles.viewBound}>
                            <Text style={itemStyles.textLabel}>{strings.trangThai}</Text>
                            <Text style={itemStyles.textData}>{userInfo.status === "0" ? strings.duocPhepSuDung : strings.khongDuocPhepSuDung}</Text>
                        </View>
                    </View>




                </View>


            </View>
        )
    }


}


const itemStyles = StyleSheet.create({
    containerStyle: {
        flexDirection: 'column',
        resizeMode: 'cover',
        flex: 1,
        alignItems: 'center'
    },
    textLabel: {
        flex: 4,
        margin: 4,
        fontSize: 14,
        color: 'black',
    },
    textData: {
        flex: 6,
        margin: 4,
        fontSize: 14,
        color: 'black',
    },
    viewBound: {
        flexDirection: 'row',
        margin: 4,
    }
});

const mapStateToProps = (state) => ({
    userInfoReducer: state.get('userInfoReducer'),
});

export default connect(mapStateToProps)(UserInfo);