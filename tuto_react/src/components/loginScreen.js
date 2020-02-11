import React, { Component } from 'react';
import {Button, Text, StyleSheet, View } from 'react-native';
import * as NavigatorRef from '../navigation/navigatorRef'
import {refreshTokens,isAlreadyConnected, checkAndRefreshTokens} from "./../utils/authUtils";
import {getCurrentUser} from "../utils/apiUtils";

export default class LoginScreen extends Component
{
    static checkIfConnected = async() =>
    { 
        if(await isAlreadyConnected())
        {
            let user = await getCurrentUser();
            NavigatorRef.setUsername(user.display_name);
            await checkAndRefreshTokens();
            NavigatorRef.replace('Home');
        } 
    }

    static _LoginToAPI = async() =>
    {
        const result = await refreshTokens();

        if(result)
        {
            let user = await getCurrentUser();
            NavigatorRef.setUsername(user.display_name);
            NavigatorRef.replace('Home');
        }

        //TODO ELSE ERROR
    }

    static loginScreenView () {
        this.checkIfConnected();
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
