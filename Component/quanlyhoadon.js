import React from 'react';
import {
  FlatList,
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
  RefreshControl,
} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { ListInvoice, ListCreateInvoice } from '../APIs/API';
import RNPickerSelect from 'react-native-picker-select';
export default class chitiethopdong extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    let headerTitle = 'Quản lý hóa đơn'
    let headerRight = (
      <TouchableOpacity
        onPress={() => { params.onPressAddinvoice() }}
      >
        <Image style={{ height: 40, width: 40 }} source={{ uri: 'https://img.icons8.com/clouds/100/000000/plus.png' }}></Image>
      </TouchableOpacity>
    )
    return { headerRight, headerTitle }
  }
  _onPressAddinvoice() {
    if (this.state.tongtientra == 'Đã tạo hóa đơn.') {
      alert('Tháng này đã tạo hóa đơn');
    } else if (this.state.tongtientra == 'Chưa ghi điện nước.') {
      this.props.navigation.navigate('AddElectricwater', {
        ID: this.state.ID,
        UserID: this.state.UserID
      })
    } else {
      this.props.navigation.navigate('AddInvoice', {
        ID_Invoice: this.state.ID_invoice,
        ID: this.state.ID,
        UserID: this.state.UserID
      })
    }

  }
  constructor(props) {
    super(props);
    this.state = ({
      refreshing: false,
      buildings: [],
      TotalPrice: 0,
      ID_invoice: '',
      UserID: '',
      ID: '',
      tongtientra: ''
    });
    this.arrayholder = [];
  }
  componentDidMount() {
    this.refreshData();
    this.props.navigation.setParams({ onPressAddinvoice: this._onPressAddinvoice.bind(this) })
  }

  refreshData() {
    const { navigation } = this.props;
    const UserID = navigation.getParam('UserID');
    const ID = navigation.getParam('ID');
    this.setState({ refreshing: true });
    ListCreateInvoice(ID, UserID).then(res => {
      let obj = JSON.parse(res);
      tongtientra = obj.TongTienPhaiTra; 181
      this.setState({ tongtientra });
    })
    ListInvoice(UserID, ID).then(res => {
      obj = JSON.parse(res);
      try {
        var ID_invoice = obj[0].ID;
      } catch (error) {
      }
      var TotalPrice = 0;
      var len = obj.length;
      for (let i = 0; i < len; i++) {
        if (obj[i].Status != 1) {
          var Price = obj[i].Total;
          var TotalPrice = TotalPrice + Price;
        }
      }
      if (TotalPrice.toString() != 'NaN') {
        this.setState({ TotalPrice });
      }
      this.setState({ UserID });
      this.setState({ ID });
      this.setState({ ID_invoice });
      this.setState({ buildings: obj });
      this.setState({ refreshing: false });
      this.arrayholder = obj;
    })
  }
  _onRefresh = () => {
    this.refreshData();
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.navigation !== this.props.navigation){
      const { navigation } = this.props;
      const UserID = navigation.getParam('UserID');
      const ID = navigation.getParam('ID');
      ListCreateInvoice(ID, UserID).then(res => {
        let obj = JSON.parse(res);
        tongtientra = obj.TongTienPhaiTra; 181
        this.setState({ tongtientra });
      })
      ListInvoice(UserID, ID).then(res => {
        obj = JSON.parse(res);
        var TotalPrice = 0;
        var len = obj.length;
        for (let i = 0; i < len; i++) {
          if (obj[i].Status != 1) {
            var Price = obj[i].Total;
            var TotalPrice = TotalPrice + Price;
          }
        }
        if (TotalPrice.toString() != 'NaN') {
          this.setState({ TotalPrice });
        }
        this.setState({ buildings: obj });
        this.arrayholder = obj;
      })
    }

    if (prevState.buildings !== this.state.buildings) {
      let myJsonString = JSON.parse(JSON.stringify(this.state.buildings));
      let TotalPrice = 0;
      for (i = 0; i < myJsonString.length; i++) {
        var price = myJsonString[i].Price;
        TotalPrice = TotalPrice + price;
      }
      if (TotalPrice.toString() != 'NaN') {
        this.setState({ TotalPrice });
      }
    }
  }
  onPressDetail = () => {
    this.props.navigation.navigate('DetailInvoice', {
      ID_Invoice: this.state.ID_invoice,
    });
  }
  renderItem = ({ item }) => {
    let date = item.DateCreate;
    let StringMonthYear = new Date(date);
    let MonthYear = StringMonthYear.getMonth() + '/' + StringMonthYear.getFullYear();

    let Status = item.Status;
    let StringStatus = '';
    if (Status == 1) {
      StringStatus = 'Đã Thanh Toán';
    } else {
      StringStatus = 'Chưa Thanh Toán';
    }
    return (
      <View style={styles.contain}>
        <TouchableOpacity style={styles.content} onPress={this.onPressDetail}>
          <View style={styles.implement1}>
            <Text style={{ color: 'white' }}>{MonthYear}</Text>
          </View>
          <View style={styles.implementColumn}>
            <View style={styles.implementRow1}>
              <Text style={styles.Text}> {item.ID}</Text>
              <Text style={styles.TextStatus}> {item.Total} </Text>
            </View>
            <View style={styles.implementRow2}>
              <Text style={styles.Text}> {StringStatus}</Text>
            </View>
            <View style={styles.implementRow3}>
            </View>

          </View>

        </TouchableOpacity>
      </View>
    )
  }
  searchType(text) {
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.Status}`;
      const textData = text;
      return itemData.indexOf(textData) > -1;
    });

    this.setState({ buildings: newData });
  }
  render() {
    return (
      <View style={styles.contain1}>
        <View style={styles.content1}>
          <RNPickerSelect
            placeholder={{
              label: 'Tìm kiếm loại hóa đơn...',
              value: null,
            }}
            onValueChange={(value) => this.searchType(value)}
            items={[
              { label: 'Đã thanh toán', value: '1' },
              { label: 'Chưa thánh toán', value: '0' },
            ]}
            style={pickerStyle}
          />
        </View>
        <View style={styles.content3}>
          <Text style={styles.TextTongthu}>Tổng phải trả:</Text>
          <View style={styles.Linerowleft}></View>
          <Text style={styles.TextSotien}>{this.state.TotalPrice}</Text>
          <View style={styles.Linerowright}></View>
        </View>
        <View style={styles.content2}>
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
      </View>
    )
  }
}

const styles = StyleSheet.create({
  contain: {
    marginTop: 20,
    flex: 1,
    flexDirection: 'column',
  },
  content5: {
    justifyContent: 'center',
    alignItems: "center",
    height: 35,
    width: 200,
    borderRadius: 10,
    backgroundColor: 'green'
  },
  content4: {
    justifyContent: 'center',
    alignItems: "center",
    height: 40,
    width: 100,
    borderRadius: 10,
    backgroundColor: 'green'
  },
  TextChitiet: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center'
  },
  contain1: {
    marginTop: 20,
    flex: 1,
    flexDirection: 'column',
  },
  Linerowleft: {
    flex: 1,
    borderLeftColor: 'black',
    borderLeftWidth: 1
  },
  Linerowright: {
    flex: 1,
    borderRightColor: 'black',
    borderRightWidth: 1
  },
  TextTongthu: {
    color: 'white',
    marginLeft: 10,
    flex: 29
  },
  TextSotien: {
    color: 'white',
    flex: 69
  },
  content1: {
    flex: 10,
    flexDirection: 'column',
  },
  content3: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    backgroundColor: 'green',
    alignItems: 'center',
    flex: 7,
    flexDirection: 'row',
  },
  content2: {
    textAlign: 'center',
    justifyContent: "center",
    alignItems: "center",
    flex: 85,
    flexDirection: 'column',
  },
  TextStatus: {

    marginTop: 5,
    flex: 0.4,
    marginLeft: 23,
    color: 'green'
  },
  Text: {
    marginTop: 5,
    flex: 0.4,
    marginLeft: 10
  },
  Title: {
    marginTop: 10,
    textAlign: "center",
    color: 'green',
    fontSize: 25,
  },
  Line: {
    marginTop: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  content: {
    flexDirection: 'column',
    height: 180,
    width: 280,
  },
  implementColumn: {
    flexDirection: 'column',
    flex: 75,
    borderWidth: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  implement1: {
    backgroundColor: 'green',
    alignItems: "center",
    justifyContent: "center",
    flex: 25,
    borderWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  implementRow3: {
    justifyContent: "center",
    alignItems: 'center',
    marginTop: 3,
    flexDirection: 'row',
    flex: 1,
  },
  implementRow1: {
    marginTop: 8,
    flexDirection: 'row',
    flex: 50,

  },
  implementRow2: {
    marginTop: 8,
    flexDirection: 'row',
    flex: 50,
  },
})
const pickerStyle = {
  inputIOS: {
    backgroundColor: 'green',
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: 'white',
    paddingRight: 30,
  },
  inputAndroid: {
    height: 35,
    backgroundColor: 'green',
    fontSize: 16,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'white',
    paddingRight: 30,
  },
  viewContainer: {
    borderRadius: 4,
    borderWidth: 1,
  },
  placeholderColor: 'white',
  underline: { borderTopWidth: 0 },
  icon: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderTopWidth: 5,
    borderTopColor: '#00000099',
    borderRightWidth: 5,
    borderRightColor: 'transparent',
    borderLeftWidth: 5,
    borderLeftColor: 'transparent',
    width: 0,
    height: 0,
    top: 20,
    right: 15,
  },
};