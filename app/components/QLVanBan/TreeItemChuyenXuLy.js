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
class TreeItemChuyenXuLy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.item,
            savedItem: null,
            //isCheckXLC: this.props.currentNode,
        };
    }

    // shouldComponentUpdate(nextProps, nextState){
    //     return nextProps.savedXLC == this.props.item.id
    // }

    handleRadioButtonClick = (item) => {
        this.props.handleCheckXlcClick(item.id, item.parentId);
        
        if (item) {
            item.isCheckXLC = true;
            item.isCheckPH = false;
            item.isCheckXem = false;
        }
        this.forceUpdate();
        //this.addItemToListDataSelect();
    }
    handleCheckBoxClick = (item, type) => {
        //var item = this.props.item;
        item.isCheckXLC = false;
        let value;
        if (type == "PH") {
            item.isCheckPH = !item.isCheckPH;
            item.isCheckXem = false;
            value = item.isCheckPH;
        } else {
            item.isCheckXem = !item.isCheckXem;
            item.isCheckPH = false;
            value = item.isCheckXem;
        }
        this.forceUpdate();

        //this.addItemToListDataSelect();
        //this.props.handleCheckBoxClick(id, value + type);

    }

    addItemToListDataSelect = () => {
        var item = this.props.item;
        var lstDataSelect = this.props.chuyenXuLyReducer.get('lstDataSelect');
        if (lstDataSelect && lstDataSelect.length) {
            for (let i = 0; i < lstDataSelect.length; i++) {
                if (lstDataSelect[i].id == item.id) {
                    lstDataSelect[i] = item;
                    //lstDataSelect[i].children = [];
                    this.props.dispatch(chuyenXuLyAction.setListDataSelectAction(lstDataSelect));
                    return;
                }
            }
        }
        lstDataSelect.push(item);
        this.props.dispatch(chuyenXuLyAction.setListDataSelectAction(lstDataSelect));
    }

    _renderView = (item) => {
        if (item != null && item != "undefined") {
            return (
                <View style={{ flex: 1, flexDirection: 'row', }} key={item} >

                    <TouchableOpacity style={{ flex: 6 }}
                        onPress={(e) => (item && item.children && item.children.length) ? this.props._onPressCollapse({ e, item }) : null} >
                        <View style={{ flex: 1 }}>

                            <Text style={styles.textName}>{item.name}</Text>

                        </View>
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        {/* <RadioForm> */}
                        <RadioButton key={item.id}>
                            <RadioButtonInput
                                obj={[{ label: '', value: item.id }]}
                                //initial={0}
                                buttonSize={10}
                                selectedButtonColor={'black'}
                                buttonColor={'black'}
                                isSelected={item.isCheckXLC}
                                //isSelected={itemIsCheckXlc && itemIsCheckXlc.id == item.id && itemIsCheckXlc.parentId == item.parentId}
                                onPress={() => { this.handleRadioButtonClick(item) }}
                            />
                        </RadioButton>

                    </View>
                    <View style={{ flex: 1 }}>
                        <CheckBox
                            onClick={() => { this.handleCheckBoxClick(item, "PH") }}
                            isChecked={item.isCheckPH}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <CheckBox
                            onClick={() => { this.handleCheckBoxClick(item, "XEM") }}
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

export default connect(mapStateToProps)(TreeItemChuyenXuLy) 