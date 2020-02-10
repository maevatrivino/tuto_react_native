import React, { Component } from 'react';
import {Text, ScrollView, StyleSheet} from "react-native";

export default class SearchView extends Component{
    static searchView (){
        return(
            <ScrollView style={styleSearch.container}>
                <Text>SearchTabView</Text>
            </ScrollView>
        );
    }
}

const styleSearch = StyleSheet.create({
    container:{
        paddingHorizontal: 10,
        paddingVertical: 30
    }
});
