import React, { createContext, useState,  } from 'react';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [users,setUsers] = useState(null);
    const [Id, setId] = useState();
    const emailID= auth().currentUser? auth().currentUser.email.split("@")[0] : "";
    return (
        <AuthContext.Provider
            value={{
                Id, setId, users, setUsers,emailID,
                // login: async (email, password) => {
                //     try {
                //         await auth().signInWithEmailAndPassword(email, password);
                //     } catch (e) {
                //         console.log(e);
                //         Alert.alert('ID나 비밀번호를 확인해주세요.');
                //     }
                // },
                login: (email, password) => { 
                  return new Promise(function(resolve, reject) {
                  auth()
                    .signInWithEmailAndPassword(email, password)
                    .then(() => {
                      resolve('Sign In Successfully');
                      setUsers(email);
                    })
                    .catch(error => {
                      Alert.alert('없는 계정입니다.');
                      reject(error);
                    });
                })},
                register: async (email, password) => {
                    try {
                      await auth().createUserWithEmailAndPassword(email, password)
                      .then(()=>{
                        firestore().collection(email.split("@")[0]).doc(email.split("@")[0]).set({InhalerType: 0});
                        Alert.alert('회원가입이 완료되었습니다! 로그인해주세요.');
                      })
                    } catch (e) {
                      console.log(e);
                    }
                },
                logout: async () => {
                    try {
                      await auth().signOut();
                    } catch (e) {
                        console.log(e);
                    }
                },
                
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;