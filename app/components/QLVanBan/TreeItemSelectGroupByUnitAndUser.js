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

class TreeItemChuyenXuLy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.item,
            isCheckXLC: this.props.currentNode,
        };
    }

    handleRadioButtonClick = (idNew) => {
        //if(idOld == idNew) return;

        var item = this.state.data;
        if (item) {
            item.isCheckXLC = true;
            item.isCheckPH = false;
            item.isCheckXem = false;
            this.setState({
                data: item,
                //isCheckXLC: idNew
            })
        }
        this.addItemToListDataSelect(item);
        this.props.handleCheckXlcClick(idNew);

    }

    handleCheckBoxClick = (idNew, type) => {

        var item = this.state.data;
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

        if (!item.parentId) {
            this.changeStatus(item, type, value);
        }else{
            this.addItemToListDataSelect(item);
        }

        this.setState(() => {
            return {
                data: item,
                //isCheckXLC: "",
            }
        });
        this.props.handleCheckBoxClick(idNew, value + type);
    }

    changeStatus = (data, type, value) => {
        if (data.children && data.children.length) {
            for (let i = 0; i < data.children.length; i++) {
                if (type == "PH") {
                    if (value == true) {
                        data.children[i].isCheckXem = false;
                        data.children[i].isCheckXLC = false;
                    }
                    data.children[i].isCheckPH = value;
                } else {
                    if (value == true) {
                        data.children[i].isCheckPH = false;
                        data.children[i].isCheckXLC = false;
                    }
                    data.children[i].isCheckXem = value;
                }
                this.addItemToListDataSelect(data.children[i]);
            }
        }
    }

    addItemToListDataSelect = (item) => {
        let lstDataSelect = [];
        lstDataSelect = this.props.chuyenXuLyReducer.get('lstDataSelectByUnitOrUser');
        if (lstDataSelect && lstDataSelect.length) {
            for (let i = 0; i < lstDataSelect.length; i++) {
                if (lstDataSelect[i].id == item.id) {
                    lstDataSelect[i] = item;
                    //lstDataSelect[i].children = [];
                    this.props.dispatch(chuyenXuLyAction.setListDataSelectByUnitOrUserAction(lstDataSelect));
                    return;
                }
            }
        }
        lstDataSelect.push(item);
        this.props.dispatch(chuyenXuLyAction.setListDataSelectByUnitOrUserAction(lstDataSelect));
    }

    render() {
        const item = this.state.data;
        let viewData;
        if (item != null && item != "undefined") {
            viewData =
                <View style={{ flex: 1, flexDirection: 'row', }}>

                    <TouchableOpacity style={{ flex: 6 }}
                        onPress={(e) => (item && item.children && item.children.length) ? this.props._onPressCollapse({ e, item }) : null} >
                        <View style={{ flex: 1 }}>

                            <Text style={styles.textName}>{item.name}</Text>

                        </View>
                    </TouchableOpacity>
                    {item.parentId ? <View style={{ flex: 1 }}>
                        <RadioButton key={item.id}>
                            <RadioButtonInput
                                obj={[{ label: '', value: item.id }]}
                                //initial={0}
                                buttonSize={10}
                                selectedButtonColor={'black'}
                                buttonColor={'black'}
                                // isSelected={this.props.currentNode === item.id}
                                isSelected={item.isCheckXLC}
                                onPress={() => { this.handleRadioButtonClick(item.id) }}
                            />
                        </RadioButton>
                    </View> : null}

                    <View style={{ flex: 1 }}>
                        <CheckBox
                            onClick={() => { this.handleCheckBoxClick(item.id, "PH") }}
                            isChecked={item.isCheckPH}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <CheckBox
                            onClick={() => { this.handleCheckBoxClick(item.id, "XEM") }}
                            isChecked={item.isCheckXem}
                        />
                    </View>
                </View>
        } else {
            viewData = null;
        }
        return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                {viewData}
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