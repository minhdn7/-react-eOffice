import React, { Component } from "react";
import { Image, Text, View, Alert, TouchableOpacity, StyleSheet, TextInput, FlatList, ActivityIndicator } from "react-native";
import strings from "../../resources/strings";
import * as thongTinDieuHanhActions from "../../actions/thongTinDieuHanh-actions";
import DefaultHeader from '../navigation/DefaultHeader';
import flatListData from '../../data/flatListData';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import styles from '../../styles/styleQLVanBan';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
import Loading from "../DD_Loading";

export class DanhSachNhan extends Component {
  constructor(props) {
    super(props);
    this.delayTimer = null;
    this.state = {
      pageNo: 1,
      pageRec: 10,
      isRefresh: false,
      isLoadMore: false,
      loading: false,
      txtSearch: '',
      id: '',
      name: '',
      lstUserReceiver: [],
      isDateTimePickerVisible: false,
      isStartDate: true,
      startDate: 'Từ ngày',
      endDate: 'Đến ngày',
    };
  }

  componentWillMount() {
    let id = this.props.thongTinDieuHanhReducer.get('idInfo');
    if (id) {
      this.setState({
        id: id,
      })
    }
  }

  componentDidMount() {
    this._fetchData();
  }

  _loadMoreHandle = () => {
    let lstData = this.props.thongTinDieuHanhReducer.get('lstUserReceiver');
    if (lstData != null && lstData.length >= 9) {
      Toast.show(strings.loadingMore);
      this.setState({
        isLoadMore: true,
        pageNo: this.state.pageNo + 1,
      }, () => this._fetchData());
    }
    //this._fetchData();
  }

  _onRefeshHandle = () => {
    Toast.show(strings.refresh);
    this.setState({
      pageNo: 1,
      pageRec: 10,
      //lstUserReceiver: [],
      isRefresh: true,
      isLoadMore: false,
    }, () => this._fetchData());
    //this._fetchData();
  }

  _fetchData = () => {
    this.props.dispatch(thongTinDieuHanhActions.getUserReceiverAction(this.state.id, this.state.name, this.state.pageNo, this.state.pageRec));
  }

  openDetailControls = (item) => {
    // this.props.navigation.navigate('ChiTietDieuHanh');
  }

  _onChangeTextHandle = (textInput) => {
    clearTimeout(this.delayTimer);

    this.setState({
      pageNo: 1,
      pageRec: 10,
      isRefresh: false,
      isLoadMore: false,
      name: textInput.trim(),
    }, () => {
      this.delayTimer = setTimeout(
        () => {
          this._fetchData();
        },
        1500
      )
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Loading />
        <DefaultHeader myTitle="Danh sách người nhận" navigator={this.props.navigation} />
        <View style={{ flex: 1 }}>
          <View style={styles.wrapper}>
            <View style={styles.searchSection}  >
              <EvilIcons style={styles.searchIcon} name="search" size={20} color="#000" />
              <TextInput
                style={styles.textInput}
                underlineColorAndroid='transparent'
                placeholder='Tìm kiếm'
                returnKeyType='search'
                //onSubmitEditing={(event) => this.searchSubmit(event.nativeEvent.text)}
                onChangeText={(text) => this._onChangeTextHandle(text)}
              />
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', margin: 4, marginTop: 4 }}>
            <FlatList
              data={this.props.thongTinDieuHanhReducer.get('lstUserReceiver')}
              keyExtractor={(item, index) => index.toString()}
              onEndReached={this._loadMoreHandle}
              onEndReachedThreshold={0}
              onRefresh={this._onRefeshHandle}
              refreshing={this.state.isRefresh}
              extraData={this.state}
              renderItem={({ item, index }) => {
                return (
                  <FlatListItem item={item} index={index} >

                  </FlatListItem>
                );
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
  constructor(props) {
    super(props);
    this.state = {
      status: strings.chuaXem
    };
  }
  render() {
    let ngayNhan = "";
    if (this.props.item.ngayNhan) {
      ngayNhan = this.props.item.ngayNhan.split(" ");
    }
    return (
      <View style={{ flex: 1, backgroundColor: 'white', flexDirection: 'row', marginTop: 4 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 2 }}>
          <Image style={{ width: 50, height: 50 }}
            source={require('../../image/ic_avatar.png')} />
          <Text style={{ color: 'dodgerblue', fontWeight: 'bold' }}>{ngayNhan[1] ? ngayNhan[1] : ""}</Text>
          <Text style={{ color: 'dodgerblue' }}>{ngayNhan[0] ? ngayNhan[0] : ""}</Text>
        </View>

        <View style={{ flex: 3, flexDirection: 'column', backgroundColor: 'white', padding: 4, }}>
          <Text style={{ flex: 1, fontWeight: 'bold', marginTop: 2, color: 'black' }}>{this.props.item.fullName}</Text>
          <Text style={{ flex: 1, marginTop: 2, color: 'black' }}>{this.props.item.unitName}</Text>
          <Text style={{ flex: 1, marginTop: 2, color: 'black' }}>{strings.email} {this.props.item.email}</Text>
          {this.props.item.ngayXem ?
            <Text style={{ flex: 1, marginTop: 2, color: 'black' }}>{strings.ngayXem + ": "} {this.props.item.ngayXem}</Text> :
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 2 }}>
              <Text style={{ marginRight: 2, color: 'black' }}>{strings.trangThai + ": "}</Text>
              <Text style={{ color: 'red', fontWeight: 'bold' }}>{this.state.status}</Text>
            </View>
          }
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

export default connect(mapStateToProps)(DanhSachNhan);
