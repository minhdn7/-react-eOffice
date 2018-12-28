import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Picker, Text, Dimensions, ScrollView } from 'react-native';
import styles from '../../styles/styleQLVanBan';
import AntDesign from "react-native-vector-icons/AntDesign"
import Octicons from "react-native-vector-icons/Octicons";
import TreeView from "@zaguini/react-native-tree-view";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import CheckBox from 'react-native-check-box';

const { height, width } = Dimensions.get('window');

export default class TreeViewChuyenXuLy extends Component {
    constructor() {
        super();
        this.state = {
            isChecked: false,
        }
    }

    handleRadioButtonClick(value) {
        alert("Test: " + value);
    }

    convertJsonToTreeMap = array => {
        var map = {};
        for (var i = 0; i < array.length; i++) {
          var obj = array[i];
          if (!(obj.id in map)) {
            map[obj.id] = obj;
            map[obj.id].children = [];
          }
      
          if(typeof map[obj.id].userName == 'undefined'){
            map[obj.id].id = obj.id
            map[obj.id].userName = obj.userName
            map[obj.id].parentId = obj.parentId
          }
      
          var parent = obj.parentId || "-";
          if (!(parent in map)) {
            map[parent] = obj;
      
            map[parent].children = [];
          }else{
            map[parent].children.push(map[obj.id]);
          }
      
      
        }
        return map["-"];
      };

    render() {
        var radio_props = [
            { label: '', value: 0 },
        ];

        let showView;
        if(this.props.data != null && this.props.data.length != 0){
            showView = <TreeView
            ref={ref => (this.treeView = ref)}

            data={this.convertJsonToTreeMap(this.props.data)}

            // data={ContactData}
            deleteOnLongPress
            renderItem={(item, level) => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={[styles.width50]}>
                        <Text
                            style={{
                                flex: 1,
                                marginLeft: 25 * level,
                                fontSize: 16,
                                //height: height*0.05,
                            }}
                        >
                            {item.collapsed !== null ? (
                                <Text style={{ fontSize: 16 }}>
                                    {item.collapsed ?
                                        <Octicons name='diff-added' color='#000' size={14} />
                                        :
                                        <AntDesign name='minussquareo' color='#000' size={14} />
                                    }
                                </Text>
                            ) : (
                                    <Text>
                                        <AntDesign name='minussquareo' color='#000' size={14} />
                                    </Text>
                                )}
                            {" "}
                            {item.userName}
                        </Text>
                    </View>
                    <View style={[styles.width15, { flex: 1, }]}>
                        <RadioForm
                            radio_props={radio_props}
                            initial={-1}
                            buttonSize={10}
                            selectedButtonColor={'black'}
                            buttonColor={'black'}
                            onPress={(value) => { this.handleRadioButtonClick({ value: value }) }}
                        />
                    </View>
                    <View style={[styles.width15, { flex: 1, }]}>
                        <CheckBox
                            onClick={() => {
                                this.setState({
                                    isChecked: !this.state.isChecked
                                })
                             }}
                             isChecked={this.state.isChecked}
                        />
                    </View>
                    <View style={[styles.width15, { flex: 1, }]}>
                        <CheckBox
                            onClick={() => {
                                this.setState({
                                    isChecked: !this.state.isChecked
                                })
                             }}
                             isChecked={this.state.isChecked}
                        />
                    </View>
                </View>

            )}
        />
        }else{
            showView = null;
        }

        return (
            // <ScrollView style={{ flex: 1, }}>
            <View>
                {showView}
            </View>
            // </ScrollView>
        );
    }
}