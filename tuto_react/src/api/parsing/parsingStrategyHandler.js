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
                imageUrl: playlist.images[0].url,
                trackCount: playlist.tracks.total,
            }

            parsedObject.playlists.push(newPlaylist);
        });
    }

    return parsedObject;
}