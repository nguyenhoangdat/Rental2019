
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
  Dimensions
} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { SignInApi, Statistical } from '../APIs/API';
import { PieChart } from 'react-native-svg-charts'
import PieChartWithCenteredLabels from '../piechart/piechart';
import { thisExpression } from '@babel/types';

export default class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = ({
      name: 'Chọn bất động sản',
      SumProperty: '',
      SumTenant: '',
      SumSubProperty: '',
      NumberEmptyPropert: '',
    });
  }

  componentDidMount() {
    const { navigation } = this.props;
    let userid = navigation.getParam('UserID');
    let id = navigation.getParam('ID');
    Statistical(userid, id).then(res => {
      let obj = JSON.parse(res);
      SumProperty = obj.SumProperty;
      SumTenant = obj.SumTenant;
      this.setState({ SumProperty })
      this.setState({ SumTenant })
    }
    );
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.navigation !== this.props.navigation) {
      const { navigation } = this.props;
      let userid = navigation.getParam('UserID');
      let id = navigation.getParam('ID');
      name = navigation.getParam('Name');
      if (name !== this.state.name) {
        this.setState({ name });
      }
      Statistical(userid, id).then(res => {
        let obj = JSON.parse(res);
        SumProperty = obj.SumProperty;
        SumTenant = obj.SumTenant;
        SumSubProperty = obj.SumSubProperty;
        NumberEmptyPropert = obj.NumberEmptyPropert;
        if (SumProperty !== this.state.SumProperty) {
          this.setState({ SumProperty })
        }
        if (SumTenant !== this.state.SumTenant) {
          this.setState({ SumTenant })
        }
        if (SumSubProperty !== this.state.SumSubProperty) {
          this.setState({ SumSubProperty })
        }
        if (NumberEmptyPropert !== this.state.NumberEmptyPropert) {
          this.setState({ NumberEmptyPropert })
        }
      }
      );
    }

  }

  render() {
    const { navigation } = this.props;
    let userid = navigation.getParam('UserID');


    return (
      //View ALL
      <View style={styles.contain}>
        <View style={styles.layoutTitle}>
          <Text style={styles.Title}>Thống Kê</Text>
        </View>
        <View style={styles.Line}></View>
        <View style={styles.content}>
          <View style={styles.ViewImageHouse}>
            <Image
              style={styles.ImageHouse}
              source={{ uri: 'https://img.icons8.com/clouds/50/000000/home.png' }}>
            </Image>
            <Text>{this.state.SumProperty} Bất động sản</Text>
          </View>

          <View style={styles.ViewImageHouse1}>
            <Image
              style={styles.ImageHouse}
              source={{ uri: 'https://img.icons8.com/clouds/50/000000/conference-call.png' }}>
            </Image>
            <Text>{this.state.SumTenant} Khách thuê</Text>
          </View>
        </View>
        <View style={styles.Line2}>
        </View>
        <View style={styles.content2}>
          <TouchableOpacity
            onPress={this.submit}
            style={styles.button}
          >
            <Text style={styles.name}>{this.state.name}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content3}>
          <PieChartWithCenteredLabels navigation={this.props.navigation} />
        </View>
        <View style={styles.content4}>
          <View style={{ flex: 20, flexDirection: 'row' }}>
            <View style={{ height: 15, width: 15, backgroundColor: '#87CEFA', marginLeft: 20 }} />
            <Text style={{ marginLeft: 10 }}>Đã thuê</Text>
          </View>
          <View style={{ flex: 70, flexDirection: 'row' }}>
            <View style={{ height: 15, width: 15, backgroundColor: '#4682B4', marginLeft: 20 }} />
            <Text style={{ marginLeft: 10 }}>Chưa thuê</Text>
          </View>
        </View>
      </View>

    );
  }
  submit = () => {
    const { navigation } = this.props;
    let userid = navigation.getParam('UserID');
    this.props.navigation.navigate('ChooseProperty', {
      UserID: userid,
    })
  }
}
const styles = StyleSheet.create({
  lineColumn: {
    borderLeftWidth: 1,
    borderLeftColor: 'black',
  },
  ViewImageHouse: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ViewImageHouse1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImageHouse: {
    height: 80,
    width: 80,
  },
  contain: {
    flex: 1,
    flexDirection: 'column',
  },
  content: {
    marginTop: 10,
    flex: 1.5,
    flexDirection: 'row',
  },
  content2: {
    justifyContent: 'center',
    alignItems: "center",
  
    flex: 1,
    flexDirection: 'column',
  },
  content3: {
    marginTop:10,
    flex: 5,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  content4: {
    flex: 2,
    flexDirection: 'column',
  },
  Line2: {
    marginTop: 15,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  layoutTitle: {
    flex: 1,
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
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 250,
    backgroundColor: 'green',
    marginTop: 10,
    borderRadius: 20,
  },
  name: {
    color: 'white',
  }
});
