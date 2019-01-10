import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, FlatList, Image, ToastAndroid } from 'react-native';
import styles from '../../styles/styleQLVanBan';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import strings from "../../resources/strings";
import DefaultHeader from '../navigation/DefaultHeader';
import { connect } from "react-redux";
import * as documentAction from "../../actions/document-action";
import * as fileAction from "../../actions/file-actions";
import loading from '../Loading';
import { Button, Container, Content, Spinner } from "native-base";
import colors from "../../resources/colors";
import * as rootActions from "../../actions/root-actions";
import { documentProcessedFlow } from '../../saga/document-saga';
import ModalDropdown from 'react-native-modal-dropdown';
import { Navigation } from 'react-native-navigation';
// test 2
let viewTrichYeu, viewSoIOffice, viewCQBH, viewSoKyHieu, viewNgayDen, viewNgayVB, viewHinhThucVB, viewDoKhan;
export class DocumentDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            documentId: '',
            dataDocument: {},
            dataFileAttack: [],
            isChuyen: true,
            isKetThuc: true,
            isDanhDau: true,
            isViewFile: false,
            isTrangThaiDanhDau: false,
            isTrangThaiKetThuc: false,
            isGetListData: false,
            danhDau: strings.danhDau,
            pageNo: 1,
            pageRec: 10,
            param: "",
            dataLogDocument: [
                {
                    "schema": "",
                    "unit": "",
                    "parameter": [
                        {
                            "fullName": "",
                            "updateBy": "",
                            "updateDate": "",
                            "status": "",
                            "comment": "",
                            "chuyenToi": "",
                            "action": "",
                            "lanhDaoChiDao": {}
                        }
                    ]
                }
            ],
        };
    }

    checkSignedDocument = () => {
        this.setState({
            isTrangThaiDanhDau: true,
        })
        this.props.dispatch(rootActions.controlProgress(true));
        this.props.dispatch(documentAction.getSignedDocumentAction(this.state.documentId));
    }

    finishDocument = () =>{
        this.setState({
            isTrangThaiKetThuc: true,
        })
        this.props.dispatch(rootActions.controlProgress(true));
        this.props.dispatch(documentAction.getFinishDocumentAction(this.state.documentId));
    }

    checkFinishDocument = () =>{
        if(this.props.documentReducer.get('finishDocumentData') != null
          && this.props.documentReducer.get('finishDocumentData').toLowerCase() == "true"
          && this.state.isTrangThaiKetThuc){
            this.props.dispatch(documentAction.setFinishDocumentSuccessAction(""));
            this.setState({
                isTrangThaiKetThuc: false,
                isGetListData: true,
            });
            ToastAndroid.show(strings.ketThucVanBanThanhCong, ToastAndroid.SHORT);
            this.props.dispatch(rootActions.controlProgress(true));
            // lấy lại danh sách văn bản
            this.props.dispatch(rootActions.controlProgress(true));

            this.props.dispatch(documentAction.getListWaitingDocumentAction(this.state.pageNo, this.state.pageRec, this.props.documentReducer.get("typeDocument"), this.state.param));
          }
        else if (this.state.isTrangThaiKetThuc
                && this.props.documentReducer.get('finishDocumentError') != null
                && this.props.documentReducer.get('finishDocumentError') == ""){
                    this.setState({
                        isTrangThaiKetThuc: false,
                    });
                    ToastAndroid.show(this.props.documentReducer.get('finishDocumentError'), ToastAndroid.SHORT);
                    this.props.dispatch(documentAction.setFinishDocumentErrorAction(""));
        }

        if(this.props.documentReducer.get('listDocumentData') != null
            && this.state.isGetListData){
            // load lại dữ liệu thành công back về màn hình list
            this.setState({
                isGetListData: false,
            });
            this.props.navigation.goBack(null);
            ToastAndroid.show("Cập nhật danh sách văn bản thành công", ToastAndroid.SHORT);
        }else if(this.props.documentReducer.get('documentError') != null
            && this.props.documentReducer.get('documentError') != ''){
                this.props.dispatch(documentAction.setListDocumentErrorAction(''));
                this.setState({
                    isGetListData: false,
                });
                ToastAndroid.show(this.props.documentReducer.get('documentError'), ToastAndroid.SHORT);
        }

    }


    checkButton(){
        itemData = this.props.documentReducer.get('itemDocumentData');

        if (itemData != null && itemData.isCheck == '0') {
            this.setState({
                isKetThuc: true,
            });
        } else {
            this.setState({
                isKetThuc: false,
            });
        }

        if (itemData != null && itemData.isChuTri.toLowerCase() == 'true') {
            this.setState({
                isChuyen: true,
            });
        } else {
            this.setState({
                isChuyen: false,
            });
        }
    }

    componentDidUpdate(){
        this.props.dispatch(rootActions.controlProgress(false));
    }
    componentWillMount(){
        this.props.dispatch(rootActions.controlProgress(false));
        this.props.dispatch(fileAction.setViewFileErrorAction(''));
        this.props.dispatch(documentAction.setSignedDocumentResultAction(""));
        this.props.dispatch(documentAction.setFinishDocumentSuccessAction(""));
        documentId = this.props.documentReducer.get('documentID');
        this.setState({
            documentId: documentId,
        });

        this.checkButton();

        if (itemData != null && itemData.isCheck == '0') {
            this.setState({
                isKetThuc: true,
            });
        } else {
            this.setState({
                isKetThuc: false,
            });
        }
        this.props.dispatch(documentAction.getDetailDocumentAction(documentId));
        this.props.dispatch(fileAction.getAttackFileAction(documentId));
        this.props.dispatch(documentAction.getCommentDocumentAction(documentId));
        this.props.dispatch(documentAction.getFinishDocumentTypeAction(documentId));
    }

    checkStatusDocument() {
        if (this.props.documentReducer.get('signedDocumentResult') != null) {
            if (this.props.documentReducer.get('signedDocumentResult').toLowerCase() == "true") {
                this.props.dispatch(documentAction.setSignedDocumentResultAction(""));
                if (this.state.danhDau == strings.danhDau && this.state.isTrangThaiDanhDau) {
                    this.setState({
                        danhDau: strings.huyDanhDau,
                        isTrangThaiDanhDau: false,
                    });
                    ToastAndroid.show(strings.huyDanhDauThanhCong, ToastAndroid.SHORT);
                }
                else if (this.state.isTrangThaiDanhDau) {
                    this.setState({
                        danhDau: strings.danhDau,
                        isTrangThaiDanhDau: false,
                    });
                    ToastAndroid.show(strings.danhDauThanhCong, ToastAndroid.SHORT);
                    return;
                }


            } else if (this.props.documentReducer.get('signedDocumentResult') != '') {
                ToastAndroid.show(this.props.documentReducer.get('signedDocumentResult'), ToastAndroid.SHORT);
            }
        }
    }

    gotoScreen(option, idDocument, title) {
        var navigation = this.props.navigation.getParam('navigator', 'NO-ID');
        if (option == 1) {
            navigation.navigate('InfoExchange', {
                idDocument: idDocument,
                title: title
            });
        }
        else if (option == 0) {
            navigation.navigate('ChuyenXuLy', {
                idDocument: idDocument,
            });
        }
        // load data
}

    componentWillReceiveProps() {

        this.checkStatusDocument();
        this.checkFinishDocument();


        if(this.props.documentReducer.get('finishDocumentData') != null && this.props.documentReducer.get('finishDocumentData').toLowerCase() == "true"){
            this.setState({
                isKetThuc: true,
            });
        } else {
            this.setState({
                isKetThuc: false,
            });
        }

        if (this.props.documentReducer.get('detailDocumentData') != null && this.props.documentReducer.get('detailDocumentData').length != 0) {
            this.setState({
                dataDocument: this.props.documentReducer.get('detailDocumentData'),
            });
        }
        if (this.props.fileReducer.get('attackFileData') != null) {
            this.setState({
                dataFileAttack: this.props.fileReducer.get('attackFileData'),
            });
        }
        if (this.props.documentReducer.get('commentDocumentData') != null && this.props.documentReducer.get('commentDocumentData').length != 0) {
            this.setState({
                dataLogDocument: this.props.documentReducer.get('commentDocumentData'),
            });
        }

        if (this.props.fileReducer.get('viewFileData') != null
            && this.props.fileReducer.get('viewFileData') != ''
            && this.state.isViewFile) {
            // Alert.alert(this.props.fileReducer.get('viewFileData'));
            this.setState({
                isViewFile: false,
            });
            this.props.navigation.navigate('ViewFile', {
                dataUrl: this.props.fileReducer.get('viewFileData'),
            });

        } else if (this.props.fileReducer.get('viewFileError') != null && this.props.fileReducer.get('viewFileError') != '') {
            Alert.alert(this.props.fileReducer.get('viewFileError'));
        }

    }

    viewFile = (item) => {
        this.setState({
            isViewFile: true,
        });
        this.props.dispatch(rootActions.controlProgress(true));
        this.props.dispatch(fileAction.getViewFileAction(item.id));

    }
    renderProgress() {
        if (this.props.root.get('progress')) {
            return this.spinner()
        } else {
            return null;
        }
    }

    spinner() {
        return (
            <Spinner
                color={colors.accentColor}
                animating={true}
                size={'large'}
                style={styles.progressStyle} />
        )
    }

    checkDetailHeader(){
        // vierw header detail

        if(this.state.dataDocument.trichYeu){
            viewTrichYeu =  <View style={styles.rowCotent}>
                                <Text style={[styles.textColor, styles.styleFontSize, {marginRight: 4}]}>{strings.trichYeu}</Text>
                                <Text style={[styles.textColorBlack, styles.styleFontSize, { fontWeight: 'bold', marginRight: 100}]}>{this.state.dataDocument.trichYeu}</Text>
                            </View>
        }else{
            viewTrichYeu = <View/>
        }

        if(this.state.dataDocument.ioffice){
            viewSoIOffice =  <View style={styles.rowCotent}>
                                <Text style={[styles.textColor, styles.styleFontSize, {marginRight: 4}]}>{strings.soIOffice}</Text>
                                <Text style={styles.textColorBlack}>{this.state.dataDocument.ioffice}</Text>
                            </View>
        }else{
            viewSoIOffice = <View/>
        }

        if(this.state.dataDocument.donViBanHanh){
            viewCQBH =  <View style={styles.rowCotent}>
                            <Text style={[styles.textColor, styles.styleFontSize, {marginRight: 4}]}>{strings.CQBH}</Text>
                            <Text style={[styles.textColorBlack, styles.styleFontSize]}>{this.state.dataDocument.donViBanHanh}</Text>
                        </View>
        }else{
            viewCQBH = <View/>
        }

        if(this.state.dataDocument.soKiHieu){
            viewSoKyHieu =  <View style={styles.rowCotent}>
                                <Text style={[styles.textColor, styles.styleFontSize, {marginRight: 4}]}>{strings.soKyHieu}</Text>
                                <Text style={[styles.textColorBlack, styles.styleFontSize, { color: 'red' }]}>{this.state.dataDocument.soKiHieu}</Text>
                            </View>
        }else{
            viewSoKyHieu = <View/>
        }

        if(this.state.dataDocument.ngayDenDi){
            viewNgayDen =   <View style={styles.rowCotent}>
                                <Text style={[styles.textColor, styles.styleFontSize, {marginRight: 4}]}>{strings.ngayDen}</Text>
                                <Text style={[styles.textColorBlack, styles.styleFontSize]}>{this.state.dataDocument.ngayDenDi}</Text>
                            </View>
        }else{
            viewNgayDen = <View/>
        }

        if(this.state.dataDocument.ngayVanBan){
            viewNgayVB =    <View style={styles.rowCotent}>
                                <Text style={[styles.textColor, styles.styleFontSize, {marginRight: 4}]}>{strings.ngayVB}</Text>
                                <Text style={[styles.textColorBlack, styles.styleFontSize]}>{this.state.dataDocument.ngayVanBan}</Text>
                            </View>
        }else{
            viewNgayVB = <View/>
        }

        if(this.state.dataDocument.hinhThucGui){
            viewHinhThucVB =    <View style={styles.rowCotent}>
                                    <Text style={[styles.textColor, styles.styleFontSize, {marginRight: 4}]}>{strings.hinhThucVB}</Text>
                                    <Text style={[styles.textColorBlack, styles.styleFontSize]}>{this.state.dataDocument.hinhThucGui}</Text>
                                </View>
        }else{
            viewHinhThucVB = <View/>
        }

        if(this.state.dataDocument.doMat){
            viewDoKhan =    <View style={styles.rowCotent}>
                                <Text style={[styles.textColor, {marginRight: 4}]}>{strings.doKhan}</Text>
                                <Text style={[styles.textColorBlack, styles.styleFontSize]}>{this.state.dataDocument.doMat}</Text>
                            </View>
        }else{
            viewDoKhan = <View/>
        }
    }

    render() {
        let dataStr = [strings.chuyenXuLy, strings.traoDoiThongTin];

        this.checkDetailHeader();
        let viewAttackFile = <View >
            <Text style={[styles.textColor, styles.styleFontSize]}>Tệp tin đính kèm:</Text>
            {/* <MaterialIcons name="insert-link" size={23} color="black" /> */}
            <FlatList
                data={this.state.dataFileAttack}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity onPress={() => this.viewFile(item)}>
                            <AttackFileItem item={item} index={index}>

                            </AttackFileItem>
                        </TouchableOpacity>);

                }}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>

        let btnChuyen = <Text />;
        let btnKetThuc = <Text />;
        let btnDanhDau = <Text />;

        if (this.state.isChuyen) {
            btnChuyen = <TouchableOpacity style={[styles.btn, { backgroundColor: '#4169E1' }]}>

                <ModalDropdown
                    options={dataStr}
                    dropdownStyle={styles.dropdownStyle}
                    dropdownTextStyle={styles.dropdownTextStyle}
                    dropdownTextHighlightStyle={styles.dropdownTextHighlightStyle}
                    onSelect={(idx, value) => this.gotoScreen(idx, this.state.dataDocument.id, this.state.dataDocument.trichYeu)}
                >
                    <Text style={styles.btnText}>{strings.chuyen}</Text>
                </ModalDropdown>
            </TouchableOpacity>;
        }

        if(this.state.isKetThuc){
            btnKetThuc =    <TouchableOpacity style={[styles.btn, { backgroundColor: '#EE7C6B' }]}
                            onPress = {() => this.finishDocument()}>
                                <Text style={styles.btnText}>{strings.ketThuc}</Text>
                            </TouchableOpacity>  
        }

        if (this.state.isDanhDau) {
            btnDanhDau = <TouchableOpacity style={[styles.btn, { backgroundColor: '#367517' }]}
                onPress={() => this.checkSignedDocument()}>
                <Text style={styles.btnText}>{this.state.danhDau}</Text>
            </TouchableOpacity>
        }



        return (
            <View style={{flex: 1, paddingBottom: 10}}>
                <DefaultHeader myTitle={strings.chiTietVanBan} navigator={this.props.navigation} />

                {/* <View style={[styles.container, {padding:0}]}> */}

                <ScrollView>
                    <View style={styles.styleCenter}>
                        <View style={styles.content}>
                            {viewTrichYeu}
                            {viewSoIOffice}
                            {viewCQBH}
                            {viewSoKyHieu}
                            {viewNgayDen}
                            {viewNgayVB}
                            {viewHinhThucVB}
                            {viewDoKhan}

                            {/* tập tin đính kèm */}
                            {
                                viewAttackFile
                            }
                            {/* 3 button chuyển, đánh dấu, kết thúc */}
                            <View style={styles.rowCotent}>

                                {btnChuyen}
                                {btnKetThuc}
                                {btnDanhDau}

                            </View>
                            <Text style={{ height: 1, borderWidth: 1, borderStyle: 'solid', borderColor: '#D7D7D7', backgroundColor: '#D7D7D7', marginTop: 5 }} />
                        </View>

                        {this.renderProgress()}
                        <Text style={{ color: '#205AA7', fontWeight: 'bold', fontSize: 16, paddingTop: 12, paddingLeft: 12 }}>Tổng hợp ý kiến xử lý</Text>

                        <View style={{ margin: 3, flex: 1, backgroundColor: '#ffffff', padding: 4 }}>
                            <View style={{ height: 40, justifyContent: 'center', backgroundColor: '#0099FF' }}>
                                <Text style={{ textAlign: 'center', color: '#ffffff', fontWeight: 'bold' }}>
                                    {this.state.dataLogDocument[0].unit}
                                </Text>
                            </View>
                            {/* FlatList commnent */}
                            <FlatList
                                data={this.state.dataLogDocument[0].parameter}
                                style={{ flex: 1}}
                                renderItem={({ item, index }) => {
                                    return (
                                        <View >
                                            <LogCommentItem item={item} index={index}>

                                            </LogCommentItem>
                                        </View>);

                                }}
                                keyExtractor={(item, index) => index.toString()}
                            />


                        </View>

                    </View>

                </ScrollView>

                {/* </View> */}
            </View>

        );
    }
}


