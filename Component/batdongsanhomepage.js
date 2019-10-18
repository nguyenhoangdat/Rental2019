
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
} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {ListContract,ListSmallProperty} from '../APIs/API'
export default class Batdongsan extends React.Component{
  constructor(props) {
    super(props);
    this.state = ({
      name: 'Chọn bất động sản',
      nameTenant:'Tên người thuê',
      ID:'',
      ContractStatus:''
    });
  }
  componentDidMount(){
    const { navigation } = this.props;
    let userid = navigation.getParam('UserID');
      ListSmallProperty(userid).then(res =>{
        obj =JSON.parse(res);
        name = obj[0].Name;
        ID = obj[0].ID;
        ContractStatus = obj[0].ContractStatus;
        this.setState({ name });
        this.setState({ ID });
        this.setState({ ContractStatus });
        ListContract(userid,ID).then(res => {
          try {
            let obj =JSON.parse(res);
            nameTenant = obj[0].TenantName;
            this.setState({nameTenant});
          } catch (error) {
           
          }
        });
      })
    
      
  }
  componentDidUpdate(prevProps)
  {
    if(prevProps.navigation !== this.props.navigation){
    const { navigation } = this.props;
    let userid = navigation.getParam('UserID');
    name = navigation.getParam('Name');
    if(prevProps.name !== this.state.name){
      this.setState({name});
    }
    ID = navigation.getParam('ID');
    this.setState({ID});
    ContractStatus = navigation.getParam('ContractStatus');
    this.setState({ContractStatus});
    ListContract(userid,ID).then(res => {
      try {
        let obj =JSON.parse(res);
        nameTenant = obj[0].TenantName;
        if(prevProps.nameTenant !== this.state.nameTenant){
          this.setState({nameTenant});
        }
      } catch (error) {
       
      }
    });
    
  }
  }
  submithopdong =() =>{
    const { navigation } = this.props;
    let userid = navigation.getParam('UserID');
    ID = navigation.getParam('ID');
    ContractStatus = navigation.getParam('ContractStatus');
    if(ID!=null && ContractStatus=='yes'){
      this.setState({ID});
      this.setState({ContractStatus});
    }
    if(this.state.ID != null && this.state.ContractStatus=='yes'){
      this.props.navigation.navigate('ManagerContract',{
        UserID:userid,
        ID:this.state.ID,
      });
   

    } else {
      alert('Vui lòng chọn bất động sản có hợp đồng');
    }
  }
  sumbitkhacthue =() =>{
    const { navigation } = this.props;
    let userid = navigation.getParam('UserID');
    ID = navigation.getParam('ID');
    ContractStatus = navigation.getParam('ContractStatus');
    if(ID!=null && ContractStatus=='yes' ){
      this.setState({ID});
      this.setState({ContractStatus});
    }
    if(this.state.ID != null && this.state.ContractStatus=='yes'){
      this.props.navigation.navigate('ManagerTenant',{
        UserID:userid,
        ID:this.state.ID,
      });
    } else {
      alert('Vui lòng chọn bất động sản có hợp đồng');
    }
   
  }
  sumbittaisan =() =>{
    const { navigation } = this.props;
    let userid = navigation.getParam('UserID');
    ID = navigation.getParam('ID');
    if(ID!=null){
      this.setState({ID});
    }
    if(this.state.ID != null){
      this.props.navigation.navigate('ManagerAsset',{
        UserID:userid,
        ID:this.state.ID,
      });
    } else {
      alert('Vui lòng chọn bất động sản');
    }
  }
  sumbithoadon = () =>{
    const { navigation } = this.props;
    let userid = navigation.getParam('UserID');
    ID = navigation.getParam('ID');
    ContractStatus = navigation.getParam('ContractStatus');
    if(ID!=null && ContractStatus=='yes'){
      this.setState({ID});
      this.setState({ContractStatus});
    }
    if(this.state.ID != null && this.state.ContractStatus=='yes'){
      this.props.navigation.navigate('ManagerInvoice',{
        UserID:userid,
        ID:this.state.ID,
      });
    } else {
      alert('Vui lòng chọn bất động sản có hợp đồng');
    }
  }

