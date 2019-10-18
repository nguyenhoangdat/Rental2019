import React, { Component } from 'react'
import {
        View,
        Text,
        TouchableOpacity
} from 'react-native';
import styles from './styles'

class HomeScreen extends Component{

    constructor(props){
        super(props)
    }

    render() {
        return(
            <View style={styles.container}>
                <Text>Home</Text>
                <TouchableOpacity style={{ padding: 20, backgroundColor: 'white'}} onPress={() => this.props.navigation.navigate('Second')}>
                    <Text>Go to Second</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default HomeScreen