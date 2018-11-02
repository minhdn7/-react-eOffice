import React, {Component} from 'react';
import {Text,View} from 'react-native';
import {DrawerNavigator} from 'react-navigation';
import Home from '../screen/Home';
import ThongTinDieuHanh from '../screen/ThongTinDieuHanh';
import SideMenu from '../navigation/SideMenu';
import SecondScreen from '../RepositoriesList';

const MenuDrawerNavigator = DrawerNavigator(
    {
      First: {

        screen: Home,
      },
      Second: {

        screen: ThongTinDieuHanh,
      },
    },
    {
      initialRouteName: 'First',
      drawerPosition:'left',
      contentComponent: SideMenu,
      navigationOptions: {
        header: null,
      },
    }
  );
 export default MenuDrawerNavigator;