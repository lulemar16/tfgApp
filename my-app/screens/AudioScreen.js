import React, { Component } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class AudioScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRecording: false,
      isPaused: false,
      recordingStartTime: null,
      recordings: [],
      elapsedTime: 0,
      isPlaying: false,
      playingRecordingIndex: null,
    };
    this.timerInterval = null;
  }

  toggleRecording = () => {
    if (this.state.isRecording) {
      const recordingEndTime = new Date();
      const recordingDuration =
        recordingEndTime - (this.state.recordingStartTime || recordingEndTime);

      Alert.alert(
        'Save recording',
        'Do you want to save the recording?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => {
              this.setState({
                isRecording: false,
                isPaused: false,
                elapsedTime: 0,
              });
              clearInterval(this.timerInterval);
            },
          },
          {
            text: 'Save',
            onPress: () => {
              this.setState((prevState) => ({
                isRecording: false,
                isPaused: false,
                recordings: [
                  { duration: recordingDuration, /* Other recording information */ },
                  ...prevState.recordings,
                ],
                elapsedTime: 0,
              }));

              clearInterval(this.timerInterval);

              // Scroll up to show the new recording at the top
              this.flatListRef.scrollToOffset({ offset: 0, animated: true });
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      this.setState(
        (prevState) => ({
          isRecording: true,
          recordingStartTime: !this.state.isPaused ? new Date() : this.state.recordingStartTime,
          isPaused: false,
        }),
        () => {
          this.timerInterval = setInterval(() => {
            this.setState((prevState) => ({ elapsedTime: prevState.elapsedTime + 1 }));
          }, 1000);
        }
      );
    }
  };

  togglePause = () => {
    this.setState((prevState) => ({
      isPaused: !prevState.isPaused,
    }));
  };

  togglePlay = (index) => {
    if (this.state.isPlaying && index === this.state.playingRecordingIndex) {
      // Pause playback
      // Logic to pause playback
      this.setState({ isPlaying: false });
    } else {
      // Start playback
      // Logic to start playback of the recording at the specified index
      this.setState({ isPlaying: true, playingRecordingIndex: index });
    }
  };

  isPlaying = (index) => this.state.isPlaying && index === this.state.playingRecordingIndex;

  // Helper function to format time components to have leading zeros
  formatTimeComponent = (value) => (value < 10 ? `0${value}` : value);

  render() {
    const { isRecording, isPaused, elapsedTime } = this.state;

    return (
      <View style={styles.container}>
        <FlatList
          ref={(ref) => (this.flatListRef = ref)}
          data={this.state.recordings}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            const durationInSeconds = item.duration / 1000;
            const hours = Math.floor(durationInSeconds / 3600);
            const minutes = Math.floor((durationInSeconds % 3600) / 60);
            const seconds = Math.floor(durationInSeconds % 60);

            return (
              <View style={styles.recordingItem}>
                <View style={styles.playbackContainer}>
                  <TouchableOpacity onPress={() => this.togglePlay(index)}>
                    <Icon
                      name={this.isPlaying(index) ? 'pause' : 'play-arrow'}
                      size={20}
                      color="white"
                    />
                  </TouchableOpacity>
                  <Text style={styles.playbackText}>
                    {`${this.formatTimeComponent(hours)}:${this.formatTimeComponent(
                      minutes
                    )}:${this.formatTimeComponent(seconds)}`}
                  </Text>
                </View>
                {/* Add more details of the recording as needed */}
              </View>
            );
          }}
        />
        <View style={styles.record}>
          <TouchableOpacity style={styles.recordButton} onPress={this.toggleRecording}>
            <Icon name={isRecording ? 'stop' : 'mic'} size={30} color="white" />
          </TouchableOpacity>
        

          {isRecording && (
            <View style={styles.recordingInfo}>
              <TouchableOpacity style={styles.pauseButton} onPress={this.togglePause}>
                <Icon name={isPaused ? 'play-arrow' : 'pause'} size={20} color="white" />
              </TouchableOpacity>
              <Text style={styles.recordingTime}>{elapsedTime}s</Text>
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  recordingItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  playbackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '90%', 
    alignSelf: 'center',
    marginBottom: 10,
  },  
  playbackText: {
    color: 'white',
    marginLeft: 10,
  },
  record:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
  },
  recordingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 90,
  },
  pauseButton: {
    marginRight: 10,
    backgroundColor: 'black',
  },
  recordingTime: {
    fontSize: 16,
    color: 'black',
  },
});