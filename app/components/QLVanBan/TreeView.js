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

    render() {
        var radio_props = [
            { label: '', value: 0 },
        ];

        return (
            // <ScrollView style={{ flex: 1, }}>
                <TreeView
                    ref={ref => (this.treeView = ref)}

                    data={this.props.data}

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
                                                <Octicons
                                                    name='diff-added'
                                                    color='#000'
                                                    size={14}
                                                />
                                                :
                                                <AntDesign
                                                    name='minussquareo'
                                                    color='#000'
                                                    size={14}
                                                />
                                            }
                                        </Text>
                                    ) : (

                                            <Text>
                                                <AntDesign
                                                    name='minussquareo'
                                                    color='#000'
                                                    size={14}
                                                />
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
            // </ScrollView>
        );
    }
}