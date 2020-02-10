import {checkAndRefreshTokens,getAccessToken} from './../utils/authUtils';

export const getCurrentUser = async() =>
{   
    const apiWrapper = await getAPIWrapper();
    const apiResponse = await apiWrapper.getMe();
    return apiResponse;
}

export const getAPIWrapper = async () => {
    var SpotifyWebApi = require('spotify-web-api-js');
    await checkAndRefreshTokens();
    const accessToken = await getAccessToken();
    let sp = new SpotifyWebApi();
    await sp.setAccessToken(accessToken);
    return sp;
}