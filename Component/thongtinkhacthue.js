
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
export default class chitiethopdong extends React.Component{

    constructor(props) {
        super(props);
        this.state = ({
          TenantName:'',
          TenantEmail:'',
          TenantPhone:'',
        });
      }
    componentDidMount = () => {
        const { navigation } = this.props;
        const IDcontract = navigation.getParam('Id_contract');
        DetailContract(IDcontract).then(res =>{
            obj =JSON.parse(res);
            TenantName1= obj.TenantName;
            TenantEmail1= obj.TenantEmail;
            TenantPhone1= obj.TenantPhone;
            this.setState({ TenantEmail:TenantEmail1 });
            this.setState({ TenantName:TenantName1 });
            this.setState({ TenantPhone:TenantPhone1 });
        });
    }
      render(){
        return(
          <View style={styles.contain}>
              <View style={styles.ImageKhachthue}>
                 <Image
                  style={{height:80,width:80}}
                  source={{uri:'https://img.icons8.com/bubbles/100/000000/guest-male.png'}}
                 >
                </Image>
              </View>
              <View style={styles.contentHopdong}>
                <View style={styles.column1}>
                 <Text style={styles.Text}>Họ và tên:</Text>
                 <Text style={styles.Text}>Điện thoại:</Text>
                 <Text style={styles.Text}>Email:</Text>
                
                </View>
                <View style={styles.column2}>
                 <Text style={styles.Text}>{this.state.TenantName}</Text>
                 <Text style={styles.Text}>{this.state.TenantPhone}</Text>
                 <Text style={styles.Text}>{this.state.TenantEmail}</Text>
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
    
    ImageKhachthue:{
      justifyContent:"center",
      alignItems:'center',
      flexDirection:'column',
      backgroundColor:'green',
      flex:0.35
    },
    TitleHopdong:{
      marginTop:10,
      textAlign:'center',
      fontSize:20,
    },
    contentHopdong:{
      justifyContent:'center',
      marginTop:10,
      flexDirection:'row',
      backgroundColor:'white',
      flex:0.6
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