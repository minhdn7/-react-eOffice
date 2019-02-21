import React, { Component } from "react";
import { Image, Text, View, Alert, TouchableOpacity, StyleSheet, TextInput, Input, FlatList, Dimensions } from "react-native";
import { Container, Content, Spinner, Button } from "native-base";

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import DefaultHeader from '../navigation/DefaultHeader';
import flatListData from '../../data/flatListData';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Moment from 'moment';
import { connect } from "react-redux";
import * as thongTinDieuHanhAction from "../../actions/thongTinDieuHanh-actions";
import Toast from 'react-native-simple-toast';
import strings from "../../resources/strings";
import styles from '../../styles/styleQLVanBan';
import ModalDropdown from 'react-native-modal-dropdown';
import Icon from 'react-native-vector-icons/Entypo';

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

  componentWillReceiveProps() {
    let lstData = this.state.actionType === 'Gui' ?
      this.props.thongTinDieuHanhReducer.get('listSend') : this.props.thongTinDieuHanhReducer.get('listReceive');
    if (lstData != null && lstData.length > 0) {
      if (this.state.isLoadMore) {
        this.setState({
          isLoadMore: !this.state.isLoadMore,
          lstData: this.state.lstData.concat(lstData),
          isRefresh: false,
        })
      } else {
        this.setState({
          lstData: lstData,
          isRefresh: false,
          isLoadMore: false,
        })
      }
    }
  }

  openMenu() {
    // this.props.navigation.openDrawer();
    this.props.menu.openDrawer();
  }

  openDetailControls = (item) => {
    this.props.navigation.navigate('ChiTietDieuHanh');
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
      });
      this._fetchData();
    }
  }

  _onRefeshHandle = () => {
    Toast.show(strings.refresh);
    this.setState({
      pageNo: 1,
      pageRec: 10,
      lstData: [],
      isRefresh: true,
      isLoadMore: false,
    })
    this._fetchData();
  }

  _fetchData = () => {
    if (this.state.actionType === 'Gui') {
      this.props.dispatch(thongTinDieuHanhAction.getListSendAction(this.state.txtToDate, this.state.pageNo, this.state.pageRec, this.state.txtFromDate, this.state.txtTitle.trim()));
    } else {
      this.props.dispatch(thongTinDieuHanhAction.getListReceiveAction(this.state.pageNo, this.state.pageRec, this.state.txtFromDate, this.state.txtToDate, "", this.state.txtTitle.trim()));
    }
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

  _updateAnDeleteHandle = (option, id) => {
    if (option == 0) {
        this.props.navigator.navigate('SendThongTin', {
            id: id,
            title: "Chỉnh sửa thông tin điều hành"
        });
    }
    else if (option == 1) {
        // this.props.navigator.navigate('DocHistory', {
        //     idDocument: idDocument,
        // });
    }
    // load data
}

  render() {

    return (
      <View style={{ flex: 1 }}>
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
            <TouchableOpacity style={[itemStyles.buttonStyle, { backgroundColor: '#367517' }]} onPress={() => this.props.navigation.navigate('SendThongTin',{ title: 'Gửi thông tin điều' })}>
              <Text style={{ color: 'white' }}>Thêm mới</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 11, flexDirection: 'row', margin: 4, marginTop: 16 }}>
            <FlatList
              data={this.state.lstData}
              keyExtractor={(item, index) => index.toString()}
              onEndReached={this._loadMoreHandle}
              onEndReachedThreshold={0.2}
              onRefresh={this._onRefeshHandle}
              refreshing={this.state.isRefresh}
              extraData={this.state}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity onPress={() => this.openDetailControls(item)}>
                    <FlatListItem 
                    item={item} index={index} 
                    actionType={this.state.actionType}
                    _updateAnDeleteHandle = {this._updateAnDeleteHandle}
                    >

                    </FlatListItem>
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
    width: width*0.3, height: height*0.2, 
    backgroundColor: "#0033FF",
},
});

class FlatListItem extends Component {

  gotoScreen = (index, id) => {
    this.props._updateAnDeleteHandle(index, id);
  }

  render() {
    let dataStr = [strings.sua, strings.xoa];
    let status;
    if (this.props.actionType === 'Gui') {
      status = this.props.item.daGui !== null ? strings.daGui : strings.banNhap;
    } else {
      status = this.props.item.isRead === 1 ? strings.daDoc : strings.chuaDoc;
    }
    return (
      <View style={styles.container}>
        <View style={{
          flex: 1,
          flexDirection: 'column',
          backgroundColor: 'white',
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 2,
        }}>
          <Text style={{ backgroundColor: 'white', fontWeight: 'bold' }}>{this.props.item.tieuDe}</Text>
          <View style={styles.row1}>
            <Text style={{ flex: 3 }}>{strings.ngayTao + ":"} </Text>
            <Text style={{ flex: 7, color: 'red' }}>{this.props.item.ngayTao}</Text>
          </View>
          <View style={styles.row1}>
            <Text style={{ flex: 3 }}>{strings.trangThai + ":"} </Text>
            <Text style={{ flex: 7 }}>{status}</Text>
          </View>
          <View style={styles.row1}>
            <Text tyle={{ flex: 3 }}>{strings.tepDinhKem + ":"} </Text>
            <Text style={{ flex: 7 }}></Text>
          </View>
         
        </View>
        <View style={styles.right}>
          <ModalDropdown
            options={dataStr}
            dropdownStyle={itemStyles.dropdownStyle}
            dropdownTextStyle={styles.dropdownTextStyle}
            dropdownTextHighlightStyle={styles.dropdownTextHighlightStyle}
            onSelect={(idx, value) => this.gotoScreen(idx, this.props.item.id)}
          >
            <Icon name="dots-three-vertical" size={20} />
          </ModalDropdown>
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

export default connect(mapStateToProps)(ThongTinDieuHanh);
