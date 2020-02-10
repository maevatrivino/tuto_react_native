import React, { Component } from 'react';
import {Text, ScrollView} from "react-native";

export default class PlaylistView extends Component{
    static playlistView (){
        return(
            <ScrollView>
                <Text>PlaylistTabView</Text>
            </ScrollView>
        );
    }
}
