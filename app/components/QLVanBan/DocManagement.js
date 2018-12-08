import React, { Component } from 'react';
import { View, FlatList, Text, TouchableOpacity, TextInput } from 'react-native';
import Header from './Header2';
import ItemDocument from './ItemDocument';
import dataJson from '../../data/flatListData';
import {connect} from "react-redux";
import * as documentAction from "../../actions/document-action";
import * as rootActions from "../../actions/root-actions";
import strings from "../../resources/strings";
import styles from '../../styles/styleQLVanBan';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

export class DocManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flagLoad: true,
            title: 'Văn bản chờ xử lý',
            pageNo: "1",
            pageRec: "10",
            param: "",
            kho: "",
            dataDocument: [],
            
        };
      }


    checkTypeDocument = (type) =>{
        this.setState({
            kho: type,
        });
        console.log('kho', this.state.kho);
        console.log('type', this.state.type);
        this.props.dispatch(documentAction.getListWaitingDocumentAction(this.state.pageNo, this.state.pageRec, type, this.state.param));
        // switch (type){
        //     case strings.vanBanChoXuLy:
        //         this.setState({
        //             title : strings.vanBanChoXuLy,     
        //         });
        //         this.props.dispatch(documentAction.getListWaitingDocumentAction(this.state.pageNo, this.state.pageRec, this.state.param));
        //         break
        //     case strings.vanBanDaXuLy:
        //         this.setState({
        //             title : strings.vanBanDaXuLy,     
        //         });
        //         this.props.dispatch(documentAction.getListProcessedDocumentAction(this.state.pageNo, this.state.pageRec, this.state.param));
        //         break
        //     default:
        //         break  
        // }
    }

    componentWillMount(){
        this.props.dispatch(rootActions.controlProgress(false));
        // typeDocument = this.props.documentReducer.get("typeDocument");
        this.checkTypeDocument(this.props.documentReducer.get("typeDocument"));
    }


    componentWillReceiveProps(){
        this.setState({
            dataDocument: this.props.documentReducer.get('listDocumentData'),
        });
    }

    gotoDocumentDetail = () =>{
        this.props.navigation.navigate('DocumentDetail');
    }

    isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    searchSubmit(search){
        console.log("text search", search);
        this.props.dispatch(documentAction.getListWaitingDocumentAction(this.state.pageNo, this.state.pageRec, this.state.kho, search));
        // switch (this.props.documentReducer.get("typeDocument")){
        //     case strings.vanBanChoXuLy:
        //         this.props.dispatch(documentAction.getListWaitingDocumentAction(this.state.pageNo, this.state.pageRec, search));
        //         break
        //     case strings.vanBanDaXuLy:
        //         this.props.dispatch(documentAction.getListProcessedDocumentAction(this.state.pageNo, this.state.pageRec, search));
        //         break
        //     default:
        //         break 
        // }
        
    }

    render() {
        let dataView;
        if(this.state.dataDocument != null && this.state.dataDocument.length != 0){
            dataView =      <FlatList
                            data={this.state.dataDocument} 
                            renderItem={({item, index})=>{
                            return (
                                <TouchableOpacity onPress={ () => this.gotoDocumentDetail()}>
                                    <ItemDocument item={item} index={index} navigator= {this.props.navigation}>
                                    
                                    </ItemDocument>
                                </TouchableOpacity>);
                
                            }}
                            keyExtractor={(item, index) => index.toString()}
                            />
        }else{
            dataView = <Text style={{textAlign: "center", fontSize: 18}}>Không có dữ liệu...</Text>
        }
        return (
            <View>
                <Header myTitle = {this.state.title} 
                    navigator = {this.props.navigation}
                />
                <View style={styles.wrapper}>
                    <View style={styles.searchSection}  >
                        <EvilIcons style={styles.searchIcon} name="search" size={20} color="#000" />
                        <TextInput
                            style={styles.textInput}
                            underlineColorAndroid='transparent'
                            placeholder='Tìm kiếm'
                            returnKeyType='search'
                            onSubmitEditing={(event) => this.searchSubmit( event.nativeEvent.text )}

                        />
                    </View>
                </View>

                <View style={{ backgroundColor: '#D3D3D3' }}>

                    {dataView}


  
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