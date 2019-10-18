
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


export default class Thuchi extends React.Component {

  _submitthu = () => {
    const { navigation } = this.props;
    const UserID = navigation.getParam('UserID');
    this.props.navigation.navigate('Recipt', {
      UserID: UserID,
    });
  }
  _submitchi = () => {
    const { navigation } = this.props;
    const UserID = navigation.getParam('UserID');
    this.props.navigation.navigate('Expenditure', {
      UserID: UserID,
    });
  }
  render() {
    return (
      //View ALL
      <View style={styles.contain}>
        <View style={styles.layoutTitle}>
          <Text style={styles.Title}>Thu chi</Text>
        </View>
        <View style={styles.lineRow}></View>
        <View style={styles.content}>
          <TouchableOpacity onPress={this._submitthu} style={styles.buttonthu}>
            <Image
              style={styles.hinhthu}
              source={{ uri: 'https://img.icons8.com/clouds/100/000000/password-book.png' }}>
            </Image>
            <Text style={styles.textthu}>Quản lý thu</Text>
            <Image
              style={styles.hinhnext}
              source={{ uri: 'https://img.icons8.com/ios/50/000000/more-than-2.png' }}>
            </Image>
          </TouchableOpacity>

          <TouchableOpacity onPress={this._submitchi} style={styles.buttonchi}>
            <Image
              style={styles.hinhthu}
              source={{ uri: 'https://img.icons8.com/clouds/100/000000/receipt.png' }}>
            </Image>
            <Text style={styles.textchi}>Quản lý chi</Text>
            <Image
              style={styles.hinhnext}
              source={{ uri: 'https://img.icons8.com/ios/50/000000/more-than-2.png' }}>
            </Image>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
  },
  contain: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: "column",
  },
  layoutTitle: {
    flex: 0.102,
    color: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 25,
  },
  Title: {
    color: 'green',
    fontSize: 25,
  },
  lineRow: {
    borderBottomColor: 'black',
    borderBottomWidth: 1
  },
  lineColumn: {
    borderLeftWidth: 1,
    borderLeftColor: 'black',
  },
  buttonthu: {
    backgroundColor:'green',
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 40,
    height: 80,
    width: 300,
    flexDirection: 'row',
    alignItems: "center"
  },
  buttonchi: {
    backgroundColor:'green',
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 40,
    height: 80,
    width: 300,
    flexDirection: 'row',
    alignItems: "center"
  },
  textthu: {
    marginLeft: 10,
    fontSize:17,
    color: 'white',
  },
  textchi: {
    marginLeft: 10,
    fontSize:17,
    color: 'white',
  },
  hinhthu: {
    marginLeft: 40,
    height: 70,
    width: 70
  },
  hinhchi: {
    marginLeft: 40,
    height: 70,
    width: 70
  },
  hinhnext: {
    marginLeft: 40,
    height: 30,
    width: 30
  }
});