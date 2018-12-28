import React, { Component } from "react";
import {
  Image,
  Text,
  View,
  Alert,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Input,
  FlatList,
  TouchableWithoutFeedback
} from "react-native";
import { Container, Content, Spinner, Button } from "native-base";
import { Navigation, StatusBar } from "react-native-navigation";
import colors from "../../resources/colors";
import { connect } from "react-redux";
import dimens from "../../resources/dimens";
import styles from "../../resources/styles";
import HTML from "react-native-render-html";
import showdown from "showdown";
import strings from "../../resources/strings";
import * as detailsActions from "../../actions/details-actions";
import Color from "react-native-material-color";
import PropTypes from "prop-types";
import AntDesign from "react-native-vector-icons/AntDesign"
import BottomNavigation, {
  Tab
} from "react-native-material-bottom-navigation-performance";
import Icon from "react-native-vector-icons/MaterialIcons";
import Octicons from "react-native-vector-icons/Octicons";
import DefaultHeader from "../navigation/DefaultHeader";
import flatListData from "../../data/flatListData";
import ContactData from "../../data/ContactData";
import DateTimePicker from "react-native-modal-datetime-picker";
import Moment from "moment";

import TreeView from "@zaguini/react-native-tree-view";
import TreeSelectCustom from "../QLVanBan/TreeSelectCustom";

export class DanhBa extends Component {
  constructor() {
    super();
    this.state = {
      dataConvert: [],
    }
  }

  convertJsonToTreeMap = array => {
    var map = {};
    for (var i = 0; i < array.length; i++) {
      var obj = array[i];
      if (!(obj.id in map)) {
        map[obj.id] = obj;
        map[obj.id].children = [];
      }

      if (typeof map[obj.id].userName == 'undefined') {
        map[obj.id].id = obj.id
        map[obj.id].userName = obj.userName
        map[obj.id].parentId = obj.parentId
      }

      var parent = obj.parentId || "-";
      if (!(parent in map)) {
        map[parent] = obj;

        map[parent].children = [];
      } else {
        map[parent].children.push(map[obj.id]);
      }


    }
    return map["-"];
  };

  componentDidMount() {
    this.setState({
      dataConvert: this.props.login.get('dataContact'),
    });
    console.log("test data: ", this.props.login.get('dataContact'));
  }

  render() {
    // dataConvert = this.convertJsonToTreeMap(ContactData);
    // dataConvert = this.convertJsonToTreeMap(this.props.login.get('dataContact'));
    let viewData;
    if (this.state.dataConvert != null && this.state.dataConvert.length != 0) {
      viewData = <TreeView
        ref={ref => (this.treeView = ref)}

        data={[this.state.dataConvert]}

        // data={ContactData}
        deleteOnLongPress
        renderItem={(item, level) => (
          <View style={{}}>
            <Text
              style={{
                marginLeft: 25 * level,
                fontSize: 18
              }}
            >
              {item.collapsed !== null ? (
                <Text style={{ fontSize: 18 }}>
                  {item.collapsed ?
                    <Octicons
                      name='diff-added'
                      color='#000'
                      size={14}
                    />
                    :
                    <AntDesign
                      name='minussquareo'
                      color='#000'
                      size={14}
                    />
                  }
                </Text>
              ) : (

                  <Text>
                    <AntDesign
                      name='minussquareo'
                      color='#000'
                      size={14}
                    />
                  </Text>
                )}
              {" "}
              {item.userName}
            </Text>
          </View>
        )}
      />
    } else {
      viewData = null;
    }

    return (
      <View style={{ flex: 1 }}>
        <DefaultHeader myTitle="Danh Bạ" navigator={this.props.navigation} />

        {/* <View style={{ flex: 1, margin: 20 }}>
          {viewData}
        </View> */}

        <View style={{ flex: 1 }}>
          <TreeSelectCustom
            data={[this.state.dataConvert]}
            isOpen
          //openIds={['1363-U1']}
          //onClick={this._onClick}
          //onClickLeaf={this._onClickLeaf}
          />

        </View>

      </View>
    );
  }
}

const itemStyles = StyleSheet.create({
  containerStyle: {
    flexDirection: "column",
    resizeMode: "cover",
    flex: 1,
    alignItems: "center"
  },
  textLabel: {
    flex: 2,
    margin: 4,
    fontSize: 16
  },
  textData: {
    flex: 8,
    margin: 4,
    fontSize: 16
  },
  viewBound: {
    flexDirection: "row",
    margin: 4
  }
});

const mapStateToProps = (state) => ({
  login: state.get('login'),
  root: state.get('root'),
});

export default connect(mapStateToProps)(DanhBa)  