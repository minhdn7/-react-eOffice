import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import styles from '../../styles/styleQLVanBan';
import TreeSelectGroupByUnitAndUser from './TreeSelectGroupByUnitAndUser';
import HeaderChuyenXuLy from './HeaderChuyenXuLy';
import { connect } from "react-redux";
import strings from "../../resources/strings";
import * as chuyenXuLyAction from "../../actions/chuyenXuLy-actions";


export class SelectGroupUnitAndUser extends Component {
    constructor() {
        super();
        // this.navigator = this.props.menuReducer.get('navigator');
        // this.title = this.navigator.getParam('title', 'NO-ID');
        // this.actionType = this.navigator.getParam('typeAction', 'NO-ID');
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

        }
    }

    componentWillReceiveProps() {
        let data;
        if (this.state.actionType == 1) {
            data = this.props.chuyenXuLyReducer.get('listGroupUnit');
            if (data) {
                this.setState({
                    lstData: data,
                })
            }
        } else {
            if (this.props.chuyenXuLyReducer.get('listGruopUnit')) {
                this.setState({
                    lstData: this.props.chuyenXuLyReducer.get('listGruopUnit'),
                })
            }
        }
        console.log("list group unit: ", this.state.lstData);
    }

    render() {
        let viewTree;
        if (this.state.lstData) {
            viewTree = <TreeSelectGroupByUnitAndUser
                data={this.state.lstData}
                isOpen
            //handleRadioButtonClick={this.handleRadioButtonClick}
            // onClick={this._onClick}
            // onClickLeaf={this._onClickLeaf}
            />
        } else {
            viewTree = <Text>{strings.khongCoDuLieu}</Text>
        }
        return (
            <View style={{ flex: 1 }}>
                <HeaderChuyenXuLy myTitle={this.state.title} />
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

                        {viewTree}

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