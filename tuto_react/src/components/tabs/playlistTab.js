import React, { Component } from 'react';
import {Text, ScrollView, StyleSheet, Image, View} from "react-native";
import {Card} from 'react-native-elements'
import {getUserPlaylists} from "../../api/apiUtils";


export default class PlaylistView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: {
                playlists:[]
            }
        }
    }

    async componentDidMount(){
        let playlists = await getUserPlaylists();
        console.log(playlists);
        this.setState({
            data:playlists
        })
    }

    render() {
        // console.log(this.state);
        return(
            <ScrollView style={stylePlaylist.container}>
                {
                    this.state.data.playlists.map((playlist, i) =>{
                        return(
                            <Card key={i}>
                                <View style={stylePlaylist.cardContainer}>
                                    <View>
                                        <Image
                                            style={stylePlaylist.imageStyle}
                                            resizeMode="cover"
                                            source={{ uri: playlist.imageUrl }}
                                        />
                                    </View>
                                    <View style={stylePlaylist.infoPlaylistContainer}>
                                        <Text>{playlist.name}</Text>
                                    </View>
                                </View>
                            </Card>
                        );
                    })
                }
            </ScrollView>
        )
    }

    static playlistView ()
    {
        return(
            <PlaylistView/>
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
        alignItems: 'center'
    },
    infoPlaylistContainer:{
        marginLeft: 10
    },
});
