import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, FlatList, Image } from 'react-native';
import styles from '../../styles/styleQLVanBan';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import strings from "../../resources/strings";
import DefaultHeader from '../navigation/DefaultHeader';
import {connect} from "react-redux";
import * as documentAction from "../../actions/document-action";
import * as fileAction from "../../actions/file-actions";
import loading from '../Loading';
import {Button, Container, Content, Spinner} from "native-base";
import colors from "../../resources/colors";
import * as rootActions from "../../actions/root-actions";
// test 2

export class ViewFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }



    render() {

        return (
            <View>
                <DefaultHeader myTitle= {strings.chiTietVanBan} navigator= {this.props.navigation} />
            
                
            </View>
            
        );
    }
}




function mapStateToProps(state){
    return {
        documentReducer: state.get('documentReducer'),
        fileReducer: state.get('fileReducer'),
        root: state.get('root'),
        login: state.get('login'),

    }
}
export default connect(mapStateToProps)(ViewFile)
