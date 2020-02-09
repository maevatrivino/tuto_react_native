import React, { Component } from 'react';
import {Text, View} from "react-native";

export default class HomeTab extends Component{
    static homeView (){
        return(
            <View>
                <Text>HomeTabView</Text>
            </View>
        );
    }
}
