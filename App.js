/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import 'react-native-gesture-handler';
 import React, {Component, useEffect} from 'react';
 import Route from './src/Route';
 import AuthProvider from './src/AuthProvider';
 import SplashScreen from 'react-native-splash-screen';

import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App: () => Node = () => {
  useEffect(()=>{
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  },[])
  return (
    <AuthProvider><Route /></AuthProvider>
  );
};

export default App;
