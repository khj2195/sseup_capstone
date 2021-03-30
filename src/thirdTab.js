import 'react-native-gesture-handler';
import React, {Component, useContext} from 'react';
import { StyleSheet, View, ScrollView, Text, Button, Image} from 'react-native';
import {AuthContext} from './AuthProvider';
import FormButton from './components/FormButton';
import FormInput from './components/FormInput';
// import CalendarPicker from 'react-native-calendar-picker';
import auth from '@react-native-firebase/auth';
// import { Table, Row, Rows } from 'react-native-table-component';
// import {UserContext} from './HandleUser';

const thirdTab = () => {
  // const {logout } = useContext(AuthContext);
  // const {InhalerType, saveUser, Name, setName, submitUser} = useContext(UserContext);

  // const curruser=auth().currentUser;

    return (
      // <ScrollView>
        <View style={{justifyContent:'center', alignItems:'center'}}>
          {/* <CalendarPicker /> */}
          {/* <FormInput
            labelValue={Name}
            onChangeText={(Name) => setName(Name)}
            placeholderText="Name"
            iconType="user"
            autoCapitalize="none"
            autoCorrect={false}
          /> */}
          <FormButton
            buttonTitle="Submit"
            onPress={() => 
              {
              // submitUser(Id,Name,InhalerType);
              // saveUser();
              }
            }
          />
          {/* <Text style={{fontSize: 16, fontWeight: '500', color: 'black', fontFamily: 'Lato-Regular', marginTop:50}}>
            당신이 사용 중인 흡입기는 {InhalerType===1? "MDI" : "디스커스"} 입니다.
          </Text>
          <Image
            source={InhalerType===1? require('./assets/images/MDI.jpg') : require('./assets/images/Seretide_diskus.png')}
            style={styles.inhaler}
          />
          <FormButton
            buttonTitle="Log out"
            onPress={() => logout()}
          /> */}
        </View>
      // </ScrollView>
    )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },
  inhaler: {
    height: 250,
    width: 250,
    resizeMode: 'contain',
  }
});

export default thirdTab;