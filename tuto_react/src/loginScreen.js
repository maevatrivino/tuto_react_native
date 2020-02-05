import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Button from "react-native-web/dist/exports/Button";

export default class LoginScreen extends Component {
    static _LoginToAPI() {
        alert('TODO login to API Spotify')
    }

    static loginScreenView () {
        return(
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <Text style={styles.titleStyle}>Tutorial React / React Native</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={this._LoginToAPI}
                        title="Connect to Spotify"
                        color="#20D760"
                    />
                </View>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        margin: 20
    },
    titleStyle: {
        fontSize: 30
    }

});
