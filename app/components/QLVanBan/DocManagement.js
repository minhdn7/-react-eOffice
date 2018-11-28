import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import Header from './Header';
import ItemDocument from './ItemDocument';
import dataJson from '../../data/flatListData';

export default class DocManagement extends Component {

    componentDidMount(){
        // this.props.onGetListDocumentAction(1);// chuyen vao loai van ban
    }

    gotoDocumentDetail(){
        this.props.navigation.navigate('DocumentDetail');
    }

    render() {
        return (
            <View>
                <Header />
                <View style={{ backgroundColor: '#D3D3D3' }}>
                <FlatList
                    data={dataJson} 
                    renderItem={(item) => <ItemDocument data={item} gotoDocumentDetail={this.gotoDocumentDetail.bind(this)} navigator= {this.props.navigation}/>}
                    keyExtractor={(item, index) => index.toString()}
                />
                </View>
                
            </View>
            
        );
    }
}