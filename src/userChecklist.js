
import 'react-native-gesture-handler';
import React, {useContext, useState} from 'react';
import { StyleSheet, ScrollView, View, Text, Button, TouchableOpacity, Alert } from 'react-native';
import FormButton from './components/FormButton';
import {AuthContext} from './AuthProvider';
import { UserContext } from './HandleUser';
// import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const checklistContents = 
  [
    "1. 흡입기를 잘 흔들었는가?",
    "2. 흡입기를 흔든 후 바로 사용하였는가?",
    "3. 흡입기 사용 전 숨을 완전히 뱉었는가?",
    "4. 흡입을 시작한 뒤에 흡입기를 분사했는가?",
    "5. 흡입을 이후 적당한 시점에 분사했는가?",
    "6. 들숨 한번에 흡입기를 1회만 사용하였는가?",
    "7. 호흡 속도는 적절하였는가?",
    "8. 흡입 시간은 충분하였는가?",
    "9. 흡입기의 위치는 정상적이었는가?",
    "10. 흡입 후 6~10초간 숨을 참았는가?",
    "11. 사용 후 양치나 가글을 하였는가?",
  ]
const checklist= [0,0,0,0,0,0,0,0,0,0,0];


const userChecklist =({navigation})=> {
  const {GradeCard, setGradeCard} = useContext(UserContext);
  const [Value, setValue]=useState(0);
  const {emailID} = useContext(AuthContext);

  const getCurrentTime=()=>{
    var date = new Date().getDate();
    var month = new Date().getMonth()+1;
    var year = new Date().getFullYear();
    var time=new Date().toLocaleTimeString();
    return year + '-' + month + '-' + date + '-' + time;
  }
  const makeChecklist = () => {
    return checklistContents.map((mem, key) => (
      <View style={{flex:1, padding: 10, flexDirection:'column'}} key={key}>
        <View style={{flex:1, AlignItems:'stretch'}}>
          <Text style={styles.texts}>{mem}</Text>
        </View>
        <View style={{flex:1, flexDirection:'row'}}>
          <View style={{flex:5}}>
            <TouchableOpacity
              onPress={()=> 
                {
                  checklist[key]=1;
                  setValue(Value+1);
                  console.log(checklist);
                }
              }
              style={{backgroundColor: checklist[key]===1 ? '#ABB8C3':'#FFF', alignItems:'center'}}
            >
                <Text style={{fontSize:18}}>Yes</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex:5}}>
            <TouchableOpacity
              onPress={()=> 
                {
                  checklist[key]=2;
                  setValue(Value+1);
                  console.log(checklist);
                }
              }
              style={{backgroundColor: checklist[key]===2 ? '#ABB8C3':'#FFF', alignItems:'center'}}
            >
                <Text style={{fontSize:18}}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    ))
  }
  return(
      <ScrollView style={{
          paddingBottom: 30,
          flexDirection: 'column',
      }}>
        {makeChecklist()}
        <FormButton
          buttonTitle="완료"
          onPress={()=>{
              Alert.alert('완료되었습니다!');
              checklistContents.map((mem,key)=>{
                GradeCard[key]=checklist[key];
                checklist[key]=0;
              })
              setValue(Value+1);
              console.log(GradeCard);
              firestore().collection(emailID).doc(getCurrentTime()).set({GradeCard: GradeCard});
              navigation.navigate('홈');
          }}
        />
      </ScrollView>
  )
        }

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },
  texts: {fontSize: 18, paddingTop:8, marginBottom:10},
  check: {flex:1, padding: 10, flexDirection:'row'}
});

export default userChecklist;