import 'react-native-gesture-handler';
import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native';
import FormInput from './components/FormInput';
import FormButton from './components/FormButton';
import { AuthContext } from './AuthProvider';
import { UserContext } from './HandleUser';
import firestore from '@react-native-firebase/firestore';

const variableInhalerState=[0];

const ChooseScreen = ({navigation}) => {
  const {emailID} = useContext(AuthContext);
  const {InhalerType, setInhalerType} = useContext(UserContext);
  const [inhalerState, setInhalerState] = useState(0);
  useEffect(() => {
    async function firePromise() {
      try {
        const snap = await firestore().collection(emailID).doc(emailID).get();
        console.log('불러온 inhalertype!!: ',snap.get('InhalerType'));
        setInhalerState(Number(snap.get('InhalerType')));
        console.log('inhalerState: ',inhalerState);
      } catch (error) {
        throw error;
      }
    }
    firePromise();
  }, []);
  return(
    <View style={styles.container}>
    <Text
      style={{
        fontSize: 16,
        fontWeight: '500',
        color: 'black',
      }}>
      당신이 사용하는 흡입기를 선택해주세요.
    </Text>
    <View style={{flexDirection:'row'}}>
      <TouchableOpacity
        style={{flex:1}}
        onPress={() => {
          firestore().collection(emailID).doc(emailID).set({InhalerType: 1});
          // setInhalerType(1);
          variableInhalerState[0]=1;
        }}>
        <Image
          source={require('./assets/images/MDI.png')}
          style={{height:150, width:150}}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{flex:1}}
        onPress={() => {
          firestore().collection(emailID).doc(emailID).set({InhalerType: 2});
          // setInhalerType(2);
          variableInhalerState[0]=2;
        }}>
        <Image
          source={require('./assets/images/Seretide_diskus.png')}
          style={{height:150, width:150}}
        />
      </TouchableOpacity>
    </View>
    <FormButton
      buttonTitle="완료"
      onPress={() => {
        console.log(variableInhalerState[0]);
        setInhalerState(variableInhalerState[0]);
        setInhalerType(variableInhalerState[0]);
        navigation.navigate('홈');
      }}
    />
  </View>
  )
}
const styles = StyleSheet.create({
    container: {flex: 1, padding: 10, paddingTop: 30, backgroundColor: '#fff'},
    head: {height: 40, backgroundColor: '#f1f8ff'},
    text: {margin: 6},
    texts: {fontSize: 18, paddingTop: 8, marginBottom: 10},
    check: {flex: 1, padding: 10, flexDirection: 'row'},
  });

  export default ChooseScreen;
