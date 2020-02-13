import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import loginScreen from "./src/components/loginScreen";
import mainScreen from "./src/components/mainScreen";
import {navigationRef} from "./src/navigation/navigatorRef";
import {createStackNavigator} from "@react-navigation/stack";
import { StyleSheet, Text, View } from 'react-native';
import {getSpotifyCredentials} from "./src/utils/authUtils";

const Stack = createStackNavigator();

function LoginScreen() {
    return (
        loginScreen.loginScreenView()
    );
}

function MainScreen() {
    return (
        mainScreen.mainScreenView()
    );
}

function App() {
  return (
      //console.log(getSpotifyCredentials());
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Login" component={LoginScreen}/>
          <Stack.Screen name="Home" component={MainScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;


