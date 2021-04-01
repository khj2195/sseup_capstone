import 'react-native-gesture-handler';
import React, {Component, useContext, useEffect, useState} from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';
import FormButton from './components/FormButton';
import { GestureHandlerRefContext } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { UserContext } from './HandleUser';
import {AuthContext} from './AuthProvider';
import firestore from '@react-native-firebase/firestore';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const checklistContents = [[
  '1. 흡입기를 잘 흔든 후 바로 사용하였나요?',
  '2. 흡입기 사용 전 숨을 완전히 뱉었나요?',
  '3. 흡입을 시작하고 바로 분사했나요?',
  '4. 들숨 한번에 흡입기를 1회만 사용하였나요?',
  '5. 천천히 그리고 깊게 흡입하였나요?',
  '6. 흡입기를 수직으로 똑바로 잡은 상태에서 사용하였나요?',
  '7. 흡입 후 5 ~ 10초간 숨을 참았나요?',
  '8. 사용 후 양치나 가글을 하였나요?',
], [
  '1. 흡입구와 레버가 완전히 노출되고, ‘딸깍’ 소리가 들렸나요?',
  '2. 레버를 ‘딸깍’ 소리가 들릴 때까지 눌렀나요?',
  '3. 흡입기를 수평으로 납작하게 잡았나요?',
  '4. 흡입 전, 숨을 최대한 끝까지 내쉬었나요?',
  '5. 깊고 강하게 흡입을 했나요?',
  '6. 흡입기에서 입을 떼고 5 ~ 10 초간 숨을 참았나요?',
  '7. 흡입 후 물로 입 안을 헹구었나요?',
  '8. 사용 후 ‘딸깍’ 소리가 날 때까지 돌려서 닫았나요?',
]
];
const checklistMDI = [
  '1. 흡입기를 잘 흔든 후 바로 사용하였나요?',
  '2. 흡입기 사용 전 숨을 완전히 뱉었나요?',
  '3. 흡입을 시작하고 바로 분사했나요?',
  '4. 들숨 한번에 흡입기를 1회만 사용하였나요?',
  '5. 천천히 그리고 깊게 흡입하였나요?',
  '6. 흡입기를 수직으로 똑바로 잡은 상태에서 사용하였나요?',
  '7. 흡입 후 5 ~ 10초간 숨을 참았나요?',
  '8. 사용 후 양치나 가글을 하였나요?',
];
const checklistDPI = [
  '1. 흡입구와 레버가 완전히 노출되고, ‘딸깍’ 소리가 들렸나요?',
  '2. 레버를 ‘딸깍’ 소리가 들릴 때까지 눌렀나요?',
  '3. 흡입기를 수평으로 납작하게 잡았나요?',
  '4. 흡입 전, 숨을 최대한 끝까지 내쉬었나요?',
  '5. 깊고 강하게 흡입을 했나요?',
  '6. 흡입기에서 입을 떼고 5 ~ 10 초간 숨을 참았나요?',
  '7. 흡입 후 물로 입 안을 헹구었나요?',
  '8. 사용 후 ‘딸깍’ 소리가 날 때까지 돌려서 닫았나요?',
];
const tempDoc=[];
const secondTab =({navigation}) => {
  const {InhalerType, setInhalerType, howmany} = useContext(UserContext);
  const [latestGrade, setLatestGrade]=useState([0]);
  const {emailID} = useContext(AuthContext);

  useEffect(() => {
    async function firePromise() {
      try {
        const snap = await firestore().collection(emailID).orderBy('When','desc').limit(1).get();
        snap.forEach(doc=> {
          // console.log('1 doc: ', doc)
          tempDoc.push(doc.get('GradeCard'));
          // setLatestGrade(doc.get('GradeCard'))
          // console.log(doc.get('GradeCard'))
          }
        )
        setLatestGrade(tempDoc[0]);
        console.log('latest: ',latestGrade);
        // setLatestGrade(snap.get('GradeCard')); 여기 좀 고침!
      } catch (error) {
        throw error;
      }
    }
    firePromise();
  }, []);

  return(
      howmany>1?
          <ScrollView style={styles.homeElementView}>
              <Text style={{fontSize:20, marginBottom : 10, color : '#235EC3', fontWeight : "600"}}>{emailID}님이 잘못 사용하신 단계는</Text>
              <View style={{borderWidth:0.5, marginBottom:15, borderColor : '#b2b2b2', backgroundColor : '#fbfbfb'}}>
                {/* {InhalerType===1?
                checklistMDI.map((mem, key)=>{
                  if(latestGrade[key]===2){
                    return <Text key={key} style={{fontSize:15, padding:3}}>{mem}</Text>
                  }
                })
                :
                checklistDPI.map((mem, key)=>{
                  if(latestGrade[key]===2){
                    return <Text key={key} style={{fontSize:15, padding:3}}>{mem}</Text>
                  }
                })
                } */}
                {latestGrade.length>0 && checklistContents[InhalerType-1].map((mem, key)=>{
                  if(latestGrade[key]===2){
                    return <Text key={key} style={{fontSize:14, padding:3}}>{mem}</Text>
                  }
                })}
              </View>
              <Text style={{fontSize:20, marginBottom :10, fontWeight : "600", color : '#235EC3'}}>{emailID}님이 잘 사용하신 단계는</Text>
              <View style={{borderWidth:0.5, marginBottom:5, padding : 5, borderColor : '#b2b2b2'}}>
                {InhalerType>0 && checklistContents[InhalerType-1].map((mem, key)=>{
                  if(latestGrade[key]===1){
                    return <Text key={key} style={{fontSize:14, padding:3}}>{mem}</Text>
                  }
                })}
              </View>
              <FormButton
                buttonTitle="확인"
                onPress={() => navigation.navigate('홈')}
              />
          </ScrollView>
          :
          <View style={styles.homeElementView}>
              <Text style={{fontSize:20}}>흡입기를 사용하고 체크리스트를 작성해주세요!</Text>
              <FormButton
                buttonTitle="체크리스트 작성하러 가기"
                onPress={() => {
                  if(InhalerType>0){navigation.navigate('userChecklist')}
                  else{
                    Alert.alert('사용하는 흡입기를 먼저 선택해주세요!');
                    navigation.navigate('ChooseScreen');
                  }
                }
                }                  
              />
          </View>
  )
}

const styles= StyleSheet.create({
  homeElementView: {
    marginTop:10,
    marginBottom:10,
    marginLeft: windowWidth/50,
    marginRight: windowWidth/50,
    paddingVertical :20,
    paddingHorizontal :windowWidth/40,
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

export default secondTab;