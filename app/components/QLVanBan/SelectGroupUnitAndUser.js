import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import styles from '../../styles/styleQLVanBan';
import TreeSelectGroupByUnitAndUser from './TreeSelectGroupByUnitAndUser';
import HeaderChuyenXuLy from './HeaderChuyenXuLy';
import { connect } from "react-redux";
import strings from "../../resources/strings";
import * as chuyenXuLyAction from "../../actions/chuyenXuLy-actions";
import ContactData from "../../data/ContactData";
import { convertJsonToTreeMapCustom } from '../../utils/Utils';
export class SelectGroupUnitAndUser extends Component {
    constructor() {
        super();
        this.state = {
            lstData: [],
            title: '',
            actionType: '',
        }
    }

    componentWillMount() {
        let title;
        //let navigator = this.props.menuReducer.get('navigator');
        let actionType = this.props.navigation.getParam('actionType', 'NO-ID');
        if (actionType == 1) title = strings.chonTheoNhomDonViNhan;
        else title = strings.chonTheoNhomCaNhanNhan;
        this.setState({
            title: title,
            actionType: actionType,
        })
    }

    componentDidMount() {
        if (this.state.actionType == 1) {
            this.props.dispatch(chuyenXuLyAction.getListGroupUnitAction());
        } else {
            this.props.dispatch(chuyenXuLyAction.getListGroupUserAction());
        }
        this.setState({
            //lstData: data,
            lstData: convertJsonToTreeMapCustom(ContactData),
        })
    }

    // componentWillReceiveProps() {
    //     let data;
    //     if (this.state.actionType == 1) {
    //         data = this.props.chuyenXuLyReducer.get('listGroupUnit');
    //         if (data) {
    //             this.setState({
    //                 lstData: data,
    //             })
    //         }
    //     } else {
    //         if (this.props.chuyenXuLyReducer.get('listGruopUnit')) {
    //             this.setState({
    //                 lstData: this.props.chuyenXuLyReducer.get('listGruopUnit'),
    //             })
    //         }
    //     }
    // }

    saveHandle = () => {
        this.props.navigation.goBack();
        this.props.navigation.state.params.onGoBack();
    }

    renderTree = () => {
        let actionType = this.props.navigation.getParam('actionType', 'NO-ID');
        let lstData = [];
        if (actionType === 1) {
            lstData = this.props.chuyenXuLyReducer.get('listGroupUnit');
        } else // cây đơn vị
        {
            lstData = this.props.chuyenXuLyReducer.get('listGroupUser');
        }
        if (lstData && lstData.length) {
            return (
                <TreeSelectGroupByUnitAndUser
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

    render() {
        return (
            <View style={{ flex: 1 }}>
                <HeaderChuyenXuLy
                    myTitle={this.state.title}
                    saveHandle={this.saveHandle}
                />
                <View style={{ flex: 1, margin: 2, marginTop: 5 }}>
                    <ScrollView style={{ flex: 1 }}>
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

                        {this.renderTree()}

                    </ScrollView>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    chuyenXuLyReducer: state.get('chuyenXuLyReducer'),
    menuReducer: state.get('menuReducer'),
});

export default connect(mapStateToProps)(SelectGroupUnitAndUser)  