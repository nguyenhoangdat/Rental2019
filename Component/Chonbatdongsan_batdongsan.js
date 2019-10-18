import React from 'react';
import {
  Alert,
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
import { ListSmallProperty } from '../APIs/API'
export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      refreshing: false,
      buildings: []
    });
  }
  componentDidMount = () => {
    this.refreshData();
  }
  refreshData() {
    const { navigation } = this.props;
    const UserID = navigation.getParam('UserID');
    this.setState({ refreshing: true });
    ListSmallProperty(UserID).then(res => {
      obj = JSON.parse(res);
      this.setState({ buildings: obj });
      this.setState({ refreshing: false });
    })
  }
  _onRefresh = () => {
    this.refreshData();
  }
  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('Batdongsan', {
            Name: item.Name,
            ID: item.ID,
            ContractStatus: item.ContractStatus
          })
        }
        }

        style={{
          marginTop: 1,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          height: 50,
          backgroundColor: item.ContractStatus == 'yes' ? 'green' : 'orange',

        }}

      >
        <Text style={{ color: '#fff' }}>{item.Name}</Text>
      </TouchableOpacity>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        
        <View style={styles.content1}>
        <FlatList
          data={this.state.buildings}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => item.Name}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        />
        </View>
        <View style={styles.content}>
        <View style={{ flex: 20, flexDirection: 'row' }}>
            <View style={{ height: 15, width: 15, backgroundColor: 'orange', marginLeft: 20 }} />
            <Text style={{ marginLeft: 10 }}>Bất động sản chưa có Hợp đồng</Text>
          </View>
          <View style={{ flex: 80, flexDirection: 'row' , marginTop:5}}>
            <View style={{ height: 15, width: 15, backgroundColor: 'green', marginLeft: 20 }} />
            <Text style={{ marginLeft: 10 }}>Bất động sản đã có Hợp đồng</Text>
          </View>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content:{
    marginTop:10,
    flexDirection:'column',
    flex:20
  },
  content1:{
    flexDirection:'column',
    flex:80
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})  