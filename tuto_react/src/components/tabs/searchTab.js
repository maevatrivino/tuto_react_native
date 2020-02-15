import React, { Component } from 'react';
import {Text, ScrollView, StyleSheet, TextInput, View, Image,Button} from "react-native";
import {Card} from "react-native-elements";
import {search} from "../../api/apiUtils";

export default class SearchView extends Component{

    constructor(props) {
        super(props);
        this.state = {
            textSearch: "",
            searchResult:{
                tracks : [],
                albums : [],
                artists: [],
                playlists:[]
            }
        }
        this.search = this.search.bind(this);
    }

    async search()
    {
        if(this.state.textSearch !== undefined && this.state.textSearch.length)
        {
            const query = this.state.textSearch;
            let apiResponse = await search(query);
            this.setState({textSearch:this.state.textSearch,searchResult:apiResponse});
        }
    }

    render() {
        return(
            <ScrollView style={styleSearch.container}>
                <View style={styleSearch.textInputContainer}>
                    <TextInput
                        style={styleSearch.textInput}
                        placeholder="Search a song !"
                        onChangeText={(text) => this.setState({textSearch:text})}
                        value={this.state.textSearch}
                        onSubmitEditing={this.search}
                    />
                </View>
                <View style={styleSearch.buttonContainer}>
                    <Button
                        onPress={this.search}
                        title="Search"
                        color="#20D760"
                    />
                </View>
                    {
                        this.state.searchResult.tracks.map((track, i) => {
                            return (
                                <Card key={i}>
                                    <View style={styleSearch.cardContainer}>
                                        <View>
                                            <Image
                                                style={styleSearch.imageStyle}
                                                resizeMode="cover"
                                                source={{uri: track.imageUrl}}
                                            />
                                        </View>
                                        <View style={styleSearch.infoTrackContainer}>
                                            <Text>Trackname : {track.name}</Text>
                                            <Text>Artist : {track.mainArtist}</Text>
                                            <Text>Album : {track.albumName}</Text>
                                        </View>
                                    </View>
                                </Card>
                            );
                        })
                    }
            </ScrollView>
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
    buttonContainer: {
        marginLeft: 50,
        marginRight: 50,
        marginTop: 20,
        marginBottom: 20
    }
});
