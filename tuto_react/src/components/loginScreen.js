import React, { Component } from 'react';
import {Button, Text, StyleSheet, View } from 'react-native';
import * as NavigatorRef from '../navigation/navigatorRef'
import {saveAuthorizationCode,loginToSpotify,isAlreadyConnected, checkAndRefreshTokens,refreshTokens} from "./../utils/authUtils";
import {getCurrentUser} from "../api/apiUtils";

const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function(initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});

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
        /*
        const result = await refreshTokens();

        if(result)
        {
            NavigatorRef.replace('Home');
        }*/

        //TODO ELSE ERROR
    }

    constructor(props) {
        super(props);
    }

    async componentDidMount()
    {
        let code = window.location.search.substring(6);
        if (code) {
            saveAuthorizationCode(code);
            const result = await refreshTokens();

            if(result)
            {
                let user = await getCurrentUser();
                NavigatorRef.replace('Home');
            }
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
