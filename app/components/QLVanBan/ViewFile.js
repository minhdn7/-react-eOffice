import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, FlatList, Image, WebView, StyleSheet} from 'react-native';
// import styles from '../../styles/styleQLVanBan';
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
        const { navigation } = this.props;
        const dataUrl = navigation.getParam('dataUrl', '');
        Alert.alert(dataUrl);
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                <DefaultHeader myTitle= {strings.noiDungFile} navigator= {this.props.navigation} />
                {/* <Text>ABV</Text> */}
                <View style={styles.container}>
                    <WebView
                    style = {styles.webview}
                    source={{ uri: dataUrl }}
                    // source={{ uri: 'https://github.com/facebook/react-native' }}
                    scalesPageToFit={true}
                    />
                </View>

            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'column',
      overflow:'hidden'
    },
    webview: {
      flex: 1,
    //   maxHeight: 480,
        // marginTop: 20,
        width: 320,
        maxHeight: 480,

    }
  });


function mapStateToProps(state){
    return {
        documentReducer: state.get('documentReducer'),
        fileReducer: state.get('fileReducer'),
        root: state.get('root'),
        login: state.get('login'),

    }
}
export default connect(mapStateToProps)(ViewFile)