  render(){
    return(
      //View ALL
      <View style={styles.contain}>
        <View style={styles.layoutTitle}>
          <View style={styles.Title}>
          <Text style={styles.Texttittle}>Bất động sản</Text>
          </View>
          <TouchableOpacity style={styles.Image} onPress={this.submit}>
          <Image style={styles.imageTilte}
            source={{uri:'https://img.icons8.com/doodle/96/000000/home.png'}}
          >
          </Image>
          </TouchableOpacity>
          
        </View>
        <View style={styles.lineRow}>

        </View>
        <View style={styles.content1}>
          <Text style={styles.ten}>{this.state.name}</Text>
          <View style={{flex:40}}>
          <Image
              style={styles.hinh}
              source={{uri:'https://img.icons8.com/clouds/100/000000/crowd.png'}}>
          </Image>
          </View>
          
          <Text style={styles.so}>{this.state.nameTenant}</Text>
        </View>
        <View style={styles.lineRow}></View>
        <View style={styles.content2}>
          <View style={styles.ViewColumn}>
            <View style={styles.imple1}>
              <TouchableOpacity onPress={this.submithopdong}>
                <Image
                  style={styles.hinhhoadon}
                  source={{uri:'https://img.icons8.com/clouds/100/000000/contract.png'}}>
                </Image>
                <Text style={{color:'black',marginTop:5}}>Quản lý Hợp Đồng</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.lineColumn}>
            </View>
            <View style={styles.imple2}>
              <TouchableOpacity onPress={this.sumbitkhacthue}>
                <Image
                  style={styles.hinhhoadon}
                  source={{uri:'https://img.icons8.com/bubbles/50/000000/couple-bill.png'}}>
                </Image>
                <Text style={{color:'black',marginTop:5}}>Quản lý Khách Thuê</Text>
              </TouchableOpacity>
              
             
            </View>
          </View>
          <View style={styles.lineRow}>
          </View>
          <View style={styles.ViewColumn1}>
          <View style={styles.ViewColumn}>
            <View style={styles.imple3}>
              <TouchableOpacity onPress={this.sumbittaisan}>
                <Image
                  style={styles.hinhhoadon}
                  source={{uri:'https://img.icons8.com/plasticine/100/000000/company-assets-.png'}}>
                </Image>
                <Text style={{color:'black',marginTop:5}}>Quản lý Tài Sản</Text>
              </TouchableOpacity>
              
            </View>
            <View style={styles.lineColumn}>
            </View>
            <View style={styles.imple4}>
              <TouchableOpacity onPress={this.sumbithoadon}>
                <Image
                  style={styles.hinhhoadon}
                  source={{uri:'https://img.icons8.com/dusk/64/000000/bill.png'}}>
                </Image>
                <Text style={{color:'black',marginTop:5}}>Quản lý Hóa Đơn</Text>
              </TouchableOpacity>
            </View>
          </View>
          </View>
        </View>
      </View>
    );
  }
  submit = () => {
    const { navigation } = this.props;
    let userid = navigation.getParam('UserID');
    this.props.navigation.navigate('ChooseProperty_',{
    UserID:userid,
  })
  }
}
const styles = StyleSheet.create({
  contain:{
    backgroundColor:'green',
    flex:1, 
    flexDirection:"column",
  },
  imageTilte:{
    justifyContent:'center',
    alignItems:'center',
    height:30,
    width:30,
  },
  layoutTitle:{
    backgroundColor:'white',
    flex:0.66,
    flexDirection:'row'
  },
  Image:{
    flex:15 , 
    alignItems:'center', 
    justifyContent:'center'
  },
  Title:{
    flex:85,
    alignItems:'center',
    justifyContent:"center",
   
  },
  Texttittle:{
    marginLeft:43,
    color:'green',
    fontSize:25,
  },
  content1:{
    marginTop:5,
    marginBottom:5,
    flex:1.5,
    justifyContent:"center",
    alignItems:'center'
  },
  content2:{
    backgroundColor:'white',
    flex:5,
  },
  lineRow:{
    borderBottomColor:'black',
    borderBottomWidth:1
  },
  lineColumn:{
    borderLeftWidth: 1,
    borderLeftColor: 'black',
  },
  ten:{
    marginTop:5,
    color:'white',
    flex:30
  },
  hinh:{
    height:50,
    width:70,
  },
  so:{
    marginTop:25,
    flex:30,
    color:'white'
  },
  ViewColumn:{
    flexDirection:'row',
    flex:1,
    backgroundColor:'white',
  },
  ViewColumn1:{
    flexDirection:'row',
    flex:1,
  },
  imple1:{
    justifyContent:"center",
    alignItems:'center',
    flex:50,
  },
  imple2:{
    justifyContent:"center",
    alignItems:'center',
    flex:50,
  },
  imple3:{
    justifyContent:"center",
    alignItems:'center',
    flex:50,
  },
  imple4:{
    justifyContent:"center",
    alignItems:'center',
    flex:50,
  },
  hinhhoadon:{
    marginLeft:10,
    height:90,
    width:90,
  }

});
  