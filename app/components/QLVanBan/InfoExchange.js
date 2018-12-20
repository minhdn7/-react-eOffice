import React, { Component } from 'react';
import { View, ScrollView, Dimensions, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, FlatList } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';
import * as infoExchangeAction from "../../actions/infoExchange-actions";
import * as rootActions from "../../actions/root-actions";
import DefaultHeader from "../navigation/DefaultHeader";

const { height, width } = Dimensions.get('window');

export class InfoExchange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flagLoad: true,
            pageNo: "1",
            pageRec: "10",
            docId: "",
            listComment: [],
            text: "",
            //result: "",
        }
    }

    componentWillMount() {
        this.props.dispatch(rootActions.controlProgress(false));
        var idDocument = this.props.navigation.getParam('idDocument', 'NO-ID');
        this.setState({
            docId: idDocument,
        });
        this.props.dispatch(infoExchangeAction.getListCommentAction(this.state.pageNo, this.state.pageRec, idDocument));
    }

    componentWillReceiveProps() {
        this.setState({
            listComment: this.props.infoExchangeReducer.get('listComment'),
            //result: this.props.infoExchangeReducer.get('result'),
        });
        var result = "";
        result = this.props.infoExchangeReducer.get('result')
        console.log("test result: " + result);
        if(result == "TRUE" && result != "undefined"){
            this.props.dispatch(infoExchangeAction.getListCommentAction(this.state.pageNo, this.state.pageRec, this.state.docId));
            result = "";
        }
    }

    searchSubmit() {
        //this.props.dispatch(infoExchangeAction.guiYKienTraoDoiAction(this.state.docId, event));
        if(this.state.text != "" && this.state.text != null && this.state.text != "undefined"){
            this.props.dispatch(infoExchangeAction.guiYKienTraoDoiAction(this.state.docId, this.state.text));
            this.setState({
                text: "",
            });
        }
        
    }

    render() {
        let dataView;
        if (this.state.listComment != null && this.state.listComment.length != 0) {
            dataView = <FlatList
                data={this.state.listComment}
                renderItem={({ item, index }) => {
                    return (
                        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-end', paddingTop: 10, paddingRight: 4 }}>
                            <Text style={{ color: '#999999', fontSize: 15 }}>{item.time}</Text>
                            <Text style={{ color: 'black', fontSize: 15, backgroundColor: '#ffffff', padding: 7, borderRadius: 5 }}>{item.comment}</Text>
                        </View>
                    );
                }}
                keyExtractor={(item, index) => index.toString()}
            />
        } else {
            dataView = <Text></Text>;
        }
        return (
            <View style={{ flex: 1 }}>

                <DefaultHeader myTitle={this.props.navigation.getParam('title', '')} navigator={this.props.navigation} />

                <View style={{ flex: 12, backgroundColor: '#D7D7D7' }}>
                    {dataView}
                </View>

                <View style={{ flex: 2 }}>
                    <KeyboardAvoidingView style={{ flex: 1 }} >

                        <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#ffffff', alignItems: 'center' }}>
                            <View style={{ flex: 5 }}>
                                <TextInput
                                    style={{ fontSize: 18 }}
                                    placeholder='Nhập tin nhắn'
                                    underlineColorAndroid='#00B2BF'
                                    onChangeText={(value) => this.setState({ text: value })}
                                    value={this.state.text}
                                    onSubmitEditing={(event) => this.searchSubmit(event.nativeEvent.text)}
                                />
                            </View>

                            <View style={{ flex: 1 }}>
                                <TouchableOpacity
                                    style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: 50,
                                        height: 50,
                                        borderRadius: 100,
                                        backgroundColor: '#205AA7',
                                    }}
                                    onPress={ () => this.searchSubmit()} 
                                >
                                    <Entypo name="direction" size={30} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>

                    </KeyboardAvoidingView>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        infoExchangeReducer: state.get('infoExchangeReducer'),
        root: state.get('root'),
    }
}

export default connect(mapStateToProps)(InfoExchange)