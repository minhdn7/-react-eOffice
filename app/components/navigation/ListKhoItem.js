import PropTypes from 'prop-types';
import React, {Component} from 'react';

import {NavigationActions} from 'react-navigation';
import {TouchableOpacity,TouchableWithoutFeedback, ScrollView, Text, View, StyleSheet, Image, FlatList, ToastAndroid} from 'react-native';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import strings from "../../resources/strings";
import {connect} from "react-redux";
import * as documentAction from "../../actions/document-action";
import { Toast } from 'native-base';
import * as menuActions from "../../actions/menu-actions";

class ListKhoItem extends Component {


    constructor() {
        super();

        this.state = {
            countMenu: {},
        };
    }
    mapCountMenu(keyName: string){
      switch (keyName) {
        case 'văn bản đi':
          return 'vanBanDi';

        case 'văn bản đến':
          return 'vanBanDen';

        case 'văn bản đến chờ xử lý':
          return 'vanBanDenChoXuLy';

        case 'văn bản xem để biết':
          return 'xemDeBiet';

        case 'văn bản đánh dấu':
          return 'danhDau';

        case 'văn bản chờ phê duyệt':
          return 'vanBanChoPheDuyet';

        case 'văn bản chờ tgd xử lý':
          return 'vanBanTGD';

        case 'văn bản đến tgd':
          return 'denTGD';

        case 'văn bản đến xlc':
          return 'denXLC';

        case 'văn bản đến ph':
          return 'denPH';

        case 'văn bản đi xlc':
          return 'diXLC';

        case 'văn bản đi ph':
          return 'diPH';
        default:
          return '';
      }
    }

    componentWillReceiveProps(){
  
    }
  
    render(){
        let ViewCountMenu;
        countMenu = this.props.menuReducer.get('countMenuData');
        if(countMenu && this.mapCountMenu(this.props.item.toLowerCase()) in countMenu){
          itemValue = this.mapCountMenu(this.props.item.toLowerCase());
          itemCount = countMenu[itemValue];
        //   ToastAndroid.show(itemValue, ToastAndroid.SHORT);
          if(itemCount > 0){
            ViewCountMenu = <View style={menuStyles.innerCircle}>
                              <Text style={{color: 'white', fontSize: 10}}>{itemCount}</Text>
                            </View>
          }else{
            ViewCountMenu = <View/>
          }

        }else{
          ViewCountMenu = <View/>
        }          
        return (        
            <View style={{
                flex: 1,
                flexDirection:'column',
                backgroundColor: 'white',
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 2,                              
            }}> 
              <View
                typeDocument = 'vanBanDaXuLy'
                style={menuStyles.itemDocumentContainer}>
                <View style={menuStyles.itemDocumentContainer}>
                <Image style={{width: 30, height: 30, margin: 4}} 
                      source={require('../../image/ic_doc_processed.png')}/>
                <Text style={{color: '#0d47a1', padding: 4}}>{this.props.item}</Text>
                </View>
                {ViewCountMenu}
     

              </View>
              <View style={{height: 1, backgroundColor: 'gainsboro'}}/>
          </View>
        );
    }
  }
  
  const menuStyles = StyleSheet.create({
    container: {
    flex: 1
  },
  navItemStyle: {
    padding: 10
  },
  navSectionStyle: {
    backgroundColor: 'lightgrey'
  },
  sectionHeadingStyle: {
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  footerContainer: {
    padding: 20,
    backgroundColor: 'lightgrey'
  },
  outerCircle: {
    borderRadius: 40,
    width: 30,
    height: 30,
    backgroundColor: 'red',
  },
  innerCircle: {
    borderRadius: 35,
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red'
  },
  itemDocumentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    padding: 2
  },
  });

  const mapStateToProps = (state) => ({
    login: state.get('login'),
    root: state.get('root'),
    menuReducer: state.get('menuReducer'),
  });
  export default connect(mapStateToProps)(ListKhoItem)