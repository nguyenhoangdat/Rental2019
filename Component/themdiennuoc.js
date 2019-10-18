import React from 'react';
import {
    TextField,
    Picker,
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
import { Textarea, Item, Body } from 'native-base';
import { ListElectricWater } from '../APIs/API';
import RNPickerSelect from 'react-native-picker-select';
import ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs';

export default class chitiethopdong extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            ID:'',
            UserID:'',            
            chisodaudien: '',
            chisocuoidien: '',
            chisodaunuoc: '',
            chisocuoinuoc: '',
            avatarSourceDien: null,
            avatarSourceNuoc: null,
            datadien: '',
            datanuoc: '',
        });
        this.pressed = false;

    }
    componentDidMount() {
        const { navigation } = this.props;
        const UserID = navigation.getParam('UserID');
        const ID = navigation.getParam('ID');
        this.setState({ID});
        this.setState({UserID});
        ListElectricWater(UserID, ID).then(res => {
            let obj = JSON.parse(res);
            let chisodaudien = obj.ElectricFirstIndex;
            let chisocuoidien = obj.ElectricFinalIndex;
            let chisodaunuoc = obj.WaterFirstIndex;
            let chisocuoinuoc = obj.WaterFinalIndex;
            this.setState({ chisodaudien });
            this.setState({ chisocuoidien });
            this.setState({ chisodaunuoc });
            this.setState({ chisocuoinuoc });
        })
    }
    sumbitHinhDien =()=> {
       // option of Image
       const options = {
        quality:0.1,
        title: 'Select Avatar',
        customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };
    //set image picker
    ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        } else {
            const source = { uri: response.uri };
            // You can also display the image using data:
             // const source = { uri: 'data:image/jpeg;base64,' + response.data };
            this.setState({
                avatarSourceDien: source,
                datadien:response.data
            });
        }
    });
    }
    sumbitHinhNuoc = () => {
        // option of Image
        const options = {
            quality: 0.1,
            title: 'Select Avatar',
            customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        //set image picker
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({
                    avatarSourceNuoc: source,
                    datanuoc:response.data
                });
            }
        });
    }

    _submit= () =>{
        if (!this.pressed){
            this.pressed = true;
            let formpost = {}
            formpost.ElectricFirstIndex = this.state.chisodaudien;
            formpost.ElectricFinalIndex = this.state.chisocuoidien;
            formpost.ElectricImage = this.state.datadien;
            formpost.WaterFirstIndex = this.state.chisodaunuoc;
            formpost.WaterFinalIndex = this.state.chisocuoinuoc;
            formpost.WaterImage = this.state.datanuoc;
            formpost.PropertyID = this.state.ID;
            formpost.UserID = this.state.UserID;
            var url = 'http://bigprotech.vn:5021/api/ElectricWater';
            fetch(url, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(formpost), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                this.props.navigation.navigate('ManagerInvoice', {
                    refresh: 'b'
                });
            })
                .then(response => console.log('Success:', JSON.stringify(response)))
        }
       
    }
    render() {
        let imgElectric = this.state.avatarSourceDien == null ? null :
            <Image
                source={this.state.avatarSourceDien}
                style={{ marginLeft: 2, height: 38, width: 50 }}
            />
        let imgWater = this.state.avatarSourceNuoc == null ? null :
            <Image
                source={this.state.avatarSourceNuoc}
                style={{ marginLeft: 2, height: 38, width: 50 }}
            />
        return (
            <View style={styles.contain}>
                <Text style={styles.TextElectric}>Chỉ số Điện</Text>
                <View style={styles.contentProperty}>
                    <TextInput onChangeText={(value)=>{this.setState({chisodaudien:value})}} value={this.state.chisodaudien.toString()} editable={false} maxLength={10} keyboardTypdse='number-pad' style={styles.FirstElectric} placeholder={'chỉ số đầu'} />
                    <TextInput onChangeText={(value)=>{this.setState({chisocuoidien:value})}} value={this.state.chisocuoidien.toString()} maxLength={10} keyboardType='number-pad' style={styles.LastElectric} placeholder={'chỉ số cuối'} />
                </View>
                <Text style={styles.TextWater}>Chỉ số Nước</Text>
                <View style={styles.contentTenant}>
                    <TextInput onChangeText={(value)=>{this.setState({chisodaunuoc:value})}} value={this.state.chisodaunuoc.toString()} editable={false} maxLength={10} keyboardType='number-pad' style={styles.FirstWater} placeholder={'chỉ số đầu'} />
                    <TextInput onChangeText={(value)=>{this.setState({chisocuoinuoc:value})}} value={this.state.chisocuoinuoc.toString()} maxLength={10} keyboardType='number-pad' style={styles.LastWater} placeholder={'chỉ số cuối'} />
                </View>
                <View style={{ flex: 50, flexDirection: 'row', marginTop: 10 }}>
                    <View style={styles.ViewElectric}>
                        <Text style={ styles.TextImageElectric}>Hình chỉ số Điện</Text>
                        <View style={styles.ImageElectric}>{imgElectric}</View>
                    </View>
                    <View style={styles.ViewWater}>
                        <Text style={styles.TextImageWater}>Hình Chỉ số Nước</Text>
                        <View style={styles.ImageWater}>{imgWater}</View>
                    </View>
                </View>
                <View style={styles.ViewButton}>
                    <View style={styles.ViewButtonElectric}>
                        <TouchableOpacity onPress={this.sumbitHinhDien} style={styles.ButtonElectric}>
                            <Text style={styles.Text}>Chọn hình Điện</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.ViewButtonWater}>
                        <TouchableOpacity onPress={this.sumbitHinhNuoc} style={styles.ButtonWater}>
                            <Text style={styles.Text}>Chọn hình Nước</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={styles.acept}
                    onPress={this._submit}
                >
                    <Text style={{ color: 'white' }}>Gửi</Text>
                </TouchableOpacity>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    contain: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'green'
    },
    acept: {
        borderColor: 'green',
        borderWidth: 1,
        flex: 5,
        justifyContent: "center",
        alignItems: 'center',
        color: 'white',
        margin: 10,
        borderRadius: 4,
        backgroundColor: '#27ae60'
    },
    contentProperty: {
        marginLeft: 15,
        flex: 5,
        flexDirection: 'row'
    },
    contentTenant: {
        marginLeft: 15,
        marginTop: 10,
        flexDirection: 'row',
        flex: 5
    },
    TextElectric:{
        flex: 5, 
        marginTop: 10, 
        fontSize: 15, 
        color: 'white', 
        marginLeft: 15
    },
    FirstElectric:{
        borderWidth: 1, 
        borderRadius: 5, width: 150, 
        backgroundColor: '#C0C0C0' 
    },
    LastElectric:{
        borderWidth: 1, 
        backgroundColor: 'white', 
        borderRadius: 5, 
        width: 150, 
        marginLeft: 35 
    },
    TextWater:{
        flex: 5, 
        marginTop: 15, 
        fontSize: 15, 
        color: 'white', 
        marginLeft: 15
    },
    FirstWater:{
        borderWidth: 1, 
        backgroundColor: 'white', 
        borderRadius: 5, width: 150, 
        backgroundColor: '#C0C0C0' 
    },
    LastWater:{
        borderWidth: 1, 
        backgroundColor: 'white', 
        borderRadius: 5, 
        width: 150, 
        marginLeft: 35 
    },
    ImageElectric:{
        flex: 95, 
        backgroundColor: 'white', 
        marginTop: 10
    },
    ImageWater:{
        flex: 95, 
        backgroundColor: 'white', 
        marginTop: 10
    },
    TextImageElectric:{
        flex: 5, 
        marginTop: 15, 
        fontSize: 15, 
        color: 'white', 
        marginLeft: 15
    },
    TextImageWater:{
        flex: 5, 
        marginTop: 15, 
        fontSize: 15, 
        color: 'white', 
        marginLeft: 15
    },
    ButtonElectric:{
        backgroundColor: 'white',
         justifyContent: 'center', 
         alignItems: 'center',
          height: 40
    },
    ButtonWater:{
        backgroundColor: 'white', 
        justifyContent: 'center', 
        alignItems: 'center',
         height: 40
    },
    Text:{
        color:'black'
    },
    ViewElectric:{
        marginLeft: 2, 
        flex: 45, 
        flexDirection: 'column'
    },
    ViewWater:{
        marginLeft: 7, 
        flex: 45, 
        flexDirection: 'column' 
    },
    ViewButton:{
        flex: 10, 
        flexDirection: 'row', 
        marginTop: 10
    },
    ViewButtonElectric:{
        margin: 10, 
        flex: 49, 
        flexDirection: 'column'
    },
    ViewButtonWater:{
        margin: 10, 
        flex: 49, 
        flexDirection: 'column'
    },
})
