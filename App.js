/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createAppContainer,createMaterialBottomTabNavigator, createStackNavigator, createMaterialTopTabNavigator, createSwitchNavigator } from 'react-navigation'; // Version can be specified in package.json
import React, {Component} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import SignIn from './Component/SignIn.js';
import HomePage from './Component/HomePage.js';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Batdongsan from './Component/batdongsanhomepage.js'
import Taisan from './Component/taisanhomepage'
import Thuchi from './Component/thuchi.js'
import Tuongtac from './Component/tuongtac.js'
import Caidat from './Component/caidathomepage.js'
import chonbatdongsan from './Component/Chon_batdongsan.js';
import chonbatdongsan_batdongsan from './Component/Chonbatdongsan_batdongsan';
import chonhopdong from './Component/quanlihopdong';
import chonkhacthue from './Component/quanlykhachthue';
import chontaisan from './Component/quanlytaisan';
import chonhoadon from './Component/quanlyhoadon.js';
import chitiethopdong from './Component/chitiethopdong';
import thongbaonhan from './Component/thongbaonhan';
import thongbaogui from './Component/thongbaogui';
import phieuchi from './Component/lichsuchi';
import phieuthu from './Component/lichsuthu';
import dichvu from './Component/dichvu';
import thongtinkhacthue from './Component/thongtinkhacthue';
import Guithongbao from './Component/Guithongbao';
import Splash from './splash';
import Chitiethoadon from './Component/chitiethoadon';
import Themhoadon from './Component/themhoadon';
import Themdiennuoc from './Component/themdiennuoc';
const hopdongStack = createMaterialTopTabNavigator(
  {
    DetailContract: {
      screen: chitiethopdong,
      title:'Chi tiết hợp đồng',
      navigationOptions: {
        headerTitle:'Thông tin hợp đồng',
        tabBarIcon: ({ tintColor }) => {
          return (<Image
              style={{ width:40, height: 40 }}
              source={{ uri: "https://img.icons8.com/bubbles/50/000000/contract.png" }}/>);}
      },
    },
    Service: {
      screen: dichvu,
      title:'Dịch vụ',
      navigationOptions: {
      headerTitle:'Thông tin dịch vụ',
      tabBarIcon: ({ tintColor }) => {
        return (<Image
            style={{ width: 40, height: 40 }}
            source={{ uri: "https://img.icons8.com/clouds/50/000000/service-bell.png" }}/>);}
      }
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      
      showIcon: true,
      swipeEnabled: true,
      tabBarPosition: 'bottom',
      
    }),
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
      activeTintColor: 'orange',
      inactiveTintColor: 'white',
      style: {
        backgroundColor: 'green',
      },
      indicatorStyle: {
        borderBottomColor: '#87B56A',
        borderBottomWidth: 1.5,
      },
      
    },
   
  }
);
const tuongtacStack = createMaterialTopTabNavigator(
  {
    Thongbaogui: {
      screen: thongbaogui,
      navigationOptions: {
        title: 'Thông báo gửi',
      },
    },
    Thongbaonhan: {
      screen: thongbaonhan,
      navigationOptions: {
        title: 'Thông báo nhận',
      },
    },
   
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      
      showIcon: true,
      swipeEnabled: true,
      tabBarPosition: 'top',
      
    }),
    tabBarOptions: {
      showIcon: true,
      activeTintColor: 'orange',
      inactiveTintColor: 'white',
      style: {
        backgroundColor: 'green',
      },
      labelStyle: {
        fontSize:10,
        textAlign: 'center',
        },
      indicatorStyle: {
        borderBottomColor: '#87B56A',
        borderBottomWidth: 2,
      },
    },
   
  }
);
const RentalStack = createMaterialTopTabNavigator(
  {
    Thongke: {
      screen: HomePage,
      navigationOptions: {
        title: 'Thống kê',
        tabBarIcon: ({ tintColor }) => {
          return (<Image
              style={{ width: 30, height: 30 }}
              source={{ uri: "https://img.icons8.com/bubbles/100/000000/statistics.png" }}/>);}
      },
    },
    Batdongsan: {
      screen: Batdongsan,
      navigationOptions: {
        title: 'Chi tiết',
        tabBarIcon: ({ tintColor }) => {
          return (<Image
              style={{ width: 30, height: 30 }}
              source={{ uri: "https://img.icons8.com/clouds/100/000000/cottage.png" }}/>);}
      },
    },

    Taisan: {
      screen: Taisan,
      navigationOptions: {
        title: 'Tài sản',
        tabBarIcon: ({ tintColor }) => {
          return (<Image
              style={{ width: 30, height: 30 }}
              source={{ uri: "https://img.icons8.com/clouds/100/000000/camping-chair.png" }}/>);}
      },
    },
    Thuchi: {
      screen: Thuchi,
      navigationOptions: {
        title: 'Thu Chi',
        tabBarIcon: ({ tintColor }) => {
          return (<Image
              style={{ width: 30, height: 30 }}
              source={{ uri: "https://img.icons8.com/clouds/100/000000/receipt.png" }}/>);}
      },
    },
    Tuongtac: {
      screen: tuongtacStack,
      navigationOptions: {
        title: 'Tương Tác',
        tabBarIcon: ({ tintColor }) => {
          return (<Image
              style={{ width: 30, height: 30 }}
              source={{ uri: "https://img.icons8.com/bubbles/50/000000/hand-cursor.png" }}/>);}
      },
    },
    Caidat: {
      screen: Caidat,
      navigationOptions: {
        title: 'Cài Đặt',
        tabBarIcon: ({ tintColor }) => {
          return (<Image
              style={{ width: 30, height: 30 }}
              source={{ uri: "https://img.icons8.com/bubbles/50/000000/lady-window-settings.png" }}/>);}
      },
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      showIcon: true,
      swipeEnabled: true,
      tabBarPosition: 'bottom',
    }),
    tabBarOptions: {
      showIcon: true,
      activeTintColor: 'orange',
      inactiveTintColor: 'white',
      style: {
        backgroundColor: 'green',
      },
      labelStyle: {
        fontStyle:'normal',
        fontSize:7,
        },
      indicatorStyle: {
        borderBottomColor: '#87B56A',
        borderBottomWidth: 2,
      },
    },

    navigationOptions: {
        header: null
      }
  }
);

