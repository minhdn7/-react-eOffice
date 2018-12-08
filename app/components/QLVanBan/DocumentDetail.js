import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../../styles/styleQLVanBan';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import strings from "../../resources/strings";
import DefaultHeader from '../navigation/DefaultHeader';

// test 2

export default class DocumentDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View>
                <DefaultHeader myTitle= {strings.chiTietVanBan} navigator= {this.props.navigation} />
            
                {/* <View style={[styles.container, {padding:0}]}> */}
           
                <ScrollView>
                    <View style={styles.styleCenter}>
                        <View style={styles.content}>
                            <View style={styles.rowCotent}>
                                <Text style={[styles.textColor, styles.styleFontSize]}>Trích yếu: </Text>
                                <Text style={[styles.textColorBlack, styles.styleFontSize, { fontWeight: 'bold' }]}>Trich Yeu abc</Text>
                            </View>
                            <View style={styles.rowCotent}>
                                <Text style={[styles.textColor, styles.styleFontSize]}>Số ioffice: </Text>
                                <Text style={styles.textColorBlack}>1001775</Text>
                            </View>
                            <View style={styles.rowCotent}>
                                <Text style={[styles.textColor, styles.styleFontSize]}>CQBH: </Text>
                                <Text style={[styles.textColorBlack, styles.styleFontSize]}>UBNN HA NOI</Text>
                            </View>
                            <View style={styles.rowCotent}>
                                <Text style={[styles.textColor, styles.styleFontSize]}>Số ký hiệu: </Text>
                                <Text style={[styles.textColorBlack, styles.styleFontSize, { color: 'red' }]}>ATVBNo1001775</Text>
                            </View>
                            <View style={styles.rowCotent}>
                                <Text style={[styles.textColor, styles.styleFontSize]}>Ngày đến:</Text>
                                <Text style={[styles.textColorBlack, styles.styleFontSize]}>18/10/2018</Text>
                            </View>
                            <View style={styles.rowCotent}>
                                <Text style={[styles.textColor, styles.styleFontSize]}>Ngày VB:</Text>
                                <Text style={[styles.textColorBlack, styles.styleFontSize]}>18/10/2018</Text>
                            </View>
                            <View style={styles.rowCotent}>
                                <Text style={[styles.textColor, styles.styleFontSize]}>Hình thức VB:</Text>
                                <Text style={[styles.textColorBlack, styles.styleFontSize]}>Công văn</Text>
                            </View>
                            <View style={styles.rowCotent}>
                                <Text style={styles.textColor}>Độ khẩn:</Text>
                                <Text style={[styles.textColorBlack, styles.styleFontSize]}>Thường</Text>
                            </View>
                            <View style={styles.rowCotent}>
                                <Text style={[styles.textColor, styles.styleFontSize]}>Tệp tin đính kèm:</Text>
                                <MaterialIcons name="insert-link" size={23} color="black" />
                            </View>
                            <View style={styles.rowCotent}>
                                <TouchableOpacity style={[styles.btn, { backgroundColor: '#EE7C6B' }]}>
                                    <Text style={styles.btnText}>Kết thúc</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.btn, { backgroundColor: '#367517' }]}>
                                    <Text style={styles.btnText}>Đánh dấu</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={{ height: 1, borderWidth: 1, borderStyle: 'solid', borderColor: '#D7D7D7', backgroundColor: '#D7D7D7', marginTop: 5 }} />
                        </View>
                        <Text style={{ color: '#205AA7', fontWeight: 'bold', fontSize: 16, paddingTop: 12 }}>Tổng hợp ý kiến xử lý</Text>
                    </View>
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

            {/* </View> */}
            </View>
            
        );
    }
}
