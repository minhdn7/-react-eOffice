import React, { Component } from 'react';
import { Image, ImageBackground, StatusBar, Text, Alert, ToastAndroid } from "react-native";
import { Button, Container, Content, Spinner } from "native-base";
import { Platform, StyleSheet, View } from 'react-native';
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
import * as documentAction from "../../actions/document-action";
import { connect } from "react-redux";
import Color from 'react-native-material-color';
import { AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';
// import type { Notification, NotificationOpen } from 'react-native-firebase';

type Props = {};
export class Login extends Component {
  static navigationOptions = {
    header: null
  }

  isSelected: false;
  constructor() {
    super();
    this.password = "Al@nwalker1901";
    this.email = "longpd";
    // this.password = "";
    // this.email = "";
    this.tokenFirebase = "";
    this.isGoneAlready = false;


    this.state = {
      checked: false,
      isfirstLoad: false,
      isLoggedIn: false,
    }

  }



  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
    this.props.dispatch(rootActions.controlProgress(false));
    this.props.dispatch(loginActions.resetLogin());
  }

  componentDidMount() {
    this.props.dispatch(rootActions.controlProgress(false));
    this.checkPermission();
    this.createNotificationListeners();
  }

  componentDidUpdate() {
    if (this.state.isfirstLoad) {
      this.setState({ isfirstLoad: false });
      if (this.checkLogin()) {
        this.settingDefaultRedirect();
        //this.props.navigation.navigate('DrawerMenu');
        // this.checkContact();

      }
    }

  }

  settingDefaultRedirect = async () => {
    let typeAction = '';
    try {
      typeAction = await AsyncStorage.getItem('setting') || '';
      console.log('AsyncStorage.getItem(setting): ', typeAction);
      switch (typeAction) {
        case '2':
          this.props.dispatch(documentAction.resetListDocumentAction());
          this.props.dispatch(documentAction.setTypeDocumentAction(strings.vanBanDaXuLy));
          this.props.navigation.navigate('DocManagement');
          break;
        case '3':
          this.props.dispatch(documentAction.resetListDocumentAction());
          this.props.dispatch(documentAction.setTypeDocumentAction(strings.vanBanXemDeBiet));
          this.props.navigation.navigate('DocManagement');
          break;
        case '4':
          this.props.dispatch(documentAction.resetListDocumentAction());
          this.props.dispatch(documentAction.setTypeDocumentAction(strings.vanBanDanhDau));
          this.props.navigation.navigate('DocManagement');
          break;
        case '5':
          this.props.navigation.navigate('DanhBa');
          break;
        case '6':
          this.props.navigation.navigate('LichCongTac');
          break;
        default:
          this.props.navigation.navigate('DrawerMenu');
          break;
      }
    } catch (error) {
      this.props.navigation.navigate('DrawerMenu');
      console.log(error);
    }
  }

  //1
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  //3
  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');

    if (!fcmToken) {
      // user has a device token
      fcmToken = await firebase.messaging().getToken();

      await AsyncStorage.setItem('fcmToken', fcmToken);
      // if (fcmToken) {
      //     // user has a device token
      //     fcmToken = await firebase.messaging().getToken();

      //     await AsyncStorage.setItem('fcmToken', fcmToken);
      // }
    }
    // ToastAndroid.show(fcmToken, ToastAndroid.SHORT);
    this.setState({
      tokenFirebase: fcmToken,
    });
  }

  //2
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }

  async createNotificationListeners() {
    // create topic 
    firebase.messaging().subscribeToTopic('news');
    firebase.messaging().subscribeToTopic('global');
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { title, body } = notification;
      this.showAlert(title, body);
    });

    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
    });

    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      console.log(JSON.stringify(message));
    });
  }

  showAlert(title, body) {
    Alert.alert(
      title, body,
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }

  checkLogin() {

    console.log('isLoggedIn:', this.props.login.get('isLoggedIn'));
    if (this.props.login.get('isLoggedIn')) {

      consts.BASE_HEADER["X-Authentication-Token"] = this.props.login.get('token');
      console.log('Token save:', consts.BASE_HEADER["X-Authentication-Token"]);

      this.props.dispatch(loginActions.getContact());
      // this.props.navigation.navigate('DrawerMenu');
      return true;

    } else {
      message = this.props.login.get('loginError');
      if (message && message != '') {
        Alert.alert(
          'Thông báo',
          message,
          [
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false }
        )
      }

      return false;
    }
  }

  checkContact() {
    if (this.props.login.get('hasContact')) {

      this.props.navigation.navigate('DrawerMenu');

    } else {
      if (this.props.login.get('contactError') && this.props.login.get('contactError') != '') {
        message = this.props.login.get('contactError');
        Alert.alert(
          'Thông báo',
          message,
          [
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false }
        )

      }
      this.props.navigation.navigate('DrawerMenu');
    }
  }


  isObject(obj) {
    return typeof obj === 'object';
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor="#0d47a1"
          barStyle="light-content"
        />
        <ImageBackground style={loginStyles.backgroundImage} source={require('../../image/background_2.png')}>
          <Content contentContainerStyle={loginStyles.contentStyle}>
            <Image source={require('../../image/ic_app.png')}
              style={{ marginTop: 60, width: 80, height: 80 }}
            />
            <Text style={loginStyles.textStyle}>
              {strings.heThongVanBanDieuHanh}
            </Text>
            <ValidationTextInput
              validate={this.validateEmail}
              label={strings.account}
              onChangeText={(text) => this.email = text}
              style={loginStyles.emailStyle}
              color={colors.accentColor} />
            <ValidationTextInput
              secureTextEntry={true}
              validate={this.validatePassword}
              onChangeText={(text) => this.password = text}
              label={strings.password}
              style={loginStyles.emailStyle}
              color={colors.accentColor} />

            <Content contentContainerStyle={loginStyles.contentStyle2}>
              <Text>Ghi nhớ tài khoản </Text>

              <CheckBox
                style={{ flex: 1, padding: 30 }}
                onClick={() => {
                  this.setState({
                    isChecked: !this.state.isChecked
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
            {/* {this.renderProgress()} */}
          </Content>
        </ImageBackground>
      </View>)
  }

  renderProgress() {
    if (this.props.root.get('progress')) {
      return this.spinner();
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
        style={styles.progressStyle} />
    )
  }

  validateEmail = (text: string): boolean => consts.EMAIL_REGEX.test(text);

  validatePassword = (text: string): boolean => text.length >= consts.MIN_PASSWORD_LENGTH;

  onLoginPress = () => {
    this.setState({ isfirstLoad: true });
    // let tokenFirebase = await AsyncStorage.getItem('fcmToken');
    // ToastAndroid.show(this.state.tokenFirebase, ToastAndroid.SHORT);
    this.props.dispatch(loginActions.loginAccount(this.email, this.password, this.state.tokenFirebase));
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
  saveStyle: {
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
    color: "white",
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
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
