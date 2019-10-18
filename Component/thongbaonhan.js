
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
import { ListMailInbox } from '../APIs/API'
export default class Batdongsan extends React.Component {

  constructor(props) {
    super(props);
    this.state = ({
      refreshing: false,
      buildings: []
    });
  }
  componentDidMount() {
    this.refreshData();
  }
  refreshData() {
    const { navigation } = this.props;
    const UserID = navigation.getParam('UserID');
    this.setState({ refreshing: true });
    ListMailInbox(UserID).then(res => {
      obj = JSON.parse(res);
      this.setState({ buildings: obj });
      this.setState({ refreshing: false });

    })
  }
  _onRefresh = () => {
    this.refreshData();
  }
  renderItem = ({ item }) => {
    let time = item.DateSent;
    let datelate = new Date(time);
    let datenow = new Date();
    let hour = '';
    let monthlate = datelate.getMonth() + 1;
    if (datelate.getDate() == datenow.getDate() && datelate.getFullYear() == datenow.getFullYear() && datelate.getMonth() == datenow.getMonth()) {
      hour = 'hôm nay';
    } else {
      hour = datelate.getDate() + '/' + monthlate + '/' + datelate.getFullYear();
    }
    return (
      <View style={styles.contain}>
        <View style={styles.content}>
          <View style={styles.Imagelayout}>
            <Image
              style={styles.Image}
              source={{ uri: 'https://img.icons8.com/clouds/100/000000/delete-message.png' }}
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

  render() {
    return (
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

    )
  }
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    flexDirection: 'column'
  },
  content: {
    marginTop: 20,
    flex: 0.5,
    flexDirection: 'row'
  },
  Line: {
    marginTop: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  Image: {
    height: 40,
    width: 40,
    justifyContent: "center"
  },
  Imagelayout: {
    justifyContent: "center"
  },
  Text1: {
    marginLeft: 10,
    flex: 0.2,
    justifyContent: "center",
  },
  Text2: {
    flex: 0.5,
    justifyContent: "center",
  },
  Text3: {
    flex: 0.2,
    justifyContent: "center",
  },
})