class AttackFileItem extends Component {
    render() {
        return (
            <View style={[styles.rowCotent, { paddingLeft: 20, marginTop: 4, marginBottom: 10 }]}>
                <Image source={require('../../image/ic_file_pdf.png')} style={styles.iconStyle} />
                <Text style={{ margin: 4 }}>{this.props.item.name}</Text>
            </View>
        );
    }
}

class LogCommentItem extends Component {
    findAndReplace(string, target, replacement) {
        for (i = 0; i < string.length; i++) {
            string = string.replace(target, replacement);
        }
        return string;

    }
    render() {

        if (this.props.item.chuyenToi != null && this.props.item.chuyenToi.length > 0) {
            chuyenToi = this.findAndReplace(this.props.item.chuyenToi, "|", "\n");
        } else {
            chuyenToi = ""
        }

        return (
            <View>
                <View style={{ height: 50, justifyContent: 'space-between', backgroundColor: '#D7D7D7', flexDirection: 'row' }}>
                    <View style={{ flex: 1, flexDirection: 'column', paddingTop: 5, paddingLeft: 5 }}>
                        <Text style={{ fontWeight: 'bold' }}>{this.props.item.fullName}</Text>
                        <Text>({this.props.item.updateBy})</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-end', paddingTop: 5, paddingRight: 4 }}>
                        <Text>{this.props.item.updateDate}</Text>

                    </View>
                </View>
                <Text style={{ marginLeft: 10, padding: 4, color: '#205AA7' }}>{this.props.item.comment}</Text>
                <View style={{ height: 1, backgroundColor: '#D7D7D7' }} />
                <View style={{ margin: 5, backgroundColor: '#ffffff' }}>
                    <View >
                        <Text style={{ marginLeft: 10 }}>{chuyenToi}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        documentReducer: state.get('documentReducer'),
        fileReducer: state.get('fileReducer'),
        root: state.get('root'),
        login: state.get('login'),

    }
}
export default connect(mapStateToProps)(DocumentDetail)
