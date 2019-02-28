import React, { Component } from "react";
import { Image, Text, View, Alert, TouchableOpacity, StyleSheet, TextInput, Input, FlatList, Dimensions } from "react-native";

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import DefaultHeader from '../navigation/DefaultHeader';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { connect } from "react-redux";
import * as thongTinDieuHanhAction from "../../actions/thongTinDieuHanh-actions";
import Toast from 'react-native-simple-toast';
import strings from "../../resources/strings";
import styles from '../../styles/styleQLVanBan';
import ItemThongTinDieuHanh from '../ThongTinDieuHanh/ItemThongTinDieuHanh';
import Loading from "../DD_Loading";

const { height, width } = Dimensions.get('window');

export class ThongTinDieuHanh extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNo: 1,
      pageRec: 10,
      isDateTimePickerVisible: false,
      isStartDate: true,
      startDate: 'Từ ngày',
      endDate: 'Đến ngày',
      txtFromDate: '',
      txtToDate: '',
      txtTitle: '',
      actionType: '',
      lstData: [],
      isRefresh: false,
      isLoadMore: false,
      loading: false,
    };
  }

  componentWillMount() {
    let actionType = this.props.navigation.getParam('type', '');
    this.setState({
      actionType: actionType,
    })
  }

  componentDidMount() {
    this._fetchData();
  }

  openMenu() {
    // this.props.navigation.openDrawer();
    this.props.menu.openDrawer();
  }

  openDetailControls = (item) => {
    this.props.dispatch(thongTinDieuHanhAction.setIdInfomationAction(item.id));
    if (this.state.actionType === 'Nhan' || item.daGui) {
      this.props.navigation.navigate('ChiTietDieuHanh', {
        id: item.id
      });
    } else {
      this.props.navigation.navigate('SendThongTin', {
        id: item.id,
        title: "Chỉnh sửa thông tin điều hành"
      });
    }
  }

  _showDateTimePicker = (isType) => {
    this.setState({ isDateTimePickerVisible: true });
    this.setState({ isStartDate: isType });
  }

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    this._hideDateTimePicker();
    sDate = JSON.stringify(date).replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').split('T');
    arrayDate = sDate[0].split('-');
    formatDate = arrayDate[2] + "/" + arrayDate[1] + "/" + arrayDate[0];

    if (this.state.isStartDate) {
      this.setState({
        startDate: formatDate,
        txtToDate: formatDate
      })
    } else {
      this.setState({
        endDate: formatDate,
        txtFromDate: formatDate,
      })
    }
  };

  _loadMoreHandle = () => {
    let lstData = this.state.actionType === 'Gui' ?
      this.props.thongTinDieuHanhReducer.get('listSend') : this.props.thongTinDieuHanhReducer.get('listReceive');
    if (lstData != null && lstData.length >= 9) {
      Toast.show(strings.loadingMore);
      this.setState({
        isLoadMore: true,
        pageNo: this.state.pageNo + 1,
      }, () => { this._fetchData() });
      //this._fetchData();
    }
  }

  _onRefeshHandle = () => {
    Toast.show(strings.refresh);
    this.setState({
      pageNo: 1,
      pageRec: 10,
      //lstData: [],
      isRefresh: true,
      isLoadMore: false,
    }, () => { this._fetchData() })
    //this._fetchData();
  }

  _fetchData = () => {

    if (this.state.actionType === 'Gui') {
      this.props.dispatch(thongTinDieuHanhAction.getListSendAction(this.state.txtToDate, this.state.pageNo, this.state.pageRec, this.state.txtFromDate, this.state.txtTitle.trim()));
    } else {
      this.props.dispatch(thongTinDieuHanhAction.getListReceiveAction(this.state.pageNo, this.state.pageRec, this.state.txtFromDate, this.state.txtToDate, "", this.state.txtTitle.trim()));
    }

    // let lstData = this.state.actionType === 'Gui' ?
    //   this.props.thongTinDieuHanhReducer.get('listSend') : this.props.thongTinDieuHanhReducer.get('listReceive');
    // if (lstData && lstData.length) {
    //   this.setState({
    //     //isLoadMore: !this.state.isLoadMore,
    //     lstData: this.state.pageNo === 1 ? lstData : this.state.lstData.concat(lstData),
    //     isRefresh: false,
    //     loading: false,
    //   })
    // }
  }

  _searchHandle = () => {
    this.setState({
      pageNo: 1,
      pageRec: 10,
      isRefresh: false,
      isLoadMore: false,
    });
    this._fetchData();
  }

  _deleteInfoHandle = (id) => {
    if (id !== null && id !== '' && id !== "undefined") {
      this.props.dispatch(thongTinDieuHanhAction.deleteInfoByIdAction(id));
      let result = this.props.thongTinDieuHanhReducer.get('result');
      if (result !== null && result == "1") {
        Toast.show(strings.xoaThanhCongThongTinDieuHanh, Toast.CENTER);
        this.setState({
          pageNo: 1,
          pageRec: 10,
          isRefresh: false,
          isLoadMore: false,
        }, () => { this._fetchData() });
        //this._fetchData();
      }
    }
  }

  render() {
    let lstData = this.state.actionType === 'Gui' ?
      this.props.thongTinDieuHanhReducer.get('listSend') : this.props.thongTinDieuHanhReducer.get('listReceive');
    return (
      <View style={{ flex: 1 }}>
        <Loading />
        <DefaultHeader myTitle='Thông tin điều hành' navigator={this.props.navigation} />
        <View style={{ flex: 1, alignItems: 'center' }}>

          <View style={{ flex: 1, flexDirection: 'row' }}>
            <TouchableOpacity style={itemStyles.textStyle}
              onPress={() => this._showDateTimePicker(true)}>
              <Text style={{ flex: 1 }} >{this.state.startDate}</Text>
              <EvilIcons name='calendar' color='#00aced' style={{ position: 'absolute', right: '1%' }} size={30} />
            </TouchableOpacity>
            <TouchableOpacity style={itemStyles.textStyle}
              onPress={() => this._showDateTimePicker(false)}>
              <Text style={{ flex: 1 }}>{this.state.endDate}</Text>
              <EvilIcons name='calendar' color='#00aced' style={{ position: 'absolute', right: '1%' }} size={30} />
            </TouchableOpacity>
            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this._handleDatePicked}
              onCancel={this._hideDateTimePicker}
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row', margin: 4 }}>
            <TextInput
              style={{ flex: 1, borderRadius: 4, borderWidth: 1, padding: 4, }}
              placeholder="Tiêu đề"
              onChangeText={(text) => this.setState({ txtTitle: text })}
              value={this.state.txtTitle}
            />
          </View>

          <View style={{ flex: 1, flexDirection: 'row' }}>
            <TouchableOpacity style={[itemStyles.buttonStyle, { backgroundColor: '#205AA7' }]} onPress={() => this._searchHandle()}>
              <Text style={{ color: 'white' }}>Tìm kiếm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[itemStyles.buttonStyle, { backgroundColor: '#367517' }]} onPress={() => this.props.navigation.navigate('SendThongTin', { title: 'Gửi thông tin điều hành' })}>
              <Text style={{ color: 'white' }}>Thêm mới</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 11, flexDirection: 'row', margin: 4, marginTop: 16 }}>
            <FlatList
              data={lstData}
              keyExtractor={(item, index) => index.toString()}
              onEndReached={this._loadMoreHandle}
              onEndReachedThreshold={0.2}
              onRefresh={this._onRefeshHandle}
              refreshing={this.state.isRefresh}
              extraData={this.state}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity onPress={() => this.openDetailControls(item)}>
                    <ItemThongTinDieuHanh
                      item={item} index={index}
                      actionType={this.state.actionType}
                      navigator={this.props.navigation}
                      _deleteInfoHandle={this._deleteInfoHandle}
                    >
                    </ItemThongTinDieuHanh>
                  </TouchableOpacity>);
              }}
            >
            </FlatList>
          </View>

        </View>
      </View>
    )
  }
}

const itemStyles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'column',
    resizeMode: 'cover',
    flex: 1,
    alignItems: 'center'
  },
  textStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 4,
    borderRadius: 4,
    borderWidth: 1,
    padding: 4
  },
  buttonStyle: {
    flex: 1,
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 4,
    borderRadius: 5,
    //borderWidth: 1,
    padding: 4,
    justifyContent: "center"
  },
  flatListItem: {
    color: 'white',
    padding: 10,
    fontSize: 16,
  },
  dropdownStyle: {
    width: width * 0.3, height: height * 0.2,
    backgroundColor: "#0033FF",
  },
});

function mapStateToProps(state) {
  return {
    thongTinDieuHanhReducer: state.get('thongTinDieuHanhReducer'),
  }
}

export default connect(mapStateToProps)(ThongTinDieuHanh);
