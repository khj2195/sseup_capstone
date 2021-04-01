import 'react-native-gesture-handler';
import React, {Component} from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, Dimensions } from 'react-native';
import FormButton from './components/FormButton';
import Video from 'react-native-video';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

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
    inhalerState: 0,
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

  async firePromise() {
    try {
      const snap = await firestore().collection(auth().currentUser.email.split("@")[0]).doc(auth().currentUser.email.split("@")[0]).get();
      console.log('불러온 inhalertype!!: ',snap.get('InhalerType'));
      this.setState({inhalerState: Number(snap.get('InhalerType'))});
      console.log('inhalerState: ',inhalerState);
    } catch (error) {
      throw error;
    }
  }
  componentDidMount(){
    this.firePromise();
  }
  render() {
    const flexCompleted = this.getCurrentTimePercentage() * 100;
    const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;
    // this.firePromise();
    return (
      <View style={styles.container}>
        {/* <View style={{flex:10}}> */}
        <TouchableOpacity style={styles.fullScreen} activeOpacity={1} onPress={() => {this.setState({paused: !this.state.paused})}}>
           <Video 
              source={this.state.inhalerState===1? require('./assets/videos/MDI_video.mp4') : require('./assets/videos/Seretide_diskus_video.mp4')}   // Can be a URL or a local file.
              // source={{uri: "https://www.youtube.com/watch?v=tY1M7TBMdxQ"}}
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
            <View style={styles.progress}>
              <View style={[styles.innerProgressCompleted, {flex: flexCompleted}]} />
              <View style={[styles.innerProgressRemaining, {flex: flexRemaining}]} />
            </View>
            <View style={{flex:1}}>
            <FormButton
                buttonTitle="체크리스트 작성하러 가기"
                onPress={()=>{
                    this.props.navigation.navigate('userChecklist')
                }}
            />
          </View>
          {/* </View> */}
        </View>
        </View>
        // <View style={{flex:1}}>
        //     <FormButton
        //         buttonTitle="체크리스트 작성하러 가기"
        //         onPress={()=>{
        //             this.props.navigation.navigate('userChecklist')
        //         }}
        //     />
        // </View>
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
