
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

import {SignInApi} from '../APIs/API';

export default class Caidat extends React.Component{
  constructor(props) {
    super(props);
    this.state = ({
      Name:'',
      type:'',
    });
  }
  componentDidMount = () => {
    const { navigation } = this.props;
    const Email = navigation.getParam('Email');
    const Password = navigation.getParam('Password');
   
    SignInApi(Email, Password).then(res =>{
        obj =JSON.parse(res);
        Name1 =obj.Name;
        type1 =obj.AccountType;
        this.setState({ Name:Name1 });
        this.setState({ type:type1 });
    })
  }

  _submit=()=>{
    this.props.navigation.navigate('SignIn');
  }
  render(){
    return(
      //View ALL
      <View style={styles.contain}>
        <View style={styles.layoutTitle}>
          <Text style={styles.Title}>Cài Đặt</Text>
        </View>
        <View style={styles.lineRow}></View>
        <View style={styles.Image}>
          <Image style={{height:100 , width:100 }}
              source={{uri:'https://icon-library.net//images/avatar-icon/avatar-icon-4.jpg'}}
          >
          </Image>
        </View>

        <View style={styles.Text}>
          <Text style={{fontSize:20}}>{this.state.Name}</Text>
        </View>

        <View style={styles.Button1}>
          <Text style={styles.textGoiphi}>Gói Phí</Text>
          <Text style={styles.textNangcao}>{this.state.type}</Text>
        </View>
      
        <TouchableOpacity style={styles.Button2}>
          <Text style={styles.textDangXuat} onPress={this._submit}>Đăng Xuất</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  contain:{
    backgroundColor:'white',
    flex:1, 
    flexDirection:"column",
  },
  layoutTitle:{
    marginTop:5,
    flex:0.1,
    textAlign:'center',
    justifyContent:"center",
    backgroundColor:'white',
    flexDirection:'row'
  },
  Title:{
    textAlign:'center',
    justifyContent:"center",
    color:'green',
    fontSize:25,
  },
 
  lineRow:{
    borderBottomColor:'black',
    borderBottomWidth:1
  },
  lineColumn:{
    borderLeftWidth: 1,
    borderLeftColor: 'black',
  },
  Image:{
    marginTop:20,
    alignItems:"center",
    justifyContent:"center",
    flex:0.2
  },
  Text:{
    alignItems:"center",
    justifyContent:"center",
    flex:0.05
  },
  Button1:{
    borderWidth:1,
    borderColor:'black',
    marginTop:50,
    alignItems:"center",
    justifyContent:"center",
    flexDirection:'row',
    flex:0.08,
    backgroundColor:'green',
  },
  Button2:{
    borderWidth:1,
    borderColor:'black',
    marginTop:50,
    alignItems:"center",
    justifyContent:"center",
    flex:0.08,
    backgroundColor:'green',
  },
  textGoiphi:{
    color:'white',
    marginLeft:10,
    flex:0.5
  },
  textNangcao:{
    marginLeft:80,
    color:'red',
    flex:0.5
  },
  textDangXuat:{
    color:'white',
    textAlign:'center'
  },
});
  