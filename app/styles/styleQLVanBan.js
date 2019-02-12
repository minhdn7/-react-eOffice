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
        flexDirection: 'row', 
        padding: 3, 
        margin: 4, 
        marginBottom: 2,
        justifyContent: 'space-between',
        backgroundColor: '#ffffff'
    },
    left: {
        width: width * 0.23, justifyContent: 'center', alignContent: 'center', marginRight: 3,
    },
    center: {
        width: width * 0.67,
    },
    right: {
        flexDirection: 'column',
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
        flex: 1,
        margin: 3,

        padding: 5,
        justifyContent:'center',
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
    styleCenter: { flex: 1, backgroundColor: '#D7D7D7', marginTop: 5},
    rowFooter: { flex: 1, flexDirection: 'row', paddingLeft: 5, marginTop: 10 },
    rowCotent: {
        flexDirection: 'row',
        marginBottom: 5,
        justifyContent: 'flex-start',

    },
    styleFontSize: {
        fontSize: 16,
    },

    iconStyle: { width: 20, height: 20 },

    //
    tableHeader: {
        height: height*0.07, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopLeftRadius: 5, borderTopRightRadius: 5
    },

    width15: {
        width: width*0.15,
    },
    width50: {
        width: width*0.5,
    },
    width45: {
        width: width*0.45,
    },
    styleCenterContent: {
        flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
    },

    dropdownStyle: {
        //width: width*0.4, height: height*0.25, 
        backgroundColor: "#0033FF",
    },
    dropdownTextStyle:{
        color: "#ffffff", fontSize: 15, backgroundColor: "#0033FF"
    },
    dropdownTextHighlightStyle: { color: "#ffffff" },

    btnSelect: {
        backgroundColor: backgroundColor,
    },
    btnTextUnselect: { color: "#205AA7", textAlign: 'center' },
    btnUnSelect: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#205AA7",  },
    btnChuaDoc: { height: 40, width: width*0.25, borderTopLeftRadius: 5, borderBottomLeftRadius: 5, },
    btnTatCa: { height: 40, width: width*0.25, borderTopRightRadius: 5, borderBottomRightRadius: 5, },
    btnXemDeBiet: { height: 40, width: width*0.25, justifyContent: 'center', alignItems: 'center' },
});

export default styles;