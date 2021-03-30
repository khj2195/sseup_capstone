import React, { createContext, useState,  } from 'react';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [users,setUsers] = useState(null);
    const [Id, setId] = useState();
    const emailID= auth().currentUser.email.split("@")[0];
    // const submitUser = (Id, InhalerType, GradeCard) => {
    //     return new Promise(function(resolve, reject) {
    //       let key;
    //       if (Id != null) {
    //         key = Id;
    //         // console.log(key);
    //       } else {
    //         console.log(Id);
    //         key = database()
    //           .ref()
    //           .push().key;
    //       }
    //       let dataToSave = {
    //         Id: auth().currentUser.email,
    //         InhalerType: InhalerType,
    //         Date: getCurrentDate(),
    //         GradeCard: GradeCard,
    //       };
    //       // console.log(key);
    //       database()
    //         .ref('users/'+ emailID+'/'+getCurrentTime())
    //         .update(dataToSave)
    //         .then(snapshot => {
    //           resolve(snapshot);
    //         })
    //         .catch(error => {
    //           reject(error);
    //         });
    //     });
    //   };
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
                      reject(error);
                      Alert.alert('없는 계정입니다.');
                    });
                })},
                register: async (email, password) => {
                    try {
                      await auth().createUserWithEmailAndPassword(email, password)
                      .then(()=>{
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