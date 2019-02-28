import React, { Component } from "react";
import { Image, Text, View, Alert, TouchableOpacity, StyleSheet, TextInput, Input, FlatList, TouchableWithoutFeedback } from "react-native";
import { connect } from "react-redux";
import strings from "../../resources/strings";
import * as thongTinDieuHanhActions from "../../actions/thongTinDieuHanh-actions";
import DefaultHeader from '../navigation/DefaultHeader';
import flatListData from '../../data/flatListData';
import AntDesign from 'react-native-vector-icons/AntDesign';

export class ChiTietDieuHanh extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Huỳnh Thị Trần Lê",
      date: "25/10/2018",
      sendingName: "ttdh gửi",
      description: "abc",
      guiToi: 'Bạn và 21 người khác',
      id: '',
      lstFlow: [],
    };
  }

  componentWillMount() {
    try {
      let id = this.props.navigation.getParam('id', '');
      this.setState({
        id: id
      });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    let id = this.state.id;
    if (id !== null && id !== '' && id !== "undefined") {
      this.props.dispatch(thongTinDieuHanhActions.getFlowByIdAction(id));
    }
  }

  // componentWillReceiveProps() {
  //   let lstFlow = this.props.thongTinDieuHanhReducer.get('lstFlow');
  //   if (lstFlow !== null && lstFlow !== "undefined") {
  //     this.setState({
  //       lstFlow: lstFlow,
  //     })
  //   }
  // }

  _handleButtonParent = (type, item) => {
    this.props.navigation.navigate('SendThongTin', {
      type: type,
      item: item
    });
  }

  openListPerson = () => {
    this.props.navigation.navigate('DanhSachNhan');
  }

  static navigationOptions = {
    visible: true,
  }

  _renderGuiToi = (userCount) => {
    let tmp;
    let guiToi = "";
    if (userCount) {
      tmp = userCount.split('|');
      if (tmp && tmp.length) {
        guiToi = tmp[1] === '1' ? "Bạn và " + tmp[0] + " người khác" : tmp[0] + " người khác";
      }
    }
    return (
      <TouchableOpacity style={{ flex: 1, flexDirection: 'row', margin: 5, alignItems: 'center' }} onPress={() => this.openListPerson()}>
        <View style={{ flex: 10, flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('../../image/ic_list_receive.png')}
            style={{ width: 25, height: 25 }} />
          <Text>{strings.guiToi}</Text>
          <Text style={{ fontWeight: 'bold', marginLeft: 4 }}>{guiToi}</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <AntDesign name="right" size={23} color="black" />
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    let infoFlowParent = {};
    let lstFlow = this.props.thongTinDieuHanhReducer.get('lstFlow');
    if (lstFlow && lstFlow.length) {
      infoFlowParent = lstFlow[0];

    }
    return (
      <View style={{ flex: 1 }}>
        <DefaultHeader myTitle="Chi tiết thông tin điều hành" navigator={this.props.navigation} />
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, flexDirection: 'row', margin: 8 }}>
            <Image style={{ width: 50, height: 50 }}
              source={require('../../image/ic_avatar.png')} />

            <View style={{ flex: 8, flexDirection: "column", padding: 4 }}>
              <Text style={{ color: 'blue', fontWeight: 'bold' }}>{infoFlowParent.tenNguoiTao}</Text>
              <Text>{infoFlowParent.ngayTao}</Text>
            </View>
          </View>
          <View style={{ flex: 2, flexDirection: 'column', margin: 4 }}>
            <Text style={{ paddingLeft: 12, fontWeight: 'bold' }}>{infoFlowParent.tieuDe}</Text>
            <Text style={{ paddingLeft: 12 }}>{infoFlowParent.noiDung}</Text>
          </View>
          <View style={{ height: 1, backgroundColor: 'gray' }} />
          <View style={{ flex: 1, flexDirection: 'row', margin: 4, justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20 }}>
            <TouchableOpacity
              style={{ flexDirection: 'row', margin: 4, alignItems: 'center' }}
              onPress={() => this._handleButtonParent("ChuyenTiep", infoFlowParent)}
            >
              <Image source={require('../../image/ic_forward.png')}
                style={{ width: 25, height: 25 }} />
              <Text>{strings.chuyenTiep}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ flexDirection: 'row', margin: 4, alignItems: 'center' }}
              onPress={() => this._handleButtonParent("TraLoi", infoFlowParent)}
            >
              <Image source={require('../../image/ic_reply.png')}
                style={{ width: 25, height: 25 }} />
              <Text>{strings.traLoi}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ flexDirection: 'row', margin: 4, alignItems: 'center' }}
              onPress={() => this._handleButtonParent("TraLoiTatCa", infoFlowParent)}
            >
              <Image source={require('../../image/ic_reply_all.png')}
                style={{ width: 25, height: 25 }} />
              <Text>{strings.traLoiTatCa}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: 1, backgroundColor: 'gray' }} />

          {this._renderGuiToi(infoFlowParent.userCount)}

          <View style={{ height: 1, backgroundColor: 'gray', marginBottom: 10 }} />

          <View style={{ flex: 8, flexDirection: 'row' }}>
            <FlatList
              data={flatListData}
              renderItem={({ item, index }) => {
                return (
                  <View>
                    <FlatListItem item={item} index={index} >

                    </FlatListItem>
                  </View>);
              }}
            >
            </FlatList>
          </View>
        </View>
      </View>
    )
  }

}

class FlatListItem extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white', flexDirection: 'row', margin: 4 }}>
        <Image style={{ width: 80, height: 80 }}
          source={require('../../image/ic_avatar.png')} />
        <View style={{
          flex: 1,
          flexDirection: 'column',
          backgroundColor: 'gainsboro',
          padding: 8,
          paddingLeft: 4,
          borderRadius: 10,
        }}>
          <Text style={{ fontWeight: 'bold', marginLeft: 8 }}>{this.props.item.name}</Text>
          <Text style={{ flex: 7, marginLeft: 8 }}>{this.props.item.time}</Text>
          <View style={{ flex: 1, flexDirection: 'row', marginLeft: 8 }}>
            <Text style={{ fontWeight: 'bold' }}>{strings.trL}</Text>
            <Text style={{ fontWeight: 'bold' }}>{this.props.item.nameSend}</Text>
          </View>
          <Text style={{ flex: 1, marginLeft: 8 }}>{this.props.item.foodDescription}</Text>

          <View style={{ flexDirection: 'row', marginTop: 4, marginBottom: 2, justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20 }}>
            <View style={{ flexDirection: 'row', marginLeft: 4, alignItems: 'center' }}>
              <Image source={require('../../image/ic_forward.png')}
                style={{ width: 25, height: 25 }} />
              <Text>{strings.chuyenTiep}</Text>
            </View>

            <View style={{ flexDirection: 'row', marginLeft: 4, alignItems: 'center' }}>
              <Image source={require('../../image/ic_reply.png')}
                style={{ width: 25, height: 25 }} />
              <Text>{strings.traLoi}</Text>
            </View>

            <View style={{ flexDirection: 'row', marginLeft: 4, alignItems: 'center' }}>
              <Image source={require('../../image/ic_reply_all.png')}
                style={{ width: 25, height: 25 }} />
              <Text>{strings.traLoiTatCa}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    thongTinDieuHanhReducer: state.get('thongTinDieuHanhReducer'),
  }
}

export default connect(mapStateToProps)(ChiTietDieuHanh);

