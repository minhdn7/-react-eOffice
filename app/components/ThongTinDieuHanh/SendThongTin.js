import React, { Component } from "react";
import { Image, Text, View, Alert, TouchableOpacity, StyleSheet, TextInput, ScrollView } from "react-native";
import { Container, Content, Spinner, Button } from "native-base";
import strings from "../../resources/strings";

import DefaultHeader from '../navigation/DefaultHeader';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import * as thongTinDieuHanhAction from '../../actions/thongTinDieuHanh-actions';

export class SendThongTin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtTitle: '',
      txtContent: '',
      id: '',
      titleHeader: '',
      lstFile: [],

    };
  }

  componentWillMount(){
    let id = this.props.navigation.getParam('id', '');
    let titleHeader = this.props.navigation.getParam('title', '');
    this.setState({
      id: id,
      titleHeader: titleHeader,
    })
  }

  componentDidMount(){
    let id = this.state.id;
    if(id !== null && id !== ""){
      this.props.dispatch(thongTinDieuHanhAction.getDetailByIdAction(id));
      this.props.dispatch(thongTinDieuHanhAction.getListFilesByIdAction(id));
    }
  }

  componentWillReceiveProps(){
    let userDetail = this.props.thongTinDieuHanhReducer.get('userDetail');
    let lstFile = this.props.thongTinDieuHanhReducer.get('lstFiles');
    if(userDetail !== null && userDetail !== "undefined"){
      this.setState({
        txtTitle: userDetail.tieuDe,
        txtContent: userDetail.noiDung
      });
    }
    if(lstFile !== null && lstFile.length > 0){
      this.setState({
        lstFile: lstFile,
      })
    }
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

  render() {

    return (
      <View style={{ flex: 1 }}>
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

          <View style={itemStyles.bottomStyle}>
            <Button style={[itemStyles.styleBtn, { backgroundColor: '#D3D3D3' }]}>
              <Text style={{ color: 'black' }}>{strings.luuNhap}</Text>
            </Button>

            <Button style={[itemStyles.styleBtn, { backgroundColor: '#205AA7' }]}>
              <Text style={{ color: 'white' }}>{strings.chonNguoiNhan}</Text>
            </Button>
          </View>
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

