
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
} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {DetailContract} from '../APIs/API';
import {ListService} from '../APIs/API';
export default class chitiethopdong extends React.Component{

  constructor(props) {
    super(props);
    this.state = ({
      TenantName:''
    });
  }

  componentDidMount = () => {
    const { navigation } = this.props;
    const IDcontract = navigation.getParam('IDcontract');
    DetailContract(IDcontract).then(res =>{
        obj =JSON.parse(res);
        TenantName1= obj.TenantName;
        this.setState({ TenantName:TenantName1 });
    });
    ListService(IDcontract).then(res =>{
      obj =JSON.parse(res);
      this.setState({ buildings: obj });
  })
  }
  renderItem = ({item}) => {
    return(
      <View style={{flex:1,flexDirection:'row'}}>
        <View style={{flex:1, marginLeft:20, marginTop:20}}>
          <Text>{item.Name}</Text>
        </View>
        <View style={{flex:1, marginLeft:20, marginTop:20}}>
          <Text>{item.UnitPrice}</Text>
        </View>
      </View>
    )
  }
  _submit=()=>{
    const { navigation } = this.props;
    const IDcontract = navigation.getParam('IDcontract');
    this.props.navigation.navigate('InfoTenant',{
      Id_contract:IDcontract
    })
  }
    render(){
        return(
          <View style={styles.contain}>
            <View style={styles.contentKhachthue}>
               <Image
                style={{height:80, width:80}}
                source={{uri:'https://img.icons8.com/bubbles/100/000000/guest-male.png'}}
              >
             </Image>
             <Text style={{color:'white', fontSize:15}}>{this.state.TenantName}</Text>
             <TouchableOpacity style={styles.Button} onPress={this._submit}>
               <Text style={{color:'black', fontSize:15}}>Thông tin khách thuê</Text>
             </TouchableOpacity>
            </View >
             <Text style={styles.TitleHopdong} >Danh sách dịch vụ đăng ký</Text>
             <View style={styles.contentHopdong}>
                <FlatList  
                   style={{marignTop:30}}
                   data={this.state.buildings}
                   renderItem={this.renderItem}
                   keyExtractor={(item, index) => item.Name}
                /> 
             </View>
          </View>
          
        )
    }
}

const styles = StyleSheet.create({
  contain:{
    flex:1,
    backgroundColor:'white',
    flexDirection:'column'
  },
  
  contentKhachthue:{
    justifyContent:"center",
    alignItems:'center',
    flexDirection:'column',
    backgroundColor:'green',
    flex:40
  },
  TitleHopdong:{
    marginTop:10,
    textAlign:'center',
    fontSize:20,
    flex:5
  },
  contentHopdong:{
    flexDirection:'row',
    backgroundColor:'white',
    flex:55
  },
  column1:{
    marginLeft:5,
    flex:0.75,
  },
  column2:{
    marginLeft:10,
    flex:1.25,
  },
  Button:{
    justifyContent:"center",
    alignItems:'center',
    marginTop:10,
    width:170,
    height:40,
    backgroundColor:'white',
    borderRadius:20,
    borderWidth:1
  },
  Text:{
    marginTop:20,
    fontSize:13
  }
})