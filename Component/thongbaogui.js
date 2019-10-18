
import React from 'react';
import {
  RefreshControl,
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
import {ListMailSendbox} from '../APIs/API'
export default class Batdongsan extends React.Component{

  constructor(props) {
    super(props);
    this.state = ({
      buildings: [],
      refreshing: false,
    });
  }
  componentDidMount()  {
     this.refreshData();
  }
  componentDidUpdate(prevProps){
    const { navigation } = this.props;
    const UserID = navigation.getParam('UserID');
    if(prevProps.navigation !== this.props.navigation){
    ListMailSendbox(UserID).then(res =>{
        obj =JSON.parse(res);
        alert(JSON.stringify(obj[0]));
        if (obj !== this.state.buildings) {
        this.setState({ buildings: obj });
        }
    })
    }
}
  refreshData () {
    const { navigation } = this.props;
    const UserID = navigation.getParam('UserID');
    this.setState({ refreshing: true });
    ListMailSendbox(UserID).then(res =>{
        obj =JSON.parse(res);
        this.setState({ buildings: obj });
        this.setState({ refreshing: false });
    })
  }
  _onRefresh = () => {
    this.refreshData();
  }
  renderItem = ({item}) => {
    let time = item.DateSent;
    let datelate = new Date(time);
    let datenow = new Date();
    let hour ='';
    let monthlate = datelate.getMonth()+1;
    if(datelate.getDate() == datenow.getDate() && datelate.getFullYear() == datenow.getFullYear() && datelate.getMonth() == datenow.getMonth() ){
       hour = 'hôm nay';
    } else {
       hour = datelate.getDate()+'/'+monthlate+'/'+datelate.getFullYear();
    }
    return(
      <View style={styles.contain}>
        <View style={styles.content}>
        <View style={styles.Imagelayout}>
         <Image 
            style={styles.Image}
            source={{uri:'https://img.icons8.com/clouds/100/000000/delete-message.png'}}
          ></Image>
        </View>
        <View style={styles.Text1}>
          <Text>Nội dung:</Text>
        </View>
        <View style={styles.Text2}>
          <Text>{item.Content}</Text>
        </View>
        <View style={styles.Text3}>
          <Text>{hour} </Text>
        </View>
        </View>
        <View style={styles.Line}></View>
      </View>
     
    )
  }
  _submit=()=>{
    const { navigation } = this.props;
    const UserID = navigation.getParam('UserID');
    this.props.navigation.navigate('SendNoti',{
      UserID : UserID,
     
    });
  }
    render(){
        return(
          <View style={{flex:1}}>
              <TouchableOpacity style={styles.image} onPress={this._submit}>
                <Image
                 style={{height:60, width:60 }}
                  source={{uri:'http://img.icons8.com/cute-clipart/64/000000/plus.png'}}
                >
               </Image>
             </TouchableOpacity>
             <View style={styles.Line}></View>

            <View style={styles.content1}>
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
  image:{
    marginTop:5,
    flex:0.08,
    justifyContent:"center",
    alignItems:"center"
  },
  contain:{
    flex:1,
    flexDirection:'column'
  },
  content1:{
    marginTop:10,
    flex:0.92,
  },
  content:{
    flex:0.5,
    flexDirection:'row'
  },
  Line:{
    marginTop:10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  Image:{
    height:40,
    width:40,
    justifyContent:"center"
  },
  Imagelayout:{
    marginTop:2,
    justifyContent:"center"
  },
  Text1:{
    marginLeft:10,
    flex:0.2,
    justifyContent:"center",
  },
  Text2:{
    marginLeft:10,
    flex:0.5,
    justifyContent:"center",
  },
  Text3:{
    flex:0.2,
    justifyContent:"center",
  },
})