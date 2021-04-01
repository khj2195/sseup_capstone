import 'react-native-gesture-handler';
import React, {useContext, useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  TouchableOpacity,
  Alert,
  Image
} from 'react-native';
import FormButton from './components/FormButton';
import {AuthContext} from './AuthProvider';
import {UserContext} from './HandleUser';
// import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

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
const checklist = [0, 0, 0, 0, 0, 0, 0, 0];
const variableInhalerState=[0];
const userChecklist = ({navigation}) => {
  const {GradeCard, setGradeCard, InhalerType, setInhalerType, howmany, setHowmany} = useContext(UserContext);
  const [Value, setValue] = useState(0);
  const {emailID} = useContext(AuthContext);
  // const [inhalerState, setInhalerState] = useState(-1);
  const getCurrentTime = () => {
    var year = new Date().getFullYear();
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var time = new Date().toLocaleTimeString();
    return year + '-' + month + '-' + date + '-' + time;
  };
  const makeChecklist = (array) => {
    return array.map((mem, key) => (
      <View style={{flex: 1, padding :8, paddingBottom : 3,paddingHorizontal : 12, flexDirection: 'column'}} key={key}>
        <View style={{flex: 1, AlignItems: 'stretch'}}>
          <Text style={styles.texts}>{mem}</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 5,height : 30}}>
            <TouchableOpacity
              onPress={() => {
                checklist[key] = 1;
                setValue(Value + 1);
                console.log(checklist);
              }}
              style={{
                backgroundColor: checklist[key] === 1 ? '#b5cef9' : '#FFF',
                alignItems: 'center',
                height :'100%',
                justifyContent : 'center',
                borderTopLeftRadius : 7,
                borderBottomLeftRadius : 7
                
              }}>
              <Text style={{fontSize: 17}}>Yes</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 5, height : 30}}>
            <TouchableOpacity
              onPress={() => {
                checklist[key] = 2;
                setValue(Value + 1);
                console.log(checklist);
              }}
              style={{
                backgroundColor: checklist[key] === 2 ? '#b5cef9' : '#FFF',
                alignItems: 'center',
                height : '100%',
                justifyContent : 'center',
                borderTopRightRadius : 5,
                borderBottomRightRadius : 5
              }}>
              <Text style={{fontSize: 17}}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    ));
  };

  // useEffect(() => {
  //   async function firePromise() {
  //     try {
  //       const snap = await firestore().collection(emailID).doc(emailID).get();
  //       console.log('불러온 inhalertype!!: ',snap.get('InhalerType'));
  //       setInhalerState(Number(snap.get('InhalerType')));
  //       console.log('inhalerState: ',inhalerState);
  //     } catch (error) {
  //       throw error;
  //     }
  //   }
  //   firePromise();
  // }, []);
  return (
    // inhalerState>0 ? 
    // (
    <ScrollView
      style={{
        paddingBottom: 30,
        flexDirection: 'column',
      }}>
      {/* {InhalerType<2? 
      makeChecklist(checklistMDI)
      :
      makeChecklist(checklistDPI)
      } */}
      {InhalerType>0 && makeChecklist(checklistContents[InhalerType-1])}
      <FormButton
        buttonTitle="완료"
        onPress={() => {
          if(checklist.indexOf(0)>-1){
            Alert.alert('모든 항목을 채워주세요!');  
          } else{
          Alert.alert('완료되었습니다!');
          checklistContents[InhalerType-1].map((mem, key) => {
            GradeCard[key] = checklist[key];
            checklist[key] = 0;
          });
          console.log(GradeCard);
          setHowmany(howmany+1);
          firestore()
            .collection(emailID)
            .doc(getCurrentTime())
            .set(
              {
                GradeCard: GradeCard,
                When: getCurrentTime(),
                Month: new Date().getMonth()+1,
                Date: new Date().getDate(),
              });
          navigation.navigate('홈');
          }
        }}
      />
    </ScrollView>
    // ) 
    // : 
    // (
    // <View style={styles.container}>
    //   <Text
    //     style={{
    //       fontSize: 16,
    //       fontWeight: '500',
    //       color: 'black',
    //     }}>
    //     당신이 사용하는 흡입기를 선택해주세요.
    //   </Text>
    //   <View style={{flexDirection:'row'}}>
    //     <TouchableOpacity
    //       style={{flex:1}}
    //       onPress={() => {
    //         firestore().collection(emailID).doc(emailID).set({InhalerType: 1});
    //         variableInhalerState[0]=1;
    //       }}>
    //       <Image
    //         source={require('./assets/images/MDI.png')}
    //         style={{height:150, width:150}}
    //       />
    //     </TouchableOpacity>
    //     <TouchableOpacity
    //       style={{flex:1}}
    //       onPress={() => {
    //         firestore().collection(emailID).doc(emailID).set({InhalerType: 2});
    //         variableInhalerState[0]=2;
    //       }}>
    //       <Image
    //         source={require('./assets/images/Seretide_diskus.png')}
    //         style={{height:150, width:150}}
    //       />
    //     </TouchableOpacity>
    //   </View>
    //   <FormButton
    //     buttonTitle="다음"
    //     onPress={() => {
    //       console.log(variableInhalerState[0]);
    //       setInhalerState(variableInhalerState[0]);
    //     }}
    //   />
    // </View>
    // )
  )
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 10, paddingTop: 30, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {margin: 6},
  texts: {fontSize: 18, paddingTop: 8, marginBottom: 10},
  check: {flex: 1, padding: 10, flexDirection: 'row'},
});

export default userChecklist;
