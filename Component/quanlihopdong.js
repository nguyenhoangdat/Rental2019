
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
import {ListContract} from '../APIs/API';

export default class Batdongsan extends React.Component{
  constructor(props) {
    super(props);
    this.state = ({
      buildings: [],
      refreshing: false,
    });
  }
  componentDidMount = () => {
    this.refreshData();
  }
  refreshData () {
    const { navigation } = this.props;
    const UserID = navigation.getParam('UserID');
    const ID = navigation.getParam('ID');
    this.setState({ refreshing: true });
    ListContract(UserID,ID).then(res =>{
        obj =JSON.parse(res);
        this.setState({ buildings: obj });
        this.setState({ refreshing: false });
    })
  }
  _onRefresh = () => {
    this.refreshData();
  }
  renderItem = ({item}) => {
    let status = item.Status;
    let Stringstatus ='';
    if(status==1){
      Stringstatus= 'Đã duyệt';
    } else {
      Stringstatus= 'Chưa duyệt';
    }
    return(
      <View style={styles.contain}>
            <TouchableOpacity style={styles.content} onPress={()=> {
               this.props.navigation.navigate('Hopdong', {
                IDcontract:item.ID
              });
            }} >
                <View style={styles.implement1}>
                  <Text style={{color:'white'}}>{item.PropertyName}</Text>
                </View>
                <View style={styles.implementRow}>
                  <View style={styles.implementColumn1}>
                    <Text style={styles.Text1}> Mã KH:</Text>
                    <Text style={styles.Text1}> Tên KH</Text>
                    <Text style={styles.Text1}> Từ ngày:</Text>
                    <Text style={styles.Text1}> Đến ngày:</Text>
                    <Text style={styles.Text1}> Trạng thái:</Text>
                  </View>

                  <View style={styles.implementColumn2}>
                    <Text style={styles.Text}>{item.TennantID} </Text>
                    <Text style={styles.Text}> {item.TenantName}</Text>
                    <Text style={styles.Text}> {item.FromDate}</Text>
                    <Text style={styles.Text}> {item.ToDate}</Text>
                   <Text style={styles.TextColor}> {Stringstatus}</Text>
                 </View>
                </View>
                
            </TouchableOpacity>
      </View>
    )
  }
    render(){
        return(
          <View style={styles.contain}>
            <FlatList  
                   data={this.state.buildings}
                   renderItem={this.renderItem}
                   keyExtractor={(item, index) =>  index.toString() }
                   refreshControl={
                    <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={this._onRefresh}
                    />
                  }
                /> 
          </View>   
        )
    }
}
const styles = StyleSheet.create({
  contain:{
    marginTop:10,
    alignItems:"center",
    flex:0.8 ,
    flexDirection:'column',
  },
  TextColor:{
    marginTop:5,
    flex:0.2,
    marginLeft:10,
    color:'red'
  },
  Text:{
    marginTop:5,
    flex:0.2,
    marginLeft:10
  },
  Text1:{
    marginTop:5,
    flex:0.2,
    marginLeft:5
  },
  Title: {
    flex:0.2,
    marginTop:10,
    color:'green',
    textAlign:'center',
    fontSize:25,
  },
  Line:{
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  content:{
    flexDirection:'column',
    height:250,
    width:280,
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
    flexDirection:'column',
    flex:0.75,
    
  },
  implementColumn2:{
    flexDirection:'column',
    flex:1.25,
  },
}) 

