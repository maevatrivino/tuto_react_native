import React, { Component } from 'react';
import {Text, ScrollView} from "react-native";

export default class SearchView extends Component{
    static searchView (){
        return(
            <ScrollView>
                <Text>SearchTabView</Text>
            </ScrollView>
        );
    }
}
