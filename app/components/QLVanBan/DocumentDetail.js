import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, FlatList, Image } from 'react-native';
import styles from '../../styles/styleQLVanBan';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import strings from "../../resources/strings";
import DefaultHeader from '../navigation/DefaultHeader';
import {connect} from "react-redux";
import * as documentAction from "../../actions/document-action";
import * as fileAction from "../../actions/file-actions";
// test 2

export class DocumentDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            documentId : '',
            dataDocument: {},
            dataFileAttack: [],
            isChuyen: true,
            isKetThuc: false,
            isDanhDau: true,
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

    componentWillMount(){
        documentId = this.props.documentReducer.get('documentID');
        this.setState({
            documentId: documentId,
        });

        this.props.dispatch(documentAction.getDetailDocumentAction(documentId));
        this.props.dispatch(fileAction.getAttackFileAction(documentId));
        this.props.dispatch(documentAction.getCommentDocumentAction(documentId));
    }

    componentWillReceiveProps(){
        if(this.props.documentReducer.get('detailDocumentData') != null && this.props.documentReducer.get('detailDocumentData').length != 0){
            this.setState({
                dataDocument: this.props.documentReducer.get('detailDocumentData'),               
            });
        }
        if(this.props.fileReducer.get('attackFileData') != null){
            this.setState({
                dataFileAttack: this.props.fileReducer.get('attackFileData'),               
            });
        }
        if(this.props.documentReducer.get('commentDocumentData') != null && this.props.documentReducer.get('commentDocumentData').length != 0){
            this.setState({
                dataLogDocument: this.props.documentReducer.get('commentDocumentData'),               
            });
        }

    }

    render() {
        let viewAttackFile = <View >
                                <Text style={[styles.textColor, styles.styleFontSize]}>Tệp tin đính kèm:</Text>
                                {/* <MaterialIcons name="insert-link" size={23} color="black" /> */}
                                <FlatList
                                    data={this.state.dataFileAttack} 
                                    renderItem={({item, index})=>{
                                    return (
                                        <TouchableOpacity >
                                            <AttackFileItem item={item} index={index}>
                                            
                                            </AttackFileItem>
                                        </TouchableOpacity>);
                        
                                    }}
                                    keyExtractor={(item, index) => index.toString()}
                                    />
                            </View>

        let btnChuyen = <Text/>;
        let btnKetThuc = <Text/>;
        let btnDanhDau = <View/>;
              
        if(this.state.isChuyen){
            btnChuyen =     <TouchableOpacity style={[styles.btn, { backgroundColor: '#4169E1' }]}>
                                    <Text style={styles.btnText}>{strings.chuyen}</Text>
                                </TouchableOpacity>;
        }

        if(this.state.isKetThuc){
            btnKetThuc =    <TouchableOpacity style={[styles.btn, { backgroundColor: '#EE7C6B' }]}>
                                <Text style={styles.btnText}>{strings.ketThuc}</Text>
                            </TouchableOpacity>  
        }

        if(this.state.isDanhDau){
            btnDanhDau =    <TouchableOpacity style={[styles.btn, { backgroundColor: '#367517' }]}>
                                <Text style={styles.btnText}>{strings.danhDau}</Text>
                            </TouchableOpacity>
        }
                                        


        return (
            <View>
                <DefaultHeader myTitle= {strings.chiTietVanBan} navigator= {this.props.navigation} />
            
                {/* <View style={[styles.container, {padding:0}]}> */}
           
                <ScrollView>
                    <View style={styles.styleCenter}>
                        <View style={styles.content}>
                            <View style={styles.rowCotent}>
                                <Text style={[styles.textColor, styles.styleFontSize]}>Trích yếu: </Text>
                                <Text style={[styles.textColorBlack, styles.styleFontSize, { fontWeight: 'bold' }]}>{this.state.dataDocument.trichYeu}</Text>
                            </View>
                            <View style={styles.rowCotent}>
                                <Text style={[styles.textColor, styles.styleFontSize]}>Số ioffice: </Text>
                                <Text style={styles.textColorBlack}>{this.state.dataDocument.ioffice}</Text>
                            </View>
                            <View style={styles.rowCotent}>
                                <Text style={[styles.textColor, styles.styleFontSize]}>CQBH: </Text>
                                <Text style={[styles.textColorBlack, styles.styleFontSize]}>{this.state.dataDocument.donViBanHanh}</Text>
                            </View>
                            <View style={styles.rowCotent}>
                                <Text style={[styles.textColor, styles.styleFontSize]}>Số ký hiệu: </Text>
                                <Text style={[styles.textColorBlack, styles.styleFontSize, { color: 'red' }]}>{this.state.dataDocument.soKiHieu}</Text>
                            </View>
                            <View style={styles.rowCotent}>
                                <Text style={[styles.textColor, styles.styleFontSize]}>Ngày đến:</Text>
                                <Text style={[styles.textColorBlack, styles.styleFontSize]}>{this.state.dataDocument.ngayDenDi}</Text>
                            </View>
                            <View style={styles.rowCotent}>
                                <Text style={[styles.textColor, styles.styleFontSize]}>Ngày VB:</Text>
                                <Text style={[styles.textColorBlack, styles.styleFontSize]}>{this.state.dataDocument.ngayVanBan}</Text>
                            </View>
                            <View style={styles.rowCotent}>
                                <Text style={[styles.textColor, styles.styleFontSize]}>Hình thức VB:</Text>
                                <Text style={[styles.textColorBlack, styles.styleFontSize]}>{this.state.dataDocument.hinhThucGui}</Text>
                            </View>
                            <View style={styles.rowCotent}>
                                <Text style={styles.textColor}>Độ khẩn:</Text>
                                <Text style={[styles.textColorBlack, styles.styleFontSize]}>{this.state.dataDocument.doMat}</Text>
                            </View>

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
                                    style={{flex: 1}}
                                    renderItem={({item, index})=>{
                                    return (
                                        <TouchableOpacity >
                                            <LogCommentItem item={item} index={index}>
                                            
                                            </LogCommentItem>
                                        </TouchableOpacity>);
                        
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
            <View style={[styles.rowCotent, {paddingLeft: 20, marginTop: 4, marginBottom: 10}]}> 
                <Image source={require('../../image/ic_file_pdf.png')} style={styles.iconStyle}/>
                <Text style={{margin: 4}}>{this.props.item.name}</Text>
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

        if(this.props.item.chuyenToi != null && this.props.item.chuyenToi.length > 0){
            chuyenToi = this.findAndReplace(this.props.item.chuyenToi, "|", "\n");   
        }else{
            chuyenToi = ""
        }
      
        return (        
            <View>
                    <View style={{ height: 50, justifyContent: 'space-between', backgroundColor: '#D7D7D7', flexDirection: 'row' }}>
                            <View style={{ flex : 1, flexDirection: 'column', paddingTop: 5, paddingLeft: 5 }}>
                                <Text style={{ fontWeight: 'bold' }}>{this.props.item.fullName}</Text>
                                <Text>({this.props.item.updateBy})</Text>
                            </View>
                            <View style={{ flex : 1, flexDirection: 'column', alignItems: 'flex-end', paddingTop: 5, paddingRight: 4 }}>
                                <Text>{this.props.item.updateDate}</Text>

                            </View>
                        </View>
                        <Text style={{ marginLeft: 10, padding: 4, color: '#205AA7'}}>{this.props.item.comment}</Text>
                        <View style={{ height: 1, backgroundColor: '#D7D7D7'}}/>
                        <View style={{ margin: 5, backgroundColor: '#ffffff' }}>
                            <View >
                                <Text style={{ marginLeft: 10 }}>{chuyenToi}</Text>
                            </View>
                        </View>
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
export default connect(mapStateToProps)(DocumentDetail)
