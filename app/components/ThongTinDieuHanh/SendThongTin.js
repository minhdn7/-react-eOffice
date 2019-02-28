import React, { Component } from "react";
import { Image, Text, View, Alert, TouchableOpacity, StyleSheet, TextInput, ScrollView } from "react-native";
import { Container, Content, Spinner, Button } from "native-base";
import strings from "../../resources/strings";
import { connect } from "react-redux";
import DefaultHeader from '../navigation/DefaultHeader';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import * as thongTinDieuHanhAction from '../../actions/thongTinDieuHanh-actions';
import Loading from '../DD_Loading';
import Toast from 'react-native-simple-toast';
import * as Util from "../../utils/Utils";

export class SendThongTin extends Component {
  constructor(props) {
    super(props);
    this.delayTimer = null;
    this.state = {
      txtTitle: '',
      txtContent: '',
      id: '',
      titleHeader: '',
      lstFile: [],
      lstDeleteFile: [],
      parentId: '',
      actionType: '',

    };
  }

  componentWillMount() {
    try {
      let id = this.props.navigation.getParam('id', '');
      let titleHeader = this.props.navigation.getParam('title', '');
      let type = this.props.navigation.getParam('type', '');
      let item = this.props.navigation.getParam('item', '');

      this.setState({
        id: id,
        titleHeader: titleHeader,
      });

      this._redirectByType(type, item);
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    let id = this.state.id;
    if (id !== null && id !== "" && id !== "undefined") {
      this.props.dispatch(thongTinDieuHanhAction.getDetailByIdAction(id));
      this.props.dispatch(thongTinDieuHanhAction.getListFilesByIdAction(id));
    }
  }

  componentWillReceiveProps() {
    let userDetail = this.props.thongTinDieuHanhReducer.get('userDetail');
    //let lstFile = this.props.thongTinDieuHanhReducer.get('lstFiles');
    if (!Util.isEmpty(userDetail)) {
      this.setState({
        txtTitle: userDetail.tieuDe !== "undefined" ? userDetail.tieuDe : '',
        txtContent: userDetail.noiDung !== "undefined" ? userDetail.noiDung : '',
      });
    }
    // if (lstFile && lstFile.length) {
    //   this.setState({
    //     lstFile: lstFile,
    //   })
    // }
  }

  static navigationOptions = {
    visible: true,
  }

  _pickFile = () => {
    console.log("co vao day");
    DocumentPicker.show({
      filetype: [DocumentPickerUtil.allFiles()],
    }, (error, res) => {
      // Android
      console.log(
        res.uri,
        res.type, // mime type
        res.fileName,
        res.fileSize
      );
    });
  }

  _redirectByType = (type, item) => {
    switch (type) {
      case 'ChuyenTiep':
        this.setState({
          titleHeader: strings.chuyenTiep,
          txtTitle: "ChT: " + item.tieuDe,
          txtContent: item.noiDung,
          parentId: item.id,
          actionType: type,
        });
        break;
      case 'TraLoi':
        this.setState({
          titleHeader: strings.traLoi,
          txtTitle: "TrL: " + item.tieuDe,
          parentId: item.id,
          actionType: type,
        });
        break;
      case 'TraLoiTatCa':
        this.setState({
          titleHeader: strings.traLoiTatCa,
          txtTitle: "TrL: " + item.tieuDe,
          parentId: item.id,
          actionType: type,
        });
        break;
    }
  }

  _createHandle = () => {
    let chuyenTiep = (this.state.actionType && this.state.actionType === "ChuyenTiep") ? 0 : 1;
    const { deleteFiles, files, noiDung, parentId, tieuDe } = this.state;
    let id = '';
    this.props.dispatch(thongTinDieuHanhAction.createAction(chuyenTiep, deleteFiles, files, id, noiDung, parentId, tieuDe));

    let result = this.props.thongTinDieuHanhReducer.get('createResult');
    if (result) {
      this._handleCreateSucess();
    } else {
      clearTimeout(this.delayTimer);
      this.delayTimer = setTimeout(
        () => {
          let result = this.props.thongTinDieuHanhReducer.get('createResult');
          if(result){
            this._handleCreateSucess();
          }else{
            let message = this.props.thongTinDieuHanhReducer.get('error');
            console.log("loi: ", message);
            Toast.show(strings.messageServerError);
          }
        },
        1000
      )
    }
  }

  _handleCreateSucess = () => {
    this.props.dispatch(thongTinDieuHanhAction.createSucessAction(''));
    Toast.show(strings.luuThongTinThanhCong);
    //this.props.navigation.push('DocManagement');
    this.props.navigation.goBack(null);
  }

  _renderButton = () => {
    if (this.state.actionType === 'TraLoi' || this.state.actionType === 'TraLoiTatCa') {
      return (
        <View style={itemStyles.bottomStyle}>
          <Button 
          style={[itemStyles.styleBtn, { backgroundColor: '#205AA7' }]}
          onPress={() => this._createHandle()}
          >
            <Text style={{ color: 'black' }}>{strings.gui}</Text>
          </Button>

          <Button style={[itemStyles.styleBtn, { backgroundColor: '#205AA7' }]}>
            <Text style={{ color: 'white' }}>{strings.themNguoiNhan}</Text>
          </Button>
        </View>
      );
    } else {
      return (
        <View style={itemStyles.bottomStyle}>
          <Button
            style={[itemStyles.styleBtn, { backgroundColor: '#D3D3D3' }]}
            onPress={() => this._createHandle()}
          >
            <Text style={{ color: 'black' }}>{strings.luuNhap}</Text>
          </Button>

          <Button style={[itemStyles.styleBtn, { backgroundColor: '#205AA7' }]}>
            <Text style={{ color: 'white' }}>{strings.chonNguoiNhan}</Text>
          </Button>
        </View>
      );
    }
  }

  render() {

    return (
      <View style={{ flex: 1 }}>
        <Loading />
        <DefaultHeader myTitle={this.state.titleHeader} navigator={this.props.navigation} />
        <View style={itemStyles.containerStyle}>
          <View style={{ flex: 2 }}>
            <Text>
              {strings.tieuDe}
              <Text style={{ color: 'red' }}>  *</Text>
            </Text>
            <TextInput
              style={itemStyles.editTextStyle}
              onChangeText={(text) => this.setState({ txtTitle: text })}
              value={this.state.txtTitle}
            ></TextInput>
          </View>

          <View style={{ flex: 5 }}>
            <Text> {strings.noiDung}</Text>
            <TextInput
              style={[itemStyles.editTextStyle, { height: 180 }]}
              onChangeText={(text) => this.setState({ txtContent: text })}
              value={this.state.txtContent}
              multiline={true}
            ></TextInput>
          </View>

          <View style={itemStyles.rowStyle}>
            <View style={{ alignItems: 'center' }}>
              <Text style={itemStyles.textStyle} >{strings.tapDinhKem + ": "}</Text>
            </View>
            <Image source={require('../../image/ic_file_attach.png')} style={{ height: 25, width: 25 }} />
            <View style={{ alignItems: 'center' }}>
              <Text
                style={{ color: 'dodgerblue', textDecorationLine: 'underline', fontSize: 20 }}
                onPress={() => this._pickFile()} >
                {strings.chonTep}
              </Text>
            </View>
          </View>

          {this._renderButton()}
        </View>

      </View>
    )
  }

}

const itemStyles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    flexDirection: 'column',
    margin: 8
  },
  rowStyle: {
    flex: 5,
    marginTop: 10,
    flexDirection: 'row',
  },
  bottomStyle: {
    flex: 1,
    flexDirection: 'row',
    //padding: 2,
    marginTop: 2,
    marginBottom: 4,
    borderTopWidth: 1,
    borderTopColor: '#BEBEBE',
  },
  editTextStyle: {
    height: 40,
    margin: 4,
    borderRadius: 4,
    borderWidth: 1,
    padding: 4,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  textStyle: {
    color: 'dimgrey',
    padding: 3,
  },
  buttonStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 4,
    borderRadius: 4,
    borderWidth: 1,
    padding: 4,
    justifyContent: "center"
  },
  flatListItem: {
    color: 'white',
    padding: 10,
    fontSize: 16,
  },
  styleBtn: { flex: 5, justifyContent: 'center', borderRadius: 5, margin: 3 }
});

function mapStateToProps(state) {
  return {
    thongTinDieuHanhReducer: state.get('thongTinDieuHanhReducer'),
  }
}

export default connect(mapStateToProps)(SendThongTin);

