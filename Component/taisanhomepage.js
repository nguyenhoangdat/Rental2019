
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

import { ListAssetsAll } from '../APIs/API';

export default class Taisan extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      buildings: [],
      refreshing: false,
    });
  }
  componentDidMount() {
    this.refreshData();
  }
  refreshData() {
    const { navigation } = this.props;
    const UserID = navigation.getParam('UserID');
    this.setState({ refreshing: true });
    ListAssetsAll(UserID).then(res => {
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
    if (item.Property_Name == null) {
      return (
        <View style={styles.contain}>
          <TouchableOpacity style={styles.content}>
            <View style={styles.implement1}>
              <Text style={{ color: 'white' }}>{item.Name}</Text>
            </View>
            <View style={styles.implementRow}>
              <View style={styles.implementColumn1}>
                <Text style={styles.Text}> Mã tài sản:</Text>
                <Text style={styles.Text}> Mô tả:</Text>
                <Text style={styles.Text}> Tình trạng:</Text>
              </View>

              <View style={styles.implementColumn2}>
                <Text style={styles.Text}>{item.ID} </Text>
                <Text style={styles.Text}> {item.Note}</Text>
                <Text style={styles.Text}> {Stringstatus}</Text>
              </View>
            </View>

          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View style={styles.contain}>

        </View>
      )
    }
  }
  render() {
    return (
      <View style={styles.contain1}>
        <View style={styles.layoutTitle}>
          <Text style={styles.Title}>Tài sản chưa phân bổ</Text>
        </View>
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
  contain1: {
    flex: 1,
    flexDirection: 'column',
  },
  contain: {
    marginTop: 10,
    flex: 1,
    flexDirection: 'column',
  },
  content1: {
    textAlign: 'center',
    justifyContent: "center",
    alignItems: "center",
    flex: 9.2,
    flexDirection: 'column',
  },
  Text: {
    marginTop: 5,
    flex: 0.4,
    marginLeft: 30
  },
  layoutTitle: {
    flex: 0.8,
    color: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 25,
  },
  Title: {
    color: 'green',
    fontSize: 25,
  },
  Line: {
    marginTop: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  content: {
    flexDirection: 'column',
    height: 200,
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
