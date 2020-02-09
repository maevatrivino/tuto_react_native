import {AuthSession} from 'expo'
import { encode as btoa } from 'base-64';
import spotifyCredentials from "./secret"
import {storeData,retrieveData} from "./dataStore"

const scopesArr = ['user-modify-playback-state','user-read-currently-playing','user-read-playback-state','user-library-modify',
                   'user-library-read','playlist-read-private','playlist-read-collaborative','playlist-modify-public',
                   'playlist-modify-private','user-read-recently-played','user-top-read'];
const scopes = scopesArr.join(' ');

export function getSpotifyRedirectUrl(){
    return AuthSession.getRedirectUrl();
}

export function getSpotifyCredentials()
{
    return {
        clientId: '13e3de8527074830a2c3ac378a880ce6',
        clientSecret: 'ba0d1c842edd4927ae930a6f78153823',
        redirectUri: 'https://auth.expo.io/@greyhopes/tuto_react'
    }
}

const getAuthorizationCode = async () => 
{
    try 
    {
        const credentials = getSpotifyCredentials(); //we wrote this function above
        const redirectUrl = AuthSession.getRedirectUrl(); //this will be something like https://auth.expo.io/@your-username/your-app-slug
        const result = await AuthSession.startAsync({
            authUrl:
            'https://accounts.spotify.com/authorize' +
            '?response_type=code' +
            '&client_id=' +
            credentials.clientId +
            (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
            '&redirect_uri=' +
            encodeURIComponent(redirectUrl),
        });
        
        return result.params.code;
    } 
    catch (err) 
    {
        console.error(err)
    }
    
}

const getTokens = async () => 
{
    try {
    const authorizationCode = await getAuthorizationCode() //we wrote this function above
    const credentials = getSpotifyCredentials() //we wrote this function above (could also run this outside of the functions and store the credentials in local scope)
    const credsB64 = btoa(`${credentials.clientId}:${credentials.clientSecret}`);
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
        Authorization: `Basic ${credsB64}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${
        credentials.redirectUri
        }`,
    });
    const responseJson = await response.json();
    // destructure the response and rename the properties to be in camelCase to satisfy my linter ;)
    const {
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_in: expiresIn,
    } = responseJson;

    const expirationTime = new Date().getTime() + expiresIn * 1000;
    await storeData('accessToken', accessToken);
    await storeData('refreshToken', refreshToken);
    await storeData('expirationTime', expirationTime);
    } catch (err) {
    console.error(err);
    }
}

export const refreshTokens = async () => {
    try 
    {
        const credentials = getSpotifyCredentials() //we wrote this function above
        const credsB64 = btoa(`${credentials.clientId}:${credentials.clientSecret}`);
        const refreshToken = await retrieveData('refreshToken');
        const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            Authorization: `Basic ${credsB64}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
        });
        const responseJson = await response.json();
        if (responseJson.error) 
        {
            await getTokens();
        } 
        else 
        {
            const {
                access_token: newAccessToken,
                refresh_token: newRefreshToken,
                expires_in: expiresIn,
            } = responseJson;

            const expirationTime = new Date().getTime() + expiresIn * 1000;
            await storeData('accessToken', newAccessToken);
            if (newRefreshToken) 
            {
                await storeData('refreshToken', newRefreshToken);
            }
            await storeData('expirationTime', expirationTime);
        }
    } 
    catch (err) 
    {
        console.error(err);
    }
}