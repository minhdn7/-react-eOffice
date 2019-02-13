import React, { Component } from 'react';
import { View, FlatList, Text, TouchableOpacity, TextInput, Alert, ToastAndroid } from 'react-native';
import Header from './Header2';
import ItemDocument from './ItemDocument';
import dataJson from '../../data/flatListData';
import { connect } from "react-redux";
import * as documentAction from "../../actions/document-action";
import * as rootActions from "../../actions/root-actions";
import strings from "../../resources/strings";
import styles from '../../styles/styleQLVanBan';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

export class DocManagement extends Component {
    constructor(props) {
        super(props);
        this.onEndReachedCalledDuringMomentum = false;
        this.state = {
            flagLoad: true,
            title: 'Văn bản chờ xử lý',
            pageNo: 1,
            pageRec: 10,
            isLoading: true,
            refreshing: false,
            param: "",
            kho: "",
            dataDocument: [],
            parameter: {
                param: '',
                status: ''
            },
            statusDoc: "CHUADOC",
        };
    }


    checkTypeDocument = (type) => {
        this.setState({
            kho: type,
        });

        if (type !== null && type != '') {
            this.setState({
                title: type,
            })
        }
        //this.props.dispatch(documentAction.getListWaitingDocumentAction(this.state.pageNo, this.state.pageRec, type, this.state.param));
        this.loadListDocByType();
    }

    onRefresh = () => {
        ToastAndroid.show("Refresh", ToastAndroid.SHORT);
        this.setState({
            dataDocument: [],
            isLoading: true,
            refreshing: false,
            pageNo: 1,
            pageRec: 10,
        });

        //this.props.dispatch(documentAction.getListWaitingDocumentAction(this.state.pageNo, this.state.pageRec, this.props.documentReducer.get("typeDocument"), this.state.param));
        this.loadListDocByType();
    }

    componentWillMount() {
        this.props.dispatch(rootActions.controlProgress(false));
        // typeDocument = this.props.documentReducer.get("typeDocument");
        this.checkTypeDocument(this.props.documentReducer.get("typeDocument"));
    }


    componentWillReceiveProps() {
        if (this.props.documentReducer.get('listDocumentData') != null
            && this.props.documentReducer.get('listDocumentData').length > 0
            && this.state.isLoading) {
            listDocumentData = this.props.documentReducer.get('listDocumentData');
            updateData = this.state.dataDocument.concat(this.props.documentReducer.get('listDocumentData'));
            // this.props.dispatch(documentAction.setListWaitingDocumentSuccess([]));
            this.setState({
                dataDocument: updateData,
                isLoading: false,
            });
        } else if (this.props.documentReducer.get('listDocumentData') != null
            && this.props.documentReducer.get('listDocumentData').length > 0) {
            this.setState({
                dataDocument: this.props.documentReducer.get('listDocumentData'),
                isLoading: false,
            });
        } else if (this.props.documentReducer.get('documentError') != null
            && this.props.documentReducer.get('documentError') != '') {
            this.props.dispatch(documentAction.setListDocumentErrorAction(''));
            ToastAndroid.show(this.props.documentReducer.get('documentError'), ToastAndroid.SHORT);
        }
    }

    gotoDocumentDetail = (item) => {

        this.props.dispatch(documentAction.setIdDocumentAction(item.id));
        this.props.dispatch(documentAction.setItemDocumentEventAction(item));
        this.props.navigation.navigate('DocumentDetail', {
            navigator: this.props.navigation,
        });
    }

    isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    loadMore = () => {
        listDocumentData = this.props.documentReducer.get('listDocumentData');
        if (this.props.documentReducer.get('listDocumentData') != null
            && this.props.documentReducer.get('listDocumentData').length >= 9) {
            ToastAndroid.show('Loading more', ToastAndroid.SHORT);
            page = this.state.pageNo + 1;
            this.setState({
                isLoading: true,
                pageNo: page,
            });
            //this.props.dispatch(documentAction.getListWaitingDocumentAction(page, this.state.pageRec, this.props.documentReducer.get("typeDocument"), this.state.param));
            this.loadListDocByType();
        } else {
            this.setState({
                isLoading: false,
            });
        }

    }

    searchSubmit(search) {
        console.log("text search", search);
        this.setState({
            pageNo: 1,
            pageRec: 10,
        });
        //this.props.dispatch(documentAction.getListWaitingDocumentAction(this.state.pageNo, this.state.pageRec, this.state.kho, search));
        this.loadListDocByType();

    }

