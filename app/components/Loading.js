import React, {Component} from 'react';
import {Image, ImageBackground, StatusBar, Text, Alert} from "react-native";
import {Button, Container, Content, Spinner} from "native-base";
import {Platform, StyleSheet, View} from 'react-native';

import * as Toast from "@remobile/react-native-toast";
import CheckBox from 'react-native-check-box';
import {connect} from "react-redux";
import Color from 'react-native-material-color';

export default class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
      }
      


    render() {
      
      return (
        <View style = {{flex: 1}}>
           {this.renderProgress()}
        </View>
      )
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


  }
