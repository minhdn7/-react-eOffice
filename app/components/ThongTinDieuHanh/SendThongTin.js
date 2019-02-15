import React, { Component } from "react";
import { Image, Text, View, Alert, TouchableOpacity, StyleSheet, TextInput, ScrollView } from "react-native";
import { Container, Content, Spinner, Button } from "native-base";
import { Navigation, StatusBar } from 'react-native-navigation';
import strings from "../../resources/strings";
import * as detailsActions from "../../actions/details-actions";
import Color from 'react-native-material-color';
import PropTypes from 'prop-types';

import DefaultHeader from '../navigation/DefaultHeader';
import flatListData from '../../data/flatListData';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Moment from 'moment';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';

export default class ChiTietDieuHanh extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Huỳnh Thị Trần Lê",
      date: "25/10/2018",
      sendingName: "ttdh gửi",
      description: "abc",
      guiToi: 'Bạn và 21 người khác',
      txtTitle: '',
      txtContent: '',

    };
  }

  static navigationOptions = {
    visible: true,
  }

  _pickFile = () => {
    console.log("co vao day");
    DocumentPicker.show({
      filetype: [DocumentPickerUtil.images()],
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
        <DefaultHeader myTitle="Gửi thông tin điều hành" navigator={this.props.navigation} />
        <View style={itemStyles.containerStyle}>
          <View style={{ flex: 2 }}>
            <Text>
              {strings.tieuDe}
              <Text style={{ color: 'red' }}>  *</Text>
            </Text>
            <TextInput
              style={itemStyles.editTextStyle}
              onChangeText={(text) => this.setState({ txtTitle: text })}
            ></TextInput>
          </View>

          <View style={{ flex: 5 }}>
            <Text> {strings.noiDung}</Text>
            <TextInput
              style={[itemStyles.editTextStyle, { height: 180 }]}
              onChangeText={(text) => this.setState({ txtContent: text })}
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

