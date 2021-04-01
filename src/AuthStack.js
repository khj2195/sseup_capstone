import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';

const Stack = createStackNavigator();

const AuthStack = () => {

    return (
    <Stack.Navigator initialRouteName={'Login'}>
        <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{header: () => null}}
        />
        <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{header: () => null}}
        />
    </Stack.Navigator>
    )
};

export default AuthStack;