import React, { Component } from "react";
import { Text, View, Alert, TouchableOpacity, StyleSheet, FlatList, AsyncStorage } from "react-native";
import { Container, Content, Spinner, Button, CheckBox, ListItem, Body, Header } from "native-base";
import strings from "../../resources/strings";
import styles from '../../styles/styleQLVanBan';

import DefaultHeader from '../navigation/DefaultHeader';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

export default class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            radio_props: [
                { id: '1', label: strings.trangChu, value: 0 },
                { id: '2', label: strings.vanBanDaXuLy, value: 1 },
                { id: '3', label: strings.vanBanXemDeBiet, value: 2 },
                { id: '4', label: strings.vanBanDanhDau, value: 3 },
                { id: '5', label: strings.danhBa, value: 4 },
                { id: '6', label: strings.lichCongTacLanhDao, value: 5 },
            ],

            selectedId: '1',
        };
    };

    async componentWillMount() {
        try {
            const actionType = await AsyncStorage.getItem('setting');
            console.log("actionType setting: ", actionType);
            if (actionType != null) {
                this.setState({
                    selectedId: actionType,
                })
            } else {
                AsyncStorage.setItem('setting', this.state.selectedId);
            }
        } catch (error) {
            console.log(error.message);
        }

    }

    onCheckBoxPress = async (value) => {
        this.setState({
            selectedId: value
        });

        try {
            await AsyncStorage.setItem('setting', value);
        } catch (error) {
            console.log(error.message);
        }
        
    }

    render() {

        return (
            <View style={{ flex: 1 }}>
                <DefaultHeader myTitle={strings.thietLapMacDinh} navigator={this.props.navigation} />
                <View style={{ flex: 1, margin: 5 }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ color: '#205AA7', fontSize: 20, margin: 12, fontWeight: 'bold' }}>{strings.chonChucNangMacDinh}</Text>
                    </View>

                    <View style={[styles.tableHeader, { backgroundColor: '#205AA7' }]}>
                        <View style={{ flex: 7 }}>
                            <Text style={styles.btnText}>{strings.chucNangManHinh}</Text>
                        </View>
                        <View style={{ flex: 3 }}>
                            <Text style={styles.btnText}>{strings.chon}</Text>
                        </View>

                    </View>
                    <FlatList
                        extraData={this.state}
                        keyExtractor={(item, index) => item.id}
                        data={this.state.radio_props}
                        renderItem={({ item, index }) => {
                            return <ListItem>
                                <Body style={{ width: '90%' }}>
                                    <Text>{item.label}</Text>
                                </Body>
                                <RadioButton key={item.id}>
                                    <RadioButtonInput
                                        obj={[{ label: '', value: item.id }]}
                                        //initial={0}
                                        buttonSize={10}
                                        selectedButtonColor={'black'}
                                        buttonColor={'black'}
                                        isSelected={this.state.selectedId === item.id}
                                        onPress={() => this.onCheckBoxPress(item.id)}
                                    />
                                </RadioButton>
                                {/* <CheckBox
                                    checked={this.state.selectedId == item.id}
                                    onPress={() => this.onCheckBoxPress(item.id)}
                                /> */}
                            </ListItem>

                        }}
                    >

                    </FlatList>


                </View>


            </View>
        )
    }


}


const itemStyles = StyleSheet.create({
    containerStyle: {
        flexDirection: 'column',
        resizeMode: 'cover',
        flex: 1,
        alignItems: 'center'
    },
    textLabel: {
        flex: 2,
        margin: 4,
        fontSize: 16,
    },
    textData: {
        flex: 8,
        margin: 4,
        fontSize: 16,
    },
    viewBound: {
        flexDirection: 'row',
        margin: 4,
    }
});

class FlatListItem extends Component {
    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                backgroundColor: 'white',
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 2,
            }}>
                <Text style={{ backgroundColor: 'white', fontWeight: 'bold' }}>{this.props.item.name}</Text>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    backgroundColor: 'white'
                }}>
                    <Text style={{ flex: 3 }}>{this.props.item.name}</Text>
                    <CheckBox
                        checked={this.state.selectedId == item.value}
                        onPress={() => this.onCheckBoxPress(item.value)}
                    />
                </View>

            </View>
        );
    }
}
