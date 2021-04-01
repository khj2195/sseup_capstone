
import 'react-native-gesture-handler';
import React, {Component, useContext, useState, useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Alert } from 'react-native';
// import auth from '@react-native-firebase/auth';
import {AuthContext} from './AuthProvider';
import {UserContext} from './HandleUser';
import firestore from '@react-native-firebase/firestore';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const firstTab =({navigation})=> {
  const {emailID} = useContext(AuthContext);
  const {InhalerType, setInhalerType, howmany, setHowmany} =useContext(UserContext);
  useEffect(() => {
    async function firePromise() {
      try {
        const snap = await firestore().collection(emailID).get();
        setHowmany(snap.size);
      } catch (error) {
        throw error;
      }
    }
    firePromise();
  }, []);
    return(
      <View style={{backgroundColor: 'white', height:'100%'}}>
      <View style={styles.homeFirstElementView}>
          <Text style={{fontSize:25, color:'#2e64e5',paddingBottom : 10}}>안녕하세요 {emailID}님!</Text>
          <Text style={{fontSize:16, paddingBottom :5}}>SSEUP과 함께 정확한 흡입기 사용법을 연습해보세요!</Text>
          <Text style={{fontSize:16}}>지금까지 SSEUP과 함께 한 사용횟수는 총 {howmany-1}번입니다.</Text>
      </View>
      <TouchableOpacity
        style={styles.homeElementView}
        onPress={()=>{
          if(InhalerType>0){navigation.navigate('userChecklist')}
          else{
            Alert.alert('사용하는 흡입기를 먼저 선택해주세요!');
            navigation.navigate('ChooseScreen');
          }
        }}
      >
        <Text style={{fontSize: 18}}>체크리스트 작성하기                  ></Text> 
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.homeElementView}
        onPress={()=>{
          if(InhalerType>0){navigation.navigate('User')}
          else{
            Alert.alert('사용하는 흡입기를 먼저 선택해주세요!');
            navigation.navigate('ChooseScreen');
          }
        }}
      >
          <Text style={{fontSize:18}}>흡입기 사용법 교육 영상             ></Text>
      </TouchableOpacity>
    </View>

    )
}

const styles= StyleSheet.create({
  homeFirstElementView: {
    // marginTop:20,
    marginBottom:40,
    // marginLeft: 15,
    // marginRight: 15,
    paddingTop: 30,
    paddingBottom :30,
    paddingLeft : 20,
    // flex:2,
    backgroundColor: 'white',
    borderBottomColor : '#b2b2b2',
    borderBottomWidth : 0.2,
    // borderRadius: 10,
    shadowColor: "#000",},
  //   shadowOffset: {
  //     width: 5,
  //     height: 10,  
  //   },
  //   elevation: 15,
  // },
  
  homeElementView: {
    alignContent :'center',
    justifyContent : 'center',
    marginTop:20,
    marginBottom:10,
    marginLeft: windowWidth/15,
    marginRight: windowWidth/15,
    padding : 15,
    borderWidth : 0.5,
    // flex:1,
    // backgroundColor: 'yellow',
    borderRadius: 5,
    borderColor : '#2e64e5',
    shadowColor: "#000000",
    shadowOpacity : 0.1,
      shadowOffset: {
        width: 2,
        height: 3,  
      },
    // elevation: 5,
  }
});

export default firstTab;