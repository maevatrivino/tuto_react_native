import * as React from 'react';
import { StackActions } from '@react-navigation/routers';

export const navigationRef = React.createRef();

let username;

export function setUsername(name){
    username = name;
}

export function getUsername(){
    return username;
}


export function navigate(name, params) {
    navigationRef.current?.navigate(name, params);
}

export function replace(name, params){
    const pushAction = StackActions.replace(name, params);

    navigationRef.current?.dispatch(pushAction);
}
