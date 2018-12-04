import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import Header from './Header2';
import ItemDocument from './ItemDocument';
import dataJson from '../../data/flatListData';
import {connect} from "react-redux";
import * as documentAction from "../../actions/document-action";
import * as rootActions from "../../actions/root-actions";
import strings from "../../resources/strings";

export class DocManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flagLoad: true,
            title: 'Văn bản chờ xử lý',
            pageNo: "1",
            pageRec: "10",
            param: "",
            dataDocument: {},
        };
      }
    componentDidMount(){
        // this.props.onGetListDocumentAction(1);// chuyen vao loai van ban
    }

    checkTypeDocument = (type) =>{
        switch (type){
            case strings.vanBanChoXuLy:
                this.setState({
                    title : strings.vanBanChoXuLy,     
                });
                this.props.dispatch(documentAction.getListWaitingDocumentAction(this.state.pageNo, this.state.pageRec, this.state.param));
                break
            case strings.vanBanDaXuLy:
                this.setState({
                    title : strings.vanBanDaXuLy,     
                });
                this.props.dispatch(documentAction.getListProcessedDocumentAction(this.state.pageNo, this.state.pageRec, this.state.param));
                break
            default:
                break       
        }
    }

    componentWillMount(){
        this.props.dispatch(rootActions.controlProgress(false));
        typeDocument = this.props.documentReducer.get("typeDocument");
        this.checkTypeDocument(typeDocument);
    }

    componentDidUpdate(){
        if(this.state.flagLoad == true){
            this.setState({
                flagLoad: false,
                dataDocument: this.props.documentReducer.get('listDocumentData'),
            });

        }
    }

    gotoDocumentDetail(){
        this.props.navigation.navigate('DocumentDetail');
    }

    render() {
        return (
            <View>
                <Header myTitle = {this.state.title} 
                    navigator = {this.props.navigation}
                />
                <View style={{ backgroundColor: '#D3D3D3' }}>
                <FlatList
                    data={this.state.dataDocument} 
                    renderItem={(item) => <ItemDocument data={item} gotoDocumentDetail={this.gotoDocumentDetail.bind(this)} navigator= {this.props.navigation}/>}
                    keyExtractor={(item, index) => index.toString()}
                />
                </View>
                
            </View>
            
        );
    }
}

function mapStateToProps(state){
    return {
        documentReducer: state.get('documentReducer'),
        root: state.get('root'),
        // login: state.get('login')
    }
}
export default connect(mapStateToProps)(DocManagement)