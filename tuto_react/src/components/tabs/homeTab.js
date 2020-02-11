import React, { Component } from 'react';
import {Text, View, StyleSheet, Button} from "react-native";
import * as NavigatorRef from '../../navigation/navigatorRef'
import {getUserPlaylists} from '../../api/apiUtils'

export default class HomeTab extends Component{

    static homeView (){
        let username = NavigatorRef.getUsername();
        return(
            <View style={styleHome.container}>
                <View style={styleHome.titleContainer}>
                    <Text style={styleHome.title}>Welcome {username}</Text>
                </View>
                <View style={styleHome.buttonContainer}>
                    <Button
                            onPress={null}
                            title="Log out"
                            color="#20D760"
                    />
                </View>
            </View>
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

