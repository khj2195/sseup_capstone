import 'react-native-gesture-handler';
import React, {Component, useContext} from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
// import auth from '@react-native-firebase/auth';
import {AuthContext} from './AuthProvider';


const firstTab =({navigation})=> {

  const {emailID} = useContext(AuthContext);
    return(
    <View style={{backgroundColor: 'white', height:'100%'}}>
      <View style={styles.homeFirstElementView}>
          <Text style={{fontSize:20, color:'white'}}>안녕하세요 {emailID}님!</Text>
      </View>
      <TouchableOpacity
        style={styles.homeElementView}
        onPress={()=>{
          navigation.navigate('userVideo')
        }}
      >
        <Text style={{fontSize:20}}>흡입기 사용하고</Text>
        <Text style={{fontSize:20}}>체크리스트 작성하기</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.homeElementView}
        onPress={()=>{
          navigation.navigate('User')
        }}
      >
          <Text style={{fontSize:20}}>흡입기 사용영상 보기</Text>
      </TouchableOpacity>
    </View>
    )
}

const styles= StyleSheet.create({
  homeFirstElementView: {
    marginTop:20,
    marginBottom:20,
    marginLeft: 15,
    marginRight: 15,
    padding: 30,
    flex:1,
    backgroundColor: 'steelblue',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 10,  
    },
    elevation: 15,
  },
  homeElementView: {
    marginTop:20,
    marginBottom:20,
    marginLeft: 15,
    marginRight: 15,
    padding: 30,
    flex:1,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 10,  
    },
    elevation: 15,
  }
});

export default firstTab;