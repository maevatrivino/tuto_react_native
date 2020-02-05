import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import loginScreen from "./src/loginScreen";

export default function App() {
  return (
    loginScreen.loginScreenView()
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
