import React, { Component } from 'react';
import {Text, ScrollView, StyleSheet, Image, View} from "react-native";
import {Card, ListItem} from 'react-native-elements'

const playlists = [
    {
        name : 'Toad Party !',
        source : 'https://vignette.wikia.nocookie.net/mario/images/3/38/CTTTChampignonD%27invincibilit%C3%A9.png/revision/latest?cb=20170322153140&path-prefix=fr'
    },
    {
        name : 'Mario Party !',
        source: 'https://upload.wikimedia.org/wikipedia/en/a/a9/MarioNSMBUDeluxe.png'
    }
];

export default class PlaylistView extends Component{
    static playlistView (){
        return(
            <ScrollView style={stylePlaylist.container}>
                    {
                        playlists.map((playlist, i) =>{
                            return(
                                <Card key={i}>
                                    <View style={stylePlaylist.cardContainer}>
                                        <View>
                                            <Image
                                                style={stylePlaylist.imageStyle}
                                                resizeMode="cover"
                                                source={{ uri: playlist.source }}
                                            />
                                        </View>
                                        <View>
                                            <Text>{playlist.name}</Text>
                                        </View>
                                    </View>
                                </Card>
                            );
                        })
                    }
            </ScrollView>
        );
    }
}

const stylePlaylist = StyleSheet.create({
    container:{
        marginBottom: 10,
        marginTop: 20
    },
    imageStyle:{
        width: 50,
        height: 50,
    },
    cardContainer:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});
