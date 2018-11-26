import React, { Component } from 'react';
import { View, Text, } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import CheckBox from 'react-native-checkbox';
import TreeView from '@zaguini/react-native-tree-view';
import dataTree from '../reducers/TreeData';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

var radio_props = [
    { label: 'param1', value: 0 },
    { label: 'param2', value: 1 }
];

export default class TreeViewDemo extends Component {
    state = {
        data: [
            dataTree
        ],
    }
    render() {
        return (
            <TreeView
                ref={ref => this.treeView = ref}
                data={this.state.data}
                deleteOnLongPress
                renderItem={(item, level) => (
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Text
                            style={{
                                marginLeft: 25 * level,
                            }}
                        >
                            {
                                item.collapsed !== null ?
                                    <Text>{item.collapsed ? <Octicons name="diff-added" size={20} color="black" /> : <AntDesign name="minussquareo" size={20} color="black" />}</Text> :
                                    <Text></Text>
                            }
                            {item.Name}
                        </Text>
                        <RadioForm
                            radio_props={radio_props}
                            initial={-1}
                            onPress={(value) => { this.setState({ value: value }) }}
                        />
                        <CheckBox
                            label=''
                            checked={true}
                            onChange={(checked) => console.log('I am checked', checked)}
                        />
                        <CheckBox
                            label=''
                            checked={true}
                            onChange={(checked) => console.log('I am checked', checked)}
                        />
                    </View>
                )}
            />
        );
    }
}