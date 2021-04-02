import 'react-native-gesture-handler';
import React, {Component, useContext, useEffect, useState, useCallback} from 'react';
import { StyleSheet, View, ScrollView, Text, Button, Image, Alert, Dimensions, Touchable, TouchableOpacity} from 'react-native';
import {AuthContext} from './AuthProvider';
import FormButton from './components/FormButton';
import {UserContext} from './HandleUser';
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import RNRestart from 'react-native-restart';

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

// export const ids=[];
export const datas=[];
export const months=[];
export const dates=[];
const thirdTab = ({navigation}) => {
  const [dataList, setDataList]=useState([]);
  // const [idList, setIdList]=useState([]);
  const [monthList, setMonthList]=useState([]);
  const [dateList, setDateList]=useState([]);
  const {emailID, logout} = useContext(AuthContext);
  const {InhalerType, setInhalerType, howmany}=useContext(UserContext);
  const [value, setValue]=useState(0);
  useFocusEffect(
    useCallback(()=>{
      async function firePromise() {
        try {
          const snap = await firestore()
            .collection(emailID)
            .orderBy('Count','desc')
            .get();
          snap.forEach((doc, key) => {
            if(doc.id!==emailID && datas.length<howmany-1){
              datas.push(doc.get('GradeCard'));
              months.push(doc.get('Month'));
              dates.push(doc.get('Date'));
            }
          });
          // setIdList(ids);
          setDataList(datas);
          setMonthList(months);
          setDateList(dates);
          console.log('monthList: ', monthList);
          // console.log('data: ', ids);
          console.log('data size: ', datas.length);
          console.log('howmany: ', howmany);
        }
         catch (error) {
          throw error;
        }
      }    
      if(datas.length<howmany-1){
        firePromise();
      }
    },[])
  );
    return (
      <View style={{flexDirection:'column', justifyContent:'space-between'}}>
      <ScrollView>
        <View style={{alignItems:'center',
          paddingLeft : windowWidth/40,
          paddingRight : windowWidth/40
          
          }}>
           {InhalerType>0?
           <View style={{alignItems:'center'}}>
            <Text style={{fontSize: 20, fontWeight: '500', color: 'black', marginTop:30,  marginBottom : 10, textAlign:'center'}}>
              {emailID}님이 사용 중인 흡입기는
            </Text>
              <Image
                source={InhalerType===1? require('./assets/images/MDI.png') : require('./assets/images/Seretide_diskus.png')}
                style={styles.inhaler}
              />
              <Text style={{fontSize: 16, textAlign:'center'}}>{InhalerType===1? 'MDI':'디스커스'}입니다</Text>
              <FormButton
                buttonTitle="흡입기 종류 바꾸기"
                onPress={() => {
                  navigation.navigate('ChooseScreen')
                }}
              />
            </View>
            :
            <View style={{alignItems:'center'}}>
            <Text style={{fontSize: 20, fontWeight: '500', color: 'gray', marginTop:30,  marginBottom : 10, textAlign:'center'}}>
              아직 흡입기를 선택하지 않았습니다.
            </Text>
              <FormButton
                buttonTitle="사용 중인 흡입기 선택하기"
                onPress={() => {
                  navigation.navigate('ChooseScreen')
                }}
              />
            </View>
            }
         </View>
        {howmany>1 && dataList.map((mem,key)=>{
          return <View key={key} style={{borderWidth:0.5, 
                                        borderColor :'#b2b2b2',
                                        marginTop:10,
                                        marginHorizontal : windowWidth/40,
                                        paddingLeft : 10,
                                        paddingVertical : 10,
                                        marginTop:20,
                                        backgroundColor : '#f3f3f3'
                                        }}>
                  {/* <Text key={key} style={{fontSize:20, textAlign:'center'}}>사용 날짜: {idList[key].slice(0,9)}</Text> */}
                  <Text key={key} style={{fontSize:20, textAlign:'center',fontWeight : '600'}}>{monthList[key]}월 {dateList[key]}일</Text>
                  <Text key={key+100} style={{fontSize:17, fontWeight : '500', marginBottom : 3 }}>잘 하신 점</Text>
                  {mem.map((mem2,key2)=>{
                    return (mem2===1 && <View key={key2}>
                                  <Text key={key2} style={{fontSize:15, padding:1}}>{checklistContents[InhalerType-1][key2]}</Text>
                                </View>
                    )
                    })
                  }
                  <Text key={key+200} style={{fontSize:17, fontWeight : '600', marginBottom : 3, marginTop : 5}}>보완할 점</Text>
                  {mem.map((mem2,key2)=>{
                    return (mem2===2 && <View key={key2}>
                                  <Text key={key2} style={{fontSize:15, padding:1}}>{checklistContents[InhalerType-1][key2]}</Text>
                                </View>
                    )
                    })
                  }
                 </View>
        })}
        <View style ={{marginHorizontal : windowWidth/40}}>
        <FormButton
              buttonTitle="로그아웃"
              onPress={() => {
                Alert.alert('로그아웃 되었습니다!');
                datas.length=0;
                logout();
                RNRestart.Restart();
              }}
            />
        </View>
      </ScrollView>
    </View>
    )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },
  inhaler: {
    height: windowWidth/2,
    width: windowWidth/2,
    resizeMode: 'contain',
    marginBottom : 10
  }
});

export default thirdTab;