import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import loginScreen from "./src/screens/loginScreen";
import mainScreen from "./src/screens/mainScreen";
import {navigationRef} from "./src/navigation/navigatorRef";
import {createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator();

function LoginScreen() {
    return (
        loginScreen.loginScreenView()
    );
}

function MainScreen() {
    return (
        mainScreen.mainScreen()
    );
}

function App() {
  return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Login" component={LoginScreen} options={{headerLeft: null}}/>
          <Stack.Screen name="Home" component={MainScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;