const RootStack = createStackNavigator(
  {
    Hopdong: {
      screen: hopdongStack,
    },
    SignIn: {
      screen: SignIn,
      navigationOptions: {
        header:null,
        labelStyle:'#04B431'
      }
    },
    ResidentStack:{
      screen: RentalStack,
    },
    ChooseProperty:{
      screen: chonbatdongsan,
      navigationOptions:{
        headerTitle:'Chọn bất động sản'
      },
    },
    ChooseProperty_:{
      screen: chonbatdongsan_batdongsan,
      navigationOptions:{
        headerTitle:'Chọn bất động sản'
      },
    },
    ManagerContract:{
      screen: chonhopdong,
      navigationOptions:{
        headerTitle:'Quản lý hợp đồng'
      },
    },
    ManagerTenant:{
      screen: chonkhacthue,
      navigationOptions:{
        headerTitle:'Quản lý khách thuê'
      },
    },
    ManagerAsset:{
      screen:chontaisan,
      navigationOptions:{
        headerTitle:'Quản lý tài sản'
      },
    },
    ManagerInvoice:{
      screen:chonhoadon,
    },
    
    Recipt:{
      screen:phieuthu,
      navigationOptions:{
        headerTitle:'Danh sách phiếu thu'
      },
    },
    InfoTenant:{
      screen:thongtinkhacthue,
      navigationOptions:{
        headerTitle:'Thông tin khách thuê'
      },
    },
    Expenditure:{
      screen:phieuchi,
      navigationOptions:{
        headerTitle:'Danh sách phiếu chi'
      },
    },
    SendNoti:{
      screen:Guithongbao,
      navigationOptions:{
        headerTitle:'Gửi thông báo'
      },
    },
    Splashsreen:{
      screen:Splash,
      navigationOptions:{
        header:null,
        labelStyle:'sreen'
      },
    },
    DetailInvoice:{
      screen:Chitiethoadon,
      navigationOptions:{
        headerTitle:'Chi tiết hóa đơn'
      },
    },
    AddInvoice:{
      screen:Themhoadon,
      navigationOptions:{
        headerTitle:'Thêm hóa đơn'
      },
    },
    AddElectricwater:{
      screen:Themdiennuoc,
      navigationOptions:{
        headerTitle:'Thêm điện nước'
      },
    },
  },
  {
    initialRouteName: 'SignIn',
  }
  );

const InitialNavigator = createSwitchNavigator({
  Splash: Splash,
  App: RootStack
})
const AppContainer = createAppContainer(InitialNavigator);


export default class App extends React.Component {
    render() {
      return <AppContainer />;
    }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#3498db',
  }
});
