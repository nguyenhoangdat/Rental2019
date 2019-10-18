
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
  StatusBar,
  Image,
  AsyncStorage
} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { SignInApi } from '../APIs/API';
import Splase from '../splash';
 export default class SignIn extends React.Component{
  
   updateValue(text, field) {
     this.setState({ [field]: text, });
   }
   constructor() {
     super();
     this.state = {
       email: '',
       password: '',
       secureTestEntry:true,
       iconName:require('../Image/eyeopen.png')
     }
   }
   submit = () => {
     if (this.state.email.trim() == '' || this.state.password.trim() == '') {
      alert('Please fill in all');
    } else {
      SignInApi('darkthanhtam@gmail.com', '123456').then(
        res => {
          res = JSON.parse(res);
          let CheckLogin = res.CheckLogin;
          let UserID = res.UserID;
            if(CheckLogin == true){
              this.props.navigation.navigate('ResidentStack',{
                UserID:UserID,
                Email:this.state.email,
                Password:this.state.password
              });
            } else {
              alert('Sai mat khau');
            }
        }
      )
    }
   
   }
  onPress=()=>{
    let iconName = (this.state.secureTestEntry) ? require('../Image/eyeopen.png') : require('../Image/eyeclose.png')
    this.setState({
      secureTestEntry: !this.state.secureTestEntry,
      iconName
    })

  }
  render(){
    
    return(
      <TouchableWithoutFeedback>
        <View style={styles.container}>
          <View style={styles.up}>
            <Text style={styles.title}>
              Rental
            </Text>
          </View>
          <View style={styles.down}>
            <View style={styles.textInputContainer}>
              <TextInput style={styles.textInput}
                onChangeText={(text) => this.updateValue(text, 'email')}
                placeholder="Your email please!">
              </TextInput>
              <View style={{height:20,width:20}}></View>
            </View>

            <View style={styles.textInputContainer}>
              <TextInput {...this.props}
                style={styles.textInput}
                onChangeText={(text) => this.updateValue(text, 'password')}
                placeholder="Enter your password"
                secureTextEntry={this.state.secureTestEntry}>
              </TextInput>
              <TouchableOpacity onPress={this.onPress}>
              <Image 
                style={{height:20,width:20}}
                source={this.state.iconName}
              ></Image>
              </TouchableOpacity>
              
            </View>
            <TouchableOpacity style={styles.btnSignin}
              onPress={this.submit}>
              <Text
                style={styles.signinText}>
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor:'#27ae60'
  },
  up: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  down: {
    flex: 7,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  title: {
    color: 'white',
    textAlign: 'center',
    width: 400,
    fontSize: 23
  },
  textInputContainer: {
    justifyContent:'center',
    alignItems:'center',
    width:330,
    flexDirection:'row',
    paddingHorizontal: 10,
    borderRadius: 6,
    marginTop: 20,
    backgroundColor:'white'
  },
  textInput: {

    width: 280,
    height: 45
  },
  btnSignin: {
    backgroundColor:'green',
    marginTop: 25,
    width: 260,
    height: 45,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent:'center'

  },
  signinText: {
    fontSize: 16,
    color: 'white'
  }
});
