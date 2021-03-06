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
import TreeSelect from '../screen/TreeSelectDanhBa';
export class DanhBa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading : true,
      dataContact: [],
    };
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

  componentDidMount(){
    if(this.props.login.get('dataContact')){
      this.setState({
        dataContact: this.props.login.get('dataContact'),
      })
    }

  }

  render() {

    return (
      <View style={{ flex: 1 }}>
        <DefaultHeader myTitle="Danh Bạ" navigator={this.props.navigation} />

        <TreeSelect
        data={[this.state.dataContact]}
        isOpen
          // onClick={this._onClick}
          // onClickLeaf={this._onClickLeaf}
        />
        
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