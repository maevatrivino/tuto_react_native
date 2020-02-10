import React, { Component } from 'react';
import {Text, View, StyleSheet, Button} from "react-native";

export default class HomeTab extends Component{
    static homeView (){
        return(
            <View style={styleHome.container}>
                <View style={styleHome.titleContainer}>
                    {/*TODO get  username Spotify here*/}
                    <Text style={styleHome.title}>Welcome ...</Text>
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

