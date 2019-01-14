import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from 'react-native';
import { breadthFirstRecursion } from '../../utils/menutransform';
import _styles from '../../styles/styleQLVanBan';
import TreeItemSelectGroupByUnitAndUser from "./TreeItemSelectGroupByUnitAndUser";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textName: {
    fontSize: 14,
    marginLeft: 5
  },
  contentContainer: {
    paddingBottom: 20,
    backgroundColor: 'white',
  },
  collapseIcon: {
    width: 0,
    height: 0,
    marginRight: 2,
    borderStyle: 'solid',
  }
});

let index = 0;

export default class TreeSelectByUnitAndUser extends Component {
  constructor(props) {
    super(props);
    this.routes = [];
    this.state = {
      nodesStatus: this._initNodesStatus(),
      currentNode: null,
      treeData: this.props.data,
      isCheckXLC: null,
    };
  }

  handleCheckXlcClick = async (id) => {
    await this.findById(this.props.data, id);
    this.setState((state) => {
      return {
        isCheckXLC: id,
        //nodesStatus
      };
    });
  }

  handleCheckBoxClick = (id, changeStatus) => {
    //console.log("check isCheckXLC: ", ())
    //if(this.state.isCheckXLC && this.state.isCheckXLC == id){
      this.setState((state) => {
        return {
          isCheckXLC: id + changeStatus.toString(), // mục đích để render lại view
          //nodesStatus
        };
      });
    //}   
  }


  findById = (data, idNew) => {
    for (var i = 0; i < data.length; i++) {
      if (data[i].id == idNew) {
        data[i].isCheckXLC = true;
        data[i].isCheckPH = false;
        data[i].isCheckXem = false;
        index = index + 1;
      } else if (data[i].isCheckXLC == true) {
        data[i].isCheckXLC = false;
        index = index + 1;
      }
      if (index == 2) {
        index = 0;
        return;
      }
      if (data[i].children)
        this.findById(data[i].children, idNew);
    }
  }

  _initNodesStatus = () => {
    const { isOpen = false, data, openIds = [] } = this.props;
    const nodesStatus = new Map();
    if (!isOpen) {
      if (openIds && openIds.length) {
        for (let id of openIds) { // eslint-disable-line
          const routes = this._find(data, id);
          routes.map(parent => nodesStatus.set(parent.id, true));
        }
      }
      return nodesStatus;
    }
    breadthFirstRecursion(data).map(item => nodesStatus.set(item.id, true));
    return nodesStatus;
  };

  _find = (data, id) => {
    const stack = [];
    let going = true;

    const walker = (childrenData, innerId) => {
      childrenData.forEach(item => {
        if (!going) return;
        stack.push({
          id: item.id,
          name: item.name,
          parentId: item.parentId
        });
        if (item['id'] === innerId) {
          going = false;
        } else if (item['children']) {
          walker(item['children'], innerId);
        } else {
          stack.pop();
        }
      });
      if (going) stack.pop();
    };

    walker(data, id);
    return stack;
  };

  _onPressCollapse = ({ e, item }) => { // eslint-disable-line
    const { data } = this.props;
    const routes = this._find(data, item.id);
    this.setState((state) => {
      const nodesStatus = new Map(state.nodesStatus);
      nodesStatus.set(item && item.id, !nodesStatus.get(item && item.id)); // toggle
      return {
        currentNode: item.id,
        nodesStatus
      };
    }, () => {
      const { onClick } = this.props;
      onClick && onClick({ item, routes });
    });
  };

  _onClickLeaf = ({ e, item }) => { // eslint-disable-line
    const { onClickLeaf, onClick } = this.props;
    const { data } = this.props;
    const routes = this._find(data, item.id);
    this.setState({
      currentNode: item.id
    }, () => {
      onClick && onClick({ item, routes });
      onClickLeaf && onClickLeaf({ item, routes });
    });
  };

  _renderRow = ({ item }) => {

    if (item && item.children && item.children.length) {
      const isOpen = this.state.nodesStatus && this.state.nodesStatus.get(item && item.id) || false;
      const collapseIcon = isOpen ? {
        borderRightWidth: 5,
        borderRightColor: 'transparent',
        borderLeftWidth: 5,
        borderLeftColor: 'transparent',
        borderTopWidth: 10,
        borderTopColor: 'black',
      } : {
          borderBottomWidth: 5,
          borderBottomColor: 'transparent',
          borderTopWidth: 5,
          borderTopColor: 'transparent',
          borderLeftWidth: 10,
          borderLeftColor: 'black',
        };
      return (
        <View>
          {/* <TouchableOpacity onPress={(e) => this._onPressCollapse({ e, item })} > */}
            <View style={{
              flexDirection: 'row',
              // backgroundColor: this.state.currentNode === item.id ? '#FFEDCE' : '#fff',
              backgroundColor: '#fff',
              marginBottom: 2,
              //height: 30,
              alignItems: 'center'
            }}
            >
              <View style={[styles.collapseIcon, collapseIcon]} />
              <TreeItemSelectGroupByUnitAndUser
                item={item}
                currentNode={this.state.isCheckXLC}
                handleCheckBoxClick={this.handleCheckBoxClick}
                handleCheckXlcClick={this.handleCheckXlcClick} 
                _onPressCollapse={this._onPressCollapse}
                >
              </TreeItemSelectGroupByUnitAndUser>
            </View>
          {/* </TouchableOpacity> */}
          {
            !isOpen ? null :
              <FlatList
                keyExtractor={(childrenItem, i) => i.toString()}
                style={{ flex: 1, marginLeft: 15 }}
                onEndReachedThreshold={0.01}
                {...this.props}
                data={item.children}
                extraData={this.state}
                renderItem={this._renderRow}
              />
          }
        </View>
      );
    }
    return (
      <TouchableOpacity onPress={(e) => this._onClickLeaf({ e, item })}>
        <View style={{
          flexDirection: 'row',
          //backgroundColor: this.state.currentNode === item.id ? '#FFEDCE' : '#fff',
          backgroundColor: '#fff',
          marginBottom: 2,
          //height: 30,
          alignItems: 'center'
        }}
        >
          {/* <Text style={styles.textName}>{item.name}</Text> */}
          <TreeItemSelectGroupByUnitAndUser
            item={item}
            currentNode={this.state.isCheckXLC}
            handleCheckBoxClick={this.handleCheckBoxClick}
            handleCheckXlcClick={this.handleCheckXlcClick} >
          </TreeItemSelectGroupByUnitAndUser>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    const { data } = this.props;
    //const data = this.state.treeData;
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={(item, i) => i.toString()}
          style={{ flex: 1, marginVertical: 5, paddingHorizontal: 15 }}
          onEndReachedThreshold={0.01}
          {...this.props}
          data={data}
          extraData={this.state}
          renderItem={this._renderRow}
        />
      </View>
    );
  }
}