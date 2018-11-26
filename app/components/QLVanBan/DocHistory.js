import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from '../../styles/styleQLVanBan';

export default class DocumentDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (

            <View style={styles.container}>
                {/* <View style={{ height: height * 0.12, backgroundColor: '#205AA7' }}>
                        <Text>Header</Text>
                    </View> */}
                <ScrollView>
                    <View style={{ margin: 3, flex: 1 }}>
                        <View style={{ height: 40, justifyContent: 'center', backgroundColor: '#0099FF' }}>
                            <Text style={{ textAlign: 'center', color: '#ffffff', fontWeight: 'bold' }}>Tập đoàn Bưu chính Viễn thông</Text>
                        </View>
                        <View style={{ height: 50, justifyContent: 'space-between', backgroundColor: '#CCCCCC', flexDirection: 'row' }}>
                            <View style={{ flex : 1, flexDirection: 'column', paddingTop: 5, paddingLeft: 5 }}>
                                <Text style={{ fontWeight: 'bold' }}>Nguyễn Thanh Thảo</Text>
                                <Text>(thanh thao)</Text>
                            </View>
                            <View style={{ flex : 1, flexDirection: 'column', alignItems: 'flex-end', paddingTop: 5, paddingRight: 4 }}>
                                <Text>18/10/2018</Text>
                                <Text>15:26</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 5 }}>
                            <View style={styles.rowFooter}>
                                <Text>Chuyển tới:</Text>
                                <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>Phạm Đức Long</Text>
                            </View>
                            <View style={styles.rowFooter}>
                                <Text>Đồng xử lý:</Text>
                                <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>Phạm Đức Long</Text>
                            </View>
                            <View style={styles.rowFooter}>
                                <Text>Đồng gửi:</Text>
                                <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>Phạm Đức Long</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>

            </View>
        );
    }
}
