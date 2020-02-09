import React, { Component } from 'react';
import {Button, Text, StyleSheet, View } from 'react-native';
import mainScreen from "./mainScreen";
import * as NavigatorRef from '../navigation/navigatorRef'
import {refreshTokens} from "./../utils/authUtils";


export default class LoginScreen extends Component
{
    async componentDidMount()
    {
        const tokenExpirationTime = await getUserData('expirationTime');
        if (tokenExpirationTime && new Date().getTime() > tokenExpirationTime)
        {
            this.setState({ accessTokenAvailable: true });
        }
    }

    static _LoginToAPI()
    {
        refreshTokens();
        // NavigatorRef.replace('Home')
    }

    static loginScreenView () {
        return(
            <View style={styles.container}>
                <View style={styles.titleContainer}>
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
