import React, { Component } from 'react';
import { View, Text, Dimensions, Image } from 'react-native';
import styles from '../../styles/styleQLVanBan'; 
import DefaultHeader from '../navigation/DefaultHeader';
import { connect } from "react-redux";
import * as luongVanBanAction from "../../actions/luongVanBan-actions";
import * as rootActions from "../../actions/root-actions";
import apiUrl from "../../network/apiUrl";

const { height, width } = Dimensions.get('window');

export class LuongVanBan extends Component{
    constructor(props){
        super(props);
        this.state = {
            response: "",
        };
    }

    componentWillMount() {
        var instanceId = "4750351";
        var processId = "VAN_BAN_DI_CV_VP_TRINHKY_1363%3A2%3A4162512";
        this.setState({
            response: apiUrl.GET_LUONG_VAN_BAN_URL + "insid=" + instanceId + "&defid=" + processId,
        });
    }

    // componentWillReceiveProps() {
    //     this.setState({
    //         response: this.props.luongVanBanReducer.get('imageDocFlow'),
    //     });
    // }

    render(){
        return (
            <View style={{flex: 1}}>
                <DefaultHeader navigator={this.props.navigation} myTitle="Sơ đồ luồng văn bản" />
                <View style={{flex: 1}}>
                    <Image 
                    style={{flex: 1, transform: [{ rotate: '90deg'}]}}
                    source={{uri: this.state.response}}
                    resizeMode='contain'
                    />
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        luongVanBanReducer: state.get('luongVanBanReducer'),
        root: state.get('root'),
    }
}

export default connect(mapStateToProps)(LuongVanBan);
