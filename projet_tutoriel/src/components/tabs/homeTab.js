import React, { Component } from 'react';
import {Text, View, StyleSheet, Button} from "react-native";
import * as NavigatorRef from '../../navigation/navigatorRef'
import {logout} from '../../utils/authUtils'
import {getCurrentUser} from "../../api/apiUtils";

export default class HomeTab extends Component{

    constructor(props) {
        super(props);
        this.state = {
            username : ""
        }
    }

    static logout = async() => {
        await logout();
        NavigatorRef.replace('Login');
    }

    async componentDidMount(){
        let user = await getCurrentUser();
        this.setState({
            username: user.display_name
        });
    }

    render() {
        return(
            <View style={styleHome.container}>
                <View style={styleHome.titleContainer}>
                    <Text style={styleHome.title}>Welcome {this.state.username}</Text>
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

