import React, { Component } from 'react';
import {Text, View, StyleSheet} from "react-native";

export default class HomeTab extends Component{
    static homeView (){
        return(
            <View style={styleHome.container}>
                <View style={styleHome.titleContainer}>
                    {/*TODO get  username Spotify here*/}
                    <Text style={styleHome.title}>Welcome ...</Text>
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
    }
});

