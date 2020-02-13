import {checkAndRefreshTokens,getAccessToken} from './../utils/authUtils';
import {parsingTypes} from './../utils/parsingTypes'
import {getParsingStrategy} from './parsing/parsingStrategyHandler'

export const getCurrentUser = async() =>
{   
    const apiWrapper = await getAPIWrapper();
    const apiResponse = await apiWrapper.getMe();
    return apiResponse;
}

export const getUserPlaylists = async() => 
{
    const apiWrapper = await getAPIWrapper();
    const apiResponse = await apiWrapper.getUserPlaylists();
    let parsingStrategy = getParsingStrategy(parsingTypes.PLAYLISTS_LIST);
    let returnObject = parsingStrategy(apiResponse);
    return returnObject;
}

export const search = async(query) =>
{
    const apiWrapper = await getAPIWrapper();

    const searchTypes = ["album","artist","playlist","track"];
    const apiResponse = await apiWrapper.search(query,searchTypes);
    let parsingStrategy = getParsingStrategy(parsingTypes.SEARCH);
    let returnObject = parsingStrategy(apiResponse);
    console.log(JSON.stringify(returnObject));
    return returnObject;
}

export const getAPIWrapper = async () => {
    var SpotifyWebApi = require('spotify-web-api-js');
    await checkAndRefreshTokens();
    const accessToken = await getAccessToken();
    let sp = new SpotifyWebApi();
    await sp.setAccessToken(accessToken);
    return sp;
}