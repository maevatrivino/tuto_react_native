import React, { Component } from 'react';
import {Text, View, ScrollView} from "react-native";

export default class HomeTab extends Component{
    static homeView (){
        return(
            <ScrollView>
                <Text>HomeTabView</Text>
            </ScrollView>
        );
    }
}
