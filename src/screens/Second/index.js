import React, { Component } from 'react'
import {
        View,
        Text
} from 'react-native';
import styles from './styles'

class SecondScreen extends Component{

    constructor(props){
        super(props)
    }

    render() {
        return(
            <View style={styles.container}>
                <Text>Second</Text>
            </View>
        );
    }
}

export default SecondScreen