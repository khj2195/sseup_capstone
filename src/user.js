import 'react-native-gesture-handler';
import React, {Component} from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, Dimensions } from 'react-native';
import FormButton from './components/FormButton';
import Video from 'react-native-video';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

// class UserScreen extends Component {
  
//   render (){
//     return(
//         <View>
//         <View style={{height: windowHeight/2, width: windowWidth, marginTop:30}}>
//             <Video 
//               source={require('./assets/videos/DryingLime.mp4')}   // Can be a URL or a local file.
//               ref={(ref) => {
//                 this.player = ref
//               }}                                      // Store reference
//               onBuffer={this.onBuffer}                // Callback when remote video is buffering
//               onError={this.videoError}               // Callback when video cannot be loaded
//               style={styles.backgroundVideo} 
//               paused={this.paused}
//               resizeMode='contain'
//             />
//             </View>
//             <View>
//               <FormButton
//                 buttonTitle="체크리스트 작성하러 가기"
//                 onPress={()=>{
//                     this.props.navigation.navigate('userChecklist')
//                 }}
//               />
//             </View>
//       </View>
//     )
//   }
// }
// const styles= StyleSheet.create({
//   videoElementView: {
//       marginTop:40,
//       marginBottom:60,
//       marginLeft: 5,
//       marginRight: 5,
//       padding: 30,
//       flex:1,
//       alignItems: 'center',
//       justifyContent: 'center',
//       backgroundColor: 'white',
//       borderRadius: 10,
//       shadowColor: "#000",
//       shadowOffset: {
//         width: 5,
//         height: 10,  
//       },
//       elevation: 15
//   },
//   backgroundVideo: {
//     position: 'absolute',
//     top: 20,
//     left: 0,
//     bottom: 0,
//     right: 0,
//   },
// });


// export default UserScreen;


class UserScreen extends Component {
  constructor(props) {
    super(props);
    this.onLoad = this.onLoad.bind(this);
    this.onProgress = this.onProgress.bind(this);
  }

  state = {
    rate: 1,
    volume: 1,
    muted: false,
    resizeMode: 'contain',
    duration: 0.0,
    currentTime: 0.0,
  };

  onLoad(data) {
    this.setState({duration: data.duration});
  }

  onProgress(data) {
    this.setState({currentTime: data.currentTime});
  }

  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
    } else {
      return 0;
    }
  }

  renderRateControl(rate) {
    const isSelected = (this.state.rate == rate);

    return (
      <TouchableOpacity onPress={() => { this.setState({rate: rate}) }}>
        <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
          {rate}x
        </Text>
      </TouchableOpacity>
    )
  }

  renderResizeModeControl(resizeMode) {
    const isSelected = (this.state.resizeMode == resizeMode);

    return (
      <TouchableOpacity onPress={() => { this.setState({resizeMode: resizeMode}) }}>
        <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
          {resizeMode}
        </Text>
      </TouchableOpacity>
    )
  }

  renderVolumeControl(volume) {
    const isSelected = (this.state.volume == volume);

    return (
      <TouchableOpacity onPress={() => { this.setState({volume: volume}) }}>
        <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
          {volume * 100}%
        </Text>
      </TouchableOpacity>
    )
  }

  render() {
    const flexCompleted = this.getCurrentTimePercentage() * 100;
    const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;

    return (
      <View style={styles.container}>
        {/* <View style={{flex:10}}> */}
        <TouchableOpacity style={styles.fullScreen} onPress={() => {this.setState({paused: !this.state.paused})}}>
          <Video 
              source={require('./assets/videos/DryingLime.mp4')}   // Can be a URL or a local file.
              style={styles.fullScreen}
              // rate={this.state.rate}
              paused={this.state.paused}
              volume={this.state.volume}
              muted={this.state.muted}
              resizeMode={this.state.resizeMode}
              onLoad={this.onLoad}
              onProgress={this.onProgress}
              onEnd={() => { console.log('Done!') }}
              repeat={true} />
        </TouchableOpacity>

        <View style={styles.controls}>
          <View style={styles.generalControls}>
            {/* <View style={styles.rateControl}>
              {this.renderRateControl(0.25)}
              {this.renderRateControl(0.5)}
              {this.renderRateControl(1.0)}
              {this.renderRateControl(1.5)}
              {this.renderRateControl(2.0)}
            </View> */}

            {/* <View style={styles.volumeControl}>
              {this.renderVolumeControl(0.5)}
              {this.renderVolumeControl(1)}
              {this.renderVolumeControl(1.5)}
            </View> */}

            {/* <View style={styles.resizeModeControl}>
              {this.renderResizeModeControl('cover')}
              {this.renderResizeModeControl('contain')}
              {this.renderResizeModeControl('stretch')}
            </View> */}
          </View>

          {/* <View style={styles.trackingControls}> */}
            <View style={styles.progress}>
              <View style={[styles.innerProgressCompleted, {flex: flexCompleted}]} />
              <View style={[styles.innerProgressRemaining, {flex: flexRemaining}]} />
            </View>
          {/* </View> */}
        </View>
        </View>
      //   <View style={{flex:1}}>
      //       <FormButton
      //           buttonTitle="체크리스트 작성하러 가기"
      //           onPress={()=>{
      //               this.props.navigation.navigate('userChecklist')
      //           }}
      //       />
      //   </View>
      // </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  controls: {
    backgroundColor: "transparent",
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'visible',
  },
  innerProgressCompleted: {
    height: 20,
    backgroundColor: '#cccccc',
  },
  innerProgressRemaining: {
    height: 20,
    backgroundColor: '#2C2C2C',
  },
  generalControls: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 4,
    overflow: 'scroll',
    paddingBottom: 10,
  },
  rateControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  volumeControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resizeModeControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlOption: {
    alignSelf: 'center',
    fontSize: 11,
    color: "white",
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12,
  },
});
export default UserScreen;
