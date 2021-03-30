import 'react-native-gesture-handler';
import React, {Component, useContext, useEffect} from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import FormButton from './components/FormButton';
import { GestureHandlerRefContext } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { UserContext } from './HandleUser';
import { useState } from 'react';

const checklistContents = 
  [
    "- 흡입기를 잘 흔들었는가?",
    "- 흡입기를 흔든 후 바로 사용하였는가?",
    "- 흡입기 사용 전 숨을 완전히 뱉었는가?",
    "- 흡입을 시작한 이후에 흡입기를 분사했는가?",
    "- 흡입을 시작한지 적당한 타이밍에 분사했는가?",
    "- 들숨 한번에 흡입기를 1회만 사용하였나?",
    "- 호흡 속도는 적절하였는가?",
    "- 흡입 시간은 충분하였는가?",
    "- 흡입기의 위치는 정상적이었는가?",
    "- 흡입 후 6~10초간 숨을 참았는가?",
    "- 사용 후 양치나 가글을 하였는가?",
  ]
const secondTab =({navigation}) => {
  const {GradeCard, setGradeCard} = useContext(UserContext);
  const [Value, setValue]=useState(0);
  const forceRender=()=>{
    console.log('forcefully Rendered');
    return GradeCard.length>0?
      <ScrollView style={styles.homeElementView}>
          <Text style={{fontSize:20}}>당신의 흡입기 사용점수는</Text>
          <Text></Text>
          <Text style={{fontSize:20}}>당신이 잘못 시행한 단계는</Text>
          <View style={{borderWidth:1}}>
          {checklistContents.map((mem, key)=>{
            if(GradeCard[key]===2){
              return <Text key={key} style={{fontSize:15, padding:5}}>{mem}</Text>
            }
          })}
          </View>
          <FormButton
            buttonTitle="확인"
            onPress={() => navigation.navigate('홈')}
          />
      </ScrollView>
     : <View style={styles.homeElementView}>
          <Text style={{fontSize:20}}>흡입기를 사용하고 체크리스트를 작성해주세요!</Text>
          <FormButton
            buttonTitle="체크리스트 작성하러 가기"
            onPress={() => navigation.navigate('userChecklist')}
          />
      </View>
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Screen was focused
      // Do something
      console.log('GradeCard: ', GradeCard);
      console.log('GradeCard length: ', GradeCard.length>0);
      // setValue(Value+1);
      forceRender();
    });
    return unsubscribe;
  }, [navigation, GradeCard]);

  return(
     forceRender()
    )
  }

const styles= StyleSheet.create({
  homeElementView: {
    marginTop:10,
    marginBottom:10,
    marginLeft: 12,
    marginRight: 12,
    padding: 20,
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