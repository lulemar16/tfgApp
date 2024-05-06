import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableOpacity, Alert, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, updateDoc, getDocs, doc } from 'firebase/firestore';

const auth = getAuth();
const db = getFirestore();
const userUID = auth.currentUser ? auth.currentUser.uid : "anonymous";

export default function AudioScreen() {

  // const userRef = doc(db, 'users', userUID);
  const recordsRef = collection(doc(db, 'users', userUID), 'recordings');
  // const recordsRef = collection(db, 'users', userUID, 'recordings');

  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingStartTime, setRecordingStartTime] = useState(null);
  const [recordings, setRecordings] = useState([]);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingRecordingIndex, setPlayingRecordingIndex] = useState(null);
  const [recordingTitle, setRecordingTitle] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const recordsSnapshot = await getDocs(recordsRef);
      const recordsData = recordsSnapshot.docs.map(doc => doc.data());
      setRecordings(recordsData);
      console.log('records: ', recordings);
    };
    fetchData();
  }, []);

  const saveRecordingToFirestore = async (recording) => {
    try {
      const docRef = await addDoc(recordsRef, recording);
      console.log('Recording added with ID: ', docRef.id);
      updateDoc(docRef, {
        id: docRef.id,
      })
    } catch (error) {
      console.error('Error adding recording: ', error);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      // Code to save recording
      const recordingEndTime = new Date();
      const recordingDuration =
        recordingEndTime - (recordingStartTime || recordingEndTime);
      const recording = {
        title: recordingTitle,
        duration: recordingDuration,
        // Add other recording information as needed
      };
      saveRecordingToFirestore(recording);

      // Alert and reset state
      Alert.alert(
        'Save recording',
        'Do you want to save the recording?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => {
              setIsRecording(false);
              setIsPaused(false);
              setElapsedTime(0);
              setRecordingTitle('');
              clearInterval(this.timerInterval);
            },
          },
          {
            text: 'Save',
            onPress: () => {
              setRecordings([
                { title: recordingTitle, duration: recordingDuration },
                ...recordings,
              ]);
              setIsRecording(false);
              setIsPaused(false);
              setElapsedTime(0);
              setRecordingTitle('');
              clearInterval(this.timerInterval);
              // Scroll up to show the new recording at the top
              this.flatListRef.scrollToOffset({ offset: 0, animated: true });
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      // Code to start recording
      setIsRecording(true);
      setRecordingStartTime(!isPaused ? new Date() : recordingStartTime);
      setIsPaused(false);
      this.timerInterval = setInterval(() => {
        setElapsedTime(prevElapsedTime => prevElapsedTime + 1);
      }, 1000);
    }
  };

  const togglePause = () => {
    setIsPaused(prevIsPaused => !prevIsPaused);
  };

  const togglePlay = (index) => {
    if (isPlaying && index === playingRecordingIndex) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      setPlayingRecordingIndex(index);
    }
  };

  const isCurrentlyPlaying = (index) => isPlaying && index === playingRecordingIndex;

  const formatTimeComponent = (value) => (value < 10 ? `0${value}` : value);

  return (
    <View style={styles.container}>
      <FlatList
        ref={(ref) => (this.flatListRef = ref)}
        data={recordings}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          const durationInSeconds = item.duration / 1000;
          const hours = Math.floor(durationInSeconds / 3600);
          const minutes = Math.floor((durationInSeconds % 3600) / 60);
          const seconds = Math.floor(durationInSeconds % 60);

          return (
            <View style={styles.recordingItem}>
              <View style={styles.playbackContainer}>
                <Text style={styles.titleText}>{item.title}</Text>
                <TouchableOpacity onPress={() => togglePlay(index)}>
                  <Icon
                    name={isCurrentlyPlaying(index) ? 'pause' : 'play-arrow'}
                    size={20}
                    color="white"
                  />
                </TouchableOpacity>
                <View>
                  <Text style={styles.playbackText}>
                    {`${formatTimeComponent(hours)}:${formatTimeComponent(
                      minutes
                    )}:${formatTimeComponent(seconds)}`}
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
      />
      <View style={styles.record}>
        <TouchableOpacity style={styles.recordButton} onPress={toggleRecording}>
          <Icon name={isRecording ? 'stop' : 'mic'} size={30} color="white" />
        </TouchableOpacity>

        {isRecording && (
          <View style={styles.recordingInfo}>
            <TouchableOpacity style={styles.pauseButton} onPress={togglePause}>
              <Icon name={isPaused ? 'play-arrow' : 'pause'} size={20} color="white" />
            </TouchableOpacity>
            <Text style={styles.recordingTime}>{elapsedTime}s</Text>
            <TextInput
              style={styles.titleInput}
              placeholder="Recording Title"
              onChangeText={(text) => setRecordingTitle(text)}
              value={recordingTitle}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    borderColor: '#black',
    borderWidth: 2,
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
    color: 'black',
    margin: 10,
  },
  titleText: {
    color: 'black',
    fontSize: 14,
    marginTop: 5,
    marginRight:'60%'
  },
  titleInput: {
    height: 40,
    width: '200%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 5,
    paddingLeft: 10,
  },
  record: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FCCA00',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
  },
  recordingInfo: {
    flexDirection: 'column',
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
