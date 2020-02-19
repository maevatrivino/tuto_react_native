import { encode as btoa } from 'base-64';
import {storeData,retrieveData,clearData} from "./dataStore"
import {spotifyCredentials} from './secret'
import * as NavigatorRef from '../navigation/navigatorRef'

const scopesArr = ['user-modify-playback-state','user-read-currently-playing','user-read-playback-state','user-library-modify',
                   'user-library-read','playlist-read-private','playlist-read-collaborative','playlist-modify-public',
                   'playlist-modify-private','user-read-recently-played','user-top-read'];
const scopes = scopesArr.join(' ');

const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function(initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});

export function saveAuthorizationCode(code)
{
    storeData("authorization_code",code);
}

export function getSpotifyCredentials()
{
    return spotifyCredentials;
}

//Retrieves the authorization codes to have access to the spotify API
export const loginToSpotify = async () => 
{
    try 
    {
        //Retrieves the credentials 
        const credentials = getSpotifyCredentials();

        let authUrl =   'https://accounts.spotify.com/authorize' +
                        '?response_type=code' +
                        '&client_id=' +
                        credentials.clientId +
                        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
                        '&redirect_uri=' +
                        encodeURIComponent(credentials.redirectUri);

        window.location.href = authUrl;
    } 
    catch (err) 
    {
        console.error(err)
    }
}

const getAuthorizationCode = async() =>
{
    const authorizationCode = retrieveData("authorization_code");
    return authorizationCode
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
    await storeData('refreshToken',responseJson.refresh_token);
    await storeData('expirationTime', expirationTime);
    } catch (err) {
    console.error(err);
    }
}

export const getAccessToken = async() =>
{
    return await retrieveData('accessToken');
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
                await storeData('refreshToken', responseJson.refresh_token);
            }
            await storeData('expirationTime', expirationTime);
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

export const isAlreadyConnected = async() =>
{
    const accessToken = await retrieveData('accessToken');
    const expirationTime = await retrieveData("expirationTime");

    if(!accessToken || !expirationTime)
    {
        return false
    }   
    else
    {
        return true;
    }
}

//Check and refreshes the tokens if needed 
export const checkAndRefreshTokens = async() =>
{
    const expirationTime = await retrieveData("expirationTime");

    if(expirationTime == null || new Date().getTime() > expirationTime)
    {
        const response = await refreshTokens();
        //An error as occured
        if(response == null)
        {
            return false;
        }
        return true;
    }
    return true;
} 

export const logout = async() => {
    await clearData();
    const credentials = getSpotifyCredentials();
    window.location.href = credentials.redirectUri;
}

export const loginScreenCheck = async() => {
    let code = window.location.search.substring(6);
    if (code) {
        saveAuthorizationCode(code);
        const result = await refreshTokens();

        if(result)
        {
            NavigatorRef.replace('Home');
        }
        return true;
    }

    return false;
}