import React from 'react';
import {
    TextField,
    Picker,
    FlatList,
    TouchableOpacity,
    TouchableWithoutFeedback,
    TouchableHighlight,
    TextInput,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image,
    StatusBar,
    Modal,
} from 'react-native';
import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Textarea, Item, Body } from 'native-base';
import { ListPropertyHaveContract, ListTenant, Sendmail } from '../APIs/API';
import RNPickerSelect from 'react-native-picker-select';
import ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class chitiethopdong extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        let headerRight = (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <TouchableOpacity
                    onPress={() => { params.onPressUploadImage() }}
                >
                    <Image style={{ height: 40, width: 40 }} source={{ uri: 'https://img.icons8.com/clouds/100/000000/camera.png' }}></Image>
                </TouchableOpacity>
            </View>
        )
        return { headerRight }
    }

    _onPressUploadImage() {
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
                    avatarSource: source,
                    data: response.data
                });
            }
        });



    }

    constructor(props) {
        super(props);
        this.state = ({
            arrayImage: [],
            buildings: [],
            buildings1: [],
            ID_from: '',
            ID_to: 'aaa',
            ID_property: 'aa',
            content: 'aa',
            avatarSource: null,
            data: null,
            Image: '',
            StringBase64: '',
            Type: null,
            height:38,
            width:50,
            modalVisible: false,
            images: [{
                url: '',
              }],
        });
        this.pressed = false;
        this.setModalVisible = this.setModalVisible.bind(this)
        this.array = [];
        this.refreshDataFromServer = this.refreshDataFromServer.bind(this);
        this.getdata1 = this.getdata1.bind(this);
    }
    setModalVisible(visible, imagePath) {
        this.state.images = [{
          url: imagePath,
        }]
        if (visible) {
          StatusBar.setHidden(true);
        }
        if (!visible) {
          StatusBar.setHidden(false);
        }
        this.setState({ modalVisible: visible });
      }
    componentDidUpdate(prevProp, prevState) {
        if (prevState.avatarSource != this.state.avatarSource) {
            this.array.push(this.state.avatarSource);
            this.setState({ arrayImage: this.array });
        }
    }
    componentDidMount() {
        this.refreshDataFromServer();
        this.props.navigation.setParams({ onPressUploadImage: this._onPressUploadImage.bind(this) })
    }
    refreshDataFromServer() {
        const { navigation } = this.props;
        const UserID = navigation.getParam('UserID');
        this.setState({ ID_from: UserID });
        this.getdata(UserID);
    };
    getdata(UserID) {
        ListPropertyHaveContract(UserID).then(res => {
            var temp = [];
            obj = JSON.parse(res);
            var len = obj.length;
            for (let i = 0; i < len; i++) {
                var dataproperty = obj[i].Name;
                var ID = obj[i].ID;
                var joined = { label: dataproperty, value: ID }
                temp.push(joined);
            }
            this.setState({
                buildings: temp
            });
        })
    }
    getdata1(UserID, ID_Property1) {
        var temp = [];
        ListTenant(UserID, ID_Property1).then(res => {
            obj1 = JSON.parse(res);
            var dataproperty1 = obj1[0].Name;
            var ID = obj1[0].ID;
            var joined = { label: dataproperty1, value: ID }
            temp.push(joined);
            this.setState({
                buildings1: temp
            });
            this.setState({ refreshing: true });
        })
    }

    _submit = () => {
        if(!this.pressed){
            this.pressed=true;
            let ID = this.state.ID_property;
            let intID = parseInt(ID)
            this.setState({ ID_property: intID });
            let formpost = {}
            formpost.Type = this.state.Type;
            formpost.ID_From = this.state.ID_from;
            formpost.ID_To = this.state.ID_to;
            formpost.ID_Property = this.state.ID_property;
            formpost.Content = this.state.content;
            formpost.Image = this.state.data;
            var url = 'http://bigprotech.vn:5021/api/SendMail';
            if(this.state.ID_property == null && this.state.ID_to !=null && this.state.Type !=null){
                alert('Vui lòng chọn bất động sản');
            } else if(this.state.ID_To == null && this.state.Type != null && this.state.ID_property != null){
                alert('Vui lòng chọn người gửi');
            } else if(this.state.Type == null && this.state.ID_property != null && this.state.ID_To != null){
                alert('Vui lòng chọn loại thông tin gửi');
            } else if(this.state.ID_property == null && this.state.ID_to ==null && this.state.Type !=null){
                alert('Vui lòng chọn bất động sản và người gửi');
            } else if(this.state.ID_property == null && this.state.ID_to !=null && this.state.Type ==null){
                alert('Vui lòng chọn bất động sản và loại thông tin gửi');
            } else if(this.state.ID_property != null && this.state.ID_to ==null && this.state.Type ==null){
                alert('Vui lòng chọn người gửi và loại thông tin gửi');
            } else {
                fetch(url, {
                    method: 'POST', // or 'PUT'
                    body: JSON.stringify(formpost), // data can be `string` or {object}!
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => {
                    this.props.navigation.navigate('Thongbaogui', {
                        refresh: 'a'
                    });
                })
                    .then(response => console.log('Success:', JSON.stringify(response)))
        }
        
        }
    }
    updateValue(text, field) {
        this.setState({ [field]: text, });
    }
   
    renderItem = ({ item }) => {

        let img = item == null ? null :
            <Image
                source={item}
                style={{ marginLeft: 2, height: this.state.height, width: 50 }}
            />
        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={() => {
                    this.setModalVisible(!this.state.modalVisible, item.uri);
                  }}>
                    {img}
                </TouchableOpacity>
                
            </View>
        )
    }
    render() {
        const { navigation } = this.props;
        const UserID = navigation.getParam('UserID');
        return (
            <View style={styles.contain}
            >
                <View style={styles.contentProperty}>
                    <Text style={{ marginTop: 10, fontSize: 15, color: 'white', marginLeft: 15 }}>Bất động sản</Text>
                    <RNPickerSelect
                        placeholder={{
                            label: 'Vui lòng chọn bất động sản...',
                            value: null,
                        }}
                        onValueChange={(value) => { this.getdata1(UserID, value), this.setState({ ID_property: value }) }}
                        items={this.state.buildings}
                        style={pickerStyle}
                    />

                </View>
                <View style={{ flex: 10, flexDirection: 'row' }}>
                    <View style={styles.contentTenant}>
                        <Text style={{ fontSize: 15, color: 'white', marginLeft: 15 }}>Người thuê</Text>
                        <RNPickerSelect
                            placeholder={{
                                label: 'Vui lòng chọn người thuê...',
                                value: null,
                            }}
                            onValueChange={(value) => { this.setState({ ID_to: value }) }}
                            items={this.state.buildings1}
                            style={pickerStyle}
                        />

                    </View>
                    <View style={styles.contentTenant}>
                        <Text style={{ fontSize: 15, color: 'white', marginLeft: 15 }}>Loại</Text>
                        <RNPickerSelect
                            placeholder={{
                                label: 'Vui lòng chọn loại...',
                                value: null,
                            }}
                            onValueChange={(Type) => { this.setState({ Type }) }}
                            items={[
                                { label: 'Thông báo', value: 0 },
                                { label: 'Báo hỏng', value: 1 },
                            ]}
                            style={pickerStyle}
                        />
                    </View>
                </View>

                <View style={styles.content}>
                    <View style={{ flex: 10, flexDirection: 'row', justifyContent: "center", alignItems: 'center', backgroundColor: 'green' }}>
                        <Text style={styles.text}>Nội dung:</Text>
                        <View style={{ borderWidth: 1, borderRadius: 4, flex: 80, flexDirection: 'row', borderWidth: 0.5, backgroundColor: 'white', height: 40, marginRight: 10, justifyContent: 'center', alignItems: 'center', marginTop: 5, }}>
                            <FlatList
                                horizontal={true}
                                contentContainerStyle={{
                                    flexDirection: 'row',
                                }}
                                data={this.state.arrayImage}
                                renderItem={this.renderItem}
                                keyExtractor={(item, index) => index.toString()}
                            >
                            </FlatList>
                        </View>

                    </View>
                    <Textarea
                        style={styles.TextArea}
                        onChangeText={(text) => this.updateValue(text, 'content')}
                    >
                    </Textarea>
                </View>
                <TouchableOpacity style={styles.acept}
                    onPress={this._submit}
                >
                    <Text style={{ color: 'white' }}>Gửi</Text>
                </TouchableOpacity>
                <Modal style={styles.modalImage}
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}>
                    <TouchableHighlight style={{ backgroundColor: 'black' }}
                        onPress={() => {
                            this.setModalVisible(!this.state.modalVisible);
                        }}>
                        <Icon active name="close" size={30} style={{ textAlign: 'right', marginRight: 20, marginTop: 10, color: 'white' }} />
                    </TouchableHighlight>
                    <ImageViewer imageUrls={this.state.images} />
                </Modal>
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
    text: {
        flex: 20,
        marginLeft: 15,
        color: 'white',
        fontSize: 15,
    },
    TextArea: {
        borderWidth: 1,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 5,
        backgroundColor: 'white',
        flex: 75,
    },
    contentProperty: {
        flex: 10
    },
    contentTenant: {
        marginTop: 10,
        flex: 10
    },
    content: {
        marginTop: 8,
        flex: 75
    },
    modalImage: {
        bottom: 0,
      marginBottom: 0,
      paddingBottom: 0,
      backgroundColor: '#000000',
    },

})
const pickerStyle = {
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 4,
        color: 'black',
        paddingRight: 30,
        backgroundColor: 'white'
    },
    inputAndroid: {
        height: 35,
        fontSize: 16,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30,
        backgroundColor: 'white'
    },
    viewContainer: {
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 4,
        borderWidth: 1,
    },
    placeholderColor: 'white',
    underline: { borderTopWidth: 0 },
    icon: {
        position: 'absolute',
        backgroundColor: 'transparent',
        borderTopWidth: 5,
        borderTopColor: '#00000099',
        borderRightWidth: 5,
        borderRightColor: 'transparent',
        borderLeftWidth: 5,
        borderLeftColor: 'transparent',
        width: 0,
        height: 0,
        top: 20,
        right: 15,
    },
};