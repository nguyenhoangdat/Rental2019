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
import { SignInApi } from '../APIs/API';
import { ListPropertyLV1 } from '../APIs/API';
export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      buildings: [],
      refreshing: false,
    });
  }
  componentDidMount = () => {
    this.refreshData();
  }

  refreshData() {
    const { navigation } = this.props;
    const UserID = navigation.getParam('UserID');
    this.setState({ refreshing: true });
    ListPropertyLV1(UserID).then(res => {
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
          this.props.navigation.navigate('Thongke', {
            Name: item.Name,
            ID: item.ID,
          })
        }
        }
        style={{
          marginTop: 1,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          height: 50,
          backgroundColor: "green",
        }}

      >
        <Text style={{ color: '#fff' }}>{item.Name}</Text>
      </TouchableOpacity>
    )
  }
  render() {
    return (
      <View style={styles.container}>
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
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})  