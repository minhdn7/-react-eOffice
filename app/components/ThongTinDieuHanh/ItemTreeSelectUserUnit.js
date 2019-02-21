import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from 'react-native';
import _styles from '../../styles/styleQLVanBan';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import CheckBox from 'react-native-check-box';
import { connect } from "react-redux";
import * as chuyenXuLyAction from "../../actions/chuyenXuLy-actions";

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
//let viewData = null;
class ItemTreeSelectUserUnit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.item,
            savedItem: null,
            //isCheckXLC: this.props.currentNode,
        };
    }

    handleCheckBoxClick = (item) => {
        //var item = this.props.item;
        item.isCheckXem = !item.isCheckXem;
        
        this.forceUpdate();
    }

    _renderView = (item) => {
        if (item != null && item != "undefined") {
            return (
                <View style={{ flex: 1, flexDirection: 'row', }} key={item} >

                    <TouchableOpacity style={{ flex: 6 }}
                        onPress={(e) => (item && item.children && item.children.length) ? this.props._onPressCollapse({ e, item }) : null} >
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.textName, {fontWeight: 'bold'}]}>{item.fullName}</Text>
                            <Text style={{marginLeft: 5}}>{item.chucVu}</Text>
                            <Text style={{marginLeft: 5}}>{item.email}</Text>
                        </View>
                    </TouchableOpacity>
                   
                    <View style={{ flex: 1 }}>
                        <CheckBox
                            onClick={() => { this.handleCheckBoxClick(item) }}
                            isChecked={item.isCheckXem}
                        />
                    </View>
                </View>
            )

        } else {
            return null;
        }
    }

    render() {
        const item = this.props.item;
        
        return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                {this._renderView(item)}
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    chuyenXuLyReducer: state.get('chuyenXuLyReducer'),
    //login: state.get('login'),
    //root: state.get('root'),
});

export default connect(mapStateToProps)(ItemTreeSelectUserUnit) 