    loadListDocByType = () => {
        let parameter;
        switch (this.props.documentReducer.get("typeDocument")) {
            case strings.vanBanXemDeBiet:
                parameter = {};
                parameter.param = this.state.param;
                parameter.status = this.state.statusDoc;
                // this.setState({
                //     parameter: parameter
                // });
                console.log("this.setState parameter: ", parameter);
                this.props.dispatch(documentAction.getListNotifyDocumentAction(this.state.pageNo, this.state.pageRec, parameter));
                break
            case strings.vanBanDaXuLy:
                parameter = {};
                parameter.param = this.state.param;
                // this.setState({
                //     parameter: {
                //         param: this.state.param,
                //         status: "",
                //     }
                // })
                this.props.dispatch(documentAction.getListProcessedDocumentAction(this.state.pageNo, this.state.pageRec, parameter));
                break
            default:
                this.props.dispatch(documentAction.getListWaitingDocumentAction(this.state.pageNo, this.state.pageRec, this.props.documentReducer.get("typeDocument"), this.state.param));
                break
        }
    }

    vbXemDeBiet_btnHandle = (type) => {
        if (this.state.statusDoc !== type) {
            let parameter = {};
            parameter.param = this.state.param;
            parameter.status = type;

            console.log("vbXemDeBiet_btnHandle ", parameter);
            this.props.dispatch(documentAction.getListNotifyDocumentAction(this.state.pageNo, this.state.pageRec, parameter));
            this.setState({
                statusDoc: type,
                // parameter: {
                //     param: this.state.param,
                //     status: type,
                // }
            });
        }
    }

    render() {
        let CheckData;
        if (this.state.dataDocument != null && this.state.dataDocument.length != 0) {
            CheckData = <View></View>
        } else {
            CheckData = <View >
                <Text style={{ textAlign: "center", fontSize: 18 }}>Không có dữ liệu...</Text>
            </View>
        }
        let dataView =
            <View>
                {
                    CheckData
                }
                <FlatList
                    data={this.state.dataDocument}
                    style={{ marginBottom: 100 }}
                    onEndReached={this.loadMore}
                    onEndReachedThreshold={0.1}
                    onRefresh={this.onRefresh}
                    refreshing={this.state.refreshing}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity

                                onPress={() => this.gotoDocumentDetail(item)}>
                                <ItemDocument item={item} index={index} navigator={this.props.navigation}>

                                </ItemDocument>
                            </TouchableOpacity>);

                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>

        // }else{
        //     dataView = <Text style={{textAlign: "center", fontSize: 18}}>Không có dữ liệu...</Text>
        // }
        return (
            <View>
                <Header myTitle={this.state.title}
                    navigator={this.props.navigation}
                />
                <View style={styles.wrapper}>
                    <View style={styles.searchSection}  >
                        <EvilIcons style={styles.searchIcon} name="search" size={20} color="#000" />
                        <TextInput
                            style={styles.textInput}
                            underlineColorAndroid='transparent'
                            placeholder='Tìm kiếm'
                            returnKeyType='search'
                            onSubmitEditing={(event) => this.searchSubmit(event.nativeEvent.text)}
                            onChangeText={(text) => this.setState({ param: text })}
                        />
                    </View>
                </View>
                {this.state.kho === strings.vanBanXemDeBiet ?
                    <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 5, paddingBottom: 5 }}>
                        <TouchableOpacity
                            style={[styles.btnChuaDoc, styles.btnXemDeBiet, this.state.statusDoc === "CHUADOC" ? styles.btnSelect : styles.btnUnSelect]}
                            onPress={() => this.vbXemDeBiet_btnHandle("CHUADOC")}
                        >
                            <Text style={[this.state.statusDoc === "CHUADOC" ? styles.btnText : styles.btnTextUnselect, { fontWeight: 'bold' }]}>{strings.vbXemDeBiet_chuaDoc}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.btnTatCa, styles.btnXemDeBiet, this.state.statusDoc === "TATCA" ? styles.btnSelect : styles.btnUnSelect]}
                            onPress={() => this.vbXemDeBiet_btnHandle("TATCA")}
                        >
                            <Text style={[this.state.statusDoc === "TATCA" ? styles.btnText : styles.btnTextUnselect, { fontWeight: 'bold' }]}>{strings.vbXemDeBiet_tatCa}</Text>
                        </TouchableOpacity>
                    </View> : null
                }


                <View>
                    {dataView}
                </View>

            </View>

        );
    }
}

function mapStateToProps(state) {
    return {
        documentReducer: state.get('documentReducer'),
        root: state.get('root'),
        // login: state.get('login')
    }

}
export default connect(mapStateToProps)(DocManagement)