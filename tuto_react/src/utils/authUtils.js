import {AuthSession} from 'expo'
import { encode as btoa } from 'base-64';
import {storeData,retrieveData} from "./dataStore"
import {spotifyCredentials} from './secret'

const scopesArr = ['user-modify-playback-state','user-read-currently-playing','user-read-playback-state','user-library-modify',
                   'user-library-read','playlist-read-private','playlist-read-collaborative','playlist-modify-public',
                   'playlist-modify-private','user-read-recently-played','user-top-read'];
const scopes = scopesArr.join(' ');

export function getSpotifyRedirectUrl(){
    return AuthSession.getRedirectUrl();
}

export function getSpotifyCredentials()
{
    return spotifyCredentials;
}

//Retrieves the authorization codes to have access to the spotify API
const getAuthorizationCode = async () => 
{
    try 
    {
        //Retrieves the credentials 
        const credentials = getSpotifyCredentials();

        //Setup AuthSession for redirection to our app after login
        const redirectUrl = AuthSession.getRedirectUrl();

        //Launches the authentification process
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

//Retrieves the tokens from the spotify API
const getTokens = async () => 
{
    try {
    //Retrieves all useful information:
    const authorizationCode = await getAuthorizationCode();
    const credentials = getSpotifyCredentials();

    //Encode the credentials to base64 and sends tge request to the account API
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

    //Converts the response to JSON
    const responseJson = await response.json();

    //Calculates the expiration time of our tokens
    const expirationTime = new Date().getTime() + responseJson.expires_in * 1000;

    //Store all data in the async storage
    await storeData('accessToken', responseJson.access_token);
    await storeData('refreshToken',expirationTime);
    await storeData('expirationTime', responseJson.expires_in);
    } catch (err) {
    console.error(err);
    }
}

//Refreshes existing tokens 
export const refreshTokens = async () => {
    try 
    {
        //Just like in getTokens we'll fetch the tokens from the account API
        const credentials = getSpotifyCredentials();
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

        //If the response is an error we'll try to retrieve the tokens normally as it can just be a first connexion

        if (responseJson.error) 
        {
            await getTokens();
        } 
        else 
        {
            const expirationTime = new Date().getTime() + responseJson.expires_in * 1000;
            await storeData('accessToken', responseJson.access_token);
            if (responseJson.refresh_token) 
            {
                await storeData('refreshToken', responseJson);
            }
            await storeData('expirationTime', responseJson);
        }

        //We return true for success
        return true;
    } 
    catch (err) 
    {
        console.error(err);
        return false;
    }
}

//Check and refreshes the tokens if needed 
export const checkAndRefreshTokens = async() =>
{
    const expirationTime = await retrieveData("expirationTime");
    if(!expirationTime || new DataCue.getTime()>expirationTime)
    {
        const response = await refreshTokens();
        //An error as occured
        if(response = null)
        {
            return false;
        }
        return true;
    }
    return true;
} 