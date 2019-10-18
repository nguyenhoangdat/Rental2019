
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
import {ListExpenditure} from '../APIs/API';
import RNPickerSelect from 'react-native-picker-select';

export default class Caidat extends React.Component{
  constructor(props) {
    super(props);
    this.state = ({
      refreshing: false,
      buildings: [],
      TotalPrice:0
    });
    this.arrayholder = [];
  }
  componentDidMount = () => {
    this.refreshData();
  }
  refreshData () {
    const { navigation } = this.props;
    const UserID = navigation.getParam('UserID');
    this.setState({ refreshing: true });
    ListExpenditure(UserID).then(res =>{
        obj =JSON.parse(res);
        var TotalPrice = 0;
        var len = obj.length;
        for (let i = 0; i < len; i++) {
          var Price = obj[i].Price;
          var TotalPrice = TotalPrice + Price;
      }
      this.setState({TotalPrice});
      this.setState({ buildings: obj });
      this.setState({ refreshing: false });
        this.arrayholder = obj;
    })
  }
  _onRefresh = () => {
    this.refreshData();
  }
  componentDidUpdate(prevProps,prevState){
    if(prevState.buildings !== this.state.buildings){
    let myJsonString = JSON.parse(JSON.stringify(this.state.buildings));
    let TotalPrice = 0;
    for(i = 0 ; i < myJsonString.length;i++){
      var price = myJsonString[i].Price;
      TotalPrice = TotalPrice + price;
    }
    this.setState({TotalPrice});
  }
  }
  searchType(text){
    const newData = this.arrayholder.filter(item => {      
    const itemData = `${item.Type}`;
    const textData = text;
    return itemData.indexOf(textData) > -1;    
 });
 
 this.setState({ buildings: newData });  
}
searchTime(text){
  const newData = this.arrayholder.filter(item => {   
  const itemData = `${new Date(item.SpendDate).getMonth()}`;
  const textData = text;
  return itemData.indexOf(textData) > -1;    
});
this.setState({ buildings: newData });  
}
  renderItem = ({item}) => {
    let collect = item.SpendDate;
    let date = new Date(collect);
    date1 =  date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
    return(
      <View style={styles.contain}>
            <TouchableOpacity style={styles.content}>
                <View style={styles.implement1}>
                  <Text style={{color:'white'}}>{item.NameProperty}</Text>
                </View>
                <View style={styles.implementRow}>
                  <View style={styles.implementColumn1}>
                    <Text style={styles.Text1}> Số tiền:</Text>
                    <Text style={styles.Text1}> Loại Chi:</Text>
                    <Text style={styles.Text1}> Nội dung:</Text>
                    <Text style={styles.Text1}> Hình thức chi:</Text>
                    <Text style={styles.Text1}> Ngày Chi:</Text>
                    <Text style={styles.Text1}> Ghi chú:</Text>
                  </View>
                  
                  <View style={styles.implementColumn2}>
                   <Text style={styles.Text}> {item.Price}</Text>
                   <Text style={styles.Text}> {item.Payment}</Text>
                   <Text style={styles.Text}> {item.Reason}</Text>
                   <Text style={styles.Text}> {item.Type}</Text>
                   <Text style={styles.Text}> {item.Note}</Text>
                   <Text style={styles.Text}> {date1}</Text>
                 </View>
                </View>
                
            </TouchableOpacity>
      </View>
    )
  }
  render(){
    return(
      //View ALL
      <View style={styles.contain1}>
          <View style={styles.content1}>
            <RNPickerSelect
              placeholder={{
                label: 'Tìm theo loại chi...',
                value: null,
              }}
              onValueChange={(value) => this.searchType(value)}
              items={[
                { label: 'Chi cọc', value: 'Cọc' },
                { label: 'Khác', value: 'Khác' },
            
              ]}
              style={pickerStyle}
            />
          </View>
          <View style={styles.content2}>
            <RNPickerSelect
              placeholder={{
                label: 'Tìm theo tháng...',
                value: null,
              }}
              onValueChange={(value) => this.searchTime(value)}
              items={[
                { label: 'Tháng 1', value: '1' },
                { label: 'Tháng 2', value: '2' },
                { label: 'Tháng 3', value: '3' },
                { label: 'Tháng 4', value: '4' },
                { label: 'Tháng 5', value: '5' },
                { label: 'Tháng 6', value: '6' },
                { label: 'Tháng 7', value: '7' },
                { label: 'Tháng 8', value: '8' },
                { label: 'Tháng 9', value: '9' },
                { label: 'Tháng 10', value: '10' },
                { label: 'Tháng 11', value: '11' },
                { label: 'Tháng 12', value: '12' },
              ]}
              style={pickerStyle2}
            />
          </View>
          <View style={styles.content3}>
              <Text style={styles.TextTongthu}>Tổng chi:</Text>
              <View style={styles.Linerowleft}></View>
              <Text style={styles.TextSotien}>{this.state.TotalPrice}</Text>
              <View style={styles.Linerowright}></View>
          </View>
          <View style={styles.content6}>
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

    );
  }
}
const styles = StyleSheet.create({
  contain1:{
    marginTop:5,
    flex:1,
    flexDirection:'column',
  },  
  contain:{
    marginTop:10,
    flex:1,
    flexDirection:'column',
  }, 
  Linerowleft:{
    flex:1,
    borderLeftColor:'black',
    borderLeftWidth:1
  }, 
  Linerowright:{
    flex:1,
    borderRightColor:'black',
    borderRightWidth:1
  },
  TextTongthu:{
    color:'white',
    marginLeft:10,
    flex:29
  },
  TextSotien:{
    color:'white',
    flex:69
  },
  content1:{
    marginTop:5,
    flex:7 ,
    flexDirection:'column',
  },
  
  LineBottom:{
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  
  LineTop:{
    marginTop:5,
    borderTopColor: 'black',
    borderTopWidth: 1,
  },
  content2:{
    marginTop:5,
    flex:7 ,
    flexDirection:'column',
  },
  content3:{
    marginTop:5,
    borderWidth:1,
    borderColor:'black',
    backgroundColor:'green',
    alignItems:'center',
    flex:7 ,
    flexDirection:'row',
  },

  content6:{
    marginTop:5,
    textAlign:'center',
    justifyContent:"center",
    alignItems:"center",
    flex:90 ,
    flexDirection:'column',
  },
  Text:{
    marginTop:5,
    flex:0.4,
    marginLeft:10
  },
  Text1:{
    marginTop:5,
    flex:0.4,
    marginLeft:5
  },
  content:{
    flexDirection:'column',
    height:270,
    width:300,
  },
  implementRow:{
    flexDirection:'row',
    flex:2,
    borderWidth:1,
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20
  },
  implement1:{
    backgroundColor:'green',
    alignItems:"center",
    justifyContent:"center",
    flex:0.5,
    borderWidth:1,
    borderTopLeftRadius:20,
    borderTopRightRadius:20
  },
 
  implementColumn1:{
    marginTop:10,
    flexDirection:'column',
    flex:0.8,
    
  },
  implementColumn2:{
    marginTop:10,
    flexDirection:'column',
    flex:1.2,
  },
}) 

const pickerStyle = {
	inputIOS: {
        backgroundColor:'green',
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderColor: 'black',
        color: 'white',
        paddingRight: 30,
	},
	inputAndroid: {
        height:30,
        backgroundColor:'green',
        fontSize: 16,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'white',
        paddingRight: 30,
  },
  viewContainer:{
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

const pickerStyle2 = {
	inputIOS: {
        backgroundColor:'green',
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderColor: 'black',
        color: 'white',
        paddingRight: 30,
	},
	inputAndroid: {
    height:30,
    backgroundColor:'green',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
    paddingRight: 30,
  },
  viewContainer:{
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