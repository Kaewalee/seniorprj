import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';

export default class ForgetPasswordScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }
    render(){
        return (
            <View style={styles.container}>
                <Text>ForgetPassword Screen</Text>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      paddingTop: 20,
      alignItems: "center",

    },
    
  });