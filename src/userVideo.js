import 'react-native-gesture-handler';
import React, {Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image,  } from 'react-native';
// import {launchCamera} from 'react-native-image-picker';

// const emptyCamera = './assets/images/emptyCamera_image.png';

class userVideo extends Component {
  // state={
  //   myVideo:'./assets/images/emptyCamera_image.png',
  // }
  // addImage = () => {
  //   console.log(this.state.myVideo)
  //   launchCamera({mediaType:'photo', maxHeight:300, maxWidth:300}, (response) => {
  //     this.setState({
  //       myVideo: response.uri,
  //     })
  //   })
  // }
  render (){
    return(
        <View style={styles.container}>
          {/* <Image
            source={{uri: this.state.myVideo}}
            style={{width:'90%', height: 300, resizeMode:'contain', marginTop:70}}
          /> */}
          <TouchableOpacity
              style={styles.buttonElementView}
              onPress={()=>{
                // this.addImage()}}
                // this.props.navigation.navigate('userChecklist')
              }
              }
          >
              <Text style={{fontSize:20}}>내 영상 촬영하기</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={styles.buttonElementView2}
              onPress={()=>{
                // this.addImage()}}
                this.props.navigation.navigate('userChecklist')}}
          >
              <Text style={{fontSize:20}}>체크리스트 작성하기</Text>
          </TouchableOpacity>
        </View>
    )
  }
}

const styles= StyleSheet.create({
    container:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#FFF',
    },
    buttonElementView: {
        height: 60,
        marginTop:30,
        marginBottom:30,
        // marginLeft: 15,
        // marginRight: 15,
        padding: 30,
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
        width: 5,
        height: 10,  
        },
        elevation: 15,
    },
    buttonElementView2: {
      height: 60,
      // marginTop:50,
      marginBottom:150,
      // marginLeft: 15,
      // marginRight: 15,
      padding: 30,
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',
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

export default userVideo;