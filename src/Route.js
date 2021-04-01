import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {AuthContext} from './AuthProvider';
import AuthStack from './AuthStack';
import AppStack from './AppStack'; 
import HandleUser from './HandleUser';

const Route = () => {
  const {users, setUsers} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

//   const onAuthStateChanged = (user) => {
//     setUsers(user);
//     if (initializing) setInitializing(false);
//   };

//   useEffect(() => {
//     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//     return subscriber; // unsubscribe on unmount
//   }, []);

//   if (initializing) return null;

  return (
    <NavigationContainer>
       {users ? <HandleUser><AppStack /></HandleUser> : <AuthStack />}
        {/* <HandleUser><AppStack /></HandleUser> */}
    </NavigationContainer>
  )
};

export default Route;