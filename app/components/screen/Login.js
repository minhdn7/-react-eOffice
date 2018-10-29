import React, {Component} from 'react';
import {Image, ImageBackground, StatusBar, Text, Alert} from "react-native";
import {Button, Container, Content, Spinner} from "native-base";
import {Platform, StyleSheet, View} from 'react-native';
import colors from "../../resources/colors";
import ValidationTextInput from "../ValidationTextInput";

import consts from "../../const";
import dimens from "../../resources/dimens";
import strings from "../../resources/strings";
import RoundCheckbox from 'rn-round-checkbox';
import * as actions from "../../actions/action-types";
import styles from "../../resources/styles";
import * as Toast from "@remobile/react-native-toast";

import CheckBox from 'react-native-check-box';
import * as loginActions from "../../actions/login-actions";
import * as rootActions from "../../actions/root-actions";
import {connect} from "react-redux";
import Color from 'react-native-material-color';
type Props = {};
export class Login extends Component {
  static navigationOptions = {
    header: null
  }

  isSelected: false;
  constructor(){
    super();
    this.password = "Vnpt@123";
    this.email = "nnhai";
    this.tokenFirebase = "";
    this.isGoneAlready = false;
    this.isfirstLoad = false;
    this.isLoggedIn = false;
    this.state = {
      checked: false,
    }   
 }

 componentDidMount() {
  this.props.dispatch(rootActions.controlProgress(false));
  const isLoggedIn = false;
}

componentDidUpdate() {
  this.proceed()
}

proceed() {
  const loginError = this.props.login.get('loginError');
  isLoggedIn = this.props.login.get('isLoggedIn');

  if (this.isfirstLoad) {
    if(this.isfirstLoad){
      this.props.navigation.navigate('DrawerMenu');
    }else{
      this.props.dispatch(loginActions.setError({}))
      isLoggedIn = false;
      Alert.alert(
        'Thông báo',
        "Thất bại",
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    }

  }
}

isObject(obj) {
  return typeof obj === 'object';
}

  render() {
    return (
      <View style={{flex: 1}}>
          <StatusBar
              backgroundColor="#0d47a1"
              barStyle="light-content"
          />
        <ImageBackground style={loginStyles.backgroundImage} source={require('../../image/ic_background_login.png')}>
          <Content contentContainerStyle={loginStyles.contentStyle}>
            <Text style={loginStyles.textStyle}>
              Hệ thống văn bản điều hành
            </Text>
            <ValidationTextInput
              validate={this.validateEmail}
              label={strings.account}
              onChangeText={(text) => this.email = text}
              style={loginStyles.emailStyle}
              color={colors.accentColor}/>
            <ValidationTextInput
              secureTextEntry={true}
              validate={this.validatePassword}
              onChangeText={(text) => this.password = text}
              label={strings.password}
              style={loginStyles.emailStyle}
              color={colors.accentColor}/>
              <Content contentContainerStyle={loginStyles.contentStyle2}>
                <Text>Ghi nhớ tài khoản </Text>

              <CheckBox
                  style={{flex: 1, padding: 30}}
                  onClick={()=>{
                    this.setState({
                        isChecked:!this.state.isChecked
                    })
                  }}
                  isChecked={this.state.isChecked}
                  leftText={"CheckBox"}
              />

              </Content>

            <Button
              style={loginStyles.buttonStyle}
              onPress={this.onLoginPress}>
              <Text style={loginStyles.buttonTextStyle}>{strings.sign_in}</Text>
            </Button>
            {this.renderProgress()}
          </Content> 
          </ImageBackground>
      </View>)
  }

  renderProgress() {
    if (this.props.root.get('progress')) {
      return this.spinner()
    } else {
      return null;
    }
  }

  spinner() {
    return (
      <Spinner
        color={colors.accentColor}
        animating={true}
        size={'large'}
        style={styles.progressStyle}/>
    )
  }

  validateEmail = (text: string): boolean => consts.EMAIL_REGEX.test(text);

  validatePassword = (text: string): boolean => text.length >= consts.MIN_PASSWORD_LENGTH;

  onLoginPress = () => {
    this.isfirstLoad = true;
    this.props.dispatch(loginActions.loginAccount(this.email, this.password, this.tokenFirebase));
  }
}



const loginStyles = {
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    flexDirection: 'row',
    alignItems: 'center',
    resizeMode: 'resizeMode',
  },
  containerStyle: {
    flexDirection: 'row',
    resizeMode: 'cover',
    flex: 1,
    backgroundColor: colors.primaryColor,
    alignItems: 'center'
  },
  contentStyle: {
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginHorizontal: dimens.margin_large
  },
  contentStyle2: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginHorizontal: dimens.margin_large
  },
  saveStyle:{
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginHorizontal: dimens.margin_large
  },
  statusBarStyle: {
    backgroundColor: colors.primaryColor
  },
  emailStyle: {
    alignSelf: 'stretch',
  },
  textStyle: {
    color: "blue",
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 250,
  },

  textStyle2: {
    color: "black",
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonStyle: {
    marginTop: dimens.margin_medium,
    // alignSelf: 'stretch',
    alignSelf: 'center',
    height: 50,
    width: 300,
    borderRadius: 10,
    justifyContent: 'center',
  },
  buttonTextStyle: {
    color: 'white',
    fontSize: dimens.text_size_button
  },
  imageStyle: {
    width: 150,
    height: 150,
  },

};


const mapStateToProps = (state) => ({
  login: state.get('login'),
  root: state.get('root'),
});

export default connect(mapStateToProps)(Login)
