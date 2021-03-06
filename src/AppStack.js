import 'react-native-gesture-handler';
import React, {Component, useEffect, useContext} from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreenTab from './home';
import UserScreen from './user';
import userVideo from './userVideo';
import userChecklist from './userChecklist';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from './AuthProvider';
import { UserContext } from './HandleUser';
import ChooseScreen from './ChooseScreen';

// import {ids, datas,months,dates} from './thirdTab';

const Stack = createStackNavigator();

const AppStack =()=> {
    const {emailID} = useContext(AuthContext);
    const {InhalerType, setInhalerType,howmany, setHowmany} = useContext(UserContext);
    const getCurrentTime=()=>{
        var date = new Date().getDate();
        var month = new Date().getMonth()+1;
        var time=new Date().toLocaleTimeString();
        var year = new Date().getFullYear();
        return year + '-' + month + '-' + date + '-' + time;
    }
    useEffect(() => {
        async function firePromise() {
          try {
            const snap = await firestore().collection(emailID).doc(emailID).get();
            console.log('firestore inhalertype from AppStack: ',snap.get('InhalerType'));
            setInhalerType(snap.get('InhalerType'));
            console.log('inhalertype from AppStack:',InhalerType);
            
            const snapp = await firestore().collection(emailID).get();
            setHowmany(snapp.size);

          } catch (error) {
            throw error;
          }
        }
        firePromise();
      }, []);
    return(
            <Stack.Navigator>
                <Stack.Screen 
                name="Home" 
                component={HomeScreenTab}
                options = {{
                    title: 'SSEUP',
                    headerTitle: 'SSEUP'
                }}
                />
                <Stack.Screen 
                name="User" 
                component={UserScreen}
                options = {{title: '?????? ??????'}}
                />
                <Stack.Screen
                name="userVideo"
                component={userVideo}
                options = {{
                    headerTitle: '?????? ?????? ????????????'
                }}
                />
                <Stack.Screen
                name="ChooseScreen"
                component={ChooseScreen}
                options = {{
                    headerTitle: '???????????? ????????? ?????????'
                }}
                />
                <Stack.Screen
                name="userChecklist"
                component={userChecklist}
                options = {{
                    headerTitle: '????????? ?????? ???????????????',
                }}
                />
            </Stack.Navigator>            
        )
}

export default AppStack;