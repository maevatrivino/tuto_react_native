import React, { Component } from 'react';
import {Text, ScrollView, StyleSheet} from "react-native";

export default class PlaylistView extends Component{
    static playlistView (){
        return(
            <ScrollView style={stylePlaylist.container}>
                <Text>PlaylistTabView</Text>
            </ScrollView>
        );
    }
}

const stylePlaylist = StyleSheet.create({
    container:{
        paddingHorizontal: 10,
        paddingVertical: 30
    }
});
