import React, {Component} from 'react';
import {Text,View} from 'react-native';
import {DrawerNavigator} from 'react-navigation';
import FirstScreen from '../screen/Home';
import SecondScreen from '../RepositoriesList';

const MenuDrawerNavigator = DrawerNavigator(
    {
      First: {
        path: '/',
        screen: FirstScreen,
      },
      Second: {
        path: '/sent',
        screen: SecondScreen,
      },
    },
    {
      initialRouteName: 'First',
      drawerPosition:'left',
      navigationOptions: {
        header: null,
      },
    }
  );
 export default MenuDrawerNavigator;