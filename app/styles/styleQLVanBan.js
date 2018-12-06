import { Dimensions, StyleSheet, Image } from 'react-native';

const { height, width } = Dimensions.get('window');
const backgroundColor = "#205AA7";

const styles = StyleSheet.create({
    // style header
    wrapper: { backgroundColor: backgroundColor, padding: 10, justifyContent: 'space-around' },
    row1: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 },
    textInput: {
        backgroundColor: '#FFF', paddingLeft: 0, paddingTop: 10,
        
        paddingRight: 10,
        paddingBottom: 10,
        borderRadius: 4,
    },
    iconStyle: { width: 20, height: 20 },
    titleStyle: { color: '#FFF', fontSize: 20 },
    searchSection: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 4,
    },
    searchIcon: {
        padding: 10,
    },


    // style ItemDocment
    container: {
        flex: 1, flexDirection: 'row', padding: 3, margin: 4, marginBottom: 2, backgroundColor: '#ffffff'
    },
    left: {
        width: width * 0.23, justifyContent: 'center', alignContent: 'center', marginRight: 3,
    },
    center: {
        width: width * 0.67,
    },
    right: {
        justifyContent: 'center'
    },
    textTitle: {
        fontSize: 18, fontWeight: 'bold',
    },
    textColor: {
        color: '#999999'
    },
    centerText: {
        color: 'black', marginBottom: 5, marginTop: 3,
    },
    textColorBlack: {
        color: 'black'
    },
    styleRow: {
        flexDirection: 'row',
        marginBottom: 2,
    },

    // style DocumentDetail
    content: {
        flex: 2,
        margin: 3,
        padding: 5,
        backgroundColor: '#ffffff'
    },
    btn: {
        flex: 1,
        height: 40,
        justifyContent: 'center', borderRadius: 5,
        marginRight: 3
    },
    btnText: {
        color: '#ffffff',
        textAlign: 'center',
    },
    styleCenter: { backgroundColor: '#D7D7D7', height: height * 0.57, marginTop: 5 },
    rowFooter: { flex: 1, flexDirection: 'row', paddingLeft: 5, marginTop: 10 },
    rowCotent: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    styleFontSize: {
        fontSize: 16,
    },

    iconStyle: { width: 20, height: 20 },
});

export default styles;