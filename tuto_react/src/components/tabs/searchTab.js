import React, { Component } from 'react';
import {Text, ScrollView, StyleSheet, TextInput, View, Image} from "react-native";
import {Card} from "react-native-elements";

const result = [
    {
        trackName: 'GoGoToad',
        artist : 'Toad',
        album: 'Toad Dance',
        source : 'https://vignette.wikia.nocookie.net/mario/images/3/38/CTTTChampignonD%27invincibilit%C3%A9.png/revision/latest?cb=20170322153140&path-prefix=fr'
    },
    {
        trackName : 'Marrrriiiooo',
        artist: 'Mario',
        album: 'Mario and the Gambas',
        source: 'https://upload.wikimedia.org/wikipedia/en/a/a9/MarioNSMBUDeluxe.png'
    }
];

export default class SearchView extends Component{

    constructor(props) {
        super(props);
        this.state = {
            textSearch: ""
        }
    }

    render() {
        return(
            <View style={styleSearch.container}>
                <View style={styleSearch.textInputContainer}>
                    <TextInput
                        style={styleSearch.textInput}
                        placeholder="Search a song !"
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.textSearch}
                    />
                </View>
                <ScrollView style={styleSearch.containerList}>
                    {
                        result.map((playlist, i) => {
                            return (
                                <Card key={i}>
                                    <View style={styleSearch.cardContainer}>
                                        <View>
                                            <Image
                                                style={styleSearch.imageStyle}
                                                resizeMode="cover"
                                                source={{uri: playlist.source}}
                                            />
                                        </View>
                                        <View style={styleSearch.infoTrackContainer}>
                                            <Text>Trackname : {playlist.trackName}</Text>
                                            <Text>Artist : {playlist.artist}</Text>
                                            <Text>Album : {playlist.album}</Text>
                                        </View>
                                    </View>
                                </Card>
                            );
                        })
                    }
                </ScrollView>
            </View>
        )
    }

    static searchView (){
        return (
            <SearchView/>
        );
    }
}

const styleSearch = StyleSheet.create({
    container:{
        marginBottom: 10,
        marginTop: 30,
        marginHorizontal: 10
    },
    textInputContainer:{
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor : 'black'
    },
    textInput:{
        height: 50,
        margin: 10,
    },
    imageStyle:{
        width: 50,
        height: 50,
    },
    cardContainer:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    infoTrackContainer:{
        marginLeft: 10
    },
    containerList:{
        marginBottom: 10,
        marginTop: 20
    },
});
