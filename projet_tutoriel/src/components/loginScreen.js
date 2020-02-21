import React, { Component } from 'react';
import {Button, Text, StyleSheet, View } from 'react-native';
import * as NavigatorRef from '../navigation/navigatorRef'
import {loginToSpotify,loginScreenCheck,isAlreadyConnected, checkAndRefreshTokens} from "./../utils/authUtils";
import {getCurrentUser} from "../api/apiUtils";

export default class LoginScreen extends Component
{
    static checkIfConnected = async() =>
    { 
        if(await isAlreadyConnected())
        {
			await checkAndRefreshTokens();
            NavigatorRef.replace('Home');
        } 
    }

    static _LoginToAPI = async() =>
    {
        await loginToSpotify();
        //TODO ELSE ERROR
    }

    constructor(props) {
        super(props);
    }

    async componentDidMount()
    {
        const checkResult = await loginScreenCheck();
        if(checkResult)
        {
            LoginScreen.checkIfConnected();
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleStyle}>Tutorial React / React Native</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={LoginScreen._LoginToAPI}
                        title="Connect to Spotify"
                        color="#20D760"
                    />
                </View>
            </View>
        )
    }

    static loginScreenView () {
        return(
            <LoginScreen/>
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
