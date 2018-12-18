import React, { Component } from 'react';
import { View, FlatList, Text, TouchableOpacity, TextInput, Alert, ToastAndroid } from 'react-native';
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
        this.onEndReachedCalledDuringMomentum = true;
        this.state = {
            flagLoad: true,
            title: 'Văn bản chờ xử lý',
            pageNo: 1,
            pageRec: 10,
            isLoadMore: true,
            param: "",
            kho: "",
            dataDocument: [],

        };
      }


    checkTypeDocument = (type) =>{
        this.setState({
            kho: type,
        });

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
        if(this.props.documentReducer.get('listDocumentData') != null
        && this.props.documentReducer.get('listDocumentData').length > 0
        && this.state.isLoadMore){
            updateData = this.state.dataDocument.concat(this.props.documentReducer.get('listDocumentData'));
            this.props.dispatch(documentAction.setListWaitingDocumentSuccess([]));
            this.setState({
                dataDocument: updateData,
                isLoadMore: false,
            });
        }else if(this.props.documentReducer.get('documentError') != null
            && this.props.documentReducer.get('documentError') != ''){
                this.props.dispatch(documentAction.setListDocumentErrorAction(''));
                ToastAndroid.show(this.props.documentReducer.get('documentError'), ToastAndroid.SHORT);
            }

    }

    gotoDocumentDetail = (item) =>{

        this.props.dispatch(documentAction.setIdDocumentAction(item.id));
        this.props.dispatch(documentAction.setItemDocumentEventAction(item));
        this.props.navigation.navigate('DocumentDetail');
    }

    isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    loadMore = () => {
        if(this.props.documentReducer.get('listDocumentData') != null
        && this.props.documentReducer.get('listDocumentData').length >= 10)
        {
            this.setState({
                isLoadMore: true,
                pageNo: this.state.pageNo + 1,
            });
            this.props.dispatch(documentAction.getListWaitingDocumentAction(this.state.pageNo, this.state.pageRec, this.props.documentReducer.get("typeDocument"), this.state.param));
        }else{
            this.setState({
                isLoadMore: false,
            });
        }

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
                            style={{marginBottom: 100}}
                            onEndReached={() => this.loadMore()}
                            onEndReachedThreshold={0.5}
                            renderItem={({item, index})=>{
                            return (
                                <TouchableOpacity 

                                onPress={ () => this.gotoDocumentDetail(item)}>
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