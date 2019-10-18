
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
import {ListTenant} from '../APIs/API';
export default class Batdongsan extends React.Component{
  constructor(props) {
    super(props);
    this.state = ({
      Name:'',
      MAKH:'',
      CMND:'',
      Sodienthoai:'',
      Email:'',
      Diachi:'',
      Cungthue:'',
    });
  }
componentDidMount = () => {
    const { navigation } = this.props;
    const UserID = navigation.getParam('UserID');
    const ID = navigation.getParam('ID');
    ListTenant(UserID, ID).then(res =>{
        obj =JSON.parse(res);
        Name1 =obj[0].Name;
        MAKH1 =obj[0].ID;
        CMND1 = obj[0].ID_Card;
        Sodienthoai1 = obj[0].Phone;
        Email1 = obj[0].Email;
        var len = obj.length;
        for(let i = 1; i < len; i++){
          Cungthue = obj[i].Name;
          this.setState({ Cungthue });
        }
        this.setState({ Name:Name1 });
        this.setState({ MAKH:MAKH1 });
        this.setState({ CMND:CMND1 });
        this.setState({ Sodienthoai:Sodienthoai1 });
        this.setState({ Email:Email1 });
    })
}

    render(){
        return(
          <View style={styles.contain}>
            <View style={styles.implement}>
              <Image style={{height:100 , width:100 , marginTop:85}}
                 source={{uri:'https://icon-library.net//images/avatar-icon/avatar-icon-4.jpg'}}
                >
              </Image>
              <Text style={{marginTop:10, fontSize: 18, color:'black'}}>{this.state.Name}</Text>
            </View>
            <View style={styles.implement1}>
              <View style={styles.viewRowText}>
                <Image
                  style={styles.Iamge}
                  source={{uri:'https://img.icons8.com/bubbles/100/000000/guest-male.png'}}
                ></Image>
                <Text style={styles.Text}>Mã Khách Hàng:</Text>
                <Text style={styles.Text1}>{this.state.MAKH}</Text>
              </View>

              <View style={styles.viewRowText}>
                 <Image
                  style={styles.Iamge}
                  source={{uri:'https://img.icons8.com/bubbles/100/000000/id-short-hair-lady.png'}}
                ></Image>
                <Text style={styles.Text}>Chứng Minh Nhân Dân:</Text>
                <Text style={styles.Text1}>{this.state.CMND}</Text>
              </View>

              <View style={styles.viewRowText}>
                 <Image
                  style={styles.Iamge}
                  source={{uri:'https://img.icons8.com/bubbles/100/000000/phone.png'}}
                ></Image>
                <Text style={styles.Text}>Số Điện Thoại:</Text>
                <Text style={styles.Text1}>{this.state.Sodienthoai}</Text>
              </View>

              <View style={styles.viewRowText}>
                <Image
                  style={styles.Iamge}
                  source={{uri:'https://img.icons8.com/bubbles/50/000000/email.png'}}
                ></Image>
                <Text style={styles.Text}>Email:</Text>
                <Text style={styles.Text1}>{this.state.Email}</Text>
              </View>

              <View style={styles.viewRowText}>
                <Image
                  style={styles.Iamge}
                  source={{uri:'https://img.icons8.com/bubbles/100/000000/conference-call.png'}}
                ></Image>
                <Text style={styles.Text}>Cùng thuê:</Text>
                <Text style={styles.Text1}>{this.state.Cungthue}</Text>
              </View>
            </View>
          </View>
        )
    }
}

const styles = StyleSheet.create({
  contain:{
    flex:1,
    flexDirection:'column'
  },
  implement:{
    flex:0.35,
    alignItems:'center',
    backgroundColor:'gray',
  },
  implement1:{
    flex:1,
    flexDirection:'column',
    marginTop:95,
    backgroundColor:'white',
  },
  viewRowText:{
    alignItems:"center",
    marginTop:10,
    flex:0.1,
    flexDirection:'row'
  },
  Iamge:{
    height:50,
    width:50
  },
  Text:{
    marginLeft:20,
  },
  Text1:{
    marginLeft:20,
  },
  Line:{
    borderBottomWidth:1,
    borderBottomColor:'black'
  }
})