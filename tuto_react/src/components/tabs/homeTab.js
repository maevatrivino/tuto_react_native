import React, { Component } from 'react';
import {Text, View, StyleSheet, Button} from "react-native";
import * as NavigatorRef from '../../navigation/navigatorRef'
import {getCurrentUser} from '../../api/apiUtils'
import {logout} from '../../utils/authUtils'

async function getUser(){
    let user = await getCurrentUser();
    return user.display_name;
}


export default class HomeTab extends Component{

    constructor(props) {
        super(props);
    }

    static logout = async() => {
        await logout();
        NavigatorRef.setUsername("");
        NavigatorRef.replace('Login');
    }

    render() {
        let username = NavigatorRef.getUsername();

        return(
            <View style={styleHome.container}>
                <View style={styleHome.titleContainer}>
                    <Text style={styleHome.title}>Welcome {username}</Text>
                </View>
                <View style={styleHome.buttonContainer}>
                    <Button
                        onPress={HomeTab.logout}
                        title="Log out"
                        color="#20D760"
                    />
                </View>
            </View>
        )
    }

    static homeView (){

        return(
            <HomeTab/>
        );
    }
}

const styleHome = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
    },
    titleContainer:{
        margin: 5,
        alignItems: 'center',
    },
    title: {
        fontSize: 30
    },
    buttonContainer: {
        marginLeft: 50,
        marginRight: 50,
        marginTop: 20,
        marginBottom: 20
    }
});

