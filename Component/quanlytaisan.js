
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
import { ListAssetsfollowID } from '../APIs/API';
export default class Batdongsan extends React.Component {
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
    id = navigation.getParam('ID');
    this.setState({ refreshing: true });

    ListAssetsfollowID(UserID, id).then(res => {
      obj = JSON.parse(res);
      this.setState({ buildings: obj });
      this.setState({ refreshing: false });

    })
  }
  _onRefresh = () => {
    this.refreshData();
  }
  renderItem = ({ item }) => {
    let status = item.Status;
    let Stringstatus = '';
    if (status == 1) {
      Stringstatus = 'tốt';
    } else {
      Stringstatus = 'xấu';
    }
    return (
      <View style={styles.contain}>
        <TouchableOpacity style={styles.content}>
          <View style={styles.implement1}>
            <Text style={{ color: 'white' }}></Text>
          </View>
          <View style={styles.implementRow}>
            <View style={styles.implementColumn1}>
              <Text style={styles.Text}> Mã tài sản:</Text>
              <Text style={styles.Text}> Tên tài sản</Text>
              <Text style={styles.Text}> Mô tả:</Text>
              <Text style={styles.Text}> Tình trạng:</Text>
            </View>

            <View style={styles.implementColumn2}>
              <Text style={styles.Text}>{item.ID} </Text>
              <Text style={styles.Text}> {item.Name}</Text>
              <Text style={styles.Text}> {item.Note}</Text>
              <Text style={styles.Text}> {Stringstatus}</Text>
            </View>
          </View>

        </TouchableOpacity>
      </View>
    )
  }
  render() {
    return (
      <View style={styles.contain}>
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
    )
  }
}

const styles = StyleSheet.create({
  contain: {
    marginTop: 10,
    alignItems: "center",
    flex: 0.8,
    flexDirection: 'column',
  },
  Text: {
    marginTop: 5,
    flex: 0.2,
    marginLeft: 30
  },
  Title: {
    flex: 0.2,
    marginTop: 10,
    color: 'green',
    textAlign: 'center',
    fontSize: 25,
  },
  Line: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  content: {
    marginTop: 10,
    flexDirection: 'column',
    height: 250,
    width: 280,
  },
  implementRow: {
    flexDirection: 'row',
    flex: 2,
    borderWidth: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  implement1: {
    backgroundColor: 'green',
    alignItems: "center",
    justifyContent: "center",
    flex: 0.5,
    borderWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },

  implementColumn1: {
    marginTop: 10,
    flexDirection: 'column',
    flex: 0.75,

  },
  implementColumn2: {
    marginTop: 10,
    flexDirection: 'column',
    flex: 1.25,
  },
}) 
