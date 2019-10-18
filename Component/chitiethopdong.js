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
import {DetailContract} from '../APIs/API';


export default class chitiethopdong extends React.Component{
  constructor(props) {
    super(props);
    this.state = ({
      ContractID:'',
      Status:'',
      FromDate:'',
      ToDate:'',
      PropertyName:'',
      Price:'',
      Deposit:'',
      TenantName:''
    });
  }
  componentDidMount = () => {
    const { navigation } = this.props;
    const IDcontract = navigation.getParam('IDcontract');
    DetailContract(IDcontract).then(res =>{
        obj =JSON.parse(res);
        ContractID1 = obj.ContractName;
        Status1 =obj.Status;
        FromDate1 =obj.FromDate;
        ToDate1 = obj.ToDate;
        PropertyName1 = obj.PropertyName;
        Price1 = obj.Price;
        Deposit1 = obj.Deposit;
        TenantName1= obj.TenantName;
        this.setState({ ContractID:ContractID1 });
        this.setState({ Status:Status1 });
        this.setState({ FromDate:FromDate1 });
        this.setState({ ToDate:ToDate1 });
        this.setState({ PropertyName:PropertyName1 });
        this.setState({ Price:Price1 });
        this.setState({ Deposit:Deposit1 });
        this.setState({ TenantName:TenantName1 });
    })
  }
  _submit=()=>{
    const { navigation } = this.props;
    const IDcontract = navigation.getParam('IDcontract');
    this.props.navigation.navigate('InfoTenant',{
      Id_contract:IDcontract
    })
  }
    render(){
        let value = this.state.FromDate;
        let date = new Date(value);
        let StringDate = date.getDate() +'/'+ date.getMonth() +'/'+ date.getFullYear();

        let value1 = this.state.ToDate;
        let todaydate = new Date(value1);
        let StringtoDate = todaydate.getDate() +'/'+ todaydate.getMonth() +'/'+ todaydate.getFullYear();
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
               <Text style={styles.TitleHopdong} >Thông tin hợp đồng</Text>
               <View style={styles.contentHopdong}>
                <View style={styles.column1}>
                 <Text style={styles.Text}>Mã hợp đồng:</Text>
                 <Text style={styles.Text}>Trạng thái:</Text>
                 <Text style={styles.Text}>Ngày tạo hợp đồng:</Text>
                 <Text style={styles.Text}>Ngày hiệu lực:</Text>
                 <Text style={styles.Text}>Bất động sản:</Text>
                 <Text style={styles.Text}>Giá:</Text>
                 <Text style={styles.Text}>Tiền cọc:</Text>
                </View>
                <View style={styles.column2}>
                 <Text style={styles.Text}>{this.state.ContractID}</Text>
                 <Text style={styles.Text}>{this.state.Status}</Text>
                 <Text style={styles.Text}>{StringDate}</Text>
                 <Text style={styles.Text}>{StringtoDate}</Text>
                 <Text style={styles.Text}>{this.state.PropertyName}</Text>
                 <Text style={styles.Text}>{this.state.Price}</Text>
                 <Text style={styles.Text}>{this.state.Deposit}</Text>
                </View>
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
    flex:5,
  },
  contentHopdong:{
    justifyContent:'center',
    flexDirection:'row',
    backgroundColor:'white',
    flex:55
  },
  column1:{
    marginLeft:5,
    flex:0.85,
  },
  column2:{
    flex:1.15,
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