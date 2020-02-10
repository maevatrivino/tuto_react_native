import React, { Component } from 'react';
import {Button, Text, StyleSheet, View } from 'react-native';
import * as NavigatorRef from '../navigation/navigatorRef'
import {refreshTokens,isAlreadyConnected, checkAndRefreshTokens} from "./../utils/authUtils";

export default class LoginScreen extends Component
{
    async componentDidMount()
    {
        if(await isAlreadyConnected())
        {
            await checkAndRefreshTokens();
            NavigatorRef.replace('Home');
        } 
    }

    static _LoginToAPI = async() =>
    {
        const result = await refreshTokens();

        if(result)
        {
            NavigatorRef.replace('Home');
        }

        //TODO ELSE ERROR
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
