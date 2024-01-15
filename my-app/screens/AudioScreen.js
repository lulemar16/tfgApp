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
                  { duration: recordingDuration, /* Otra información de la grabación */ },
                  ...prevState.recordings,
                ],
                elapsedTime: 0,
              }));

              clearInterval(this.timerInterval);

              // Desplazar hacia arriba para mostrar la nueva grabación al principio
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
      // Pausar reproducción
      // Lógica para pausar la reproducción
      this.setState({ isPlaying: false });
    } else {
      // Iniciar reproducción
      // Lógica para iniciar la reproducción de la grabación en el índice especificado
      this.setState({ isPlaying: true, playingRecordingIndex: index });
    }
  };

  isPlaying = (index) => this.state.isPlaying && index === this.state.playingRecordingIndex;

  render() {
    const { isRecording, isPaused, elapsedTime } = this.state;

    return (
      <View style={styles.container}>
        <FlatList
          ref={(ref) => (this.flatListRef = ref)}
          data={this.state.recordings}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.recordingItem}>
              <View style={styles.playbackContainer}>
                <TouchableOpacity onPress={() => this.togglePlay(index)}>
                  <Icon
                    name={this.isPlaying(index) ? 'pause' : 'play-arrow'}
                    size={20}
                    color="black"
                  />
                </TouchableOpacity>
                <Text>{item.duration}s</Text>
              </View>
              {/* Agrega más detalles de la grabación según sea necesario */}
            </View>
          )}
        />

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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordingItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  playbackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFBF6B',
    padding: 10,
    borderRadius: 10,
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
    marginHorizontal: '40%', 
    marginBottom: 10, 
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
