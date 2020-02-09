import React, { Component } from 'react';
import {Button, Text, StyleSheet, View } from 'react-native';


export default class MainScreen extends Component {

    static mainScreen () {
        return(
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleStyle}>Tutorial React / React Native</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    buttonContainer: {
        marginLeft: 50,
        marginRight: 50,
        marginTop: 20,
        marginBottom: 20
    },
    titleContainer: {
        margin: 5,
        alignItems: 'center'
    },
    titleStyle: {
        fontSize: 30
    }

});
