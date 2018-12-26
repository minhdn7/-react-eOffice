import React, { Component } from 'react';
import { View, Text, FlatList, Dimensions, Alert } from 'react-native';
import styles from '../../styles/styleQLVanBan';
import HeaderLichSuXuLy from "../QLVanBan/HeaderLichSuXuLy";
import { connect } from "react-redux";
import * as lichSuXuLyAction from "../../actions/lichSuXuLy-action";
import * as rootActions from "../../actions/root-actions";
import { lang } from 'moment';

const { height, width } = Dimensions.get('window');

export class DocHistory extends Component {
    constructor(props) {
        super(props);
        this.listActivityLogServer = [];
        this.state = {
            flagLoad: true,
            docId: "",
            listActivityLog: [],
            //listActivityLogServer: [],
        };
    }

    componentWillMount() {
        this.props.dispatch(rootActions.controlProgress(false));
        var idDocument = this.props.navigation.getParam('idDocument', 'NO-ID');
        this.setState({
            docId: idDocument,
        });
        this.props.dispatch(lichSuXuLyAction.getListActivityLogAction(idDocument));
        // this.listActivityLogServer = this.props.lichSuXuLyReducer.get('listActivityLog');
    }

    componentWillReceiveProps() {
        var lstActivityLog =  this.props.lichSuXuLyReducer.get('listActivityLog');
        this.listActivityLogServer = this.props.lichSuXuLyReducer.get('listActivityLog');
        if(lstActivityLog != null && lstActivityLog.lenght != 0){
            this.setState({
                listActivityLog: lstActivityLog,
                //listActivityLogServer: lstActivityLog,
            });
        }
    }

    search = (value) => {
        var data = this.listActivityLogServer;
        console.log("1.value: ", value);
        console.log("2.Ban dau var data = this.state.listActivityLog: ", data);
        console.log("3.Ban dau var this.state.listActivityLogServer: ", this.listActivityLogServer);
        console.log("4.Ban dau var this.state.listActivityLog: ", this.state.listActivityLog);
        
        if (data != null && data.length != 0) {
            for (var i = 0; i < data.length; i++) {
                var parameter = data[i].parameter;
                //data[i].parameter = [];
                if(parameter != null && parameter.lenght != 0) {
                    data[i].parameter = parameter.filter(item => {
                        return item.status == (value != null ? value.toString() : "")
                    })
                    // for(var j=0;j< parameter.length;j++){
                    //     if(parameter[j].status == (value != null ? value.toString() : "")){
                    //         data[i].parameter.push(parameter[j]);
                    //     }
                    // }
                }
            }
            console.log("5.sau khi xu ly data: ", data);
            this.setState({
                listActivityLog: data,
            });
        }
        // console.log("sau khi xu ly data: ", data);
        // this.setState({
        //     listActivityLog: data,
        // });
        console.log("6.sau khi setState: ", this.state.listActivityLog);
    }

    render() {
        let dataView;
        if (this.state.listActivityLog != null && this.state.listActivityLog.length != 0) {
            dataView = <FlatList
                data={this.state.listActivityLog}
                renderItem={({ item, index }) => {
                    return (
                        <ItemView item={item} ></ItemView>
                    );
                }}
                keyExtractor={(item, index) => index.toString()}
            />
        } else {
            dataView = <Text></Text>;
        }
        return (
            <View style={{ flex: 1, flexDirection: "column" }}>
                <HeaderLichSuXuLy myTitle="Lịch sử xử lý văn bản"
                    search={this.search}
                    navigator={this.props.navigation} />


                {dataView}

            </View>
        );
    }
}

class ItemView extends Component {
    render() {
        let dataView;
        //alert("tesst : " + this.props.item.parameter.length);
        if (this.props.item.parameter != null && this.props.item.parameter.length != 0) {
            dataView = <FlatList
                data={this.props.item.parameter}
                renderItem={({ item, index }) => {
                    return (
                        <ItemInItemView parameter={item} ></ItemInItemView>
                    );
                }}
                keyExtractor={(item, index) => index.toString()}
            />
        } else {
            dataView = <Text></Text>;
        }
        return (
            <View style={{ flex: 1, margin: 3, }}>
                <View style={{ flex: 1, height: height * 0.07, justifyContent: 'center', backgroundColor: '#0099FF', borderTopRightRadius: 3, borderTopLeftRadius: 3 }}>
                    <Text style={{ textAlign: 'center', color: '#ffffff', fontWeight: 'bold' }}>{this.props.item.unit}</Text>
                </View>
                {dataView}
            </View>
        );
    }
}

class ItemInItemView extends Component {

    render() {
        let viewChuyenToi;
        let dataView;

        if (this.props.parameter.updateDate != null && this.props.parameter.updateDate.length > 0) {
            ngayGio = this.props.parameter.updateDate.split(" ");
        } else {
            ngayGio = "";
        }

        if (this.props.parameter.chuyenToi != null && this.props.parameter.chuyenToi.length > 0) {
            chuyenToi = this.props.parameter.chuyenToi.split("|");
            viewChuyenToi = chuyenToi.map((item, index) => {
                return (
                    <View style={styles.styleRow} key={index}>
                        <Text>{(item != null && item != "") ? item.split(":")[0] + ':' : ''}</Text>
                        <Text style={{ flex: 1, marginLeft: 10, fontWeight: 'bold' }}>{item.split(":")[1]}</Text>
                    </View>
                );
            })

        } else {
            viewChuyenToi = <Text></Text>;
        }

        // if (this.props.parameter.status != null && this.props.parameter.status != "" && this.props.parameter.status == this.state.status) {
        //     dataView = <View style={{ flex: 1 }}>
        //         <View style={{ flex: 1, height: height * 0.08, justifyContent: 'space-between', backgroundColor: '#CCCCCC', flexDirection: 'row', borderRadius: 3 }}>
        //             <View style={{ flex: 1, flexDirection: 'column', paddingTop: 5, paddingLeft: 5 }}>
        //                 <Text style={{ fontWeight: 'bold' }}>{this.props.parameter.fullName}</Text>
        //                 <Text>{this.props.parameter.updateBy}</Text>
        //             </View>
        //             <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-end', paddingTop: 5, paddingRight: 4 }}>
        //                 <Text>{ngayGio[0]}</Text>
        //                 <Text>{ngayGio[1]}</Text>
        //             </View>
        //         </View>
        //         <View style={{ flex: 1, marginTop: 3, flexDirection: 'column' }}>
        //             {viewChuyenToi}

        //         </View>
        //     </View>
        // } else {
        //     dataView = <Text></Text>;
        // }


        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, height: height * 0.08, justifyContent: 'space-between', backgroundColor: '#CCCCCC', flexDirection: 'row', borderRadius: 3 }}>
                    <View style={{ flex: 1, flexDirection: 'column', paddingTop: 5, paddingLeft: 5 }}>
                        <Text style={{ fontWeight: 'bold' }}>{this.props.parameter.fullName}</Text>
                        <Text>{this.props.parameter.updateBy}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-end', paddingTop: 5, paddingRight: 4 }}>
                        <Text>{ngayGio[0]}</Text>
                        <Text>{ngayGio[1]}</Text>
                    </View>
                </View>
                <View style={{ flex: 1, marginTop: 3, flexDirection: 'column' }}>
                    {viewChuyenToi}

                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        lichSuXuLyReducer: state.get('lichSuXuLyReducer'),
        root: state.get('root'),
    }
}

export default connect(mapStateToProps)(DocHistory);
