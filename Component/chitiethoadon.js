
import React from 'react';
import {
    TouchableOpacity,
    TouchableWithoutFeedback,
    TextInput,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image,
    StatusBar,
    FlatList,
    RefreshControl,
} from 'react-native';
import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { ListInvoiceDetail } from '../APIs/API'
export default class Batdongsan extends React.Component {
   
    constructor(props) {
        super(props);
        this.state = ({
            refreshing: false,
            buildings: [],
            sotien:'',
            nguoinop:'',
            ngaynop:'',
            hinhthuc:'',
            tongtien:'',
            giamgia:'',
            tongsaugiamgia:'',
            vat:'',
            tongcong:'',
        });
    }
    componentDidMount() {
        this.refreshData();
    }
    refreshData() {
        const { navigation } = this.props;
        const ID_Invoice = navigation.getParam('ID_Invoice');
        this.setState({ refreshing: true });

        ListInvoiceDetail(ID_Invoice).then(res => {
            let obj = JSON.parse(res);
            let services = obj.services;

            let sotien = obj.SoTienDaTra;
            let nguoinop = obj.NguoiTra;
            let ngaynop = obj.NgayTra;
            let hinhthuc = obj.HinhThuc;
            let tongtien = obj.TongTien;
            let giamgia = obj.GiamGia;
            let tongsaugiamgia = obj.TongTienSauGiamGia;
            let vat = obj.VAT;
            let tongcong = obj.TongTienPhaiTra;

            this.setState({ buildings: services });

            this.setState({ sotien });
            this.setState({ nguoinop });
            this.setState({ buildings: services });
            this.setState({ ngaynop });
            this.setState({ hinhthuc });
            this.setState({ tongtien });
            this.setState({ giamgia });
            this.setState({ tongsaugiamgia });
            this.setState({ vat });
            this.setState({ tongcong });
            this.setState({ refreshing: false });
        });
    }
    _onRefresh = () => {
        this.refreshData();
    }
    renderItem = ({ item }) => {
        let Dau ='';
        let Cuoi ='';
        if(item.Dau != null){
             Dau = item.Dau
        } else {
             Dau ='-'
        } 
        if(item.Cuoi != null){
            Cuoi = item.Cuoi
       } else {
            Cuoi ='-'
       } 
        return (
            <View style={styles.content4}>
                <View style={styles.contentColumn1}>
                    <Text style={styles.textsmallGreen}>{item.NameService}:</Text>
                    <Text style={styles.textsmallGreen}>{item.Price}</Text>
                </View>
                <View style={styles.contentColumn2}>
                <Text style={styles.textsmallGreen}>Chỉ số đầu:</Text>
                    <Text style={styles.textsmallGreen}>{Dau}</Text>
                </View>
                <View style={styles.contentColumn3}>
                <Text style={styles.textsmallGreen}>Chỉ số cuối:</Text>
                    <Text style={styles.textsmallGreen}>{Cuoi}</Text>
                </View>
                <View style={styles.contentColumn4}>
                <Text style={styles.textsmallGreen}>Sô lượng:</Text>
                    <Text style={styles.textsmallGreen}>{item.SoLuong}</Text>
                </View>
                <View style={styles.lineBottom}></View>
            </View>
        )
    }

    render() {
        let ngay = new Date(this.state.ngaynop);
        let ngaythangnam = ngay.getDate() + '/' + ngay.getMonth() + '/' + ngay.getFullYear();
        return (
            <View style={styles.contain}>
                <View style={styles.content1}>
                    <Text style={styles.textWhite}>Thông tin thanh toán</Text>
                </View>
                <View style={styles.content2}>
                    <View style={styles.contentRow1}>
                        <Text style={styles.textsmallGreenFirst}>Số tiền:</Text>
                        <Text style={styles.textsmallWhite}>Người nộp:</Text>
                        <Text style={styles.textsmallWhite}>Ngày nộp:</Text>
                        <Text style={styles.textsmallWhite}>Hình thức:</Text>
                    </View>
                    <View style={styles.contentRow2}>
                        <Text style={styles.textsmallGreenFirst}>{this.state.sotien}</Text>
                        <Text style={styles.textsmallWhite}>{this.state.nguoinop}</Text>
                        <Text style={styles.textsmallWhite}>{ngaythangnam}</Text>
                        <Text style={styles.textsmallWhite}>{this.state.hinhthuc}</Text>
                    </View>

                </View>
                <View style={styles.content3}>
                    <Text style={styles.textWhite}>Chi tiết hóa đơn</Text>
                </View>
                <View style={styles.content5}>
                <FlatList
                    
                    data={this.state.buildings}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                />
                </View>
               
                <View style={styles.content7}>
                    <View style={styles.contentRow1}>
                        <Text style={styles.textsmallGreen}>Tổng tiền:</Text>
                        <Text style={styles.textsmallGreen}>Giảm giá:</Text>
                        <Text style={styles.textsmallGreen}>Tổng sau giảm giá:</Text>
                        <Text style={styles.textsmallGreen}>VAT:</Text>
                        <Text style={styles.textsmallGreen}>Tổng cộng:</Text>
                    </View>
                    <View style={styles.contentRow2}>
                        <Text style={styles.textsmallGreen}>{this.state.tongtien}</Text>
                        <Text style={styles.textsmallGreen}>{this.state.giamgia}</Text>
                        <Text style={styles.textsmallGreen}>{this.state.tongsaugiamgia}</Text>
                        <Text style={styles.textsmallGreen}>{this.state.vat}</Text>
                        <Text style={styles.textsmallGreen}>{this.state.tongcong}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contain: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'green'
    },

    lineBottom:{
        marginTop: 5,
        borderWidth: 0.5,
        borderBottomColor:'#EAE8E8'
    },
    content1: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginTop: 5,
        flex: 5,
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'white',
        marginLeft: 10,
        marginRight: 10
    },
    content2: {
        flex: 20,
        flexDirection: 'row',
        backgroundColor: 'white',
        margin:10,
    },
    contentRow1: {
        flex: 1,
        flexDirection: 'column',
    },
    contentRow2: {
        flex: 1,
        flexDirection: 'column',
    },
    contentColumn1: {
        flex: 1,
        flexDirection: 'row',
    },
    contentColumn2: {
        flex: 1,
        flexDirection: 'row',
    },
    contentColumn3: {
        flex: 1,
        flexDirection: 'row',
    },
    contentColumn4: {
        flex: 1,
        flexDirection: 'row',
    },
    content3: {
        flex: 5,
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'white',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
    },
   content4: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 8,
    },
    content5: {
        flex: 45,
        backgroundColor: 'white',
        marginLeft: 10,
        marginRight: 10,
        marginBottom:10,
    },
    content6: {
        flex: 15,
        flexDirection: 'row',
        backgroundColor: 'white',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
    },
    content7: {
        flex: 25,
        flexDirection: 'row',
        backgroundColor: 'white',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
    },
    textWhite: {
        color: 'green',
        fontSize: 17,
    },
    textsmallWhite: {
        marginLeft: 10,
        marginTop: 13,
        color: 'black',
        fontSize: 14,
    },
    textsmallGreenFirst: {
        marginLeft: 10,
        marginTop: 5,
        color: 'black',
        fontSize: 14,
    },
    textsmallGreen: {
        marginLeft: 10,
        marginTop: 13,
        color: 'black',
        fontSize: 14,
    }
})