import React, { Component } from 'react';
import { View, ScrollView, Dimensions, TextInput, TouchableOpacity, Text, KeyboardAvoidingView } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
const { height, width } = Dimensions.get('window');

export default class extends Component {
    state = {}
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 12, backgroundColor: '#D7D7D7' }}>
                    <ScrollView >
                        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-end', paddingTop: 10, paddingRight: 4 }}>
                            <Text style={{ color: '#999999', fontSize: 15 }}>03/11/2018 20:54:10</Text>
                            <Text style={{ color: 'black', fontSize: 15, backgroundColor: '#ffffff', padding: 7, borderRadius: 5 }}>test</Text>
                        </View>
                    </ScrollView>
                </View>

                <View style={{ flex: 2 }}>
                    <KeyboardAvoidingView style={{ flex: 1 }} >

                        <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#ffffff', alignItems: 'center' }}>
                            <View style={{ flex: 5 }}>
                                <TextInput
                                    style={{ fontSize: 18 }}
                                    placeholder='Nhập tin nhắn'
                                    underlineColorAndroid='#00B2BF'
                                />
                            </View>

                            <View style={{ flex: 1 }}>
                                <TouchableOpacity
                                    style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: 50,
                                        height: 50,
                                        borderRadius: 100,
                                        backgroundColor: '#205AA7',

                                    }}
                                >
                                    <Entypo name="direction" size={30} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>

                    </KeyboardAvoidingView>
                </View>
            </View>
        );
    }
}