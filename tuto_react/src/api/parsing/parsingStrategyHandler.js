import {parsingTypes} from './../../utils/parsingTypes'

export function getParsingStrategy(parsingType)
{
    if(!parsingType)
    {
        return null;
    }

    switch(parsingType)
    {
        case parsingTypes.GET_USER : 
        return defaultParsing;

        case parsingTypes.PLAYLISTS_LIST : 
        return playlistsListParsing;

        case parsingTypes.SEARCH : 
        return searchParsing;

        default :
        return defaultParsing;
    }
}

function defaultParsing(object)
{
    return object;
}

function playlistsListParsing(object)
{
    let parsedObject = {
        playlists : []
    };

    //Mandatory checks
    if(object.items && Array.isArray(object.items) && object.items.length > 0)
    {
        object.items.forEach(playlist => {
            let newPlaylist = {
                name: playlist.name,
                id: playlist.id,
                spotifyExternalUrl: playlist.external_urls.spotify,
                imageUrl: playlist.images !== undefined && playlist.images.length > 0 ? playlist.images[0].url : "https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png",
                trackCount: playlist.tracks.total,
            }
            parsedObject.playlists.push(newPlaylist);
        });
    }

    return parsedObject;
}

function searchParsing(object)
{
    let parsedObject = {
        tracks : [],
        albums : [],
        artists: [],
        playlists:[]
    }

    if(object.albums !== undefined && object.albums.items !== undefined && object.albums.items.length  > 0)
    {
        object.albums.items.forEach(album =>{
            let newAlbum = {
                name: album.name,
                imageUrl: album.images[0].url,
                mainArtist: album.artists[0].name,
                id:album.id,
            }

            parsedObject.albums.push(newAlbum);
        });
    }

    if(object.artists !== undefined && object.artists.items !== undefined && object.artists.items.length  > 0)
    {
        object.artists.items.forEach(artist =>{
            let newArtist = {
                name: artist.name,
                imageUrl: artist.images[0].url,
                id:artist.id
            }

            parsedObject.artists.push(newArtist);
        });
    }

    if(object.tracks !== undefined && object.tracks.items !== undefined && object.tracks.items.length  > 0)
    {
        object.tracks.items.forEach(track =>{
            let newTrack = {
                name: track.name,
                mainArtist: track.artists[0].name,
                imageUrl: track.album.images[0].url,
                albumName:track.album.name,
                id:track.id
            }

            parsedObject.tracks.push(newTrack);
        });
    }

    if(object.playlists !== undefined && object.playlists.items !== undefined && object.playlists.items.length  > 0)
    {
        object.playlists.items.forEach(playlist =>{
            let newPlaylist = {
                name: playlist.name,
                imageUrl:  playlist.images !== undefined && playlist.images.length > 0 ? playlist.images[0].url : "https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png",
                id:playlist.id,
                trackCount: playlist.tracks.total
            }

            parsedObject.playlists.push(newPlaylist);
        });
    }

    return parsedObject;
}